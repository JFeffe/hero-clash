# Hero Clash 0.25.0 — Alien

La classe 11 reprend la fiche approuvée : peau verte, grands yeux noirs, combinaison marine et ivoire, accents cyan. Sources ImageGen : `docs/assets/alien-concept-v1.png`, `alien-retro-v1.png` et `alien-heads-v1.png` dans le même dossier.

Le corps utilise quatre rangées de six poses, sans tête et sans arme. Les têtes dédiées comportent deux genres, quatre variantes de crâne/coiffure, et les mêmes identités aux yeux fermés et à la bouche neutre. Trois palettes de peau donnent 24 apparences. Fond magenta retiré au chargement pour préserver la peau verte.

Les équipements suivent les objets existants : plaque, veste tactique, tunique, cuir noir ; épée, fusil, arc, bâton, dague, masse et mains nues. Les noms d’équipements illustratifs de la fiche ne créent pas de nouveaux objets. Les six poses du moteur sont repos, deux phases de course, attaque, impact et KO ; pas d’animation de victoire dédiée ajoutée.

Activation dans les portraits, le recrutement, les héros existants, les combats, la démonstration gratuite et l’aperçu des équipements. Libellés d’apparence Alien en français et anglais. Sauvegardes, statistiques et compétences inchangées.

Validation : tests Node incluant Alien dans toutes les combinaisons de rendu simulé et les démonstrations classe/familier. Chargement et nettoyage des vrais atlas via Canvas ; inspection de 42 composites couvrant les quatre tenues, six poses, six armes, mains nues, deux genres et trois palettes. Pas de test sur téléphone physique.
