# Étude Ninja, Berserker et Mage — v0.29.1

## Méthode

252 000 simulations exécutées, dont 196 000 configurations de duel distinctes : au niveau 1, les trois profils ont les mêmes statistiques et répètent donc les mêmes essais. Chaque cellule classe/profil/niveau/intervention comprend 4 000 combats : huit adversaires équiprobables, 250 paires de héros et deux placements inversés. Les deux placements partagent la graine de combat ; ils ne sont pas indépendants.

Niveaux identiques (1, 10, 20), quatre objets tirés dans les pools autorisés, niveau des objets égal au niveau du héros. Rareté identique des deux côtés, alternant commun, uncommon, rare. Adversaires toujours équilibrés. Aucune sélection du meilleur équipement ni progression de carrière. Profils du héros : attaque pure ; équilibré (50 % attaque, 25 % endurance, 25 % dextérité) ; endurance (25 %, 50 %, 25 %). Les points sont attribués par cycles légaux, avec arrondis aux niveaux intermédiaires.

Taux = victoires / combats ; les égalités ne comptent pas comme victoires. Les graines et tirages restent identiques entre interventions. Les essais sont exploratoires, sans validation sur un nouveau lot de graines ni intervalle de confiance ; quelques points ne permettent pas de conclure à une supériorité certaine.

## Résultats sans modification

| Classe | Profil | Niveau 1 | Niveau 10 | Niveau 20 |
|---|---|---:|---:|---:|
| Ninja | offense | 50.7 % | 46.6 % | 39.2 % |
| Ninja | balanced | 50.7 % | 48.8 % | 52.3 % |
| Ninja | resilient | 50.7 % | 50.0 % | 53.6 % |
| Berserker | offense | 48.8 % | 51.0 % | 46.1 % |
| Berserker | balanced | 48.8 % | 50.0 % | 52.5 % |
| Berserker | resilient | 48.8 % | 47.1 % | 50.0 % |
| Mage | offense | 51.0 % | 37.2 % | 27.7 % |
| Mage | balanced | 51.0 % | 46.0 % | 43.6 % |
| Mage | resilient | 51.0 % | 53.2 % | 53.8 % |

## Adversaires au niveau 20, profil équilibré

Chaque taux repose sur 250 paires, jouées dans les deux sens. Les lignes des différentes classes utilisent des tirages distincts : elles ne sont pas nécessairement complémentaires.

| Adversaire | Ninja | Berserker | Mage |
|---|---:|---:|---:|
| Ninja | — | 49.6 % | 43.6 % |
| Berserker | 53.0 % | — | 35.2 % |
| Mage | 53.6 % | 65.4 % | — |
| Guerrier | 42.6 % | 60.6 % | 38.2 % |
| Archer | 56.8 % | 61.0 % | 30.8 % |
| Trooper | 43.2 % | 45.6 % | 42.2 % |
| Paladin | 44.4 % | 41.4 % | 65.8 % |
| Moine | 74.4 % | 53.2 % | 50.8 % |
| Ingénieur | 50.8 % | 43.0 % | 42.6 % |

## Interventions expérimentales, profil équilibré

Le bonus attaque ajoute 1 au terme classAttack avant multiplicateurs et défense, pas un point de Force/Intelligence. Le bonus Ninja augmente SKILL_POWER de 1,45 à 1,60. Les constantes sont modifiées uniquement en mémoire pendant les essais puis restaurées.

| Classe | Variante | Niveau 1 | Niveau 10 | Niveau 20 |
|---|---|---:|---:|---:|
| Ninja | baseline | 50.7 % | 48.8 % | 52.3 % |
| Ninja | attack+1 | 60.5 % | 55.6 % | 56.0 % |
| Ninja | skill+0.15 | 56.5 % | 54.0 % | 55.8 % |
| Berserker | baseline | 48.8 % | 50.0 % | 52.5 % |
| Berserker | attack+1 | 59.7 % | 57.1 % | 58.3 % |
| Mage | baseline | 51.0 % | 46.0 % | 43.6 % |
| Mage | attack+1 | 59.5 % | 51.8 % | 48.3 % |

## Diagnostic et recommandations

**Ninja.** Le bilan défavorable en carrière ne se retrouve pas dans les duels équiprobables équilibrés (48,8 % au niveau 10, 52,4 % au niveau 20). L’attaque pure tombe à 39,2 % au niveau 20. Sa Force sert aux dégâts malgré sa Dextérité initiale élevée. Ne pas augmenter globalement ses dégâts ni sa compétence sur cette seule base : ces essais dépassent 55 % à plusieurs niveaux. Priorité à la sélection de récompenses et aux profils des bots, puis à une validation en carrière.

**Berserker.** Proche de 50 % aux trois niveaux en profil équilibré. Un bonus fixe de 1 au terme d’attaque le fait monter à 59,7 % au niveau 1 et 58,3 % au niveau 20 : correction trop large pour les données observées. Sa compétence dépend de ses PV manquants ; cet audit ne mesure pas séparément sa contribution. Les oppositions au Paladin et à l’Ingénieur sont moins favorables à haut niveau dans cet échantillon.

**Mage.** Attaque pure : 51,0 → 37,3 → 27,7 %. Endurance : 51,0 → 53,3 → 53,8 %. Un bonus global attaque favorise aussi un départ déjà équilibré, sans résoudre le profil attaque pure à haut niveau. Le code confirme que le Chien réduit seulement la défense physique : son effet ne favorise pas directement les attaques magiques du Mage. Au niveau 20 équilibré, les configurations avec Chien gagnent 27,3 % des combats, contre 50,0 % avec Chat ; comparaison descriptive de tirages, sans remplacement contrôlé des seuls familiers. Le retrait ou l’adaptation du Chien au pool magique mérite un essai dédié.

La brûlure de compétence du Mage a une puissance fixe de 4, puis subit la défense magique ; sa baisse relative avec le niveau est une piste mécanique, pas une causalité mesurée ici.

**Ordre proposé.** 1) Tester les décisions de progression et d’équipement du Ninja et du Berserker en carrière. 2) Tester un pool de familiers pertinent pour le Mage, puis si nécessaire une brûlure évoluant avec le niveau. 3) Valider sur de nouvelles graines et sur toutes les classes avant toute mise à jour du jeu. Aucun changement de production dans cette étude.

Reproduction : `node balance/class-study/run.mjs`. Données : `results.json`. Les taux de carrière précédents sont disponibles dans `../decision-audit/comparison.json`.
