import useSWR from "swr";
import type { PokemonDetails, PokemonListItem } from "../services/pokemonService";
import { api } from "../api/axios";
import useAllPokemonList from "./useAllPokemonList";

type Args = {
  page: number;
  limit: number;
  query?: string;
};

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function usePokemonList({ page, limit, query }: Args) {

  const { list: fullList, isLoading: allLoading } = useAllPokemonList();


  const offset = (page - 1) * limit;
  const pagedKey = `/pokemon?limit=${limit}&offset=${offset}`;
  const { data } = useSWR(pagedKey, fetcher, { revalidateOnFocus: false });


  if (query && query.trim().length > 0) {
    if (allLoading) {
      return { pokemons: [], total: 0, isLoading: true, error: undefined };
    }

    const filtered = fullList.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    const total = filtered.length;

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    const pokemons: PokemonDetails[] = paginated.map((p) => ({
      name: p.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`,
    }));

    return { pokemons, total, isLoading: false, error: undefined };
  }


  if (!data) {
    return { pokemons: [], total: 0, isLoading: true, error: undefined };
  }

  const results = data.results as PokemonListItem[];
  const total = data.count as number;

  const pokemons: PokemonDetails[] = results.map((item) => {
    const parts = item.url.split("/").filter(Boolean);
    const id = Number(parts[parts.length - 1]);

    return {
      name: item.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  });

  return { pokemons, total, isLoading: false, error: undefined };
}
