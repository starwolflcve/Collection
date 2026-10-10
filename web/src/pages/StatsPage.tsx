import { useEffect, useState } from "react";
import type { Stats } from "../../types/api";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import { httpClient } from "../services/httpClient";

const statuts: { cle: keyof Stats["par_statut"]; libelle: string }[] = [
  { cle: "a_decouvrir", libelle: "À découvrir" },
  { cle: "en_cours", libelle: "En cours" },
  { cle: "termine", libelle: "Terminés" },
];

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    setIsLoading(true);
    setError(null);
    httpClient.get<Stats>("/me/stats")
      .then((result) => {
        if (active) setStats(result);
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Impossible de charger les statistiques.");
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [reloadKey]);

  return (
    <section className="stats-page">
      <header className="collection-heading">
        <div>
          <p className="collection-eyebrow">Votre garage en chiffres</p>
          <h1 className="catalogue-title">Statistiques</h1>
        </div>
      </header>

      {isLoading && <p className="catalogue-state" role="status">Chargement des statistiques...</p>}
      {!isLoading && error && (
        <div>
          <ErrorState message={error} />
          <button className="page-btn" type="button" onClick={() => setReloadKey((key) => key + 1)}>
            Réessayer
          </button>
        </div>
      )}
      {!isLoading && !error && stats && stats.total === 0 && (
        <EmptyState message="Aucun véhicule dans votre collection pour le moment." />
      )}
      {!isLoading && !error && stats && stats.total > 0 && (
        <div className="stats-grid">
          <article className="stats-card">
            <h2>Total</h2>
            <p className="stats-value">{stats.total}</p>
            <p>véhicule{stats.total > 1 ? "s" : ""} dans votre collection</p>
          </article>
          <article className="stats-card">
            <h2>Note moyenne</h2>
            <p className="stats-value">{stats.note_moyenne.toFixed(1)}<span> / 5</span></p>
          </article>
          <article className="stats-card stats-status-card">
            <h2>Répartition par statut</h2>
            <ul>
              {statuts.map(({ cle, libelle }) => (
                <li key={cle}>
                  <span>{libelle}</span>
                  <strong>{stats.par_statut[cle]}</strong>
                </li>
              ))}
            </ul>
          </article>
        </div>
      )}
    </section>
  );
}