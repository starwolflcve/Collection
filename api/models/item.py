from sqlmodel import Field, SQLModel


class Voiture(SQLModel, table=True):
	id: int | None = Field(default=None, primary_key=True)
	nom: str = Field(index=True, unique=True, max_length=200)
	categorie: str = Field(index=True, max_length=80)
	annee: int
	description: str
	image_url: str
	constructeur: str = Field(max_length=120)
	moteur: str = Field(max_length=160)
	puissance: int
	pays: str = Field(max_length=120)
