# Interface React

## Prérequis

- Node.js 20 ou supérieur
- npm
- L'API FastAPI démarrée sur `http://localhost:8000`

## Installation et lancement

Sous Windows PowerShell, depuis la racine du dépôt, entrez les commandes **une par une** :

```powershell
cd web
npm install
npm run dev
```

`npm install` est nécessaire lors de la première installation ou après un changement de dépendances. Pour les démarrages suivants, exécutez `npm run dev` depuis le dossier `web`.

L'application est servie sur <http://localhost:5173>. Pour vérifier la compilation de production :

```sh
npm run build
```

L'interface charge le catalogue et les fonctionnalités de compte/collection depuis l'API FastAPI. Démarrez également l'API dans un autre terminal en suivant [../api/README.md](../api/README.md). Le client HTTP unique se trouve dans `src/services/`.
