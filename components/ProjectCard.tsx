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
  const [videoActive, setVideoActive] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const demoHref = project.demoUrl ?? project.githubUrl;
  const hasVideo = Boolean(project.previewVideoSrc);

  const endHoverMedia = useCallback(() => {
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
    setVideoActive(true);
    setVideoReady(false);
  }, [fineHover, hasVideo, project.previewVideoSrc]);

  const onVideoLoaded = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    void v
      .play()
      .then(() => setVideoReady(true))
      .catch(() => setVideoReady(false));
  }, []);

  const onVideoError = useCallback(() => {
    setVideoReady(false);
    setVideoActive(false);
  }, []);

  const showVideoLayer = fineHover && hasVideo && videoActive;
  const imageFadeOut = showVideoLayer && videoReady;

  return (
    <a
      href={demoHref}
      target="_blank"
      rel="noreferrer"
      className="group/card relative block aspect-[16/10] overflow-hidden rounded-2xl bg-slate-900 shadow-lg shadow-black/30 ring-1 ring-white/10 transition-[transform,box-shadow] duration-500 ease-out will-change-transform motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.03] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_52px_-14px_rgba(45,212,191,0.35),0_0_36px_-8px_rgba(56,189,248,0.22),0_24px_48px_-20px_rgba(0,0,0,0.55)] motion-reduce:[@media(hover:hover)_and_(pointer:fine)]:hover:scale-100 motion-reduce:[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-lg motion-reduce:[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-black/30"
      onMouseEnter={startHoverMedia}
      onMouseLeave={endHoverMedia}
    >
      <div className="absolute inset-0">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover transition-opacity duration-500 ease-out motion-reduce:transition-none ${
            imageFadeOut ? "opacity-0" : "opacity-100"
          }`}
          unoptimized={project.imageSrc.endsWith(".svg")}
        />
      </div>

      {showVideoLayer && project.previewVideoSrc ? (
        <video
          ref={videoRef}
          src={project.previewVideoSrc}
          className={`absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-500 ease-out motion-reduce:transition-none ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          muted
          playsInline
          loop
          preload="none"
          onLoadedData={onVideoLoaded}
          onError={onVideoError}
          aria-hidden
        />
      ) : null}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent pt-24 pb-4 px-4 md:pb-5 md:px-5"
        aria-hidden
      >
        <h3 className="font-heading text-lg font-semibold tracking-tight text-white drop-shadow-sm md:text-xl">
          {project.title}
        </h3>
      </div>

      <span className="sr-only">
        View {project.title} on Devpost{project.description ? `. ${project.description}` : ""}
      </span>
    </a>
  );
}
