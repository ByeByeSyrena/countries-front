import { api_url } from "@/configs/countries";
import { buildQueryString } from "@/utils/buildQueryString";

export const country = {
  async list(headers = {}) {
    const options = {
      method: "GET",
      headers: { ...headers, },
      next: { revalidate: 0 }
    };
    return fetch(`${api_url}/available-countries/`, options);
  },
  async details(data: Record<string, string>, headers = {}) {
    const options = {
      method: "GET",
      headers: { ...headers, },
      next: { revalidate: 0 }
    };
    return fetch(`${api_url}/country-info/${buildQueryString(data)}`, options);
  },
}