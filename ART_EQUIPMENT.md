# Équipements partagés — version 0.29.0

Les modèles validés ont été déclinés en trois atlas de production, créés avec imagegen puis consommés par le moteur Canvas existant. Intégration incluse dans la version 0.29.0.

- `equipment-weapons-v1.png` : neuf armes ajoutées, marteau, arc court et bâton magique. Arc long et arbalète reprennent les corrections validées. Chaque identifiant conserve exactement la même image dans toutes les classes. Les cestes et pistolets s'attachent aux deux mains.
- `equipment-armors-v1.png` : mailles, veste renforcée, robe runique et robe de protection, chacune avec repos, deux pas de course, attaque, recul et KO. Les visages, coiffures et genres existants restent assemblés séparément. Les mains des nouvelles armures suivent la teinte du visage.
- `equipment-familiars-objects-v1.png` : six poses de tortue, dont KO yeux fermés, et six objets distincts.

Les fonds vert et magenta des fichiers sources sont retirés une seule fois au chargement. Le détourage des objets conserve les violets de l'amulette et du sceau. Aucun traitement d'image coûteux par image de combat ; les assemblages sont mis en cache par classe, armure, arme, objet, pose et apparence.

## Objets en combat

Les objets sont attachés à la ceinture, dans les portraits comme en duel. Les lunettes restent à la ceinture pour respecter le choix de garder les visages et coiffures dégagés. Les effets sont purement graphiques : aucun bonus de combat ajouté.

| Objet | Signal complémentaire |
|---|---|
| Lunettes tactiques | Petit réticule cyan au moment d'un coup réussi |
| Amulette du néant | Onde violette lors de l'annulation d'une attaque |
| Talisman de chance | Éclat vert lors d'un critique |
| Potion étrange | Lueur au moment du tirage du bonus ou du malus au début du duel |
| Médaillon de vigueur | Cercle rubis discret au sol, renforcé à l'entrée en combat |
| Sceau de résistance | Cercle violet discret au sol, renforcé à l'entrée en combat |

Les effets cessent au KO ; l'objet reste porté sur le sprite couché. L'option de réduction des mouvements neutralise l'expansion des ondes.

## Vérification

- `npm test` : règles de jeu et tests de rendu unitaires, y compris identités partagées, rectangles source valides, armes doubles, objets, absence de modification des héros et préservation des couleurs au détourage.
- `npm run test:sprites` : charge les 30 atlas via le chargeur de production et réalise 1 080 rendus avec les fonctions de production `sprite` et `pet` : toutes les combinaisons autorisées arme/armure, six poses, deux orientations et apparences alternées. Ce test utilise un hôte Canvas natif avec les vraies images.
- `npm run preview:sprites -- 1` : produit les trois planches dans `artifacts/` pour examiner repos, attaque inversée et KO. Vérification visuelle réalisée sur deux variantes d'équipement couvrant notamment arc, arbalète, marteau, baguette, orbe, sabre, bâton, hache, cestes et pistolets.
- `docs/equipment-review.html` : aperçu interactif ajouté aux outils de prototype. `warrior-preview.html` conserve les sélecteurs individuels limités aux équipements compatibles.

Limite : le test dans Chromium n'a pas pu être exécuté dans cet environnement, le téléchargement du navigateur ayant expiré. Les rendus natifs et le chargeur de production ont été vérifiés ; un essai interactif PC/mobile reste à faire.

## Reproduction

Installer les dépendances de développement avec `npm install`, puis lancer les commandes ci-dessus. Les atlas sont versionnés avec le jeu. Le module central `docs/equipment-art.js` contient les rectangles et points de prise en main ainsi que les effets d'objets.

Briefs de génération : atlas d'armes de 4 × 3 cases, armes verticales et armes à feu pointant à droite ; atlas de corps sans tête de 6 × 4 cases reprenant les poses du Guerrier existant ; atlas de 6 × 2 cases pour la tortue et les objets. Style pixel art détaillé des modèles approuvés, silhouettes distinctes, sprites sans texte ni décor.
