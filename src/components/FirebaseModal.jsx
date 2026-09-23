import React, { useState } from 'react';
import { X, Database, Save, RotateCcw, CheckCircle, Info, ExternalLink } from 'lucide-react';
import { activeFirebaseConfig, isFirebaseConfigured, saveFirebaseConfig, clearFirebaseConfig } from '../firebase-config';

export default function FirebaseModal({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState(activeFirebaseConfig.apiKey || '');
  const [databaseURL, setDatabaseURL] = useState(activeFirebaseConfig.databaseURL || '');
  const [projectId, setProjectId] = useState(activeFirebaseConfig.projectId || '');
  const [appId, setAppId] = useState(activeFirebaseConfig.appId || '');
  const [jsonInput, setJsonInput] = useState('');
  const [showJsonMode, setShowJsonMode] = useState(false);

  if (!isOpen) return null;

  const handleSaveFields = (e) => {
    e.preventDefault();
    const config = {
      apiKey: apiKey.trim(),
      databaseURL: databaseURL.trim(),
      projectId: projectId.trim(),
      appId: appId.trim()
    };
    saveFirebaseConfig(config);
  };

  const handlePasteJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      saveFirebaseConfig(parsed);
    } catch (err) {
      alert('Invalid JSON! Please paste the exact firebaseConfig object from Firebase Console.');
    }
  };

  const isConfigured = isFirebaseConfigured();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg p-6 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-display font-bold text-white">
              Realtime Sync Engine Settings
            </h3>
            <p className="text-xs text-slate-400">
              Current Mode:{' '}
              <span className={`font-semibold ${isConfigured ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isConfigured ? 'Firebase Realtime Database (Live Cloud)' : 'Local Mock Engine (Multi-Tab / Localhost)'}
              </span>
            </p>
          </div>
        </div>

        <div className="p-3.5 mb-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Zero-setup testing:</strong> The local engine uses browser <code className="text-cyan-300">BroadcastChannel</code> + storage sync. Open multiple browser tabs (Host, Projector, Players) on this computer or LAN and they will sync instantly!
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">For 50 phones in the auditorium:</strong> Plug in your free Firebase Realtime Database credentials below. It takes 2 minutes and costs $0.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Firebase Credentials
          </label>
          <button
            type="button"
            onClick={() => setShowJsonMode(!showJsonMode)}
            className="text-xs text-cyan-400 hover:underline"
          >
            {showJsonMode ? 'Switch to Form Fields' : 'Paste Raw JSON snippet'}
          </button>
        </div>

        {showJsonMode ? (
          <div className="space-y-3 mb-4">
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='Paste firebaseConfig = { apiKey: "...", databaseURL: "https://...firebaseio.com" } here...'
              rows={6}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono focus:border-cyan-500 focus:outline-none"
            />
            <button
              onClick={handlePasteJson}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs transition-colors"
            >
              <Save className="w-4 h-4" /> Save Firebase Configuration
            </button>
          </div>
        ) : (
          <form onSubmit={handleSaveFields} className="space-y-3 mb-4">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">databaseURL (Required)</label>
              <input
                type="text"
                value={databaseURL}
                onChange={(e) => setDatabaseURL(e.target.value)}
                placeholder="https://your-project-default-rtdb.firebaseio.com"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">apiKey (Required)</label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">projectId</label>
                <input
                  type="text"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  placeholder="guess-the-quantity"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">appId</label>
                <input
                  type="text"
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  placeholder="1:12345:web:..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs transition-colors"
              >
                <Save className="w-4 h-4" /> Save Firebase Config
              </button>
              {isConfigured && (
                <button
                  type="button"
                  onClick={clearFirebaseConfig}
                  className="px-3 py-2.5 bg-slate-800 hover:bg-rose-900/40 text-rose-300 rounded-xl text-xs font-medium border border-slate-700 transition-colors"
                  title="Clear Firebase config and return to Local Engine"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        )}

        <div className="text-[11px] text-slate-500 border-t border-slate-800 pt-3">
          Need a Firebase database? Create one free at{' '}
          <a
            href="https://console.firebase.google.com"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:underline inline-flex items-center gap-0.5"
          >
            console.firebase.google.com <ExternalLink className="w-3 h-3" />
          </a>{' '}
          and enable <strong>Realtime Database</strong> in test mode.
        </div>
      </div>
    </div>
  );
}
