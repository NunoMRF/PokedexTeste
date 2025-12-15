import { api } from "../api/axios";

export async function fetcher<T>(url: string): Promise<T> {
  const response = await api.get(url);
  return response.data;
}
