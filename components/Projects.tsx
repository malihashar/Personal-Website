import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto mt-12 w-full max-w-6xl px-6">
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-semibold text-slate-100 md:text-3xl">
          Projects
        </h2>
        <p className="mt-2 max-w-2xl text-slate-300">
          Hackathon builds and side projects. Hover a card on desktop to preview a short demo
          clip—videos load on demand, not up front.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
