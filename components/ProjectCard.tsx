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
    <article className="group section-card overflow-hidden rounded-2xl transition-[box-shadow] duration-300 ease-out motion-reduce:transition-none group-hover:shadow-[0_0_0_1px_rgba(56,189,248,0.12),0_0_55px_-8px_rgba(34,211,238,0.14),0_24px_50px_-18px_rgba(15,23,42,0.65)]">
      <div
        className={`grid md:grid-cols-2 md:items-stretch ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
      >
        <div className="relative isolate aspect-[16/10] w-full overflow-hidden bg-slate-900 md:aspect-auto md:h-full md:min-h-[280px]">
          <div className="absolute inset-0">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover object-center transition duration-500 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
                imageFadeOut ? "opacity-0" : "opacity-100"
              } ${showVideoLayer ? "" : "group-hover:scale-[1.02]"}`}
              unoptimized={project.image.endsWith(".svg") || project.image.endsWith(".png")}
            />
          </div>

          {showVideoLayer && project.video ? (
            <video
              ref={videoRef}
              src={project.video}
              className={`pointer-events-none absolute inset-0 z-10 h-full w-full select-none object-cover object-center transition-opacity duration-300 ease-out motion-reduce:transition-none ${
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

        <div className="relative p-6 md:p-8">
          <h3 className="font-heading text-2xl font-semibold text-slate-100">
            {project.title}
          </h3>
          <p className="mt-3 text-sm font-normal leading-relaxed text-slate-300 md:text-base">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-200"
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
