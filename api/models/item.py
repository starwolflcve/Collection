from sqlmodel import SQLModel, Field


class Voiture(SQLModel, table=True):
    """Table du catalogue public (Item dans le contrat d'API)."""

    id: int | None = Field(default=None, primary_key=True)

    nom: str = Field(index=True)             
    categorie: str = Field(index=True)      
    annee: int
    description: str
    image_url: str

    
    constructeur: str
    moteur: str
    puissance: int 
    pays: str