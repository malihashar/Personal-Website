"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:border-[var(--accent)]/25">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface-2)]">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className={`object-cover object-center transition duration-500 ease-out motion-reduce:transition-none ${
            imageFadeOut ? "opacity-0" : "opacity-100"
          } ${showVideoLayer ? "" : "group-hover:scale-[1.015]"}`}
          unoptimized
        />

        {showVideoLayer && project.video ? (
          <video
            ref={videoRef}
            src={project.video}
            className={`pointer-events-none absolute inset-0 z-10 h-full w-full select-none object-cover object-center transition-opacity duration-300 ${
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
          className="absolute inset-0 z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          onMouseEnter={startHoverMedia}
          onMouseLeave={endHoverMedia}
        >
          <span className="sr-only">Open {project.title} demo</span>
        </a>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <h3 className="font-heading text-base font-semibold tracking-tight text-[var(--foreground)] md:text-lg">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2 py-0.5 text-[11px] text-[var(--muted)]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-4 pt-4 text-sm">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="relative z-30 text-[var(--foreground)] transition hover:text-[var(--accent)]"
          >
            GitHub
          </a>
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="relative z-30 text-[var(--foreground)] transition hover:text-[var(--accent)]"
            >
              Devpost
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
