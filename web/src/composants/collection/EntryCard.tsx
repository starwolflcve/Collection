import { useState } from "react";
import type { FormEvent } from "react";
import type { Entry, Statut } from "../../../types/api";
import { useCollection } from "../../context/CollectionContext";

interface EntryCardProps {
	entry: Entry;
}

const labelsStatut: Record<Statut, string> = {
	a_decouvrir: "À découvrir",
	en_cours: "En cours de restauration",
	termine: "Terminé",
};

export default function EntryCard({ entry }: EntryCardProps) {
	const { updateEntry, deleteEntry } = useCollection();
	const [statut, setStatut] = useState(entry.statut);
	const [note, setNote] = useState(entry.note ?? 0);
	const [commentaire, setCommentaire] = useState(entry.commentaire ?? "");
	const [isSaving, setIsSaving] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSaving(true);
		setError(null);
		setMessage(null);
		try {
			await updateEntry(entry.id, { statut, note: note || null, commentaire });
			setMessage("Modifications enregistrées.");
		} catch (updateError) {
			setError(updateError instanceof Error ? updateError.message : "La mise à jour a échoué.");
		} finally {
			setIsSaving(false);
		}
	};

	const handleDelete = async () => {
		setIsDeleting(true);
		setError(null);
		try {
			await deleteEntry(entry.id);
		} catch (deleteError) {
			setError(deleteError instanceof Error ? deleteError.message : "La suppression a échoué.");
			setIsDeleting(false);
		}
	};

	return (
		<article className="entry-card">
			<img className="entry-image" src={entry.item.image_url} alt={entry.item.titre} loading="lazy" />
			<div className="entry-content">
				<div className="entry-title-row">
					<div>
						<p className="entry-meta">{entry.item.categorie} · {entry.item.annee}</p>
						<h2>{entry.item.titre}</h2>
					</div>
					<time dateTime={entry.date_ajout}>{new Date(entry.date_ajout).toLocaleDateString("fr-FR")}</time>
				</div>
				<form onSubmit={handleUpdate} className="entry-form">
					<label>
						Statut
						<select value={statut} onChange={(event) => setStatut(event.target.value as Statut)}>
							{Object.entries(labelsStatut).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
						</select>
					</label>
					<fieldset className="entry-rating">
						<legend>Note personnelle</legend>
						<div aria-label={note ? `${note} sur 5` : "Sans note"}>
							{[1, 2, 3, 4, 5].map((star) => (
								<button key={star} type="button" aria-label={`${star} sur 5`} aria-pressed={note === star} onClick={() => setNote(note === star ? 0 : star)}>
									{star <= note ? "★" : "☆"}
								</button>
							))}
							<button type="button" className="rating-clear" onClick={() => setNote(0)}>Effacer</button>
						</div>
					</fieldset>
					<label className="entry-comment">
						Commentaire
						<textarea rows={3} value={commentaire} onChange={(event) => setCommentaire(event.target.value)} placeholder="Vos notes sur ce véhicule" />
					</label>
					{error && <p className="entry-feedback entry-error" role="alert">{error}</p>}
					{message && <p className="entry-feedback" role="status">{message}</p>}
					<div className="entry-actions">
						<button className="btn-primaire" type="submit" disabled={isSaving || isDeleting}>{isSaving ? "Enregistrement..." : "Enregistrer"}</button>
						<button className="entry-delete" type="button" onClick={handleDelete} disabled={isSaving || isDeleting}>
							{isDeleting ? "Suppression..." : "Supprimer"}
						</button>
					</div>
				</form>
			</div>
		</article>
	);
}
