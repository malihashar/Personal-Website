"use client";

import { useEffect, useRef, useState } from "react";
import { isInteractiveTarget, pointer } from "@/lib/pointer";

function resolveActionLabel(target: EventTarget | null): string {
  if (!(target instanceof Element)) return "";

  const el = target.closest(
    "a, button, [role='button'], summary, label[for], .company-link",
  ) as HTMLElement | null;
  if (!el) return "";

  const custom = el.getAttribute("data-cursor");
  if (custom?.trim()) return custom.trim();

  if (el instanceof HTMLAnchorElement) {
    const href = el.getAttribute("href") || "";
    const text = (el.getAttribute("aria-label") || el.textContent || "")
      .replace(/\s+/g, " ")
      .trim();

    if (href.startsWith("mailto:")) return "Send email";
    if (href.startsWith("#")) {
      const section = href.slice(1);
      if (section === "projects") return "Jump to projects";
      if (section === "contact") return "Jump to contact";
      if (section === "about") return "Jump to about";
      if (section === "experience") return "Jump to experience";
      if (section === "skills") return "Jump to skills";
      if (section === "home") return "Back to top";
      return text || "Jump on page";
    }

    try {
      const url = new URL(href, window.location.origin);
      const host = url.hostname.replace(/^www\./, "");
      if (host.includes("github")) return text ? `Open ${text}` : "Open GitHub";
      if (host.includes("linkedin")) return "Open LinkedIn";
      if (host.includes("devpost")) return text ? `Open ${text}` : "Open Devpost";
      if (el.classList.contains("company-link") || text) {
        const name = text.replace(/Visit site/i, "").trim() || host;
        return `Visit ${name}`;
      }
      return `Open ${host}`;
    } catch {
      return text ? `Open ${text}` : "Open link";
    }
  }

  const label = (el.getAttribute("aria-label") || el.textContent || "")
    .replace(/\s+/g, " ")
    .trim();
  return label || "Click";
}

/**
 * Tip + lagging ring. The follower only appears over interactive UI and
 * shows a real action preview (where the click goes) instead of a decorative badge.
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
  const [action, setAction] = useState("");

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
      setAction(nextHover ? resolveActionLabel(e.target) : "");
    };

    const onLeave = () => {
      pointer.active = false;
      pointer.hover = false;
      setVisible(false);
      setHovering(false);
      setAction("");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("mouseleave", onLeave);

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const p = pos.current;
      p.rx += (p.x - p.rx) * 0.2;
      p.ry += (p.y - p.ry) * 0.2;
      pointer.sx += (p.x - pointer.sx) * 0.22;
      pointer.sy += (p.y - pointer.sy) * 0.22;

      if (tipRef.current) {
        tipRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${p.rx}px, ${p.ry}px, 0)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${p.rx + 22}px, ${p.ry - 14}px, 0)`;
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
        className={`site-cursor-hint ${hovering && action ? "is-visible" : ""}`}
      >
        <span className="site-cursor-hint-action">{action}</span>
        <span className="site-cursor-hint-arrow" aria-hidden>
          ↗
        </span>
      </div>
    </div>
  );
}
