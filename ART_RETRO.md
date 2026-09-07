# Hero Clash 0.12.0 — Pixel rétro raffiné

Direction 01 approuvée : silhouettes compactes, contours sombres, pixels visibles et couleurs contrastées. Trois nouvelles planches générées avec l’outil intégré : corps du Guerrier, tenues du Mage et 24 têtes du Guerrier. Les fichiers sources sont conservés dans docs/assets/*-retro-v1.png.

Le Guerrier conserve ses choix de genre, visage et coiffure. Les anciens héros sans identité explicite utilisent le premier visage sans modifier leur sauvegarde. Le corps en armure demeure commun aux genres. Le Mage conserve son identité aux cheveux violets ; la personnalisation de ses visages n’est pas incluse dans cette version. Les deux classes affichent six armes, quatre tenues et six poses, avec prise en charge du mode sans arme. La page warrior-preview.html permet de choisir la classe et d’essayer les variantes sans modifier la partie.

Les composites passent par une grille de pixels à échelle 4:1, sans lissage, puis sont mis en cache (384 entrées maximum). Les mêmes composites servent aux portraits et aux combats. Les dessins précédents restent disponibles comme secours en cas de problème de chargement. Le loup et les autres classes conservent leur rendu. Aucun changement aux statistiques, à la progression, aux sauvegardes ou à l’équilibrage.

Validation : 11 fichiers de tests réussis, dont 8 400 appels du nouveau rendu avec les identités, les équipements, les poses et les deux directions. Inspection Canvas des 24 identités et des six poses sur quatre tenues pour chaque classe. Pas de test sur un téléphone physique.

## Briefs de génération

Référence : planche validée « 01 — Pixel rétro raffiné », utilisée pour le style seulement. Atlases de production sans texte, fond vert uniforme retiré au chargement. Style 16-bit compact, grands groupes de pixels, contours sombres, trois niveaux d’ombre par matière.

- Guerrier : six colonnes (repos, deux courses, attaque, blessure, mort) et quatre rangées (plaque, veste tactique, tunique, cuir noir). Corps sans tête, cape rouge, mains vides pour raccorder les armes séparément.
- Mage : même organisation ; femme adulte aux cheveux violets, cape violette, accents turquoise, quatre tenues et mains vides.
- Visages : quatre colonnes de coiffures (court châtain, boucles noires, queue blonde, carré argenté), six rangées d’identités (trois hommes et trois femmes avec trois teints), orientation trois quarts droite et cadrage cohérent.
