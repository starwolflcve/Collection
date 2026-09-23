from sqlmodel import SQLModel

# Import obligatoire : force SQLModel à enregistrer chaque table
# avant l'appel à create_all(). Sans ces imports, les tables
# correspondantes ne seraient jamais créées.
from models.voiture import Voiture  # noqa: F401
from models.utilisateur import Utilisateur  # noqa: F401
from models.entree_collection import EntreeCollection  # noqa: F401

from db.session import engine


async def creer_tables() -> None:
    async with engine.begin() as connexion:
        await connexion.run_sync(SQLModel.metadata.create_all)
        