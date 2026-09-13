# Matrice des neuf classes — v0.29.1

## Méthode

799,200 duels : 36 paires de classes, niveaux 1, 5, 10, 15 et 20, neuf combinaisons de profils après le niveau 1. Au niveau 1, les profils sont identiques : une seule combinaison est simulée. Chaque cellule utilise 300 paires de héros, jouées dans les deux sens avec la même graine de combat. Les équipements et graines sont également partagés entre profils pour une paire et un niveau donnés.

Équipement aléatoire compatible dans les quatre emplacements, niveau identique entre héros et objets. Chaque paire reçoit la même rareté, avec exactement 100 tirages communs, 100 uncommon et 100 rares. Tous les familiers actuels sont conservés, dont le Chien du Mage. Pas de sélection optimisée, pas de carrière, pas de classes miroirs.

Profils : offense = attaque pure ; balanced = 50 % attaque, 25 % endurance, 25 % dextérité ; resilient = 25 % attaque, 50 % endurance, 25 % dextérité. Allocation cyclique légale ; les proportions exactes dépendent du nombre de points disponibles. Attaque = Force pour les classes physiques, Intelligence pour les classes magiques.

**Les tableaux donnent un score de victoire : victoire = 1, égalité = 0,5, défaite = 0.** Les comptes bruts de victoires et égalités sont conservés dans results.json. Les deux placements et les profils partagent leurs tirages : ne pas les traiter comme des observations indépendantes. Les écarts de quelques points restent exploratoires, sans correction pour comparaisons multiples.

## Profils équilibrés des deux côtés

| Classe | Niv. 1 | Niv. 5 | Niv. 10 | Niv. 15 | Niv. 20 |
|---|---:|---:|---:|---:|---:|
| Guerrier | 51.4 % | 52.6 % | 54.1 % | 55.4 % | 54.2 % |
| Archer | 50.9 % | 50.3 % | 49.1 % | 48.9 % | 47.9 % |
| Mage | 53.6 % | 48.6 % | 46.9 % | 45.5 % | 44.2 % |
| Trooper | 47.2 % | 52.1 % | 51.8 % | 54.0 % | 56.7 % |
| Paladin | 48.0 % | 47.8 % | 49.0 % | 49.5 % | 49.0 % |
| Ninja | 48.9 % | 50.7 % | 50.7 % | 50.3 % | 49.5 % |
| Moine | 53.0 % | 51.8 % | 49.5 % | 48.8 % | 49.4 % |
| Ingénieur | 49.1 % | 46.8 % | 49.1 % | 47.0 % | 47.5 % |
| Berserker | 47.9 % | 49.4 % | 49.9 % | 50.7 % | 51.6 % |

## Sensibilité aux profils au niveau 20

Adversaires : les huit autres classes, chacune avec ses trois profils à poids égal. Ces taux ne correspondent pas au tableau précédent, qui impose des adversaires équilibrés.

| Classe | Attaque pure | Équilibré | Endurance |
|---|---:|---:|---:|
| Guerrier | 57.3 % | 57.0 % | 49.3 % |
| Archer | 42.8 % | 50.9 % | 51.9 % |
| Mage | 30.4 % | 47.0 % | 57.5 % |
| Trooper | 52.4 % | 58.2 % | 55.1 % |
| Paladin | 41.0 % | 52.1 % | 54.5 % |
| Ninja | 40.3 % | 52.0 % | 54.7 % |
| Moine | 40.8 % | 52.8 % | 58.8 % |
| Ingénieur | 36.6 % | 49.6 % | 54.4 % |
| Berserker | 48.0 % | 53.8 % | 50.8 % |

## Matrice au niveau 1 — profils équilibrés

Lire chaque ligne comme le score de la classe contre la colonne.

| Classe | Guerrier | Archer | Mage | Trooper | Paladin | Ninja | Moine | Ingénieur | Berserker |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Guerrier | — | 70.5 | 47.8 | 74.8 | 36.4 | 58.0 | 28.9 | 54.7 | 39.7 |
| Archer | 29.5 | — | 74.0 | 51.5 | 71.5 | 51.8 | 54.0 | 34.3 | 40.6 |
| Mage | 52.2 | 26.0 | — | 60.5 | 76.2 | 58.3 | 67.8 | 45.5 | 42.7 |
| Trooper | 25.2 | 48.5 | 39.5 | — | 61.7 | 49.8 | 61.3 | 48.2 | 43.4 |
| Paladin | 63.6 | 28.5 | 23.8 | 38.3 | — | 61.3 | 32.4 | 66.3 | 69.3 |
| Ninja | 42.0 | 48.2 | 41.7 | 50.2 | 38.7 | — | 65.5 | 49.5 | 55.4 |
| Moine | 71.1 | 46.0 | 32.2 | 38.7 | 67.6 | 34.5 | — | 66.7 | 67.2 |
| Ingénieur | 45.3 | 65.7 | 54.5 | 51.8 | 33.7 | 50.5 | 33.3 | — | 58.2 |
| Berserker | 60.3 | 59.4 | 57.3 | 56.6 | 30.7 | 44.6 | 32.8 | 41.8 | — |

## Matrice au niveau 5 — profils équilibrés

Lire chaque ligne comme le score de la classe contre la colonne.

| Classe | Guerrier | Archer | Mage | Trooper | Paladin | Ninja | Moine | Ingénieur | Berserker |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Guerrier | — | 70.2 | 53.5 | 65.5 | 41.2 | 58.8 | 30.2 | 60.5 | 40.7 |
| Archer | 29.8 | — | 72.3 | 48.5 | 67.3 | 45.8 | 58.0 | 39.3 | 41.2 |
| Mage | 46.5 | 27.7 | — | 48.7 | 67.0 | 52.7 | 64.1 | 45.7 | 36.6 |
| Trooper | 34.5 | 51.5 | 51.3 | — | 65.5 | 51.2 | 59.8 | 52.8 | 50.0 |
| Paladin | 58.8 | 32.7 | 33.0 | 34.5 | — | 57.8 | 30.5 | 69.5 | 65.2 |
| Ninja | 41.2 | 54.2 | 47.3 | 48.8 | 42.2 | — | 70.5 | 46.0 | 55.5 |
| Moine | 69.8 | 42.0 | 35.9 | 40.2 | 69.5 | 29.5 | — | 68.5 | 59.0 |
| Ingénieur | 39.5 | 60.7 | 54.3 | 47.2 | 30.5 | 54.0 | 31.5 | — | 56.8 |
| Berserker | 59.3 | 58.8 | 63.4 | 50.0 | 34.8 | 44.5 | 41.0 | 43.2 | — |

## Matrice au niveau 10 — profils équilibrés

Lire chaque ligne comme le score de la classe contre la colonne.

| Classe | Guerrier | Archer | Mage | Trooper | Paladin | Ninja | Moine | Ingénieur | Berserker |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Guerrier | — | 70.2 | 56.3 | 69.7 | 40.7 | 59.8 | 35.2 | 58.7 | 42.2 |
| Archer | 29.8 | — | 72.3 | 43.2 | 68.2 | 46.8 | 54.5 | 36.2 | 41.5 |
| Mage | 43.7 | 27.7 | — | 49.0 | 68.0 | 48.3 | 60.7 | 42.7 | 35.0 |
| Trooper | 30.3 | 56.8 | 51.0 | — | 58.8 | 50.9 | 64.8 | 52.3 | 49.2 |
| Paladin | 59.3 | 31.8 | 32.0 | 41.2 | — | 63.2 | 31.5 | 66.7 | 66.5 |
| Ninja | 40.2 | 53.2 | 51.7 | 49.1 | 36.8 | — | 72.8 | 48.2 | 53.5 |
| Moine | 64.8 | 45.5 | 39.3 | 35.2 | 68.5 | 27.2 | — | 60.8 | 54.5 |
| Ingénieur | 41.3 | 63.8 | 57.3 | 47.7 | 33.3 | 51.8 | 39.2 | — | 58.7 |
| Berserker | 57.8 | 58.5 | 65.0 | 50.8 | 33.5 | 46.5 | 45.5 | 41.3 | — |

## Matrice au niveau 15 — profils équilibrés

Lire chaque ligne comme le score de la classe contre la colonne.

| Classe | Guerrier | Archer | Mage | Trooper | Paladin | Ninja | Moine | Ingénieur | Berserker |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Guerrier | — | 67.8 | 55.5 | 67.7 | 43.8 | 59.7 | 38.8 | 62.5 | 47.2 |
| Archer | 32.2 | — | 73.3 | 41.5 | 66.2 | 47.7 | 55.5 | 37.3 | 37.2 |
| Mage | 44.5 | 26.7 | — | 45.0 | 67.0 | 49.3 | 53.8 | 44.8 | 32.7 |
| Trooper | 32.3 | 58.5 | 55.0 | — | 59.3 | 50.0 | 68.3 | 58.5 | 49.8 |
| Paladin | 56.2 | 33.8 | 33.0 | 40.7 | — | 60.7 | 35.3 | 70.8 | 65.8 |
| Ninja | 40.3 | 52.3 | 50.7 | 50.0 | 39.3 | — | 71.3 | 48.5 | 49.7 |
| Moine | 61.2 | 44.5 | 46.2 | 31.7 | 64.7 | 28.7 | — | 58.5 | 55.2 |
| Ingénieur | 37.5 | 62.7 | 55.2 | 41.5 | 29.2 | 51.5 | 41.5 | — | 57.2 |
| Berserker | 52.8 | 62.8 | 67.3 | 50.2 | 34.2 | 50.3 | 44.8 | 42.8 | — |

## Matrice au niveau 20 — profils équilibrés

Lire chaque ligne comme le score de la classe contre la colonne.

| Classe | Guerrier | Archer | Mage | Trooper | Paladin | Ninja | Moine | Ingénieur | Berserker |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Guerrier | — | 70.3 | 61.2 | 65.7 | 41.8 | 59.3 | 37.0 | 58.8 | 39.8 |
| Archer | 29.7 | — | 69.5 | 40.8 | 63.0 | 50.5 | 50.8 | 36.7 | 42.2 |
| Mage | 38.8 | 30.5 | — | 44.0 | 65.2 | 45.8 | 51.8 | 43.3 | 34.2 |
| Trooper | 34.3 | 59.2 | 56.0 | — | 64.2 | 56.3 | 70.8 | 56.8 | 55.7 |
| Paladin | 58.2 | 37.0 | 34.8 | 35.8 | — | 59.7 | 32.8 | 69.5 | 64.3 |
| Ninja | 40.7 | 49.5 | 54.2 | 43.7 | 40.3 | — | 68.0 | 50.2 | 49.3 |
| Moine | 63.0 | 49.2 | 48.2 | 29.2 | 67.2 | 32.0 | — | 58.7 | 48.0 |
| Ingénieur | 41.2 | 63.3 | 56.7 | 43.2 | 30.5 | 49.8 | 41.3 | — | 53.8 |
| Berserker | 60.2 | 57.8 | 65.8 | 44.3 | 35.7 | 50.7 | 52.0 | 46.2 | — |

## Portée

Cette étude mesure la force en duels à niveau et rareté comparables. Elle ne valide pas le taux d’accès au Temple, les récompenses successives, les équipements sélectionnés intelligemment ou la difficulté des bots. Un avantage marqué contre une classe peut être cohérent avec une identité de contre ; une domination globale persistante mérite une vérification ciblée. Aucune constante du jeu n’a été modifiée.

Reproduction : `node balance/matrix-audit/run.mjs`, puis `python balance/matrix-audit/report.py`. Sources locales : docs/engine.js, docs/data.js et docs/balance.js de la v0.29.1 ; allocation réutilisée depuis balance/decision-audit/decisions.mjs.

## Diagnostic et suite recommandée

Avec les deux profils équilibrés, le Trooper atteint 56,7 % au niveau 20 et le Guerrier 54,2 %, contre 44,2 % pour le Mage. Le Ninja (49,5 %) et le Berserker (51,6 %) ne présentent pas de faiblesse globale dans ce cadre. Le classement diffère des carrières : le Paladin y était très performant, mais termine ici à 49,0 %.

Au niveau 20, certains affrontements dépassent 65/35 : Trooper contre Moine 70,8 %, Guerrier contre Archer 70,3 %, Archer contre Mage 69,5 %, Paladin contre Ingénieur 69,5 %. Ces écarts ne sont pas à corriger automatiquement : les avantages de classe et les pools différents font partie du modèle. Il reste à mesurer leur impact dans les choix proposés en carrière.

La sensibilité aux statistiques est majeure : contre un mélange égal des trois profils adverses, le Mage passe de 30,4 % en attaque pure à 57,5 % en endurance. Le Moine endurance atteint 58,8 %. Cela suggère de vérifier les compromis entre attaque et survie avant de modifier les dégâts propres aux classes. Ce sont des moyennes contre une population de profils imposée, pas un équilibre stratégique où chaque classe choisit son meilleur profil.

Prochaine vérification : isoler les armes, armures et familiers du Trooper et du Mage par remplacements contrôlés, conserver le Chien, puis tester les candidats en carrière sur les neuf classes. Confirmer tout ajustement sur de nouvelles graines. Aucun bonus ou nerf recommandé pour déploiement sur la seule base de cette matrice.
