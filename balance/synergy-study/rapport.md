# Synergies brûlure et Chien — v0.29.1

## Variantes et protocole

baseline : production. burn : lors d’une compétence de Mage (y compris copiée par Corbeau), additionner la puissance de brûlure de l’arme et les 4 points de compétence, au lieu de prendre leur maximum. Conserver le maximum entre cette nouvelle puissance et la brûlure déjà active ; les coups suivants peuvent rafraîchir cette puissance, comme dans la logique actuelle. Il ne s’agit pas de deux effets avec des durées indépendantes.

dog : conserver intégralement la réduction de défense physique du Chien et ajouter une réduction magique égale à la moitié de son effet (part proportionnelle et part fixe). Cela bénéficie aussi aux dégâts magiques secondaires des classes physiques. both : les deux variantes combinées. Aucun objet retiré.

Copies temporaires des modules de production. Les modifications s’appliquent aux deux combattants et aux bots. Matrices : 36 paires de classes, niveaux 1/10/20, neuf combinaisons de profils après le niveau 1, 150 paires équipées par cellule jouées dans les deux sens. Même niveau et rareté, objets aléatoires compatibles. Graines nouvelles partagées entre variantes. Score de duel : victoire 1, nul 0,5.

Carrières : 150 par classe/variante avec profil équilibré et équipement automatique ; 150 supplémentaires par variante pour le Mage endurance avec sélection intelligente d’équipement. Bots avec décisions de production ; règles de cœurs, énergie et progression inchangées. Même graine de départ par carrière entre variantes, mais trajectoires et tirages ultérieurs peuvent diverger.

## Duels au niveau 20 — deux profils équilibrés

| Classe | Actuel | Brûlure | Chien | Les deux |
|---|---:|---:|---:|---:|
| Guerrier | 56.2 % | 55.9 % | 55.1 % | 54.8 % |
| Archer | 47.5 % | 47.3 % | 47.2 % | 46.9 % |
| Mage | 44.6 % | 46.9 % | 46.1 % | 49.1 % |
| Trooper | 56.0 % | 55.5 % | 55.1 % | 54.5 % |
| Paladin | 46.4 % | 46.1 % | 47.3 % | 46.9 % |
| Ninja | 50.3 % | 50.0 % | 49.8 % | 49.5 % |
| Moine | 48.0 % | 47.8 % | 49.3 % | 48.9 % |
| Ingénieur | 48.8 % | 48.7 % | 48.3 % | 48.0 % |
| Berserker | 52.2 % | 51.9 % | 51.7 % | 51.4 % |

## Temple — profils équilibrés, équipement automatique

| Classe | Actuel | Brûlure | Chien | Les deux |
|---|---:|---:|---:|---:|
| Guerrier | 24.7 % | 22.0 % | 27.3 % | 18.7 % |
| Archer | 13.3 % | 13.3 % | 14.0 % | 14.7 % |
| Mage | 8.7 % | 10.7 % | 9.3 % | 13.3 % |
| Trooper | 26.0 % | 27.3 % | 24.7 % | 24.7 % |
| Paladin | 23.3 % | 16.7 % | 28.7 % | 28.0 % |
| Ninja | 12.7 % | 15.3 % | 12.0 % | 13.3 % |
| Moine | 26.0 % | 24.7 % | 24.7 % | 20.0 % |
| Ingénieur | 24.0 % | 20.7 % | 20.0 % | 15.3 % |
| Berserker | 14.0 % | 14.0 % | 13.3 % | 16.7 % |

## Mage endurance avec sélection d’équipement

| Variante | Temple | Victoires en carrière |
|---|---:|---:|
| baseline | 74/150 (49.3 %) | 85.8 % |
| burn | 95/150 (63.3 %) | 88.3 % |
| dog | 78/150 (52.0 %) | 86.0 % |
| both | 94/150 (62.7 %) | 88.1 % |

## Incertitude sur le Temple du Mage endurance

- burn : +14.0 points, IC normal apparié approximatif à 95 % [+5.9 ; +22.1].
- dog : +2.7 points, IC normal apparié approximatif à 95 % [-4.3 ; +9.6].
- both : +13.3 points, IC normal apparié approximatif à 95 % [+4.3 ; +22.4].

Intervalles exploratoires sans correction de comparaisons multiples. Les duels et placements ne sont pas indépendants ; ne pas convertir leur nombre en certitude sur les carrières. Les taux de victoire de carrière pondèrent davantage les longs survivants.

Totaux : 820,800 duels de matrice, 6,000 carrières, 170,128 combats de héros suivis. Les duels supplémentaires de pool et de sélection d’équipement sont exclus du premier total.

Reproduction : `python balance/synergy-study/run.py`, puis `python balance/synergy-study/report.py`. Assertions du lanceur de carrière : énergie, cœurs, limite de rencontres, fin de carrière, compteurs, reproductibilité. Aucun fichier de production modifié.

## Conclusion

Ne pas déployer l’addition complète des brûlures en l’état : elle améliore le Mage équilibré, mais renforce aussi nettement le Mage endurance avec sélection d’équipement (49,3 à 63,3 % Temple). Ce résultat n’établit pas à lui seul un seuil absolu de surpuissance, mais justifie une version plus modérée avant intégration.

Le Chien avec un effet magique à 50 % reste le candidat le plus prudent : le Mage équilibré atteint 46,1 % contre 44,6 % en duel au niveau 20. L’effet sur son Temple optimisé (49,3 à 52,0 %) est incertain. Les changements affectent aussi les autres classes : vérifier les spécialisations et les combinaisons optimisées avant de retenir la règle.

Une prochaine variante pourrait additionner seulement une fraction du bonus de brûlure lors de la compétence, en précisant la durée du bonus. Aucun changement n’est appliqué au jeu en ligne.
