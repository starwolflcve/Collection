# Ma Collection

## Démarrer l'API

```sh
cd api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Remplace `JWT_SECRET_KEY` dans `api/.env` par une clé aléatoire générée avec :

```sh
python3 -c 'import secrets; print(secrets.token_urlsafe(32))'
```

Puis peuple la base et démarre l'API depuis le dossier `api` :

```sh
python seed.py
uvicorn main:app --reload
```

## Démarrer l'interface

Dans un second terminal, depuis la racine du projet :

```sh
cd web
npm install
npm run dev
```

L'inscription se fait sur `/register`, puis la connexion sur `/login`. Les mots de passe sont hachés côté API et le token d'accès est conservé dans le stockage local du navigateur.