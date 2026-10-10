from typing import Literal

from fastapi import APIRouter, Depends, HTTPException, Query, Request, Response
from sqlmodel import select, func
from sqlmodel.ext.asyncio.session import AsyncSession

from db.session import get_session
from dependencies.authentification import get_current_user
from models.collection import EntreeCollection, Statut
from models.item import Voiture
from models.user import Utilisateur
from schemas.collection import EntryCreate, EntryRead, EntryUpdate, StatsRead
from schemas.item import ItemRead, avec_url_image_absolue

router = APIRouter(prefix="/me", tags=["collection"])


def construire_entry(
    entree: EntreeCollection, voiture: Voiture, base_url: str
) -> EntryRead:
    return EntryRead(
        id=entree.id,
        statut=entree.statut,
        note=entree.note,
        commentaire=entree.commentaire,
        date_ajout=entree.date_ajout,
        item=avec_url_image_absolue(
            ItemRead.model_validate(voiture, from_attributes=True),
            base_url,
        ),
    )


async def obtenir_entree_du_proprietaire(
    entry_id: int, utilisateur: Utilisateur, session: AsyncSession
) -> EntreeCollection:
    """Retourne l'entrée seulement si elle appartient à l'utilisateur, sinon 404."""
    entree = (
        await session.exec(
            select(EntreeCollection).where(
                EntreeCollection.id == entry_id,
                EntreeCollection.utilisateur_id == utilisateur.id,
            )
        )
    ).first()
    if entree is None:
        raise HTTPException(status_code=404, detail="Entrée introuvable")
    return entree


@router.get(
    "/collection",
    response_model=list[EntryRead],
    summary="Lister ma collection",
)
async def lister_collection(
    request: Request,
    statut: Statut | None = Query(default=None),
    tri: Literal["date", "note"] = Query(default="date"),
    utilisateur: Utilisateur = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> list[EntryRead]:
    requete = (
        select(EntreeCollection, Voiture)
        .join(Voiture, EntreeCollection.voiture_id == Voiture.id)
        .where(EntreeCollection.utilisateur_id == utilisateur.id)
    )
    if statut is not None:
        requete = requete.where(EntreeCollection.statut == statut)

    if tri == "note":
        requete = requete.order_by(EntreeCollection.note.desc())
    else:
        requete = requete.order_by(EntreeCollection.date_ajout.desc())

    lignes = (await session.exec(requete)).all()
    return [
        construire_entry(entree, voiture, str(request.base_url))
        for entree, voiture in lignes
    ]


@router.post(
    "/collection",
    response_model=EntryRead,
    status_code=201,
    summary="Ajouter une voiture à ma collection",
    responses={404: {"description": "Item inexistant"}, 409: {"description": "Déjà présent"}},
)
async def ajouter_entree(
    donnees: EntryCreate,
    request: Request,
    utilisateur: Utilisateur = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> EntryRead:
    voiture = await session.get(Voiture, donnees.item_id)
    if voiture is None:
        raise HTTPException(status_code=404, detail="Item introuvable")

    deja_present = (
        await session.exec(
            select(EntreeCollection).where(
                EntreeCollection.utilisateur_id == utilisateur.id,
                EntreeCollection.voiture_id == donnees.item_id,
            )
        )
    ).first()
    if deja_present is not None:
        raise HTTPException(status_code=409, detail="Cet élément est déjà dans votre collection")

    entree = EntreeCollection(
        utilisateur_id=utilisateur.id,
        voiture_id=donnees.item_id,
        statut=donnees.statut,
        note=donnees.note,
        commentaire=donnees.commentaire,
    )
    session.add(entree)
    await session.commit()
    await session.refresh(entree)

    return construire_entry(entree, voiture, str(request.base_url))


@router.patch(
    "/collection/{entry_id}",
    response_model=EntryRead,
    summary="Modifier une entrée de ma collection",
    responses={404: {"description": "Entrée introuvable"}},
)
async def modifier_entree(
    entry_id: int,
    donnees: EntryUpdate,
    request: Request,
    utilisateur: Utilisateur = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> EntryRead:
    entree = await obtenir_entree_du_proprietaire(entry_id, utilisateur, session)

    for champ, valeur in donnees.model_dump(exclude_unset=True).items():
        setattr(entree, champ, valeur)

    session.add(entree)
    await session.commit()
    await session.refresh(entree)

    voiture = await session.get(Voiture, entree.voiture_id)
    return construire_entry(entree, voiture, str(request.base_url))


@router.delete(
    "/collection/{entry_id}",
    status_code=204,
    summary="Supprimer une entrée de ma collection",
    responses={404: {"description": "Entrée introuvable"}},
)
async def supprimer_entree(
    entry_id: int,
    utilisateur: Utilisateur = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> Response:
    entree = await obtenir_entree_du_proprietaire(entry_id, utilisateur, session)
    await session.delete(entree)
    await session.commit()
    return Response(status_code=204)


@router.get(
    "/stats",
    response_model=StatsRead,
    summary="Statistiques de ma collection",
)
async def obtenir_stats(
    utilisateur: Utilisateur = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> StatsRead:
    base = EntreeCollection.utilisateur_id == utilisateur.id

    total = (
        await session.exec(select(func.count()).select_from(EntreeCollection).where(base))
    ).one()

    lignes = (
        await session.exec(
            select(EntreeCollection.statut, func.count())
            .where(base)
            .group_by(EntreeCollection.statut)
        )
    ).all()
    par_statut = {statut.value: 0 for statut in Statut}
    for statut, nombre in lignes:
        par_statut[statut.value] = nombre

    moyenne = (
        await session.exec(select(func.avg(EntreeCollection.note)).where(base))
    ).one()

    return StatsRead(
        total=total,
        par_statut=par_statut,
        note_moyenne=round(float(moyenne), 2) if moyenne is not None else 0.0,
    )