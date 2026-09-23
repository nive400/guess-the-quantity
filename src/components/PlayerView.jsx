import React, { useState, useEffect } from 'react';
import { realtimeEngine } from '../services/realtimeEngine';
import { soundFX } from '../services/audio';
import questions from '../data/questions.json';
import { 
  Zap, 
  Send, 
  ShieldAlert, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Flame, 
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import ReverseDetectiveView from './ReverseDetectiveView';

export default function PlayerView({ roomState, roomCode, initialRoomParam }) {
  const [playerId, setPlayerId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [inputRoomCode, setInputRoomCode] = useState(initialRoomParam || roomCode || 'PHY50');
  const [guessText, setGuessText] = useState('');
  const [lastFeedback, setLastFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize or restore player ID from localStorage
  useEffect(() => {
    let storedId = localStorage.getItem('gtq_player_id');
    let storedName = localStorage.getItem('gtq_player_name');
    if (!storedId) {
      storedId = 'p_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('gtq_player_id', storedId);
    }
    setPlayerId(storedId);
    if (storedName) {
      setPlayerName(storedName);
    }
  }, []);

  // Check if player is already registered in the room state
  useEffect(() => {
    if (playerId && roomState?.players?.[playerId]) {
      setIsJoined(true);
      setPlayerName(roomState.players[playerId].name);
    }
  }, [playerId, roomState?.players]);

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    localStorage.setItem('gtq_player_name', playerName.trim());
    setIsSubmitting(true);
    try {
      await realtimeEngine.joinRoom(inputRoomCode.trim(), {
        id: playerId,
        name: playerName.trim()
      });
      setIsJoined(true);
      soundFX.playClueChime();
    } catch (err) {
      alert('Failed to join room: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuessSubmit = async (e) => {
    e.preventDefault();
    if (!guessText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const guessToSubmit = guessText;
    setGuessText('');

    try {
      const res = await realtimeEngine.submitGuess(playerId, guessToSubmit);
      if (res.correct) {
        soundFX.playCorrect();
        setLastFeedback({ type: 'correct', message: `🎉 Spot on! +${res.points} pts locked in!` });
      } else {
        soundFX.playWrong();
        setLastFeedback({ type: 'wrong', message: res.reason || '❌ Incorrect! Steal round active!' });
      }
    } catch (err) {
      setLastFeedback({ type: 'error', message: 'Error submitting guess: ' + err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Find this player's data
  const myPlayer = roomState?.players?.[playerId] || { score: 0, streak: 0, isFrozen: false, rank: 1 };
  
  // Calculate player's live rank
  const allPlayers = Object.values(roomState?.players || {}).sort((a, b) => (b.score || 0) - (a.score || 0));
  const myRankIndex = allPlayers.findIndex((p) => p.id === playerId);
  const myRank = myRankIndex >= 0 ? myRankIndex + 1 : '-';

  const currentQIndex = roomState?.currentQuestionIndex || 0;
  const currentQ = questions[currentQIndex] || questions[0];
  const revealedClues = roomState?.revealedClues || 1;
  const activePoints = roomState?.activePoints || 100;
  const isStealActive = roomState?.stealActive;
  const isFrozen = myPlayer.isFrozen;

  // View: Join Screen
  if (!isJoined) {
    return (
      <div className="min-h-[calc(100vh-60px)] flex items-center justify-center p-4 bg-grid">
        <div className="w-full max-w-md p-6 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3 shadow-lg shadow-cyan-500/10">
              <Zap className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-display font-black text-white tracking-tight">
              Join the Trivia Room
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Enter your team or player name to compete live!
            </p>
          </div>

          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Room Code
              </label>
              <input
                type="text"
                value={inputRoomCode}
                onChange={(e) => setInputRoomCode(e.target.value.toUpperCase())}
                placeholder="PHY50"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl font-mono text-center text-lg tracking-widest text-cyan-400 font-bold focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Team or Player Name
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="e.g. Quantum Kings or Newton's Apples"
                maxLength={25}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm font-medium focus:border-cyan-400 focus:outline-none"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-black text-base rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform active:scale-98 flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Connecting...' : 'Join Game Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
            ⚡ 50+ concurrent live players • Instant clue buzzer • Real-time leaderboard
          </div>
        </div>
      </div>
    );
  }

  // View: Waiting in Lobby
  if (roomState?.status === 'lobby') {
    return (
      <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center p-4 text-center">
        <div className="p-8 max-w-sm w-full bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 animate-pulse">
            <Clock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-display font-black text-white mb-1">
            You're In, {myPlayer.name}!
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            Waiting for the Host to start Round 1... Keep your eyes on the screen!
          </p>

          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 mb-4">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-0.5">
              Players Joined in Room
            </span>
            <span className="text-2xl font-mono font-bold text-cyan-400">
              {Object.keys(roomState.players || {}).length}
            </span>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Connected & ready</span>
          </div>
        </div>
      </div>
    );
  }

  // View: Reverse Detective Bonus Round
  if (roomState?.status === 'reverse_detective') {
    return (
      <ReverseDetectiveView 
        roomState={roomState} 
        playerId={playerId} 
        isHost={false} 
        currentQ={currentQ} 
      />
    );
  }

  // View: Active Game Round
  return (
    <div className="max-w-2xl mx-auto p-3 sm:p-4 pb-12">
      {/* Player Top HUD: Score & Rank */}
      <div className="flex items-center justify-between p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl mb-3 shadow-lg">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Team</span>
          <span className="font-display font-bold text-sm sm:text-base text-white truncate max-w-[150px] inline-block">
            {myPlayer.name}
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Score</span>
            <span className="font-mono font-extrabold text-base sm:text-lg text-cyan-400">
              {myPlayer.score || 0} <span className="text-[10px] text-cyan-500/80">PTS</span>
            </span>
          </div>

          <div className="text-right pl-3 border-l border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Rank</span>
            <span className="font-display font-black text-base sm:text-lg text-amber-400">
              #{myRank}
            </span>
          </div>

          {(myPlayer.streak || 0) > 1 && (
            <div className="flex items-center gap-0.5 px-2 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 fill-orange-500" />
              <span>{myPlayer.streak}</span>
            </div>
          )}
        </div>
      </div>

      {/* Round & Points Header */}
      <div className={`p-4 rounded-2xl mb-3 border transition-all ${
        isStealActive 
          ? 'bg-rose-950/40 border-rose-600/60 steal-active-pulse' 
          : 'bg-slate-900/80 border-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">
            Round {currentQIndex + 1} of {questions.length}
          </span>

          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase ${
            isStealActive
              ? 'bg-rose-600 text-white animate-pulse'
              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
          }`}>
            <Zap className="w-3.5 h-3.5" />
            <span>{isStealActive ? 'STEAL ROUND: ' : ''}{activePoints} PTS</span>
          </div>
        </div>

        {/* Status Alert Banner */}
        {isStealActive && (
          <div className="flex items-center gap-2 p-2 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-semibold mb-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
            <span>A team missed! Any team can buzz now for <strong>half points ({activePoints} pts)</strong>!</span>
          </div>
        )}

        {isFrozen && (
          <div className="flex items-center gap-2 p-2.5 bg-blue-950/60 border border-blue-500/40 rounded-xl text-blue-200 text-xs font-semibold mb-2">
            <Lock className="w-4 h-4 shrink-0 text-blue-400" />
            <span>❄️ You missed this clue! Your points are frozen until the Host reveals the next clue.</span>
          </div>
        )}

        {/* Revealed Winner if round ended */}
        {roomState?.status === 'revealed' && roomState.winnerOfRound && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-200 text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>
                <strong>{roomState.winnerOfRound.name}</strong> nailed it for <strong>+{roomState.winnerOfRound.points} pts</strong>!
              </span>
            </div>
            <span className="font-mono uppercase font-black text-emerald-400">
              {currentQ.unit}
            </span>
          </div>
        )}
      </div>

      {/* Clues Container */}
      <div className="space-y-2.5 mb-4">
        {currentQ.clues.map((clue, idx) => {
          const isRevealed = idx < revealedClues;
          const isLatestRevealed = idx === revealedClues - 1;

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border transition-all ${
                isRevealed
                  ? isLatestRevealed
                    ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-500/5 clue-enter'
                    : 'bg-slate-900/60 border-slate-800'
                  : 'bg-slate-950/40 border-slate-900 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className={`font-bold flex items-center gap-1.5 ${
                  isRevealed ? 'text-cyan-400' : 'text-slate-500'
                }`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                    isRevealed ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {idx + 1}
                  </span>
                  <span>{clue.type}</span>
                </span>

                <span className="font-mono text-[11px] font-bold text-slate-400">
                  {clue.points} PTS
                </span>
              </div>

              {isRevealed ? (
                <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed pl-6">
                  {clue.text}
                </p>
              ) : (
                <div className="flex items-center gap-2 text-xs text-slate-500 pl-6 py-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Clue locked until Host reveals</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Answer revealed card (if host revealed the full answer) */}
      {roomState?.status === 'revealed' && (
        <div className="p-4 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/40 rounded-2xl mb-4 text-left clue-enter">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> The Correct Quantity
          </div>
          <div className="text-2xl font-display font-black text-white mb-1">
            {currentQ.unit} <span className="text-amber-400 font-mono">({currentQ.symbol})</span>
          </div>
          <p className="text-xs text-slate-300 mb-2">{currentQ.quantity}</p>
          <div className="text-xs text-slate-400 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <strong>Fun Fact:</strong> {currentQ.explanation}
          </div>
        </div>
      )}

      {/* Guess Input Form */}
      {(roomState?.status === 'clue' || roomState?.status === 'steal') && (
        <form onSubmit={handleGuessSubmit} className="space-y-2">
          <div className="relative">
            <input
              type="text"
              value={guessText}
              onChange={(e) => setGuessText(e.target.value)}
              disabled={isFrozen || isSubmitting}
              placeholder={isFrozen ? 'Points frozen on this clue...' : 'Type physical quantity or unit name...'}
              className={`w-full px-4 py-3.5 pr-28 rounded-2xl text-base font-semibold transition-all focus:outline-none ${
                isFrozen
                  ? 'bg-slate-950/60 border border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-900 border-2 border-cyan-500/40 focus:border-cyan-400 text-white placeholder-slate-500 shadow-xl shadow-cyan-950/30'
              }`}
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={isFrozen || !guessText.trim() || isSubmitting}
              className={`absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                isFrozen || !guessText.trim() || isSubmitting
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 shadow-md font-extrabold active:scale-95'
              }`}
            >
              <span>{isSubmitting ? '...' : 'Buzz In'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
            <span>First correct guess locks in the round!</span>
            <span>Auto-spell & alias tolerant</span>
          </div>
        </form>
      )}

      {/* Guess Feedback Toast */}
      {lastFeedback && (
        <div className={`mt-3 p-3 rounded-xl border text-xs font-semibold flex items-center justify-between animate-fadeIn ${
          lastFeedback.type === 'correct'
            ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
            : 'bg-rose-950/70 border-rose-500/50 text-rose-200'
        }`}>
          <div className="flex items-center gap-2">
            {lastFeedback.type === 'correct' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{lastFeedback.message}</span>
          </div>
          <button 
            onClick={() => setLastFeedback(null)} 
            className="text-slate-400 hover:text-white text-xs ml-2"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
