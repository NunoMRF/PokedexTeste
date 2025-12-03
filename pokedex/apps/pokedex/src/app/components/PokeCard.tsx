import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";

type PokeCardProps = {
  name: string;
};

export function PokeCard({ name }: PokeCardProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const isFavorite = favorites.includes(name);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "8px",
        width: "150px",
        textAlign: "center",
        backgroundColor: "white",
      }}
    >
      <h3>{name}</h3>

      <button
        onClick={() =>
          isFavorite
            ? dispatch(removeFavorite(name))
            : dispatch(addFavorite(name))
        }
        style={{
          padding: "5px 10px",
          marginTop: "10px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: isFavorite ? "red" : "green",
          color: "white",
          cursor: "pointer",
        }}
      >
        {isFavorite ? "Remover" : "Favorito"}
      </button>
    </div>
  );
}
