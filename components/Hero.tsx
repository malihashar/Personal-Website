"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-6 pb-20 pt-24 md:pt-32">
      <div className="animated-gradient absolute inset-0 -z-20" />
      <div className="grid-overlay absolute inset-0 -z-10 opacity-50" />
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-5 text-sm tracking-[0.2em] text-sky-300"
        >
          MUHAMMAD ALI HASHAR
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-4xl text-4xl font-bold leading-tight text-slate-100 md:text-6xl"
        >
          Full-Stack Developer | AI &amp; Scalable Systems
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-6 max-w-3xl text-lg text-slate-300"
        >
          I build AI-powered and scalable web applications with a focus on practical
          impact, product clarity, and strong engineering foundations.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-300 hover:text-sky-300"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
