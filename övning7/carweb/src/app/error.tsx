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
    <div>
      <h2 className="text-3xl text-center">Something went wrong!</h2>
      <p>{error.message}</p>
      <button type="button" onClick={unstable_retry}>
        Try Again
      </button>
    </div>
  );
}
