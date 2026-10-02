from sqlmodel import SQLModel

# Import obligatoire : enregistre les tables avant create_all().
from models.item import Voiture  # noqa: F401
from models.user import Utilisateur  # noqa: F401
from models.collection import EntreeCollection  # noqa: F401

from db.session import engine


async def creer_tables() -> None:
    async with engine.begin() as connexion:
        await connexion.run_sync(SQLModel.metadata.create_all)
        