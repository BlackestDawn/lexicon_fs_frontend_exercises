'use client';

import { deleteCarAction } from "@/lib/actions/cars";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

export default function CarsRemoveButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => deleteCarAction(id))}
      disabled={isPending}
      className="p-1 bg-red-500 dark:bg-red-800 rounded-lg disabled:opacity-50"
    >
      <Trash2 />
    </button>
  );
}
