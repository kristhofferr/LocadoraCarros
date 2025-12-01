import "../styles/Table.css";
// Importa o CSS da tabela

export default function Table({ headers, children }) {
  // headers = lista com nomes das colunas
  // children = conteúdo das linhas (tr / td)

  return (
    <div className="table-wrapper">
      {/* Wrapper para permitir scroll horizontal (responsividade) */}

      <table className="table-default">
        {/* tabela com estilo padrão */}

        <thead>
          <tr>
            {headers.map((h, index) => (
              <th key={index}>{h}</th>   // cria colunas dinamicamente
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
        {/* As linhas são criadas dentro do componente pai */}
      </table>
    </div>
  );
}
