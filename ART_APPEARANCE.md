# Combat Heroes — v0.11.0 — Apparences du Guerrier

Le Guerrier peut maintenant avoir une identité visuelle distincte de son équipement : trois visages masculins, trois visages féminins et quatre coiffures utilisables avec chaque visage, soit 24 apparences. Les visages proposent aussi trois teints. La couleur des cheveux est liée à la coiffure dans cette première version.

Les choix se trouvent au recrutement et dans la fiche du Guerrier. Ils sont conservés dans la sauvegarde, les portraits, les combats et les carrières au cimetière. Les nouvelles recrues et les nouveaux adversaires reçoivent une apparence aléatoire. Les anciens Guerriers gardent leur dessin initial jusqu'à une première personnalisation. Le nom saisi au recrutement et la position de défilement sont préservés lors d'un changement d'apparence.

Les six armes, les quatre armures et le mode sans arme restent compatibles. Le corps en armure est commun aux hommes et aux femmes ; l'identité repose pour cette étape sur le visage et les cheveux. La personnalisation des autres classes est une prochaine étape : le modèle de données est commun, mais leurs dessins et contrôles ne sont pas encore adaptés.

## Essai

Ouvrir `docs/warrior-preview.html` pour combiner genre, visage, coiffure, équipement, animation et direction sans toucher à une partie. Dans le jeu, les outils de prototype des options permettent de préparer directement un Guerrier pour tester le recrutement.

## Intégration

- `docs/appearance.js` : identité commune, bornes et validation des sauvegardes.
- `docs/warrior-identity.js` : raccords de tête, préparation des corps et harmonisation de la peau exposée au chargement.
- `docs/assets/warrior-heads-v1.png` : planche de 24 têtes, créée avec la génération d'images intégrée ; fond vert retiré au chargement.
- Le corps original est conservé. Le compositeur retire sa tête dans des copies en mémoire puis place la variante choisie. Les changements d'apparence n'utilisent aucun tirage de combat et ne modifient aucune statistique.
- Cette branche est basée sur la version principale 0.9.0. La mise à jour des équipements du Mage (PR #1, version 0.10.0) demeure séparée et n'est pas incluse.

## Validation

Dix suites Node réussies. 8 064 combinaisons identité / équipement (dont sans arme) / pose / direction vérifiées pour le dessin et les coordonnées. Tests de conservation des résultats de combat, validation d'import, anciennes sauvegardes, recrutement, nom, défilement et contrôles français/anglais. Inspection avec le moteur Canvas des 24 apparences au repos et des six poses sur quatre armures. Les contrôles mobiles sont dimensionnés pour le tactile ; aucun test sur un vrai téléphone n'a été réalisé. L'aperçu local était inaccessible au navigateur distant.

## Prompt de création de la planche

Outil : génération d'images intégrée. Référence de style : `warrior-armors-v1.webp`.

> Create a production sprite atlas for this existing fantasy game. Reference image is STYLE ONLY: match its beautifully detailed pixel-art, dark outlines, warm shading, three-quarter view facing RIGHT. NEW IMAGE: 1536 wide by 2048 high, exactly FOUR equal columns and SIX equal rows (24 isolated HEADS ONLY). Uniform flat vivid green #00ff00 background, no shadows, no text, no grid lines. Every cell has ONE complete head, same scale and exact same placement: head with hair occupies central 65% width, 70% height, chin at 82% cell height, eyes at 50% cell height. No neck, no shoulders, no clothing. All heads face three-quarter RIGHT, eyes look RIGHT, calm determined expressions. SIX ROWS represent SIX adult identities: row1 man fair skin square jaw strong brow clean shaven; row2 man medium brown skin rounded nose broad face clean shaven; row3 man dark brown skin angular long face clean shaven; row4 woman fair skin oval face defined brows; row5 woman medium brown skin broad cheekbones round face; row6 woman dark brown skin angular face full lips. In EACH ROW repeat the EXACT SAME face and skin shade FOUR TIMES, varying ONLY hairstyle across columns: column1 short swept-back textured chestnut hair, column2 black curly rounded crop with visible curls, column3 long golden blonde hair tied into a high ponytail behind the head with short framing bangs, column4 silver white jaw-length bob parted to one side. ALL FOUR hairstyles available to BOTH men and women, same cut per column. No beards, no helmets, no earrings. Preserve clean silhouettes with room between every head. These heads will be composited directly on the armor bodies, so match reference style, adult heroic features and proportions. Avoid photorealism, avoid huge eyes, avoid cute baby faces. Every head fits entirely inside its cell, ponytails included.

La sortie obtenue mesure 1086 × 1448 pixels ; les raccords utilisent ces dimensions réelles.
