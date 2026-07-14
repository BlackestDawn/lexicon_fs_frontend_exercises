"use server";

import { API_URL } from "../data/consts";
import { Car } from "../data/interfaces";

export async function getCarsAction(): Promise<Car[]> {
  const url = `${API_URL}cars`;

  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) throw new Error(`Response status: ${response.status}`);

  return response.json();
}
