
import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    bikeBrand: '',
    bikeModel: '',
    profileImage: '',
    bikeImage: '',
  });

  const profileInputRef = useRef<HTMLInputElement>(null);
  const bikeInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: keyof UserProfile) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.bikeBrand && formData.bikeModel) {
      onComplete(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-start justify-center p-4 overflow-y-auto custom-scrollbar">
      <div className="absolute inset-0 overflow-hidden pointer-events-none fixed">
        <div className="absolute -top-48 -left-48 w-full h-full bg-red-900/10 rounded-full blur-[160px]" />
      </div>

      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-[32px] p-6 md:p-10 shadow-2xl relative z-10 my-4 md:my-12 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl select-none">
            <span className="text-3xl font-black text-white italic">B</span>
          </div>
          <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">Garagem Black</h1>
          <p className="text-zinc-500 mt-1 text-[10px] font-black uppercase tracking-widest">Configuração do Piloto</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-2 p-3 bg-black/40 rounded-2xl border border-zinc-800">
              <label className="text-[8px] font-black text-zinc-600 uppercase italic">Foto Piloto</label>
              <button
                type="button"
                onClick={() => profileInputRef.current?.click()}
                className="w-16 h-16 rounded-full border-2 border-zinc-800 hover:border-red-600 overflow-hidden bg-zinc-900 flex items-center justify-center"
              >
                {formData.profileImage ? <img src={formData.profileImage} className="w-full h-full object-cover" alt="P" /> : <span className="text-xl">👤</span>}
              </button>
              <input type="file" ref={profileInputRef} onChange={(e) => handleImageUpload(e, 'profileImage')} className="hidden" accept="image/*" />
            </div>

            <div className="flex flex-col items-center gap-2 p-3 bg-black/40 rounded-2xl border border-zinc-800">
              <label className="text-[8px] font-black text-zinc-600 uppercase italic">Foto Moto</label>
              <button
                type="button"
                onClick={() => bikeInputRef.current?.click()}
                className="w-20 h-16 rounded-xl border-2 border-zinc-800 hover:border-red-600 overflow-hidden bg-zinc-900 flex items-center justify-center"
              >
                {formData.bikeImage ? <img src={formData.bikeImage} className="w-full h-full object-cover" alt="M" /> : <span className="text-2xl">🏍️</span>}
              </button>
              <input type="file" ref={bikeInputRef} onChange={(e) => handleImageUpload(e, 'bikeImage')} className="hidden" accept="image/*" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-zinc-600 uppercase italic ml-1">Codinome</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-white font-bold text-sm focus:border-red-600 outline-none transition-all italic"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-zinc-600 uppercase italic ml-1">Marca</label>
                <input
                  required
                  type="text"
                  value={formData.bikeBrand}
                  onChange={e => setFormData({ ...formData, bikeBrand: e.target.value })}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-white font-bold text-sm focus:border-red-600 outline-none transition-all italic uppercase"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-zinc-600 uppercase italic ml-1">Modelo</label>
                <input
                  required
                  type="text"
                  value={formData.bikeModel}
                  onChange={e => setFormData({ ...formData, bikeModel: e.target.value })}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-white font-bold text-sm focus:border-red-600 outline-none transition-all italic uppercase"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl shadow-xl transition-all uppercase tracking-widest italic text-base mt-2"
          >
            Acelerar
          </button>
        </form>

        <p className="text-center text-zinc-700 text-[8px] mt-8 uppercase tracking-[0.3em] font-black italic">
          Armazenamento Local Criptografado
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
