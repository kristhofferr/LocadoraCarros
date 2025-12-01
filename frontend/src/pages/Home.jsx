// Importa o componente Link do React Router
import { Link } from "react-router-dom";

// Importa o CSS específico da Home
import "./Home.css";

// Componente principal da página inicial
export default function Home() {
  return (
    <div className="home-container">
      {/* Título da página */}
      <h1>Bem-vindo à Locadora</h1>
      <p>Escolha uma das opções abaixo:</p>

      {/* Cards que redirecionam para outras páginas */}
      <div className="cards-container">

        {/* Cada card é um Link estilizado */}
        <Link to="/clientes" className="home-card">Clientes</Link>
        <Link to="/veiculos" className="home-card">Veículos</Link>
        <Link to="/locacoes" className="home-card">Locações</Link>

      </div>
    </div>
  );
}
