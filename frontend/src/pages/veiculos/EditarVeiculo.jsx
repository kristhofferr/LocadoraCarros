import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Form.css";

export default function EditarVeiculo() {

  // Obtém o ID do veículo pela URL
  const { id } = useParams();

  // Usado para retornar para outra rota após atualizar
  const navigate = useNavigate();

  // Estados com os campos do formulário
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [placa, setPlaca] = useState("");
  const [valorDiaria, setValorDiaria] = useState("");

  // Mensagem exibida dentro da tela
  const [mensagem, setMensagem] = useState("");

  // Carrega os dados do veículo ao abrir a página
  useEffect(() => {
    fetch(`http://localhost:8080/veiculos/${id}`)
      .then(res => res.json())
      .then(v => {
        // Preenche os campos com os dados do veículo
        setMarca(v.marca);
        setModelo(v.modelo);
        setAno(v.ano);
        setPlaca(v.placa);
        setValorDiaria(v.valorDiaria);
      })
      .catch(() => {
        setMensagem("Erro ao carregar dados do veículo.");
      });
  }, [id]);

  // Envia as alterações
  const atualizar = (e) => {
    e.preventDefault();

    // Validações básicas
    if (!marca.trim() || !modelo.trim() || !ano || !placa.trim() || !valorDiaria) {
      setMensagem("Preencha todos os campos obrigatórios.");
      return;
    }

    // Ano precisa ser válido
    if (ano < 1900 || ano > new Date().getFullYear()) {
      setMensagem("Ano inválido.");
      return;
    }

    // Valor da diária precisa ser maior que zero
    if (valorDiaria <= 0) {
      setMensagem("O valor da diária deve ser maior que zero.");
      return;
    }

    // Verificação da placa (padrão Mercosul)
    const placaRegex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;
    if (!placaRegex.test(placa)) {
      setMensagem("Placa inválida. Use o formato ABC1D23.");
      return;
    }

    // Objeto com os dados atualizados
    const veiculoAtualizado = {
      marca,
      modelo,
      ano,
      placa,
      valorDiaria,
      disponivel: true
    };

    fetch(`http://localhost:8080/veiculos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(veiculoAtualizado),
    })
      .then(() => {
        // Exibe mensagem de sucesso
        setMensagem("Veículo atualizado com sucesso.");

        // Retorna para a lista depois de um tempo
        setTimeout(() => navigate("/veiculos"), 1500);
      })
      .catch(() => {
        setMensagem("Erro ao atualizar veículo.");
      });
  };

  return (
    <div className="form-card">

      <h1 className="form-title">Editar Veículo</h1>

      {/* Exibe a mensagem de sucesso ou erro */}
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

      <form onSubmit={atualizar}>

        {/* Campo marca */}
        <div className="form-group">
          <label className="form-label">Marca</label>
          <input
            className="form-input"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
          />
        </div>

        {/* Campo modelo */}
        <div className="form-group">
          <label className="form-label">Modelo</label>
          <input
            className="form-input"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
          />
        </div>

        {/* Campo ano */}
        <div className="form-group">
          <label className="form-label">Ano</label>
          <input
            className="form-input"
            type="number"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            required
          />
        </div>

        {/* Campo placa */}
        <div className="form-group">
          <label className="form-label">Placa</label>
          <input
            className="form-input"
            maxLength={7}
            value={placa}
            onChange={(e) => setPlaca(e.target.value.toUpperCase())}
            required
          />
        </div>

        {/* Campo valor da diária */}
        <div className="form-group">
          <label className="form-label">Valor da Diária</label>
          <input
            className="form-input"
            type="number"
            value={valorDiaria}
            onChange={(e) => setValorDiaria(e.target.value)}
            required
          />
        </div>

        {/* Botões */}
        <div className="form-buttons">
          <button type="submit">Atualizar</button>
          <button type="button" onClick={() => navigate("/veiculos")}>Voltar</button>
        </div>

      </form>
    </div>
  );
}
