import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 mx-auto mt-16 w-full max-w-5xl px-6">
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl">
          Projects
        </h2>
        <p className="mt-2 max-w-xl text-[var(--muted)]">
          Selected builds across AI, hardware, networking, and humanitarian tech.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
