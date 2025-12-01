import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Table from "../../components/Table";
import Button from "../../components/Button";

// Função para formatar texto com a primeira letra maiúscula
function capitalizar(texto) {
  if (!texto) return "";
  return texto
    .toLowerCase()
    .replace(/(^\w)|(\s+\w)/g, letra => letra.toUpperCase());
}

export default function Clientes() {

  const navigate = useNavigate();

  // Estado que armazena os clientes recebidos do backend
  const [clientes, setClientes] = useState([]);

  // Armazena mensagens de erro
  const [erro, setErro] = useState(null);

  // Carrega lista de clientes ao abrir a página
  useEffect(() => {
    fetch("http://localhost:8080/clientes")
      .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar clientes");
        return response.json();
      })
      .then(data => setClientes(data))
      .catch(err => setErro(err.message));
  }, []);

  // Remove cliente por ID
  const deletarCliente = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este cliente?")) return;

    fetch(`http://localhost:8080/clientes/${id}`, { method: "DELETE" })
      .then(response => {
        if (!response.ok) throw new Error("Erro ao excluir cliente");
        setClientes(clientes.filter(c => c.id !== id));
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="page-container">

      {/* Cabeçalho contendo título e botão alinhados */}
      <div className="page-header">
        <h1>Lista de Clientes</h1>

        <Button
          color="green"
          onClick={() => navigate("/clientes/cadastrar")}
        >
          Cadastrar Cliente
        </Button>
      </div>

      {/* Exibe mensagem de erro, caso exista */}
      {erro && <p className="erro">{erro}</p>}

      {/* Renderiza tabela de dados */}
      <Table
        headers={[
          "ID",
          "Nome",
          "CPF",
          "Telefone",
          "Ações"
        ]}
      >
        {clientes.map(cliente => (
          <tr key={cliente.id}>
            <td>{cliente.id}</td>
            <td>{cliente.nome}</td>
            <td>{cliente.cpf}</td>
            <td>{cliente.telefone}</td>

            {/* Botões de ação */}
            <td className="acoes">
              <Button 
                color="blue" 
                onClick={() => navigate(`/clientes/editar/${cliente.id}`)}
              >
                Editar
              </Button>

              <Button 
                color="red" 
                onClick={() => deletarCliente(cliente.id)}
              >
                Excluir
              </Button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
