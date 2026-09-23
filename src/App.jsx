import React, { useState, useEffect } from 'react';
import { realtimeEngine } from './services/realtimeEngine';
import Navbar from './components/Navbar';
import PlayerView from './components/PlayerView';
import HostView from './components/HostView';
import ProjectorView from './components/ProjectorView';
import QrCodeModal from './components/QrCodeModal';
import FirebaseModal from './components/FirebaseModal';

export default function App() {
  const [currentView, setCurrentView] = useState('projector'); // 'projector' | 'player' | 'host'
  const [roomCode, setRoomCode] = useState('PHY50');
  const [roomState, setRoomState] = useState(() => realtimeEngine.currentState || realtimeEngine.getInitialRoomState('PHY50'));
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);
  const [initialRoomParam, setInitialRoomParam] = useState('');

  // Read URL query params on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    const roomParam = params.get('room');

    if (viewParam && ['player', 'host', 'projector'].includes(viewParam)) {
      setCurrentView(viewParam);
    }
    if (roomParam) {
      const cleanCode = roomParam.trim().toUpperCase();
      setRoomCode(cleanCode);
      setInitialRoomParam(cleanCode);
    }
  }, []);

  // Subscribe to realtime room updates
  useEffect(() => {
    let active = true;

    const unsubscribe = realtimeEngine.subscribeRoom(roomCode, (state) => {
      if (active) {
        setRoomState(state);
      }
    });

    // If state doesn't exist yet, auto-create initial lobby
    setTimeout(() => {
      if (!realtimeEngine.currentState) {
        realtimeEngine.createOrResetRoom(roomCode);
      }
    }, 150);

    return () => {
      active = false;
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [roomCode]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setView={setCurrentView}
        roomCode={roomCode}
        onOpenQr={() => setIsQrOpen(true)}
        onOpenDbModal={() => setIsDbModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto">
        {currentView === 'player' && (
          <PlayerView
            roomState={roomState}
            roomCode={roomCode}
            initialRoomParam={initialRoomParam}
          />
        )}

        {currentView === 'host' && (
          <HostView
            roomState={roomState}
            roomCode={roomCode}
            onOpenQr={() => setIsQrOpen(true)}
          />
        )}

        {currentView === 'projector' && (
          <ProjectorView
            roomState={roomState}
            roomCode={roomCode}
            onOpenQr={() => setIsQrOpen(true)}
          />
        )}
      </main>

      {/* QR Code Modal */}
      <QrCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        roomCode={roomCode}
      />

      {/* Database / Firebase Configuration Modal */}
      <FirebaseModal
        isOpen={isDbModalOpen}
        onClose={() => setIsDbModalOpen(false)}
      />
    </div>
  );
}
