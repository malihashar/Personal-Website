"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [isFrench, setIsFrench] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFrench((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 pb-20 pt-28"
    >
      <div className="animated-gradient absolute inset-0 -z-20 opacity-30" />
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="hero-greeting mb-2 text-sky-300">
          <span className="text-lg font-medium tracking-[0.08em] md:text-2xl">
            {isFrench ? "Bonjour, je m'appelle" : "Hi, my name is"}
          </span>
        </p>
        <h1 className="font-heading -mt-1 text-5xl font-bold leading-[1.05] text-slate-100 md:text-7xl">
          <a
            href="https://github.com/malihashar"
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-xl border border-transparent px-3 py-2 transition-all duration-200 hover:border-slate-500/70 hover:bg-slate-900/35"
          >
            Muhammad Ali Hashar
          </a>
        </h1>

        <p className="hero-tagline-cycle mt-4 text-xl font-medium md:text-2xl">
          Building tech that shapes tomorrow
        </p>

        <p className="mt-4 text-base font-normal text-slate-400 md:text-lg">
          15-year-old developer focused on full-stack and AI systems.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-300">
          <a
            href="https://github.com/malihashar"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 transition hover:-translate-y-0.5 hover:text-slate-100 hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-ali-hashar"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 transition hover:-translate-y-0.5 hover:text-slate-100 hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="mailto:alihashar0406@gmail.com"
            className="underline-offset-4 transition hover:-translate-y-0.5 hover:text-slate-100 hover:underline"
          >
            Email
          </a>
        </div>

        <a
          href="#about"
          className="mt-12 inline-flex flex-col items-center text-xs tracking-[0.16em] text-slate-500 transition hover:text-slate-300"
        >
          SCROLL
          <span className="mt-2 text-base">↓</span>
        </a>
      </div>
    </section>
  );
}
