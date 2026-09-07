# Hero Clash — prototype Web 0.6

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

## Version 0.4

More than 2,000 first/family-name combinations, preserving existing hero names. Level rewards show all five current base stats and equipped combat HP/crit/dodge, class skill, and current gear for item offers.

Opponent cards display an exact pre-fight XP/loot quote for win/loss/draw. Lower-level opponents: XP ×0.75, loot 25/10/15%; equal: XP ×1, loot 40/20/30%; higher: XP ×1.75, loot 65/35/45%. Loss XP stays half of victory XP and draws three quarters. Quote is calculated using the hero's level before XP is granted; a level-up during settlement cannot change it. Loot still requires survival and is added unequipped. Cost remains 20 energy; defeats still remove one heart.

Additional verification: `node tests/rewards.test.js`. Browser/device QA not performed for this update.

## Version 0.5

- French/English stat glossary under Settings → Rules.
- Three opponents saved per hero. Navigation, reload, language changes and switching heroes retain them. One free Reroll per hero between fights, shown at the top of the arena. Every resolved battle refreshes the surviving hero's opponents and restores the Reroll, before playback. Replays never touch this state.
- New item badges per equipment slot, set by loot, level-up item choices and prototype grants. Opening a slot selector clears only its badge; notices survive reload and do not equip items automatically. Existing inventories start without unread badges.
- Level-up reward screen shows all base stats, equipped combat values, class ability/advantages and every current equipment slot with item effects.
- Shop preview: 10/20/50/100 energy and 1/3 Rerolls, fictional demo-credit prices, every purchase disabled. Company points cannot be spent.
- Each Graveyard card displays the career's company-point contribution.

Run `node tests/hero-state.test.js` for persisted opponent sets, one-Reroll enforcement, all battle outcomes resetting it, per-hero isolation, reload and equipment notice checks. Local save schema stays version 2 with revision 5 additions. Browser/device visual QA was not performed in this update.

## Version 0.6 — Équilibrage

[Rapport chiffré complet](BALANCE_REPORT.md) : 5 481 216 combats comparatifs et de validation, en plus du réglage. Dans la validation indépendante, les classes obtiennent 48,4–51,1 % de score, les équipements 47,1–52,8 % ; la Fée 49,0 %. Un nul vaut un demi-point.

- Deux avantages et deux désavantages par classe (+8 % de dégâts), sans victoire garantie.
- Fée : soin fixe selon niveau d’acquisition et rareté, sans amplification par les PV maximum.
- Bases d’attaque de classe ajustées, bouclier du Soldat médiéval et soin du Moine réduits.
- Équipements et progression de rareté revus ; descriptions FR/EN et statistiques équipées concordantes.
- Sauvegardes et héros existants conservés ; leurs objets appliquent les nouveaux effets.

Jouer : https://jfeffe.github.io/hero-clash/ — version **0.6** dans l’en-tête.

Tests : `npm test`. Simulations reproductibles : voir le rapport et `balance/validate.py`.

## Version 0.7 — Guerrier et Loup animés

Première intégration de la direction artistique validée : Guerrier à l’épée et Loup, avec poses d’attente, course, attaque, recul et chute. Le rendu utilise un atlas original généré à partir de la planche approuvée, stocké sans perte dans `docs/assets/warrior-wolf-v1.webp`. La couleur magenta sert de transparence au chargement ; aucune découpe ni modification d’image n’a lieu pendant les images d’animation.

Le bouton **Essayer le nouveau style / Try the new art** ouvre un duel de démonstration gratuit depuis l’accueil, avec relecture. Il ne remplace pas le dernier vrai combat et ne consomme ni énergie, ni cœur. Les nouveaux sprites sont aussi utilisés dans les vrais combats et les portraits correspondants.

Cette première passe conserve un costume et un visage fixes pour le Guerrier à l’épée. Les autres armes du Guerrier, les douze autres classes et les autres familiers conservent le rendu précédent. Les bonus de l’équipement restent ceux de la v0.6, quelle que soit l’apparence. L’animation ne modifie aucun résultat du moteur. Le Loup est un compagnon sans barre de vie : sa pose au sol lorsque son maître tombe est uniquement visuelle.

Une conversion PNG → WebP sans perte a été vérifiée pixel par pixel. Le sprite classique reste disponible en cas d’échec de chargement. Vérifications : `npm test`, notamment état de démonstration/relecture sans modification de carrière et sélection des poses. `mobile-preview.html` contient un cadre de 390 × 844 pour vérifier la mise en page téléphone.

Vérification navigateur : duel de démonstration ouvert, sprites chargés et affichés. Correction des canevas étirés ; proportions natives conservées, cadrage mobile de 540 × 400 contre 720 × 400 sur grand écran.
