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
    <div className="catalogue-toolbar">
      <label className="catalogue-search-field">
        <span className="catalogue-search-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 5 5" />
          </svg>
        </span>
        <input
          className="catalogue-search"
          type="search"
          placeholder="Rechercher un modèle, une marque..."
          aria-label="Rechercher dans le catalogue"
          value={q}
          onChange={(event) => onQ(event.target.value)}
        />
      </label>
      <select
        className="catalogue-search catalogue-category"
        value={categorie}
        onChange={(event) => onCategorie(event.target.value)}
        aria-label="Filtrer par catégorie"
      >
        <option value="">Toutes les catégories</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      {(q || categorie) && (
        <button
          className="search-reset"
          type="button"
          onClick={() => { onQ(""); onCategorie(""); }}
        >
          Effacer
        </button>
      )}
    </div>
  );
}