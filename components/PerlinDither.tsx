"use client";

import { useEffect, useRef } from "react";

const PERM = new Uint8Array(512);
const BASE = new Uint8Array(256);

for (let i = 0; i < 256; i++) BASE[i] = i;
for (let i = 255; i > 0; i--) {
  const j = (Math.random() * (i + 1)) | 0;
  [BASE[i], BASE[j]] = [BASE[j], BASE[i]];
}
BASE.forEach((v, i) => {
  PERM[i] = v;
  PERM[256 + i] = v;
});

const BAYER = new Uint8Array([0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5]);

function grad(hash: number, x: number, y: number, z: number) {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

function fade(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function perlin3(x: number, y: number, z: number) {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const Z = Math.floor(z) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const zf = z - Math.floor(z);
  const u = fade(xf);
  const v = fade(yf);
  const w = fade(zf);

  const A = PERM[X] + Y;
  const AA = PERM[A] + Z;
  const AB = PERM[A + 1] + Z;
  const B = PERM[X + 1] + Y;
  const BA = PERM[B] + Z;
  const BB = PERM[B + 1] + Z;

  const g000 = grad(PERM[AA], xf, yf, zf);
  const g100 = grad(PERM[BA], xf - 1, yf, zf);
  const g010 = grad(PERM[AB], xf, yf - 1, zf);
  const g110 = grad(PERM[BB], xf - 1, yf - 1, zf);
  const g001 = grad(PERM[AA + 1], xf, yf, zf - 1);
  const g101 = grad(PERM[BA + 1], xf - 1, yf, zf - 1);
  const g011 = grad(PERM[AB + 1], xf, yf - 1, zf - 1);
  const g111 = grad(PERM[BB + 1], xf - 1, yf - 1, zf - 1);

  const x1 = g000 + u * (g100 - g000);
  const x2 = g010 + u * (g110 - g010);
  const y1 = x1 + v * (x2 - x1);
  const x3 = g001 + u * (g101 - g001);
  const x4 = g011 + u * (g111 - g011);
  const y2 = x3 + v * (x4 - x3);
  return y1 + w * (y2 - y1);
}

interface PerlinDitherProps {
  pixelSize?: number;
  color?: string;
  scale?: number;
  speed?: number;
}

export default function PerlinDither({
  pixelSize = 5,
  color = "#d4783a",
  scale = 0.04,
  speed = 0.1,
}: PerlinDitherProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const scrollYRef = useRef(0);
  const smoothScrollRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999, sx: -9999, sy: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: true });
    if (!ctx) return;

    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const rgbPacked = (r | (g << 8) | (b << 16)) >>> 0;

    let bufW = Math.ceil(window.innerWidth / pixelSize);
    let bufH = Math.ceil(window.innerHeight / pixelSize);
    canvas.width = bufW;
    canvas.height = bufH;
    canvas.style.width = `${bufW * pixelSize}px`;
    canvas.style.height = `${bufH * pixelSize}px`;

    let imageData = ctx.createImageData(bufW, bufH);
    let pixels = new Uint32Array(imageData.data.buffer);
    let drawW = bufW;
    let drawH = bufH;

    const onResize = () => {
      const tw = Math.ceil(window.innerWidth / pixelSize);
      const th = Math.ceil(window.innerHeight / pixelSize);
      drawW = tw;
      drawH = th;
      if (tw > bufW || th > bufH) {
        bufW = Math.max(bufW, tw);
        bufH = Math.max(bufH, th);
        canvas.width = bufW;
        canvas.height = bufH;
        canvas.style.width = `${bufW * pixelSize}px`;
        canvas.style.height = `${bufH * pixelSize}px`;
        imageData = ctx.createImageData(bufW, bufH);
        pixels = new Uint32Array(imageData.data.buffer);
      } else {
        canvas.style.width = `${bufW * pixelSize}px`;
        canvas.style.height = `${bufH * pixelSize}px`;
      }
    };

    const onScroll = () => {
      scrollYRef.current = window.scrollY || 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const onPointerLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    onScroll();

    let last = 0;
    const tick = (t: number) => {
      rafRef.current = requestAnimationFrame(tick);
      if (t - last < 50) return;
      last = t;

      smoothScrollRef.current += (scrollYRef.current - smoothScrollRef.current) * 0.12;
      const scrollUnits = smoothScrollRef.current * 0.0045;
      const z = 0.001 * t * speed + scrollUnits * 0.35;
      const yScroll = scrollUnits;

      const mouse = mouseRef.current;
      mouse.sx += (mouse.x - mouse.sx) * 0.22;
      mouse.sy += (mouse.y - mouse.sy) * 0.22;

      // Orange dither lens acts as the only cursor cue
      const mx = mouse.sx / pixelSize;
      const my = mouse.sy / pixelSize;
      const clearR = 9;
      const ringR = 15;
      const clearR2 = clearR * clearR;
      const ringR2 = ringR * ringR;
      const hasPointer = mouse.active && mouse.sx > -1000;

      for (let y = 0; y < drawH; y++) {
        const ny = y * scale + yScroll;
        const row = y * bufW;
        const bayerRow = (y & 3) * 4;
        const dy = y - my;
        for (let x = 0; x < drawW; x++) {
          let n = 0.5 * perlin3(x * scale, ny, z) + 0.5;
          const threshold = 0.0625 * BAYER[bayerRow + (x & 3)];

          if (hasPointer) {
            const dx = x - mx;
            const d2 = dx * dx + dy * dy;
            if (d2 < clearR2) {
              const fall = 1 - d2 / clearR2;
              n -= fall * fall * 0.78;
            } else if (d2 < ringR2) {
              const mid = (d2 - clearR2) / (ringR2 - clearR2);
              const band = Math.sin(Math.PI * mid);
              n += band * band * 0.34;
            }
          }

          if (2.5 * Math.max(n - 0.45, 0) > threshold) {
            pixels[row + x] = rgbPacked | ((18 + 50 * Math.min(n, 1)) << 24);
          } else {
            pixels[row + x] = 0;
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [pixelSize, color, scale, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
