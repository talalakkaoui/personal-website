export interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pinned: boolean;
}

export interface Pulse {
  x: number;
  y: number;
  birth: number;
}

export interface Vec2 {
  x: number;
  y: number;
}

export type Mode = "delaunay" | "voronoi";

export const BASE_N = 45;
export const MAX_PTS = 200;
