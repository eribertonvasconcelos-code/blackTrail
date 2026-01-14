
import React, { useEffect, useState } from 'react';
import { TrailEvent, AppView, UserProfile } from '../types';
import ShareButton from './ShareButton';

interface DashboardProps {
  setCurrentView: (view: AppView) => void;
  userProfile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ setCurrentView, userProfile }) => {
  const [nextEvent, setNextEvent] = useState<TrailEvent | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('trail-events');
    if (saved) {
      const events: TrailEvent[] = JSON.parse(saved);
      const futureEvents = events
        .filter(e => new Date(e.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      if (futureEvents.length > 0) {
        setNextEvent(futureEvents[0]);
      }
    }
  }, []);

  const stats = [
    { label: 'Trilhas', value: '12', icon: '🏁', color: 'bg-zinc-800 text-zinc-100' },
    { 
      label: 'Máquina', 
      value: userProfile.bikeModel, 
      image: userProfile.bikeImage,
      color: 'bg-red-600/10 text-red-600 border border-red-600/20' 
    },
    { label: 'XP', value: '2.4k', icon: '⭐', color: 'bg-zinc-800 text-zinc-100' },
    { label: 'Grupo', value: 'Alpha', icon: '👥', color: 'bg-zinc-800 text-zinc-100' },
  ];

  const shareStatsText = `Confira minhas metas atingidas no BlackAdventure! 🏍️💨\n- Trilhas Concluídas: 12\n- Minha Máquina: ${userProfile.bikeBrand} ${userProfile.bikeModel}\n- Piloto: ${userProfile.name}\n\nAcelere você também!`;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-black text-white italic uppercase leading-tight">Acelera, {userProfile.name.split(' ')[0]}!</h2>
          <p className="text-zinc-500 text-sm font-medium">Sua {userProfile.bikeBrand} está pronta.</p>
        </div>
        <div className="flex items-center gap-3">
           <ShareButton 
            title="Minhas Conquistas" 
            text={shareStatsText}
            className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-2xl flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </ShareButton>
          {userProfile.profileImage && (
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl border-2 border-red-600 overflow-hidden shadow-lg shadow-red-900/40">
              <img src={userProfile.profileImage} className="w-full h-full object-cover" alt="Profile" />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl relative overflow-hidden group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${stat.color}`}>
              {stat.image ? <img src={stat.image} className="w-full h-full object-cover rounded-xl" alt="Bike" /> : stat.icon}
            </div>
            <p className="text-zinc-500 text-[10px] font-black uppercase mb-0.5">{stat.label}</p>
            <p className="text-sm md:text-lg font-bold text-white truncate">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
          <div className="relative h-48 md:h-64">
            <img 
              src={nextEvent ? "https://picsum.photos/id/1018/800/400" : (userProfile.bikeImage || "https://picsum.photos/id/1018/800/400")} 
              className="w-full h-full object-cover opacity-50" 
              alt="Banner" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div className="max-w-[70%]">
                <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded mb-1 inline-block uppercase italic">Próxima Missão</span>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase italic truncate">
                  {nextEvent ? nextEvent.name : 'Garagem Vazia'}
                </h3>
              </div>
              {nextEvent && (
                 <ShareButton 
                  title={`Trilha: ${nextEvent.name}`} 
                  text={`Bora acelerar? Próxima trilha marcada: ${nextEvent.name} em ${nextEvent.location}`}
                  className="p-3 bg-red-600 text-white rounded-xl shadow-lg"
                />
              )}
            </div>
          </div>
          <div className="p-6">
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed line-clamp-2 md:line-clamp-none">
              {nextEvent?.description || 'O barro te chama. Agende sua próxima aventura para não perder o ritmo.'}
            </p>
            <div className="flex items-center justify-between gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/${i+20}/32/32`} className="w-8 h-8 rounded-full border-2 border-zinc-950" alt="Friend" />
                ))}
              </div>
              <button 
                onClick={() => setCurrentView('events')}
                className="bg-zinc-800 hover:bg-red-600 text-white font-black py-3 px-5 rounded-xl transition-all uppercase text-[10px] tracking-widest italic flex-1 max-w-[150px]"
              >
                {nextEvent ? 'Detalhes' : 'Agendar'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-6">
          <h3 className="text-sm font-black text-white italic uppercase tracking-widest border-b border-zinc-800 pb-3">Radar Offline</h3>
          {[
            { icon: '🌦️', title: 'Clima', desc: 'Lama garantida!' },
            { icon: '⛽', title: 'Tanque', desc: 'Posto BR s/ Podium' },
            { icon: '🛠️', title: 'Check', desc: 'Revisar Corrente' }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 items-center">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h4 className="font-bold text-white uppercase text-[10px]">{item.title}</h4>
                <p className="text-[10px] text-zinc-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
