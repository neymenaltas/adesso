export interface Unit {
  id: number;
  name: string;
  description: string;
  age: string;
  cost?: {
    Wood?: number;
    Food?: number;
    Gold?: number;
  };
  build_time: number;
  reload_time: number;
  hit_points: number;
  attack: number;
  accuracy: number;
}
