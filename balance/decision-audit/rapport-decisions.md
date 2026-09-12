# Hero Clash — Statistiques et choix d’équipement

**40 500 carrières complètes** sur le moteur v0.29.1, commit de production `3a26e463586ca88cbb945b6175f047647e081770`.

## Ce que ce test permet de corriger

Pour le Mage, le taux d’accès au Temple passe de **1,2 % à 15,4 %** en changeant seulement la sélection d’équipement du héros suivi, puis à **32,0 %** avec le profil équilibré. La première estimation ne permettait donc pas de conclure qu’un bonus direct à la classe était la seule correction pertinente.

Dans les variantes avec adversaires améliorés, le taux global d’accès au Temple va de **1,7 % à 2,7 %**. Une amélioration des décisions des bots doit donc être accompagnée d’un examen de la difficulté des rencontres avant publication.

Une politique unique de statistiques ne convient pas nécessairement à toutes les classes. Les tableaux distinguent l’effet des décisions du héros suivi et celui d’adversaires utilisant aussi des statistiques cohérentes et une sélection d’équipement. Aucune modification des classes, des cœurs ou du jeu publié n’est incluse.

## Plan expérimental

Neuf classes actives, **500 carrières par classe et par variante**. Six variantes font varier uniquement les décisions du héros suivi (3 répartitions × 2 gestions d’équipement). Trois variantes supplémentaires appliquent aussi la répartition et la sélection dans l’inventaire aux bots vivants. Les mêmes graines de départ sont réutilisées entre variantes ; les trajectoires divergent après les décisions.

| Profil | Répartition répétée tous les quatre points gagnés |
|---|---|
| Offensif | 4 dans l’attribut offensif principal |
| Équilibré | 2 dans l’attribut offensif, 1 Endurance, 1 Dextérité |
| Résistant | 1 dans l’attribut offensif, 2 Endurance, 1 Dextérité |

L’attribut offensif est la Force ou l’Intelligence selon la classe. La répartition est cyclique ; les proportions exactes peuvent différer à bas niveau lorsque le cycle de quatre points n’est pas terminé.

- **Automatique** : première récompense d’objet choisie, puis équipement du nouvel objet et du butin, même lorsque ce remplacement est défavorable. Référence du premier audit.
- **Sélection comparée** : conservation des objets possédés ; comparaison des récompenses proposées ; deux passes sur les quatre emplacements pour choisir parmi les objets déjà possédés. L’équipement actuel est conservé si aucun candidat ne fait mieux sur le banc d’essai. Ce n’est pas une recherche exhaustive de toutes les combinaisons.
- Le banc d’essai compte **18 duels fixes**, neuf classes au niveau du héros, chaque classe rencontrée dans les deux positions. Les mannequins utilisent des statistiques équilibrées et un équipement commun déterministe. Le score privilégie les victoires, avec les PV relatifs comme départage. Les essais n’utilisent ni le prochain adversaire réel ni la graine de son combat ; ils ne consomment pas l’aléatoire de la carrière.
- Tous les héros suivis choisissent prudemment : plus bas niveau adverse, puis avantage de classe, puis tirage au sort. Pas de reroll, même gratuit. Énergie régénérée par attente abstraite ; coût réel de 20 par match. Moteur de combat, butin, XP, pools, fantômes et progression des cœurs inchangés.
- Dans les variantes **adversaires améliorés**, les statistiques gagnées par niveau des bots sont réaffectées selon le profil dès leur arrivée dans le pool, puis recalculées aux niveaux suivants ; leur inventaire est réévalué avant chaque ronde. Les fantômes morts sont figés. Les bots continuent à prendre la **première offre d’objet**, comme le code de production : ces variantes ne constituent donc pas une symétrie parfaite avec la sélection des offres du héros suivi.

## Résultats : décisions du héros suivi

Taux d’accès au Temple, sur 500 départs par cellule. Les bots gardent leur comportement de production dans ces six variantes.

| Classe | Offensif, auto | Équilibré, auto | Résistant, auto | Offensif, sélection | Équilibré, sélection | Résistant, sélection |
|---|---:|---:|---:|---:|---:|---:|
| Guerrier | 42,6 % | 24,0 % | 12,6 % | 58,2 % | 42,6 % | 28,8 % |
| Archer | 16,0 % | 18,4 % | 20,8 % | 37,6 % | 36,2 % | 36,4 % |
| Mage | 1,2 % | 6,2 % | 22,2 % | 15,4 % | 32,0 % | 45,6 % |
| Trooper | 37,2 % | 25,4 % | 21,6 % | 50,6 % | 47,2 % | 39,2 % |
| Paladin | 24,2 % | 24,0 % | 18,0 % | 51,2 % | 49,6 % | 42,2 % |
| Ninja | 12,4 % | 11,4 % | 16,0 % | 20,0 % | 25,4 % | 25,8 % |
| Moine | 19,2 % | 19,0 % | 22,8 % | 41,8 % | 44,0 % | 48,6 % |
| Ingénieur | 13,0 % | 17,0 % | 29,6 % | 30,2 % | 36,0 % | 40,8 % |
| Berserker | 15,8 % | 13,2 % | 9,8 % | 29,0 % | 27,4 % | 28,2 % |

## Résultats avec adversaires améliorés

Le héros suivi et les bots vivants utilisent la répartition indiquée et la sélection dans l’inventaire. La sélection des nouvelles offres d’objets reste différente, comme précisé dans le protocole.

| Classe | Offensif | Équilibré | Résistant |
|---|---:|---:|---:|
| Guerrier | 3,0 % | 1,4 % | 0,4 % |
| Archer | 0,6 % | 0,8 % | 2,4 % |
| Mage | 0,2 % | 1,0 % | 6,4 % |
| Trooper | 3,4 % | 3,2 % | 2,6 % |
| Paladin | 5,6 % | 7,4 % | 5,0 % |
| Ninja | 0,0 % | 0,0 % | 0,8 % |
| Moine | 1,0 % | 2,8 % | 5,6 % |
| Ingénieur | 0,6 % | 0,4 % | 0,6 % |
| Berserker | 0,6 % | 1,8 % | 0,4 % |

## Vue d’ensemble

Les agrégats donnent le même poids aux neuf classes. L’étage moyen est le dernier étage atteint, incluant les morts précoces.

| Variante | Temple | Décès au 1er étage | Étage moyen | Matchs moyens |
|---|---:|---:|---:|---:|
| Offensif · auto | 908/4500 (20,2 %) | 44,6 % | 5,27 | 26,8 |
| Offensif · sélection | 1670/4500 (37,1 %) | 39,1 % | 7,00 | 32,8 |
| Équilibré · auto | 793/4500 (17,6 %) | 41,3 % | 5,09 | 26,1 |
| Équilibré · sélection | 1702/4500 (37,8 %) | 36,5 % | 7,07 | 33,0 |
| Résistant · auto | 867/4500 (19,3 %) | 42,2 % | 5,16 | 26,4 |
| Résistant · sélection | 1678/4500 (37,3 %) | 36,8 % | 6,99 | 32,5 |
| Offensif · sélection · bots améliorés | 75/4500 (1,7 %) | 46,1 % | 2,94 | 16,4 |
| Équilibré · sélection · bots améliorés | 94/4500 (2,1 %) | 45,3 % | 3,04 | 16,8 |
| Résistant · sélection · bots améliorés | 121/4500 (2,7 %) | 46,5 % | 3,14 | 17,0 |

## Validation de la sélection d’équipement

Un test distinct porte sur **360 inventaires**, répartis entre les neuf classes aux niveaux 1 et 10, avec six objets supplémentaires de niveaux et raretés variés. Le score est évalué contre un autre ensemble d’adversaires et d’autres graines, réservés à la vérification. Une égalité vaut une demi-victoire.

Le score moyen passe de **66,9 % à 71,2 %**. Parmi les inventaires : **160 progressent, 121 restent au même score et 79 régressent**. La sélection améliore donc la moyenne de cet échantillon, sans garantie pour chaque héros ou chaque adversaire.

| Classe | Score avant | Score après |
|---|---:|---:|
| Guerrier | 65,2 % | 68,1 % |
| Archer | 63,1 % | 67,2 % |
| Mage | 61,7 % | 68,1 % |
| Trooper | 66,5 % | 73,3 % |
| Paladin | 71,0 % | 76,7 % |
| Ninja | 68,1 % | 66,9 % |
| Moine | 71,5 % | 73,9 % |
| Ingénieur | 64,9 % | 71,8 % |
| Berserker | 70,6 % | 75,0 % |

Le Ninja ne progresse pas sur ce petit échantillon de vérification. Ce résultat doit rester visible : le banc d’essai limité ne suffit pas à certifier une politique universelle. Il n’a pas été retouché après consultation de cette vérification.

## Portée des conclusions

- Les changements de statistiques et d’équipement du héros suivi sont croisés pour distinguer leurs effets. Les variantes avec bots améliorés changent aussi les statistiques initiales des bots de niveau supérieur : leur effet ne doit pas être attribué au seul équipement.
- Les variantes sont des stratégies fixes, pas des joueurs humains optimaux. Ne pas choisir rétrospectivement le meilleur profil de chaque classe et présenter son taux comme une performance confirmée : il faudrait valider ce choix sur de nouvelles graines.
- Les différences fines entre classes ou variantes restent incertaines avec 500 carrières par cellule. Les intervalles de Wilson ci-dessous portent sur les tirages du simulateur ; ils ne couvrent pas les erreurs de modèle ou la diversité des joueurs.
- Les nouveaux comportements n’ont pas été intégrés aux bots du jeu en ligne. La comparaison répétée de combats est un outil d’audit ; avant une intégration navigateur, il faudra mesurer son coût ou construire une politique plus légère et la vérifier.
- Les règles de dix combats, montée selon les cœurs restants, puis récupération d’un cœur, sont conservées. L’entrée au Temple exige de rester vivant après dix matchs au 15e.

## Repère sur les cœurs

À titre théorique, dix duels indépendants ayant chacun 50 % de risque de défaite représentent cinq défaites attendues, alors que la récupération prévue est d’un cœur par cycle survécu. Avec cinq cœurs au départ, la probabilité de terminer ce premier cycle vivant serait de 37,7 %. Ce calcul n’est pas une estimation du moteur réel : les adversaires, les équipements et la sélection des survivants rendent les probabilités variables. Il explique toutefois pourquoi renforcer les bots peut fortement réduire les arrivées au Temple sans bug dans la montée des étages.

## Incertitude : profil équilibré avec sélection

| Classe | Bots actuels : taux [IC 95 %] | Bots améliorés : taux [IC 95 %] |
|---|---:|---:|
| Guerrier | 42,6 % [38,3 %–47,0 %] | 1,4 % [0,7 %–2,9 %] |
| Archer | 36,2 % [32,1 %–40,5 %] | 0,8 % [0,3 %–2,0 %] |
| Mage | 32,0 % [28,1 %–36,2 %] | 1,0 % [0,4 %–2,3 %] |
| Trooper | 47,2 % [42,9 %–51,6 %] | 3,2 % [2,0 %–5,1 %] |
| Paladin | 49,6 % [45,2 %–54,0 %] | 7,4 % [5,4 %–10,0 %] |
| Ninja | 25,4 % [21,8 %–29,4 %] | 0,0 % [0,0 %–0,8 %] |
| Moine | 44,0 % [39,7 %–48,4 %] | 2,8 % [1,7 %–4,6 %] |
| Ingénieur | 36,0 % [31,9 %–40,3 %] | 0,4 % [0,1 %–1,4 %] |
| Berserker | 27,4 % [23,7 %–31,5 %] | 1,8 % [0,9 %–3,4 %] |

## Vérifications techniques et reproduction

Les carrières principales représentent **1 025 397 matchs de héros** et **5 126 985 combats de pool**. À part : 56 271 564 duels d’évaluation d’équipement, témoins des lots inclus ; les tests d’inventaires sont encore distincts.

Les **4500 carrières de référence** reproduisent exactement les enregistrements correspondants du premier audit. Tous les lots vérifient les coûts, les adversaires admissibles, la limite de rencontres, les cœurs, les transitions d’étage, la terminaison et la cohérence des résultats. La sélection conserve l’inventaire et les statistiques, respecte les emplacements et n’altère pas l’aléatoire des vrais combats.

Depuis la racine du dépôt (Node.js et Python, aucune dépendance graphique requise) :

```bash
node balance/decision-audit/check-decisions.mjs
python balance/decision-audit/batch.py --per-class=500 --workers=4
python balance/decision-audit/render-report.py
```

Pour un lot isolé :

```bash
node balance/decision-audit/run.mjs --per-class=500 --classes=2 --profile=balanced --gear=smart --symmetric=false --out=/tmp/mage.json
```

Le script produit les enregistrements par carrière et les agrégats. Les graines utilisent la même formule que le premier audit : `20260913 + classe × 1000003 + index × 7919`, modulo 2³². Les fichiers de production restent inchangés.

Fichiers : [comparaison détaillée](comparison.json) · [sélection expérimentale](decisions.mjs) · [lancement des lots](batch.py).
