"use client";

import { createCarAction } from "@/lib/actions/cars";
import { CarForChangeDto } from "@/lib/data/interfaces";
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
        className="px-8 py-2 bg-blue-500 dark:bg-blue-700 rounded-lg"
      >
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
