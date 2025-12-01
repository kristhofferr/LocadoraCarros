// Componente de botão reutilizável em todo o sistema
export default function Button({ children, color = "blue", onClick, className }) {

  // Estilos predefinidos conforme a cor selecionada
  const styles = {
    blue: { background: "var(--primary)", color: "white" },
    red: { background: "var(--danger)", color: "white" },
    green: { background: "var(--success)", color: "white" },
    orange: { background: "var(--warning)", color: "white" }
  };

  return (
    <button
      className={className}   // Permite adicionar classes extras quando necessário
      onClick={onClick}       // Função executada ao clicar no botão
      style={{
        padding: "8px 14px",
        border: "none",
        borderRadius: "var(--radius)",
        cursor: "pointer",
        boxShadow: "var(--shadow)",
        fontWeight: "600",
        width: "auto",         // Tamanho do botão baseado no conteúdo
        ...styles[color]       // Combina o estilo base com a cor selecionada
      }}
    >
      {children}               {/* Texto ou elemento interno do botão */}
    </button>
  );
}
