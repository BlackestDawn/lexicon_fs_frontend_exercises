import CarsAddButton from "@/components/cars/carsAddButton";
import CarsListingTable from "@/components/cars/carsListingTable";
import CarsResetButton from "@/components/cars/carsResetButton";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-xl bg-zinc-50 p-6 dark:bg-zinc-900">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <CarsAddButton />
        <CarsResetButton />
      </div>
      <Suspense
        fallback={
          <p className="text-zinc-500 dark:text-zinc-400">Loading listing...</p>
        }
      >
        <CarsListingTable />
      </Suspense>
    </div>
  );
}
