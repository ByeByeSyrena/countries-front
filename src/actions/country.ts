import { country } from "@/api/country";

export async function list() {
  const raw = await country.list();
  const { data } = await raw.json();
  return data;
}

export async function details(info: Record<string, string>) {
  const raw = await country.details(info);
  const { data } = await raw.json();
  return data;
}
