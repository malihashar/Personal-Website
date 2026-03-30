"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="section-card group rounded-2xl p-6"
    >
      <h3 className="text-xl font-semibold text-slate-100">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">
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
            Live Demo
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}
