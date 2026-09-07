# Hero Clash 0.19.0 — Knight modulaire

La fiche Knight approuvée est adaptée au gabarit de production des autres classes : argent, or et bleu royal, corps commun aux genres et visages indépendants. La classe conserve l’ID 4 et son nom historique « Soldat médiéval » dans les données françaises (Knight en anglais).

## Images

- `docs/assets/knight-retro-v1.png` : source ImageGen, 1536 × 1024, quatre rangées de tenues et six colonnes (repos, course A, course B, attaque, blessure, KO). Corps sans tête et mains libres, fond vert retiré au chargement. Les deux dessins de course sont proches, comme dans la grille Ninja de référence.
- `docs/assets/knight-shield-v1.png` : bouclier bleu et or au lion, source ImageGen, 1254 × 1254. Le compositeur extrait le bouclier et l’attache à l’avant-bras libre. Présent sans arme, avec épée, dague et masse ; retiré avec fusil, arc et bâton. Calque cosmétique uniquement, sans nouvel objet ni bonus.

Les tenues sont liées aux IDs existants 6–9 : plates argentées avec tabard bleu, veste tactique olive et pochettes sur tissu bleu, tunique légère bleue à bordure dorée, cuir noir avec sangles. Sans armure équipée, le système existant affiche la tunique. Les six armes restent les sprites partagés. Les visages KO proviennent de l’atlas aux paupières fermées et à expression neutre.

Les raccords de main et de cou sont mesurés sur la planche. Le cou, le décolleté de la tunique et les doigts exposés suivent le teint du visage. Les composites 320 × 224 réutilisent le cache limité à 384 entrées. Le chargement du Knight et de son bouclier est facultatif ; le dessin classique sert de secours si le corps ne charge pas.

## Interfaces et validation

Personnalisation au recrutement et dans la fiche, en français et en anglais ; sélection de la classe dans le duel gratuit et dans l’aperçu d’équipement. La version visible et les URLs des modules passent à 0.19.0.

Validation : 12 fichiers de tests Node, dont 56 448 rendus simulés des sept classes modernisées et 42 démos classe/familier sans modification de sauvegarde. Vérifications dédiées aux contrôles du Knight et au bouclier selon l’arme. Chargement réel des images avec Canvas, contrôle des cinq familiers et 140 appels du rendu Knight (armures, armes, KO, orientations), puis inspection des composites des quatre tenues, six poses, six armes et trois teints. Aucun test dans un navigateur ni sur téléphone physique.

## Briefs de génération

1. Atlas : fiche Knight approuvée pour le costume, atlas Ninja pour la grille et le gabarit seulement ; six colonnes, quatre rangées, corps sans tête, mains vides, sans bouclier ni texte, fond vert uniforme. Argent et or / veste tactique / tunique / cuir noir, tissu bleu royal conservé.
2. Bouclier : une pièce isolée, bleu royal et bordure dorée, lion héraldique, vue légèrement de trois quarts, pixel art net, sans main, bras ou texte, fond vert uniforme.
