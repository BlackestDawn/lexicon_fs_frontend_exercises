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
      className="m-auto text-black dark:text-gray-100 bg-amber-50 dark:bg-gray-800 backdrop:bg-black/50 dark:backdrop:bg-gray-600/50 rounded-lg"
    >
      <div className="p-2 m-2 border-2 border-gray-700 dark:border-gray-300 rounded-lg">
        <div className="flex justify-between p-2 ">
          <p className="capitalize">{`${changeMode}`} car</p>
          <button
            type="button"
            disabled={isPending}
            onClick={onClose}
            className="text-black dark:text-white bg-white dark:bg-gray-800 rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            aria-label="close dialog"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form action={handleSubmit}>
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter color"
            />
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
            <button
              type="submit"
              className="capitalize px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              {isPending
                ? `${changeMode.substring(0, -2)}ing...`
                : `${changeMode}`}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
