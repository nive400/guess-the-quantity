import React, { useState } from 'react';
import { realtimeEngine } from '../services/realtimeEngine';
import { soundFX } from '../services/audio';
import { Sparkles, Send, CheckCircle2, Clock, Award, Shield } from 'lucide-react';

export default function ReverseDetectiveView({ roomState, playerId, isHost, currentQ }) {
  const [clueText, setClueText] = useState('');
  const [category, setCategory] = useState('scientist');
  const [submitting, setSubmitting] = useState(false);

  const reverseSubmissions = roomState?.reverseSubmissions || [];
  const mySubmissions = reverseSubmissions.filter((s) => s.playerId === playerId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clueText.trim() || submitting) return;

    setSubmitting(true);
    try {
      await realtimeEngine.submitReverseClue(playerId, clueText, category);
      soundFX.playClueChime();
      setClueText('');
    } catch (err) {
      alert('Error submitting clue: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAwardPoints = async (submissionId, pts) => {
    soundFX.playCorrect();
    await realtimeEngine.awardReversePoints(submissionId, pts);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Banner */}
      <div className="p-6 bg-gradient-to-r from-purple-900/60 via-slate-900 to-indigo-950/60 border border-purple-500/40 rounded-3xl mb-6 shadow-2xl text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Bonus Round: Reverse Detective
        </div>
        <h2 className="text-2xl sm:text-4xl font-display font-black text-white mb-2">
          Here is the Unit: <span className="text-amber-400">{currentQ.unit}</span> ({currentQ.symbol})
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          The tables are turned! Submit your own clues (the scientist who discovered it, the quantity it measures, or an everyday real-world example) to earn bonus points!
        </p>
      </div>

      {/* Host Evaluation Panel */}
      {isHost ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-400" />
              Incoming Submissions Queue ({reverseSubmissions.length})
            </h3>
            <span className="text-xs text-slate-400">Award +25, +50, or +100 bonus pts</span>
          </div>

          {reverseSubmissions.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-500 text-sm">
              Waiting for player clue submissions to arrive...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reverseSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    sub.status === 'awarded'
                      ? 'bg-emerald-950/40 border-emerald-500/30 opacity-70'
                      : sub.autoMatched
                      ? 'bg-purple-950/50 border-purple-500/50 shadow-lg shadow-purple-500/10'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-white text-sm">
                        {sub.playerName}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-400 uppercase">
                        {sub.category}
                      </span>
                    </div>

                    {sub.autoMatched && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        ⚡ Keyword Match
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-200 mb-3 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    "{sub.text}"
                  </p>

                  <div className="flex items-center justify-between">
                    {sub.status === 'awarded' ? (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Awarded +{sub.pointsAwarded} pts!
                      </span>
                    ) : (
                      <div className="flex items-center gap-1.5 ml-auto">
                        <button
                          onClick={() => handleAwardPoints(sub.id, 25)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition-colors"
                        >
                          +25
                        </button>
                        <button
                          onClick={() => handleAwardPoints(sub.id, 50)}
                          className="px-2.5 py-1 bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold rounded-lg transition-colors"
                        >
                          +50
                        </button>
                        <button
                          onClick={() => handleAwardPoints(sub.id, 100)}
                          className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-black rounded-lg transition-colors"
                        >
                          +100 🌟
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Player Submission View */
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="p-5 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-xl">
            <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2">
              Select Clue Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {[
                { id: 'scientist', label: 'Scientist / History' },
                { id: 'quantity', label: 'Physical Quantity' },
                { id: 'real_world', label: 'Real-World Example' },
                { id: 'formula', label: 'Math / Dimensions' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    category === cat.id
                      ? 'bg-purple-600/30 border-purple-500 text-white font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2">
              Your Clue Description
            </label>
            <textarea
              value={clueText}
              onChange={(e) => setClueText(e.target.value)}
              placeholder="e.g. He built the first steam condenser in Scotland; or: It equals 1 Joule per second..."
              rows={3}
              maxLength={250}
              className="w-full p-3 bg-slate-950 border border-slate-700 rounded-2xl text-white placeholder-slate-500 text-sm focus:border-purple-400 focus:outline-none mb-3"
              required
            />

            <button
              type="submit"
              disabled={submitting || !clueText.trim()}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-display font-bold text-sm rounded-xl shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <span>{submitting ? 'Submitting...' : 'Submit Bonus Clue to Host'}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Player's past submissions */}
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
              Your Submitted Clues ({mySubmissions.length})
            </h4>
            <div className="space-y-2">
              {mySubmissions.map((s) => (
                <div key={s.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-200">{s.text}</span>
                  {s.status === 'awarded' ? (
                    <span className="font-bold text-emerald-400 shrink-0 ml-2">
                      +{s.pointsAwarded} pts!
                    </span>
                  ) : (
                    <span className="text-slate-500 flex items-center gap-1 shrink-0 ml-2">
                      <Clock className="w-3 h-3" /> Under Review
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
