
export interface Trail {
  id: string;
  name: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil' | 'Extreme';
  distance: string;
  location: string;
  description: string;
  rating: number;
  imageUrl?: string;
}

export interface UserProfile {
  name: string;
  bikeBrand: string;
  bikeModel: string;
  profileImage?: string;
  bikeImage?: string;
}

export interface TrailEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  description?: string;
}

export interface MaintenanceTip {
  title: string;
  steps: string[];
  toolsNeeded: string[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  category: 'Equipamento' | 'Ferramentas' | 'Documentos' | 'Moto';
}

export interface GPSStats {
  speed: number;
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
  maxSpeed: number;
}

export type AppView = 'dashboard' | 'explorer' | 'checklist' | 'mechanic' | 'navigation' | 'events' | 'settings';
