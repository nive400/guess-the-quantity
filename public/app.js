// ==========================================================================
// GUESS THE QUANTITY - CLIENT APPLICATION
// Real-time multiplayer SI Unit & Physical Quantity Trivia
// ==========================================================================

(function () {
  'use strict';

  // --- STATE ---
  let socket = null;
  let questions = [];
  let currentRoundIndex = 0;
  let revealedCluesCount = 1; // 1 to 4
  let currentPointsAtStake = 100;
  let totalScore = 0;
  let correctCount = 0;
  let gameStartTime = null;
  let autoAdvanceTimer = null;
  let playerId = localStorage.getItem('gtq_player_id') || ('p_' + Math.random().toString(36).substring(2, 9));
  let playerName = localStorage.getItem('gtq_player_name') || '';
  let currentLeaderboard = [];
  let bonusChecklistPoints = 0;
  let countdownTimerInterval = null;
  let countdownSeconds = 30;

  localStorage.setItem('gtq_player_id', playerId);

  // --- DOM ELEMENTS ---
  const brandLink = document.getElementById('brand-link');
  const navBtns = document.querySelectorAll('.nav-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const connectionStatus = document.getElementById('connection-status');
  const activePlayersText = document.getElementById('active-players-text');

  // Play Tab Elements
  const joinCard = document.getElementById('join-card');
  const joinForm = document.getElementById('join-form');
  const playerNameInput = document.getElementById('player-name-input');

  const gameCard = document.getElementById('game-card');
  const hudCurrentRound = document.getElementById('hud-current-round');
  const hudCurrentPoints = document.getElementById('hud-current-points');
  const hudTotalScore = document.getElementById('hud-total-score');
  const roundProgressFill = document.getElementById('round-progress-fill');

  const cluesContainer = document.getElementById('clues-container');
  const revealClueBtn = document.getElementById('reveal-clue-btn');
  const revealClueText = document.getElementById('reveal-clue-text');
  const skipRoundBtn = document.getElementById('skip-round-btn');

  const guessForm = document.getElementById('guess-form');
  const guessInput = document.getElementById('guess-input');
  const submitGuessBtn = document.getElementById('submit-guess-btn');
  const guessFeedback = document.getElementById('guess-feedback');

  // Reveal Overlay
  const revealOverlay = document.getElementById('reveal-overlay');
  const revealCard = document.querySelector('.reveal-card');
  const revealIcon = document.getElementById('reveal-icon');
  const revealVerdict = document.getElementById('reveal-verdict');
  const revealPoints = document.getElementById('reveal-points');
  const revealQuantity = document.getElementById('reveal-quantity');
  const revealUnit = document.getElementById('reveal-unit');
  const revealFormula = document.getElementById('reveal-formula');
  const revealExplanation = document.getElementById('reveal-explanation');

  // Summary Card
  const summaryCard = document.getElementById('summary-card');
  const finalScoreVal = document.getElementById('final-score-val');
  const finalCorrectVal = document.getElementById('final-correct-val');
  const finalTimeVal = document.getElementById('final-time-val');
  const finalRankVal = document.getElementById('final-rank-val');
  const viewLeaderboardBtn = document.getElementById('view-leaderboard-btn');
  const playAgainBtn = document.getElementById('play-again-btn');

  // Leaderboard Elements
  const podiumGrid = document.getElementById('podium-grid');
  const leaderboardTbody = document.getElementById('leaderboard-tbody');
  const resetLeaderboardBtn = document.getElementById('reset-leaderboard-btn');

  // Reverse Detective Elements
  const checkScientist = document.getElementById('check-scientist');
  const checkQuantity = document.getElementById('check-quantity');
  const checkExample = document.getElementById('check-example');
  const bonusPointsTally = document.getElementById('bonus-points-tally');
  const timerDisplay = document.getElementById('timer-display');
  const timerToggleBtn = document.getElementById('timer-toggle-btn');
  const awardBonusBtn = document.getElementById('award-bonus-btn');
  const resetChecklistBtn = document.getElementById('reset-checklist-btn');

  // Confetti Canvas
  const confettiCanvas = document.getElementById('confetti-canvas');
  const confettiCtx = confettiCanvas.getContext('2d');
  let confettiParticles = [];
  let confettiAnimationId = null;

  // ==========================================================================
  // INITIALIZATION & SOCKET SETUP
  // ==========================================================================
  function init() {
    initConfetti();
    setupNavigation();
    setupSocket();
    fetchQuestions();

    if (playerName) {
      playerNameInput.value = playerName;
    }

    setupEventHandlers();
  }

  function setupNavigation() {
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        switchTab(tab);
      });
    });

    brandLink.addEventListener('click', () => switchTab('play'));
    viewLeaderboardBtn.addEventListener('click', () => switchTab('leaderboard'));
  }

  function switchTab(tabName) {
    navBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });

    tabPanes.forEach(pane => {
      pane.classList.toggle('active', pane.id === `tab-${tabName}`);
    });

    if (tabName === 'play' && !gameCard.classList.contains('hidden')) {
      setTimeout(() => guessInput.focus(), 200);
    }
  }

  function setupSocket() {
    try {
      socket = io();

      socket.on('connect', () => {
        connectionStatus.classList.remove('disconnected');
        connectionStatus.querySelector('.status-text').textContent = 'Live Connected';
        if (playerName) {
          socket.emit('player_join', { name: playerName, playerId });
        }
      });

      socket.on('disconnect', () => {
        connectionStatus.classList.add('disconnected');
        connectionStatus.querySelector('.status-text').textContent = 'Reconnecting...';
      });

      socket.on('leaderboard_update', (data) => {
        currentLeaderboard = data || [];
        renderLeaderboard(currentLeaderboard);
      });

      socket.on('active_players_count', (count) => {
        activePlayersText.textContent = `${count} Player${count === 1 ? '' : 's'} Connected`;
      });

      socket.on('score_acknowledged', (res) => {
        if (res && res.rank) {
          finalRankVal.textContent = `#${res.rank}`;
        }
      });
    } catch (err) {
      console.warn('Socket.io connection warning:', err);
    }
  }

  async function fetchQuestions() {
    try {
      const res = await fetch('/api/questions');
      if (res.ok) {
        questions = await res.json();
      }
    } catch (err) {
      console.error('Failed to load questions from server API:', err);
    }
  }

  // ==========================================================================
  // GAMEPLAY CONTROLLER
  // ==========================================================================
  function setupEventHandlers() {
    // Join form
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredName = playerNameInput.value.trim();
      if (!enteredName) return;

      playerName = enteredName;
      localStorage.setItem('gtq_player_name', playerName);

      if (socket && socket.connected) {
        socket.emit('player_join', { name: playerName, playerId });
      }

      startGame();
    });

    // Reveal next clue button
    revealClueBtn.addEventListener('click', () => {
      revealNextClue();
    });

    // Skip question button
    skipRoundBtn.addEventListener('click', () => {
      skipRound();
    });

    // Guess form submission
    guessForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleGuessSubmit();
    });

    // Play again button
    playAgainBtn.addEventListener('click', () => {
      startGame();
    });

    // Reset leaderboard button (host feature)
    resetLeaderboardBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset the entire leaderboard for a new event round?')) {
        fetch('/api/reset-leaderboard', { method: 'POST' });
      }
    });

    // Reverse Detective Checkboxes
    [checkScientist, checkQuantity, checkExample].forEach(chk => {
      chk.addEventListener('change', updateBonusTally);
    });

    // Reverse Detective Timer
    timerToggleBtn.addEventListener('click', toggleCountdownTimer);
    resetChecklistBtn.addEventListener('click', resetReverseDetectiveChecklist);
    awardBonusBtn.addEventListener('click', awardBonusPointsToCurrentPlayer);
  }

  function startGame() {
    currentRoundIndex = 0;
    totalScore = 0;
    correctCount = 0;
    gameStartTime = Date.now();

    joinCard.classList.add('hidden');
    summaryCard.classList.add('hidden');
    gameCard.classList.remove('hidden');

    loadRound(currentRoundIndex);
  }

  function loadRound(roundIdx) {
    if (!questions || questions.length === 0) {
      setTimeout(() => loadRound(roundIdx), 200);
      return;
    }

    const q = questions[roundIdx];
    if (!q) {
      finishGame();
      return;
    }

    // Reset round state
    revealedCluesCount = 1; // Clue 1 visible immediately!
    currentPointsAtStake = 100;

    // Update HUD
    hudCurrentRound.textContent = roundIdx + 1;
    hudCurrentPoints.textContent = `${currentPointsAtStake} pts`;
    hudTotalScore.textContent = `${totalScore} pts`;
    roundProgressFill.style.width = `${((roundIdx + 1) / questions.length) * 100}%`;

    // Clear feedback and guess input
    guessInput.value = '';
    guessInput.disabled = false;
    submitGuessBtn.disabled = false;
    guessFeedback.textContent = '';
    guessFeedback.className = 'guess-feedback';

    // Render Clues
    renderClues(q);

    // Update buttons
    updateClueButtons();

    // Focus input
    setTimeout(() => guessInput.focus(), 100);
  }

  function renderClues(q) {
    cluesContainer.innerHTML = '';

    for (let i = 0; i < revealedCluesCount; i++) {
      const clue = q.clues[i];
      if (!clue) continue;

      const clueCard = document.createElement('div');
      clueCard.className = `clue-card ${i === revealedCluesCount - 1 ? 'active-clue' : ''}`;
      
      const badge = document.createElement('div');
      badge.className = 'clue-badge';
      badge.textContent = clue.badge || `Clue ${clue.level} (${clue.points} pts)`;

      const text = document.createElement('p');
      text.className = 'clue-text';
      text.textContent = clue.text;

      clueCard.appendChild(badge);
      clueCard.appendChild(text);
      cluesContainer.appendChild(clueCard);
    }
  }

  function updateClueButtons() {
    if (revealedCluesCount === 1) {
      currentPointsAtStake = 100;
      revealClueBtn.disabled = false;
      revealClueText.textContent = 'Reveal Next Clue (-25 pts)';
    } else if (revealedCluesCount === 2) {
      currentPointsAtStake = 75;
      revealClueBtn.disabled = false;
      revealClueText.textContent = 'Reveal Next Clue (-25 pts)';
    } else if (revealedCluesCount === 3) {
      currentPointsAtStake = 50;
      revealClueBtn.disabled = false;
      revealClueText.textContent = 'Reveal Final Story Clue (-25 pts)';
    } else {
      currentPointsAtStake = 25;
      revealClueBtn.disabled = true;
      revealClueText.textContent = 'All 4 Clues Revealed (25 pts)';
    }

    hudCurrentPoints.textContent = `${currentPointsAtStake} pts`;
  }

  function revealNextClue() {
    if (revealedCluesCount < 4) {
      revealedCluesCount++;
      const q = questions[currentRoundIndex];
      renderClues(q);
      updateClueButtons();
      guessInput.focus();
    }
  }

  // ==========================================================================
  // ANSWER EVALUATION & LENIENT MATCHING
  // ==========================================================================
  function normalizeString(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .trim()
      .replace(/[·•\s\-_\/\\\^\*]+/g, '')
      .replace(/[.,!?;:'"()]/g, '');
  }

  function checkGuess(userGuess, q) {
    const rawGuess = userGuess.trim();
    if (!rawGuess) return false;

    const norm = normalizeString(rawGuess);
    const unitNorm = normalizeString(q.unit);
    const symbolNorm = normalizeString(q.symbol);
    const qtyNorm = normalizeString(q.quantity);

    // Exact match on unit, symbol, or quantity
    if (norm === unitNorm || norm === symbolNorm || norm === qtyNorm) return true;

    // Check aliases list
    if (q.aliases && Array.isArray(q.aliases)) {
      for (const alias of q.aliases) {
        if (norm === normalizeString(alias)) return true;
      }
    }

    // Lenient plural check (e.g. "coulombs" vs "coulomb", "farads" vs "farad")
    if (norm.endsWith('s') && norm.slice(0, -1) === unitNorm) return true;
    if (unitNorm.endsWith('s') && unitNorm.slice(0, -1) === norm) return true;

    return false;
  }

  function handleGuessSubmit() {
    const guess = guessInput.value.trim();
    if (!guess) return;

    const q = questions[currentRoundIndex];
    const isCorrect = checkGuess(guess, q);

    if (isCorrect) {
      handleCorrectAnswer(q);
    } else {
      handleIncorrectAnswer();
    }
  }

  function handleIncorrectAnswer() {
    guessFeedback.className = 'guess-feedback shake';
    guessFeedback.textContent = '❌ Not quite! Reveal another clue or try another SI unit/symbol.';
    guessInput.focus();
    guessInput.select();

    setTimeout(() => {
      guessFeedback.classList.remove('shake');
    }, 500);
  }

  function handleCorrectAnswer(q) {
    guessInput.disabled = true;
    submitGuessBtn.disabled = true;

    const earnedPoints = currentPointsAtStake;
    totalScore += earnedPoints;
    correctCount++;

    hudTotalScore.textContent = `${totalScore} pts`;

    // Confetti celebration
    triggerConfetti();

    // Show Reveal Overlay
    revealCard.classList.remove('skipped');
    revealIcon.textContent = '🎉';
    revealVerdict.textContent = 'CORRECT GUESS!';
    revealVerdict.style.color = 'var(--accent-emerald)';
    revealPoints.textContent = `+${earnedPoints} Points Earned`;
    revealQuantity.textContent = q.quantity;
    revealUnit.textContent = `${q.unit} (${q.symbol})`;
    revealFormula.textContent = q.dimensionalFormula || 'SI Derived';
    revealExplanation.textContent = q.explanation || '';

    revealOverlay.classList.remove('hidden');

    // Auto-advance after 1.5s
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = setTimeout(() => {
      advanceRound();
    }, 1500);
  }

  function skipRound() {
    const q = questions[currentRoundIndex];
    guessInput.disabled = true;
    submitGuessBtn.disabled = true;

    // Reveal with 0 points
    revealCard.classList.add('skipped');
    revealIcon.textContent = '⏭️';
    revealVerdict.textContent = 'QUESTION SKIPPED';
    revealVerdict.style.color = 'var(--accent-coral)';
    revealPoints.textContent = '0 Points';
    revealQuantity.textContent = q.quantity;
    revealUnit.textContent = `${q.unit} (${q.symbol})`;
    revealFormula.textContent = q.dimensionalFormula || 'SI Derived';
    revealExplanation.textContent = q.explanation || '';

    revealOverlay.classList.remove('hidden');

    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = setTimeout(() => {
      advanceRound();
    }, 1500);
  }

  function advanceRound() {
    revealOverlay.classList.add('hidden');
    currentRoundIndex++;

    if (currentRoundIndex < questions.length) {
      loadRound(currentRoundIndex);
    } else {
      finishGame();
    }
  }

  // ==========================================================================
  // GAME COMPLETION & SCORE SUBMISSION
  // ==========================================================================
  function finishGame() {
    const totalTimeSec = Math.max(1, Math.round((Date.now() - gameStartTime) / 1000));

    gameCard.classList.add('hidden');
    summaryCard.classList.remove('hidden');

    finalScoreVal.textContent = totalScore;
    finalCorrectVal.textContent = `${correctCount}/${questions.length}`;
    finalTimeVal.textContent = `${totalTimeSec}s`;

    // Submit via Socket.io
    const payload = {
      name: playerName,
      score: totalScore,
      totalTimeSec,
      playerId
    };

    if (socket && socket.connected) {
      socket.emit('submit_score', payload);
    }

    // Fallback REST call
    fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.rank) {
          finalRankVal.textContent = `#${data.rank}`;
        }
      })
      .catch(err => console.error('Score submission error:', err));

    triggerConfetti();

    // Auto-switch to leaderboard after 3.5s so player sees their trophy first
    setTimeout(() => {
      switchTab('leaderboard');
    }, 3500);
  }

  // ==========================================================================
  // LEADERBOARD RENDERING (Podium + Table)
  // ==========================================================================
  function renderLeaderboard(data) {
    if (!data || !Array.isArray(data)) return;

    // 1. Podium Cards (Top 3)
    podiumGrid.innerHTML = '';
    const top3 = [data[0], data[1], data[2]];

    const podiumOrder = [
      { player: top3[1], rank: 2, medal: '🥈 2nd', crown: '👑', rankClass: 'rank-2' },
      { player: top3[0], rank: 1, medal: '🥇 1st', crown: '👑', rankClass: 'rank-1' },
      { player: top3[2], rank: 3, medal: '🥉 3rd', crown: '👑', rankClass: 'rank-3' }
    ];

    podiumOrder.forEach(item => {
      if (item.player) {
        const card = document.createElement('div');
        card.className = `podium-card ${item.rankClass}`;
        card.innerHTML = `
          <div class="podium-crown">${item.crown}</div>
          <div class="podium-medal">${item.medal}</div>
          <div class="podium-name" title="${escapeHtml(item.player.name)}">${escapeHtml(item.player.name)}</div>
          <div class="podium-score">${item.player.score} <small>pts</small></div>
          <div class="podium-time">⏱️ ${item.player.totalTimeSec || 0}s</div>
        `;
        podiumGrid.appendChild(card);
      }
    });

    // 2. Full Table Rows
    leaderboardTbody.innerHTML = '';
    if (data.length === 0) {
      leaderboardTbody.innerHTML = `
        <tr class="empty-row">
          <td colspan="5">Waiting for first player to finish Round 10... Be the first!</td>
        </tr>
      `;
      return;
    }

    data.forEach((p, idx) => {
      const tr = document.createElement('tr');
      const isCurrentUser = (p.id === playerId || p.name === playerName);
      if (isCurrentUser) tr.classList.add('current-user-row');

      let rankDisplay = `#${idx + 1}`;
      if (idx === 0) rankDisplay = '🥇 1';
      else if (idx === 1) rankDisplay = '🥈 2';
      else if (idx === 2) rankDisplay = '🥉 3';

      tr.innerHTML = `
        <td class="td-rank"><strong>${rankDisplay}</strong></td>
        <td class="td-name"><strong>${escapeHtml(p.name)}</strong>${isCurrentUser ? ' <span class="highlight-gold">(You)</span>' : ''}</td>
        <td class="td-score">${p.score} pts</td>
        <td class="td-time">${p.totalTimeSec || 0}s</td>
        <td class="td-date">${p.completedAt || 'Just now'}</td>
      `;
      leaderboardTbody.appendChild(tr);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // ==========================================================================
  // REVERSE DETECTIVE (HOST TOOL)
  // ==========================================================================
  function updateBonusTally() {
    let count = 0;
    if (checkScientist.checked) count++;
    if (checkQuantity.checked) count++;
    if (checkExample.checked) count++;

    bonusChecklistPoints = count * 50;
    bonusPointsTally.textContent = `${bonusChecklistPoints} / 150 pts`;
  }

  function resetReverseDetectiveChecklist() {
    checkScientist.checked = false;
    checkQuantity.checked = false;
    checkExample.checked = false;
    updateBonusTally();
    clearInterval(countdownTimerInterval);
    countdownSeconds = 30;
    timerDisplay.textContent = '30s';
    timerToggleBtn.textContent = 'Start 30s Countdown';
  }

  function toggleCountdownTimer() {
    if (countdownTimerInterval) {
      clearInterval(countdownTimerInterval);
      countdownTimerInterval = null;
      timerToggleBtn.textContent = 'Resume Timer';
    } else {
      timerToggleBtn.textContent = 'Pause Timer';
      countdownTimerInterval = setInterval(() => {
        countdownSeconds--;
        timerDisplay.textContent = `${countdownSeconds}s`;
        if (countdownSeconds <= 0) {
          clearInterval(countdownTimerInterval);
          countdownTimerInterval = null;
          timerDisplay.textContent = "TIME'S UP!";
          timerToggleBtn.textContent = 'Restart Timer';
          countdownSeconds = 30;
        }
      }, 1000);
    }
  }

  function awardBonusPointsToCurrentPlayer() {
    if (bonusChecklistPoints <= 0) {
      alert('Please check off at least one verified answer to award bonus points.');
      return;
    }

    if (!playerName) {
      playerName = prompt('Enter the contestant/team name to award bonus points:') || 'Contestant';
    }

    totalScore += bonusChecklistPoints;
    hudTotalScore.textContent = `${totalScore} pts`;

    // Send updated score to server
    const payload = {
      name: playerName,
      score: totalScore,
      totalTimeSec: 0,
      playerId
    };

    if (socket && socket.connected) {
      socket.emit('submit_score', payload);
    } else {
      fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    triggerConfetti();
    alert(`🎉 Awarded +${bonusChecklistPoints} bonus points to ${playerName}! Standings updated live.`);
    resetReverseDetectiveChecklist();
    switchTab('leaderboard');
  }

  // ==========================================================================
  // LIGHTWEIGHT CANVAS CONFETTI (NO EXTERNAL SCRIPTS NEEDED)
  // ==========================================================================
  function initConfetti() {
    function resizeCanvas() {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
  }

  function triggerConfetti() {
    const colors = ['#f59e0b', '#fbbf24', '#ff5e62', '#10b981', '#38bdf8', '#ffffff'];
    const count = 90;

    for (let i = 0; i < count; i++) {
      confettiParticles.push({
        x: confettiCanvas.width * (0.2 + Math.random() * 0.6),
        y: confettiCanvas.height * 0.4 + Math.random() * 100,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 14 - 4,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.01
      });
    }

    if (!confettiAnimationId) {
      renderConfetti();
    }
  }

  function renderConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // Gravity
      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > confettiCanvas.height) {
        confettiParticles.splice(i, 1);
        continue;
      }

      confettiCtx.save();
      confettiCtx.globalAlpha = p.alpha;
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rotation * Math.PI) / 180);
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      confettiCtx.restore();
    }

    if (confettiParticles.length > 0) {
      confettiAnimationId = requestAnimationFrame(renderConfetti);
    } else {
      confettiAnimationId = null;
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  // --- START APP ---
  document.addEventListener('DOMContentLoaded', init);
})();
