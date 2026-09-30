import type { Item } from '../../../types/api';

interface VoitureCardProps {
  item: Item;
  onOpenDetails: (item: Item) => void;
}

export default function VoitureCard({ item, onOpenDetails }: VoitureCardProps) {
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
        </div>
      </div>
    </article>
  );
}
