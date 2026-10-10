# API FastAPI

## Prérequis

Sous Windows, installez **Python 3.12 64 bits** depuis [python.org](https://www.python.org/downloads/), avec l'option d'ajout au `PATH`, puis rouvrez PowerShell. Vérifiez :

```powershell
py -3.12 --version
```

Si la commande affiche `No suitable Python runtime found`, installez Python 3.12 avant de continuer. Certaines dépendances du backend ne prennent pas en charge Python 3.14 32 bits.

## Installation et lancement sous Windows

Depuis la racine du dépôt, entrez les commandes ci-dessous **une par une** :

```powershell
cd api
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
notepad .env
```

Dans `.env`, remplacez `JWT_SECRET_KEY` par une clé générée avec :

```powershell
py -3.12 -c "import secrets; print(secrets.token_urlsafe(32))"
```

Enregistrez `.env`, puis, toujours depuis le dossier `api` :

```powershell
.\.venv\Scripts\python.exe seed.py
.\.venv\Scripts\python.exe -m uvicorn main:app --reload
```

Gardez le terminal ouvert. À la prochaine utilisation, il suffit de refaire `cd api` puis de lancer les deux dernières commandes. `seed.py` peut être relancé sans ajouter de doublons.

## macOS / Linux

```sh
cd api
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Définissez ensuite `JWT_SECRET_KEY` dans `.env`, puis lancez `python seed.py` et `python -m uvicorn main:app --reload`.

La documentation interactive est disponible sur <http://localhost:8000/docs>. Le script `seed.py` peut être relancé sans ajouter de doublons. Les images du catalogue sont servies par l'API sous `/static/voitures_catalogue/`.
