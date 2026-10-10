import { useCollection } from "../context/CollectionContext";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import EntryCard from "../components/collection/EntryCard";

export default function CollectionPage() {
  const { entries, isLoading, error, refresh } = useCollection();

  return (
    <section className="collection-page">
      <header className="collection-heading">
        <div>
          <p className="collection-eyebrow">Registre personnel</p>
          <h1 className="catalogue-title">Ma collection</h1>
        </div>
        {!isLoading && !error && <p className="collection-count">{entries.length} véhicule{entries.length > 1 ? "s" : ""}</p>}
      </header>
      {isLoading && <p className="catalogue-state" role="status">Chargement de votre collection...</p>}
      {!isLoading && error && (
        <ErrorMessage message={error} onRetry={refresh} />
      )}
      {!isLoading && !error && entries.length === 0 && <EmptyState message="Votre collection est vide. Ajoutez un véhicule depuis le catalogue." />}
      {!isLoading && !error && entries.length > 0 && (
        <div className="collection-list">
          {entries.map((entry) => <EntryCard key={entry.id} entry={entry} />)}
        </div>
      )}
    </section>
  );
}