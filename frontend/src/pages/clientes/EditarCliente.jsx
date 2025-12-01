import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Form.css";

export default function EditarCliente() {

  // Obtém ID da URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Campos controlados
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  // Mensagem de erro ou sucesso mostrada na tela
  const [mensagem, setMensagem] = useState("");

  // Carrega os dados do cliente selecionado
  useEffect(() => {
    fetch(`http://localhost:8080/clientes/${id}`)
      .then(res => res.json())
      .then(c => {
        setNome(c.nome);
        setCpf(c.cpf);
        setTelefone(c.telefone);
      })
      .catch(() => {
        setMensagem("Erro ao carregar cliente.");
      });
  }, [id]);

  // Atualiza o cliente no backend
  const atualizar = (e) => {
    e.preventDefault();

    // Valida campos obrigatórios
    if (!nome.trim() || !cpf.trim() || !telefone.trim()) {
      setMensagem("Preencha todos os campos obrigatórios.");
      return;
    }

    // Remove caracteres não numéricos do CPF
    const cpfNumeros = cpf.replace(/\D/g, "");
    if (!/^\d{11}$/.test(cpfNumeros)) {
      setMensagem("CPF inválido. Use apenas números.");
      return;
    }

    // Valida telefone
    const telNumeros = telefone.replace(/\D/g, "");
    if (!/^\d{10,11}$/.test(telNumeros)) {
      setMensagem("Telefone inválido.");
      return;
    }

    const clienteAtualizado = {
      nome,
      cpf: cpfNumeros,
      telefone: telNumeros
    };

    fetch(`http://localhost:8080/clientes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clienteAtualizado)
    })
      .then(() => {
        setMensagem("Cliente atualizado com sucesso.");

        // Redireciona após um pequeno intervalo
        setTimeout(() => navigate("/clientes"), 1500);
      })
      .catch(() => {
        setMensagem("Erro ao atualizar cliente.");
      });
  };

  return (
    <div className="form-card">

      <h1 className="form-title">Editar Cliente</h1>

      {/* Exibe mensagens de validação */}
      {mensagem && (
        <div
          style={{
            background: mensagem.includes("sucesso") ? "#d1fae5" : "#fee2e2",
            color: mensagem.includes("sucesso") ? "#065f46" : "#991b1b",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
            fontWeight: "600",
            textAlign: "center"
          }}
        >
          {mensagem}
        </div>
      )}

      {/* Formulário de edição */}
      <form onSubmit={atualizar}>

        <div className="form-group">
          <label className="form-label">Nome</label>
          <input
            className="form-input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">CPF</label>
          <input
            className="form-input"
            value={cpf}
            maxLength={14}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Apenas números"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Telefone</label>
          <input
            className="form-input"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Apenas números"
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit">Atualizar</button>
          <button type="button" onClick={() => navigate("/clientes")}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}
