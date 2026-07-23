"use client";

const links = [
  { label: "Email", href: "mailto:alihashar0406@gmail.com" },
  { label: "GitHub", href: "https://github.com/malihashar" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-ali-hashar" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 mx-auto mt-16 w-full max-w-5xl px-6 pb-8">
      <div className="border-t border-[var(--border)] pt-12">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl">
          Let&apos;s build something impactful
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Open to collaborations, internships, and ambitious product ideas. Reach out
          and let&apos;s start a conversation.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label === "Email" ? undefined : "_blank"}
              rel={link.label === "Email" ? undefined : "noreferrer"}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
