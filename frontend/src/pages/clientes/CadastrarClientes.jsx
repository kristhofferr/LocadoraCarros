import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Form.css";

export default function CadastrarCliente() {

  // Campos controlados do formulário
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  // Mensagem exibida na tela (sucesso ou erro)
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  // Função chamada ao enviar o formulário
  const salvar = (e) => {
    e.preventDefault();

    // Validação básica de campos obrigatórios
    if (!nome.trim() || !cpf.trim() || !telefone.trim()) {
      setMensagem("Preencha todos os campos obrigatórios.");
      return;
    }

    // Limpa caracteres não numéricos do CPF
    const cpfNumeros = cpf.replace(/\D/g, "");

    // Valida o formato do CPF (11 dígitos)
    if (!/^\d{11}$/.test(cpfNumeros)) {
      setMensagem("CPF inválido. Digite apenas 11 números.");
      return;
    }

    // Limpa caracteres não numéricos do telefone
    const telNumeros = telefone.replace(/\D/g, "");

    // Valida telefone com 10 ou 11 dígitos
    if (!/^\d{10,11}$/.test(telNumeros)) {
      setMensagem("Telefone inválido. Digite 10 ou 11 números.");
      return;
    }

    // Objeto enviado ao backend
    const novoCliente = {
      nome,
      cpf: cpfNumeros,
      telefone: telNumeros
    };

    // Envia a requisição ao backend
    fetch("http://localhost:8080/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoCliente)
    })
      .then(res => res.json())
      .then(() => {

        // Mensagem de sucesso exibida na interface
        setMensagem("Cliente cadastrado com sucesso.");

        // Limpa os campos após o cadastro
        setNome("");
        setCpf("");
        setTelefone("");

        // Redireciona após pequeno intervalo
        setTimeout(() => navigate("/clientes"), 1500);
      })
      .catch(() => {
        setMensagem("Erro ao cadastrar cliente.");
      });
  };

  return (
    <div className="form-card">

      <h1 className="form-title">Cadastrar Cliente</h1>

      {/* Exibe mensagem de erro ou sucesso */}
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

      {/* Formulário de cadastro */}
      <form onSubmit={salvar}>

        {/* Campo Nome */}
        <div className="form-group">
          <label className="form-label">Nome</label>
          <input
            required
            className="form-input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        {/* Campo CPF */}
        <div className="form-group">
          <label className="form-label">CPF</label>
          <input
            required
            className="form-input"
            value={cpf}
            maxLength={14}
            placeholder="Apenas números"
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>

        {/* Campo Telefone */}
        <div className="form-group">
          <label className="form-label">Telefone</label>
          <input
            required
            className="form-input"
            placeholder="Apenas números"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        {/* Botões de ação */}
        <div className="form-buttons">
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => navigate("/clientes")}>Voltar</button>
        </div>

      </form>
    </div>
  );
}
