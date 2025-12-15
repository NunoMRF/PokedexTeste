import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleFavorite } from "../store/favoritesSlice";
import { Link } from "react-router-dom";

type PokeCardProps = {
  name: string;
  image: string;
};

export function PokeCard({ name, image }: PokeCardProps) {
  const dispatch = useDispatch();

  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some((p) => p.name === name);

  function handleToggle(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    dispatch(toggleFavorite({ name, image }));
  }

  return (
    <Link
      to={`/pokemon/${name}`}
      style={{ textDecoration: "none" }}
    >
      <div
        style={{
          width: 160,
          padding: 12,
          borderRadius: 16,
          background: "linear-gradient(180deg, #1e3c72, #2a5298)",
          color: "white",
          textAlign: "center",
          position: "relative",
          cursor: "pointer",
          boxShadow: "0 6px 14px rgba(0,0,0,0.4)",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow =
            "0 12px 22px rgba(0,0,0,0.55)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 6px 14px rgba(0,0,0,0.4)";
        }}
      >
        {/* Favorito */}
        <IconButton
          onClick={handleToggle}
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            backgroundColor: "rgba(255,255,255,0.15)",
          }}
        >
          {isFavorite ? (
            <FavoriteIcon style={{ color: "#ff5252" }} />
          ) : (
            <FavoriteBorderIcon style={{ color: "white" }} />
          )}
        </IconButton>

        {/* Imagem */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: "50%",
            width: 110,
            height: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "12px auto",
          }}
        >
          <img
            src={image}
            alt={name}
            style={{ width: 96, height: 96 }}
          />
        </div>

        {/* Nome */}
        <h3
          style={{
            margin: "8px 0 0",
            textTransform: "capitalize",
            fontSize: 16,
            letterSpacing: 0.5,
          }}
        >
          {name}
        </h3>
      </div>
    </Link>
  );
}
