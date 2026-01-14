
import React from 'react';
import { AppView } from '../types';

interface BottomNavProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView }) => {
  const navItems: { id: AppView; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Início', icon: '🏠' },
    { id: 'events', label: 'Eventos', icon: '📅' },
    { id: 'navigation', label: 'GPS', icon: '🧭' },
    { id: 'settings', label: 'Ajustes', icon: '⚙️' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-900 px-6 py-3 flex justify-between items-center z-40">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setCurrentView(item.id)}
          className="flex flex-col items-center gap-1 transition-all"
        >
          <span className={`text-xl ${currentView === item.id ? 'scale-125' : 'opacity-40 grayscale'}`}>
            {item.icon}
          </span>
          <span className={`text-[9px] font-black uppercase tracking-widest ${
            currentView === item.id ? 'text-red-500' : 'text-zinc-600'
          }`}>
            {item.label}
          </span>
          {currentView === item.id && (
            <div className="w-1 h-1 bg-red-600 rounded-full mt-0.5 shadow-[0_0_5px_rgba(220,38,38,0.8)]"></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
