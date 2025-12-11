import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

export function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* Navegação */}
      <nav style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/favoritos">Favoritos</Link>
      </nav>

      {/* Definição das rotas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
