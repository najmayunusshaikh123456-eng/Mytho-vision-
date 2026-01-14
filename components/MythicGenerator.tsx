
import React, { useState } from 'react';
import { generateMythicPitch } from '../services/geminiService';
import { MoviePitch } from '../types';

const MythicGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [pitch, setPitch] = useState<MoviePitch | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      const result = await generateMythicPitch(input);
      setPitch(result);
    } catch (error) {
      console.error("Failed to generate pitch:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20" id="generator">
      <div className="bg-black/60 border border-gold/20 p-8 md:p-12 rounded-2xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent opacity-50"></div>
        
        <h2 className="text-4xl md:text-5xl font-cinzel text-center mb-4 tracking-widest text-yellow-500 gold-glow">
          ORACLE OF CREATION
        </h2>
        <p className="text-center text-yellow-100/60 mb-10 tracking-widest uppercase text-xs">
          Harness AI to synthesize ancient myth with future tech
        </p>

        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a myth, a hero, or a futuristic vision..."
              className="w-full bg-white/5 border border-yellow-900/50 rounded-lg px-6 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-600/50 text-yellow-100 placeholder:text-yellow-100/20 transition-all"
            />
          </div>
          <button
            disabled={loading}
            className={`w-full py-4 font-cinzel tracking-[0.2em] text-black bg-yellow-600 hover:bg-yellow-500 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(202,138,4,0.3)]`}
          >
            {loading ? 'CONSULTING THE ARCHIVES...' : 'INVOKE THE VISION'}
          </button>
        </form>

        {pitch && (
          <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="border-t border-yellow-900/30 pt-8">
              <h3 className="text-3xl font-cinzel text-yellow-500 mb-2">{pitch.title}</h3>
              <p className="text-xl italic text-white/80 leading-relaxed mb-6 font-cinzel">"{pitch.logline}"</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div className="p-4 rounded-lg bg-yellow-900/10 border border-yellow-900/20">
                  <h4 className="text-yellow-500 uppercase tracking-widest font-bold mb-2">Visual Style</h4>
                  <p className="text-yellow-100/80 leading-relaxed">{pitch.visualStyle}</p>
                </div>
                <div className="p-4 rounded-lg bg-yellow-900/10 border border-yellow-900/20">
                  <h4 className="text-yellow-500 uppercase tracking-widest font-bold mb-2">Mythic Root</h4>
                  <p className="text-yellow-100/80 leading-relaxed">{pitch.mythologicalInspiration}</p>
                </div>
                <div className="p-4 rounded-lg bg-yellow-900/10 border border-yellow-900/20 md:col-span-2">
                  <h4 className="text-yellow-500 uppercase tracking-widest font-bold mb-2">The Setting</h4>
                  <p className="text-yellow-100/80 leading-relaxed">{pitch.setting}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MythicGenerator;
