import { useState } from "react";
import useSWR from "swr";
import { Pagination } from "@mui/material";
import { PokeCard } from "../components/PokeCard";
import { fetchPokemons, PokemonData } from "../services/pokemonService";

export function Home() {
  // Hooks
  const itemsPerPage = 12;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // SWR
  const { data, error } = useSWR<PokemonData[]>("pokemons", fetchPokemons);

  if (error) return <p>Erro ao carregar os Pokémons.</p>;
  if (!data) return <p>A carregar...</p>;

  // Lista de pokemons
  const pokemons = data;

  // Filtrar a pesquisa
  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Paginação
  const startIndex = (page - 1) * itemsPerPage;
  const displayedPokemons = filteredPokemons.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Pokedex</h1>

      {/* Barra de Pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar Pokémon..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{
          padding: "10px",
          width: "200px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "20px",
        }}
      />

      {/* Lista */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        {displayedPokemons.map((p) => (
          <PokeCard key={p.name} name={p.name} image={p.image} />
        ))}
      </div>

      {/* Paginação */}
      <Pagination
        count={Math.ceil(filteredPokemons.length / itemsPerPage)}
        page={page}
        onChange={(_, value) => setPage(value)}
        color="primary"
      />
    </div>
  );
}

export default Home;
