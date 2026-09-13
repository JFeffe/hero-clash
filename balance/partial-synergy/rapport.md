# Synergies brûlure et Chien — v0.29.1

## Variantes et protocole

baseline : production. burn : lors d’une compétence de Mage (y compris copiée par Corbeau), prendre le maximum entre la puissance de brûlure de l’arme et les 4 points de compétence, puis ajouter 25 % du minimum. Conserver le maximum entre cette nouvelle puissance et la brûlure déjà active ; les coups suivants peuvent rafraîchir cette puissance, comme dans la logique actuelle. Il ne s’agit pas de deux effets avec des durées indépendantes.

dog : conserver intégralement la réduction de défense physique du Chien et ajouter une réduction magique égale à la moitié de son effet (part proportionnelle et part fixe). Cela bénéficie aussi aux dégâts magiques secondaires des classes physiques. both : les deux variantes combinées. Aucun objet retiré.

Copies temporaires des modules de production. Les modifications s’appliquent aux deux combattants et aux bots. Matrices : 36 paires de classes, niveaux 1/10/20, neuf combinaisons de profils après le niveau 1, 150 paires équipées par cellule jouées dans les deux sens. Même niveau et rareté, objets aléatoires compatibles. Graines nouvelles partagées entre variantes. Score de duel : victoire 1, nul 0,5.

Carrières : 250 par classe/variante avec profil équilibré et équipement automatique ; 250 supplémentaires par variante pour le Mage endurance avec sélection intelligente d’équipement. Bots avec décisions de production ; règles de cœurs, énergie et progression inchangées. Même graine de départ par carrière entre variantes, mais trajectoires et tirages ultérieurs peuvent diverger.

## Duels au niveau 20 — deux profils équilibrés

| Classe | Actuel | Brûlure | Chien | Les deux |
|---|---:|---:|---:|---:|
| Guerrier | 56.0 % | 56.0 % | 55.3 % | 55.2 % |
| Archer | 48.3 % | 48.1 % | 47.8 % | 47.7 % |
| Mage | 43.5 % | 44.2 % | 44.8 % | 45.6 % |
| Trooper | 57.5 % | 57.4 % | 56.4 % | 56.2 % |
| Paladin | 48.4 % | 48.1 % | 50.1 % | 49.7 % |
| Ninja | 50.5 % | 50.4 % | 49.7 % | 49.7 % |
| Moine | 48.6 % | 48.6 % | 50.3 % | 50.3 % |
| Ingénieur | 48.0 % | 47.9 % | 47.1 % | 47.1 % |
| Berserker | 49.3 % | 49.2 % | 48.5 % | 48.4 % |

## Duels au niveau 20 — deux profils endurance

| Classe | Actuel | Brûlure | Chien | Les deux |
|---|---:|---:|---:|---:|
| Guerrier | 46.7 % | 46.7 % | 45.7 % | 45.7 % |
| Archer | 49.6 % | 49.4 % | 48.8 % | 48.7 % |
| Mage | 49.3 % | 49.9 % | 51.1 % | 51.7 % |
| Trooper | 50.3 % | 50.2 % | 49.3 % | 49.3 % |
| Paladin | 50.9 % | 50.9 % | 52.2 % | 52.1 % |
| Ninja | 50.7 % | 50.6 % | 50.0 % | 49.9 % |
| Moine | 56.0 % | 55.9 % | 57.5 % | 57.3 % |
| Ingénieur | 53.7 % | 53.6 % | 53.2 % | 53.1 % |
| Berserker | 42.8 % | 42.8 % | 42.2 % | 42.2 % |

## Temple — profils équilibrés, équipement automatique

| Classe | Actuel | Brûlure | Chien | Les deux |
|---|---:|---:|---:|---:|
| Guerrier | 29.2 % | 26.8 % | 24.0 % | 22.0 % |
| Archer | 17.2 % | 15.6 % | 14.4 % | 14.0 % |
| Mage | 6.0 % | 8.0 % | 9.6 % | 10.8 % |
| Trooper | 24.0 % | 24.4 % | 24.8 % | 23.2 % |
| Paladin | 22.8 % | 20.8 % | 23.6 % | 22.8 % |
| Ninja | 8.4 % | 9.2 % | 10.8 % | 9.2 % |
| Moine | 19.6 % | 18.8 % | 21.2 % | 20.0 % |
| Ingénieur | 16.8 % | 18.0 % | 16.4 % | 18.4 % |
| Berserker | 16.4 % | 14.8 % | 18.0 % | 16.0 % |

## Mage endurance avec sélection d’équipement

| Variante | Temple | Victoires en carrière |
|---|---:|---:|
| baseline | 114/250 (45.6 %) | 84.5 % |
| burn | 116/250 (46.4 %) | 84.9 % |
| dog | 105/250 (42.0 %) | 83.7 % |
| both | 107/250 (42.8 %) | 83.9 % |

## Incertitude sur le Temple du Mage endurance

- burn : +0.8 points, IC normal apparié approximatif à 95 % [-2.1 ; +3.7].
- dog : -3.6 points, IC normal apparié approximatif à 95 % [-8.2 ; +1.0].
- both : -2.8 points, IC normal apparié approximatif à 95 % [-8.3 ; +2.7].

Intervalles exploratoires sans correction de comparaisons multiples. Les duels et placements ne sont pas indépendants ; ne pas convertir leur nombre en certitude sur les carrières. Les taux de victoire de carrière pondèrent davantage les longs survivants.

Totaux : 820,800 duels de matrice, 10,000 carrières, 267,087 combats de héros suivis. Les duels supplémentaires de pool et de sélection d’équipement sont exclus du premier total.

Reproduction : `python balance/partial-synergy/run.py`, puis `python balance/partial-synergy/report.py`. Assertions du lanceur de carrière : énergie, cœurs, limite de rencontres, fin de carrière, compteurs, reproductibilité. Aucun fichier de production modifié.

## Décision proposée

La synergie de brûlure à 25 % est une candidate plus modérée que l’addition complète. Exemple commun niveau 1 : puissance 4,75 au lieu de 4 actuellement ou 7 avec addition complète. Le bonus ne crée pas de cumul croissant à chaque coup ; la durée existante de deux tours adverses est rafraîchie et la puissance active maximale est conservée.

La combinaison aide le Mage équilibré : 43,5 à 45,6 % en duel au niveau 20 et 6,0 à 10,8 % Temple avec décisions automatiques. Le Mage endurance avec sélection d’équipement passe de 45,6 à 42,8 % Temple ; l’intervalle de différence inclut zéro. Ce résultat ne prouve ni une amélioration ni une dégradation dans ce scénario, mais ne reproduit pas la hausse de la brûlure complète.

Ces modifications affectent les bots et la sélection expérimentale des objets ; les gains en duel ne garantissent donc pas des gains de carrière. Les résultats précédents sur d’autres graines ne doivent pas être comparés comme des variantes appariées.

La candidate combinée est raisonnable pour une intégration à examiner, mais pas une validation globale d’équilibrage : Trooper équilibré 56,2 % et Moine endurance 57,3 % restent des points à surveiller. Aucun nerf supplémentaire ni modification des règles de progression ne découle automatiquement de ces chiffres. Aucun changement du jeu en ligne.
