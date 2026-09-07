# Hero Clash 0.20.0 — Monk / Moine

Le Moine (classe 7) utilise maintenant la fiche approuvée : tissu safran, ceinture bordeaux, collier de perles et bandages. Quatre tenues : plates, veste tactique, tunique légère, cuir noir. Six poses : repos, course longue, course jambe levée, attaque, blessure, KO.

Sources ImageGen : `docs/assets/monk-concept-v1.png` (fiche approuvée) et `docs/assets/monk-retro-v1.png` (atlas modulaire 1536 × 1024, corps sans tête, mains libres, fond vert retiré au chargement). Brief : garder le costume approuvé, employer la grille Knight à quatre rangées et six colonnes, rendre les deux phases de course distinctes.

Les six armes partagées et le mode sans arme sont raccordés aux mains. Les 24 identités du système existant sont disponibles (deux genres, trois visages/teints, quatre coiffures). Les portraits de la fiche servent de direction artistique ; les têtes du jeu restent les têtes partagées, sans nouvelle coiffure ajoutée. Les cous et doigts suivent le teint, sans recolorer la tenue safran. Les poses KO utilisent les paupières fermées et une bouche neutre.

Le Moine rejoint le recrutement personnalisable, les fiches, les combats, la démonstration gratuite et l’aperçu des équipements. L’aperçu indique désormais huit classes modernisées et cinq classiques. Les règles, la compétence Paume apaisante et les sauvegardes sont conservées.

Validation : 12 fichiers de tests Node réussis, 64 512 appels simulés du compositeur sur les huit classes et 48 démonstrations classe/familier sans modification de sauvegarde. Chargement des vraies images avec Canvas : Moine, têtes KO et cinq familiers prêts ; 112 rendus supplémentaires avec armures, armes, orientations et KO. Inspection visuelle des quatre tenues × six poses et des six armes au repos, à l’attaque et au sol. Correction du débordement du poing d’attaque dans la cellule blessure. Aucun test sur navigateur ou téléphone physique.
