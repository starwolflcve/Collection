import { Link } from "react-router-dom";
import type { Item } from "../types/api";

interface Props { item: Item }

export function ItemCard({ item }: Props) {
  return (
    <li className="card item-card">
      <img src={item.image_url} alt={item.titre} loading="lazy" />
      <div>
        <h3><Link to={`/items/${item.id}`}>{item.titre}</Link></h3>
        <p className="muted">{item.categorie} · {item.annee}</p>
      </div>
    </li>
  );
}