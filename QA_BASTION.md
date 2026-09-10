# Validation du Bastion — 0.28.0

## Tests automatisés

`npm test` : **15 fichiers de tests réussis, 0 échec**.

La suite couvre notamment les règles de combat, les récompenses, les pools, la progression, les anciennes sauvegardes, la boutique, l’apparence, 104 832 rendus rétro et 78 démonstrations classe/familier sans mutation de sauvegarde. Le nouveau test `tests/bastion.test.js` vérifie les frontières 5/6, 10/11 et 14/15, le cache d’images, la gestion d’une image indisponible et le cadrage sans déformation des arènes larges/étroites.

Les deux hôtes DOM de tests existants ont reçu les nouvelles dépendances visuelles et les méthodes DOM correspondantes ; leurs assertions de jeu restent actives.

## Navigateur

Vérification locale avec Chromium headless et Playwright, données de test isolées de toute partie utilisateur. Les largeurs mobiles utilisent l’émulation tactile. Aucun appareil physique ni Safari iOS n’a été utilisé.

| Largeur | Vérifications |
| --- | --- |
| 320 px | Nom de héros long, compagnie, fiche, changement d’équipement sans saut de défilement, adversaires, relance, pool déplié, boutique, Graveyard, Temple, options, outils de prototype, 13 classes, anglais et rechargement |
| 390 px | Mêmes parcours, captures visuelles, recrutement de la cinquième place avec conservation du nom et de l’apparence |
| 768 px | Menus sur tablette, grilles intermédiaires, contrôles accessibles et absence de défilement horizontal |
| 1440 px | Navigation latérale, cinq héros, comparaison des adversaires, tous les menus et captures visuelles |

69 contrôles de pages/largeurs ont réussi sans débordement horizontal, contrôle hors écran, valeur `undefined`/`NaN`, erreur JavaScript ou ressource HTTP manquante.

Les combats ont été exécutés aux étages 1, 6, 11 et 15. Résultat, bouton Continuer et relecture ont été exercés ; l’enregistrement du duel reste identique après relecture. Les captures montrent les tribunes et l’oculus ouvert du sommet, avec les sprites existants.

12 contrôles complémentaires ont vérifié les états avec données : Graveyard rempli, mémorial, champion du Temple, choix de récompense, aperçu des équipements et première création sans sauvegarde. Ils ont également réussi sans erreur ni débordement.

## Compatibilité

- Même clé et même schéma de sauvegarde ; aucun reset, aucune migration visuelle des données.
- Moteur de combat, progression, équipement et atlases de personnages inchangés.
- Images WebP locales, sans police ou bibliothèque distante en production.
- Liens et versions d’entrée actualisés pour le cache GitHub Pages.


## Révision 0.28.1

Contrôles ciblés de la compagnie, de la boutique, des nouvelles cartes du Temple et des fiches de champion à 1366×720, 1440×900, 2048×900, 390×844 et 320×700. Les tests DOM couvrent les chiffres regroupés par héros, le nom et le décor de la bannière, la lecture seule des champions et la présence des six lots achetables.

La compagnie et la boutique utilisent des cartes horizontales sur téléphone. Le choix d’une carte et le retrait d’un cadeau sont contrôlés dans le navigateur, avec conservation de la position horizontale après achat. Les panneaux secondaires dépliés et les longues listes peuvent nécessiter un défilement ; le contenu n’est pas coupé pour forcer une hauteur fixe.

## Révision 0.28.2

Après-combat vérifié dans Chromium à 1366×720, 390×844 et 320×700 : portrait/arène réduits, bilan et boutons sans défilement vertical. Le format 320×700 a aussi été vérifié avec un butin rare et une promotion d’étage. Récompense de caractéristique : choix d’un point testé avec contrôle du changement sauvegardé. Équipements sur téléphone : cartes horizontales et action « Passer » séparée, vérifiées à 320×700. La fiche complète est ouverte sur ordinateur et dépliable sur téléphone ; son ouverture et celle du journal peuvent nécessiter un défilement.

Suite complète : 15 tests réussis. Le test ciblé des modèles de récompense contrôle les cinq caractéristiques, les offres d’équipement, le bouton Passer et la conservation de la référence complète en français et en anglais.

Propositions Company : page autonome `docs/company-designs.html`, aucun accès au stockage de la partie. Trois palettes et cinq classes au choix, vrais atlases de personnages et familiers. Capture de comparaison inspectée dans `docs/assets/company-design-options.png`. Ces propositions ne remplacent pas encore les cartes en jeu.
