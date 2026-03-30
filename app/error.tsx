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
    // Useful during dev without breaking the page.
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="mx-auto w-full max-w-3xl">
        <div className="section-card rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-slate-100">
            Something went wrong
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            The page failed to render. You can try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-6 rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}

