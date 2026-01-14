
import React, { useState, useEffect } from 'react';
import { GPSStats } from '../types';
import { findNearbyPlaces } from '../services/geminiService';

const Navigation: React.FC = () => {
  const [stats, setStats] = useState<GPSStats>({
    speed: 0,
    latitude: null,
    longitude: null,
    altitude: null,
    maxSpeed: 0
  });
  const [poiResults, setPoiResults] = useState<{ text: string, places: any[] } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [activeWatchId, setActiveWatchId] = useState<number | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const speedKmh = position.coords.speed ? Math.round(position.coords.speed * 3.6) : 0;
          setStats(prev => ({
            speed: speedKmh,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude,
            maxSpeed: Math.max(prev.maxSpeed, speedKmh)
          }));
        },
        (error) => console.error("GPS Error:", error),
        { enableHighAccuracy: true }
      );
      setActiveWatchId(watchId);
    }

    return () => {
      if (activeWatchId !== null) navigator.geolocation.clearWatch(activeWatchId);
    };
  }, []);

  const handleSearchNearby = async (query: string) => {
    if (stats.latitude === null || stats.longitude === null) {
      alert("Aguardando sinal de GPS...");
      return;
    }

    setIsSearching(true);
    try {
      const results = await findNearbyPlaces(stats.latitude, stats.longitude, query);
      setPoiResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-zinc-950 border border-zinc-900 rounded-3xl p-6 md:p-10 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl min-h-[300px]">
          <div className="absolute w-48 h-48 md:w-72 md:h-72 border-4 border-red-600/10 rounded-full animate-pulse" />
          
          <div className="z-10 text-center">
            <span className="text-zinc-600 font-black uppercase tracking-widest text-[9px] mb-2 block italic">KM/H</span>
            <div className="flex items-baseline justify-center">
              <span className="text-7xl md:text-9xl font-black text-red-600 tabular-nums italic drop-shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                {stats.speed}
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-8 w-full z-10 max-w-sm">
            <div className="text-center">
              <p className="text-zinc-600 text-[9px] uppercase font-black tracking-widest mb-1 italic">V-Máxima</p>
              <p className="text-xl md:text-2xl font-black text-white italic">{stats.maxSpeed}</p>
            </div>
            <div className="text-center">
              <p className="text-zinc-600 text-[9px] uppercase font-black tracking-widest mb-1 italic">Altitude</p>
              <p className="text-xl md:text-2xl font-black text-white italic">{stats.altitude ? Math.round(stats.altitude) : '0'}m</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <h3 className="text-sm font-black text-white flex items-center gap-3 uppercase italic">
              <span className="w-1 h-4 bg-red-600 rounded-full"></span>
              Sinal GPS
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-black p-4 rounded-xl border border-zinc-800">
                <p className="text-[8px] text-zinc-600 font-black uppercase mb-1">LAT</p>
                <p className="font-mono text-xs text-red-500 font-bold truncate">{stats.latitude || 'AGUARDANDO...'}</p>
              </div>
              <div className="bg-black p-4 rounded-xl border border-zinc-800">
                <p className="text-[8px] text-zinc-600 font-black uppercase mb-1">LNG</p>
                <p className="font-mono text-xs text-red-500 font-bold truncate">{stats.longitude || 'AGUARDANDO...'}</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 bg-red-600 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest italic">
            Calibrar Bússola
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8">
        <h3 className="text-sm font-black text-white mb-6 italic uppercase tracking-widest">Radar Inteligente</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: 'Postos', query: 'postos de gasolina', icon: '⛽' },
            { label: 'Oficinas', query: 'oficina mecânica moto', icon: '🔧' },
            { label: 'Comida', query: 'parada de estrada', icon: '🍔' }
          ].map((btn, i) => (
            <button 
              key={i}
              onClick={() => handleSearchNearby(btn.query)}
              className="py-4 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-red-600 transition-all italic flex flex-col items-center gap-1"
            >
              <span className="text-lg">{btn.icon}</span>
              {btn.label}
            </button>
          ))}
        </div>

        {isSearching && (
          <div className="flex items-center gap-3 text-zinc-500 py-6 font-bold text-[9px] uppercase tracking-widest animate-pulse italic justify-center">
            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            Pingando Satélites...
          </div>
        )}

        {poiResults && (
          <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-5 bg-black border border-zinc-800 rounded-2xl">
              <p className="text-zinc-400 text-xs mb-6 italic line-clamp-3">{poiResults.text}</p>
              <div className="flex flex-col gap-2">
                {poiResults.places.slice(0, 3).map((chunk, idx) => (
                  chunk.maps && (
                    <a 
                      key={idx}
                      href={chunk.maps.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl transition-all"
                    >
                      <span className="text-[10px] font-black text-white uppercase truncate">{chunk.maps.title}</span>
                      <span className="text-red-500">📍</span>
                    </a>
                  )
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
