# Corrections expérimentales — Hero Clash v0.29.1

3 250 carrières complètes : 250 par scénario, 13 scénarios. Nouvelles graines (base 73912026), distinctes des audits précédents. Les mêmes graines sont appariées entre variantes d’une classe ; les trajectoires divergent après une décision différente.

Les règles de carrière, les cœurs, l’énergie et le choix prudent des adversaires restent ceux de l’audit précédent. Les bots conservent leurs décisions de production. Le retrait expérimental du Chien concerne uniquement le pool du Mage, pour le héros suivi et tous les Mages bots. Les modules sont copiés dans des répertoires temporaires : aucun fichier du jeu n’est modifié.

Équipement automatic : première offre, équipement automatique. Smart : sélection expérimentale par 18 duels de référence et deux passes sur les objets possédés ; cette stratégie coûteuse n’est pas encore une fonctionnalité du jeu. Points offense : attaque pure ; balanced : 50 % attaque, 25 % endurance, 25 % dextérité ; resilient : 25 % attaque, 50 % endurance, 25 % dextérité.

## Résultats

Identifiants : 6 Ninja, 9 Berserker, 2 Mage. Les taux de victoire agrègent les combats : les longues carrières y pèsent davantage.

| Scénario | Temple | Taux Temple | Victoires | Étage moyen |
|---|---:|---:|---:|---:|
| 6-offense-automatic-current | 24/250 | 9.6 % | 71.5 % | 3.76 |
| 6-balanced-automatic-current | 28/250 | 11.2 % | 72.8 % | 4.08 |
| 6-balanced-smart-current | 64/250 | 25.6 % | 78.7 % | 5.69 |
| 9-offense-automatic-current | 37/250 | 14.8 % | 74.0 % | 4.31 |
| 9-balanced-automatic-current | 37/250 | 14.8 % | 73.7 % | 4.31 |
| 9-balanced-smart-current | 80/250 | 32.0 % | 80.2 % | 5.96 |
| 2-offense-automatic-current | 5/250 | 2.0 % | 65.7 % | 2.94 |
| 2-balanced-automatic-current | 22/250 | 8.8 % | 73.0 % | 4.31 |
| 2-balanced-smart-current | 75/250 | 30.0 % | 80.2 % | 6.15 |
| 2-resilient-automatic-current | 53/250 | 21.2 % | 78.4 % | 5.73 |
| 2-resilient-smart-current | 115/250 | 46.0 % | 84.8 % | 8.00 |
| 2-resilient-automatic-no-dog | 75/250 | 30.0 % | 80.4 % | 6.67 |
| 2-resilient-smart-no-dog | 127/250 | 50.8 % | 85.8 % | 8.82 |

## Comparaisons appariées

- 6-offense-automatic-current → 6-balanced-automatic-current : +1.6 points ; IC approximatif à 95 % de la différence appariée [-3.0 ; +6.2].
- 6-balanced-automatic-current → 6-balanced-smart-current : +14.4 points ; IC approximatif à 95 % de la différence appariée [+8.7 ; +20.1].
- 9-offense-automatic-current → 9-balanced-automatic-current : +0.0 points ; IC approximatif à 95 % de la différence appariée [-5.2 ; +5.2].
- 9-balanced-automatic-current → 9-balanced-smart-current : +17.2 points ; IC approximatif à 95 % de la différence appariée [+11.2 ; +23.2].
- 2-resilient-automatic-current → 2-resilient-automatic-no-dog : +8.8 points ; IC approximatif à 95 % de la différence appariée [+2.9 ; +14.7].
- 2-resilient-smart-current → 2-resilient-smart-no-dog : +4.8 points ; IC approximatif à 95 % de la différence appariée [-1.9 ; +11.5].

Les intervalles utilisent la variance entre les 250 différences de résultats de carrière appariés et une approximation normale, sans correction pour comparaisons multiples. Ils sont exploratoires ; les combats individuels ne sont pas considérés indépendants.

## Décision

Ninja : l’amélioration du choix d’équipement est plus convaincante que le seul passage à des statistiques équilibrées. Berserker : la répartition équilibrée seule ne change pas le taux Temple observé ; le choix d’équipement apporte l’amélioration principale.

Mage : le profil endurance et la sélection d’équipement restent les premières pistes. Le retrait du Chien est comparé séparément dans les deux modes d’équipement. Retirer un objet change la distribution de tous les tirages de familiers et les trajectoires de carrière ; l’effet ne peut pas être attribué au seul remplacement d’un Chien à équipement constant.

Ces essais ne justifient pas un bonus général de dégâts. Ils ne valident pas non plus le déploiement du sélecteur expérimental pour tous les bots : le précédent audit montrait une forte hausse de difficulté dans ce cas. Une implémentation destinée au joueur devrait préserver ses choix, par exemple avec des recommandations explicites, et être évaluée pour sa vitesse sur mobile.

Vérifications : 3 250 carrières terminées, assertions du moteur d’audit (énergie, cœurs, dix combats, limite d’adversaires, mort/Temple), répétabilité interne par scénario et absence de Chien dans les inventaires initiaux des Mages du scénario filtré. Production inchangée.

Reproduction : `python balance/correction-study/run.py`. Résultats agrégés : `comparison.json`. Les fichiers NDJSON locaux contiennent les carrières individuelles.
