// Realtime Sync Engine for "Guess the Quantity"
// Seamlessly operates in two modes:
// 1. Firebase Realtime Database (for 50+ real mobile phones over internet/WiFi)
// 2. Local Broadcast Engine (BroadcastChannel + localStorage for instant zero-config multi-tab testing)

import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, set, update, onValue, get } from 'firebase/database';
import { activeFirebaseConfig, isFirebaseConfigured } from '../firebase-config.js';
import questions from '../data/questions.json';

class RealtimeEngine {
  constructor() {
    this.isFirebase = false;
    this.db = null;
    this.activeRoomCode = 'PHY50';
    this.localChannel = null;
    this.listeners = new Set();
    this.currentState = this.getInitialRoomState('PHY50');
    this.botIntervals = [];

    this.init();
  }

  init() {
    if (isFirebaseConfigured()) {
      try {
        const app = getApps().length === 0 ? initializeApp(activeFirebaseConfig) : getApps()[0];
        this.db = getDatabase(app);
        this.isFirebase = true;
        console.log('[RealtimeEngine] Connected to Firebase Realtime Database:', activeFirebaseConfig.databaseURL);
      } catch (err) {
        console.warn('[RealtimeEngine] Firebase init failed, falling back to Local Engine:', err);
        this.initLocalEngine();
      }
    } else {
      this.initLocalEngine();
    }
  }

  initLocalEngine() {
    this.isFirebase = false;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.localChannel = new BroadcastChannel('gtq_local_sync');
      this.localChannel.onmessage = (event) => {
        if (event.data?.type === 'ROOM_UPDATE' && event.data.roomCode === this.activeRoomCode) {
          this.currentState = event.data.state;
          this.notifyListeners(this.currentState);
        }
      };

      // Also listen to storage events across tabs/windows
      window.addEventListener('storage', (e) => {
        if (e.key === `gtq_room_${this.activeRoomCode}` && e.newValue) {
          try {
            this.currentState = JSON.parse(e.newValue);
            this.notifyListeners(this.currentState);
          } catch (err) {
            // ignore
          }
        }
      });
    }
    console.log('[RealtimeEngine] Operating in Local BroadcastChannel mode (Multi-tab synchronized).');
  }

  getInitialRoomState(roomCode = 'PHY50') {
    return {
      code: (roomCode || 'PHY50').toUpperCase(),
      createdAt: Date.now(),
      status: 'lobby', // 'lobby' | 'clue' | 'steal' | 'revealed' | 'reverse_detective' | 'game_over'
      currentQuestionIndex: 0,
      revealedClues: 1, // 1 to 4
      activePoints: 100,
      basePointsForClue: 100,
      stealActive: false,
      frozenPlayerId: null,
      winnerOfRound: null,
      players: {},
      guesses: [],
      reverseSubmissions: []
    };
  }

  // Subscribe to room updates
  subscribeRoom(roomCode = 'PHY50', callback) {
    const code = (roomCode || 'PHY50').toUpperCase();
    this.activeRoomCode = code;
    this.listeners.add(callback);

    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${code}`);
      const unsubscribe = onValue(roomRef, (snapshot) => {
        const val = snapshot.val();
        if (val) {
          this.currentState = val;
          callback(val);
        }
      });
      return () => {
        this.listeners.delete(callback);
        unsubscribe();
      };
    } else {
      // Local mode: Check if existing in localStorage, otherwise initialize!
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(`gtq_room_${code}`);
        if (raw) {
          try {
            this.currentState = JSON.parse(raw);
          } catch (e) {
            this.currentState = this.getInitialRoomState(code);
          }
        } else {
          this.currentState = this.getInitialRoomState(code);
          localStorage.setItem(`gtq_room_${code}`, JSON.stringify(this.currentState));
        }
      } else {
        this.currentState = this.getInitialRoomState(code);
      }

      // Immediately deliver currentState so the subscriber never sees null!
      callback(this.currentState);

      return () => {
        this.listeners.delete(callback);
      };
    }
  }

  notifyListeners(state) {
    this.listeners.forEach((fn) => {
      try {
        fn(state);
      } catch (e) {
        console.error('[RealtimeEngine] Listener error:', e);
      }
    });
  }

  // Host: Initialize or Reset Room
  async createOrResetRoom(roomCode = 'PHY50') {
    const code = roomCode.toUpperCase();
    this.activeRoomCode = code;
    const newState = this.getInitialRoomState(code);
    this.currentState = newState;

    if (this.isFirebase && this.db) {
      await set(ref(this.db, `rooms/${code}`), newState);
    } else {
      localStorage.setItem(`gtq_room_${code}`, JSON.stringify(newState));
      this.localChannel?.postMessage({ type: 'ROOM_UPDATE', roomCode: code, state: newState });
    }
    this.notifyListeners(newState);
    return newState;
  }

  // Host: Generic Patch State
  async updateRoomState(patch) {
    if (!this.activeRoomCode) return;
    const code = this.activeRoomCode;

    if (this.isFirebase && this.db) {
      await update(ref(this.db, `rooms/${code}`), patch);
    } else {
      const raw = localStorage.getItem(`gtq_room_${code}`);
      let current = raw ? JSON.parse(raw) : this.getInitialRoomState(code);
      const updated = { ...current, ...patch };
      this.currentState = updated;
      localStorage.setItem(`gtq_room_${code}`, JSON.stringify(updated));
      this.localChannel?.postMessage({ type: 'ROOM_UPDATE', roomCode: code, state: updated });
      this.notifyListeners(updated);
    }
  }

  // Player: Join Room
  async joinRoom(roomCode, player) {
    const code = roomCode.toUpperCase();
    this.activeRoomCode = code;

    const playerData = {
      id: player.id,
      name: player.name.trim() || 'Anonymous Team',
      score: 0,
      streak: 0,
      correctCount: 0,
      isFrozen: false,
      joinedAt: Date.now()
    };

    if (this.isFirebase && this.db) {
      await set(ref(this.db, `rooms/${code}/players/${player.id}`), playerData);
    } else {
      const raw = localStorage.getItem(`gtq_room_${code}`);
      let current = raw ? JSON.parse(raw) : this.getInitialRoomState(code);
      if (!current.players) current.players = {};
      // preserve score if already joined
      if (current.players[player.id]) {
        playerData.score = current.players[player.id].score || 0;
        playerData.streak = current.players[player.id].streak || 0;
        playerData.correctCount = current.players[player.id].correctCount || 0;
      }
      current.players[player.id] = playerData;
      this.currentState = current;
      localStorage.setItem(`gtq_room_${code}`, JSON.stringify(current));
      this.localChannel?.postMessage({ type: 'ROOM_UPDATE', roomCode: code, state: current });
      this.notifyListeners(current);
    }

    return playerData;
  }

  // Host: Start Game (First Round)
  async startGame() {
    await this.updateRoomState({
      status: 'clue',
      currentQuestionIndex: 0,
      revealedClues: 1,
      activePoints: 100,
      basePointsForClue: 100,
      stealActive: false,
      frozenPlayerId: null,
      winnerOfRound: null,
      guesses: []
    });
  }

  // Host: Reveal Next Clue (1 -> 2 -> 3 -> 4)
  async revealNextClue() {
    if (!this.currentState) return;
    const nextLevel = Math.min((this.currentState.revealedClues || 1) + 1, 4);
    const pointTable = { 1: 100, 2: 75, 3: 50, 4: 25 };
    const basePts = pointTable[nextLevel];
    const finalPts = this.currentState.stealActive ? Math.round(basePts * 0.5) : basePts;

    // When a new clue is revealed, unfreeze any player who was frozen on previous clue
    const unfreezePatch = {};
    if (this.currentState.players) {
      Object.keys(this.currentState.players).forEach((pid) => {
        unfreezePatch[`players/${pid}/isFrozen`] = false;
      });
    }

    await this.updateRoomState({
      ...unfreezePatch,
      revealedClues: nextLevel,
      basePointsForClue: basePts,
      activePoints: finalPts,
      frozenPlayerId: null,
      status: this.currentState.stealActive ? 'steal' : 'clue'
    });
  }

  // Host: Trigger Steal Round Manually or After Wrong Guess
  async triggerSteal(frozenPid = null) {
    if (!this.currentState) return;
    const basePts = this.currentState.basePointsForClue || 100;
    const stealPts = Math.round(basePts * 0.5);

    const patch = {
      stealActive: true,
      status: 'steal',
      activePoints: stealPts
    };

    if (frozenPid) {
      patch.frozenPlayerId = frozenPid;
      if (this.currentState.players && this.currentState.players[frozenPid]) {
        patch[`players/${frozenPid}/isFrozen`] = true;
      }
    }

    await this.updateRoomState(patch);
  }

  // Player: Submit Guess
  async submitGuess(playerId, guessText) {
    if (!this.currentState || !guessText?.trim()) return { success: false, reason: 'Empty guess' };
    const state = this.currentState;

    if (state.status !== 'clue' && state.status !== 'steal') {
      return { success: false, reason: 'Round is not accepting guesses' };
    }

    const player = state.players?.[playerId];
    if (player?.isFrozen) {
      return { success: false, reason: 'You are frozen for this clue! Wait for next clue.' };
    }

    const currentQ = questions[state.currentQuestionIndex || 0];
    const cleanGuess = guessText.trim().toLowerCase();

    // Check correctness: exact match, alias match, or fuzzy match
    const isCorrect = this.checkAnswerMatch(cleanGuess, currentQ);
    const guessId = 'g_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);

    const guessEntry = {
      id: guessId,
      playerId,
      playerName: player?.name || 'Player',
      guessText: guessText.trim(),
      timestamp: Date.now(),
      isCorrect,
      clueLevel: state.revealedClues || 1,
      pointsClaimed: isCorrect ? state.activePoints : 0
    };

    const currentGuesses = Array.isArray(state.guesses) ? [...state.guesses, guessEntry] : [guessEntry];

    if (isCorrect) {
      // Correct! Award points, update streak, lock question
      const award = state.activePoints;
      const newScore = (player?.score || 0) + award;
      const newStreak = (player?.streak || 0) + 1;
      const newCorrectCount = (player?.correctCount || 0) + 1;

      await this.updateRoomState({
        status: 'revealed',
        winnerOfRound: {
          playerId,
          name: player?.name || 'Player',
          points: award,
          guess: guessText.trim()
        },
        [`players/${playerId}/score`]: newScore,
        [`players/${playerId}/streak`]: newStreak,
        [`players/${playerId}/correctCount`]: newCorrectCount,
        guesses: currentGuesses
      });

      return { success: true, correct: true, points: award };
    } else {
      // Wrong guess: Freeze this player & auto-activate Steal Round for other teams!
      const patch = {
        guesses: currentGuesses
      };

      // Freeze wrong player
      if (player) {
        patch[`players/${playerId}/isFrozen`] = true;
        patch[`players/${playerId}/streak`] = 0;
      }

      // If not already in steal round, trigger steal round:
      // Points for next buzz cut to 50%
      if (!state.stealActive) {
        patch.stealActive = true;
        patch.status = 'steal';
        patch.frozenPlayerId = playerId;
        const basePts = state.basePointsForClue || 100;
        patch.activePoints = Math.round(basePts * 0.5);
      }

      await this.updateRoomState(patch);
      return { success: true, correct: false, reason: 'Incorrect! Steal round active.' };
    }
  }

  // Answer matching with intelligent fuzzy comparison
  checkAnswerMatch(guess, question) {
    if (!guess || !question) return false;
    const cleanGuess = guess.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanUnit = question.unit.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (cleanGuess === cleanUnit) return true;

    // Check aliases
    if (question.aliases && Array.isArray(question.aliases)) {
      for (const alias of question.aliases) {
        const cleanAlias = alias.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (cleanGuess === cleanAlias) return true;
        // Levenshtein distance 1 for minor typos on words >= 4 chars
        if (cleanAlias.length >= 4 && this.levenshtein(cleanGuess, cleanAlias) <= 1) {
          return true;
        }
      }
    }

    return false;
  }

  levenshtein(a, b) {
    const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      }
    }
    return dp[a.length][b.length];
  }

  // Host: Manual Override on any guess
  async judgeGuessManually(guessId, markCorrect) {
    if (!this.currentState) return;
    const state = this.currentState;
    const guess = (state.guesses || []).find((g) => g.id === guessId);
    if (!guess) return;

    const player = state.players?.[guess.playerId];
    const points = state.activePoints || 50;

    if (markCorrect) {
      const newScore = (player?.score || 0) + points;
      const updatedGuesses = (state.guesses || []).map((g) =>
        g.id === guessId ? { ...g, isCorrect: true, pointsClaimed: points } : g
      );

      await this.updateRoomState({
        status: 'revealed',
        winnerOfRound: {
          playerId: guess.playerId,
          name: guess.playerName,
          points,
          guess: guess.guessText
        },
        [`players/${guess.playerId}/score`]: newScore,
        [`players/${guess.playerId}/isFrozen`]: false,
        guesses: updatedGuesses
      });
    } else {
      const updatedGuesses = (state.guesses || []).map((g) =>
        g.id === guessId ? { ...g, isCorrect: false } : g
      );
      await this.updateRoomState({
        guesses: updatedGuesses
      });
    }
  }

  // Host: Next Question
  async nextQuestion() {
    if (!this.currentState) return;
    const nextIdx = (this.currentState.currentQuestionIndex || 0) + 1;

    if (nextIdx >= questions.length) {
      // All standard rounds complete!
      await this.updateRoomState({
        status: 'game_over',
        revealedClues: 4,
        winnerOfRound: null
      });
      return;
    }

    // Reset unfreeze for all players
    const unfreezePatch = {};
    if (this.currentState.players) {
      Object.keys(this.currentState.players).forEach((pid) => {
        unfreezePatch[`players/${pid}/isFrozen`] = false;
      });
    }

    await this.updateRoomState({
      ...unfreezePatch,
      status: 'clue',
      currentQuestionIndex: nextIdx,
      revealedClues: 1,
      activePoints: 100,
      basePointsForClue: 100,
      stealActive: false,
      frozenPlayerId: null,
      winnerOfRound: null,
      guesses: []
    });
  }

  // Host: Start Reverse Detective Round
  async startReverseDetective() {
    if (!this.currentState) return;
    // Reset unfreeze
    const unfreezePatch = {};
    if (this.currentState.players) {
      Object.keys(this.currentState.players).forEach((pid) => {
        unfreezePatch[`players/${pid}/isFrozen`] = false;
      });
    }

    await this.updateRoomState({
      ...unfreezePatch,
      status: 'reverse_detective',
      reverseSubmissions: []
    });
  }

  // Player: Submit Reverse Detective Clue
  async submitReverseClue(playerId, text, clueCategory = 'general') {
    if (!this.currentState || !text?.trim()) return;
    const player = this.currentState.players?.[playerId];
    const currentQ = questions[this.currentState.currentQuestionIndex || 0];

    const submissionId = 'rev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);

    // Auto check keywords
    let autoMatched = false;
    if (currentQ?.reverseDetective?.keywords) {
      const lower = text.toLowerCase();
      autoMatched = currentQ.reverseDetective.keywords.some((kw) => lower.includes(kw.toLowerCase()));
    }

    const newSub = {
      id: submissionId,
      playerId,
      playerName: player?.name || 'Player',
      text: text.trim(),
      category: clueCategory,
      autoMatched,
      pointsAwarded: 0,
      status: autoMatched ? 'auto_matched' : 'pending',
      timestamp: Date.now()
    };

    const currentSubs = Array.isArray(this.currentState.reverseSubmissions)
      ? [...this.currentState.reverseSubmissions, newSub]
      : [newSub];

    await this.updateRoomState({
      reverseSubmissions: currentSubs
    });
  }

  // Host: Award points for a Reverse Detective submission
  async awardReversePoints(submissionId, points) {
    if (!this.currentState) return;
    const subs = this.currentState.reverseSubmissions || [];
    const target = subs.find((s) => s.id === submissionId);
    if (!target) return;

    const player = this.currentState.players?.[target.playerId];
    const newScore = (player?.score || 0) + points;

    const updatedSubs = subs.map((s) =>
      s.id === submissionId ? { ...s, pointsAwarded: points, status: 'awarded' } : s
    );

    await this.updateRoomState({
      reverseSubmissions: updatedSubs,
      [`players/${target.playerId}/score`]: newScore
    });
  }

  // Host: Spawn Simulated Bot Players (for 10 to 50 players load/game test)
  async spawnSimulatedBots(count = 10) {
    const botNames = [
      'Quantum Quirks', 'Schrödinger Kittens', 'Maxwell Daemons', 'Curie Chemists',
      'Galileo Gaze', 'Newtonian Apples', 'Fermi Paradox', 'Planck Constants',
      'Bohr Orbiters', 'Tesla Coilers', 'Higgs Bosons', 'Faraday Cages',
      'Ohm Sweet Ohm', 'Doppler Shifters', 'Entropy Chaos', 'Hawking Radiators',
      'Cosmic Rays', 'Kepler Ellipses', 'Hubble Redshifts', 'Carnot Cycles',
      'Avogadro Molehills', 'Ampere Circuits', 'Joule Thieves', 'Pascal Pressures',
      'Kelvin Chill', 'Rutherford Alphas', 'Dirac Seas', 'Heisenberg Uncertains',
      'Feynman Diags', 'Bell Inequalities', 'Lorentz Boosts', 'Chandra Limits',
      'Poynting Vectors', 'Navier Stokes', 'Fourier Waves', 'Bernoulli Jets',
      'Archimedes Baths', 'Hooke Springs', 'Snell Refractors', 'Cavendish Spheres',
      'Zeeman Splitters', 'Lyman Cascades', 'Pauli Excluders', 'Compton Scatterers',
      'DeBroglie Waves', 'Thomson Plums', 'Millikan Drops', 'Bose Condensates',
      'Casimir Plates', 'Yukawa Mesons'
    ];

    const currentPlayers = { ...(this.currentState?.players || {}) };
    const toAdd = botNames.slice(0, count);

    for (let i = 0; i < toAdd.length; i++) {
      const bId = `bot_${i + 1}`;
      currentPlayers[bId] = {
        id: bId,
        name: toAdd[i],
        score: Math.floor(Math.random() * 150),
        streak: Math.floor(Math.random() * 2),
        correctCount: Math.floor(Math.random() * 2),
        isFrozen: false,
        isBot: true,
        joinedAt: Date.now()
      };
    }

    await this.updateRoomState({ players: currentPlayers });
    console.log(`[RealtimeEngine] Spawned ${count} simulated bot teams!`);
  }

  // Clear simulated bots
  async clearBots() {
    if (!this.currentState?.players) return;
    const remaining = {};
    Object.entries(this.currentState.players).forEach(([pid, p]) => {
      if (!p.isBot) remaining[pid] = p;
    });
    await this.updateRoomState({ players: remaining });
  }
}

export const realtimeEngine = new RealtimeEngine();
