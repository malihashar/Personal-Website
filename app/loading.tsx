import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-sky-300" />
          Loading portfolio...
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="section-card rounded-2xl p-6"
            >
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-700/60" />
              <div className="mt-4 h-3 w-full animate-pulse rounded bg-slate-800/60" />
              <div className="mt-2 h-3 w-5/6 animate-pulse rounded bg-slate-800/60" />
              <div className="mt-6 h-9 w-2/3 animate-pulse rounded bg-slate-800/60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

