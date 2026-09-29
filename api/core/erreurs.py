from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException


def corps_erreur(code: int, message: str) -> dict[str, dict[str, int | str]]:
    return {"erreur": {"code": code, "message": message}}


async def gerer_http_exception(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content=corps_erreur(exc.status_code, str(exc.detail)),
        headers=getattr(exc, "headers", None),
    )


async def gerer_validation(request: Request, exc: RequestValidationError) -> JSONResponse:
    return JSONResponse(
        status_code=422,
        content=corps_erreur(422, "Données invalides"),
    )


def enregistrer_handlers(app: FastAPI) -> None:
    app.add_exception_handler(StarletteHTTPException, gerer_http_exception)
    app.add_exception_handler(RequestValidationError, gerer_validation)