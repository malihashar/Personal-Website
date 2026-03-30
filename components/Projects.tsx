import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto mt-12 w-full max-w-6xl px-6">
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-semibold text-slate-100 md:text-3xl">
          Projects
        </h2>
        <p className="mt-2 text-slate-300">
          Selected builds across AI, networking, humanitarian tech, and analytics.
        </p>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
