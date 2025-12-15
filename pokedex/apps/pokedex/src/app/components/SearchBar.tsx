type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = "Pesquisar Pokémon...",
}: Props) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "10px",
        width: "260px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        marginBottom: "20px",
      }}
    />
  );
}
