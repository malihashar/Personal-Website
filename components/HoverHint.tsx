"use client";

import { useEffect, useRef, useState } from "react";

function isInteractiveTarget(el: EventTarget | null): boolean {
  if (!(el instanceof Element)) return false;
  return Boolean(
    el.closest(
      "a, button, [role='button'], summary, label[for], .company-link, input, textarea, select",
    ),
  );
}

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

/** Grey lagging circle + action popup. System cursor stays hidden. */
export default function HoverHint() {
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const pos = useRef({ x: -100, y: -100, sx: -100, sy: -100 });
  const [enabled, setEnabled] = useState(false);
  const [onPage, setOnPage] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [action, setAction] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      setOnPage(true);

      const nextHover = isInteractiveTarget(e.target);
      setHovering(nextHover);
      setAction(nextHover ? resolveActionLabel(e.target) : "");
    };

    const onLeave = () => {
      setOnPage(false);
      setHovering(false);
      setAction("");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const p = pos.current;
      p.sx += (p.x - p.sx) * 0.2;
      p.sy += (p.y - p.sy) * 0.2;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${p.sx}px, ${p.sy}px, 0)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${p.sx + 18}px, ${p.sy + 18}px, 0)`;
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[100] ${
        onPage ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={ringRef}
        className={`cursor-ring ${hovering ? "is-hover" : ""}`}
      />
      <div
        ref={labelRef}
        className={`hover-hint ${hovering && action ? "is-visible" : ""}`}
      >
        <span className="hover-hint-action">{action}</span>
        <span className="hover-hint-arrow">↗</span>
      </div>
    </div>
  );
}
