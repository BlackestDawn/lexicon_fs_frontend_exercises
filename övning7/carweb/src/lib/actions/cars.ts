"use server";

import { revalidatePath } from "next/cache";
import { API_URL } from "../data/consts";
import { Car } from "../data/interfaces";

export async function getCarsAction(): Promise<Car[]> {
  const url = `${API_URL}cars`;

  console.log(`fetching: ${url}`);

  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) throw new Error(`Response status: ${response.status}`);

  return response.json();
}

export async function deleteCarAction(id: number) {
  const url = `${API_URL}cars/${id}`;

  console.log(`removing car id: ${id}`);

  const response = await fetch(url, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`Response status delete: ${response.status}`)

  revalidatePath("/");
}
