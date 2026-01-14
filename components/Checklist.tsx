
import React, { useState, useEffect } from 'react';
import { ChecklistItem } from '../types';
import { generateChecklist } from '../services/geminiService';

const Checklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('Trilha de um dia');

  const fetchChecklist = async (selectedType: string) => {
    setLoading(true);
    try {
      const data = await generateChecklist(selectedType);
      const formattedData = data.map((item: any, index: number) => ({
        id: `item-${index}`,
        label: item.label,
        category: item.category,
        checked: false
      }));
      setItems(formattedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChecklist(type);
  }, []);

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const categories = Array.from(new Set(items.map(i => i.category)));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-bold">Prepare-se para a Partida</h3>
          <p className="text-slate-400">Nunca esqueça o essencial no meio do mato.</p>
        </div>
        
        <div className="flex gap-2">
          <select 
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              fetchChecklist(e.target.value);
            }}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none"
          >
            <option>Trilha de um dia</option>
            <option>Expedição de vários dias</option>
            <option>Competição de Enduro</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-12 h-12 border-4 border-orange-600/20 border-t-orange-600 rounded-full animate-spin" />
          <p className="text-slate-400 font-medium">Gerando lista personalizada...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map(category => (
            <div key={category} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-slate-800 px-6 py-3 border-b border-slate-700">
                <h4 className="font-bold text-orange-500 uppercase text-xs tracking-wider">{category}</h4>
              </div>
              <div className="p-2">
                {items.filter(i => i.category === category).map(item => (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-800/50 transition-colors group"
                  >
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                      item.checked ? 'bg-orange-600 border-orange-600' : 'border-slate-700 group-hover:border-slate-500'
                    }`}>
                      {item.checked && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm ${item.checked ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-6 bg-orange-600/10 border border-orange-600/20 rounded-2xl flex items-center justify-between">
        <p className="text-sm font-medium text-slate-300">
          Você concluiu {items.filter(i => i.checked).length} de {items.length} itens.
        </p>
        <button 
          onClick={() => setItems(items.map(i => ({...i, checked: false})))}
          className="text-orange-500 font-bold text-sm hover:underline"
        >
          Resetar Lista
        </button>
      </div>
    </div>
  );
};

export default Checklist;
