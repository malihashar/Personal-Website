"use client";

import { useEffect, useRef, useState } from "react";
import { isInteractiveTarget, pointer } from "@/lib/pointer";

/**
 * DOM cursor inspired by sites like autumn.ai / Locomotive demos:
 * sharp tip + lagging lens ring that expands over interactive UI.
 */
export default function SiteCursor() {
  const tipRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const pos = useRef({ x: -100, y: -100, rx: -100, ry: -100 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-site-cursor");

    const onMove = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      setVisible(true);

      const nextHover = isInteractiveTarget(e.target);
      pointer.hover = nextHover;
      setHovering(nextHover);
    };

    const onLeave = () => {
      pointer.active = false;
      pointer.hover = false;
      setVisible(false);
      setHovering(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("mouseleave", onLeave);

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const p = pos.current;
      // Ring lags behind tip (magnetic / springy feel used on many Awwwards sites)
      p.rx += (p.x - p.rx) * 0.18;
      p.ry += (p.y - p.ry) * 0.18;
      pointer.sx += (p.x - pointer.sx) * 0.22;
      pointer.sy += (p.y - pointer.sy) * 0.22;

      if (tipRef.current) {
        tipRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${p.rx}px, ${p.ry}px, 0)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${p.rx + 18}px, ${p.ry - 10}px, 0)`;
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove("has-site-cursor");
      pointer.active = false;
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className={`site-cursor pointer-events-none fixed inset-0 z-[100] ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div ref={tipRef} className="site-cursor-tip">
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
          <path
            d="M1.2 1.2 15.4 10.4 8.6 12.2 5.4 20.2Z"
            fill="#1f1a16"
            stroke="#fff"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        ref={ringRef}
        className={`site-cursor-ring ${hovering ? "is-hover" : ""}`}
      />

      <div
        ref={labelRef}
        className={`site-cursor-card ${hovering ? "is-hover" : ""}`}
      >
        <span className="site-cursor-mark" />
        <span className="site-cursor-label">{hovering ? "Open" : "MH"}</span>
      </div>
    </div>
  );
}
