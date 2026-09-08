# Hero Clash 0.23.0 — Berserker

La classe 9 utilise désormais la fiche approuvée : fourrure claire, cuir sombre, étoffe rouge, protections de fer et peintures de guerre. Les marques suivent les visages personnalisables et leur rotation au KO.

Sources : `docs/assets/berserker-concept-v1.png` (fiche approuvée) et `docs/assets/berserker-retro-v1.png` (atlas ImageGen, 1536 × 1024). L’atlas conserve la grille et les points d’attache du Trooper, avec quatre rangées de corps sans tête et mains libres. Le fond vert est retiré au chargement par le pipeline existant.

Quatre armures : plates, veste tactique, tunique légère et cuir noir. Six armes partagées, option sans arme, 24 apparences (deux genres, trois visages/teints, quatre coiffures) et deux directions. Les têtes sont celles du système partagé ; la fiche reste une référence de direction artistique.

Six poses du moteur : repos, deux phases de course, attaque/tir selon l’arme, impact et KO. Yeux fermés et bouche neutre au KO. La Furie existante conserve ses dégâts et son déclenchement ; son effet visuel devient rouge orangé. Les poses de victoire et de rage séparées de la fiche ne sont pas des animations supplémentaires du moteur.

Activation dans le recrutement, la fiche du héros, les combats, le combat test gratuit et l’aperçu des équipements. Démonstration Berserker avec masse et tunique. Onze classes modernisées et deux classiques ; suppression des anciennes entrées classiques en doublon de l’Engineer et du Berserker dans l’aperçu. Aucun changement du format de sauvegarde ni de l’équilibrage.

Validation : 12 fichiers de tests Node réussis, 88 704 appels simulés de rendu sur onze classes, 66 démonstrations classe/familier sans mutation de compagnie. Chargement des vraies images avec Canvas : 140 rendus Berserker, KO et cinq familiers disponibles. Inspection visuelle des quatre armures × six poses et des six armes avec les trois teints. Pas de test sur téléphone physique.
