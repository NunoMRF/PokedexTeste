import axios from "axios";
export interface PokemonAPI {
  name: string;
  url: string;
}

export async function fetchPokemons(): Promise<PokemonAPI[]> {
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
  return response.data.results;
}

