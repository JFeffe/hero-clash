import concurrent.futures,json,pathlib,shutil,subprocess,tempfile
root=pathlib.Path(__file__).resolve().parents[2];out=root/'balance/partial-synergy'
def execute(mode):
 with tempfile.TemporaryDirectory(prefix='hero-synergy-') as tmp:
  w=pathlib.Path(tmp);(w/'docs').mkdir()
  for f in (root/'docs').glob('*.js'):shutil.copy(f,w/'docs'/f.name)
  shutil.copy(root/'package.json',w/'package.json')
  for name in ['decision-audit','matrix-audit']:
   shutil.copytree(root/'balance'/name,w/'balance'/name,ignore=shutil.ignore_patterns('*.json','*.ndjson','__pycache__'))
  f=w/'docs/engine.js';s=f.read_text()
  if mode in ['burn','both']:
   old='Math.max(q.burn>0?q.burnPower:0,p.ignite,skill&&sc===2?4:0)'
   new='Math.max(q.burn>0?q.burnPower:0,Math.max(p.ignite,skill&&sc===2?4:0)+.25*Math.min(p.ignite,skill&&sc===2?4:0))'
   assert s.count(old)==1;s=s.replace(old,new)
  if mode in ['dog','both']:
   old="add(actions,'weaken',1-i);"
   new="f[1-i].magicDefense=Math.max(0,f[1-i].magicDefense*(1-f[i].pet_value*.5)-B.dogFlatShred*.5*(1+f[i].pet_rarity*.25));"+old
   assert s.count(old)==1;s=s.replace(old,new)
  f.write_text(s)
  f=w/'balance/matrix-audit/run.mjs';s=f.read_text().replace('levels=[1,5,10,15,20],n=300,baseSeed=130920261','levels=[1,10,20],n=150,baseSeed=3113092026');f.write_text(s)
  subprocess.run(['node','balance/matrix-audit/run.mjs'],cwd=w,check=True,stdout=subprocess.DEVNULL)
  result={'matrix':json.loads((w/'balance/matrix-audit/results.json').read_text())}
  print(mode,'duels complete',flush=True)
  f=w/'balance/decision-audit/run.mjs';s=f.read_text().replace("execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim()",repr(subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip()));f.write_text(s)
  for tag,classes,profile,gear in [('all','0,1,2,3,4,6,7,8,9','balanced','automatic'),('mage','2','resilient','smart')]:
   dest=out/f'{mode}-{tag}.json'
   subprocess.run(['node','balance/decision-audit/run.mjs',f'--classes={classes}',f'--profile={profile}',f'--gear={gear}','--per-class=250','--seed=3213092026',f'--out={dest}'],cwd=w,check=True,stdout=subprocess.DEVNULL)
   result[tag]=json.loads(dest.read_text());print(mode,tag,'careers complete',flush=True)
  (out/f'{mode}.json').write_text(json.dumps(result,separators=(',',':')))
  return mode,result
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:results=dict(pool.map(execute,['baseline','burn','dog','both']))
(out/'comparison.json').write_text(json.dumps(results,separators=(',',':')))
