import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Form.css";

export default function CadastrarVeiculo() {

  // Campos do formulário
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [placa, setPlaca] = useState("");
  const [valorDiaria, setValorDiaria] = useState("");
  const [endereco, setEndereco] = useState("");

  // Mensagem interna exibida na tela
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  // Faz a busca por latitude e longitude baseado no endereço informado
  async function buscarCoordenadas(endereco) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
      return {
        latitude: Number(data[0].lat),
        longitude: Number(data[0].lon),
      };
    }
    return { latitude: null, longitude: null };
  }

  // Envia os dados ao backend
  const salvar = async (e) => {
    e.preventDefault();

    // Validações obrigatórias
    if (!marca.trim() || !modelo.trim() || !ano || !placa.trim() || !valorDiaria) {
      setMensagem("Preencha todos os campos obrigatórios.");
      return;
    }

    // Validação de ano
    if (ano < 1900 || ano > new Date().getFullYear()) {
      setMensagem("Ano inválido.");
      return;
    }

    // Validação de valor
    if (valorDiaria <= 0) {
      setMensagem("O valor da diária deve ser maior que zero.");
      return;
    }

    // Validação do formato da placa (padrão Mercosul)
    const placaRegex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;
    if (!placaRegex.test(placa)) {
      setMensagem("Placa inválida. Use o formato ABC1D23.");
      return;
    }

    // Coordenadas são opcionais
    let latitude = null;
    let longitude = null;

    if (endereco.trim() !== "") {
      const coords = await buscarCoordenadas(endereco);
      latitude = coords.latitude;
      longitude = coords.longitude;
    }

    // Objetos enviado ao backend
    const novoVeiculo = {
      marca,
      modelo,
      ano,
      placa,
      valorDiaria,
      disponivel: true,
      latitude,
      longitude,
    };

    fetch("http://localhost:8080/veiculos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoVeiculo),
    })
      .then(res => res.json())
      .then(() => {

        // Exibe mensagem de sucesso
        setMensagem("Veículo cadastrado com sucesso.");

        // Limpa formulário
        setMarca("");
        setModelo("");
        setAno("");
        setPlaca("");
        setValorDiaria("");
        setEndereco("");

        // Redireciona após pequeno tempo
        setTimeout(() => navigate("/veiculos"), 1500);
      })
      .catch(() => {
        setMensagem("Erro ao cadastrar veículo.");
      });
  };

  return (
    <div className="form-card">

      <h1 className="form-title">Cadastrar Veículo</h1>

      {/* Mensagem exibida no formulário */}
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

      <form onSubmit={salvar}>

        {/* Demais campos do formulário */}
        <div className="form-group">
          <label className="form-label">Marca</label>
          <input className="form-input" value={marca} onChange={(e) => setMarca(e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label">Modelo</label>
          <input className="form-input" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label">Ano</label>
          <input type="number" className="form-input" value={ano} onChange={(e) => setAno(e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label">Placa</label>
          <input
            className="form-input"
            maxLength={7}
            placeholder="ABC1D23"
            value={placa}
            onChange={(e) => setPlaca(e.target.value.toUpperCase())}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Valor da Diária</label>
          <input type="number" className="form-input" value={valorDiaria} onChange={(e) => setValorDiaria(e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label">Endereço (opcional)</label>
          <input className="form-input" placeholder="Rua, número, cidade..." value={endereco} onChange={(e) => setEndereco(e.target.value)} />
        </div>

        <div className="form-buttons">
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => navigate("/veiculos")}>Voltar</button>
        </div>

      </form>
    </div>
  );
}
