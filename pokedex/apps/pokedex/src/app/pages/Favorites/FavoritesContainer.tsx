import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import FavoritesPresentation from "./FavoritesPresentation";

export default function FavoritesContainer() {
  const favorites = useSelector(
    (state: RootState) => state.favorites.items
  );

  return <FavoritesPresentation favorites={favorites} />;
}
