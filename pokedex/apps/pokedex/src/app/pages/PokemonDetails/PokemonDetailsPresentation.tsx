import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toggleFavorite } from "../../store/favoritesSlice";
import type { PokemonDetailsData } from "../../hooks/usePokemonDetails";

type Props = {
  pokemon: PokemonDetailsData;
  isLoading: boolean;
};

const typeColors: Record<string, string> = {
  grass: "#66bb6a",
  poison: "#ab47bc",
  fire: "#ef5350",
  water: "#42a5f5",
  electric: "#fdd835",
  bug: "#9ccc65",
  normal: "#bdbdbd",
  ground: "#d4a373",
  fairy: "#f48fb1",
  fighting: "#e57373",
  psychic: "#ba68c8",
  rock: "#a1887f",
  ghost: "#7e57c2",
  ice: "#4dd0e1",
  dragon: "#5c6bc0",
  steel: "#90a4ae",
  dark: "#616161",
  flying: "#81d4fa",
};

export default function PokemonDetailsPresentation({
  pokemon,
  isLoading,
}: Props) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const isFavorite = favorites.some((p) => p.name === pokemon.name);

  function handleToggleFavorite() {
    dispatch(
      toggleFavorite({
        name: pokemon.name,
        image: pokemon.image,
      })
    );
  }

  if (isLoading) {
    return <p style={{ color: "white" }}>A carregar...</p>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0b1c2d, #071422)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Trebuchet MS', sans-serif",
        padding: 20,
      }}
    >
      <div
        style={{
          backgroundColor: "#f5f7fa",
          borderRadius: 18,
          padding: 30,
          width: 380,
          boxShadow: "0 12px 35px rgba(0,0,0,0.45)",
        }}
      >
        {/* Nome + Favorito */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <h1
            style={{
              textTransform: "capitalize",
              margin: 0,
              fontSize: 26,
              color: "#102a43",
            }}
          >
            {pokemon.name}
          </h1>

          <IconButton onClick={handleToggleFavorite}>
            {isFavorite ? (
              <FavoriteIcon style={{ color: "#e53935" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </div>

        {/* Imagem */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            style={{ width: 120 }}
          />
        </div>

        {/* Tipos com badges */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 14,
            flexWrap: "wrap",
          }}
        >
          {pokemon.types.map((type) => (
            <span
              key={type}
              style={{
                backgroundColor: typeColors[type] || "#90a4ae",
                color: "white",
                padding: "4px 10px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {type}
            </span>
          ))}
        </div>

        {/* Altura / Peso */}
        <p style={{ margin: "6px 0", color: "#334e68" }}>
          <strong>Altura:</strong> {pokemon.height} |{" "}
          <strong>Peso:</strong> {pokemon.weight}
        </p>

        {/* Stats */}
        <h3 style={{ marginTop: 20, color: "#102a43" }}>Stats</h3>

        {pokemon.stats.map((stat) => (
          <div key={stat.name} style={{ marginBottom: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
                color: "#243b53",
              }}
            >
              <span style={{ textTransform: "capitalize" }}>
                {stat.name.replace("-", " ")}
              </span>
              <span>{stat.value}</span>
            </div>

            <div
              style={{
                height: 8,
                backgroundColor: "#cfd8dc",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${Math.min(stat.value, 100)}%`,
                  backgroundColor: "#1976d2",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
