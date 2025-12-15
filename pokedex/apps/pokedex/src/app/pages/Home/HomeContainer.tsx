import { useState, useEffect } from "react";
import usePokemonList from "../../hooks/usePokemonList";
import HomePresentation from "./HomePresentation";

export default function HomeContainer() {
  const itemsPerPage = 12;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { pokemons, total, isLoading } = usePokemonList({
    page,
    limit: itemsPerPage,
    query: search,
  });

  // Sempre que muda a pesquisa, volta à página 1
  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <HomePresentation
      pokemons={pokemons}
      total={total}
      page={page}
      itemsPerPage={itemsPerPage}
      search={search}
      isLoading={isLoading}
      onSearchChange={setSearch}
      onPageChange={setPage}
    />
  );
}
