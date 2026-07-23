import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 mx-auto mt-16 w-full max-w-5xl px-6">
      <div className="border-t border-[var(--border)] pt-12">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl">
          Skills
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                {group.category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm text-[var(--foreground)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
