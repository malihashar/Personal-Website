"use client";

import Image from "next/image";
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 pb-20 pt-28"
    >
      <div className="animated-gradient absolute inset-0 -z-20 opacity-30" />
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-14">
        <div className="hero-copy order-2 flex max-w-xl flex-col items-center text-center md:order-1 md:items-start md:text-left">
          <p className="hero-greeting mb-2 text-cyan-300">
            <span className="text-lg font-medium tracking-[0.08em] md:text-2xl">
              {isFrench ? "Bonjour, je m'appelle" : "Hi, my name is"}
            </span>
          </p>
          <h1 className="font-heading -mt-1 text-5xl font-bold leading-[1.05] text-slate-100 md:text-6xl lg:text-7xl">
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

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-300 md:justify-start">
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
            className="mt-12 inline-flex flex-col items-center text-xs tracking-[0.16em] text-slate-500 transition hover:text-slate-300 md:items-start"
          >
            SCROLL
            <span className="mt-2 text-base">↓</span>
          </a>
        </div>

        <div className="hero-portrait order-1 md:order-2">
          <div className="relative mx-auto w-[210px] sm:w-[250px] md:w-[290px]">
            <div
              className="absolute -inset-4 rounded-[2rem] bg-cyan-400/15 blur-2xl"
              aria-hidden
            />
            <div className="glow-ring relative overflow-hidden rounded-[1.75rem] border border-slate-500/30 bg-slate-950/80">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/images/me.png"
                  alt="Muhammad Ali Hashar in Paris"
                  fill
                  priority
                  sizes="(max-width: 768px) 210px, 290px"
                  className="object-cover object-[center_18%]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
