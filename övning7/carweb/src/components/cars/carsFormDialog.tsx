"use client";

import { CarDto, CarForChangeDto } from "@/lib/data/interfaces";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CarsFormDialogProps {
  isOpen: boolean;
  isPending: boolean;
  onSuccess: (data: CarForChangeDto) => void;
  onClose: () => void;
  prefilledData?: CarDto | null;
}

export default function CarsFormDialog({
  isOpen,
  isPending,
  onSuccess,
  onClose,
  prefilledData,
}: CarsFormDialogProps) {
  const changeMode = prefilledData ? "update" : "create";
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [formData, setFormData] = useState<CarForChangeDto>({
    brand: prefilledData?.brand || "",
    model: prefilledData?.model || "",
    year: prefilledData?.year || 2000,
    color: prefilledData?.color || "",
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, [onClose]);

  const handleSubmit = () => {
    onSuccess(formData);
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="m-auto w-full max-w-md rounded-lg bg-amber-50 text-black backdrop:bg-black/50 dark:bg-zinc-800 dark:text-zinc-100 dark:backdrop:bg-black/70"
    >
      <div className="rounded-lg border-2 border-zinc-700 p-4 dark:border-zinc-300">
        <div className="flex items-center justify-between pb-3">
          <p className="text-lg font-semibold capitalize">{changeMode} car</p>
          <button
            type="button"
            disabled={isPending}
            onClick={onClose}
            className="rounded-md bg-white p-1 text-black transition-colors hover:text-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:hover:text-zinc-400"
            aria-label="Close dialog"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="brand" className="block text-sm font-medium">
              Brand:
            </label>
            <input
              id="brand"
              type="text"
              required
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              disabled={isPending}
              className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-900"
              placeholder="Enter brand name"
            />
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium">
              Model:
            </label>
            <input
              id="model"
              type="text"
              required
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
              disabled={isPending}
              className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-900"
              placeholder="Enter model name"
            />
          </div>
          <div>
            <label htmlFor="year" className="block text-sm font-medium">
              Year:
            </label>
            <input
              id="year"
              type="number"
              required
              value={formData.year}
              min={1885}
              max={2100}
              onChange={(e) =>
                setFormData({ ...formData, year: Number(e.target.value) })
              }
              disabled={isPending}
              className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-900"
              placeholder="Enter manufacturing year"
            />
          </div>
          <div>
            <label htmlFor="color" className="block text-sm font-medium">
              Color:
            </label>
            <input
              id="color"
              type="text"
              required
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              disabled={isPending}
              className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-900"
              placeholder="Enter color"
            />
          </div>
          <div className="flex flex-row-reverse gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-blue-500 px-4 py-2 font-medium capitalize text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              {isPending ? `${changeMode.slice(0, -1)}ing...` : changeMode}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="rounded-md border border-zinc-300 px-4 py-2 font-medium shadow-sm transition-colors hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 dark:border-zinc-600 dark:hover:bg-zinc-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
