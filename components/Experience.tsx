import { experience } from "@/lib/data";

function ExternalArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      width="14"
      height="14"
    >
      <path
        d="M4.5 11.5 11 5M7 4.5h4.5V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative z-10 mx-auto mt-16 w-full max-w-5xl px-6">
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl">
          Experience
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">Recent to older roles</p>
      </div>

      <div className="relative flex flex-col gap-5">
        <span
          className="pointer-events-none absolute bottom-2 left-[1.4rem] top-2 w-px bg-[var(--border)]"
          aria-hidden
        />
        {experience.map((item, index) => (
          <article
            key={`${item.organization}-${item.title}`}
            className="relative grid grid-cols-[2.8rem_minmax(0,1fr)] gap-x-4"
          >
            <div className="relative z-10 flex w-11 justify-center pt-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-[0_2px_10px_rgba(44,34,26,0.06)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.logo}
                  alt={`${item.organization} logo`}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                  loading="lazy"
                />
              </span>
              <span
                className="timeline-node-ring pointer-events-none absolute inset-x-0 top-3 mx-auto h-11 w-11 rounded-xl border border-[var(--accent)]/20"
                style={{ animationDelay: `${index * 0.45}s` }}
                aria-hidden
              />
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/80 p-4 backdrop-blur-[2px] md:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-heading text-lg font-semibold text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
                  {item.period}
                </p>
              </div>

              {item.organizationUrl ? (
                <a
                  href={item.organizationUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor={`Visit ${item.organization}`}
                  className="company-link mt-2 inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/8 px-3 py-1 text-sm font-medium text-[var(--accent)] transition hover:border-[var(--accent)]/55 hover:bg-[var(--accent)]/12"
                >
                  <span>{item.organization}</span>
                  <ExternalArrow className="opacity-80" />
                  <span className="text-[11px] font-normal tracking-wide text-[var(--muted)]">
                    Visit site
                  </span>
                </a>
              ) : (
                <p className="mt-2 text-sm font-medium text-[var(--accent)]">
                  {item.organization}
                </p>
              )}

              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-[var(--muted)]">
                {item.highlights.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
