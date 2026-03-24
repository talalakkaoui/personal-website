import type { Point, Vec2 } from "./types";
import { circumcircle } from "./circumcircle";

export interface VoronoiCell {
  site: Vec2;
  vertices: Vec2[];
}

export function computeVoronoiData(
  indices: [number, number, number][],
  all: Point[]
): { edges: { from: Vec2; to: Vec2 }[]; cells: VoronoiCell[] } {
  const centers = indices.map(([i, j, k]) => {
    const cc = circumcircle(all[i], all[j], all[k]);
    return cc ? { x: cc.x, y: cc.y } : null;
  });

  const edgeMap = new Map<string, number[]>();
  const siteTriangles = new Map<number, number[]>();

  for (let t = 0; t < indices.length; t++) {
    const tri = indices[t];
    for (let e = 0; e < 3; e++) {
      const v1 = tri[e],
        v2 = tri[(e + 1) % 3];
      const key = v1 < v2 ? `${v1}-${v2}` : `${v2}-${v1}`;
      if (!edgeMap.has(key)) edgeMap.set(key, []);
      edgeMap.get(key)!.push(t);
    }
    for (const v of tri) {
      if (!siteTriangles.has(v)) siteTriangles.set(v, []);
      siteTriangles.get(v)!.push(t);
    }
  }

  const edges: { from: Vec2; to: Vec2 }[] = [];
  for (const tris of edgeMap.values()) {
    if (tris.length === 2) {
      const c1 = centers[tris[0]];
      const c2 = centers[tris[1]];
      if (c1 && c2) edges.push({ from: c1, to: c2 });
    }
  }

  const cells: VoronoiCell[] = [];
  for (const [siteIdx, triIndices] of siteTriangles) {
    if (siteIdx <= 2) continue;
    const verts: Vec2[] = [];
    for (const t of triIndices) {
      const c = centers[t];
      if (c) verts.push(c);
    }
    if (verts.length < 3) continue;
    const site = all[siteIdx];
    const cx = verts.reduce((s, v) => s + v.x, 0) / verts.length;
    const cy = verts.reduce((s, v) => s + v.y, 0) / verts.length;
    verts.sort(
      (a, b) =>
        Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx)
    );
    cells.push({ site: { x: site.x, y: site.y }, vertices: verts });
  }

  return { edges, cells };
}
