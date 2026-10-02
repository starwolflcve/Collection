from datetime import datetime, timezone
from enum import Enum

from sqlalchemy import UniqueConstraint
from sqlmodel import Field, SQLModel


class Statut(str, Enum):
	A_DECOUVRIR = "a_decouvrir"
	EN_COURS = "en_cours"
	TERMINE = "termine"


class EntreeCollection(SQLModel, table=True):
	__table_args__ = (UniqueConstraint("utilisateur_id", "voiture_id"),)

	id: int | None = Field(default=None, primary_key=True)
	utilisateur_id: int = Field(foreign_key="utilisateur.id", index=True)
	voiture_id: int = Field(foreign_key="voiture.id", index=True)
	statut: Statut = Field(default=Statut.A_DECOUVRIR)
	note: int | None = Field(default=None, ge=1, le=5)
	commentaire: str | None = None
	date_ajout: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
