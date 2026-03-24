import type { Point } from "./types";
import { circumcircle } from "./circumcircle";

export function triangulateRaw(
  points: Point[],
  W: number,
  H: number
): { indices: [number, number, number][]; all: Point[] } {
  const m = 1500;
  const st: Point[] = [
    { x: -m, y: -m, vx: 0, vy: 0, pinned: false },
    { x: W + m * 2, y: -m, vx: 0, vy: 0, pinned: false },
    { x: W / 2, y: H + m * 2, vx: 0, vy: 0, pinned: false },
  ];
  const tris: { v: [number, number, number] }[] = [{ v: [0, 1, 2] }];
  const all = [...st, ...points];

  for (let i = 3; i < all.length; i++) {
    const p = all[i];
    const bad: number[] = [];
    const edges: [number, number][] = [];

    for (let t = 0; t < tris.length; t++) {
      const tri = tris[t];
      const cc = circumcircle(all[tri.v[0]], all[tri.v[1]], all[tri.v[2]]);
      if (cc && Math.sqrt((p.x - cc.x) ** 2 + (p.y - cc.y) ** 2) < cc.r)
        bad.push(t);
    }

    for (const b of bad) {
      const tri = tris[b];
      for (let e = 0; e < 3; e++)
        edges.push([tri.v[e], tri.v[(e + 1) % 3]]);
    }

    for (let b = bad.length - 1; b >= 0; b--) tris.splice(bad[b], 1);

    const boundary: [number, number][] = [];
    for (let e = 0; e < edges.length; e++) {
      let shared = false;
      for (let f = 0; f < edges.length; f++) {
        if (
          e !== f &&
          edges[e][0] === edges[f][1] &&
          edges[e][1] === edges[f][0]
        ) {
          shared = true;
          break;
        }
      }
      if (!shared) boundary.push(edges[e]);
    }

    for (const edge of boundary)
      tris.push({ v: [edge[0], edge[1], i] });
  }

  return { indices: tris.map((t) => t.v), all };
}