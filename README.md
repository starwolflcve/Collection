# Ma Collection

## Prérequis

- **Windows : Python 3.12 64 bits**. Installez-le depuis [python.org](https://www.python.org/downloads/) et cochez l'option d'ajout au `PATH`. Fermez puis rouvrez PowerShell après l'installation. Python 3.14 32 bits n'est pas pris en charge par certaines dépendances du backend.
- **Node.js 20 ou supérieur** avec npm.

Vérifiez les installations dans PowerShell :

```powershell
py -3.12 --version
node --version
npm --version
```

La première commande doit afficher `Python 3.12.x`. Si elle affiche `No suitable Python runtime found`, Python 3.12 n'est pas installé : installez-le depuis le lien ci-dessus, puis rouvrez PowerShell. Les commandes `python` et `uvicorn` seules ne fonctionneront pas avant l'installation des dépendances.

## Démarrage sous Windows

**Exécutez les commandes une par une.** Le backend et le frontend doivent tourner dans deux terminaux PowerShell séparés, laissés ouverts.

### Terminal 1 — API

Depuis la racine du dépôt (`C:\Users\quent\Collection` dans cet exemple) :

```powershell
cd C:\Users\quent\Collection\api
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

La commande de création de l'environnement virtuel ne se fait qu'une seule fois. Si `.venv` existe déjà, passez cette commande.

Créez le fichier de configuration seulement s'il n'existe pas déjà, afin de ne pas écraser votre clé secrète :

```powershell
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
notepad .env
```

Dans `.env`, remplacez la valeur de `JWT_SECRET_KEY` par une clé aléatoire. Générez-en une dans PowerShell avec :

```powershell
py -3.12 -c "import secrets; print(secrets.token_urlsafe(32))"
```

Enregistrez le fichier, puis peuplez la base (vous pouvez relancer cette commande sans créer de doublons) et démarrez l'API :

```powershell
.\.venv\Scripts\python.exe seed.py
.\.venv\Scripts\python.exe -m uvicorn main:app --reload
```

Laissez le terminal ouvert. L'API est à <http://localhost:8000> et sa documentation à <http://localhost:8000/docs>.

### Terminal 2 — interface web

Ouvrez un **nouveau** terminal PowerShell :

```powershell
cd C:\Users\quent\Collection\web
npm install
npm run dev
```

`npm install` est nécessaire à la première installation (et après un changement des dépendances). Laissez le terminal ouvert et ouvrez <http://localhost:5173>.

Pour arrêter l'un des serveurs, revenez dans son terminal et appuyez sur `Ctrl+C`. Aux prochains démarrages, il suffit de relancer les deux commandes `python.exe ... -m uvicorn` et `npm run dev` dans leurs terminaux respectifs.

## macOS / Linux

Installez Python 3.12 et Node.js 20+, puis dans un terminal :

```sh
cd api
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Définissez `JWT_SECRET_KEY` dans `api/.env`, puis, depuis `api`, lancez `python seed.py` et `python -m uvicorn main:app --reload`. Dans un second terminal, lancez `cd web`, `npm install`, puis `npm run dev`.

L'interface est accessible sur <http://localhost:5173>. L'API répond sur <http://localhost:8000> et sa documentation interactive est disponible sur <http://localhost:8000/docs>. L'inscription se fait sur `/register`, puis la connexion sur `/login`. Les mots de passe sont hachés côté API et le token d'accès est conservé dans le stockage local du navigateur.

Le stockage local permet au JavaScript de la page de lire le token : une faille XSS pourrait donc le dérober et l'utiliser pour agir au nom de l'utilisateur jusqu'à son expiration. En production, une alternative consiste à stocker le token dans un cookie `HttpOnly` (également `Secure` et avec une politique `SameSite` appropriée), inaccessible au JavaScript. Cette approche nécessite une gestion complémentaire des requêtes authentifiées et de la protection contre les attaques CSRF.

Des instructions détaillées sont disponibles dans [api/README.md](./api/README.md) et [web/README.md](./web/README.md).