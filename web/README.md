# Interface React

## Prérequis

- Node.js 20 ou supérieur
- npm
- L'API FastAPI démarrée sur `http://localhost:8000`

## Installation et lancement

Depuis le dossier `web` :

```sh
npm install
npm run dev
```

L'application est servie sur <http://localhost:5173>. Pour vérifier la compilation de production :

```sh
npm run build
```

L'interface utilise le catalogue automobile local et le client HTTP défini dans `src/services/` pour les fonctionnalités nécessitant l'API.
