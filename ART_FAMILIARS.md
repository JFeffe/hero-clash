# Hero Clash 0.17.0 — Familiers et modules de test

Cinq nouveaux atlas : loup agile, chien militaire, chat ninja, corbeau du chaos et fée curieuse. Chaque planche contient six poses (repos, mouvement A/B, action, blessure, défaite). Les sources sont dans `docs/assets/{wolf,dog,cat,raven,fairy}-retro-v1.png`. Le rendu partagé est dans `docs/familiar-art.js` et sert aux portraits, aux combats et à l’aperçu. Les images antérieures restent utilisées en secours si nécessaire.

Le combat de démonstration accueille les cinq classes modernisées : Guerrier, Archer, Mage, Nécromancien et Boxeur. Choix des cinq familiers ou aucun. Les deux combattants utilisent le familier choisi pour permettre de voir les deux orientations. Ces combats ne règlent aucun résultat dans la sauvegarde.

L’aperçu `docs/warrior-preview.html` propose ces cinq classes, les identités existantes, six armes, quatre tenues, cinq familiers et quatre objets. Les emplacements peuvent être vidés. Les objets indiquent leur effet mais n’ajoutent pas de dessin sur le héros. Les poses et orientations restent sélectionnables. Les anciens liens sont conservés.

## Génération

Outil intégré ImageGen. Référence de style : atlas Boxer approuvé, uniquement pour les contours et la densité de pixels. Brief commun : atlas 1536 × 1024 de six poses en grille 3 × 2, silhouette complète orientée vers la droite, style fantasy pixel rétro raffiné, sans texte. Loup gris argenté et museau crème ; berger allemand avec harnais olive ; chat noir avec foulard bordeaux ; corbeau noir et indigo ; fée blonde en robe violette, ailes turquoise et baguette dorée. Fonds transparents conservés pour loup, chien et fée. Retouche ImageGen des fonds du chat et du corbeau vers un vert uniforme retiré au chargement.

## Validation

12 fichiers de tests Node réussis. Les 30 combinaisons classe/familier (absence incluse) du combat test préservent la compagnie. États, orientation, secours sans image et absence de mutation vérifiés pour les familiers. Inspection Canvas des 30 poses provenant des véritables sources, sur fond coloré. Pas de test sur téléphone physique ni de test navigateur.
