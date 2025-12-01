import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button";

// Tela utilizada para atualizar manualmente latitude e longitude do veículo
export default function UpdateLocalizacao() {

  // Obtém ID do veículo pela rota
  const { id } = useParams();

  // Usado para retornar à lista após salvar
  const navigate = useNavigate();

  // Estados dos campos de entrada
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Envia atualização ao backend
  const atualizar = () => {
    fetch(`http://localhost:8080/veiculos/${id}/localizacao`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },

      // O backend exige número, por isso Number()
      body: JSON.stringify({
        latitude: Number(latitude),
        longitude: Number(longitude)
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao atualizar localização");

        alert("Localização atualizada.");
        navigate("/veiculos");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Atualizar Localização do Veículo #{id}</h1>

      <div className="form-card">

        {/* Campo de latitude */}
        <div className="form-group">
          <label>Latitude:</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>

        {/* Campo de longitude */}
        <div className="form-group">
          <label>Longitude:</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>

        {/* Botões */}
        <Button color="blue" onClick={atualizar}>Salvar</Button>
        <Button color="red" onClick={() => navigate("/veiculos")}>Cancelar</Button>

      </div>
    </div>
  );
}
