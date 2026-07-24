import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative z-10 flex min-h-[88vh] items-center justify-center px-6 pb-16 pt-28"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-14">
        <div className="order-2 flex max-w-xl flex-col items-center text-center md:order-1 md:items-start md:text-left">
          <p className="hero-greeting mb-3 text-[var(--accent)]">
            <span className="text-sm font-medium tracking-[0.14em] uppercase md:text-base">
              Hi, my name is
            </span>
          </p>
          <h1 className="font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-[var(--foreground)] md:text-6xl lg:text-7xl">
            <a
              href="https://github.com/malihashar"
              target="_blank"
              rel="noreferrer"
              className="inline-block transition hover:text-[var(--accent)]"
            >
              Muhammad Ali Hashar
            </a>
          </h1>

          <p className="mt-5 text-lg font-medium text-[var(--foreground)]/85 md:text-xl">
            Full-stack developer building AI-powered products.
          </p>

          <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--muted)] md:text-lg">
            I ship real web apps with Next.js, TypeScript, and FastAPI — focused on
            systems people can actually use.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a
              href="#experience"
              className="rounded-lg bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)] transition hover:opacity-90"
            >
              View experience
            </a>
            <a
              href="#projects"
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)]/70 px-5 py-2.5 text-sm font-medium text-[var(--foreground)] backdrop-blur-sm transition hover:border-[var(--accent)]/50"
            >
              View projects
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-[var(--muted)] md:justify-start">
            <a
              href="https://github.com/malihashar"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 transition hover:text-[var(--foreground)] hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-ali-hashar"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 transition hover:text-[var(--foreground)] hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="mailto:alihashar0406@gmail.com"
              className="underline-offset-4 transition hover:text-[var(--foreground)] hover:underline"
            >
              Email
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="relative mx-auto w-[220px] sm:w-[260px] md:w-[300px]">
            <div
              className="absolute -inset-3 rounded-[2rem] bg-[var(--accent)]/15 blur-2xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_60px_rgba(44,34,26,0.18)]">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/images/me.png"
                  alt="Muhammad Ali Hashar in Paris"
                  fill
                  priority
                  sizes="(max-width: 768px) 220px, 300px"
                  className="object-cover object-[center_20%]"
                />
              </div>
              <div className="border-t border-[var(--border)] bg-[var(--surface)]/95 px-4 py-3 text-center backdrop-blur-sm">
                <p className="font-heading text-sm font-semibold tracking-tight text-[var(--foreground)]">
                  Muhammad Ali Hashar
                </p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">Toronto, Canada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
