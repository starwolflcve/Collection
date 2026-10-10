# Ma Collection

## Présentation du projet

Application web permettant d'explorer un catalogue de voitures et de gérer sa collection personnelle. Les utilisateurs peuvent créer un compte, ajouter des voitures à leur collection, modifier leur statut, leur note et leur commentaire, puis consulter leurs statistiques.


## Architecture

```
.
├── api/                       # API Python / FastAPI
│   ├── core/                  # Configuration, sécurité et erreurs
│   ├── db/                    # Base SQLite asynchrone
│   ├── dependencies/          # Authentification et pagination
│   ├── models/                # Modèles de données
│   ├── routers/               # Routes de l'API
│   ├── schemas/               # Schémas de requête et de réponse
│   ├── static/                # Images des voitures
│   ├── seed.py                # Peuplement initial du catalogue
│   └── main.py                # Assemblage de l'application
└── web/                       # Interface React / TypeScript
    └── src/
        ├── components/        # Composants d'interface
        ├── context/           # État d'authentification et collection
        ├── hooks/             # Hooks React réutilisables
        ├── pages/             # Pages de l'application
        ├── services/          # Client HTTP et appels à l'API
        ├── styles/            # Feuilles de style
        └── types/             # Types TypeScript de l'API
```

## Prérequis

- Windows 64 bits avec **Python 3.12 64 bits** pour l'API.
- **Node.js 20 ou supérieur** et npm pour l'interface.
- PowerShell.

Vérifiez que les outils sont disponibles :

```powershell
py -3.12 --version
node --version
npm --version
```

La première commande doit afficher `Python 3.12.x`. Si vous voyez `No suitable Python runtime found`, Python 3.12 n'est pas installé ou détecté.

## Commandes principales

| Commande | Dossier | Rôle |
| --- | --- | --- |
| `py -3.12 -m venv .venv` | `api` | Créer l'environnement Python (une seule fois) |
| `.\.venv\Scripts\python.exe -m pip install -r requirements.txt` | `api` | Installer les dépendances backend |
| `.\.venv\Scripts\python.exe seed.py` | `api` | Créer/remplir la base avec le catalogue |
| `.\.venv\Scripts\python.exe -m uvicorn main:app --reload` | `api` | Démarrer l'API |
| `npm install` | `web` | Installer les dépendances frontend |
| `npm run dev` | `web` | Démarrer l'interface |
| `npm run build` | `web` | Vérifier/compiler le frontend |

## Guide de lancement sous Windows

L'API et l'interface doivent tourner en même temps dans **deux fenêtres PowerShell séparées**. À chaque étape, entrez les commandes une par une.

### 1. Préparer et démarrer l'API

Ouvrez le premier terminal à la racine du projet (le dossier contenant `api` et `web`), puis :

```powershell
cd .\api
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

La création de `.venv` se fait uniquement lors de la première installation. Créez ensuite le fichier de configuration sans remplacer un éventuel fichier existant :

```powershell
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
notepad .env
```

Dans `.env`, remplacez `JWT_SECRET_KEY` par une clé aléatoire. Pour en générer une, ouvrez un autre terminal et exécutez :

```powershell
py -3.12 -c "import secrets; print(secrets.token_urlsafe(32))"
```

Copiez la clé obtenue dans `.env` et enregistrez le fichier. Revenez au premier terminal, toujours dans `api` :

```powershell
.\.venv\Scripts\python.exe seed.py
.\.venv\Scripts\python.exe -m uvicorn main:app --reload
```

Laissez ce terminal ouvert. L'API et sa documentation sont disponibles ici :

- API : <http://localhost:8000>
- Documentation : <http://localhost:8000/docs>

### 2. Démarrer l'interface

Ouvrez un **deuxième terminal PowerShell** à la racine du projet :

```powershell
cd .\web
npm install
npm run dev
```

Laissez aussi ce terminal ouvert, puis ouvrez <http://localhost:5173>.

### Démarrages suivants

Après l'installation initiale, lancez seulement les serveurs :

- Terminal API : `cd .\api`, puis `.\.venv\Scripts\python.exe -m uvicorn main:app --reload`.
- Terminal frontend : `cd .\web`, puis `npm run dev`.

Arrêtez chaque serveur avec `Ctrl+C` dans son terminal. N'exécutez pas `npm run dev` dans `api` : la commande doit être lancée dans `web`.

