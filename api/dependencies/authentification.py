from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from core.security import decoder_access_token
from db.session import get_session
from models.user import Utilisateur

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    session: AsyncSession = Depends(get_session),
) -> Utilisateur:
    email = decoder_access_token(token)
    if email is None:
        raise HTTPException(status_code=401, detail="Token invalide ou expiré")

    utilisateur = (
        await session.exec(select(Utilisateur).where(Utilisateur.email == email))
    ).first()

    if utilisateur is None:
        raise HTTPException(status_code=401, detail="Token invalide ou expiré")

    return utilisateur