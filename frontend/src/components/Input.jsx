export default function Input({ label, type = "text", value, onChange, placeholder }) {
  // Componente INPUT reaproveitável com label
  // label → texto acima do input
  // type → tipo de campo (text, number, date...)
  // value → conteúdo do input
  // onChange → evento executado ao digitar
  // placeholder → texto dentro do input

  // Estilo do container do input + label
  const container = {
    marginBottom: "12px",
    display: "flex",
    flexDirection: "column" // label em cima, input em baixo
  };

  // Estilo do campo de input
  const inputStyle = {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc" // borda cinza padrão
  };

  return (
    <div style={container}>
      <label>{label}</label> {/* rótulo do campo */}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={inputStyle}
      />
    </div>
  );
}
