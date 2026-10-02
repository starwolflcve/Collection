import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Item, Statut } from '../../../types/api';
import { useCollection } from '../../context/CollectionContext';

interface VoitureDetailProps {
  item: Item;
  onClose: () => void;
}

export default function VoitureDetail({ item, onClose }: VoitureDetailProps) {
  const { addEntry } = useCollection();
  const [statut, setStatut] = useState<Statut>("en_cours");
  const [note, setNote] = useState<number>(0);
  const [commentaire, setCommentaire] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAjout = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await addEntry(item, { statut, note: note || null, commentaire });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'ajout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 1000,
      display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '900px',
        maxHeight: '90vh', overflowY: 'auto', position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '15px', right: '15px', background: 'white', border: 'none',
          borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontWeight: 'bold'
        }}>✕</button>

        {/* En-tête Image */}
        <div style={{ width: '100%', height: '300px', backgroundColor: '#1A1A1A' }}>
          <img src={item.image_url} alt={item.titre} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '30px', gap: '30px' }}>
          {/* Colonne Gauche : Infos du véhicule */}
          <div style={{ flex: '1 1 400px' }}>
            <span style={{ backgroundColor: '#B89855', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>{item.categorie}</span>
            <span style={{ color: '#666', marginLeft: '10px', fontSize: '0.9rem' }}>Année {item.annee}</span>
            
            <h2 className="serif-title" style={{ fontSize: '2rem', margin: '15px 0' }}>{item.titre}</h2>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '25px', fontSize: '0.95rem' }}>{item.description}</p>
            
            <table style={{ width: '100%', fontSize: '0.9rem', borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  ['Constructeur :', item.constructeur],
                  ['Motorisation :', item.motorisation],
                  ['Puissance :', item.puissance],
                  ['Pays d\'origine :', item.pays]
                ].map(([label, val], idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #E5E5E5' }}>
                    <td style={{ padding: '12px 0', color: '#666' }}>{label}</td>
                    <td style={{ padding: '12px 0', fontWeight: 'bold', textAlign: 'right' }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Colonne Droite : Formulaire d'ajout */}
          <div style={{ flex: '1 1 300px', backgroundColor: '#Faf7f2', padding: '25px', borderRadius: '8px' }}>
            <h3 className="serif-title" style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Ajouter à ma collection</h3>
            {error && <div style={{ color: 'red', marginBottom: '10px', fontSize: '0.85rem' }}>{error}</div>}
            
            <form onSubmit={handleAjout}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#666', marginBottom: '5px' }}>STATUT</label>
                <select 
                  value={statut} onChange={(e) => setStatut(e.target.value as Statut)}
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #CCC' }}
                >
                  <option value="a_decouvrir">À découvrir</option>
                  <option value="en_cours">En cours de restauration</option>
                  <option value="termine">Terminé</option>
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#666', marginBottom: '5px' }}>NOTE PERSONNELLE</label>
                <div style={{ color: '#B89855', fontSize: '1.5rem', cursor: 'pointer' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} type="button" aria-label={`${star} sur 5`} onClick={() => setNote(star)} style={{ color: 'inherit', border: 0, padding: 0, background: 'none', font: 'inherit', cursor: 'pointer' }}>
                      {star <= note ? '★' : '☆'}
                    </button>
                  ))}
                  <span style={{ color: '#666', fontSize: '0.8rem', marginLeft: '10px' }}>({note}/5)</span>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#666', marginBottom: '5px' }}>COMMENTAIRES / NOTES</label>
                <textarea 
                  value={commentaire} onChange={(e) => setCommentaire(e.target.value)}
                  rows={4} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #CCC', resize: 'none' }}
                  placeholder="Ex: Remplacement des joints moteur à prévoir..."
                />
              </div>

              <button type="submit" className="btn-primaire" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Validation...' : 'Valider l\'ajout'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
