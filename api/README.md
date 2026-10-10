# API FastAPI

## Prérequis

Utilisez Python 3.12 en 64 bits. L'installation des dépendances natives du projet n'est pas garantie avec Python 3.14 32 bits.

## Installation et lancement

Depuis la racine du dépôt, créez et activez un environnement virtuel.

Windows PowerShell :

```powershell
cd api
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
```

macOS / Linux :

```sh
cd api
python3.12 -m venv .venv
source .venv/bin/activate
```

Puis, depuis le dossier `api`, installez les dépendances et préparez la configuration :

```sh
pip install -r requirements.txt
```

Copiez `.env.example` vers `.env` et définissez `JWT_SECRET_KEY` avec une valeur aléatoire. Exemple de génération :

```sh
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Peuplez le catalogue puis lancez l'API :

```sh
python seed.py
uvicorn main:app --reload
```

La documentation interactive est disponible sur <http://localhost:8000/docs>. Le script `seed.py` peut être relancé sans ajouter de doublons. Les images du catalogue sont servies par l'API sous `/static/voitures_catalogue/`.
