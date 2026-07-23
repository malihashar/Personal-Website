export default function About() {
  return (
    <section id="about" className="relative z-10 mx-auto mt-8 w-full max-w-5xl px-6">
      <div className="border-t border-[var(--border)] pt-12">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl">
          Full-Stack Developer | AI &amp; Backend Systems
        </h2>

        <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-[var(--muted)]">
          <p>
            I build web applications that integrate AI into real workflows, focusing on
            performance, usability, and clean system design. Most of my work involves
            connecting frontend interfaces with backend services to handle real-time
            data, automation, and user-driven interactions.
          </p>
          <p>
            I&apos;ve developed and shipped multiple projects using Next.js, TypeScript,
            FastAPI, and Supabase, including hackathon-winning platforms. I&apos;m
            particularly interested in building systems that are reliable, scalable, and
            actually usable beyond demos.
          </p>
        </div>
      </div>
    </section>
  );
}
