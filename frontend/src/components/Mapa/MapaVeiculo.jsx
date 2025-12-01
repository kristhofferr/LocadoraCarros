import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ícone do marcador
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapaVeiculo({ latitude, longitude }) {
  return (
    <div
      style={{
        width: "100%",                 // pega toda a linha
        display: "flex",               // ativa alinhamento do flex
        justifyContent: "center",      // CENTRALIZA HORIZONTALMENTE
        marginTop: "20px",
      }}
    >
      {/* Container REAL do mapa */}
      <div
        style={{
          width: "380px",              // mapa mais quadrado
          height: "380px",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <MapContainer
          center={[latitude, longitude]}
          zoom={16}
          style={{
            width: "100%",
            height: "100%",            // ocupa tudo dentro do quadrado
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={[latitude, longitude]} icon={icon}>
            <Popup>Veículo está aqui</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
