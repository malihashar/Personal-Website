"use client";

const links = [
  { label: "Email", href: "mailto:alihashar0406@gmail.com" },
  { label: "GitHub", href: "https://github.com/malihashar" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-ali-hashar" },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto mt-12 w-full max-w-6xl px-6 pb-12">
      <div className="section-card glow-ring rounded-2xl p-8 md:p-10">
        <h2 className="font-heading text-2xl font-semibold text-slate-100 md:text-3xl">
          Let&apos;s Build Something Impactful
        </h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          I am open to collaborations, internships, and ambitious product ideas.
          Reach out and let&apos;s start a conversation.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label === "Email" ? undefined : "_blank"}
              rel={link.label === "Email" ? undefined : "noreferrer"}
              className="rounded-full border border-slate-500 px-5 py-2 text-sm font-medium text-slate-100 transition hover:border-sky-300 hover:text-sky-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
