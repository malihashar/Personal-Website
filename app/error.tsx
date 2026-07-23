"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="font-heading text-2xl font-semibold text-[var(--foreground)]">
            Something went wrong
          </h2>
          <p className="mt-3 text-sm text-[var(--muted)]">
            The page failed to render. You can try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-6 rounded-lg bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-[var(--background)] transition hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
