from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select, func
from sqlmodel.ext.asyncio.session import AsyncSession

from db.session import get_session
from dependencies.pagination import ParametresCatalogue, parametres_catalogue
from models.item import Voiture
from schemas.item import ItemRead, ItemListe

router = APIRouter(prefix="/items", tags=["catalogue"])


@router.get(
    "",
    response_model=ItemListe,
    summary="Rechercher et lister les voitures du catalogue",
)
async def lister_items(
    parametres: ParametresCatalogue = Depends(parametres_catalogue),
    session: AsyncSession = Depends(get_session),
) -> ItemListe:
    requete = select(Voiture)

    if parametres.categorie:
        requete = requete.where(Voiture.categorie == parametres.categorie)

    if parametres.q:
        motif = f"%{parametres.q}%"
        requete = requete.where(
            (Voiture.nom.ilike(motif)) | (Voiture.description.ilike(motif))
        )

    # Total avant pagination
    requete_total = select(func.count()).select_from(requete.subquery())
    total = (await session.exec(requete_total)).one()

    requete = requete.offset((parametres.page - 1) * parametres.limit).limit(
        parametres.limit
    )
    resultats = (await session.exec(requete)).all()

    return ItemListe(
        total=total,
        page=parametres.page,
        limit=parametres.limit,
        results=[ItemRead.model_validate(item, from_attributes=True) for item in resultats],
    )


@router.get(
    "/{item_id}",
    response_model=ItemRead,
    summary="Détail d'une voiture",
    responses={404: {"description": "Item introuvable"}},
)
async def obtenir_item(
    item_id: int,
    session: AsyncSession = Depends(get_session),
) -> ItemRead:
    voiture = await session.get(Voiture, item_id)
    if voiture is None:
        raise HTTPException(status_code=404, detail="Item introuvable")
    return ItemRead.model_validate(voiture, from_attributes=True)