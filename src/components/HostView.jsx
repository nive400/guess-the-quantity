import React, { useState } from 'react';
import { realtimeEngine } from '../services/realtimeEngine';
import { soundFX } from '../services/audio';
import questions from '../data/questions.json';
import {
  Shield,
  Play,
  SkipForward,
  Eye,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  Bot,
  Trash2,
  Users,
  Zap,
  Lock,
  QrCode,
  ShieldAlert,
  Flame,
  Award
} from 'lucide-react';
import ReverseDetectiveView from './ReverseDetectiveView';

export default function HostView({ roomState, roomCode, onOpenQr }) {
  const [selectedBotCount, setSelectedBotCount] = useState(10);
  const [isResetting, setIsResetting] = useState(false);

  const currentQIndex = roomState?.currentQuestionIndex || 0;
  const currentQ = questions[currentQIndex] || questions[0];
  const revealedClues = roomState?.revealedClues || 1;
  const activePoints = roomState?.activePoints || 100;
  const isStealActive = roomState?.stealActive;
  const guesses = roomState?.guesses || [];
  const players = Object.values(roomState?.players || {});

  const handleStartGame = async () => {
    soundFX.playClueChime();
    await realtimeEngine.startGame();
  };

  const handleRevealNextClue = async () => {
    soundFX.playClueChime();
    await realtimeEngine.revealNextClue();
  };

  const handleTriggerSteal = async () => {
    soundFX.playSteal();
    await realtimeEngine.triggerSteal();
  };

  const handleRevealAnswer = async () => {
    soundFX.playCorrect();
    await realtimeEngine.updateRoomState({
      status: 'revealed'
    });
  };

  const handleNextQuestion = async () => {
    soundFX.playClueChime();
    await realtimeEngine.nextQuestion();
  };

  const handleStartReverseDetective = async () => {
    soundFX.playClueChime();
    await realtimeEngine.startReverseDetective();
  };

  const handleResetGame = async () => {
    if (!confirm('Are you sure you want to reset the entire game session? All player scores will reset.')) return;
    setIsResetting(true);
    soundFX.playWrong();
    await realtimeEngine.createOrResetRoom(roomCode);
    setIsResetting(false);
  };

  const handleJudgeGuess = async (guessId, accept) => {
    if (accept) {
      soundFX.playCorrect();
    }
    await realtimeEngine.judgeGuessManually(guessId, accept);
  };

  const handleSpawnBots = async (count) => {
    await realtimeEngine.spawnSimulatedBots(count);
  };

  const handleClearBots = async () => {
    await realtimeEngine.clearBots();
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Host Cockpit Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-purple-500/30 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-display font-black text-white">
                Host Admin Cockpit
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-purple-950/80 text-purple-300 border border-purple-700/50">
                {roomState?.status || 'Lobby'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Session Code: <strong className="font-mono text-cyan-400">{roomCode}</strong> • Connected Teams: <strong className="text-white">{players.length}</strong>
            </p>
          </div>
        </div>

        {/* Action button bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenQr}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
          >
            <QrCode className="w-4 h-4 text-cyan-400" />
            <span>Show QR</span>
          </button>

          <button
            onClick={handleResetGame}
            disabled={isResetting}
            className="flex items-center gap-1.5 px-3 py-2 bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 rounded-xl text-xs font-semibold border border-rose-800/60 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Game</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Controls (7 cols) | Right Live Queues & Bot Simulator (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Flow Controls & Question Data */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Action Bar */}
          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Game Master Controls
            </h3>

            {roomState?.status === 'lobby' ? (
              <button
                onClick={handleStartGame}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-display font-black text-lg rounded-2xl shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-98"
              >
                <Play className="w-6 h-6 fill-current" />
                <span>Start Game: Launch Round 1</span>
              </button>
            ) : roomState?.status === 'reverse_detective' ? (
              <div className="flex gap-2">
                <button
                  onClick={handleNextQuestion}
                  className="flex-1 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-display font-black text-sm rounded-xl flex items-center justify-center gap-2"
                >
                  <SkipForward className="w-5 h-5" />
                  <span>Conclude Bonus Round & Finish</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Reveal Next Clue button */}
                <button
                  onClick={handleRevealNextClue}
                  disabled={revealedClues >= 4 || roomState?.status === 'revealed'}
                  className={`py-3.5 px-4 rounded-xl font-display font-black text-sm flex items-center justify-center gap-2 transition-all ${
                    revealedClues >= 4 || roomState?.status === 'revealed'
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Reveal Clue {Math.min(revealedClues + 1, 4)} ({[0, 100, 75, 50, 25][Math.min(revealedClues + 1, 4)]} pts)</span>
                </button>

                {/* Trigger Steal Round */}
                <button
                  onClick={handleTriggerSteal}
                  disabled={isStealActive || roomState?.status === 'revealed'}
                  className={`py-3.5 px-4 rounded-xl font-display font-black text-sm flex items-center justify-center gap-2 transition-all ${
                    isStealActive || roomState?.status === 'revealed'
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>{isStealActive ? 'Steal Active (Half Pts)' : 'Trigger Steal Round'}</span>
                </button>

                {/* Reveal Answer */}
                <button
                  onClick={handleRevealAnswer}
                  disabled={roomState?.status === 'revealed'}
                  className={`py-3.5 px-4 rounded-xl font-display font-black text-sm flex items-center justify-center gap-2 transition-all ${
                    roomState?.status === 'revealed'
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reveal Answer Card</span>
                </button>

                {/* Next Question */}
                <button
                  onClick={handleNextQuestion}
                  className="py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-display font-black text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
                >
                  <SkipForward className="w-4 h-4" />
                  <span>Next Question ({currentQIndex + 2 <= questions.length ? currentQIndex + 2 : 'Finish'})</span>
                </button>
              </div>
            )}

            {/* Launch Reverse Detective bonus button */}
            {roomState?.status !== 'lobby' && roomState?.status !== 'reverse_detective' && (
              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={handleStartReverseDetective}
                  className="w-full py-2.5 bg-purple-950/70 hover:bg-purple-900 text-purple-300 font-display font-bold text-xs rounded-xl border border-purple-800/60 flex items-center justify-center gap-2 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Switch Current Round to "Reverse Detective" Bonus Mode</span>
                </button>
              </div>
            )}
          </div>

          {/* Question Inspector (Host Eyes Only) */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">
                  Question Inspector (Host Preview)
                </span>
                <h3 className="text-xl font-display font-black text-white">
                  Round {currentQIndex + 1}: <span className="text-amber-400">{currentQ.unit}</span> ({currentQ.symbol})
                </h3>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Clue Points</span>
                <span className="font-mono font-black text-lg text-cyan-400">
                  {activePoints} PTS
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-300">
              <strong>Quantity:</strong> {currentQ.quantity}
            </div>

            <div className="text-xs text-slate-400 font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <strong>Dimensional Formula:</strong> {currentQ.dimensionalFormula}
            </div>

            {/* Clue Inspector */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Clues (Revealed: {revealedClues}/4)
              </span>
              {currentQ.clues.map((clue, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs leading-relaxed transition-all ${
                    idx < revealedClues
                      ? 'bg-slate-950 border-cyan-500/40 text-slate-100 font-medium'
                      : 'bg-slate-950/40 border-slate-900 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 font-bold">
                    <span className={idx < revealedClues ? 'text-cyan-400' : 'text-slate-600'}>
                      Clue {idx + 1}: {clue.type}
                    </span>
                    <span className="font-mono">{clue.points} pts</span>
                  </div>
                  <p>{clue.text}</p>
                </div>
              ))}
            </div>

            {/* Explanation to read */}
            <div className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded-2xl text-xs text-amber-200/90 leading-relaxed">
              <strong className="text-amber-400 block mb-1">📢 Announce to Audience on Reveal:</strong>
              {currentQ.explanation}
            </div>
          </div>
        </div>

        {/* Right Column: Live Guesses Feed & Bot Simulator */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Incoming Buzz/Guess Feed */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-display font-bold text-sm text-white">
                    Live Incoming Guesses ({guesses.length})
                  </h3>
                </div>
                <span className="text-[10px] text-slate-500">Auto & Manual Judge</span>
              </div>

              {guesses.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  No guesses submitted for this question yet.
                </div>
              ) : (
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {guesses.slice().reverse().map((g) => (
                    <div
                      key={g.id}
                      className={`p-3 rounded-xl border text-xs transition-all ${
                        g.isCorrect
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white truncate max-w-[130px]">
                          {g.playerName}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">
                          Clue {g.clueLevel}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-sm">
                          "{g.guessText}"
                        </span>

                        <div className="flex items-center gap-1.5">
                          {g.isCorrect ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                              +{g.pointsClaimed} PTS
                            </span>
                          ) : (
                            <>
                              <button
                                onClick={() => handleJudgeGuess(g.id, true)}
                                className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px]"
                                title="Host override: Mark as Correct"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleJudgeGuess(g.id, false)}
                                className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-rose-900/50 text-slate-400 text-[10px]"
                                title="Host override: Mark as Wrong"
                              >
                                ✕
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Steal status note */}
            {isStealActive && (
              <div className="mt-3 p-2.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-[11px] text-rose-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                <span>Steal round in effect. Next correct answer receives {activePoints} pts.</span>
              </div>
            )}
          </div>

          {/* Simulated 50-Player Bot Engine (For stress testing & live demonstration) */}
          <div className="p-5 bg-slate-900/90 border border-cyan-500/30 rounded-3xl shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-cyan-400" />
                <h4 className="font-display font-bold text-xs uppercase text-slate-200 tracking-wider">
                  Audience Simulator (Stress Test)
                </h4>
              </div>
              <span className="text-[10px] text-cyan-400 font-mono">50 Phone Scale</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Test how the live game and big-screen leaderboard handle 10, 25, or 50 concurrent students!
            </p>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleSpawnBots(10)}
                className="py-2 px-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                +10 Bots
              </button>
              <button
                onClick={() => handleSpawnBots(25)}
                className="py-2 px-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                +25 Bots
              </button>
              <button
                onClick={() => handleSpawnBots(50)}
                className="py-2 px-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-black shadow-md shadow-cyan-600/20 transition-all"
              >
                +50 Bots 🚀
              </button>
            </div>

            <button
              onClick={handleClearBots}
              className="w-full py-1.5 text-slate-500 hover:text-rose-400 text-xs flex items-center justify-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Simulated Bots
            </button>
          </div>
        </div>
      </div>

      {/* Reverse Detective submissions if in bonus round */}
      {roomState?.status === 'reverse_detective' && (
        <div className="pt-4">
          <ReverseDetectiveView 
            roomState={roomState} 
            isHost={true} 
            currentQ={currentQ} 
          />
        </div>
      )}
    </div>
  );
}
