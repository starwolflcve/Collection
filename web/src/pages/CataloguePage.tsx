// src/pages/CataloguePage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Item } from "../../types/api";
import { useDebounce } from "../hooks/useDebounce";
<<<<<<< HEAD
import EmptyState from "../components/common/EmptyState";
import VoitureCard from "../components/catalogue/VoitureCard";
import VoitureDetail from "../components/catalogue/VoitureDetail";
=======
import EmptyState from "../composants/common/EmptyState";
import VoitureCard from "../composants/catalogue/VoitureCard";
import VoitureDetail from "../composants/catalogue/VoitureDetail";
import { useAuth } from "../context/AuthContext";
import { useCollection } from "../context/CollectionContext";
>>>>>>> 1c7b3f3 (mise en place collection)
import { voitures } from "../data/voitures";

const voituresCatalogue: Item[] = voitures.map((voiture) => ({
  id: voiture.id,
  titre: voiture.nom,
  image_url: `/voitures_catalogue/${encodeURIComponent(voiture.image)}`,
  categorie: voiture.categorie,
  description: voiture.description,
  annee: voiture.annee,
  constructeur: voiture.marque,
  motorisation: voiture.moteur,
  puissance: voiture.puissance,
  pays: voiture.pays,
}));

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
  const pageSize = 12;
  const rechercheNormalisee = debouncedRecherche.trim().toLocaleLowerCase("fr");
  const voituresFiltrees = voituresCatalogue.filter((voiture) => {
    const correspondRecherche = [voiture.titre, voiture.constructeur, voiture.categorie]
      .some((valeur) => valeur?.toLocaleLowerCase("fr").includes(rechercheNormalisee));
    return correspondRecherche && (!categorie || voiture.categorie === categorie);
  });
  const total = voituresFiltrees.length;
  const nombrePages = Math.max(1, Math.ceil(total / pageSize));
  const items = voituresFiltrees.slice((page - 1) * pageSize, page * pageSize);

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
        
        <div className="catalogue-toolbar">
          <input 
            type="text" 
            placeholder="Rechercher un modèle..." 
            className="catalogue-search"
            value={recherche}
            onChange={(e) => { setRecherche(e.target.value); setPage(1); }}
          />
          <select
            className="catalogue-search catalogue-category"
            value={categorie}
            onChange={(e) => { setCategorie(e.target.value); setPage(1); }}
            aria-label="Filtrer par catégorie"
          >
            <option value="">Toutes les catégories</option>
            {[...new Set(voituresCatalogue.map((voiture) => voiture.categorie))].map((nomCategorie) => (
              <option key={nomCategorie} value={nomCategorie}>{nomCategorie}</option>
            ))}
          </select>
        </div>

        {erreurAjout && <p className="catalogue-state" role="alert">{erreurAjout}</p>}

        {items.length === 0 && <EmptyState message="Aucun véhicule trouvé." />}
        
        {items.length > 0 && (
          <>
            <div className="cars-grid">
              {items.map((item) => (
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
            {/* Composant Pagination à extraire */}
            <div className="catalogue-footer">
              <p>Affichage de {items.length} véhicules sur {total}</p>
              <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="page-btn">Précédent</button>
                <button disabled={page >= nombrePages} onClick={() => setPage(p => p + 1)} className="page-btn">Suivant</button>
              </div>
            </div>
          </>
        )}
      </div>
      {itemSelectionne && (
        <VoitureDetail item={itemSelectionne} onClose={() => setItemSelectionne(null)} />
      )}
    </div>
  );
}
