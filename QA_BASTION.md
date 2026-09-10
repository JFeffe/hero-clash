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

## Révision 0.28.3 — Vitrail de guilde

Direction 02 appliquée uniquement aux cartes Company. Palette turquoise/indigo/or, arche du portrait, cases de progression et statistiques sombres, boutons turquoise, coche et contour pour le héros sélectionné. Sprites, règles, progression et clé de sauvegarde inchangés.

Contrôles Chromium à 1366×720, 1440×900, 768×900, 390×844 et 320×700 : cinq cartes présentes, héros sélectionné, progression, badges de récompense et de nouvel équipement, absence de chevauchement entre le portrait/les informations et les statistiques, actions dans la carte, navigation vers la fiche et le combat. Cartes horizontales sur tablette/téléphone. Les contrôles couvrent le cas avec les deux badges simultanément.

Test ciblé `node --test tests/balance-ui.test.js` réussi : modèles FR/EN, données de progression, récompenses, navigation et sauvegarde. Aucun changement du moteur de combat.

## Révision 0.28.4 — Portraits adaptatifs et sélection directe

Les portraits Company sont dessinés dans la taille réelle du cadre avec un rapport de pixels adapté à l’écran. Les limites visibles du héros et du familier sont calculées avant mise à l’échelle, sans déformation. Un ResizeObserver actualise le dessin au redimensionnement et est déconnecté au changement de page.

Contrôles Chromium : 2048×900, 1366×720, 390×844 et 320×700, avec récompense et nouvel équipement simultanés. Vérifications de la position des statistiques à gauche, des limites des informations et des boutons, de la hauteur de page, du clic de sélection sans navigation, de la sélection au clavier, de la conservation du défilement horizontal, de la bannière et de la sélection après rechargement. Redimensionnement supplémentaire à 2048×1200 avec un familier : la hauteur de dessin passe de 180 à 330 pixels avec son cadre. Captures inspectées sur grand écran et téléphone.

Test ciblé `tests/balance-ui.test.js` réussi, incluant sélection sans changement de page, état aria-pressed et rejet d’un identifiant absent. Les boutons de fiche et de combat restent distincts du bouton de sélection qui couvre la carte. Aucun changement des règles de progression ou de combat.

## Révision 0.28.5 — Lisibilité du bilan sur ordinateur

Le résultat de combat utilise désormais 96 % de la largeur disponible, jusqu’à 1760 px, avec une arène plus large et une hauteur adaptée à l’écran. Corps du bilan de 16 à 20 px, titres et butin agrandis, boutons de 48 px minimum sur ordinateur. Les règles de téléphone restent inchangées.

Contrôles Chromium avec butin rare et promotion d’étage : 2048×900 (bilan de 1760 px, arène de 420 px de haut, texte de 20 px), 1366×720 (bilan de 1311 px, arène de 280 px, texte de 16 px), 390×844 et 320×700. Aucune barre de défilement de page dans ces cas. Revoir rétablit la présentation du duel et Continuer quitte le combat correctement. Test ciblé `tests/balance-ui.test.js` réussi.

## Révision 0.28.6 — Compagnie et fiches clarifiées

Suite complète : 15 fichiers de tests réussis, aucun échec. Tests DOM en français et anglais : tri décroissant étage/combats et stabilité des égalités, absence de mutation de l’ordre sauvegardé, résumé offensif avant le portrait, transfert direct, niveaux des deux combattants. Pour les 13 classes, apparence non modifiable après création, réglages de recrutement et sauvegarde conservés.

Parcours Chromium à 1366×720, 390×844 et 320×700 : ordre Zara/Ninja/Arlo/Kira/Hana sur des données d’étages distincts, sélection conservée, absence des réglages d’apparence, transfert de 15 points avec contrôle du débit de la réserve et du gain du héros, résumé Intelligence/Tourelle, deux niveaux visibles pendant le combat et après affichage du résultat. Aucun échec JavaScript ni ressource HTTP manquante. Captures inspectées pour les accessoires retirés et le formulaire d’énergie mobile. Tests sur navigateur émulé, sans appareil physique.
