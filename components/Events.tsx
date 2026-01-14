
import React, { useState, useEffect } from 'react';
import { TrailEvent } from '../types';
import ShareButton from './ShareButton';

const Events: React.FC = () => {
  const [events, setEvents] = useState<TrailEvent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('trail-events');
    if (saved) setEvents(JSON.parse(saved));
  }, []);

  const saveEvents = (newEvents: TrailEvent[]) => {
    setEvents(newEvents);
    localStorage.setItem('trail-events', JSON.stringify(newEvents));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: TrailEvent = {
      id: Date.now().toString(),
      ...formData
    };
    const updated = [...events, newEvent].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    saveEvents(updated);
    setFormData({ name: '', date: '', location: '', description: '' });
    setShowForm(false);
  };

  const deleteEvent = (id: string) => {
    if(confirm("Remover este agendamento?")) {
      const updated = events.filter(e => e.id !== id);
      saveEvents(updated);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Calendário de Barro</h2>
          <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest mt-1">Planeje sua próxima descarga de adrenalina.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-red-900/30 transition-all flex items-center gap-3 uppercase italic text-xs tracking-widest"
        >
          <span>{showForm ? 'Abortar' : 'Agendar Trilha'}</span>
          {!showForm && <span className="text-xl">+</span>}
        </button>
      </div>

      {showForm && (
        <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl mb-12 animate-in slide-in-from-top-4 duration-500 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Título do Rolê</label>
              <input 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: Hard Enduro da Serra"
                className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-4 text-white font-bold focus:border-red-600 outline-none transition-all placeholder:text-zinc-800 italic"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Data e Hora de Partida</label>
              <input 
                required
                type="datetime-local"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-4 text-white font-bold focus:border-red-600 outline-none transition-all"
              />
            </div>
            <div className="space-y-3 md:col-span-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Ponto de Encontro (GPS/Ref)</label>
              <input 
                required
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                placeholder="Ex: Posto do Trevo, Km 45"
                className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-4 text-white font-bold focus:border-red-600 outline-none transition-all placeholder:text-zinc-800 italic"
              />
            </div>
            <div className="space-y-3 md:col-span-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Briefing e Observações</label>
              <textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Trajeto técnico? Nível de dificuldade?"
                className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-4 text-white font-bold h-32 resize-none focus:border-red-600 outline-none transition-all placeholder:text-zinc-800 italic"
              />
            </div>
            <button type="submit" className="md:col-span-2 bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-xl transition-all uppercase tracking-widest italic text-sm">
              Confirmar Agendamento
            </button>
          </form>
        </div>
      )}

      {events.length === 0 ? (
        <div className="text-center py-24 bg-zinc-950 border-2 border-dashed border-zinc-900 rounded-[40px] opacity-40">
          <div className="text-7xl mb-6 grayscale">🏍️</div>
          <h3 className="text-2xl font-black text-white uppercase italic">Horário Vago</h3>
          <p className="text-zinc-500 mt-2 font-bold uppercase text-[10px] tracking-[0.2em]">Sem planos para acelerar no momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => {
            const date = new Date(event.date);
            const isPast = date < new Date();
            
            return (
              <div key={event.id} className={`bg-zinc-900 border border-zinc-800 rounded-3xl p-8 transition-all hover:border-red-600/50 shadow-2xl flex flex-col group ${isPast ? 'opacity-40 grayscale' : ''}`}>
                <div className="flex justify-between items-start mb-6">
                  <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] italic ${isPast ? 'bg-zinc-800 text-zinc-500' : 'bg-red-600/20 text-red-500'}`}>
                    {isPast ? 'CONCLUÍDO' : 'CONFIRMADO'}
                  </div>
                  <div className="flex gap-2">
                    <ShareButton 
                      title={isPast ? `Trilha Concluída: ${event.name}` : `Próxima Trilha: ${event.name}`}
                      text={isPast 
                        ? `Missão cumprida! Concluí a trilha ${event.name}. O barro estava épico! 🏍️💨 #BlackAdventure`
                        : `Bora acelerar? Marquei presença na trilha ${event.name} dia ${date.toLocaleDateString('pt-BR')}. Local: ${event.location}. Te vejo lá! 🏁`
                      }
                      className="text-zinc-500 hover:text-red-500 transition-colors p-1"
                    />
                    <button 
                      onClick={() => deleteEvent(event.id)}
                      className="text-zinc-700 hover:text-red-500 transition-colors p-1"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <h4 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tighter leading-tight group-hover:text-red-500 transition-colors">{event.name}</h4>
                
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-4 text-zinc-500">
                    <span className="text-lg">📅</span>
                    <span className="text-xs font-black uppercase tracking-widest italic">
                      {date.toLocaleDateString('pt-BR')} <span className="text-red-600 mx-1">•</span> {date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-zinc-500">
                    <span className="text-lg">📍</span>
                    <span className="text-xs font-black uppercase tracking-widest italic truncate">{event.location}</span>
                  </div>
                  {event.description && (
                    <div className="mt-6 pt-6 border-t border-zinc-800">
                       <p className="text-xs text-zinc-500 font-medium italic leading-relaxed line-clamp-3">
                        "{event.description}"
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <button className="w-full bg-zinc-800 hover:bg-black text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest italic transition-all border border-zinc-700 hover:border-red-600">
                    Sincronizar Rota
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Events;
