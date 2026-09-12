import json,pathlib
root=pathlib.Path(__file__).resolve().parent
s=json.loads((root/'comparison.json').read_text());v=s['variants'];val=s['validation']
f=lambda x,n=1:f'{x:.{n}f}'.replace('.',',')
pct=lambda x:f(x*100)+' %'
num=lambda x:f'{x:,}'.replace(',',' ')
label={'offense':'Offensif','balanced':'Équilibré','resilient':'Résistant'}
base=v['offense-automatic-hero'];smart=v['offense-smart-hero'];mix=v['balanced-smart-hero']
lines=['# Hero Clash — Statistiques et choix d’équipement','',f"**{num(s['totalCareers'])} carrières complètes** sur le moteur v{s['version']}, commit de production `{s['productionCommit']}`.",'',
'## Ce que ce test permet de corriger','',
f"Pour le Mage, le taux d’accès au Temple passe de **{pct(base['classes']['2']['retirementRate'])} à {pct(smart['classes']['2']['retirementRate'])}** en changeant seulement la sélection d’équipement du héros suivi, puis à **{pct(mix['classes']['2']['retirementRate'])}** avec le profil équilibré. La première estimation ne permettait donc pas de conclure qu’un bonus direct à la classe était la seule correction pertinente.",'',
f"Dans les variantes avec adversaires améliorés, le taux global d’accès au Temple va de **{pct(min(v[p+'-smart-both']['overall']['retirementRate'] for p in label))} à {pct(max(v[p+'-smart-both']['overall']['retirementRate'] for p in label))}**. Une amélioration des décisions des bots doit donc être accompagnée d’un examen de la difficulté des rencontres avant publication.",'',
'Une politique unique de statistiques ne convient pas nécessairement à toutes les classes. Les tableaux distinguent l’effet des décisions du héros suivi et celui d’adversaires utilisant aussi des statistiques cohérentes et une sélection d’équipement. Aucune modification des classes, des cœurs ou du jeu publié n’est incluse.','',
'## Plan expérimental','',
f"Neuf classes actives, **{s['perClassPerVariant']} carrières par classe et par variante**. Six variantes font varier uniquement les décisions du héros suivi (3 répartitions × 2 gestions d’équipement). Trois variantes supplémentaires appliquent aussi la répartition et la sélection dans l’inventaire aux bots vivants. Les mêmes graines de départ sont réutilisées entre variantes ; les trajectoires divergent après les décisions.",'',
'| Profil | Répartition répétée tous les quatre points gagnés |','|---|---|',
'| Offensif | 4 dans l’attribut offensif principal |',
'| Équilibré | 2 dans l’attribut offensif, 1 Endurance, 1 Dextérité |',
'| Résistant | 1 dans l’attribut offensif, 2 Endurance, 1 Dextérité |','',
'L’attribut offensif est la Force ou l’Intelligence selon la classe. La répartition est cyclique ; les proportions exactes peuvent différer à bas niveau lorsque le cycle de quatre points n’est pas terminé.','',
'- **Automatique** : première récompense d’objet choisie, puis équipement du nouvel objet et du butin, même lorsque ce remplacement est défavorable. Référence du premier audit.',
'- **Sélection comparée** : conservation des objets possédés ; comparaison des récompenses proposées ; deux passes sur les quatre emplacements pour choisir parmi les objets déjà possédés. L’équipement actuel est conservé si aucun candidat ne fait mieux sur le banc d’essai. Ce n’est pas une recherche exhaustive de toutes les combinaisons.',
'- Le banc d’essai compte **18 duels fixes**, neuf classes au niveau du héros, chaque classe rencontrée dans les deux positions. Les mannequins utilisent des statistiques équilibrées et un équipement commun déterministe. Le score privilégie les victoires, avec les PV relatifs comme départage. Les essais n’utilisent ni le prochain adversaire réel ni la graine de son combat ; ils ne consomment pas l’aléatoire de la carrière.',
'- Tous les héros suivis choisissent prudemment : plus bas niveau adverse, puis avantage de classe, puis tirage au sort. Pas de reroll, même gratuit. Énergie régénérée par attente abstraite ; coût réel de 20 par match. Moteur de combat, butin, XP, pools, fantômes et progression des cœurs inchangés.',
'- Dans les variantes **adversaires améliorés**, les statistiques gagnées par niveau des bots sont réaffectées selon le profil dès leur arrivée dans le pool, puis recalculées aux niveaux suivants ; leur inventaire est réévalué avant chaque ronde. Les fantômes morts sont figés. Les bots continuent à prendre la **première offre d’objet**, comme le code de production : ces variantes ne constituent donc pas une symétrie parfaite avec la sélection des offres du héros suivi.',
'', '## Résultats : décisions du héros suivi','',
'Taux d’accès au Temple, sur 500 départs par cellule. Les bots gardent leur comportement de production dans ces six variantes.','',
'| Classe | Offensif, auto | Équilibré, auto | Résistant, auto | Offensif, sélection | Équilibré, sélection | Résistant, sélection |',
'|---|---:|---:|---:|---:|---:|---:|']
for cls,c in base['classes'].items():
 cells=[v[f'{p}-{g}-hero']['classes'][cls]['retirementRate'] for g in ['automatic','smart'] for p in ['offense','balanced','resilient']]
 lines.append('| '+c['name']+' | '+' | '.join(pct(x) for x in cells)+' |')
lines+=['','## Résultats avec adversaires améliorés','',
'Le héros suivi et les bots vivants utilisent la répartition indiquée et la sélection dans l’inventaire. La sélection des nouvelles offres d’objets reste différente, comme précisé dans le protocole.','',
'| Classe | Offensif | Équilibré | Résistant |','|---|---:|---:|---:|']
for cls,c in base['classes'].items():lines.append('| '+c['name']+' | '+' | '.join(pct(v[f'{p}-smart-both']['classes'][cls]['retirementRate']) for p in ['offense','balanced','resilient'])+' |')
lines+=['','## Vue d’ensemble','',
'Les agrégats donnent le même poids aux neuf classes. L’étage moyen est le dernier étage atteint, incluant les morts précoces.','',
'| Variante | Temple | Décès au 1er étage | Étage moyen | Matchs moyens |','|---|---:|---:|---:|---:|']
for tag,data in v.items():
 p,g,scope=tag.split('-');o=data['overall'];title=label[p]+' · '+('auto' if g=='automatic' else 'sélection')+(' · bots améliorés' if scope=='both' else '')
 lines.append(f"| {title} | {o['retired']}/{o['n']} ({pct(o['retirementRate'])}) | {pct(o['firstCycleDeaths']/o['n'])} | {f(o['meanFloor'],2)} | {f(o['meanFights'])} |")
lines+=['','## Validation de la sélection d’équipement','',
f"Un test distinct porte sur **{val['snapshots']} inventaires**, répartis entre les neuf classes aux niveaux 1 et 10, avec six objets supplémentaires de niveaux et raretés variés. Le score est évalué contre un autre ensemble d’adversaires et d’autres graines, réservés à la vérification. Une égalité vaut une demi-victoire.",'',
f"Le score moyen passe de **{pct(val['heldoutAutomaticScore'])} à {pct(val['heldoutSmartScore'])}**. Parmi les inventaires : **{val['improved']} progressent, {val['equal']} restent au même score et {val['worse']} régressent**. La sélection améliore donc la moyenne de cet échantillon, sans garantie pour chaque héros ou chaque adversaire.",'',
'| Classe | Score avant | Score après |','|---|---:|---:|']
for cls,x in val['byClass'].items():lines.append(f"| {cls} | {pct(x['automatic'])} | {pct(x['smart'])} |")
lines+=['',
'Le Ninja ne progresse pas sur ce petit échantillon de vérification. Ce résultat doit rester visible : le banc d’essai limité ne suffit pas à certifier une politique universelle. Il n’a pas été retouché après consultation de cette vérification.','',
'## Portée des conclusions','',
'- Les changements de statistiques et d’équipement du héros suivi sont croisés pour distinguer leurs effets. Les variantes avec bots améliorés changent aussi les statistiques initiales des bots de niveau supérieur : leur effet ne doit pas être attribué au seul équipement.',
'- Les variantes sont des stratégies fixes, pas des joueurs humains optimaux. Ne pas choisir rétrospectivement le meilleur profil de chaque classe et présenter son taux comme une performance confirmée : il faudrait valider ce choix sur de nouvelles graines.',
'- Les différences fines entre classes ou variantes restent incertaines avec 500 carrières par cellule. Les intervalles de Wilson ci-dessous portent sur les tirages du simulateur ; ils ne couvrent pas les erreurs de modèle ou la diversité des joueurs.',
'- Les nouveaux comportements n’ont pas été intégrés aux bots du jeu en ligne. La comparaison répétée de combats est un outil d’audit ; avant une intégration navigateur, il faudra mesurer son coût ou construire une politique plus légère et la vérifier.',
'- Les règles de dix combats, montée selon les cœurs restants, puis récupération d’un cœur, sont conservées. L’entrée au Temple exige de rester vivant après dix matchs au 15e.',
'', '## Repère sur les cœurs','',
'À titre théorique, dix duels indépendants ayant chacun 50 % de risque de défaite représentent cinq défaites attendues, alors que la récupération prévue est d’un cœur par cycle survécu. Avec cinq cœurs au départ, la probabilité de terminer ce premier cycle vivant serait de 37,7 %. Ce calcul n’est pas une estimation du moteur réel : les adversaires, les équipements et la sélection des survivants rendent les probabilités variables. Il explique toutefois pourquoi renforcer les bots peut fortement réduire les arrivées au Temple sans bug dans la montée des étages.','',
'## Incertitude : profil équilibré avec sélection','',
'| Classe | Bots actuels : taux [IC 95 %] | Bots améliorés : taux [IC 95 %] |','|---|---:|---:|']
for cls,c in mix['classes'].items():
 d=v['balanced-smart-both']['classes'][cls]
 def ci(x):return f"{pct(x['retirementRate'])} [{pct(x['retirementCI95'][0])}–{pct(x['retirementCI95'][1])}]"
 lines.append(f"| {c['name']} | {ci(c)} | {ci(d)} |")
lines+=['','## Vérifications techniques et reproduction','',
f"Les carrières principales représentent **{num(s['totalPlayerMatches'])} matchs de héros** et **{num(s['totalPoolMatches'])} combats de pool**. À part : {num(s['scoringDuelsIncludingControls'])} duels d’évaluation d’équipement, témoins des lots inclus ; les tests d’inventaires sont encore distincts.",'',
f"Les **{s.get('referenceCareersExactlyReproduced',0)} carrières de référence** reproduisent exactement les enregistrements correspondants du premier audit. Tous les lots vérifient les coûts, les adversaires admissibles, la limite de rencontres, les cœurs, les transitions d’étage, la terminaison et la cohérence des résultats. La sélection conserve l’inventaire et les statistiques, respecte les emplacements et n’altère pas l’aléatoire des vrais combats.",'',
'Depuis la racine du dépôt (Node.js et Python, aucune dépendance graphique requise) :','',
'```bash','node balance/decision-audit/check-decisions.mjs','python balance/decision-audit/batch.py --per-class=500 --workers=4','python balance/decision-audit/render-report.py','```','',
'Pour un lot isolé :','',
'```bash','node balance/decision-audit/run.mjs --per-class=500 --classes=2 --profile=balanced --gear=smart --symmetric=false --out=/tmp/mage.json','```','',
'Le script produit les enregistrements par carrière et les agrégats. Les graines utilisent la même formule que le premier audit : `20260913 + classe × 1000003 + index × 7919`, modulo 2³². Les fichiers de production restent inchangés.','',
'Fichiers : [comparaison détaillée](comparison.json) · [sélection expérimentale](decisions.mjs) · [lancement des lots](batch.py).','']
(root/'rapport-decisions.md').write_text('\n'.join(lines))
print(root/'rapport-decisions.md')
