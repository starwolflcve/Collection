interface SearchBarProps {
  q: string;
  categorie: string;
  categories: string[];
  onQ: (value: string) => void;
  onCategorie: (value: string) => void;
}

export function SearchBar({
  q,
  categorie,
  categories,
  onQ,
  onCategorie,
}: SearchBarProps) {
  return (
    <div className="toolbar">
      <input
        type="search"
        placeholder="Rechercher un véhicule..."
        value={q}
        onChange={(event) => onQ(event.target.value)}
      />
      <select
        value={categorie}
        onChange={(event) => onCategorie(event.target.value)}
        aria-label="Filtrer par catégorie"
      >
        <option value="">Toutes les catégories</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
}