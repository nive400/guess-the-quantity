import React, { useState } from 'react';
import { soundFX } from '../services/audio';
import { Volume2, VolumeX, Database, QrCode, Monitor, Smartphone, Shield, Sparkles } from 'lucide-react';
import { isFirebaseConfigured } from '../firebase-config';

export default function Navbar({ currentView, setView, roomCode, onOpenQr, onOpenDbModal }) {
  const [muted, setMuted] = useState(soundFX.isMuted());
  const firebaseActive = isFirebaseConfigured();

  const handleToggleSound = () => {
    const isNowMuted = soundFX.toggleMute();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      soundFX.playClueChime();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-black text-xl shadow-lg shadow-cyan-500/20">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                Guess the Quantity
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                Trivia Live
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span>Room:</span>
              <span className="font-mono font-bold text-cyan-400 tracking-wider bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800">
                {roomCode || 'PHY50'}
              </span>
              <span className="text-slate-600">•</span>
              <span className={`inline-flex items-center gap-1 text-[10px] font-medium ${firebaseActive ? 'text-emerald-400' : 'text-amber-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${firebaseActive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                {firebaseActive ? 'Firebase Cloud' : 'Local Mock Engine'}
              </span>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setView('player')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              currentView === 'player'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
            title="Player Phone View"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Player</span>
          </button>

          <button
            onClick={() => setView('projector')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              currentView === 'projector'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
            title="Big Screen Projector View"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Projector</span>
          </button>

          <button
            onClick={() => setView('host')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              currentView === 'host'
                ? 'bg-purple-500 text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
            title="Host Admin Control Cockpit"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Host Cockpit</span>
          </button>
        </div>

        {/* Right utility buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* QR Code trigger */}
          <button
            onClick={onOpenQr}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
            title="Show Join QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>

          {/* Sound toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
            title={muted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {muted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Database / Firebase config modal */}
          <button
            onClick={onOpenDbModal}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              firebaseActive
                ? 'bg-emerald-950/60 border-emerald-700/50 text-emerald-300 hover:bg-emerald-900/60'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Configure Firebase or View Sync Engine"
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">{firebaseActive ? 'Firebase' : 'Engine'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
