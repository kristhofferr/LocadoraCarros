import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MapaVeiculo from "../../components/Mapa/MapaVeiculo";
import "../../styles/Localizar.css";

export default function LocalizarVeiculo() {

  // Obtém ID do veículo pela URL
  const { id } = useParams();

  // Guarda os dados do veículo
  const [veiculo, setVeiculo] = useState(null);

  // Carrega dados do veículo
  useEffect(() => {
    fetch(`http://localhost:8080/veiculos/${id}`)
      .then(res => res.json())
      .then(data => setVeiculo(data))
      .catch(() => alert("Erro ao carregar dados do veículo"));
  }, [id]);

  // Enquanto os dados ainda não foram carregados
  if (!veiculo) return <p>Carregando...</p>;

  return (
    <div className="page-container">

      <div className="card-box">
        <h1>Localizar Veículo</h1>

        {/* Dados básicos do veículo */}
        <p><b>Modelo:</b> {veiculo.modelo}</p>
        <p><b>Placa:</b> {veiculo.placa}</p>

        {/* Se tiver coordenadas, mostra o mapa */}
        {veiculo.latitude && veiculo.longitude ? (
          <div className="map-box">
            <MapaVeiculo 
              latitude={veiculo.latitude} 
              longitude={veiculo.longitude} 
            />
          </div>
        ) : (
          <p className="warning">
            Este veículo não possui localização cadastrada.
          </p>
        )}
      </div>

    </div>
  );
}
