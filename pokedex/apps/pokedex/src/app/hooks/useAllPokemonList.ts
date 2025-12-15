import useSWR from "swr";
import { api } from "../api/axios";
import type { PokemonListItem } from "../services/pokemonService";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function useAllPokemonList() {
  const { data, error } = useSWR("/pokemon?limit=2000&offset=0", fetcher, {
    revalidateOnFocus: false,
  });

  if (!data) {
    return {
      list: [] as { name: string; id: number }[],
      isLoading: true,
      error,
    };
  }

  const parsed: { name: string; id: number }[] = (
    data.results as PokemonListItem[]
  ).map((item) => {
    const parts = item.url.split("/").filter(Boolean);
    const id = Number(parts[parts.length - 1]);
    return { name: item.name, id };
  });

  return {
    list: parsed,
    isLoading: false,
    error: undefined,
  };
}
