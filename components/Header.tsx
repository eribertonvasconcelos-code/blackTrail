
import React from 'react';

interface HeaderProps {
  setIsSidebarOpen: (open: boolean) => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen, title }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-black/80 backdrop-blur-md border-b border-zinc-900">
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-1.5 -ml-1 text-zinc-500 hover:text-white md:hidden bg-zinc-900 rounded-lg border border-zinc-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="text-sm md:text-lg font-black text-white uppercase tracking-tighter italic truncate">{title}</h2>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2 text-zinc-500 hover:text-red-500 transition-colors">
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <button className="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-lg shadow-red-900/20">
          <span className="text-xs uppercase italic font-black">Nova Missão</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
