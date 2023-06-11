# Hackathon CarbonIT - Groupe 4

## Stack technique

-   Docker
-   NestJS
-   React
-   MongoDB

## Développeurs

-   Maxime Malécot -> Github : MaximeMalecot
-   Sacha Francisco-Leblanc -> Github : FranciscoSacha - francisco.leblanc.sacha
-   Clarence Potel -> Github : Clacla - Clarence Potel
-   Julian Saleix -> Github : jsaleix - julian-saleix

## Démarrer le projet

Run the following command:

```
docker compose up --build -d; \
docker compose exec server npm i; \
docker compose exec server npm run db:seed; \
docker compose restart server
```

## Liste des routes disponibles (swagger)

Assurez-vous que le projet est bien lancé en local et que le port 3000 n'est pas déjà attribué, si tout est bon rendez-vous à l'url suivante:
http://localhost:3000/api
Tous les endpoints api devraient y être listés.

## Liste des fonctionnalités

| Fonctionnalité (front et back)                       | Description                 | Développeur(s)   |
| ---------------------------------------------------- | --------------------------- | ---------------- |
| Se connecter                                         |                             | Maxime, Julian   |
| Créer un compte utilisateur                          |                             | Maxime           |
| Afficher son profil                                  |                             | Julian           |
| Lister les utilisateurs                              |                             | Maxime, Sacha    |
| Afficher un utilisateur                              |                             | Maxime, Sacha    |
| Supprimer un utilisateur                             |                             | Maxime, Sacha    |
| Modifier les permissions d'un utilisateur            | Attributions de rôles       | Maxime, Sacha    |
| Créer une entreprise                                 |                             | Maxime, Sacha    |
| Afficher les entreprises                             |                             | Sacha, Maxime    |
| Voir une entreprise et ses consultants               |                             | Sacha, Maxime    |
| Créer un contrat                                     |                             | Maxime, Clarence |
| Afficher tous les contrats                           |                             | Maxime, Julian   |
| Voir un contrat                                      |                             | Maxime, Julian   |
| Annuler un contrat                                   |                             | Maxime, Julian   |
| Mettre fin à un contrat                              |                             | Maxime, Julian   |
| Créer un délivrable pour un contrat                  |                             | Maxime, Julian   |
| Voir les délivrables liés à un contrat               |                             | Maxime, Julian   |
| Supprimer un délivrable                              |                             | Maxime, Julian   |
| Créer une formation                                  |                             | Clarence, Julian |
| Accéder à une formation                              |                             | Clarence, Julian |
| Voir sa progression dans une formation               |                             | Clarence, Julian |
| Voir ses formations en cours                         |                             | Clarence, Julian |
| Voir la progression d'une formation d'un utilisateur |                             | Clarence, Julian |
| Voir les formations en cours d'un utilisateur        |                             | Clarence, Julian |
| Créer un chapitre pour une formation                 |                             | Clarence, Julian |
| Accéder au chapitre d'une formation                  |                             | Clarence, Julian |
| Modifier le chapitre d'une formation                 |                             | Clarence, Julian |
| Terminer un chapitre de formation                    |                             | Clarence, Julian |
| Créer un quiz lié à un chapitre                      |                             | Clarence, Julian |
| Récupérer un quiz                                    |                             | Clarence, Julian |
| Répondre à un quiz                                   |                             | Clarence, Julian |
| Modifier un quiz                                     |                             | Clarence, Julian |
| Créer une ressource liée à un chapitre               |                             | Clarence, Julian |
| Supprimer une ressource                              |                             | Clarence, Julian |
| Accéder à une ressource                              |                             | Clarence, Julian |
| Créer un post                                        |                             | Maxime, Sacha    |
| Supprimer un post                                    |                             | Maxime, Sacha    |
| Voir les posts                                       |                             | Maxime, Sacha    |
| Voir un post                                         |                             | Maxime, Sacha    |
| Modifier un post                                     |                             | Maxime, Sacha    |
| Publier un post                                      | Mettre à jour sa visibilité | Maxime, Sacha    |
| Ajouter un lot                                       |                             | Maxime, Julian   |
| Afficher tous les lots                               |                             | Maxime, Julian   |
| Réduire le stock d'un lot à 0                        |                             | Maxime, Julian   |
| Echanger des points contre un lot                    |                             | Maxime, Julian   |
