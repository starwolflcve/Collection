from datetime import datetime

from pydantic import BaseModel, Field

from models.collection import Statut
from schemas.item import ItemRead


class EntryCreate(BaseModel):
    item_id: int
    statut: Statut
    note: int | None = Field(default=None, ge=1, le=5)
    commentaire: str | None = None


class EntryUpdate(BaseModel):
    statut: Statut | None = None
    note: int | None = Field(default=None, ge=1, le=5)
    commentaire: str | None = None


class EntryRead(BaseModel):
    id: int
    statut: Statut
    note: int | None
    commentaire: str | None
    date_ajout: datetime
    item: ItemRead


class StatsRead(BaseModel):
    total: int
    par_statut: dict[str, int]
    note_moyenne: float