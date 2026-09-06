# Hero Clash — prototype Web 0.3

Jeu de combats automatiques en pixel art, adapté au téléphone et au PC. Interface français/anglais.

## Jouer et partager

Les fichiers jouables se trouvent dans `docs/`. Pour publier sur GitHub Pages :

1. Ouvrir **Settings → Pages** dans ce dépôt.
2. Choisir **Deploy from a branch**.
3. Choisir la branche **main**, le dossier **/docs**, puis **Save**.
4. Attendre la publication et utiliser le lien affiché par GitHub.

Avec GitHub Free, Pages nécessite un dépôt public. Un dépôt privé nécessite un forfait GitHub compatible. Activer Pages peut rendre le jeu accessible publiquement ; rendre le dépôt public rend également son code accessible.

## Version 0.3

- 13 classes, 5 emplacements de héros, créations gratuites avant confirmation.
- Inventaires individuels, armes, armures, familiers et objets.
- Combats automatiques de 30 secondes maximum, relecture et vitesse ×2.
- 5 cœurs : chaque défaite en retire un ; à zéro, mort définitive et Graveyard.
- Points de compagnie à la mort : 10 + 3 par niveau au-delà du premier + 5 par victoire + 1 par nul. Aucune dépense ou puissance héritée.
- Chaque recrue repart niveau 1 et 0 XP avec son propre équipement.
- Butin si le héros survit : 40 % victoire, 20 % défaite, 30 % nul. Trois raretés.
- Apparences détaillées, familiers distincts et animations de combat.

## Sauvegardes

Sauvegarde locale à chaque navigateur et appareil. Le site GitHub Pages aura une sauvegarde distincte du site précédent. Pour transférer sa partie : **Options → Exporter une sauvegarde** dans l’ancien site, puis **Restaurer une sauvegarde Web** dans le nouveau. Aucun compte de jeu, serveur multijoueur ou partage de sauvegarde automatique.

## Développement

HTML, CSS, JavaScript et Canvas ; aucune dépendance à installer. Servir le dossier `docs` avec un serveur HTTP local (par exemple `python -m http.server 8000 --directory docs`) puis ouvrir l’adresse locale. Ne pas ouvrir directement `index.html` en fichier local, car le jeu utilise des modules JavaScript.

Tests avec Node :

```
node tests/engine.test.js
node tests/progression.test.js
```

Le menu Options contient des outils de prototype (énergie, XP, équipements, sélection de classe). Ils sont destinés aux essais et ne restaurent pas les cœurs.
