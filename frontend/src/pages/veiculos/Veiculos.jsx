import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Table from "../../components/Table";
import Button from "../../components/Button";

// Função que capitaliza nome e modelo (opcional)
function capitalizar(texto) {
  if (!texto) return "";
  return texto
    .toLowerCase()
    .replace(/(^\w)|(\s+\w)/g, letra => letra.toUpperCase());
}

// Tela de listagem dos veículos
export default function Veiculos() {

  const navigate = useNavigate();

  // Lista dos veículos
  const [veiculos, setVeiculos] = useState([]);

  // Armazena erros
  const [erro, setErro] = useState(null);

  // Campo de filtro de marca
  const [filtroMarca, setFiltroMarca] = useState("");

  // Carrega veículos ao abrir a página
  useEffect(() => {
    fetch("http://localhost:8080/veiculos")
      .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar veículos");
        return response.json();
      })
      .then(data => setVeiculos(data))
      .catch(err => setErro(err.message));
  }, []);

  // Faz a busca por marca
  const buscarPorMarca = () => {

    // Caso o usuário apague o filtro, volta a lista completa
    if (filtroMarca.trim() === "") {
      fetch("http://localhost:8080/veiculos")
        .then(r => r.json())
        .then(data => setVeiculos(data));
      return;
    }

    // Busca no backend
    fetch(`http://localhost:8080/veiculos/marca/${filtroMarca}`)
      .then(response => {
        if (!response.ok) throw new Error("Nenhum veículo encontrado");
        return response.json();
      })
      .then(data => setVeiculos(data))
      .catch(() => alert("Nenhum veículo dessa marca encontrado."));
  };

  // Excluir veículo
  const deletarVeiculo = (id) => {
    if (!window.confirm("Deseja realmente excluir este veículo?")) return;

    fetch(`http://localhost:8080/veiculos/${id}`, { method: "DELETE" })
      .then(response => {
        if (!response.ok) throw new Error("Erro ao excluir veículo");
        setVeiculos(veiculos.filter(v => v.id !== id));
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="page-container">

      {/* Título e botão alinhados */}
      <div className="page-header">
        <h1>Lista de Veículos</h1>

        <Button
          color="green"
          onClick={() => navigate("/veiculos/cadastrar")}
        >
          Cadastrar Veículo
        </Button>
      </div>

      {/* Campo de busca */}
      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Buscar por marca..."
          value={filtroMarca}
          onChange={(e) => setFiltroMarca(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <Button
          color="blue"
          onClick={buscarPorMarca}
          style={{
            marginLeft: "10px",
            padding: "6px 14px",
            fontSize: "14px"
          }}
        >
          Buscar
        </Button>
      </div>

      {/* Mensagem de erro, se existir */}
      {erro && <p className="erro">{erro}</p>}

      {/* Tabela de veículos */}
      <Table
        headers={[
          "ID",
          "Marca",
          "Modelo",
          "Ano",
          "Placa",
          "Valor Diária",
          "Disponível",
          "Localização",
          "Ações"
        ]}
      >

        {veiculos.map(v => (
          <tr key={v.id}>

            <td>{v.id}</td>

            {/* Exibe marca e modelo exatamente como armazenados */}
            <td>{v.marca}</td>
            <td>{v.modelo}</td>

            <td>{v.ano}</td>
            <td>{v.placa}</td>

            <td>R$ {v.valorDiaria.toFixed(2)}</td>

            {/* Disponibilidade com cor */}
            <td className={v.disponivel ? "status-yes" : "status-no"}>
              {v.disponivel ? "Sim" : "Não"}
            </td>

            {/* Exibe latitude e longitude ou traço */}
            <td>
              {v.latitude && v.longitude
                ? `${v.latitude}, ${v.longitude}`
                : "—"}
            </td>

            {/* Ações */}
            <td className="acoes">

              <Button color="blue" onClick={() => navigate(`/veiculos/editar/${v.id}`)}>
                Editar
              </Button>

              <Button color="orange" onClick={() => navigate(`/veiculos/localizacao/${v.id}`)}>
                Atualizar Localização
              </Button>

              <Button color="red" onClick={() => deletarVeiculo(v.id)}>
                Excluir
              </Button>

              <Button color="blue" onClick={() => navigate(`/veiculos/localizar/${v.id}`)}>
                Localizar
              </Button>

            </td>
          </tr>
        ))}

      </Table>
    </div>
  );
}
