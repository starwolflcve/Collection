import os

from dotenv import load_dotenv

load_dotenv()

JWT_SECRET_KEY: str = os.environ["JWT_SECRET_KEY"]
JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRATION_MINUTES: int = int(os.getenv("JWT_EXPIRATION_MINUTES", "30"))