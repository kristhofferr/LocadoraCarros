import { useEffect, useState } from "react";
import Table from "../../components/Table";

// Tela que exibe o ranking dos veículos mais alugados
export default function RankingVeiculos() {

  // Lista retornada do backend
  const [ranking, setRanking] = useState([]);

  // Guarda erros, caso ocorram durante o carregamento
  const [erro, setErro] = useState(null);

  // Carrega o ranking quando a página é aberta
  useEffect(() => {
    fetch("http://localhost:8080/veiculos/ranking")
      .then(res => res.json())
      .then(data => setRanking(data))
      .catch(err => setErro(err.message));
  }, []);

  return (
    <div style={{ padding: "20px" }}>

      {/* Exibe mensagem caso ocorra erro */}
      {erro && <p style={{ color: "red" }}>Erro: {erro}</p>}

      <h1>Ranking Veículos</h1>

      {/* Tabela que exibe os veículos mais alugados */}
      <Table headers={["ID", "Marca", "Modelo", "Total de Locações"]}>
        {ranking.map(r => (
          <tr key={r.veiculoId}>
            <td>{r.veiculoId}</td>
            <td>{r.marca}</td>
            <td>{r.modelo}</td>
            <td>{r.totalLocacoes}</td>
          </tr>
        ))}
      </Table>

    </div>
  );
}
