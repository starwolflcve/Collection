interface Props {
  page: number;
  total: number;
  limit: number;
  onChange: (p: number) => void;
}

export function Pagination({ page, total, limit, onChange }: Props) {
  const pages = Math.max(1, Math.ceil(total / limit));
  return (
    <nav className="pagination" aria-label="Pagination">
      <button disabled={page <= 1} onClick={() => onChange(page - 1)}>Précédent</button>
      <span>Page {page} / {pages}</span>
      <button disabled={page >= pages} onClick={() => onChange(page + 1)}>Suivant</button>
    </nav>
  );
}