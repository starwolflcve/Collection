from pydantic import BaseModel, ConfigDict, Field


class ItemRead(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: int
    titre: str = Field(validation_alias="nom")
    categorie: str
    annee: int
    description: str
    image_url: str
    constructeur: str
    moteur: str
    puissance: int
    pays: str


class ItemListe(BaseModel):
    total: int
    page: int
    limit: int
    results: list[ItemRead]