import { leadership } from "@/lib/data";

export default function Leadership() {
  return (
    <section id="leadership" className="relative z-10 mx-auto mt-12 w-full max-w-5xl px-6 pb-4">
      <div className="border-t border-[var(--border)] pt-10">
        <h2 className="font-heading text-xl font-semibold tracking-tight text-[var(--foreground)]">
          Leadership
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {leadership.map((item) => (
            <div key={item.title}>
              <h3 className="font-heading text-sm font-semibold text-[var(--foreground)]">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
