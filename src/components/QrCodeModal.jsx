import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, ExternalLink, Smartphone } from 'lucide-react';

export default function QrCodeModal({ isOpen, onClose, roomCode }) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Compute join URL (points to player view with prefilled room code)
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
  const joinUrl = `${origin}?view=player&room=${encodeURIComponent(roomCode || 'PHY50')}`;

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(joinUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#030712',
          light: '#f8fafc'
        }
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('Failed to generate QR code:', err));
    }
  }, [isOpen, joinUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(joinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md p-6 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl text-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 mb-3 border border-cyan-500/20">
          <Smartphone className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-display font-bold text-white mb-1">
          Scan to Join Trivia
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Point phone camera at this QR code to join on your device instantly.
        </p>

        {/* QR Code display */}
        <div className="inline-block p-3 bg-white rounded-2xl shadow-inner mb-4">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="Join Game QR Code" className="w-56 h-56 mx-auto rounded-lg" />
          ) : (
            <div className="w-56 h-56 flex items-center justify-center text-slate-500 text-sm">
              Generating QR...
            </div>
          )}
        </div>

        {/* Room Code Badge */}
        <div className="mb-4">
          <span className="text-xs text-slate-400 block mb-1">Room Code</span>
          <span className="inline-block font-mono font-black text-2xl tracking-widest text-cyan-400 bg-slate-950 px-4 py-1.5 rounded-xl border border-cyan-500/30">
            {roomCode || 'PHY50'}
          </span>
        </div>

        {/* Direct Link box */}
        <div className="flex items-center justify-between gap-2 p-2 bg-slate-950 rounded-xl border border-slate-800 text-left">
          <span className="text-xs text-slate-400 truncate font-mono pl-1 select-all">
            {joinUrl}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-cyan-600 text-white rounded-lg text-xs font-semibold transition-colors shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
