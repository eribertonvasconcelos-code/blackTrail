
import React, { useState } from 'react';
import { searchTrails } from '../services/geminiService';

const TrailExplorer: React.FC = () => {
  const [location, setLocation] = useState('');
  const [results, setResults] = useState<{ text: string, sources: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) return;

    setLoading(true);
    try {
      const data = await searchTrails(location);
      setResults(data);
    } catch (error) {
      alert("Houve um erro na busca. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
        <h3 className="text-xl font-bold mb-4">Descubra Novas Aventuras</h3>
        <p className="text-slate-400 mb-6">Digite uma cidade ou região para encontrar as melhores trilhas off-road avaliadas por outros motociclistas.</p>
        
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ex: Serra da Canastra, MG"
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-orange-900/20 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : 'Explorar'}
          </button>
        </form>
      </div>

      {results && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 leading-relaxed prose prose-invert max-w-none shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-orange-500 text-sm font-bold uppercase tracking-wider">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              Resultados da Inteligência Artificial
            </div>
            <div className="whitespace-pre-wrap text-slate-200">
              {results.text}
            </div>

            {results.sources.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-800">
                <h4 className="text-sm font-bold text-slate-500 mb-3 uppercase">Fontes Consultadas:</h4>
                <div className="flex flex-wrap gap-2">
                  {results.sources.map((source, i) => (
                    source.web && (
                      <a 
                        key={i} 
                        href={source.web.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs bg-slate-800 hover:bg-slate-700 text-blue-400 px-3 py-1.5 rounded-full border border-slate-700 transition-colors flex items-center gap-1"
                      >
                        <span className="truncate max-w-[150px]">{source.web.title}</span>
                        <span>↗️</span>
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {!results && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-60">
           <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex gap-4 items-center">
              <div className="text-3xl">🏞️</div>
              <div>
                <p className="font-bold">Trilhas Famosas</p>
                <p className="text-xs text-slate-500">Explore lugares icônicos como Jalapão.</p>
              </div>
           </div>
           <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex gap-4 items-center">
              <div className="text-3xl">🏁</div>
              <div>
                <p className="font-bold">Enduro de Regularidade</p>
                <p className="text-xs text-slate-500">Encontre competições próximas.</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default TrailExplorer;
