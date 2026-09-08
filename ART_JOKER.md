# Hero Clash 0.24.0 — Joker

La classe 5 reprend la fiche approuvée : violet et bordeaux, losanges et détails dorés. Le chapeau à deux pointes et grelots est une couche Canvas attachée aux têtes personnalisables et suit leur rotation au KO.

Sources : `docs/assets/joker-concept-v1.png` (fiche approuvée) et `docs/assets/joker-retro-v1.png` (atlas ImageGen 1536 × 1024). L’atlas a été généré avec l’Engineer comme référence de grille et la fiche Joker comme référence de costume : quatre rangées sans tête, mains libres, fond vert retiré au chargement.

Quatre équipements réels : plates, veste tactique, tunique et cuir noir. Six armes partagées et option sans arme. 24 apparences : deux genres, trois visages/teints et quatre coiffures. Les têtes et proportions suivent le système partagé du jeu.

Six poses du moteur : repos, deux phases de course, attaque, impact et KO. Yeux fermés et bouche neutre au KO. Les poses de victoire et d’esquive de la fiche ne deviennent pas des animations dédiées supplémentaires. Carte folle et équilibrage conservés ; aucun changement du format de sauvegarde.

Activation dans le recrutement, les fiches, les combats, le combat test gratuit et l’aperçu des équipements. Démonstration avec dague et tunique. Douze classes modernisées, Alien conservé dans les classiques.

Validation : 12 fichiers de tests Node réussis ; 96 768 rendus simulés couvrant les douze classes, toutes les apparences, équipements, poses et directions ; 72 combinaisons de démonstration classe/familier sans modification de sauvegarde. Vérification du véritable chargement des images avec Canvas, atlas KO et cinq familiers disponibles. Inspection visuelle de 36 composites Joker : quatre armures, six poses, six armes, deux genres et trois teints. Pas de test sur téléphone physique.
