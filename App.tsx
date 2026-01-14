
import React, { useState, useEffect } from 'react';
import { AppView, UserProfile } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TrailExplorer from './components/TrailExplorer';
import Checklist from './components/Checklist';
import BikeMechanic from './components/BikeMechanic';
import Navigation from './components/Navigation';
import Events from './components/Events';
import Onboarding from './components/Onboarding';
import Settings from './components/Settings';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedProfile = localStorage.getItem('blackadventure-user');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
    setIsLoading(false);
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    localStorage.setItem('blackadventure-user', JSON.stringify(profile));
    setUserProfile(profile);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!userProfile) return;
    const updatedProfile = { ...userProfile, ...updates };
    localStorage.setItem('blackadventure-user', JSON.stringify(updatedProfile));
    setUserProfile(updatedProfile);
  };

  const handleLogout = () => {
    if (confirm("Deseja realmente sair? Isso não apagará seus dados, mas você precisará reconfigurar ao voltar.")) {
      localStorage.removeItem('blackadventure-user');
      setUserProfile(null);
    }
  };

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-bold uppercase tracking-widest">Iniciando Motores...</div>;

  if (!userProfile) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard setCurrentView={setCurrentView} userProfile={userProfile} />;
      case 'explorer':
        return <TrailExplorer />;
      case 'checklist':
        return <Checklist />;
      case 'mechanic':
        return <BikeMechanic />;
      case 'navigation':
        return <Navigation />;
      case 'events':
        return <Events />;
      case 'settings':
        return <Settings userProfile={userProfile} onUpdateProfile={updateProfile} />;
      default:
        return <Dashboard setCurrentView={setCurrentView} userProfile={userProfile} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-zinc-100 overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        userProfile={userProfile}
        onEditProfile={handleLogout}
        onUpdateProfile={updateProfile}
      />
      
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header setIsSidebarOpen={setIsSidebarOpen} title={
          currentView === 'dashboard' ? `Olá, ${userProfile.name.split(' ')[0]}` :
          currentView === 'explorer' ? 'Explorar' :
          currentView === 'checklist' ? 'Checklist' :
          currentView === 'navigation' ? 'GPS' :
          currentView === 'events' ? 'Eventos' :
          currentView === 'settings' ? 'Ajustes' :
          'Mecânica'
        } />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar bg-black pb-24 md:pb-8">
          {renderView()}
        </main>

        {/* Barra de Navegação Mobile */}
        <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
      </div>
    </div>
  );
};

export default App;
