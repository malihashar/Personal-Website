import { experience, leadership } from "@/lib/data";

export default function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto mt-12 grid w-full max-w-6xl gap-6 px-6 md:grid-cols-2"
    >
      <div className="section-card rounded-2xl p-8">
        <h2 className="font-heading text-2xl font-semibold text-slate-100">
          Experience
        </h2>
        {experience.map((item) => (
          <div key={item.title} className="mt-5">
            <h3 className="font-heading text-lg font-semibold text-slate-100">
              {item.title} - {item.organization}
            </h3>
            <p className="mt-1 text-sm text-slate-400">{item.period}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {item.highlights.map((point) => (
                <li key={point}>- {point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="section-card rounded-2xl p-8">
        <h2 className="font-heading text-2xl font-semibold text-slate-100">
          Leadership
        </h2>
        <div className="mt-5 space-y-4">
          {leadership.map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-700/70 p-4">
              <h3 className="font-heading font-medium text-slate-100">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-300">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
