"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-12 text-center">
      <h2 className="text-3xl font-bold">Something went wrong!</h2>
      <p className="text-zinc-600 dark:text-zinc-400">{error.message}</p>
      <button
        type="button"
        onClick={unstable_retry}
        className="mt-2 rounded-lg bg-blue-500 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus-visible:ring-offset-zinc-900"
      >
        Try Again
      </button>
    </div>
  );
}
