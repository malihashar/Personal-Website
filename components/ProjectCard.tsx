"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  reverse?: boolean;
}

export default function ProjectCard({ project, reverse = false }: ProjectCardProps) {
  const snippetLines = project.previewSnippet.trim().split("\n");
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(project.previewVideoSrc);

  const onMediaEnter = useCallback(() => {
    if (!hasVideo) return;
    void videoRef.current?.play().catch(() => {});
  }, [hasVideo]);

  const onMediaLeave = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }, []);

  const demoHref = project.demoUrl ?? project.githubUrl;

  return (
    <article className="group section-card overflow-hidden rounded-2xl transition-shadow duration-300 group-hover:shadow-[0_0_0_1px_rgba(56,189,248,0.2),0_24px_50px_-12px_rgba(14,165,233,0.15)]">
      <div
        className={`grid md:grid-cols-2 md:items-stretch ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
      >
        <div
          className="group/media relative isolate aspect-[16/10] w-full overflow-hidden bg-slate-900 md:aspect-auto md:h-full md:min-h-[280px]"
          onMouseEnter={onMediaEnter}
          onMouseLeave={onMediaLeave}
        >
          <div className="absolute inset-0">
            <Image
              src={project.imageSrc}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-500 ease-out group-hover:scale-[1.07] group-hover:brightness-[1.08]"
            />
          </div>

          {hasVideo ? (
            <video
              ref={videoRef}
              src={project.previewVideoSrc}
              className="absolute inset-0 z-10 object-cover opacity-0 transition-opacity duration-300 ease-out group-hover/media:opacity-100 motion-reduce:hidden"
              muted
              playsInline
              loop
              preload="metadata"
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

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[14] p-4 md:p-5">
            <div className="max-h-0 overflow-hidden opacity-0 transition-[max-height,opacity,margin] duration-500 ease-out group-hover:max-h-[min(52vh,320px)] group-hover:opacity-100">
              <div className="rounded-lg border border-cyan-400/25 bg-slate-950/85 p-3 shadow-lg shadow-cyan-950/40 backdrop-blur-md">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-cyan-300/90">
                  Preview
                </p>
                <pre className="max-h-[220px] overflow-x-auto overflow-y-auto whitespace-pre font-mono text-[11px] leading-relaxed text-slate-200 md:text-xs">
                  {snippetLines.map((line, i) => (
                    <span
                      key={`${i}-${line.slice(0, 12)}`}
                      className="block translate-y-1.5 opacity-0 blur-[0.5px] transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-0"
                      style={{ transitionDelay: `${80 + i * 65}ms` }}
                    >
                      {line}
                    </span>
                  ))}
                  <span className="project-snippet-caret mt-1 inline-block h-3.5 w-px translate-y-1 bg-cyan-300 align-middle opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </pre>
              </div>
            </div>
          </div>

          <span className="pointer-events-none absolute right-3 top-3 z-[15] translate-y-1 rounded-full bg-slate-950/70 px-2.5 py-1 text-[10px] font-medium text-slate-200 opacity-0 shadow-sm backdrop-blur-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Open demo
          </span>

          <a
            href={demoHref}
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 z-20 rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
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
              className="text-slate-200 transition hover:text-sky-300"
            >
              GitHub
            </a>
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-200 transition hover:text-sky-300"
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
