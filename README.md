# 🎬 ProjFront_catalogue_films
![Démo](https://img.shields.io/badge/status-Student_Project-orange)
![Vue](https://img.shields.io/badge/Vue.js-3-42b883?logo=vue.js)
![Pinia](https://img.shields.io/badge/Pinia-State-yellow?logo=javascript)
![Axios](https://img.shields.io/badge/Axios-HTTP-blue?logo=axios)

Application Vue.js permettant d’explorer un catalogue de films via l’API TMDB 🎬

## 🪧 À propos

Ce projet a été créé pour le module ProjFront de 2ème année CFC aux CPNV.  
Il s'agit d'un projet Vue utilisant Pinia et Axios, qui a pour objectif de faire le front-end d'une API.  


L'API choisie est :  
👉 [themoviedb](https://www.themoviedb.org)

Cette application permet d'afficher, rechercher et explorer un catalogue de films via les données de  The Movie Database (TMDB).

---
## Table des matières

- 🪧 [À propos](#à-propos)
- 📦 [Prérequis](#prérequis)
- 🚀 [Installation](#installation)
- 🛠️ [Utilisation](#utilisation)
- 🏗️ [Construit avec](#construit-avec)
- 📚 [Documentation](#documentation)

---
## 📦 Prérequis
Avant de commencer, assurez-vous d’avoir :
1. [Pour utiliser l’API, il est nécessaire de créer un compte](https://www.themoviedb.org/signup)
2. [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
3. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
4. [Git installé](https://git-scm.com/install/windows)

----
## 🚀 Installation

1. Cloner le dépôt GitHub
    ```bash
    git clone https://github.com/votre-repo/ProjFront_catalogue_films.git
    cd ProjFront_catalogue_films
    ```

2. Installer les dépendances
    ```bash
    npm install
    ```

3. Configurer les variables d’environnement

    Créer un fichier .env à la racine :
    ```text
    VITE_TMDB_TOKEN="your_api_key_here"
    ```
4. Lancer le projet en local
   ```bash
    npm run dev
    ```
---
## 🛠️ Utilisation
### Mode développement
```bash
npm run dev
```
Lance un serveur local avec rechargement automatique.

### Vue DevTools
```
http://localhost:5173/__devtools__/
```
Lance les outils de développement

---
## 🏗️ Construit avec

### Langages & Frameworks

- [Vue.js 3 — Framework front-end](https://vuejs.org)

- [Pinia — Gestion d’état](https://pinia.vuejs.org)

- [Axios — Requêtes HTTP](https://axios-http.com)

- [Vite — Outil de build](https://vitejs.dev)

- [Bootstrap — Outil pour le responsive](https://getbootstrap.com)

- [Vueform — Outil pour les sliders](https://vueform.com/reference/slider-element)

---
## 📚 Documentation

- [TMDB API](https://developer.themoviedb.org)
- [Vue.js](https://vuejs.org/guide/introduction.html)
- [Pinia](https://pinia.vuejs.org/core-concepts/)
- [Vueform](https://vueform.com)
- [Bootstrap](https://getbootstrap.com)