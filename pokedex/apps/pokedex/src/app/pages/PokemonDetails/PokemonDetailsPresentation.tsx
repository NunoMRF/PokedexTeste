import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toggleFavorite } from "../../store/favoritesSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some((p) => p.name === pokemon.name);

  const [imageIndex, setImageIndex] = useState(0);

  function handleToggleFavorite() {
    dispatch(
      toggleFavorite({
        name: pokemon.name,
        image: pokemon.images[0],
      })
    );
  }

  function prevImage() {
    setImageIndex((i) =>
      i === 0 ? pokemon.images.length - 1 : i - 1
    );
  }

  function nextImage() {
    setImageIndex((i) =>
      i === pokemon.images.length - 1 ? 0 : i + 1
    );
  }

  // navegação entre pokémons
  function goToPokemon(id: number) {
    if (id > 0) {
      navigate(`/pokemon/${id}`);
    }
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
        padding: 20,
        position: "relative",
      }}
    >
      {/* SETA POKÉMON ANTERIOR */}
      <IconButton
        onClick={() => goToPokemon(pokemon.id - 1)}
        style={{
          position: "absolute",
          left: 20,
          color: "white",
        }}
      >
        <ArrowBackIosNewIcon fontSize="large" />
      </IconButton>

      {/* SETA PRÓXIMO POKÉMON */}
      <IconButton
        onClick={() => goToPokemon(pokemon.id + 1)}
        style={{
          position: "absolute",
          right: 20,
          color: "white",
        }}
      >
        <ArrowForwardIosIcon fontSize="large" />
      </IconButton>

      {/* CARD */}
      <div
        style={{
          backgroundColor: "#f5f7fa",
          borderRadius: 18,
          padding: 30,
          width: 400,
          boxShadow: "0 12px 35px rgba(0,0,0,0.45)",
          fontFamily: "'Trebuchet MS', sans-serif",
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
          <h1 style={{ margin: 0, color: "#102a43", textTransform: "capitalize" }}>
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

        {/* CARROSSEL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 6,
          }}
        >
          <IconButton onClick={prevImage}>
            <ArrowBackIosNewIcon />
          </IconButton>

          <img
            src={pokemon.images[imageIndex]}
            alt={pokemon.name}
            style={{ width: 140 }}
          />

          <IconButton onClick={nextImage}>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>

        {/* BOLINHAS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginBottom: 6,
          }}
        >
          {pokemon.images.map((_, i) => (
            <span
              key={i}
              onClick={() => setImageIndex(i)}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: i === imageIndex ? "#1976d2" : "#cfd8dc",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        <p style={{ textAlign: "center", fontSize: 13 }}>
          {imageIndex + 1} / {pokemon.images.length}
        </p>

        {/* Tipos */}
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
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
        <p style={{ color: "#334e68" }}>
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
