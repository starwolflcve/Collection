# Ma Collection

## Prérequis

- Python **3.12 64 bits** (Python 3.14 32 bits n'est pas pris en charge par les dépendances natives du backend).
- Node.js 20 ou supérieur et npm.

## Démarrer l'API

Depuis la racine du dépôt, créez l'environnement virtuel puis activez-le.

Windows PowerShell :

```sh
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

Installez ensuite les dépendances et créez la configuration locale :

```sh
pip install -r requirements.txt
```

Copiez `api/.env.example` vers `api/.env` (`Copy-Item .env.example .env` sous PowerShell, `cp .env.example .env` sous macOS/Linux) puis remplacez `JWT_SECRET_KEY` par une clé aléatoire générée avec :

```sh
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Depuis le dossier `api`, peuplez la base et démarrez l'API :

```sh
python seed.py
uvicorn main:app --reload
```

L'API et sa documentation sont accessibles sur <http://localhost:8000> et <http://localhost:8000/docs>.

## Démarrer l'interface

Dans un second terminal, depuis la racine du projet :

```sh
cd web
npm install
npm run dev
```

L'interface est accessible sur <http://localhost:5173>. L'inscription se fait sur `/register`, puis la connexion sur `/login`. Les mots de passe sont hachés côté API et le token d'accès est conservé dans le stockage local du navigateur.

Des instructions détaillées sont disponibles dans [api/README.md](./api/README.md) et [web/README.md](./web/README.md).