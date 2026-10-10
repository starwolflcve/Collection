from sqlmodel import Field, SQLModel


class Utilisateur(SQLModel, table=True):
	id: int | None = Field(default=None, primary_key=True)
	email: str = Field(index=True, unique=True, max_length=320)
	mot_de_passe_hache: str
