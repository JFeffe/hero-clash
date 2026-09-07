"""Independent validation seeds; never used by the calibration loop."""
import subprocess
for seed in [391027,672041,105983]:
 subprocess.run(['node','balance/simulate.mjs','n=96','items=12480','compat=1',f'seed={seed}',f'out=balance/holdout-{seed}.json'],check=True)
for engine,name in [('balance/baseline/engine.js','baseline-compatible'),('docs/engine.js','final-matched')]:
 subprocess.run(['node','balance/simulate.mjs',f'engine={engine}','n=60','items=6240','compat=1','seed=73051',f'out=balance/{name}.json'],check=True)
for engine,name in [('balance/baseline/engine.js','campaign-before'),('docs/engine.js','campaign-after')]:
 subprocess.run(['node','balance/simulate.mjs',f'engine={engine}','n=96','items=0','campaign=1','seed=816079',f'out=balance/{name}.json'],check=True)
