"use client";

import { useEffect, useRef } from "react";

type Flake = {
  x: number;
  y: number;
  size: number;
  speed: number;
  sway: number;
  phase: number;
  alpha: number;
  crystal: boolean;
  rot: number;
  spin: number;
};

const SPRITE = 64;

/** Soft, fuzzy snow blob: bright core fading smoothly to transparent. */
function makeSoftSprite() {
  const c = document.createElement("canvas");
  c.width = c.height = SPRITE;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(SPRITE / 2, SPRITE / 2, 0, SPRITE / 2, SPRITE / 2, SPRITE / 2);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.85)");
  grad.addColorStop(0.7, "rgba(255,255,255,0.25)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, SPRITE, SPRITE);
  return c;
}

/** Six-armed snow crystal with small side branches. */
function makeCrystalSprite() {
  const c = document.createElement("canvas");
  c.width = c.height = SPRITE;
  const g = c.getContext("2d")!;
  g.translate(SPRITE / 2, SPRITE / 2);
  g.strokeStyle = "rgba(255,255,255,0.95)";
  g.lineCap = "round";
  g.lineWidth = 2.6;
  g.shadowColor = "rgba(255,255,255,0.9)";
  g.shadowBlur = 4;
  const arm = SPRITE * 0.4;
  for (let i = 0; i < 6; i++) {
    g.save();
    g.rotate((Math.PI / 3) * i);
    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(0, -arm);
    for (const at of [0.45, 0.72]) {
      const len = arm * (at === 0.45 ? 0.3 : 0.22);
      g.moveTo(0, -arm * at);
      g.lineTo(-len, -arm * at - len);
      g.moveTo(0, -arm * at);
      g.lineTo(len, -arm * at - len);
    }
    g.stroke();
    g.restore();
  }
  return c;
}

/**
 * Falling-snow overlay drawn on a canvas. Place inside a `relative` container.
 * Pauses when off-screen or the tab is hidden, and is skipped for reduced-motion users.
 */
export function Snowfall({ density = 1, className = "" }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const soft = makeSoftSprite();
    const crystal = makeCrystalSprite();
    let flakes: Flake[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let last = performance.now();
    let wind = 0;

    const makeFlake = (anywhere: boolean): Flake => {
      const isCrystal = Math.random() < 0.1;
      // Mostly small distant flakes, a few large close ones for depth.
      const size = isCrystal ? 12 + Math.random() * 16 : Math.random() ** 2.2 * 16 + 3.5;
      return {
        x: Math.random() * width,
        y: anywhere ? Math.random() * height : -size,
        size,
        speed: 24 + size * 4 + Math.random() * 18,
        sway: 8 + Math.random() * 22,
        phase: Math.random() * Math.PI * 2,
        alpha: isCrystal ? 0.92 : Math.min(1, 0.55 + size / 16),
        crystal: isCrystal,
        rot: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 1.2,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Heavy snowfall, capped so phones stay smooth.
      const target = Math.min(Math.round(((width * height) / 1600) * density), width < 640 ? 260 : 700);
      flakes = Array.from({ length: target }, () => makeFlake(true));
    };

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      // slow, gusting breeze shared by every flake
      wind = Math.sin(now / 4000) * 14 + 10;
      ctx.clearRect(0, 0, width, height);
      for (const f of flakes) {
        f.phase += dt * 0.9;
        f.y += f.speed * dt;
        f.x += (Math.sin(f.phase) * f.sway + wind * (f.size / 8)) * dt;
        if (f.y - f.size > height) Object.assign(f, makeFlake(false));
        if (f.x > width + f.size) f.x = -f.size;
        else if (f.x < -f.size) f.x = width + f.size;
        ctx.globalAlpha = f.alpha;
        if (f.crystal) {
          f.rot += f.spin * dt;
          ctx.save();
          ctx.translate(f.x, f.y);
          ctx.rotate(f.rot);
          ctx.drawImage(crystal, -f.size / 2, -f.size / 2, f.size, f.size);
          ctx.restore();
        } else {
          ctx.drawImage(soft, f.x - f.size / 2, f.y - f.size / 2, f.size, f.size);
        }
      }
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (frame || !visible || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(draw);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
