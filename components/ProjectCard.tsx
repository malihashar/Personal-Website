"use client";

import Image from "next/image";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  reverse?: boolean;
}

export default function ProjectCard({ project, reverse = false }: ProjectCardProps) {
  const isRua = project.title.includes("Rua");

  return (
    <article className="section-card overflow-hidden rounded-2xl">
      <div className={`grid md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <a
          href={project.demoUrl ?? project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="group relative block min-h-[240px] overflow-hidden bg-slate-900 md:min-h-[300px]"
        >
          {isRua ? (
            <span className="absolute inset-x-0 top-0 z-10 h-1.5 bg-slate-900" />
          ) : null}
          <Image
            src={project.imageSrc}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-300 group-hover:scale-[1.02] group-hover:brightness-110"
          />
        </a>

        <div className="p-6 md:p-8">
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
