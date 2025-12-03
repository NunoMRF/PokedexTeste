import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { PokeCard } from "../components/PokeCard";

export function Favorites() {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Favoritos</h1>

      {favorites.length === 0 && <p>Nenhum Pokémon favorito ainda.</p>}

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {favorites.map((name) => (
          <PokeCard key={name} name={name} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
