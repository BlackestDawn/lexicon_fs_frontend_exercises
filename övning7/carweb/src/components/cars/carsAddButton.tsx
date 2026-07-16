"use client";

import { createCarAction } from "@/lib/actions/cars";
import { CarForChangeDto } from "@/lib/data/interfaces";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import CarsFormDialog from "./carsFormDialog";

export default function CarsAddButton() {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const submit = (formData: CarForChangeDto) => {
    startTransition(async () => {
      await createCarAction(formData);
      setShowDialog(false);
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowDialog(true)}
        disabled={isPending}
        className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus-visible:ring-offset-zinc-900"
      >
        <Plus className="h-5 w-5" />
        Add Car
      </button>

      {showDialog && (
        <CarsFormDialog
          isOpen={showDialog}
          onSuccess={submit}
          onClose={() => setShowDialog(false)}
          isPending={isPending}
        />
      )}
    </>
  );
}
