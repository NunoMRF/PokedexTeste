import { Pagination, CircularProgress } from "@mui/material";
import { PokeCard } from "../../components/PokeCard";
import SearchBar from "../../components/SearchBar";
import type { PokemonDetails } from "../../services/pokemonService";

type Props = {
  pokemons: PokemonDetails[];
  total: number;
  page: number;
  itemsPerPage: number;
  search: string;
  isLoading: boolean;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
};

export default function HomePresentation({
  pokemons,
  total,
  page,
  itemsPerPage,
  search,
  isLoading,
  onSearchChange,
  onPageChange,
}: Props) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px 20px",
        background: "linear-gradient(180deg, #0a1a3a 0%, #020b1c 100%)",
        color: "white",
        fontFamily: "'Trebuchet MS', Arial",
      }}
    >
      {/* Título */}
      <h1
        style={{
          textAlign: "center",
          marginBottom: 30,
          letterSpacing: 2,
          fontSize: "2.5rem",
        }}
      >
        Pokédex
      </h1>

      {/* Search */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
        <SearchBar value={search} onChange={onSearchChange} />
      </div>

      {/* Conteúdo */}
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 60 }}>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          {/* Grid de cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "25px",
              maxWidth: "1100px",
              margin: "0 auto 40px",
            }}
          >
            {pokemons.length === 0 && (
              <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                Nenhum Pokémon encontrado.
              </p>
            )}

            {pokemons.map((p) => (
              <PokeCard key={p.name} name={p.name} image={p.image} />
            ))}
          </div>

          {/* Paginação */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.max(1, Math.ceil(total / itemsPerPage))}
              page={page}
              onChange={(_, value) => onPageChange(value)}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#ffffff",
                },
                "& .Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "#ffffff",
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
