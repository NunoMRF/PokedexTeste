import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import PokemonDetailsContainer from "./pages/PokemonDetails/PokemonDetailsContainer";

export function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b1d3a",
        color: "white",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Navegação */}
      <nav
        style={{
          display: "flex",
          gap: "16px",
          padding: "16px 24px",
          backgroundColor: "#102a56",
          boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
        }}
      >
        <NavLink
          to="/"
          style={({ isActive }) => ({
            textDecoration: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            backgroundColor: isActive ? "#1e90ff" : "#163b77",
            color: "white",
            fontWeight: 600,
            transition: "all 0.2s ease",
          })}
        >
          Home
        </NavLink>

        <NavLink
          to="/favoritos"
          style={({ isActive }) => ({
            textDecoration: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            backgroundColor: isActive ? "#ff4757" : "#163b77",
            color: "white",
            fontWeight: 600,
            transition: "all 0.2s ease",
          })}
        >
          Favoritos
        </NavLink>
      </nav>

      {/* Conteúdo */}
      <div style={{ padding: "24px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/pokemon/:name" element={<PokemonDetailsContainer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
