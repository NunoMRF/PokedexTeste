import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleFavorite } from "../store/favoritesSlice";

type PokeCardProps = {
  name: string;
  image: string;
};

export function PokeCard({ name, image }: PokeCardProps) {
  const dispatch = useDispatch();

  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some((p) => p.name === name);

  function handleToggle() {
    dispatch(toggleFavorite({ name, image }));
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "8px",
        width: "150px",
        textAlign: "center",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <IconButton
        onClick={handleToggle}
        style={{ position: "absolute", top: 5, right: 5 }}
      >
        {isFavorite ? (
          <FavoriteIcon style={{ color: "red" }} />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>

      <img
        src={image}
        alt={name}
        style={{ width: "100px", height: "100px" }}
      />

      <h3 style={{ textTransform: "capitalize" }}>{name}</h3>
    </div>
  );
}
