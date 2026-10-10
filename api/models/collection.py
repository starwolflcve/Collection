from datetime import datetime
from enum import Enum

from sqlmodel import SQLModel, Field, UniqueConstraint


class Statut(str, Enum):
    a_decouvrir = "a_decouvrir"
    en_cours = "en_cours"
    termine = "termine"


class EntreeCollection(SQLModel, table=True):
    """Table de la collection personnelle (Entry dans le contrat d'API).

    Fait le lien entre un utilisateur et une voiture de son catalogue,
    avec le statut/note/commentaire propres à cet utilisateur.
    """

    __table_args__ = (
        UniqueConstraint("utilisateur_id", "voiture_id", name="uq_utilisateur_voiture"),
    )

    id: int | None = Field(default=None, primary_key=True)

    utilisateur_id: int = Field(foreign_key="utilisateur.id", index=True)
    voiture_id: int = Field(foreign_key="voiture.id", index=True)

    statut: Statut
    note: int | None = Field(default=None, ge=1, le=5)
    commentaire: str | None = Field(default=None)
    date_ajout: datetime = Field(default_factory=datetime.utcnow)