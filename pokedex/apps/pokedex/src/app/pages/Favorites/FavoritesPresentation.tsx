import { PokeCard } from "../../components/PokeCard";
import type { FavoritePokemon } from "../../store/favoritesSlice";

type Props = {
  favorites: FavoritePokemon[];
};

export default function FavoritesPresentation({ favorites }: Props) {
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
        Favoritos
      </h1>

      {/* Conteúdo */}
      {favorites.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: 60 }}>
          Nenhum Pokémon favorito ainda.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "25px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {favorites.map((pokemon) => (
            <PokeCard
              key={pokemon.name}
              name={pokemon.name}
              image={pokemon.image}
            />
          ))}
        </div>
      )}
    </div>
  );
}
