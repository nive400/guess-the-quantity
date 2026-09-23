import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { soundFX } from '../services/audio';
import questions from '../data/questions.json';
import { 
  Crown, 
  Medal, 
  Zap, 
  Flame, 
  Sparkles, 
  Maximize, 
  Minimize, 
  Users, 
  ShieldAlert, 
  QrCode,
  Trophy
} from 'lucide-react';

export default function ProjectorView({ roomState, roomCode, onOpenQr }) {
  const previousStatusRef = useRef(roomState?.status);
  const previousQuestionRef = useRef(roomState?.currentQuestionIndex);
  const previousRevealedCluesRef = useRef(roomState?.revealedClues);

  const currentQIndex = roomState?.currentQuestionIndex || 0;
  const currentQ = questions[currentQIndex] || questions[0];
  const revealedClues = roomState?.revealedClues || 1;
  const activePoints = roomState?.activePoints || 100;
  const isStealActive = roomState?.stealActive;
  const winnerOfRound = roomState?.winnerOfRound;

  // Sorted leaderboard of all players
  const players = Object.values(roomState?.players || {}).sort((a, b) => (b.score || 0) - (a.score || 0));
  const top1 = players[0];
  const top2 = players[1];
  const top3 = players[2];
  const runnersUp = players.slice(3, 10);

  // Trigger celebration audio and confetti on round won or game over
  useEffect(() => {
    if (roomState?.status === 'revealed' && previousStatusRef.current !== 'revealed') {
      soundFX.playCorrect();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else if (roomState?.status === 'steal' && previousStatusRef.current !== 'steal') {
      soundFX.playSteal();
    } else if (roomState?.revealedClues !== previousRevealedCluesRef.current && roomState?.status === 'clue') {
      soundFX.playClueChime();
    } else if (roomState?.status === 'game_over' && previousStatusRef.current !== 'game_over') {
      soundFX.playVictory();
      // Continuous celebration confetti
      const duration = 4000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }

    previousStatusRef.current = roomState?.status;
    previousQuestionRef.current = roomState?.currentQuestionIndex;
    previousRevealedCluesRef.current = roomState?.revealedClues;
  }, [roomState?.status, roomState?.revealedClues]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // View: Lobby (Waiting for Host to start)
  if (roomState?.status === 'lobby') {
    return (
      <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center p-6 bg-grid text-center">
        <div className="max-w-4xl w-full p-8 sm:p-12 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-sm font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" /> Live Science & Physics Trivia
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight mb-3">
            GUESS THE QUANTITY
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-medium">
            Join on your phone to compete! 4 progressive clues, decreasing points: 100 / 75 / 50 / 25.
          </p>

          {/* Big Join Code & QR trigger */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-6 bg-slate-950/80 rounded-3xl border border-slate-800 mb-8">
            <div className="text-center sm:text-left">
              <span className="text-xs uppercase font-extrabold text-slate-400 tracking-widest block mb-1">
                Room Join Code
              </span>
              <span className="text-4xl sm:text-5xl font-mono font-black text-cyan-400 tracking-wider">
                {roomCode || 'PHY50'}
              </span>
            </div>

            <button
              onClick={onOpenQr}
              className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-black text-lg rounded-2xl shadow-xl shadow-cyan-500/25 transition-all transform hover:scale-105 active:scale-95"
            >
              <QrCode className="w-6 h-6" />
              <span>Show Phone QR Code</span>
            </button>
          </div>

          {/* Joined Players Counter */}
          <div className="flex items-center justify-center gap-2 text-slate-400 font-medium">
            <Users className="w-5 h-5 text-cyan-400" />
            <span className="text-base">
              Connected Players:{' '}
              <strong className="text-white text-lg font-mono">
                {players.length}
              </strong>
            </span>
          </div>

          {/* Player Grid Preview */}
          {players.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-2 max-h-36 overflow-y-auto p-2">
              {players.map((p) => (
                <span
                  key={p.id}
                  className="px-3 py-1 bg-slate-800/80 border border-slate-700/60 rounded-xl text-xs font-semibold text-slate-200 animate-fadeIn"
                >
                  {p.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // View: Final Victory Screen
  if (roomState?.status === 'game_over') {
    return (
      <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center p-6 bg-grid text-center">
        <div className="max-w-4xl w-full p-8 sm:p-12 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-2xl">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/40 mb-4 shadow-2xl shadow-amber-500/20 animate-bounce">
            <Trophy className="w-10 h-10" />
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black text-white mb-2">
            TOURNAMENT COMPLETE!
          </h1>
          <p className="text-slate-300 text-lg mb-8">
            All 20 rounds of "Guess the Quantity" have concluded. Here are our champions!
          </p>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 items-end">
            {/* 2nd Place */}
            {top2 && (
              <div className="p-6 rounded-3xl glass-panel-silver order-2 md:order-1 h-56 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 mx-auto rounded-full bg-slate-300 text-slate-950 flex items-center justify-center font-bold text-lg mb-2">
                    🥈
                  </div>
                  <div className="text-xs uppercase font-extrabold text-slate-300 tracking-wider">
                    2nd Place
                  </div>
                  <div className="text-xl font-display font-bold text-white truncate mt-1">
                    {top2.name}
                  </div>
                </div>
                <div className="font-mono text-2xl font-black text-slate-200">
                  {top2.score} <span className="text-xs text-slate-400">PTS</span>
                </div>
              </div>
            )}

            {/* 1st Place Champion */}
            {top1 && (
              <div className="p-8 rounded-3xl glass-panel-gold order-1 md:order-2 h-72 flex flex-col justify-between transform md:-translate-y-4">
                <div>
                  <div className="w-14 h-14 mx-auto rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl mb-2 shadow-lg shadow-amber-400/50">
                    👑
                  </div>
                  <div className="text-xs uppercase font-black text-amber-300 tracking-widest">
                    GRAND CHAMPION
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-black text-white truncate mt-1">
                    {top1.name}
                  </div>
                </div>
                <div className="font-mono text-4xl font-black text-amber-300">
                  {top1.score} <span className="text-base text-amber-400/80">PTS</span>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {top3 && (
              <div className="p-6 rounded-3xl glass-panel-bronze order-3 md:order-3 h-48 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 mx-auto rounded-full bg-amber-700 text-white flex items-center justify-center font-bold text-lg mb-2">
                    🥉
                  </div>
                  <div className="text-xs uppercase font-extrabold text-amber-200 tracking-wider">
                    3rd Place
                  </div>
                  <div className="text-lg font-display font-bold text-white truncate mt-1">
                    {top3.name}
                  </div>
                </div>
                <div className="font-mono text-2xl font-black text-amber-200">
                  {top3.score} <span className="text-xs text-amber-300/80">PTS</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // View: Live Projector Round Display
  return (
    <div className="min-h-[calc(100vh-60px)] p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
      {/* Top Projector Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-xl font-display font-bold text-sm tracking-wider uppercase">
            Round {currentQIndex + 1} / {questions.length}
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight">
            GUESS THE PHYSICAL QUANTITY
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Active Points Badge */}
          <div className={`px-5 py-2 rounded-2xl flex items-center gap-2 font-display font-black text-lg sm:text-xl transition-all ${
            isStealActive
              ? 'bg-rose-600 text-white steal-active-pulse'
              : 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/20'
          }`}>
            <Zap className="w-5 h-5 fill-current" />
            <span>{isStealActive ? 'STEAL ROUND: ' : ''}{activePoints} PTS</span>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
            title="Toggle Fullscreen"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Clues (65%) | Right Live Leaderboard (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-4">
        {/* Left Side: Clues Showcase */}
        <div className="lg:col-span-8 space-y-4">
          {/* Answer Card (when revealed) */}
          {roomState?.status === 'revealed' && (
            <div className="p-6 bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-950 border-2 border-amber-500/50 rounded-3xl shadow-2xl shadow-amber-500/10 clue-enter">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-400">
                  <Sparkles className="w-4 h-4" /> Correct Quantity Revealed!
                </span>
                {winnerOfRound && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                    🏆 Won by {winnerOfRound.name} (+{winnerOfRound.points} pts)
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-4 mb-2">
                <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight">
                  {currentQ.unit}
                </h1>
                <span className="text-2xl sm:text-4xl font-mono font-black text-amber-400">
                  ({currentQ.symbol})
                </span>
              </div>

              <p className="text-lg text-slate-200 font-semibold mb-3">
                {currentQ.quantity}
              </p>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 text-sm text-slate-300 leading-relaxed">
                <strong className="text-amber-300">Explanation: </strong>
                {currentQ.explanation}
              </div>
            </div>
          )}

          {/* Steal alert banner */}
          {isStealActive && roomState?.status !== 'revealed' && (
            <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-500/50 text-rose-200 flex items-center justify-between steal-active-pulse">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0" />
                <div>
                  <div className="font-display font-black text-base text-white">
                    STEAL ROUND ACTIVATED!
                  </div>
                  <div className="text-xs text-rose-300">
                    First guess was incorrect. Any other team can buzz now for <strong>half points ({activePoints} pts)</strong>!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4 Progressive Clues */}
          <div className="space-y-3">
            {currentQ.clues.map((clue, idx) => {
              const isRevealed = idx < revealedClues;
              const isLatestRevealed = idx === revealedClues - 1;

              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    isRevealed
                      ? isLatestRevealed
                        ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-500/10 clue-enter scale-[1.01]'
                        : 'bg-slate-900/70 border-slate-800'
                      : 'bg-slate-950/30 border-slate-900 opacity-30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                        isRevealed
                          ? 'bg-cyan-500 text-slate-950 font-black'
                          : 'bg-slate-800 text-slate-500'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className={`font-display font-bold text-xs tracking-wider uppercase ${
                        isRevealed ? 'text-cyan-400' : 'text-slate-500'
                      }`}>
                        Clue {idx + 1}: {clue.type}
                      </span>
                    </div>

                    <span className="font-mono text-xs font-extrabold text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      {clue.points} PTS
                    </span>
                  </div>

                  {isRevealed ? (
                    <p className="text-base sm:text-xl font-medium text-slate-100 leading-relaxed pl-9">
                      {clue.text}
                    </p>
                  ) : (
                    <div className="text-sm text-slate-500 pl-9 font-medium italic">
                      [ Clue {idx + 1} locked — worth {clue.points} points ]
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Live Big Screen Leaderboard */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="font-display font-extrabold text-lg text-white tracking-tight">
                  LIVE LEADERBOARD
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">
                {players.length} Teams
              </span>
            </div>

            {players.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                No players registered yet.
              </div>
            ) : (
              <div className="space-y-2">
                {/* 1st Place */}
                {top1 && (
                  <div className="p-3.5 rounded-2xl glass-panel-gold flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                        👑
                      </div>
                      <div>
                        <div className="font-display font-black text-sm text-white truncate max-w-[130px]">
                          {top1.name}
                        </div>
                        <div className="text-[10px] text-amber-300 font-bold uppercase">
                          1st • Rank Leader
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-black text-lg text-amber-300">
                        {top1.score}
                      </div>
                      <div className="text-[9px] text-amber-400/80 uppercase font-bold">PTS</div>
                    </div>
                  </div>
                )}

                {/* 2nd Place */}
                {top2 && (
                  <div className="p-3 rounded-2xl glass-panel-silver flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-300 text-slate-950 font-bold text-xs flex items-center justify-center">
                        🥈
                      </div>
                      <div>
                        <div className="font-display font-bold text-sm text-white truncate max-w-[130px]">
                          {top2.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">
                          2nd Place
                        </div>
                      </div>
                    </div>
                    <div className="text-right font-mono font-black text-base text-slate-200">
                      {top2.score} <span className="text-[9px] text-slate-400">PTS</span>
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {top3 && (
                  <div className="p-3 rounded-2xl glass-panel-bronze flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-amber-700 text-white font-bold text-xs flex items-center justify-center">
                        🥉
                      </div>
                      <div>
                        <div className="font-display font-bold text-sm text-white truncate max-w-[130px]">
                          {top3.name}
                        </div>
                        <div className="text-[10px] text-amber-300/80 font-semibold uppercase">
                          3rd Place
                        </div>
                      </div>
                    </div>
                    <div className="text-right font-mono font-black text-base text-amber-200">
                      {top3.score} <span className="text-[9px] text-amber-300">PTS</span>
                    </div>
                  </div>
                )}

                {/* Runners Up (4 to 10) */}
                <div className="pt-2 space-y-1">
                  {runnersUp.map((p, i) => (
                    <div
                      key={p.id}
                      className="px-3 py-1.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-500 font-bold text-[11px] w-4">
                          #{i + 4}
                        </span>
                        <span className="text-slate-200 truncate max-w-[120px]">
                          {p.name}
                        </span>
                        {(p.streak || 0) > 1 && (
                          <span className="text-[10px] text-orange-400 flex items-center">
                            <Flame className="w-3 h-3 fill-orange-500" />
                            {p.streak}
                          </span>
                        )}
                      </div>
                      <span className="font-mono font-bold text-slate-300">
                        {p.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Live Buzz Ticker */}
          <div className="mt-4 pt-3 border-t border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Live Guesses Ticker
            </span>
            <div className="min-h-[44px] flex items-center">
              {roomState?.guesses && roomState.guesses.length > 0 ? (
                <div className="w-full text-xs truncate">
                  {roomState.guesses.slice(-2).map((g) => (
                    <div key={g.id} className="flex items-center justify-between text-slate-300 mb-0.5">
                      <span className="font-medium text-white truncate max-w-[120px]">{g.playerName}:</span>
                      <span className={`font-mono ${g.isCorrect ? 'text-emerald-400 font-bold' : 'text-slate-400 line-through'}`}>
                        "{g.guessText}"
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-600 italic">
                  Awaiting buzz-ins from player phones...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
