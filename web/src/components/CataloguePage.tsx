import { useState } from "react";
import { AsyncView } from "../components/ui/AsyncView";
import { Pagination } from "../components/ui/Pagination";
import { ItemCard } from "../components/ItemCard";
import { SearchBar } from "../components/SearchBar";
import { useAsync } from "../hooks/useAsync";
import { useDebounce } from "../hooks/useDebounce";
import { getItems } from "../services/itemsService";

const LIMIT = 12;
// Adaptez la liste à vos catégories (ou dérivez-la des résultats)
const CATEGORIES: string[] = ["SUV", "Berline", "Sportive", "Citadine"];

export function CataloguePage() {
  const [q, setQ] = useState<string>("");
  const [categorie, setCategorie] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const dq = useDebounce(q, 400);

  const { data, loading, error, reload } = useAsync(
    () => getItems({
      q: dq.length >= 2 ? dq : undefined,
      categorie: categorie || undefined,
      page,
      limit: LIMIT,
    }),
    [dq, categorie, page],
  );

  return (
    <section>
      <h1>Catalogue</h1>
      <SearchBar
        q={q} categorie={categorie} categories={CATEGORIES}
        onQ={(v) => { setQ(v); setPage(1); }}
        onCategorie={(v) => { setCategorie(v); setPage(1); }}
      />
      <AsyncView
        data={data} loading={loading} error={error} onRetry={reload}
        isEmpty={(d) => d.results.length === 0}
        emptyMessage="Aucun résultat."
      >
        {(d) => (
          <>
            <ul className="grid">
              {d.results.map((it) => <ItemCard key={it.id} item={it} />)}
            </ul>
            <Pagination page={d.page} total={d.total} limit={d.limit} onChange={setPage} />
          </>
        )}
      </AsyncView>
    </section>
  );
}