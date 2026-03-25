"use client";

import { useEffect, useRef, useState } from "react";
import type { Point, Pulse, Mode } from "./geometry/types";
import { BASE_N, MAX_PTS } from "./geometry/types";
import { triangulateRaw } from "./geometry/delaunay";
import { computeVoronoiData } from "./geometry/voronoi";
import { palettes } from "./palette/palettes";

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

function applyPalette(index: number) {
  const palette = palettes[index];
  const root = document.documentElement;
  palette.colors.forEach((rgb, i) => {
    root.style.setProperty(`--palette-${i + 1}`, rgbToHex(...rgb));
  });
}

let freshPageLoad = true;

export default function GeoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<Mode>("delaunay");
  const paletteRef = useRef(0);
  const [mode, setMode] = useState<Mode>("delaunay");
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedPalette = sessionStorage.getItem("palette");
    let palette: number;
    if (freshPageLoad) {
      const prev = storedPalette !== null ? parseInt(storedPalette, 10) : -1;
      palette = (prev + 1) % palettes.length;
    } else {
      palette = storedPalette !== null ? parseInt(storedPalette, 10) : 0;
    }
    setPaletteIndex(palette);
    paletteRef.current = palette;
    applyPalette(palette);
    sessionStorage.setItem("palette", String(palette));

    const storedMode = sessionStorage.getItem("mode") as Mode | null;
    let initial: Mode;
    if (freshPageLoad) {
      initial = storedMode === "delaunay" ? "voronoi" : "delaunay";
    } else {
      initial = storedMode ?? "delaunay";
    }
    setMode(initial);
    modeRef.current = initial;
    sessionStorage.setItem("mode", initial);

    freshPageLoad = false;
    setReady(true);
  }, []);

  function cyclePalette() {
    setPaletteIndex((i) => {
      const next = (i + 1) % palettes.length;
      paletteRef.current = next;
      applyPalette(next);
      sessionStorage.setItem("palette", String(next));
      return next;
    });
  }

  function toggleMode() {
    setMode((m) => {
      const next = m === "delaunay" ? "voronoi" : "delaunay";
      modeRef.current = next;
      sessionStorage.setItem("mode", next);
      return next;
    });
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = innerWidth);
    let H = (canvas.height = innerHeight);
    const mouse = { x: W / 2, y: H / 2 };
    let raf: number;
    let pulses: Pulse[] = [];

    const pts: Point[] = Array.from({ length: BASE_N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      pinned: false,
    }));

    function getColor(slot: number): [number, number, number] {
      return palettes[paletteRef.current].colors[slot];
    }

    function resize() {
      W = canvas!.width = innerWidth;
      H = canvas!.height = innerHeight;
    }

    function onClick(e: MouseEvent) {
      if (pts.length >= MAX_PTS) return;

      const rect = canvas!.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      pts.push({ x: cx, y: cy, vx: 0, vy: 0, pinned: true });

      const extra = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < extra; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 50;
        pts.push({
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          pinned: false,
        });
      }

      pulses.push({ x: cx, y: cy, birth: performance.now() });
      setHintVisible(false);
    }

    function pulseAlphaAt(
      x: number,
      y: number,
      now: number,
      radius: number
    ): number {
      let alpha = 0;
      for (const pulse of pulses) {
        const pd = Math.sqrt((x - pulse.x) ** 2 + (y - pulse.y) ** 2);
        const age = (now - pulse.birth) / 800;
        if (pd < radius) {
          alpha = Math.max(
            alpha,
            (1 - pd / radius) * Math.max(0, 1 - age) * 0.25
          );
        }
      }
      return alpha;
    }

    function drawDelaunay(
      indices: [number, number, number][],
      all: Point[],
      now: number
    ) {
      const edgeColor = getColor(1);
      const fillColor = getColor(2);
      const filtered = indices.filter(
        (t) => t[0] > 2 && t[1] > 2 && t[2] > 2
      );

      for (const [ai, bi, ci] of filtered) {
        const a = all[ai],
          b = all[bi],
          c = all[ci];
        const cenX = (a.x + b.x + c.x) / 3;
        const cenY = (a.y + b.y + c.y) / 3;
        const md = Math.sqrt(
          (cenX - mouse.x) ** 2 + (cenY - mouse.y) ** 2
        );
        const prox = md < 300 ? 1 - md / 300 : 0;
        const pa = pulseAlphaAt(cenX, cenY, now, 150);

        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.lineTo(c.x, c.y);
        ctx!.closePath();
        ctx!.fillStyle = `rgba(${fillColor[0]},${fillColor[1]},${fillColor[2]},${0.012 + prox * 0.04 + pa})`;
        ctx!.fill();
        ctx!.strokeStyle = `rgba(${edgeColor[0]},${edgeColor[1]},${edgeColor[2]},${0.035 + prox * 0.13 + pa * 0.5})`;
        ctx!.lineWidth = 0.5;
        ctx!.stroke();
      }
    }

    function drawVoronoi(
      indices: [number, number, number][],
      all: Point[],
      now: number
    ) {
      const edgeColor = getColor(1);
      const fillColor = getColor(2);
      const { edges, cells } = computeVoronoiData(indices, all);

      for (const cell of cells) {
        const md = Math.sqrt(
          (cell.site.x - mouse.x) ** 2 + (cell.site.y - mouse.y) ** 2
        );
        const prox = md < 300 ? 1 - md / 300 : 0;
        const pa = pulseAlphaAt(cell.site.x, cell.site.y, now, 150);
        const alpha = 0.012 + prox * 0.04 + pa;
        if (alpha > 0.005) {
          ctx!.beginPath();
          ctx!.moveTo(cell.vertices[0].x, cell.vertices[0].y);
          for (let i = 1; i < cell.vertices.length; i++) {
            ctx!.lineTo(cell.vertices[i].x, cell.vertices[i].y);
          }
          ctx!.closePath();
          ctx!.fillStyle = `rgba(${fillColor[0]},${fillColor[1]},${fillColor[2]},${alpha})`;
          ctx!.fill();
        }
      }

      for (const { from, to } of edges) {
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const md = Math.sqrt(
          (midX - mouse.x) ** 2 + (midY - mouse.y) ** 2
        );
        const prox = md < 300 ? 1 - md / 300 : 0;
        const pa = pulseAlphaAt(midX, midY, now, 150);

        ctx!.beginPath();
        ctx!.moveTo(from.x, from.y);
        ctx!.lineTo(to.x, to.y);
        ctx!.strokeStyle = `rgba(${edgeColor[0]},${edgeColor[1]},${edgeColor[2]},${0.06 + prox * 0.18 + pa * 0.5})`;
        ctx!.lineWidth = 0.6;
        ctx!.stroke();
      }
    }

    function frame(now: number) {
      ctx!.clearRect(0, 0, W, H);

      for (const p of pts) {
        if (p.pinned) continue;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20 || p.x > W + 20) p.vx *= -1;
        if (p.y < -20 || p.y > H + 20) p.vy *= -1;
      }

      pulses = pulses.filter((p) => now - p.birth < 800);

      const { indices, all } = triangulateRaw(pts, W, H);

      if (modeRef.current === "delaunay") {
        drawDelaunay(indices, all, now);
      } else {
        drawVoronoi(indices, all, now);
      }

      const vertexColor = getColor(3);
      for (const p of pts) {
        const md = Math.sqrt(
          (p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2
        );
        const g = md < 200 ? (1 - md / 200) * 0.55 : 0;
        const vp = pulseAlphaAt(p.x, p.y, now, 120) * 2;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.pinned ? 1.8 : 1.2, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${vertexColor[0]},${vertexColor[1]},${vertexColor[2]},${0.1 + g + vp})`;
        ctx!.fill();
      }

      const pulseColor = getColor(2);
      for (const pulse of pulses) {
        const age = (now - pulse.birth) / 800;
        const radius = Math.max(0, age * 120);
        const alpha = Math.max(0, (1 - age) * 0.2);
        ctx!.beginPath();
        ctx!.arc(pulse.x, pulse.y, radius, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(${pulseColor[0]},${pulseColor[1]},${pulseColor[2]},${alpha})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      raf = requestAnimationFrame(frame);
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    addEventListener("resize", resize);
    addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onClick);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  const currentPalette = palettes[paletteIndex];

  return (
    <>
      <canvas ref={canvasRef} className={`fixed inset-0 z-0 cursor-crosshair transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`} />
      <div className={`pointer-events-auto fixed top-5 right-5 z-20 flex items-center gap-2.5 transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}>
        <button
          onClick={cyclePalette}
          className="group flex cursor-pointer items-center gap-2 rounded border border-fg-muted bg-transparent px-2 py-1.5 transition-all duration-300 hover:border-accent/40"
        >
          <span className="flex gap-0.5">
            {currentPalette.colors.map((rgb, i) => (
              <span
                key={i}
                className="h-2 w-2 rounded-full transition-colors duration-300"
                style={{ backgroundColor: rgbToHex(...rgb) }}
              />
            ))}
          </span>
          <span className="font-mono text-[0.5rem] tracking-[0.06em] text-fg-dim transition-colors duration-300 group-hover:text-accent">
            {currentPalette.name.toLowerCase()}
          </span>
        </button>
        <button
          onClick={toggleMode}
          className="cursor-pointer rounded border border-fg-muted bg-transparent px-2.5 py-1.5 font-mono text-[0.6rem] tracking-[0.06em] text-fg-dim transition-all duration-300 hover:border-accent/40 hover:text-accent"
        >
          {mode === "delaunay" ? "voronoi" : "delaunay"}
        </button>
      </div>
      <div
        className={`fixed bottom-7 left-1/2 z-20 -translate-x-1/2 pointer-events-none font-mono text-[0.55rem] tracking-[0.08em] text-fg-muted max-[480px]:hidden transition-opacity duration-500 ${hintVisible ? "fade-in-hint" : "opacity-0"}`}
      >
        click anywhere to refine mesh
      </div>
    </>
  );
}
