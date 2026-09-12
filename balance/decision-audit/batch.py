"""Run/merge the preregistered 3 stat profiles x 2 gear policies, plus 3 bot arms."""
import argparse, concurrent.futures, json, math, pathlib, subprocess, time
parser=argparse.ArgumentParser()
parser.add_argument('--per-class',type=int,default=500)
parser.add_argument('--workers',type=int,default=4)
parser.add_argument('--seed',type=int,default=20260913)
parser.add_argument('--shards',default='/tmp/hero-decision-shards')
parser.add_argument('--merge-only',action='store_true')
args=parser.parse_args()
assert args.per_class>0 and args.workers>0
root=pathlib.Path(__file__).resolve().parents[2]
shards=pathlib.Path(args.shards).resolve();shards.mkdir(parents=True,exist_ok=True)
classes=[0,1,2,3,4,6,7,8,9]
variants=[(p,g,False) for p in ['offense','balanced','resilient'] for g in ['automatic','smart']]+[(p,'smart',True) for p in ['offense','balanced','resilient']]
def name(p,g,s):return f'{p}-{g}-'+('both' if s else 'hero')
jobs=[(p,g,s,c) for p,g,s in variants for c in classes]
def run(job):
 p,g,s,c=job;tag=name(p,g,s)+f'-{c}'
 subprocess.run(['node','balance/decision-audit/run.mjs',f'--per-class={args.per_class}',f'--seed={args.seed}',f'--classes={c}',f'--profile={p}',f'--gear={g}',f'--symmetric={str(s).lower()}',f'--out={shards}/{tag}.json'],cwd=root,check=True,stdout=subprocess.DEVNULL)
 print('Completed',tag,flush=True)
if not args.merge_only:
 with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
  for _ in pool.map(run,jobs):pass

def wilson(k,n):
 z=1.95996398454;p=k/n;d=1+z*z/n;c=(p+z*z/(2*n))/d;e=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d
 return [max(0,c-e),min(1,c+e)]
def aggregate(data):
 n=sum(x['n'] for x in data);retired=sum(x['retired'] for x in data)
 out={k:sum(x[k] for x in data) for k in ['n','retired','dead','reached6','reached11','reached15','firstCycleDeaths','matches','wins','losses','draws','ghostFights']}
 for k in ['meanFloor','meanFights','meanFinalLevel']:out[k]=sum(x[k]*x['n'] for x in data)/n
 out['retirementRate']=retired/n;out['retirementCI95']=wilson(retired,n)
 out['winRate']=out['wins']/out['matches'];out['meanRetiredFights']=sum((x['meanRetiredFights'] or 0)*x['retired'] for x in data)/retired if retired else None
 out['meanRetiredLevel']=sum((x['meanRetiredLevel'] or 0)*x['retired'] for x in data)/retired if retired else None
 out['floors']=[]
 for idx in range(15):
  cells=[x['floors'][idx] for x in data];cell={k:sum(x[k] for x in cells) for k in ['entered','completed','deaths','matches','wins']};cell['floor']=idx+1
  for k in ['meanEntryHearts','meanEntryLevel']:cell[k]=sum((x[k] or 0)*x['entered'] for x in cells)/cell['entered'] if cell['entered'] else None
  out['floors'].append(cell)
 return out
result={'perClassPerVariant':args.per_class,'baseSeed':args.seed,'variants':{},'totalCareers':0,'totalPlayerMatches':0,'totalPoolMatches':0,'scoringDuelsIncludingControls':0}
reference=None
for p,g,s in variants:
 tag=name(p,g,s);rows={}
 for c in classes:
  data=json.loads((shards/f'{tag}-{c}.json').read_text())
  assert data['profile']==p and data['gear']==g and data['symmetric']==s
  assert data['perClassPerPolicy']==args.per_class and data['baseSeed']==args.seed
  if reference is None:reference=(data['sourceCommit'],data['version'])
  assert reference==(data['sourceCommit'],data['version'])
  rows[str(c)]=data['policies']['cautious']['classes'][str(c)]
  records=[json.loads(line) for line in (shards/f'{tag}-{c}.ndjson').read_text().splitlines()]
  assert len(records)==args.per_class and all(r['cls']==c and r['seed']==((args.seed+c*1000003+i*7919)&0xffffffff) for i,r in enumerate(records))
  assert sum(r['retired'] for r in records)==rows[str(c)]['retired']
  result['totalCareers']+=data['totalCareers'];result['totalPlayerMatches']+=data['totalPlayerMatches'];result['totalPoolMatches']+=data['totalPoolMatches'];result['scoringDuelsIncludingControls']+=data['decisionCounters']['scoringDuels']
 result['variants'][tag]={'classes':rows,'overall':aggregate(list(rows.values()))}
result['sourceCommit'],result['version']=reference
result['productionCommit']=subprocess.check_output(['git','log','-1','--format=%H','--','docs/'],cwd=root,text=True).strip()
assert subprocess.run(['git','diff','--quiet','--','docs/'],cwd=root).returncode==0
result['validation']=json.loads((root/'balance/decision-audit/selector-validation.json').read_text())
# Exact reproduction of the earlier cautious baseline when its raw records are available.
old=root/'balance/career-audit/results.ndjson'
if old.exists() and args.seed==20260913 and args.per_class<=1000:
 prior={(r['cls'],r['seed']):r for r in map(json.loads,old.read_text().splitlines()) if r['policy']=='cautious'}
 matched=0
 for c in classes:
  for r in map(json.loads,(shards/f'offense-automatic-hero-{c}.ndjson').read_text().splitlines()):
   assert r==prior[(r['cls'],r['seed'])];matched+=1
 result['referenceCareersExactlyReproduced']=matched
output=root/'balance/decision-audit/comparison.json';output.write_text(json.dumps(result,ensure_ascii=False,separators=(',',':'))+'\n')
print(json.dumps({k:result[k] for k in ['totalCareers','totalPlayerMatches','totalPoolMatches','scoringDuelsIncludingControls']}))
for tag,row in result['variants'].items():print(tag, row['overall']['retirementRate'])
