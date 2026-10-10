from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from core.erreurs import enregistrer_handlers
from db.base import creer_tables
from routers.auth import router as router_auth
from routers.items import router as router_items
from routers.collection import router as router_collection


@asynccontextmanager
async def lifespan(app: FastAPI):
    await creer_tables()
    yield


app = FastAPI(
    title="Ma Collection - API",
    lifespan=lifespan,
)

app.mount(
    "/static",
    StaticFiles(directory=Path(__file__).parent / "static"),
    name="static",
)

# CORS restreint à l'origine du serveur de dev Vite, et elle seule
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

enregistrer_handlers(app)

app.include_router(router_auth)
app.include_router(router_items)
app.include_router(router_collection)