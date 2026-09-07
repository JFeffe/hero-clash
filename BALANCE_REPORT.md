# Hero Clash 0.6 — Rapport d’équilibrage

Mesures réalisées le 7 septembre 2026 avec le moteur JavaScript réellement utilisé par le jeu. Version de référence : v0.5, commit `ad4c7bfed07c78f70946f3d5673b8966949102e0`.

**5 481 216 combats** dans les séries comparatives et de validation conservées, en plus des essais de réglage. La Fée était effectivement dominante. Les écarts entre classes étaient également majeurs.

## Comment lire les chiffres

Le score est la proportion de victoires, avec un demi-point par match nul : `(victoires + 0,5 × nuls) / combats`. Une valeur de 50 % indique un équilibre moyen dans le protocole testé. Ce n’est ni une probabilité affichable pour un adversaire précis, ni une garantie pour tous les équipements. Les mêmes héros sont testés dans les deux positions ; les résultats sont donc corrélés. Les plages entre graines ci-dessous mesurent la stabilité observée, pas un intervalle de confiance statistique.

| Série | Combats |
| --- | --- |
| Validation indépendante : 3 graines | 2 426 112 |
| Avant/après, fixtures et graines identiques | 898 560 |
| Raretés et niveaux d’acquisition mélangés, avant/après | 718 848 |
| Fée : combinaisons et spécialisations extrêmes, avant/après | 1 437 696 |

## Classes

Les colonnes avant/après utilisent exactement les mêmes fixtures (graine 73051). La validation utilise trois nouvelles graines, jamais utilisées pour ajuster cette version finale : 391027, 672041 et 105983. Chaque classe y participe à 165 888 combats.

| Classe | Avant, comparatif | Après, comparatif | Validation | Plage entre 3 graines |
| --- | --- | --- | --- | --- |
| Guerrier | 70.9 % | 50.5 % | 50.6 % | 50.5 % – 50.7 % |
| Archer | 28.1 % | 50.2 % | 50.2 % | 50.0 % – 50.3 % |
| Mage | 54.7 % | 50.7 % | 50.9 % | 50.8 % – 51.0 % |
| Militaire | 48.6 % | 50.2 % | 50.2 % | 50.0 % – 50.3 % |
| Soldat médiéval | 84.6 % | 49.5 % | 49.7 % | 49.6 % – 49.8 % |
| Joker | 15.8 % | 51.0 % | 50.4 % | 50.2 % – 50.6 % |
| Ninja | 33.7 % | 51.1 % | 50.7 % | 50.4 % – 50.9 % |
| Moine | 42.3 % | 48.6 % | 48.4 % | 48.2 % – 48.6 % |
| Ingénieur | 45.9 % | 49.1 % | 49.1 % | 49.0 % – 49.3 % |
| Berserker | 65.1 % | 49.6 % | 49.7 % | 49.6 % – 49.8 % |
| Nécromancien | 50.4 % | 50.4 % | 50.3 % | 50.2 % – 50.4 % |
| Alien | 48.2 % | 50.6 % | 51.1 % | 51.0 % – 51.1 % |
| Boxeur | 61.6 % | 48.5 % | 48.6 % | 48.4 % – 48.9 % |

### Par niveau, validation indépendante

| Classe | Niv. 1 | Niv. 5 | Niv. 10 | Niv. 20 |
| --- | --- | --- | --- | --- |
| Guerrier | 49.6 % | 50.8 % | 51.2 % | 50.8 % |
| Archer | 49.1 % | 49.5 % | 50.9 % | 51.2 % |
| Mage | 50.9 % | 50.8 % | 50.7 % | 51.4 % |
| Militaire | 51.3 % | 50.4 % | 50.0 % | 49.2 % |
| Soldat médiéval | 49.4 % | 50.8 % | 49.8 % | 48.9 % |
| Joker | 50.0 % | 50.3 % | 50.6 % | 50.7 % |
| Ninja | 51.4 % | 51.0 % | 50.1 % | 50.2 % |
| Moine | 49.4 % | 47.7 % | 47.7 % | 48.7 % |
| Ingénieur | 49.3 % | 48.9 % | 49.2 % | 49.1 % |
| Berserker | 49.3 % | 49.2 % | 50.2 % | 50.2 % |
| Nécromancien | 49.8 % | 50.6 % | 50.3 % | 50.5 % |
| Alien | 51.7 % | 51.1 % | 50.6 % | 51.0 % |
| Boxeur | 48.9 % | 48.9 % | 48.6 % | 48.1 % |

### Avantages et désavantages

Chaque classe possède maintenant exactement **deux avantages et deux désavantages**, sans relation réciproque ni classe favorisée par le nombre de contres. Le bonus de dégâts est de **8 %**. Les 26 affrontements favorables mesurés vont de **56.2 % à 66.7 %** : un avantage compte, mais ne garantit pas la victoire.

| Classe | Avantage contre | Désavantage contre |
| --- | --- | --- |
| Guerrier | Berserker, Boxeur | Mage, Nécromancien |
| Archer | Joker, Moine | Militaire, Ninja |
| Mage | Guerrier, Soldat médiéval | Joker, Nécromancien |
| Militaire | Archer, Ninja | Moine, Ingénieur |
| Soldat médiéval | Nécromancien, Boxeur | Mage, Alien |
| Joker | Mage, Moine | Archer, Ninja |
| Ninja | Archer, Joker | Militaire, Boxeur |
| Moine | Militaire, Berserker | Archer, Joker |
| Ingénieur | Militaire, Alien | Berserker, Boxeur |
| Berserker | Ingénieur, Alien | Guerrier, Moine |
| Nécromancien | Guerrier, Mage | Soldat médiéval, Alien |
| Alien | Soldat médiéval, Nécromancien | Ingénieur, Berserker |
| Boxeur | Ninja, Ingénieur | Guerrier, Soldat médiéval |

La [matrice complète](balance/matchups.csv) contient les 156 confrontations orientées. Les cellules inverses se complètent à 100 %.

## Équipements

Comparaisons à héros identiques : mêmes statistiques, classe et trois autres équipements, seul l’objet du slot étudié change. Chaque objet affronte un autre objet tiré uniformément dans le même slot, à niveau et rareté identiques. Pour les armes, l’épée est évaluée sur les classes physiques et le bâton sur les classes magiques ; ces restrictions concernent seulement le benchmark, toutes les armes restent autorisées en jeu. Les autres armes sont évaluées sur les 13 classes.

| Équipement | Avant, comparatif | Après, comparatif | Validation | Commun | Rare |
| --- | --- | --- | --- | --- | --- |
| Épée large | 59.0 % | 51.9 % | 52.8 % | 52.8 % | 52.8 % |
| Fusil rouillé | 46.5 % | 50.3 % | 50.7 % | 50.5 % | 50.9 % |
| Arc en bois | 47.2 % | 48.8 % | 49.0 % | 48.0 % | 49.9 % |
| Bâton magique | 65.3 % | 50.6 % | 51.3 % | 50.4 % | 52.2 % |
| Lame courte | 53.0 % | 50.6 % | 51.1 % | 51.7 % | 50.5 % |
| Masse cloutée | 43.1 % | 48.2 % | 47.1 % | 47.2 % | 47.0 % |
| Armure de plates | 29.8 % | 48.8 % | 49.0 % | 49.0 % | 48.9 % |
| Veste tactique | 55.5 % | 49.1 % | 49.7 % | 49.9 % | 49.5 % |
| Tunique légère | 47.6 % | 50.8 % | 51.1 % | 49.4 % | 52.7 % |
| Cuir noir | 67.3 % | 50.6 % | 50.8 % | 52.4 % | 49.2 % |
| Loup agile | 57.6 % | 52.1 % | 51.1 % | 50.5 % | 51.7 % |
| Chien militaire | 23.8 % | 50.6 % | 49.9 % | 47.6 % | 52.1 % |
| Chat ninja | 36.3 % | 48.8 % | 48.5 % | 48.9 % | 48.2 % |
| Corbeau du chaos | 39.2 % | 51.3 % | 50.6 % | 54.5 % | 46.7 % |
| Fée curieuse | 96.0 % | 48.7 % | 49.0 % | 47.5 % | 50.5 % |
| Lunettes tactiques | 52.4 % | 50.6 % | 50.6 % | 51.4 % | 49.9 % |
| Amulette du néant | 62.3 % | 49.6 % | 49.3 % | 48.9 % | 49.8 % |
| Talisman de chance | 50.2 % | 49.9 % | 49.7 % | 50.2 % | 49.3 % |
| Potion étrange | 35.3 % | 50.0 % | 50.2 % | 49.8 % | 50.6 % |

Les colonnes Commun et Rare comparent des objets de **même rareté**, pas un objet rare à un objet commun. Les objets ne sont pas interchangeables sur chaque build : leurs synergies restent utiles.

### La Fée

Dans le comparatif standard, son score passe de **96.0 % à 48.7 %**. La validation indépendante donne **49.0 %**.

Son soin est désormais fixe : `1,9 × (1 + 0,02 × (niveau d’acquisition − 1)) × multiplicateur de rareté` PV par tour personnel. Cela donne 1,90 PV au niveau 1 commun et 3,93 PV au niveau 20 rare. Le soin est limité aux PV manquants et ne rend jamais de cœur. L’Endurance et les armures de PV ne l’amplifient plus.

Test supplémentaire : **718 848 combats par version**, couvrant toutes les 6 armes × 4 armures × 4 objets, les 13 classes, les niveaux 1/5/10/20, les trois raretés et trois spécialisations extrêmes (tous les points en Endurance, Dextérité ou statistique offensive). Chaque combinaison affronte les quatre autres familiers dans les deux positions, avec deux graines par fixture.

| Spécialisation | Fée avant | Fée après |
| --- | --- | --- |
| Tout Endurance | 98.4 % | 55.2 % |
| Tout Dextérité | 96.5 % | 53.0 % |
| Tout offensif | 87.1 % | 45.9 % |
| Ensemble | 94.0 % | 51.4 % |

Synergie restante à surveiller : sur le Soldat médiéval, la Fée obtient **64.8 %** dans ce test de remplacement du familier, contre **98.5 %** auparavant. Ce n’est pas le taux de victoire du Soldat médiéval contre les autres classes. La Fée reste un bon choix défensif, et un choix moins intéressant sur certaines classes offensives. Je conserve cette spécialisation plutôt que d’imposer 50 % à chaque combinaison.

## Modifications de règles et de valeurs

- Bases d’attaque propres aux classes, avec évolution linéaire du niveau 1 au niveau 20, pour conserver les statistiques et les choix de progression des héros existants. La base réelle est affichée dans la fiche de statistiques équipées. Un point offensif ajoute toujours 1,45 dégât avant multiplicateurs et défense.
- Rempart : bouclier de 6 % des PV maximum, contre 12 %. Paume apaisante : soin de 5 %, contre 8 %.
- Bonus universels de précision/vitesse retirés des raretés ; la rareté améliore désormais les effets propres aux objets. Masse : progression de rareté ×1 / ×1,075 / ×1,15, avec sa cadence −20 % conservée. Les autres bonus chiffrés utilisent ×1 / ×1,25 / ×1,5.
- Loup : morsure arrondie de `(4,5 + 0,3 × niveau d’acquisition) × rareté`, tous les trois tours. Chien : réduction proportionnelle de défense, puis réduction fixe de `2 × rareté`, sans défense négative.
- Corbeau : copie tous les quatre tours, avec bonus de précision de 6/7,5/9 % selon la rareté. Potion : 75 % de chances de bonus, 25 % de malus au début du duel ; amplitude selon niveau et rareté.
- Révision des valeurs de base des 19 équipements ; valeurs exactes dans `docs/data.js` et réglages dans `docs/balance.js`. Descriptions françaises/anglaises et règles mises à jour.
- Héros, statistiques investies, inventaires, cœurs, énergie, XP, points, adversaires mémorisés et sauvegardes restent conservés. Les objets existants utilisent les nouveaux effets.

## Robustesse et limites

Le scénario à équipements mélangés (65 % communs, 28 % inhabituels, 7 % rares ; acquisition entre le niveau 1 et celui du héros ; stratégies indépendantes entre adversaires) donne une plage de classes de **47.9 % à 51.4 %**, sur 359 424 combats.

La durée moyenne du comparatif passe de **22.51 s à 23.00 s** ; validation : **22.99 s**, 74.1 % de KO et 0.022 % de matchs nuls. La limite de 30 secondes reste inchangée.

Le benchmark principal équilibre les classes et les niveaux, utilise quatre slots remplis, des raretés toutes communes ou toutes rares, des acquisitions au niveau du héros et trois stratégies d’investissement. Les armes sont favorisées à 55 % selon la classe. Le scénario mélangé apporte une autre distribution, mais ne simule pas une carrière complète avec sélection des adversaires, choix intelligent du butin et mort au cinquième échec. Les niveaux inégaux et les emplacements vides ne font pas partie des mesures d’équilibre présentées. Les tests extrêmes exhaustifs concernent les synergies de la Fée ; ils ne prouvent pas l’absence de tout combo dominant parmi tous les objets.

Six suites automatisées passent : moteur, progression, récompenses, état des héros, nouvelles règles d’équilibre et rendu des textes FR/EN avec une ancienne sauvegarde. Les vérifications de rendu utilisent un hôte DOM minimal, pas un vrai téléphone ; aucune validation visuelle sur appareil n’est revendiquée.

## Reproduire

Node.js et Python 3, aucune dépendance supplémentaire. Depuis la racine du dépôt :

```sh
node --test tests/*.test.js
python balance/validate.py
node balance/fairy-stress.mjs out=balance/fairy-final.json
node balance/fairy-stress.mjs engine=balance/baseline/engine.js out=balance/fairy-before.json
python balance/report.py
```

La [synthèse JSON](balance/summary.json) conserve les effectifs, scores, strates, matrice, graines et empreintes SHA-256 du moteur et des fixtures. Le moteur v0.5 figé est conservé dans `balance/baseline/`, hors du jeu publié. Les fichiers bruts volumineux sont régénérables par les commandes ci-dessus.
