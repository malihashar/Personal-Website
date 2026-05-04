"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  reverse?: boolean;
}

export default function ProjectCard({ project, reverse = false }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const primedRef = useRef(false);
  const seekFallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [videoActive, setVideoActive] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const demoHref = project.demoUrl ?? project.githubUrl;
  const hasVideo = Boolean(project.video);
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
    if (!hasVideo || !project.video) return;
    primedRef.current = false;
    setVideoActive(true);
    setVideoReady(false);
  }, [hasVideo, project.video]);

  const tryPlayAfterSeek = useCallback((v: HTMLVideoElement) => {
    if (primedRef.current) return;
    primedRef.current = true;
    void v.play().catch(() => {
      primedRef.current = false;
      setVideoReady(false);
      setVideoActive(false);
    });
  }, []);

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

  const showVideoLayer = hasVideo && videoActive;
  const imageFadeOut = showVideoLayer && videoReady;

  return (
    <article className="group section-card overflow-hidden rounded-2xl transition-shadow duration-300 group-hover:shadow-[0_0_0_1px_rgba(56,189,248,0.2),0_24px_50px_-12px_rgba(14,165,233,0.15)]">
      <div
        className={`grid md:grid-cols-2 md:items-stretch ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
      >
        <div className="group/media relative isolate aspect-[16/10] w-full overflow-hidden bg-slate-900 md:aspect-auto md:h-full md:min-h-[280px]">
          <div className="absolute inset-0">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover transition duration-500 ease-out group-hover:scale-[1.07] group-hover:brightness-[1.08] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
                imageFadeOut ? "opacity-0" : "opacity-100"
              }`}
              unoptimized={project.image.endsWith(".svg")}
            />
          </div>

          {showVideoLayer && project.video ? (
            <video
              ref={videoRef}
              src={project.video}
              className={`pointer-events-none absolute inset-0 z-10 h-full w-full select-none object-cover transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                videoReady ? "opacity-100" : "opacity-0"
              }`}
              autoPlay
              muted
              playsInline
              loop={!segmentLoop}
              preload="metadata"
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
            className="pointer-events-none absolute inset-0 z-[11] bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent opacity-40 transition duration-500 group-hover:opacity-90"
            aria-hidden
          />

          <div
            className="pointer-events-none absolute inset-0 z-[12] ring-0 ring-cyan-400/0 transition duration-300 group-hover:ring-2 group-hover:ring-inset group-hover:ring-cyan-400/35"
            aria-hidden
          />

          {project.mediaHover ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[13] translate-y-1 px-4 pb-3 pt-10 opacity-0 transition duration-300 ease-out group-hover/media:translate-y-0 group-hover/media:opacity-100 md:px-5 md:pb-4">
              <div className="rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2.5 shadow-lg backdrop-blur-md">
                <p className="font-heading text-xs font-semibold tracking-tight text-slate-100 md:text-sm">
                  {project.mediaHover.title}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-slate-400 md:text-xs">
                  {project.mediaHover.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.mediaHover.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-sky-300/25 bg-sky-400/10 px-2 py-0.5 text-[10px] text-sky-200/95"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          <span className="pointer-events-none absolute right-3 top-3 z-[15] translate-y-1 rounded-full bg-slate-950/70 px-2.5 py-1 text-[10px] font-medium text-slate-200 opacity-0 shadow-sm backdrop-blur-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Open demo
          </span>

          <a
            href={demoHref}
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 z-20 rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            onMouseEnter={startHoverMedia}
            onMouseLeave={endHoverMedia}
          >
            <span className="sr-only">Open {project.title} demo</span>
          </a>
        </div>

        <div className="relative p-6 transition-colors duration-300 group-hover:bg-slate-900/25 md:p-8">
          <h3 className="font-heading text-2xl font-semibold text-slate-100 transition-colors duration-300 group-hover:text-white">
            {project.title}
          </h3>
          <p className="mt-3 text-sm font-normal leading-relaxed text-slate-300 transition-colors duration-300 group-hover:text-slate-200 md:text-base">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-200 transition-colors duration-300 group-hover:border-sky-300/45"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-4 text-sm">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="relative z-30 text-slate-200 transition hover:text-sky-300"
            >
              GitHub
            </a>
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="relative z-30 text-slate-200 transition hover:text-sky-300"
              >
                Devpost
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
