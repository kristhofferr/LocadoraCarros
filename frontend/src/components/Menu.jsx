import { Link } from "react-router-dom";
// Importa Link para navegação sem reload do React Router

import "./Menu.css";
// Importa o CSS acima

export default function Menu() {
  return (
    <nav className="menu">
      {/* Cada Link vai para sua rota */}
      <Link to="/">Home</Link>
      <Link to="/clientes">Clientes</Link>
      <Link to="/veiculos">Veículos</Link>
      <Link to="/locacoes">Locações</Link>
      <Link to="/ranking">Ranking</Link>
    </nav>
  );
}
