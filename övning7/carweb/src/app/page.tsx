import { getCarsAction } from "@/lib/actions/cars";

export default async function Home() {
  const cars = await getCarsAction();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <table>
        <thead>
          <tr>
            <td>Brand</td>
            <td>Model</td>
            <td>Year</td>
            <td>Color</td>
          </tr>
        </thead>
        <tbody>
          {cars &&
            cars.map((car) => (
              <tr key={car.id}>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.color}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
