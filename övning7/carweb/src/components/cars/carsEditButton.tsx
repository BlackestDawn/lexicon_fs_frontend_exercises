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
        onClick={() => setShowDialog(true)}
        disabled={isPending}
        className="p-1 bg-blue-500 dark:bg-blue-800 rounded-lg disabled:opacity-50"
      >
        <Pencil />
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
