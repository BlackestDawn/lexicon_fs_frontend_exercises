'use client';

import { deleteCarAction } from "@/lib/actions/cars";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

export default function CarsRemoveButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => deleteCarAction(id))}
      disabled={isPending}
      aria-label="Remove car"
      className="rounded-lg bg-red-500 p-1.5 text-white transition-colors hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50 dark:bg-red-800 dark:hover:bg-red-700 dark:focus-visible:ring-offset-zinc-900"
    >
      <Trash2 className="h-5 w-5" />
    </button>
  );
}
