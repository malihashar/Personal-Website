import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
          Loading portfolio...
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="h-4 w-2/3 animate-pulse rounded bg-[var(--border)]/60" />
              <div className="mt-4 h-3 w-full animate-pulse rounded bg-[var(--border)]/40" />
              <div className="mt-2 h-3 w-5/6 animate-pulse rounded bg-[var(--border)]/40" />
              <div className="mt-6 h-9 w-2/3 animate-pulse rounded bg-[var(--border)]/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
