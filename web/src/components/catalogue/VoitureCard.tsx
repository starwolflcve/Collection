import type { Item } from '../../types/api';

interface VoitureCardProps {
  item: Item;
  onOpenDetails: (item: Item) => void;
  onAddToCollection: (item: Item) => void;
  isInCollection: boolean;
  isAdding: boolean;
}

export default function VoitureCard({ item, onOpenDetails, onAddToCollection, isInCollection, isAdding }: VoitureCardProps) {
  return (
    <article className="car-card">
      <div className="car-image-wrap">
        <img 
          src={item.image_url} 
          alt={item.titre} 
          loading="lazy"
        />
      </div>
      
      <div className="car-content">
        <div className="car-meta">
          <span>{item.categorie}</span>
          <span className="car-badge">{item.annee}</span>
        </div>
        
        <div className="car-body">
          <h2>{item.titre}</h2>
          <p>{item.constructeur}</p>
        </div>
        
        <div className="car-actions">
          <button 
            onClick={() => onOpenDetails(item)}
            className="car-link"
          >
            Voir détails <span aria-hidden="true">→</span>
          </button>
          <button
            type="button"
            onClick={() => onAddToCollection(item)}
            className="car-link"
            disabled={isInCollection || isAdding}
          >
            {isInCollection ? "Dans ma collection" : isAdding ? "Ajout..." : "Ajouter à ma collection"}
          </button>
        </div>
      </div>
    </article>
  );
}
