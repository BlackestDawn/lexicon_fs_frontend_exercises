import CarsAddButton from "@/components/cars/carsAddButton";
import CarsListingTable from "@/components/cars/carsListingTable";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-xl bg-zinc-50 p-6 dark:bg-zinc-900">
      <CarsAddButton />
      <Suspense
        fallback={
          <p className="text-zinc-500 dark:text-zinc-400">
            Loading listing...
          </p>
        }
      >
        <CarsListingTable />
      </Suspense>
    </div>
  );
}
