"""Run production career audits in isolated copies; never edit production files."""
import concurrent.futures, json, pathlib, shutil, subprocess, tempfile
root=pathlib.Path(__file__).resolve().parents[2]
out=root/'balance/correction-study'
jobs=[(c,p,g,False) for c in [6,9,2] for p,g in [('offense','automatic'),('balanced','automatic'),('balanced','smart')]]+[(2,'resilient',g,d) for g,d in [('automatic',False),('smart',False),('automatic',True),('smart',True)]]
def run(job):
 c,p,g,d=job; key=f'{c}-{p}-{g}-'+('no-dog' if d else 'current')
 with tempfile.TemporaryDirectory(prefix='hero-correction-') as tmp:
  work=pathlib.Path(tmp)
  # Only source modules, no sprites needed by the simulation.
  (work/'docs').mkdir()
  for f in (root/'docs').glob('*.js'): shutil.copy(f,work/'docs'/f.name)
  shutil.copytree(root/'balance/decision-audit',work/'balance/decision-audit',ignore=shutil.ignore_patterns('*.json','*.ndjson','__pycache__'))
  shutil.copy(root/'package.json',work/'package.json')
  if d:
   f=work/'docs/engine.js';s=f.read_text();old='d.slot===slot?[id]:[]';new='d.slot===slot&&!(cls===2&&id===11)?[id]:[]';assert old in s;f.write_text(s.replace(old,new))
  # Runner uses git solely to record source provenance.
  f=work/'balance/decision-audit/run.mjs';s=f.read_text();s=s.replace("execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim()",repr(subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip()));f.write_text(s)
  dest=out/(key+'.json')
  subprocess.run(['node','balance/decision-audit/run.mjs',f'--classes={c}',f'--profile={p}',f'--gear={g}','--seed=73912026','--per-class=250',f'--out={dest}'],cwd=work,check=True,stdout=subprocess.DEVNULL)
  print(key,'done',flush=True)
  return key,json.loads(dest.read_text())
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: results=dict(pool.map(run,jobs))
(out/'comparison.json').write_text(json.dumps(results,separators=(',',':')))
