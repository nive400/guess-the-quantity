const fs = require('fs');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');
const { questions, reverseDetective } = require('./data/questions');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'leaderboard.json');

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public'), { etag: true, maxAge: '1h' }));

// Persistent state for college event (supporting 50+ simultaneous contestants)
let leaderboard = [];
let activeConnections = 0;

// Load persisted leaderboard from disk if present
try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    leaderboard = JSON.parse(raw) || [];
  }
} catch (e) {
  leaderboard = [];
}

function saveLeaderboard() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(leaderboard, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving leaderboard.json:', e.message);
  }
}

function sortLeaderboard() {
  leaderboard.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score; // Higher score first
    }
    return (a.totalTimeSec || 9999) - (b.totalTimeSec || 9999); // Faster completion tie-break
  });
}

function getRankedLeaderboard() {
  sortLeaderboard();
  return leaderboard.map((player, index) => ({
    rank: index + 1,
    id: player.id,
    name: player.name,
    score: player.score,
    totalTimeSec: player.totalTimeSec || 0,
    completedAt: player.completedAt || new Date().toISOString()
  }));
}

const ADMIN_KEY = process.env.ADMIN_KEY || 'admin123';

function checkAdminAuth(req) {
  const key = req.headers['x-admin-key'] || req.query.key || (req.body && req.body.key);
  return key === ADMIN_KEY;
}

// REST API Endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    game: 'Guess the Quantity',
    totalPlayers: leaderboard.length,
    activeConnections,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/questions', (req, res) => {
  res.json(questions);
});

app.get('/api/reverse-detective', (req, res) => {
  res.json(reverseDetective);
});

// Admin-Only Leaderboard View
app.get('/api/leaderboard', (req, res) => {
  if (!checkAdminAuth(req)) {
    return res.status(403).json({ error: 'Admin access required to view the leaderboard' });
  }
  res.json(getRankedLeaderboard());
});

// Admin-Only Verification Endpoint
app.post('/api/admin-verify', (req, res) => {
  if (checkAdminAuth(req)) {
    return res.json({ valid: true });
  }
  res.status(403).json({ valid: false, error: 'Invalid admin passcode' });
});

// Participant Score Submission (open to all 50+ participants, records all entries)
app.post('/api/score', (req, res) => {
  const { name, score, totalTimeSec, playerId } = req.body;
  if (!name || score === undefined) {
    return res.status(400).json({ error: 'Name and score are required' });
  }

  // Ensure persistent unique player ID
  const id = (playerId && String(playerId).trim()) || ('player_' + Math.random().toString(36).substring(2, 9));
  const existingIdx = leaderboard.findIndex(p => p.id === id);

  const playerData = {
    id,
    name: name.trim().substring(0, 40),
    score: Number(score) || 0,
    totalTimeSec: Number(totalTimeSec) || 0,
    completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    timestamp: Date.now()
  };

  if (existingIdx !== -1) {
    // Retain the player's best score (or faster time for tie)
    if (playerData.score > leaderboard[existingIdx].score ||
        (playerData.score === leaderboard[existingIdx].score && playerData.totalTimeSec < leaderboard[existingIdx].totalTimeSec)) {
      leaderboard[existingIdx] = playerData;
    }
  } else {
    leaderboard.push(playerData);
  }

  // Persist immediately to disk so Render restarts don't lose data
  saveLeaderboard();

  const ranked = getRankedLeaderboard();
  // Broadcast update live to admin room sockets
  io.to('admin_room').emit('leaderboard_update', ranked);

  res.json({
    success: true,
    rank: ranked.find(p => p.id === id)?.rank || 1,
    totalParticipants: ranked.length
  });
});

// Admin-Only CSV Export for 50+ members
app.get('/api/export-csv', (req, res) => {
  if (!checkAdminAuth(req)) {
    return res.status(403).send('Admin access required');
  }
  const ranked = getRankedLeaderboard();
  let csv = 'Rank,Player Name,Score (Max 1500),Time Taken (Seconds),Submitted At\n';
  ranked.forEach(p => {
    const cleanName = (p.name || '').replace(/"/g, '""');
    csv += `${p.rank},"${cleanName}",${p.score},${p.totalTimeSec},"${p.completedAt}"\n`;
  });
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="guess_the_quantity_leaderboard.csv"');
  res.send(csv);
});

// Admin-Only Reset
app.post('/api/reset-leaderboard', (req, res) => {
  if (!checkAdminAuth(req)) {
    return res.status(403).json({ error: 'Admin access required to reset leaderboard' });
  }
  leaderboard = [];
  saveLeaderboard();
  io.to('admin_room').emit('leaderboard_update', []);
  res.json({ success: true, message: 'Leaderboard reset successfully' });
});

// Fallback to index.html for SPA navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// WebSocket Real-Time Multiplayer Handling
io.on('connection', (socket) => {
  activeConnections++;
  io.emit('active_players_count', activeConnections);

  // Admin joins the admin room using the passcode
  socket.on('admin_join', (data) => {
    const key = typeof data === 'string' ? data : (data && data.key);
    if (key === ADMIN_KEY) {
      socket.join('admin_room');
      socket.emit('admin_auth_success', { valid: true });
      socket.emit('leaderboard_update', getRankedLeaderboard());
    } else {
      socket.emit('admin_auth_success', { valid: false, error: 'Invalid passcode' });
    }
  });

  // Player completes quiz and submits final score
  socket.on('submit_score', (data) => {
    const { name, score, totalTimeSec, playerId } = data;
    if (!name || score === undefined) return;

    const id = playerId || socket.id;
    const existingIdx = leaderboard.findIndex(p => p.id === id);

    const playerData = {
      id,
      name: (name || 'Anonymous').trim().substring(0, 30),
      score: Number(score) || 0,
      totalTimeSec: Number(totalTimeSec) || 0,
      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      timestamp: Date.now()
    };

    if (existingIdx !== -1) {
      if (playerData.score > leaderboard[existingIdx].score ||
          (playerData.score === leaderboard[existingIdx].score && playerData.totalTimeSec < leaderboard[existingIdx].totalTimeSec)) {
        leaderboard[existingIdx] = playerData;
      }
    } else {
      leaderboard.push(playerData);
    }

    const ranked = getRankedLeaderboard();
    // Broadcast live ONLY to admin sockets!
    io.to('admin_room').emit('leaderboard_update', ranked);
    socket.emit('score_acknowledged', { success: true, rank: ranked.find(p => p.id === id)?.rank || 1 });
  });

  socket.on('disconnect', () => {
    activeConnections = Math.max(0, activeConnections - 1);
    io.emit('active_players_count', activeConnections);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`===================================================`);
  console.log(`⚡ Guess the Quantity Server is running!`);
  console.log(`📡 Local URL: http://localhost:${PORT}`);
  console.log(`🔌 WebSockets & Live Leaderboard ready for up to 50+ players`);
  console.log(`===================================================`);
});
