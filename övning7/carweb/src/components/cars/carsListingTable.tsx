import { getCarsAction } from "@/lib/actions/cars";
import CarsRemoveButton from "./carsRemoveButton";
import CarsEditButton from "./carsEditButton";

export default async function CarsListingTable() {
  const cars = await getCarsAction();

  return (
    <table>
      <thead>
        <tr>
          <td className="py-2 px-4">Brand</td>
          <td className="py-2 px-4">Model</td>
          <td className="py-2 px-4">Year</td>
          <td className="py-2 px-4">Color</td>
          <td className="py-2 px-4">Edit</td>
          <td className="py-2 px-4">Remove</td>
        </tr>
      </thead>
      <tbody>
        {cars &&
          cars.map((car) => (
            <tr key={car.id} className="odd:bg-gray-200 dark:odd:bg-gray-700">
              <td className="py-2 px-4">{car.brand}</td>
              <td className="py-2 px-4">{car.model}</td>
              <td className="py-2 px-4">{car.year}</td>
              <td className="py-2 px-4">{car.color}</td>
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
  );
}
