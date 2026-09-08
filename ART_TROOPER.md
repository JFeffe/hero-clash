# Hero Clash 0.21.0 — Trooper

La classe 3 utilise désormais le Trooper approuvé : uniforme olive, sangles brunes, bottes et protections grises. Atlas à quatre rangées dans l’ordre des équipements du jeu : plaque, veste tactique, tunique, cuir noir. Six poses de combat : repos, deux phases de course distinctes, attaque, blessure, KO. La pose de victoire de la fiche reste une intention visuelle : le moteur partagé ne possède pas de phase de victoire dédiée.

Sources : `docs/assets/trooper-concept-v1.png` (fiche approuvée), `docs/assets/trooper-retro-v1.png` (atlas ImageGen, 1536 × 1024). Brief : reprendre le Trooper olive de la fiche, le format modulaire Knight, quatre armures, corps sans tête et mains libres sur fond vert. Deux retouches : différencier les jambes de la deuxième phase de course et conserver la tunique sur le KO léger. Le fond est retiré au chargement par le pipeline existant.

Les têtes partagées offrent 24 identités, deux genres, trois visages/teints et quatre coiffures. Les portraits et le casque de la fiche servent de référence artistique ; aucun nouveau casque ou visage fixe ne masque la personnalisation. Six armes partagées, sans arme et quatre armures, dans les deux directions. Les cous et bras découverts suivent le teint. Les têtes KO ont les yeux fermés et une bouche neutre.

Activation dans le recrutement, la fiche, les combats, le combat test gratuit et l’aperçu d’équipement (neuf classes modernisées, quatre classiques). Démonstration Trooper avec fusil et veste tactique. Aucune modification des règles, de la compétence de classe ou du format de sauvegarde.

Validation : 12 fichiers de tests Node, 72 576 appels simulés du compositeur sur neuf classes, 54 démonstrations classe/familier sans mutation de la compagnie. Chargement des vraies images via Canvas : atlas Trooper, KO et cinq familiers prêts ; 140 appels de rendu Trooper avec équipements, KO et orientations. Inspection visuelle des quatre armures × six poses et des six armes avec les trois teints. Pas de test sur téléphone physique.
