interface Props {
  q: string;
  categorie: string;
  categories: string[];
  onQ: (v: string) => void;
  onCategorie: (v: string) => void;
}

export function SearchBar({ q, categorie, categories, onQ, onCategorie }: Props) {
  return (
    <div className="toolbar">
      <input type="search" placeholder="Rechercher…" value={q}
        onChange={(e) => onQ(e.target.value)} />
      <select value={categorie} onChange={(e) => onCategorie(e.target.value)}>
        <option value="">Toutes les catégories</option>
        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
}