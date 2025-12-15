import useSWR from "swr";
import { api } from "../api/axios";

export type PokemonStat = {
  name: string;
  value: number;
};

export type PokemonDetailsData = {
  id: number;
  name: string;
  images: string[];
  types: string[];
  height: number;
  weight: number;
  stats: PokemonStat[];
};

const fetcher = (url: string) => api.get(url).then((r) => r.data);

export default function usePokemonDetails(name: string | undefined) {
  const shouldFetch = Boolean(name);

  const { data } = useSWR(
    shouldFetch ? `/pokemon/${name}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  if (!data) {
    return {
      pokemon: undefined,
      isLoading: true,
    };
  }

  const images = [
    data.sprites.front_default,
    data.sprites.back_default,
    data.sprites.front_shiny,
    data.sprites.back_shiny,
  ].filter(Boolean);

  const pokemon: PokemonDetailsData = {
    id: data.id,
    name: data.name,
    images,
    height: data.height,
    weight: data.weight,
    types: data.types.map(
      (t: { type: { name: string } }) => t.type.name
    ),
    stats: data.stats.map(
      (s: { base_stat: number; stat: { name: string } }) => ({
        name: s.stat.name,
        value: s.base_stat,
      })
    ),
  };

  return {
    pokemon,
    isLoading: false,
  };
}
