"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="mx-auto mt-12 w-full max-w-6xl px-6"
    >
      <div className="section-card rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-slate-100 md:text-3xl">Skills</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {skills.map((group) => (
            <div
              key={group.category}
              className="rounded-xl border border-slate-700/60 bg-slate-900/40 p-5"
            >
              <h3 className="text-base font-semibold text-sky-300">{group.category}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
