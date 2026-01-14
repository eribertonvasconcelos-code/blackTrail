
import React, { useRef } from 'react';
import { UserProfile } from '../types';

interface SettingsProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

const Settings: React.FC<SettingsProps> = ({ userProfile, onUpdateProfile }) => {
  const profileInputRef = useRef<HTMLInputElement>(null);
  const bikeInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: keyof UserProfile) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateProfile({ [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Coluna de Imagens e Identidade */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl text-center">
            <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-6 italic">Identidade Visual</h4>
            
            <div className="flex flex-col items-center gap-8">
              {/* Profile Pic */}
              <div className="relative group">
                <button 
                  onClick={() => profileInputRef.current?.click()}
                  className="w-32 h-32 rounded-full border-4 border-red-600/30 overflow-hidden bg-black flex items-center justify-center hover:border-red-600 transition-all shadow-2xl"
                >
                  {userProfile.profileImage ? (
                    <img src={userProfile.profileImage} className="w-full h-full object-cover" alt="Profile" />
                  ) : (
                    <span className="text-4xl">👤</span>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] text-white font-black uppercase tracking-tighter italic">Trocar Foto</div>
                </button>
                <input type="file" ref={profileInputRef} onChange={(e) => handleImageUpload(e, 'profileImage')} className="hidden" accept="image/*" />
              </div>

              {/* Logo Fixa do Sistema */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Logo BlackAdventure</label>
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto overflow-hidden shadow-lg shadow-red-900/40 select-none">
                  <span className="text-2xl font-black text-white italic">B</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
             <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4 italic">Status do Sistema</h4>
             <div className="flex items-center justify-between p-3 bg-black rounded-xl border border-zinc-800">
               <span className="text-xs text-zinc-400 font-bold italic">Modo Offline</span>
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
             </div>
          </div>
        </div>

        {/* Coluna de Dados do Usuário e Máquina */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-black text-white mb-8 italic uppercase tracking-tighter border-b border-zinc-800 pb-4">Dados Pessoais</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic ml-1">Codinome / Nome</label>
                <input 
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => onUpdateProfile({ name: e.target.value })}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-4 text-white font-bold focus:border-red-600 outline-none transition-all italic"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-black text-white mb-8 italic uppercase tracking-tighter border-b border-zinc-800 pb-4">Sua Máquina</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic ml-1">Marca</label>
                <input 
                  type="text"
                  value={userProfile.bikeBrand}
                  onChange={(e) => onUpdateProfile({ bikeBrand: e.target.value })}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-4 text-white font-bold focus:border-red-600 outline-none transition-all italic uppercase"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic ml-1">Modelo</label>
                <input 
                  type="text"
                  value={userProfile.bikeModel}
                  onChange={(e) => onUpdateProfile({ bikeModel: e.target.value })}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-4 text-white font-bold focus:border-red-600 outline-none transition-all italic uppercase"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic ml-1 block">Foto da Moto</label>
              <div className="relative group rounded-3xl overflow-hidden border-2 border-dashed border-zinc-800 hover:border-red-600 transition-all aspect-video bg-black flex items-center justify-center">
                {userProfile.bikeImage ? (
                  <img src={userProfile.bikeImage} className="w-full h-full object-cover" alt="Bike" />
                ) : (
                  <span className="text-6xl opacity-20">🏍️</span>
                )}
                <button 
                  onClick={() => bikeInputRef.current?.click()}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity gap-2"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs font-black text-white uppercase tracking-widest italic">Atualizar Foto</span>
                </button>
                <input type="file" ref={bikeInputRef} onChange={(e) => handleImageUpload(e, 'bikeImage')} className="hidden" accept="image/*" />
              </div>
            </div>
          </div>

          <div className="p-4 text-center">
            <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em] italic">Configurações salvas localmente</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
