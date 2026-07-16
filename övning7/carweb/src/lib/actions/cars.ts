"use server";

import { revalidatePath } from "next/cache";
import { API_URL } from "../data/consts";
import { CarDto, CarForChangeDto } from "../data/interfaces";

export async function getCarsAction(): Promise<CarDto[]> {
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
  if (!response.ok)
    throw new Error(`Response status delete: ${response.status}`);

  revalidatePath("/");
}

export async function updateCarAction(id: number, data: CarForChangeDto) {
  const url = `${API_URL}cars/${id}`;

  console.log(`updating car id: ${id}`);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok)
    throw new Error(`Response status update: ${response.status}`);

  revalidatePath(`/`);
}

export async function createCarAction(data: CarForChangeDto) {
  const url = `${API_URL}cars`;

  console.log("creating new car");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok)
    throw new Error(`Response status create: ${response.status}`);

  revalidatePath(`/`);
}

export async function carsResetAction() {
  const url = `${API_URL}cars/reset`;

  console.log("resetting DB");

  const response = await fetch(url, {
    method: "POST",
  });
  if (!response.ok) throw new Error(`Response status: ${response.status}`);

  revalidatePath(`/`);
}
