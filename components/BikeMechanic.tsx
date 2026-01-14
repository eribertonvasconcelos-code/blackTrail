
import React, { useState } from 'react';
import { getMaintenanceAdvice } from '../services/geminiService';

const BikeMechanic: React.FC = () => {
  const [issue, setIssue] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;

    setLoading(true);
    try {
      const result = await getMaintenanceAdvice(issue);
      setAdvice(result);
    } catch (error) {
      alert("Erro ao consultar o mecânico digital. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl mb-8">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">🔧</div>
          <div>
            <h3 className="text-xl font-bold text-white">Mecânico Virtual AI</h3>
            <p className="text-white/80">Problemas na trilha? Pergunte como resolver agora.</p>
          </div>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="Descreva o que está acontecendo (Ex: Minha moto está falhando em alta rotação ou o pedal de câmbio travou...)"
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 h-32 resize-none transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 text-white font-bold py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <span className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analisando problema (isso pode levar alguns segundos)...</span>
                </>
              ) : (
                <>
                  <span>Diagnosticar Problema</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {advice && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 animate-in fade-in zoom-in-95 duration-500 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center">✅</div>
            <h4 className="text-lg font-bold">Diagnóstico e Guia de Reparo</h4>
          </div>
          <div className="prose prose-invert prose-orange max-w-none prose-p:text-slate-300 prose-li:text-slate-300 whitespace-pre-wrap leading-relaxed">
            {advice}
          </div>
          <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-500 text-sm flex gap-3">
             <span className="text-lg">⚠️</span>
             <p>Atenção: Consertos de trilha são paliativos. Procure um mecânico profissional assim que retornar para uma revisão completa.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BikeMechanic;
