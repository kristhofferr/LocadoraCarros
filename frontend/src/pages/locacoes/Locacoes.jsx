import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Table from "../../components/Table";
import Button from "../../components/Button";

export default function Locacoes() {

  const navigate = useNavigate();

  // Lista de locações recebidas do backend
  const [locacoes, setLocacoes] = useState([]);

  // Guarda mensagens de erro
  const [erro, setErro] = useState(null);

  // Carrega todas as locações ao abrir a página
  useEffect(() => {
    fetch("http://localhost:8080/locacoes")
      .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar locações");
        return response.json();
      })
      .then(data => setLocacoes(data))
      .catch(err => setErro(err.message));
  }, []);

  // Remove uma locação
  const deletarLocacao = (id) => {
    if (!window.confirm("Deseja realmente excluir esta locação?")) return;

    fetch(`http://localhost:8080/locacoes/${id}`, { method: "DELETE" })
      .then(response => {
        if (!response.ok) throw new Error("Erro ao excluir locação");

        // Remove a locação excluída da lista
        setLocacoes(locacoes.filter(l => l.id !== id));
      })
      .catch(err => alert(err.message));
  };

  // Gera um boleto no backend
  const gerarBoleto = (id) => {
    fetch(`http://localhost:8080/locacoes/${id}/pagamento/boleto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(locAtualizada => {
        // Substitui somente a locação atualizada
        setLocacoes(locacoes.map(l => (l.id === id ? locAtualizada : l)));
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="page-container">

      {/* Cabeçalho com título e botão alinhados */}
      <div className="page-header">
        <h1>Lista de Locações</h1>

        <Button color="green" onClick={() => navigate("/locacoes/cadastrar")}>
          Registrar Locação
        </Button>
      </div>

      {/* Mensagem de erro, caso exista */}
      {erro && <p className="erro">{erro}</p>}

      {/* Tabela com os dados */}
      <Table
        headers={[
          "ID",
          "Cliente",
          "Veículo",
          "Data Início",
          "Data Fim",
          "Valor",
          "Boleto",
          "Ações"
        ]}
      >
        {locacoes.map(l => (
          <tr key={l.id}>

            <td>{l.id}</td>

            {/* Cliente associado */}
            <td>{l.cliente?.nome}</td>

            {/* Veículo formatado */}
            <td>
              {l.veiculo
                ? `${l.veiculo.marca} ${l.veiculo.modelo} (${l.veiculo.placa})`
                : "N/A"}
            </td>

            {/* Datas e valor */}
            <td>{l.dataInicio}</td>
            <td>{l.dataFim}</td>
            <td>R$ {l.valorTotal.toFixed(2)}</td>

            {/* Exibe o boleto, se existir */}
            <td>{l.codigoBoleto ? <span>{l.codigoBoleto}</span> : "—"}</td>

            {/* Botões de ação */}
            <td className="acoes">
              {/* Só exibe se ainda não existe boleto */}
              {!l.codigoBoleto && (
                <Button color="blue" onClick={() => gerarBoleto(l.id)}>
                  Gerar Boleto
                </Button>
              )}

              <Button color="red" onClick={() => deletarLocacao(l.id)}>
                Excluir
              </Button>
            </td>

          </tr>
        ))}
      </Table>
    </div>
  );
}
