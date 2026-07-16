import CarsAddButton from "@/components/cars/carsAddButton";
import CarsListingTable from "@/components/cars/carsListingTable";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <CarsAddButton />
      <Suspense fallback={<p>Loading listing...</p>}>
        <CarsListingTable />
      </Suspense>
    </div>
  );
}
