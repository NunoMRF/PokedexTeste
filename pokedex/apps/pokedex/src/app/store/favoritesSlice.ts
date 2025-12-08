import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FavoritePokemon {
  name: string;
  image: string;
}

export interface FavoritesState {
  items: FavoritePokemon[];
}

const saved = JSON.parse(localStorage.getItem("favorites") || "[]");

const initialState: FavoritesState = {
  items: Array.isArray(saved)
    ? saved.filter((p) => p && p.name && p.image)
    : [],
};


const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<FavoritePokemon>) {
      const pokemon = action.payload;
      const exists = state.items.some((p) => p.name === pokemon.name);

      if (exists) {
        state.items = state.items.filter((p) => p.name !== pokemon.name);
      } else {
        state.items.push(pokemon);
      }

      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
