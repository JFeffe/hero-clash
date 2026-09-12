# Refonte des équipements — version 0.29.0

Statut : intégration validée pour publication en version 0.29.0. Voir `ART_EQUIPMENT.md` pour les effets visuels et les vérifications.

## Catalogue et accès

Quatre emplacements indépendants : arme, armure, familier, objet. Chaque recrue commence avec un équipement commun dans chacun. Les six familiers et les six objets sont communs à toutes les classes actives. Les armes et armures utilisent les listes ci-dessous pour le recrutement, les récompenses, le butin, l'inventaire, les adversaires et les outils de test.

| Classe | Attribut / attaque | Armes | Armures |
|---|---|---|---|
| Guerrier | Force / corps à corps | Épée, dague, marteau de guerre | Cuir, tunique, mailles, veste renforcée, plates |
| Archer | Force / distance | Arc court, arc long, arbalète | Cuir, tunique, mailles, veste renforcée, veste tactique |
| Mage | Intelligence / distance | Bâton magique, baguette de braise, orbe de foudre | Tunique, robe runique, robe de protection |
| Trooper | Force / distance | Fusil, pistolets, arbalète | Veste renforcée, veste tactique, mailles |
| Paladin | Intelligence / corps à corps | Épée, marteau de guerre, bâton magique | Mailles, veste renforcée, plates |
| Ninja | Force / corps à corps | Dague, sabre, bâton de combat | Cuir, tunique |
| Moine | Intelligence / corps à corps | Bâton de combat, cestes | Tunique, robe runique, robe de protection |
| Ingénieur | Force / distance | Fusil, arbalète, pistolets | Cuir, tunique, veste renforcée, veste tactique |
| Berserker | Force / corps à corps | Épée, hache de guerre, marteau de guerre | Cuir, veste renforcée, mailles |

En attente : Joker, Nécromancien, Alien, Boxeur. Leurs identifiants et anciens dessins sont conservés, mais les générateurs et sélecteurs ne les proposent plus.

15 armes + 8 armures + 6 familiers + 6 objets = 35 équipements. Les 16 ajouts sont les IDs 19 à 34 de `docs/data.js`. Un ID désigne le même modèle, les mêmes effets et, après intégration graphique, le même sprite pour toutes les classes compatibles. Aucun shuriken ni lance.

## Combat

- La classe impose l'attribut offensif et la portée. Le bâton magique reste une arme de corps à corps chez le Paladin. Aucun calcul de déplacement ou avantage d'initiative lié à la portée.
- Force : +1,45 dégât de base des classes physiques et +0,8 résistance physique par point pour tous.
- Intelligence : +1,45 dégât de base des classes magiques et +0,8 résistance magique par point pour tous.
- Endurance : +14 PV et +0,6 aux deux résistances par point.
- Brûlure magique et saignement physique : durée de deux tours personnels ; rafraîchissement sans charges supplémentaires, puissance la plus forte conservée tant que l'effet reste actif.
- Tous les dégâts traversent les boucliers avant les PV, y compris les effets périodiques, la morsure et la tourelle. Le marteau inflige 50 % de dégâts supplémentaires aux boucliers.
- Précision puis annulation : deux vérifications successives distinctes. Pénétration plafonnée à 75 %, réduction à distance plafonnée à 50 %.
- Deux avantages et deux désavantages de classe par héros actif. Le graphe a été redistribué pour neuf classes ; le multiplicateur reste +8 %.

## Vérification et limites

`npm test` vérifie les systèmes existants ainsi que les nouvelles restrictions, les quatre emplacements, les nouveaux effets, les sauvegardes, les plafonds de statuts et l'absorption des dégâts secondaires.

`npm run balance` reproduit 54 000 duels de vérification : 500 par paire de classes, aux niveaux 1, 10 et 20, côtés alternés, graine 20260912 + niveau, trois raretés représentées également, équipement uniforme dans les pools autorisés et points de progression répartis aléatoirement. Une égalité vaut un demi-point. Les résultats détaillés sont dans `balance/equipment-audit.json`.

Après recalibrage sur d'autres graines, scores observés : 47,13 à 52,20 %. Cela valide une première moyenne des classes, pas l'équivalence de chaque objet ni l'absence de combinaisons dominantes. Les équipements optimisés et les décisions humaines restent à tester en jeu.

## Sauvegardes et publication

Le nouveau marqueur `equipment-v1` initialise une partie vide à l'ouverture d'une ancienne sauvegarde, en conservant seulement la langue. Les anciens exports ne sont pas restaurables dans cette version ; les sauvegardes du nouveau jeu sont conservées aux rechargements suivants. La version 0.29.0 utilise une clé de stockage distincte : l'ancienne sauvegarde reste intacte dans le navigateur, et la nouvelle progression est enregistrée séparément.

Les sprites sont maintenant intégrés : armes partagées, quatre nouvelles armures, tortue animée et six objets visibles à la ceinture. Les 23 tests automatisés passent ; les 30 atlas chargent et 1 080 rendus de production ont été vérifiés. Un essai interactif PC/mobile reste à faire.
