import { getCarsAction } from "@/lib/actions/cars";
import CarsRemoveButton from "./carsRemoveButton";
import CarsEditButton from "./carsEditButton";

export default async function CarsListingTable() {
  const cars = await getCarsAction();

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-700">
            <td className="px-4 py-3 font-semibold">Brand</td>
            <td className="px-4 py-3 font-semibold">Model</td>
            <td className="px-4 py-3 font-semibold">Year</td>
            <td className="px-4 py-3 font-semibold">Color</td>
            <td className="px-4 py-3 font-semibold">Edit</td>
            <td className="px-4 py-3 font-semibold">Remove</td>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
          {cars &&
            cars.map((car) => (
              <tr
                key={car.id}
                className="odd:bg-zinc-100 hover:bg-zinc-200 dark:odd:bg-zinc-900/40 dark:hover:bg-zinc-700/60"
              >
                <td className="px-4 py-3">{car.brand}</td>
                <td className="px-4 py-3">{car.model}</td>
                <td className="px-4 py-3">{car.year}</td>
                <td className="px-4 py-3">{car.color}</td>
                <td className="text-center align-middle">
                  <CarsEditButton data={car} />
                </td>
                <td className="text-center align-middle">
                  <CarsRemoveButton id={car.id} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
