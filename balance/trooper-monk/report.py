import pathlib,json,math
p=pathlib.Path(__file__).parent;x=json.loads((p/'comparison.json').read_text());modes=['baseline','trooper','monk','both'];names=x['baseline']['matrix']['classes']
def score(mode,c,l,pr):
 rs=[r for r in x[mode]['matrix']['rows'] if r['level']==l and r['aProfile']==r['bProfile']==pr and c in [r['aClass'],r['bClass']]]
 return sum(((r['wins']+.5*r['draws'])/r['games'] if c==r['aClass'] else 1-(r['wins']+.5*r['draws'])/r['games']) for r in rs)/len(rs)*100
ls=['# Trooper et Moine — essais de compétences','','## Hypothèses et méthode','','Référence : production v0.29.1. Les propositions de brûlure et de Chien des études précédentes ne sont pas appliquées dans cet essai afin d’isoler les compétences. Tous les objets et familiers sont conservés.','', 'Trooper : sa compétence ignore 15 % de défense au lieu de 25 % (facteur 0,85 au lieu de 0,75, après pénétration de l’arme). Moine : soin de compétence de 4,5 % des PV maximaux au lieu de 5 %. Les variantes concernent aussi les compétences copiées par le Corbeau. La fréquence de compétence reste tous les trois tours. Variantes : référence, Trooper seul, Moine seul, les deux.','', 'Duels : niveaux 1/10/20, neuf classes, 36 paires, tous les croisements des trois profils après le niveau 1. 150 paires de héros par cellule, deux placements inversés, équipement aléatoire compatible, niveau et rareté identiques ; 50 paires par rareté. Graines partagées entre variantes, nouvelles par rapport aux études précédentes. Score = victoire 1, nul 0,5.','', 'Carrières : 150 par classe et variante avec profil équilibré et équipement automatique ; 150 supplémentaires pour Trooper équilibré avec sélection intelligente et 150 pour Moine endurance avec sélection intelligente. Bots de production, compétences modifiées des deux côtés, règles de cœurs et progression inchangées. Les décisions intelligentes restent expérimentales.','', '## Progression des deux classes','','| Classe / profil des deux côtés | Niveau | Actuel | Trooper | Moine | Les deux |','|---|---:|---:|---:|---:|---:|']
for c,pr in [(3,'balanced'),(3,'resilient'),(7,'balanced'),(7,'resilient')]:
 for l in [1,10,20]:
  effective='balanced' if l==1 else pr
  ls.append(f"| {names[str(c)]} / {pr} | {l} | "+' | '.join(f'{score(m,c,l,effective):.1f} %' for m in modes)+' |')
for pr in ['balanced','resilient']:
 ls+=['',f'## Toutes les classes au niveau 20 — {pr} des deux côtés','','| Classe | Actuel | Trooper | Moine | Les deux |','|---|---:|---:|---:|---:|']
 for cs,name in names.items():ls.append('| '+name+' | '+' | '.join(f'{score(m,int(cs),20,pr):.1f} %' for m in modes)+' |')
ls+=['','## Temple — équilibré et équipement automatique','','| Classe | Actuel | Trooper | Moine | Les deux |','|---|---:|---:|---:|---:|']
for cs,name in names.items():ls.append('| '+name+' | '+' | '.join(f"{100*x[m]['all']['policies']['cautious']['classes'][cs]['retirementRate']:.1f} %" for m in modes)+' |')
ls+=['','## Carrières avec sélection intelligente','','| Classe / profil | Actuel | Trooper | Moine | Les deux |','|---|---:|---:|---:|---:|']
for tag in ['trooper','monk']:
 ls.append('| '+tag+' | '+' | '.join(f"{100*x[m][tag]['policies']['cautious']['overall']['retirementRate']:.1f} %" for m in modes)+' |')
 a=[json.loads(l) for l in (p/f'baseline-{tag}.ndjson').read_text().splitlines()]
 for m in [tag,'both']:
  b=[json.loads(l) for l in (p/f'{m}-{tag}.ndjson').read_text().splitlines()];assert [r['seed'] for r in a]==[r['seed'] for r in b]
  d=[int(v['retired'])-int(u['retired']) for u,v in zip(a,b)];mean=sum(d)/len(d);se=math.sqrt(sum((v-mean)**2 for v in d)/(len(d)-1)/len(d))
  print(tag,m,'delta Temple',round(mean*100,1),'CI',round((mean-1.96*se)*100,1),round((mean+1.96*se)*100,1))
ls+=['', 'Chaque taux Temple repose sur 150 carrières. Les petits écarts restent incertains. Les profils et placements de duel partagent leurs tirages : ne pas les traiter comme indépendants. Les résultats ne valident pas des équipements optimaux en duel ni la combinaison avec les candidats Mage/Chien précédents.','',f"Totaux : {sum(v['matrix']['totalDuels'] for v in x.values()):,} duels de matrice, {sum(v[t]['totalCareers'] for v in x.values() for t in ['all','trooper','monk']):,} carrières et {sum(v[t]['totalPlayerMatches'] for v in x.values() for t in ['all','trooper','monk']):,} combats de héros suivis (hors autres duels de pool et sélection).",'', 'Exécution dans des copies temporaires. Assertions de carrière : énergie, cœurs, limites de rencontres, terminaison, compteurs, répétabilité. Aucun fichier de production modifié. Reproduction : `python balance/trooper-monk/run.py`, puis `python balance/trooper-monk/report.py`.','']
(p/'rapport.md').write_text('\n'.join(ls));print('\n'.join(ls[12:]))
