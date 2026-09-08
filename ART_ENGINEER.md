# Hero Clash 0.22.0 — Engineer

La classe 8 (Ingénieur / Engineer) utilise désormais la direction approuvée : tenue orange, manches bleu pétrole, ceinture d’outils, détails mécaniques et lunettes en laiton sur le front. Les lunettes suivent les têtes personnalisables et leur rotation, y compris au KO.

Sources : `docs/assets/engineer-concept-v1.png` (fiche approuvée) et `docs/assets/engineer-retro-v1.png` (atlas ImageGen, 1536 × 1024). Brief de l’atlas : conserver la grille, les poses et les points d’attache du Trooper, appliquer la tenue de la fiche Engineer, quatre rangées de corps sans tête et mains libres sur fond vert. Le fond est retiré au chargement avec le pipeline existant.

Les quatre rangées correspondent aux équipements réels du jeu : plates, veste tactique, tunique légère et cuir noir. La maille de la fiche concept n’ajoute pas un nouvel équipement. Six armes partagées, option sans arme, 24 apparences (deux genres, trois visages/teints et quatre coiffures), deux directions. Teinte du cou adaptée au visage sans recolorer les vêtements orange.

Six poses du moteur partagé : repos, deux phases de course, attaque/tir selon l’arme, impact et KO. Yeux fermés et bouche neutre au KO. La réparation de la fiche reste une intention artistique : aucune nouvelle mécanique de soin ni animation dédiée n’est ajoutée. La compétence Tourelle et l’équilibrage existants sont conservés.

Activation dans le recrutement, la fiche de héros, les combats, le combat test gratuit et l’aperçu des équipements. Démonstration Engineer avec fusil et tunique orange. Dix classes modernisées et trois classiques. Aucun changement du format de sauvegarde.

Validation : suite Node, 80 640 appels simulés de rendu sur dix classes, 60 démonstrations classe/familier sans mutation de la compagnie. Chargement des vraies images via Canvas : atlas Engineer, KO et cinq familiers disponibles, 140 rendus Engineer avec équipements, orientations et KO. Inspection des composites quatre armures × six poses et des six armes avec les trois teints. Pas de test sur téléphone physique.
