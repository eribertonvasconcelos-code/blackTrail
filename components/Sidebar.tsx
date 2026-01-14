
import React from 'react';
import { AppView, UserProfile } from '../types';

interface SidebarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  userProfile: UserProfile;
  onEditProfile: () => void;
  onUpdateProfile?: (updates: Partial<UserProfile>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  setCurrentView, 
  isOpen, 
  setIsOpen, 
  userProfile, 
  onEditProfile,
}) => {
  const menuItems: { id: AppView; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Painel', icon: '🏠' },
    { id: 'events', label: 'Eventos', icon: '📅' },
    { id: 'navigation', label: 'Navegação', icon: '🧭' },
    { id: 'explorer', label: 'Trilhas', icon: '🗺️' },
    { id: 'checklist', label: 'Checklist', icon: '✅' },
    { id: 'mechanic', label: 'Mecânica', icon: '🔧' },
    { id: 'settings', label: 'Ajustes', icon: '⚙️' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm" 
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 w-64 bg-zinc-950 border-r border-zinc-900 z-50 transition-transform duration-300 transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="h-full flex flex-col">
          {/* Top Section - Fixed Logo Area (Non-editable) */}
          <div className="p-6 border-b border-zinc-900/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center overflow-hidden shadow-lg shadow-red-900/40 shrink-0">
                <span className="text-2xl font-black text-white italic select-none">B</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white italic truncate select-none">BlackAdventure</h1>
            </div>
          </div>

          {/* Middle Section - Scrollable Navigation */}
          <nav className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  currentView === item.id 
                    ? 'bg-red-600/10 text-red-500 font-semibold border-r-4 border-red-600 rounded-r-none' 
                    : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Bottom Section - Fixed Profile */}
          <div className="p-4 border-t border-zinc-900 bg-zinc-950">
            <div className="flex items-center justify-between group bg-zinc-900/40 p-3 rounded-2xl border border-zinc-800/50">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 shrink-0 rounded-full border-2 border-red-600 bg-zinc-900 flex items-center justify-center overflow-hidden shadow-lg shadow-red-900/10">
                  {userProfile.profileImage ? (
                    <img src={userProfile.profileImage} className="w-full h-full object-cover" alt="Profile" />
                  ) : (
                    <span className="text-sm font-bold text-red-500">
                      {userProfile.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-white truncate">{userProfile.name}</p>
                  <p className="text-[10px] text-zinc-500 uppercase font-black truncate tracking-wider">{userProfile.bikeBrand} {userProfile.bikeModel}</p>
                </div>
              </div>
              <button 
                onClick={onEditProfile}
                className="p-2 text-zinc-600 hover:text-red-500 hover:bg-zinc-800 rounded-lg transition-all shrink-0"
                title="Sair / Redefinir"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
