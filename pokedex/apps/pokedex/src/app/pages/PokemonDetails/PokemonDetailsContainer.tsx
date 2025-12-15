import { useParams, Link } from "react-router-dom";
import usePokemonDetails from "../../hooks/usePokemonDetails";
import PokemonDetailsPresentation from "./PokemonDetailsPresentation";

export default function PokemonDetailsContainer() {
  const { name } = useParams<{ name: string }>();

  const { pokemon, isLoading } = usePokemonDetails(name);

  if (!name) {
    return <p>Pokémon inválido.</p>;
  }

  if (isLoading) {
    return <p>A carregar...</p>;
  }

  if (!pokemon) {
    return <p>Pokémon não encontrado.</p>;
  }

  return (
    <>
      {/* Botão Voltar */}
      <Link
        to="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 20,
          padding: "8px 16px",
          backgroundColor: "#1e3a5f",
          color: "white",
          borderRadius: 20,
          textDecoration: "none",
          fontWeight: 600,
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
        }}
      >
        ⬅ Voltar
      </Link>


      <PokemonDetailsPresentation
        pokemon={pokemon}
        isLoading={false}
      />
    </>
  );
}
