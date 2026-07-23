"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [isFrench, setIsFrench] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFrench((prev) => !prev);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-[88vh] items-center justify-center px-6 pb-16 pt-28"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="hero-greeting mb-3 text-[var(--accent)]">
          <span className="text-sm font-medium tracking-[0.14em] uppercase md:text-base">
            {isFrench ? "Bonjour, je m'appelle" : "Hi, my name is"}
          </span>
        </p>
        <h1 className="font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-[var(--foreground)] md:text-7xl">
          <a
            href="https://github.com/malihashar"
            target="_blank"
            rel="noreferrer"
            className="inline-block transition hover:text-[var(--accent)]"
          >
            Muhammad Ali Hashar
          </a>
        </h1>

        <p className="mt-5 max-w-xl text-lg font-medium text-[var(--foreground)]/80 md:text-xl">
          Building tech that shapes tomorrow
        </p>

        <p className="mt-3 max-w-lg text-base text-[var(--muted)] md:text-lg">
          15-year-old developer focused on full-stack and AI systems.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="rounded-lg bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)] transition hover:opacity-90"
          >
            View projects
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)]/70 px-5 py-2.5 text-sm font-medium text-[var(--foreground)] backdrop-blur-sm transition hover:border-[var(--accent)]"
          >
            Get in touch
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-[var(--muted)]">
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
    </section>
  );
}
