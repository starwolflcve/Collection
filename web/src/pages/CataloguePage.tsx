import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Item } from "../types/api";
import { SearchBar } from "../components/catalogue/SearchBar";
import VoitureCard from "../components/catalogue/VoitureCard";
import VoitureDetail from "../components/catalogue/VoitureDetail";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { Pagination } from "../components/ui/Pagination";
import { useAuth } from "../context/AuthContext";
import { useCollection } from "../context/CollectionContext";
import { useAsync } from "../hooks/useAsync";
import { useDebounce } from "../hooks/useDebounce";
import { getItems } from "../services/itemsService";

const categories = ["berline", "coupe", "sportive", "suv", "utilitaire"];
const pageSize = 12;

export default function CataloguePage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { entries, isLoading: collectionLoading, addEntry } = useCollection();
  const [itemSelectionne, setItemSelectionne] = useState<Item | null>(null);
  const [itemEnAjout, setItemEnAjout] = useState<number | null>(null);
  const [erreurAjout, setErreurAjout] = useState<string | null>(null);
  const [recherche, setRecherche] = useState("");
  const [categorie, setCategorie] = useState("");
  const [page, setPage] = useState(1);
  const debouncedRecherche = useDebounce(recherche, 400);
  const { data, loading, error, reload } = useAsync(
    () => getItems({
      q: debouncedRecherche.trim().length >= 2 ? debouncedRecherche.trim() : undefined,
      categorie: categorie || undefined,
      page,
      limit: pageSize,
    }),
    [debouncedRecherche, categorie, page],
  );

  const ajouterALaCollection = async (item: Item) => {
    if (!token) {
      navigate("/login");
      return;
    }

    setItemEnAjout(item.id);
    setErreurAjout(null);
    try {
      await addEntry(item, { statut: "a_decouvrir", note: null, commentaire: "" });
    } catch (error) {
      setErreurAjout(error instanceof Error ? error.message : "Impossible d'ajouter ce véhicule.");
    } finally {
      setItemEnAjout(null);
    }
  };

  return (
    <div className="catalogue-page">
      <div className="catalogue-content">
        <h1 className="catalogue-title">Le Registre des Légendes</h1>
        <p className="catalogue-subtitle">Explorez, gérez et complétez votre catalogue de joyaux de l'histoire automobile.</p>
        <SearchBar
          q={recherche}
          categorie={categorie}
          categories={categories}
          onQ={(value) => { setRecherche(value); setPage(1); }}
          onCategorie={(value) => { setCategorie(value); setPage(1); }}
        />

        {erreurAjout && <p className="catalogue-state" role="alert">{erreurAjout}</p>}
        {loading && <p className="catalogue-state" role="status">Chargement du catalogue...</p>}
        {!loading && error && <ErrorMessage message={error} onRetry={reload} />}
        {!loading && !error && data && data.results.length === 0 && (
          <EmptyState message="Aucun véhicule trouvé." />
        )}
        {!loading && !error && data && data.results.length > 0 && (
          <>
            <div className="cars-grid">
              {data.results.map((item) => (
                <VoitureCard
                  key={item.id}
                  item={item}
                  onOpenDetails={setItemSelectionne}
                  onAddToCollection={ajouterALaCollection}
                  isInCollection={entries.some((entry) => entry.item.id === item.id)}
                  isAdding={itemEnAjout === item.id || collectionLoading}
                />
              ))}
            </div>
            <Pagination
              page={data.page}
              total={data.total}
              limit={data.limit}
              onChange={setPage}
            />
          </>
        )}
      </div>
      {itemSelectionne && (
        <VoitureDetail item={itemSelectionne} onClose={() => setItemSelectionne(null)} />
      )}
    </div>
  );
}
