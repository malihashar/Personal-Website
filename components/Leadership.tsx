import { leadership } from "@/lib/data";

export default function Leadership() {
  return (
    <section
      id="leadership"
      className="mx-auto w-full max-w-6xl border-t border-white/[0.06] px-6 py-8"
      aria-label="Leadership"
    >
      <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-600">
        Leadership
      </h2>
      <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-slate-500 md:flex md:flex-wrap md:gap-x-8 md:gap-y-1 md:space-y-0">
        {leadership.map((item) => (
          <li key={item.title}>
            <span className="text-slate-500">{item.title}</span>
            <span className="text-slate-600"> — {item.detail}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
