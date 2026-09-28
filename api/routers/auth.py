from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from core.security import creer_access_token, hacher_mot_de_passe, verifier_mot_de_passe
from db.session import get_session
from dependencies.authentification import get_current_user
from models.user import Utilisateur
from schemas.auth import Token, UserCreate, UserRead

router = APIRouter(prefix="/auth", tags=["authentification"])


@router.post(
    "/register",
    response_model=UserRead,
    status_code=201,
    summary="Créer un compte",
    responses={409: {"description": "Email déjà pris"}},
)
async def creer_compte(
    donnees: UserCreate,
    session: AsyncSession = Depends(get_session),
) -> UserRead:
    existe = (
        await session.exec(select(Utilisateur).where(Utilisateur.email == donnees.email))
    ).first()
    if existe is not None:
        raise HTTPException(status_code=409, detail="Email déjà pris")

    utilisateur = Utilisateur(
        email=donnees.email,
        mot_de_passe_hache=hacher_mot_de_passe(donnees.password),
    )
    session.add(utilisateur)
    await session.commit()
    await session.refresh(utilisateur)

    return UserRead(id=utilisateur.id, email=utilisateur.email)


@router.post(
    "/login",
    response_model=Token,
    summary="Se connecter",
    responses={401: {"description": "Email ou mot de passe invalide"}},
)
async def se_connecter(
    donnees: UserCreate,
    session: AsyncSession = Depends(get_session),
) -> Token:
    utilisateur = (
        await session.exec(select(Utilisateur).where(Utilisateur.email == donnees.email))
    ).first()

    if utilisateur is None or not verifier_mot_de_passe(
        donnees.password, utilisateur.mot_de_passe_hache
    ):
        raise HTTPException(status_code=401, detail="Email ou mot de passe invalide")

    token = creer_access_token(sujet=utilisateur.email)
    return Token(access_token=token)


@router.get(
    "/me",
    response_model=UserRead,
    summary="Informations du compte connecté",
)
async def obtenir_mon_compte(
    utilisateur: Utilisateur = Depends(get_current_user),
) -> UserRead:
    return UserRead(id=utilisateur.id, email=utilisateur.email)