from sqlmodel import SQLModel, Field


class Utilisateur(SQLModel, table=True):
    """Table des comptes (contrat d'API : POST /auth/register {email, password})."""

    id: int | None = Field(default=None, primary_key=True)

    email: str = Field(index=True, unique=True)
    mot_de_passe_hache: str 