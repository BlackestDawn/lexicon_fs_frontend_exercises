"use client";

import { updateCarAction } from "@/lib/actions/cars";
import { CarDto, CarForChangeDto } from "@/lib/data/interfaces";
import { Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import CarsFormDialog from "./carsFormDialog";

export default function CarsEditButton({ data }: { data: CarDto }) {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const submit = (formData: CarForChangeDto) => {
    startTransition(async () => {
      await updateCarAction(data.id, formData);
      setShowDialog(false);
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowDialog(true)}
        disabled={isPending}
        aria-label="Edit car"
        className="rounded-lg bg-blue-500 p-1.5 text-white transition-colors hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus-visible:ring-offset-zinc-900"
      >
        <Pencil className="h-5 w-5" />
      </button>

      {showDialog && (
        <CarsFormDialog
          isOpen={showDialog}
          onSuccess={submit}
          onClose={() => setShowDialog(false)}
          isPending={isPending}
          prefilledData={data}
        />
      )}
    </>
  );
}
