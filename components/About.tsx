export default function About() {
  return (
    <section
      id="about"
      className="section-card mx-auto mt-8 w-full max-w-6xl rounded-2xl p-8 md:p-10"
    >
      <h2 className="font-heading text-2xl font-semibold text-slate-100 md:text-3xl">
        Full-Stack Developer | AI &amp; Backend Systems
      </h2>

      <div className="mt-4 max-w-4xl space-y-4 text-base leading-relaxed text-slate-300">
        <p>
          I build web applications that integrate AI into real workflows, focusing on
          performance, usability, and clean system design. Most of my work involves
          connecting frontend interfaces with backend services to handle real-time
          data, automation, and user-driven interactions.
        </p>
        <p>
          I&apos;ve developed and shipped multiple projects using Next.js, TypeScript,
          FastAPI, and Supabase, including a hackathon-winning AI platform. I&apos;m
          particularly interested in building systems that are reliable, scalable, and
          actually usable beyond demos.
        </p>
      </div>
    </section>
  );
}
