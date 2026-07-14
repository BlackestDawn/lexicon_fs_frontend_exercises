import CarsListingTable from "@/components/cars/carsListingTable";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense fallback={<p>Loading listing...</p>}>
      <CarsListingTable />
    </Suspense>
  );
}
