# Soin du Moine à croissance réduite et combinaison des candidats

## Formules et méthode

Référence : production v0.29.1. soft : soin de 5 % des premiers 250 PV maximaux, puis 2,5 % des PV au-delà. Exemple : 200 PV → 10 soignés (inchangé) ; 300 PV → 13,75 au lieu de 15 ; 400 PV → 16,25 au lieu de 20. Il s’agit des PV maximaux après équipement. Le soin est toujours limité aux PV manquants, tous les trois tours. La règle concerne aussi la compétence copiée par Corbeau. Le seuil de 250 est une hypothèse expérimentale, pas un optimum démontré.

package : Trooper ignore 15 % de défense au lieu de 25 % lors de sa compétence ; brûlure = maximum des deux sources + 25 % du minimum lors de la compétence Mage ; Chien conserve sa réduction physique et ajoute la moitié de cet effet sur la défense magique. combined : package et soft ensemble. Aucun objet retiré.

Duels : neuf classes, 36 paires, niveaux 1/10/20, tous les croisements des trois profils après le niveau 1. 150 paires équipées par cellule, deux placements inversés ; même graine par paire entre variantes, mêmes équipements et raretés. 50 paires par rareté. Score : victoire 1, égalité 0,5. Répartition équilibrée = 50 % attaque/25 % endurance/25 % dextérité ; endurance = 25/50/25.

Carrières : 200 par classe et variante avec statistiques équilibrées et équipement automatique ; 200 supplémentaires par variante pour Trooper équilibré, Moine endurance et Mage endurance, avec sélection intelligente des objets. Bots de production, nouvelles graines appariées entre variantes. Les mécaniques expérimentales affectent tous les combattants. Aucune attente d’énergie réelle, mais coût et règles de cœurs vérifiés par assertions.

## Duels niveau 20 — balanced des deux côtés

| Classe | Actuel | Soin seul | Autres candidats | Ensemble |
|---|---:|---:|---:|---:|
| Guerrier | 56.2 % | 56.2 % | 55.8 % | 55.8 % |
| Archer | 47.8 % | 47.8 % | 47.5 % | 47.5 % |
| Mage | 44.0 % | 44.0 % | 46.2 % | 46.2 % |
| Trooper | 56.9 % | 56.9 % | 54.5 % | 54.5 % |
| Paladin | 47.6 % | 47.6 % | 48.4 % | 48.4 % |
| Ninja | 52.2 % | 52.2 % | 52.0 % | 52.0 % |
| Moine | 47.9 % | 47.9 % | 49.0 % | 49.0 % |
| Ingénieur | 47.5 % | 47.5 % | 46.8 % | 46.8 % |
| Berserker | 49.7 % | 49.7 % | 49.8 % | 49.8 % |

## Duels niveau 20 — resilient des deux côtés

| Classe | Actuel | Soin seul | Autres candidats | Ensemble |
|---|---:|---:|---:|---:|
| Guerrier | 45.4 % | 45.5 % | 44.5 % | 44.6 % |
| Archer | 48.6 % | 48.8 % | 48.1 % | 48.2 % |
| Mage | 50.2 % | 50.6 % | 53.3 % | 53.6 % |
| Trooper | 51.0 % | 51.3 % | 47.7 % | 48.0 % |
| Paladin | 51.6 % | 52.0 % | 53.0 % | 53.2 % |
| Ninja | 54.0 % | 54.1 % | 53.2 % | 53.5 % |
| Moine | 55.2 % | 53.3 % | 57.1 % | 55.4 % |
| Ingénieur | 50.8 % | 50.9 % | 50.4 % | 50.5 % |
| Berserker | 43.2 % | 43.5 % | 42.8 % | 43.0 % |

## Moine par niveau

| Profil | Niveau | Actuel | Soin seul | Autres candidats | Ensemble |
|---|---:|---:|---:|---:|---:|
| balanced | 1 | 52.2 % | 52.2 % | 53.6 % | 53.6 % |
| balanced | 10 | 49.5 % | 49.5 % | 50.6 % | 50.6 % |
| balanced | 20 | 47.9 % | 47.9 % | 49.0 % | 49.0 % |
| resilient | 1 | 52.2 % | 52.2 % | 53.6 % | 53.6 % |
| resilient | 10 | 55.4 % | 55.3 % | 56.4 % | 56.4 % |
| resilient | 20 | 55.2 % | 53.3 % | 57.1 % | 55.4 % |

## Temple — équilibré et équipement automatique

| Classe | Actuel | Soin seul | Autres candidats | Ensemble |
|---|---:|---:|---:|---:|
| Guerrier | 31.5 % | 31.5 % | 27.5 % | 27.5 % |
| Archer | 16.5 % | 16.5 % | 14.5 % | 14.5 % |
| Mage | 7.5 % | 7.5 % | 11.5 % | 11.5 % |
| Trooper | 25.0 % | 25.0 % | 27.0 % | 27.0 % |
| Paladin | 25.0 % | 25.0 % | 22.5 % | 22.5 % |
| Ninja | 16.0 % | 16.0 % | 11.5 % | 11.5 % |
| Moine | 26.5 % | 26.5 % | 26.0 % | 26.0 % |
| Ingénieur | 15.5 % | 15.5 % | 16.5 % | 16.5 % |
| Berserker | 15.0 % | 15.0 % | 13.0 % | 13.0 % |

## Temple avec sélection intelligente

| Classe / profil | Actuel | Soin seul | Autres candidats | Ensemble |
|---|---:|---:|---:|---:|
| trooper | 44.5 % | 44.5 % | 39.5 % | 39.5 % |
| monk | 54.0 % | 54.0 % | 58.0 % | 58.0 % |
| mage | 44.0 % | 44.0 % | 47.0 % | 47.0 % |

## Incertitude des différences appariées

- trooper, baseline → combined : -5.0 points Temple ; IC normal approximatif 95 % [-10.5 ; +0.5].
- trooper, package → combined : +0.0 points Temple ; IC normal approximatif 95 % [+0.0 ; +0.0].
- monk, baseline → combined : +4.0 points Temple ; IC normal approximatif 95 % [-2.3 ; +10.3].
- monk, package → combined : +0.0 points Temple ; IC normal approximatif 95 % [+0.0 ; +0.0].
- mage, baseline → combined : +3.0 points Temple ; IC normal approximatif 95 % [-3.5 ; +9.5].
- mage, package → combined : +0.0 points Temple ; IC normal approximatif 95 % [+0.0 ; +0.0].

Intervalles exploratoires sans correction pour comparaisons multiples. Les duels et les variantes partagent leurs tirages et ne sont pas indépendants. Les victoires en carrière ne sont pas des victoires à armes égales ; les adversaires sont choisis prudemment parmi les propositions. Les écarts avec les études précédentes ne sont pas des effets de traitement puisque les graines changent.

Totaux : 820,800 duels de matrice ; 9,600 carrières ; 279,836 combats de héros suivis, hors autres duels de pool et sélection.

Reproduction : `python balance/monk-scaling/run.py`, puis `python balance/monk-scaling/report.py`. Copies temporaires du code ; production inchangée. Les assertions existantes vérifient énergie, cœurs, limites de rencontres, terminaison, compteurs et répétabilité.

## Conclusion

La formule cible mieux la croissance des profils endurance : au niveau 20, le Moine passe de 55,2 à 53,3 % seul, sans changer le score équilibré de 47,9 %. Dans la combinaison des autres candidats, il passe de 57,1 à 55,4 % en endurance.

La baisse uniforme à 4,5 % testée précédemment est donc moins ciblée que cette proposition. Toutefois, la formule à seuil ne change aucun résultat Temple dans cet échantillon : les 1 800 carrières automatiques sont même intégralement identiques à la référence, ainsi que les 200 Trooper et 200 Mage avec équipement sélectionné ; 198 des 200 carrières Moine sont intégralement identiques. Les niveaux finaux ne dépassent pas 15 dans la série automatique et 14 dans les séries sélectionnées. Le seuil agit peu sur ces carrières, et ne doit pas être présenté comme une correction démontrée de leur équilibre.

Les intervalles empiriques [0 ; 0] affichés pour l’effet du soin sur le Temple signifient uniquement qu’aucune différence n’a été observée dans les paires de cet échantillon ; ils ne prouvent pas une absence d’effet dans la population.

La combinaison reste une candidate raisonnable pour une version de test : soin du Moine ralenti au-delà de 250 PV, Trooper ignorant 15 % de défense, brûlure complémentaire à 25 %, Chien conservé avec effet magique moitié puissance. Elle ne garantit pas des chances identiques d’accès au Temple. Les petits écarts de carrière des trois classes suivies avec équipement sélectionné restent incertains. Aucun changement du jeu en ligne.
