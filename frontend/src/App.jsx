import { Routes, Route, useLocation } from "react-router-dom";
import Menu from "./components/Menu";

/* Importação das páginas */
import Home from "./pages/Home.jsx";

/* Clientes */
import Clientes from "./pages/clientes/Clientes.jsx";
import CadastrarClientes from "./pages/clientes/CadastrarClientes.jsx";
import EditarCliente from "./pages/clientes/EditarCliente.jsx";

/* Veículos */
import Veiculos from "./pages/veiculos/Veiculos.jsx";
import CadastrarVeiculo from "./pages/veiculos/CadastrarVeiculo.jsx";
import EditarVeiculo from "./pages/veiculos/EditarVeiculo.jsx";
import RankingVeiculos from "./pages/veiculos/RankingVeiculos.jsx";
import UpdateLocalizacao from "./pages/veiculos/UpdateLocalizacao.jsx";
import LocalizarVeiculo from "./pages/veiculos/LocalizarVeiculo.jsx";

/* Locações */
import Locacoes from "./pages/locacoes/Locacoes.jsx";
import CadastrarLocacao from "./pages/locacoes/CadastrarLocacao.jsx";

export default function App() {

  const location = useLocation();

  // Se o usuário estiver na página "/", o menu não aparece
  // Isso deixa a home mais limpa.
  const esconderMenu = location.pathname === "/";

  return (
    <>
      {/* Exibe o menu em todas as páginas, exceto na Home */}
      {!esconderMenu && <Menu />}

      {/* Sistema de Rotas */}
      <Routes>

        {/* Página inicial */}
        <Route path="/" element={<Home />} />

        {/* ------- CLIENTES ------- */}
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/cadastrar" element={<CadastrarClientes />} />
        <Route path="/clientes/editar/:id" element={<EditarCliente />} />

        {/* ------- VEÍCULOS ------- */}
        <Route path="/veiculos" element={<Veiculos />} />
        <Route path="/veiculos/cadastrar" element={<CadastrarVeiculo />} />
        <Route path="/veiculos/editar/:id" element={<EditarVeiculo />} />
        <Route path="/ranking" element={<RankingVeiculos />} />

        {/* Atualização + Localização no mapa */}
        <Route path="/veiculos/localizacao/:id" element={<UpdateLocalizacao />} />
        <Route path="/veiculos/localizar/:id" element={<LocalizarVeiculo />} />

        {/* Locações*/}
        <Route path="/locacoes" element={<Locacoes />} />
        <Route path="/locacoes/cadastrar" element={<CadastrarLocacao />} />

      </Routes>
    </>
  );
}
