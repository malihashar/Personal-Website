"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
      className="section-card mx-auto mt-8 w-full max-w-6xl rounded-2xl p-8 md:p-10"
    >
      <h2 className="text-2xl font-semibold text-slate-100 md:text-3xl">About Me</h2>
      <p className="mt-4 max-w-4xl leading-relaxed text-slate-300">
        I am an IB student based in Toronto, Canada, building full-stack and AI
        projects with a strong focus on real-world outcomes. My work spans identity
        networks, humanitarian coordination tools, and production-minded web platforms.
        Through leadership roles and hackathons, I enjoy shipping practical technology
        that helps people and scales with purpose.
      </p>
    </motion.section>
  );
}
