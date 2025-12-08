import axios from "axios";

export interface PokemonAPIItem {
  name: string;
  url: string;
}

export interface PokemonData {
  name: string;
  image: string;
}

export async function fetchPokemons(): Promise<PokemonData[]> {
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
  const results: PokemonAPIItem[] = response.data.results;

  // Buscar imagem de cada Pokémon
  const detailed = await Promise.all(
    results.map(async (p: PokemonAPIItem) => {
      const details = await axios.get(p.url);
      return {
        name: p.name,
        image: details.data.sprites.front_default,
      };
    })
  );

  return detailed;
}
