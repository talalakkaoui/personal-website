import type { Point } from "./types";

export function circumcircle(
  p1: Point,
  p2: Point,
  p3: Point
): { x: number; y: number; r: number } | null {
  const ax = p1.x,
    ay = p1.y,
    bx = p2.x,
    by = p2.y,
    cx = p3.x,
    cy = p3.y;
  const D = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
  if (Math.abs(D) < 1e-10) return null;
  const ux =
    ((ax * ax + ay * ay) * (by - cy) +
      (bx * bx + by * by) * (cy - ay) +
      (cx * cx + cy * cy) * (ay - by)) /
    D;
  const uy =
    ((ax * ax + ay * ay) * (cx - bx) +
      (bx * bx + by * by) * (ax - cx) +
      (cx * cx + cy * cy) * (bx - ax)) /
    D;
  return { x: ux, y: uy, r: Math.sqrt((ax - ux) ** 2 + (ay - uy) ** 2) };
}
