"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
}

function useFineHoverDevice() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return enabled;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const fineHover = useFineHoverDevice();
  const videoRef = useRef<HTMLVideoElement>(null);
  const primedRef = useRef(false);
  const seekFallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [videoActive, setVideoActive] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const demoHref = project.demoUrl ?? project.githubUrl;
  const hasVideo = Boolean(project.previewVideoSrc);
  const startSec = project.previewVideoStartSec ?? 0;
  const endSec = project.previewVideoEndSec;
  const segmentLoop =
    typeof endSec === "number" && Number.isFinite(endSec) && endSec > startSec + 0.25;

  const endHoverMedia = useCallback(() => {
    if (seekFallbackRef.current) {
      clearTimeout(seekFallbackRef.current);
      seekFallbackRef.current = null;
    }
    primedRef.current = false;
    setVideoReady(false);
    setVideoActive(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }, []);

  const startHoverMedia = useCallback(() => {
    if (!fineHover || !hasVideo || !project.previewVideoSrc) return;
    primedRef.current = false;
    setVideoActive(true);
    setVideoReady(false);
  }, [fineHover, hasVideo, project.previewVideoSrc]);

  const tryPlayAfterSeek = useCallback(
    (v: HTMLVideoElement) => {
      if (primedRef.current) return;
      primedRef.current = true;
      void v.play().catch(() => {
        primedRef.current = false;
        setVideoReady(false);
        setVideoActive(false);
      });
    },
    [],
  );

  const onLoadedMetadata = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (seekFallbackRef.current) {
      clearTimeout(seekFallbackRef.current);
      seekFallbackRef.current = null;
    }
    primedRef.current = false;
    setVideoReady(false);
    if (startSec <= 0.05) {
      try {
        v.currentTime = 0;
      } catch {
        /* ignore */
      }
      tryPlayAfterSeek(v);
      return;
    }
    try {
      v.currentTime = startSec;
    } catch {
      tryPlayAfterSeek(v);
      return;
    }
    seekFallbackRef.current = setTimeout(() => {
      seekFallbackRef.current = null;
      if (videoRef.current === v && !primedRef.current) {
        tryPlayAfterSeek(v);
      }
    }, 450);
  }, [startSec, tryPlayAfterSeek]);

  const onSeeked = useCallback(() => {
    const v = videoRef.current;
    if (!v || primedRef.current) return;
    if (seekFallbackRef.current) {
      clearTimeout(seekFallbackRef.current);
      seekFallbackRef.current = null;
    }
    if (startSec > 0.05) {
      tryPlayAfterSeek(v);
    }
  }, [startSec, tryPlayAfterSeek]);

  const onPlaying = useCallback(() => {
    if (seekFallbackRef.current) {
      clearTimeout(seekFallbackRef.current);
      seekFallbackRef.current = null;
    }
    setVideoReady(true);
  }, []);

  const onEnded = useCallback(() => {
    if (!segmentLoop) return;
    const v = videoRef.current;
    if (!v) return;
    try {
      v.currentTime = startSec;
      void v.play().catch(() => {});
    } catch {
      /* ignore */
    }
  }, [segmentLoop, startSec]);

  const onTimeUpdate = useCallback(() => {
    if (!segmentLoop || endSec == null) return;
    const v = videoRef.current;
    if (!v) return;
    if (v.currentTime >= endSec - 0.04) {
      try {
        v.currentTime = startSec;
      } catch {
        /* ignore */
      }
    }
  }, [endSec, segmentLoop, startSec]);

  const onVideoError = useCallback(() => {
    primedRef.current = false;
    setVideoReady(false);
    setVideoActive(false);
  }, []);

  useEffect(() => {
    if (!videoActive) primedRef.current = false;
  }, [videoActive]);

  useEffect(() => {
    return () => {
      if (seekFallbackRef.current) {
        clearTimeout(seekFallbackRef.current);
        seekFallbackRef.current = null;
      }
    };
  }, []);

  const showVideoLayer = fineHover && hasVideo && videoActive;
  const imageFadeOut = showVideoLayer && videoReady;

  return (
    <a
      href={demoHref}
      target="_blank"
      rel="noreferrer"
      className="group/card relative block aspect-[16/10] overflow-hidden rounded-2xl bg-slate-950 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_18px_48px_-24px_rgba(0,0,0,0.75)] ring-1 ring-white/[0.06] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform outline-none motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-sky-400/35 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.02] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_0_0_1px_rgba(56,189,248,0.12),0_0_48px_-16px_rgba(34,211,238,0.22),0_28px_56px_-28px_rgba(0,0,0,0.85)] motion-reduce:[@media(hover:hover)_and_(pointer:fine)]:hover:scale-100 motion-reduce:[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_18px_48px_-24px_rgba(0,0,0,0.75)]"
      onMouseEnter={startHoverMedia}
      onMouseLeave={endHoverMedia}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            imageFadeOut ? "opacity-0" : "opacity-100"
          }`}
          unoptimized={project.imageSrc.endsWith(".svg")}
        />
      </div>

      {showVideoLayer && project.previewVideoSrc ? (
        <video
          ref={videoRef}
          src={project.previewVideoSrc}
          className={`pointer-events-none absolute inset-0 z-[1] h-full w-full select-none object-cover transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          muted
          playsInline
          loop={!segmentLoop}
          preload="none"
          disablePictureInPicture
          controls={false}
          onLoadedMetadata={onLoadedMetadata}
          onSeeked={onSeeked}
          onPlaying={onPlaying}
          onEnded={onEnded}
          onTimeUpdate={onTimeUpdate}
          onError={onVideoError}
          aria-hidden
        />
      ) : null}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent pb-4 pt-20 px-4 md:pb-5 md:px-5"
        aria-hidden
      >
        <h3 className="font-heading text-lg font-semibold tracking-tight text-white/95 md:text-xl">
          {project.title}
        </h3>
      </div>

      <span className="sr-only">
        View {project.title} on Devpost{project.description ? `. ${project.description}` : ""}
      </span>
    </a>
  );
}
