import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Form.css";

export default function CadastrarLocacao() {

  // Campos do formulário
  const [clienteId, setClienteId] = useState("");
  const [veiculoId, setVeiculoId] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  // Listas carregadas do backend
  const [clientes, setClientes] = useState([]);
  const [veiculos, setVeiculos] = useState([]);

  // Mensagem exibida ao usuário
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  // Carrega clientes e veículos ao abrir a tela
  useEffect(() => {
    fetch("http://localhost:8080/clientes")
      .then(r => r.json())
      .then(setClientes);

    fetch("http://localhost:8080/veiculos")
      .then(r => r.json())
      .then(setVeiculos);
  }, []);

  // Função que envia os dados ao backend
  const salvar = (e) => {
    e.preventDefault();

    // Validação de campos obrigatórios
    if (!clienteId || !veiculoId || !dataInicio || !dataFim) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    // Validação de datas
    if (new Date(dataInicio) > new Date(dataFim)) {
      setMensagem("A data inicial não pode ser maior que a data final.");
      return;
    }

    const novaLocacao = {
      clienteId,
      veiculoId,
      dataInicio,
      dataFim
    };

    fetch("http://localhost:8080/locacoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaLocacao)
    })
      .then(r => r.json())
      .then(() => {
        setMensagem("Locação registrada com sucesso.");

        // Limpa os campos
        setClienteId("");
        setVeiculoId("");
        setDataInicio("");
        setDataFim("");

        // Redireciona após breve intervalo
        setTimeout(() => navigate("/locacoes"), 1500);
      })
      .catch(() => {
        setMensagem("Erro ao registrar locação.");
      });
  };

  return (
    <div className="form-card">

      <h1 className="form-title">Registrar Locação</h1>

      {/* Exibe mensagens */}
      {mensagem && (
        <div
          style={{
            background: mensagem.includes("sucesso") ? "#d1fae5" : "#fee2e2",
            color: mensagem.includes("sucesso") ? "#065f46" : "#991b1b",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
            textAlign: "center",
            fontWeight: "600"
          }}
        >
          {mensagem}
        </div>
      )}

      {/* Formulário */}
      <form onSubmit={salvar}>

        <div className="form-group">
          <label className="form-label">Cliente</label>
          <select
            required
            className="form-select"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
          >
            <option value="">Selecione</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Veículo</label>
          <select
            required
            className="form-select"
            value={veiculoId}
            onChange={(e) => setVeiculoId(e.target.value)}
          >
            <option value="">Selecione</option>
            {veiculos.map(v => (
              <option key={v.id} value={v.id}>{v.marca} {v.modelo}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Data Início</label>
          <input
            required
            className="form-input"
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Data Fim</label>
          <input
            required
            className="form-input"
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>

        <div className="form-buttons">
          <button type="submit">Registrar</button>
          <button type="button" onClick={() => navigate("/locacoes")}>Voltar</button>
        </div>

      </form>
    </div>
  );
}
