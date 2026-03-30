"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="mx-auto mt-12 w-full max-w-6xl px-6"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-100 md:text-3xl">Projects</h2>
        <p className="mt-2 text-slate-300">
          Selected builds across AI, networking, humanitarian tech, and analytics.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </motion.section>
  );
}
