from dataclasses import dataclass

from fastapi import Query


@dataclass
class ParametresCatalogue:
    q: str | None
    categorie: str | None
    page: int
    limit: int


def parametres_catalogue(
    q: str | None = Query(default=None, min_length=2),
    categorie: str | None = Query(default=None),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=12, ge=1, le=50),
) -> ParametresCatalogue:
    return ParametresCatalogue(q=q, categorie=categorie, page=page, limit=limit)