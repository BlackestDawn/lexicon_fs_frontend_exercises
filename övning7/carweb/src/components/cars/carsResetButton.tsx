"use client";

import { carsResetAction } from "@/lib/actions/cars";
import { ListRestart } from "lucide-react";
import { useTransition } from "react";

export default function CarsResetButton() {
  const [isPending, startTransition] = useTransition();

  const handleReset = () => {
    if (confirm("Are you sure you want to reset the cars DB?") === true)
      startTransition(() => carsResetAction())
  }

  return (
    <button
      type="button"
      onClick={handleReset}
      disabled={isPending}
      className="flex items-center gap-2 rounded-lg bg-red-500 px-6 py-2 font-medium text-white transition-colors hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50 dark:bg-red-700 dark:hover:bg-red-600 dark:focus-visible:ring-offset-zinc-900"
    >
      <ListRestart className="h-5 w-5" />
      Reset DB
    </button>
  );
}
