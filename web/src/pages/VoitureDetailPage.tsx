import { Link, useParams } from 'react-router-dom';
import { voitures } from '../data/voitures';

const imageBaseUrl = 'http://localhost:8000/static/voitures_catalogue';

export default function VoitureDetailPage() {
  const { slug } = useParams();
  const voiture = voitures.find((item) => item.slug === slug);

  if (!voiture) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>Voiture introuvable</h2>
        <Link to="/" style={{ color: '#7a1d2e' }}>Retour au catalogue</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px 60px' }}>
      <div style={{
        background: '#f6f2ec',
        border: '1px solid #e9e1d6',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 12px 28px rgba(15,15,15,0.08)',
      }}>
        <div style={{ position: 'relative' }}>
          <img
            src={`${imageBaseUrl}/${voiture.image}`}
            alt={voiture.nom}
            style={{ width: '100%', display: 'block', maxHeight: 520, objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', bottom: 18, left: 18, background: '#1a1a1a', color: '#fff', borderRadius: 999, padding: '6px 12px', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {voiture.categorie}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.9fr', gap: 28, padding: 32 }}>
          <div>
            <p style={{ color: '#7a1d2e', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 12, marginBottom: 10 }}>
              {voiture.annee}
            </p>
            <h1 style={{ fontSize: '3rem', fontFamily: 'Georgia, serif', marginBottom: 20, lineHeight: 1.1 }}>{voiture.nom}</h1>
            <p style={{ color: '#4d4d4d', lineHeight: 1.7, fontSize: 17 }}>
              {voiture.description}
            </p>

            <table style={{ width: '100%', marginTop: 26, borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e8dfd3' }}>
                  <td style={{ padding: '12px 8px 12px 0', fontWeight: 600, color: '#2f2f2f' }}>Constructeur</td>
                  <td style={{ padding: '12px 0', color: '#4d4d4d' }}>{voiture.marque}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e8dfd3' }}>
                  <td style={{ padding: '12px 8px 12px 0', fontWeight: 600, color: '#2f2f2f' }}>Motorisation</td>
                  <td style={{ padding: '12px 0', color: '#4d4d4d' }}>{voiture.moteur}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e8dfd3' }}>
                  <td style={{ padding: '12px 8px 12px 0', fontWeight: 600, color: '#2f2f2f' }}>Puissance</td>
                  <td style={{ padding: '12px 0', color: '#4d4d4d' }}>{voiture.puissance}</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 8px 12px 0', fontWeight: 600, color: '#2f2f2f' }}>Pays d’origine</td>
                  <td style={{ padding: '12px 0', color: '#4d4d4d' }}>{voiture.pays}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <aside style={{ background: '#f0e9e1', border: '1px solid #e7dacc', borderRadius: 12, padding: 20, height: 'fit-content' }}>
            <h3 style={{ fontSize: 18, marginBottom: 12 }}>Ajouter à ma collection</h3>
            <label style={{ display: 'block', fontSize: 13, color: '#5a5a5a', marginBottom: 8 }}>Statut</label>
            <select style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #dcd0c2', background: '#fff', marginBottom: 18 }} defaultValue={voiture.statut}>
              <option>En cours de restauration</option>
              <option>Très recherchée</option>
              <option>En collection</option>
              <option>À restaurer</option>
            </select>

            <div style={{ margin: '18px 0 10px', color: '#7a1d2e', fontWeight: 700 }}>Note personnelle</div>
            <div style={{ letterSpacing: '0.15em', color: '#d4a94f', fontSize: 18 }}>{'★'.repeat(voiture.note)}{'☆'.repeat(5 - voiture.note)}</div>

            <div style={{ marginTop: 18, color: '#3b3b3b', lineHeight: 1.7 }}>
              <strong>Commentaires / notes</strong>
              <p style={{ marginTop: 8 }}>
                Une voiture d’exception qui mélange élégance, présence visuelle et personnalité. Un modèle phare pour les collectionneurs qui aiment les grands classiques.
              </p>
            </div>

            <button type="button" style={{ marginTop: 22, width: '100%', background: '#7a1d2e', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', fontWeight: 700, cursor: 'pointer' }}>
              Valider aujourd’hui
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
