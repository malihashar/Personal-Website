import { experience, leadership } from "@/lib/data";

export default function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto mt-12 grid w-full max-w-6xl gap-6 px-6 md:grid-cols-2"
    >
      <div className="section-card rounded-2xl p-8">
        <h2 className="font-heading text-2xl font-semibold text-slate-100">
          Experience
        </h2>
        <p className="mt-2 text-sm text-slate-400">Recent to older roles</p>
        <div className="relative mt-6 flex flex-col gap-6">
          <span
            className="pointer-events-none absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-slate-700/80"
            aria-hidden
          />
          {experience.map((item, index) => (
            <article
              key={item.title}
              className="relative grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4"
            >
              <div className="relative z-10 flex w-8 justify-center pt-2.5">
                <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-300/60 bg-slate-900">
                  <span
                    className="timeline-node-ring pointer-events-none absolute inset-0 rounded-full border border-cyan-300/50"
                    style={{ animationDelay: `${index * 0.45}s` }}
                  />
                  <span className="relative z-10 h-3 w-3 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.55)]" />
                </span>
              </div>
              <div className="rounded-xl border border-slate-700/70 bg-slate-900/40 p-4">
                <h3 className="font-heading text-lg font-semibold text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-cyan-300">
                  {item.organizationUrl ? (
                    <a
                      href={item.organizationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-cyan-200 hover:underline"
                    >
                      {item.organization}
                    </a>
                  ) : (
                    item.organization
                  )}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.08em] text-slate-400">
                  {item.period}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {item.highlights.map((point) => (
                    <li key={point}>- {point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="section-card rounded-2xl p-8">
        <h2 className="font-heading text-2xl font-semibold text-slate-100">
          Leadership
        </h2>
        <div className="mt-5 space-y-4">
          {leadership.map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-700/70 p-4">
              <h3 className="font-heading font-medium text-slate-100">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-300">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
