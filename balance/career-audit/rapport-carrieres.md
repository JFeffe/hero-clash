# Hero Clash — Simulation de 18 000 carrières

Version analysée : **0.29.1** · commit `3a26e463586ca88cbb945b6175f047647e081770`.

## Résultat principal

Le choix prudent des adversaires augmente le taux d’accès au Temple de **8,7 % à 20,0 %**. L’écart entre classes reste très important : **41,5 % pour le Guerrier et 1,5 % pour le Mage** avec ce profil. Ces résultats décrivent les politiques automatiques ci-dessous ; ils ne mesurent pas des builds optimisés.

Échantillon principal : **18 000 carrières**, soit **1 000 par classe et par profil**, **413 383 matchs du héros suivi** et **2 066 915 combats au total**, en incluant les quatre autres duels de chaque ronde. Chaque carrière va jusqu’au décès ou au Temple. Aucun abandon ni plafonnement artificiel des carrières.

## Protocole

- Héros neuf de niveau 1, cinq cœurs, classe fixée pour équilibrer les échantillons ; apparence et équipements tirés normalement. Neuf classes actives.
- Utilisation directe de `simulate`, `settle` et des pools de production. Neuf adversaires, trois propositions, maximum deux rencontres par adversaire ; évolution des autres membres et fantômes conservés.
- Profil **au hasard** : tirage uniforme parmi les trois propositions.
- Profil **prudent** : niveau adverse le plus bas ; à niveau égal, avantage de classe favorable avant neutre puis défavorable ; égalités départagées au hasard. Aucune simulation anticipée ni connaissance du résultat futur.
- Les deux profils suivent la même gestion automatique : points dans l’attribut offensif principal, première offre d’équipement acceptée, récompense équipée puis butin équipé. C’est la politique des copies de bots, y compris le remplacement d’un meilleur objet par un moins bon. Aucune optimisation de build ni comparaison exhaustive des objets.
- Aucun reroll de recrue ou d’adversaire, même gratuit. Aucun achat. L’attente de régénération d’énergie est abstraite : énergie remise à 100 avant chaque match, puis débit réel de 20. Les statistiques portent sur le nombre de matchs, pas sur le temps réel nécessaire pour jouer.
- Après dix combats survécus : montée du nombre de cœurs restants après le résultat, plafond au 15e ; puis récupération d’un cœur, maximum cinq. Au 15e : entrée au Temple après dix combats en restant vivant.
- Les adversaires sont générés au niveau proche du héros, sans multiplicateur de difficulté propre à l’étage. Leurs statistiques initiales sont réparties aléatoirement par le générateur ; leurs gains ultérieurs vont dans l’attribut offensif. Ces règles de production sont conservées.
- Même graine initiale pour les deux profils d’une même classe et d’un même numéro de carrière. Les trajectoires divergent après les choix. Les 1 000 carrières par classe sont l’unité statistique ; les combats d’une carrière ne sont pas traités comme indépendants.

## Comparaison des classes

Les taux portent sur 1 000 recrues par cellule. « Étage moyen » désigne le dernier étage atteint, donc le maximum de la carrière ; il inclut les morts précoces.

| Classe | Temple, hasard | Temple, prudent | Décès, prudent | Étage moyen, hasard | Étage moyen, prudent | Matchs moyens, prudent |
|---|---:|---:|---:|---:|---:|---:|
| Guerrier | 224/1 000 (22,4 %) | 415/1 000 (41,5 %) | 585/1 000 | 5,21 | 7,98 | 37,2 |
| Archer | 68/1 000 (6,8 %) | 164/1 000 (16,4 %) | 836/1 000 | 3,25 | 4,95 | 26,3 |
| Mage | 5/1 000 (0,5 %) | 15/1 000 (1,5 %) | 985/1 000 | 2,14 | 2,98 | 17,0 |
| Trooper | 171/1 000 (17,1 %) | 364/1 000 (36,4 %) | 636/1 000 | 4,66 | 7,09 | 34,0 |
| Paladin | 110/1 000 (11,0 %) | 245/1 000 (24,5 %) | 755/1 000 | 3,89 | 5,95 | 28,5 |
| Ninja | 29/1 000 (2,9 %) | 113/1 000 (11,3 %) | 887/1 000 | 2,59 | 4,05 | 22,5 |
| Moine | 55/1 000 (5,5 %) | 196/1 000 (19,6 %) | 804/1 000 | 3,23 | 5,36 | 26,5 |
| Ingénieur | 25/1 000 (2,5 %) | 122/1 000 (12,2 %) | 878/1 000 | 2,50 | 4,33 | 23,4 |
| Berserker | 97/1 000 (9,7 %) | 166/1 000 (16,6 %) | 834/1 000 | 3,61 | 4,81 | 25,4 |

## Vue d’ensemble

| Indicateur | Au hasard | Prudent |
|---|---:|---:|
| Carrières | 9 000 | 9 000 |
| Entrées au Temple | 784 (8,7 %) | 1 800 (20,0 %) |
| Décès | 8 216 (91,3 %) | 7 200 (80,0 %) |
| Décès au premier étage | 5 059 (56,2 %) | 3 919 (43,5 %) |
| Étage maximal ≥ 6 | 18,0 % | 31,7 % |
| Étage maximal ≥ 11 | 11,2 % | 24,1 % |
| Arrivée au 15e | 834 (9,3 %) | 1 887 (21,0 %) |
| Temple parmi les arrivants au 15e | 94,0 % | 95,4 % |
| Étage maximal moyen / médian | 3,45 / 1 | 5,28 / 2 |
| Matchs moyens / médians | 19,2 / 10 | 26,8 / 16 |
| 10e–90e percentiles du nombre de matchs | 6–50 | 6–63 |
| Matchs moyens des héros au Temple | 64,2 | 63,7 |
| Niveau moyen à la retraite | 12,38 | 11,56 |
| Victoires / ensemble des matchs | 69,5 % | 77,2 % |
| Matchs contre un fantôme | 12,8 % | 18,5 % |

Le taux de victoire sur l’ensemble des matchs donne plus de poids aux héros qui vivent longtemps. Il ne faut pas le confondre avec la probabilité qu’une nouvelle recrue termine sa carrière au Temple. Les taux « parmi les arrivants » décrivent une population déjà sélectionnée par la survie.

## Lecture par étage

Les héros peuvent sauter des étages : les entrées ci-dessous comptent uniquement ceux qui y commencent réellement un cycle. Les décès sont rapportés aux entrants de cet étage.

| Étage | Entrants, hasard | Décès, hasard | Entrants, prudent | Décès, prudent | Cœurs moyens à l’entrée, prudent |
|---|---:|---:|---:|---:|---:|
| 1 | 9 000 | 5 059 (56,2 %) | 9 000 | 3 919 (43,5 %) | 5,00 |
| 2 | 1 590 | 1 064 (66,9 %) | 1 726 | 960 (55,6 %) | 2,00 |
| 3 | 1 549 | 658 (42,5 %) | 2 053 | 609 (29,7 %) | 2,78 |
| 4 | 1 328 | 392 (29,5 %) | 1 928 | 389 (20,2 %) | 3,26 |
| 5 | 954 | 206 (21,6 %) | 1 513 | 273 (18,0 %) | 3,42 |
| 6 | 745 | 188 (25,2 %) | 1 268 | 205 (16,2 %) | 3,28 |
| 7 | 632 | 138 (21,8 %) | 1 029 | 151 (14,7 %) | 3,18 |
| 8 | 619 | 113 (18,3 %) | 1 019 | 133 (13,1 %) | 3,52 |
| 9 | 490 | 90 (18,4 %) | 907 | 116 (12,8 %) | 3,53 |
| 10 | 453 | 80 (17,7 %) | 907 | 80 (8,8 %) | 3,78 |
| 11 | 380 | 54 (14,2 %) | 752 | 83 (11,0 %) | 3,65 |
| 12 | 349 | 42 (12,0 %) | 692 | 87 (12,6 %) | 3,63 |
| 13 | 374 | 42 (11,2 %) | 713 | 57 (8,0 %) | 3,92 |
| 14 | 304 | 40 (13,2 %) | 669 | 51 (7,6 %) | 3,89 |
| 15 | 834 | 50 (6,0 %) | 1 887 | 87 (4,6 %) | 4,31 |

## Interprétation

1. **L’écart entre classes persiste sur une carrière complète.** Le Guerrier et le Trooper arrivent en tête dans les deux profils ; le Mage arrive dernier dans les deux. L’audit précédent de duels à niveaux fixes ne suffit donc pas à caractériser l’équilibre de progression.
2. **Le début concentre les échecs.** 43,5 % des recrues prudentes meurent au premier étage. Le cœur gagné après un cycle aide uniquement les héros qui parviennent à terminer ce cycle.
3. **Le choix d’adversaire a un effet net dans ce protocole.** Le taux d’accès au Temple augmente de 11,3 points. Le profil prudent rencontre des adversaires de niveau supérieur dans 4,0 % de ses matchs, contre 18,4 % au hasard. L’avantage de survie s’accompagne d’un niveau moyen à la retraite plus bas.
4. **Le dernier étage élimine peu des héros qui y arrivent.** 95,4 % des arrivants prudents atteignent le Temple ; ils commencent cet étage avec 4,31 cœurs en moyenne. Cela reflète à la fois la sélection des survivants, leur équipement et la récupération des cœurs ; ce n’est pas une mesure isolée de la difficulté du 15e étage.
5. **La cause précise des écarts reste à isoler.** La spécialisation des statistiques, les équipements cumulés, les récompenses, les nouveaux pools et les fantômes peuvent contribuer. Ces simulations ne permettent pas d’attribuer l’écart à une arme, à un familier ou à un coefficient particulier. Aucune correction d’équilibrage n’est incluse dans cet audit.

## Incertitude et portée

Intervalles à 95 % de Wilson pour le taux d’accès au Temple, par classe et par profil (1 000 carrières par cellule). Ils mesurent la variabilité du tirage dans ce modèle, pas l’incertitude sur le comportement réel des joueurs. Comparaisons exploratoires ; pas de correction pour tests multiples.

| Classe | Hasard : taux [IC 95 %] | Prudent : taux [IC 95 %] |
|---|---:|---:|
| Guerrier | 22,4 % [19,9 %–25,1 %] | 41,5 % [38,5 %–44,6 %] |
| Archer | 6,8 % [5,4 %–8,5 %] | 16,4 % [14,2 %–18,8 %] |
| Mage | 0,5 % [0,2 %–1,2 %] | 1,5 % [0,9 %–2,5 %] |
| Trooper | 17,1 % [14,9 %–19,6 %] | 36,4 % [33,5 %–39,4 %] |
| Paladin | 11,0 % [9,2 %–13,1 %] | 24,5 % [21,9 %–27,3 %] |
| Ninja | 2,9 % [2,0 %–4,1 %] | 11,3 % [9,5 %–13,4 %] |
| Moine | 5,5 % [4,2 %–7,1 %] | 19,6 % [17,3 %–22,2 %] |
| Ingénieur | 2,5 % [1,7 %–3,7 %] | 12,2 % [10,3 %–14,4 %] |
| Berserker | 9,7 % [8,0 %–11,7 %] | 16,6 % [14,4 %–19,0 %] |

Ce test ne couvre pas les stratégies de récompense alternatives, l’optimisation des objets, les rerolls, le multijoueur réel ou les différences de comportement entre joueurs. Les 18 000 carrières ne rendent pas ces hypothèses universelles. Les taux agrégés donnent le même poids aux neuf classes.

## Vérifications et reproduction

- Aucune modification des fichiers de production `docs/`, ni des coefficients de combat.
- Contrôles exécutés à chaque match : débit d’énergie, adversaire admissible, maximum deux rencontres, cœurs après résultat, montée avant récupération, plafond de cinq cœurs et d’étage 15, cohérence des victoires/défaites/nuls.
- Chaque carrière se termine par un décès ou le Temple. La borne de 150 matchs est un garde-fou déduit de quinze étages et d’au moins un étage gagné par cycle survécu ; aucune carrière n’a été tronquée.
- Un témoin est exécuté deux fois avec la même graine et comparé exactement sur les résultats, hors identifiants et horodatages sans influence sur les combats.
- Les lots ont été fusionnés avec vérification de la version, du commit source, de la graine, du nombre de carrières et des identifiants classe/profil.
- Les 180 carrières du pilote et les témoins de reproductibilité sont exclus des 18 000 carrières du résultat principal.

Depuis la racine du dépôt, avec Node.js :

```bash
node balance/career-audit/run.mjs --per-class=1000 --seed=20260913 --out=balance/career-audit/results.json
```

Le script produit les agrégats JSON et un fichier NDJSON par carrière. Les options `--classes=0` et `--policies=random` permettent des lots indépendants ; `--merge=CHEMIN` reconstruit le rapport JSON à partir de ces lots. Les graines sont `20260913 + classe × 1000003 + index × 7919`, modulo 2³². L’exécution de cet audit ne nécessite pas les dépendances graphiques du jeu.

Fichiers : [script de simulation](run.mjs) · [résultats détaillés](results.json).
