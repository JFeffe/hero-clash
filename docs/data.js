export const DATA = {
  "CLASSES": [
    "Guerrier",
    "Archer",
    "Mage",
    "Trooper",
    "Paladin",
    "Joker",
    "Ninja",
    "Moine",
    "Ingénieur",
    "Berserker",
    "Nécromancien",
    "Alien",
    "Boxeur"
  ],
  "ADVANTAGES": [
    [
      1,
      3
    ],
    [
      2,
      4
    ],
    [
      3,
      6
    ],
    [
      4,
      7
    ],
    [
      6,
      8
    ],
    [],
    [
      7,
      9
    ],
    [
      8,
      0
    ],
    [
      9,
      1
    ],
    [
      0,
      2
    ],
    [],
    [],
    []
  ],
  "MAGIC_CLASSES": [
    2,
    4,
    7
  ],
  "SKILL_NAMES": [
    "Frappe lourde",
    "Double tir",
    "Boule de feu",
    "Rafale : dégâts ×1,6, ignore 15 % de défense",
    "Rempart",
    "Carte folle",
    "Frappe de l’ombre",
    "Paume apaisante : dégâts ×1,15 ; soin 5 % jusqu’à 250 PV max, 2,5 % au-delà",
    "Tourelle",
    "Furie",
    "Drain de vie",
    "Impulsion",
    "Combo"
  ],
  "SKILL_POWER": [
    1.7,
    1.5,
    1.6,
    1.6,
    1.15,
    1.5,
    1.45,
    1.15,
    1.2,
    1.35,
    1.35,
    1.3,
    1.5
  ],
  "BASE": [
    [
      7,
      4,
      2,
      6,
      1
    ],
    [
      3,
      7,
      2,
      4,
      4
    ],
    [
      1,
      3,
      8,
      3,
      5
    ],
    [
      5,
      5,
      3,
      5,
      2
    ],
    [
      2,
      3,
      6,
      7,
      2
    ],
    [
      2,
      6,
      4,
      3,
      5
    ],
    [
      4,
      8,
      2,
      3,
      3
    ],
    [
      3,
      4,
      5,
      5,
      3
    ],
    [
      6,
      5,
      2,
      4,
      3
    ],
    [
      8,
      3,
      1,
      5,
      3
    ],
    [
      2,
      4,
      7,
      3,
      4
    ],
    [
      3,
      5,
      6,
      4,
      4
    ],
    [
      6,
      6,
      1,
      5,
      2
    ]
  ],
  "XP": [
    0,
    1,
    2,
    3,
    5,
    9,
    15,
    24,
    37,
    55,
    79,
    110,
    149,
    197,
    255,
    324,
    405,
    499,
    607,
    730
  ],
  "GAINS": [
    1.0,
    1.0,
    1.0,
    1.0,
    1.2,
    1.4,
    1.7,
    2.0,
    2.4,
    2.8,
    3.2,
    3.6,
    4.0,
    4.5,
    5.0,
    5.5,
    6.0,
    6.5,
    7.0,
    7.5
  ],
  "STATS": [
    "Force",
    "Dextérité",
    "Intelligence",
    "Endurance",
    "Chance"
  ],
  "SLOTS": [
    "Arme",
    "Armure",
    "Familier",
    "Objet"
  ],
  "ITEMS": [
    {
      "name": "Épée",
      "slot": 0,
      "base": 0.09,
      "scale": 0.01,
      "kind": "offense",
      "text": "Dégâts de la classe"
    },
    {
      "name": "Fusil",
      "slot": 0,
      "base": 0.17,
      "scale": 0.005,
      "kind": "crit",
      "text": "Chance de critique"
    },
    {
      "name": "Arc court",
      "slot": 0,
      "base": 0.08,
      "scale": 0.01,
      "kind": "speed",
      "text": "Vitesse d’attaque"
    },
    {
      "name": "Bâton magique",
      "slot": 0,
      "base": 0.09,
      "scale": 0.008,
      "kind": "offense",
      "text": "Dégâts de la classe ; portée selon le héros"
    },
    {
      "name": "Dague",
      "slot": 0,
      "base": 0.1,
      "scale": 0.01,
      "kind": "speed",
      "text": "Vitesse d’attaque"
    },
    {
      "name": "Marteau de guerre",
      "slot": 0,
      "base": 0.3,
      "scale": 0.015,
      "kind": "heavy",
      "text": "Dégâts ; cadence −20 % ; boucliers subissent +50 %"
    },
    {
      "name": "Armure de plates",
      "slot": 1,
      "base": 0.65,
      "scale": 0.01,
      "kind": "defense",
      "text": "Résistance physique ; cadence −5 %"
    },
    {
      "name": "Veste tactique",
      "slot": 1,
      "base": 0.08,
      "scale": 0.008,
      "kind": "rangedReduction",
      "text": "Réduction des dégâts à distance"
    },
    {
      "name": "Tunique légère",
      "slot": 1,
      "base": 0.125,
      "scale": 0.01,
      "kind": "speed",
      "text": "Vitesse d’attaque"
    },
    {
      "name": "Cuir souple",
      "slot": 1,
      "base": 0.085,
      "scale": 0.01,
      "kind": "dodge",
      "text": "Esquive"
    },
    {
      "name": "Loup agile",
      "slot": 2,
      "base": 0.0,
      "scale": 0.0,
      "kind": "wolf",
      "text": "Mord tous les 3 tours"
    },
    {
      "name": "Chien militaire",
      "slot": 2,
      "base": 0.3,
      "scale": 0.01,
      "kind": "dog",
      "text": "Réduit les défenses physique et magique adverses"
    },
    {
      "name": "Chat ninja",
      "slot": 2,
      "base": 0.13,
      "scale": 0.005,
      "kind": "dodge",
      "text": "Esquive"
    },
    {
      "name": "Corbeau du chaos",
      "slot": 2,
      "base": 0.0,
      "scale": 0.0,
      "kind": "raven",
      "text": "Copie la compétence adverse tous les 4 tours"
    },
    {
      "name": "Fée curieuse",
      "slot": 2,
      "base": 1.9,
      "scale": 0.02,
      "kind": "fairy",
      "text": "PV soignés à chaque tour"
    },
    {
      "name": "Lunettes tactiques",
      "slot": 3,
      "base": 0.115,
      "scale": 0.005,
      "kind": "accuracy",
      "text": "Réduit l’esquive adverse"
    },
    {
      "name": "Amulette du néant",
      "slot": 3,
      "base": 0.078,
      "scale": 0.005,
      "kind": "null",
      "text": "Chance d’annuler une attaque"
    },
    {
      "name": "Talisman de chance",
      "slot": 3,
      "base": 0.061,
      "scale": 0.003,
      "kind": "luck",
      "text": "Critique et esquive"
    },
    {
      "name": "Potion étrange",
      "slot": 3,
      "base": 0.16,
      "scale": 0.01,
      "kind": "potion",
      "text": "Dégâts ± bonus, tiré à chaque duel"
    },
    {
      "name": "Arc long",
      "slot": 0,
      "kind": "longbow",
      "base": 0.2,
      "scale": 0.01,
      "text": "Dégâts ; cadence −10 %"
    },
    {
      "name": "Arbalète",
      "slot": 0,
      "kind": "penetration",
      "base": 0.3,
      "scale": 0.01,
      "text": "Ignore une part de la résistance adverse"
    },
    {
      "name": "Baguette de braise",
      "slot": 0,
      "kind": "ignite",
      "base": 3,
      "scale": 0.01,
      "text": "Brûlure 2 tours ; synergie avec la compétence du Mage"
    },
    {
      "name": "Orbe de foudre",
      "slot": 0,
      "kind": "lightning",
      "base": 0.3,
      "scale": 0.01,
      "text": "Dégâts variables, bonus de 0 à la valeur indiquée"
    },
    {
      "name": "Sabre",
      "slot": 0,
      "kind": "sabre",
      "base": 0.08,
      "scale": 0.01,
      "text": "Précision et critique"
    },
    {
      "name": "Hache de guerre",
      "slot": 0,
      "kind": "bleed",
      "base": 3,
      "scale": 0.01,
      "text": "Saignement pendant 2 tours ; rafraîchi sans cumul"
    },
    {
      "name": "Bâton de combat",
      "slot": 0,
      "kind": "combatstaff",
      "base": 0.06,
      "scale": 0.01,
      "text": "Vitesse et esquive"
    },
    {
      "name": "Cestes",
      "slot": 0,
      "kind": "speed",
      "base": 0.14,
      "scale": 0.01,
      "text": "Vitesse d’attaque"
    },
    {
      "name": "Pistolets",
      "slot": 0,
      "kind": "pistols",
      "base": 0.06,
      "scale": 0.01,
      "text": "Vitesse et précision"
    },
    {
      "name": "Cotte de mailles",
      "slot": 1,
      "kind": "defense",
      "base": 0.45,
      "scale": 0.01,
      "text": "Résistance physique"
    },
    {
      "name": "Veste renforcée",
      "slot": 1,
      "kind": "hp",
      "base": 0.1,
      "scale": 0.01,
      "text": "PV maximum"
    },
    {
      "name": "Robe runique",
      "slot": 1,
      "kind": "magicDefense",
      "base": 0.6,
      "scale": 0.01,
      "text": "Résistance magique"
    },
    {
      "name": "Robe de protection",
      "slot": 1,
      "kind": "initialShield",
      "base": 0.1,
      "scale": 0.01,
      "text": "Bouclier initial en proportion des PV maximum"
    },
    {
      "name": "Tortue",
      "slot": 2,
      "kind": "initialShield",
      "base": 0.08,
      "scale": 0.01,
      "text": "Bouclier initial en proportion des PV maximum"
    },
    {
      "name": "Médaillon de vigueur",
      "slot": 3,
      "kind": "hp",
      "base": 0.08,
      "scale": 0.01,
      "text": "PV maximum"
    },
    {
      "name": "Sceau de résistance",
      "slot": 3,
      "kind": "magicDefense",
      "base": 0.5,
      "scale": 0.01,
      "text": "Résistance magique"
    }
  ],
  "SKILLS": [
    "Frappe lourde : dégâts ×1,7 tous les 3 tours",
    "Double tir : dégâts ×1,5 tous les 3 tours",
    "Boule de feu : dégâts ×1,6 tous les 3 tours, brûlure",
    "Rafale : dégâts ×1,6, ignore 25 % de défense",
    "Rempart : dégâts ×1,15 et bouclier de 6 % des PV max",
    "Carte folle : dégâts aléatoires ×0,9 à ×2,1",
    "Frappe de l’ombre : dégâts ×1,45 et +12 % d’esquive pour un coup",
    "Paume apaisante : dégâts ×1,15 et soin de 5 % des PV max",
    "Tourelle : dégâts ×1,2 et tir bonus de 6 dégâts",
    "Furie : dégâts ×1,35 à ×2 selon les PV perdus",
    "Drain de vie : dégâts ×1,35 et soin de 40 % des dégâts infligés",
    "Impulsion : dégâts ×1,3, ignore 50 % de défense",
    "Combo : dégâts ×1,5, retarde l’action adverse de 0,45 s"
  ],
  "EN": {
    "COMBAT HÉROS": "HERO CLASH",
    "Caserne": "Barracks",
    "Cimetière": "Graveyard",
    "Développement": "Developer",
    "Quitter": "Quit",
    "Retour": "Back",
    "Options": "Options",
    "Guide": "Guide",
    "LA CASERNE": "THE BARRACKS",
    "%d / 5 héros recrutés": "%d / 5 heroes recruited",
    " · niv. ": " · lv. ",
    "  /  NIVEAU ": "  /  LEVEL ",
    " · Niveau ": " · Level ",
    "+ Recruter un héros": "+ Recruit a hero",
    "Chaque héros possède son inventaire, son expérience et sa réserve d’énergie.": "Each hero has their own inventory, experience and energy reserve.",
    "UNE LÉGENDE… PEUT-ÊTRE.": "A LEGEND… MAYBE.",
    "Un héros improbable. Un équipement douteux. Trente secondes pour faire vos preuves.": "An unlikely hero. Questionable gear. Thirty seconds to prove yourself.",
    "Créer mon premier héros": "Create my first hero",
    "PV max    %d": "Max HP    %d",
    "V %d   /   D %d   /   N %d": "W %d   /   L %d   /   D %d",
    "Niveau maximum du prototype": "Prototype level cap reached",
    "XP %.1f / %d vers le niveau %d": "XP %.1f / %d toward level %d",
    "Équipement": "Equipment",
    "ÉQUIPEMENT": "EQUIPMENT",
    "Trouver un duel  ·  20 énergie": "Find a duel  ·  20 energy",
    "Trouver un duel": "Find a duel",
    "★ Choisir mes améliorations (%d)": "★ Choose my upgrades (%d)",
    "LE DESTIN A DE L’HUMOUR.": "FATE HAS A SENSE OF HUMOR.",
    "Relancez librement la classe, l’apparence et le kit. La validation conserve ce héros.": "Reroll the class, appearance and gear freely. Confirm to keep this hero.",
    "5 cœurs. Chaque défaite coûte un cœur. À zéro, le héros meurt définitivement.": "5 hearts. Each defeat costs one heart. At zero, the hero dies permanently.",
    "↻ Tout relancer": "↻ Reroll everything",
    "Confirmer ce héros": "Confirm this hero",
    "Vide": "Empty",
    "Le niveau d’acquisition d’un objet reste fixe. Tous les équipements sont autorisés.": "Acquisition level stays fixed. All equipment is allowed.",
    "INVENTAIRE INDIVIDUEL": "PERSONAL INVENTORY",
    "Équipé": "Equipped",
    "Équiper": "Equip",
    "Retirer ": "Unequip ",
    "ÉCHAUFFEMENT": "WARM-UP",
    "À VOTRE MESURE": "EVEN MATCH",
    "LE DÉFI": "THE CHALLENGE",
    "Compétence : ": "Skill: ",
    "Affronter  ·  20 énergie": "Fight  ·  20 energy",
    "Retour à la caserne": "Back to barracks",
    "%d / %d PV": "%d / %d HP",
    "Vitesse ×1": "Speed ×1",
    "Vitesse ×2": "Speed ×2",
    "Voir le résultat": "Show result",
    "Le duel commence. Les familiers entrent dans l’arène.\n": "The duel begins. Pets enter the arena.\n",
    "VICTOIRE": "VICTORY",
    "DÉFAITE": "DEFEAT",
    "MATCH NUL": "DRAW",
    "PV restants : %.1f %% / %.1f %%": "HP remaining: %.1f %% / %.1f %%",
    "+%.2f XP  ·  −20 énergie  ·  %s": "+%.2f XP  ·  −20 energy  ·  %s",
    "MORT DÉFINITIVE — Son histoire rejoint le cimetière.": "PERMANENT DEATH — Their story lives on in the graveyard.",
    "Revoir le duel": "Replay duel",
    "Continuer": "Continue",
    "NIVEAU %d  •  À VOUS DE CHOISIR": "LEVEL %d  •  YOUR CHOICE",
    "Ajoutez un point à une statistique. Ce choix est permanent.": "Add one point to a stat. This choice is permanent.",
    "Choisissez un équipement. Il rejoint votre inventaire ; équipez-le ensuite à la caserne.": "Choose one item. It goes into your inventory; equip it at the barracks.",
    "Ne rien prendre": "Take nothing",
    "ATELIER DE DÉVELOPPEMENT": "DEVELOPER WORKSHOP",
    "Ces commandes modifient la sauvegarde. Utilisez-les pour tester les builds et la progression sans attendre.": "These tools change your save. Use them to test equipment combinations and progression without waiting.",
    "Créer un héros": "Create a hero",
    "Héros sélectionné : ": "Selected hero: ",
    "Restaurer l’énergie de tous les héros": "Restore energy for all heroes",
    "Ajouter 10 XP": "Add 10 XP",
    "Passer au prochain niveau": "Advance to next level",
    "Obtenir tous les équipements au niveau actuel": "Get all equipment at current level",
    "Préparer une classe à recruter": "Prepare a class for recruitment",
    "Préparer le tirage": "Prepare recruit",
    "Ouvrir le dossier des sauvegardes": "Open save folder",
    "LE PETIT MANUEL DU HÉROS": "THE LITTLE HERO HANDBOOK",
    "LES TREIZE CLASSES": "THE THIRTEEN CLASSES",
    "Avantage +5 % : ": "Advantage +5%: ",
    "Chaque compétence s’active tous les trois tours personnels. Les effets et valeurs des nouvelles classes sont provisoires.": "Each skill activates every three personal turns. New class effects and values are provisional.",
    "ÉNERGIE  %d / 100  ·  +1 par minute": "ENERGY  %d / 100  ·  +1 per minute",
    "  ·  prochain duel dans %d min %02d s": "  ·  next duel in %d min %02d s",
    "Échec de sauvegarde": "Save failed",
    "%d / 5 cœurs": "%d / 5 hearts",
    "OPTIONS": "OPTIONS",
    "Langue de l’interface, des équipements et des combats.": "Language for menus, equipment and combat.",
    "La langue choisie s’applique immédiatement et sera conservée au prochain lancement.": "Your language choice applies immediately and is saved for next time.",
    "CIMETIÈRE": "GRAVEYARD",
    "Leurs aventures s’arrêtent ici. Leur histoire reste.": "Their adventures end here. Their stories remain.",
    "%d héros dans les mémoires": "%d heroes remembered",
    "Aucun héros perdu. Prenez soin de leurs cinq cœurs.": "No heroes lost. Look after their five hearts.",
    "%s  ·  %s  ·  Niveau %d  ·  V %d / D %d / N %d": "%s  ·  %s  ·  Level %d  ·  W %d / L %d / D %d",
    "UNE VIE DE HÉROS": "A HERO’S LIFE",
    "%s · Niveau %d": "%s · Level %d",
    "Mort définitive après la perte de ses cinq cœurs.": "Permanent death after losing all five hearts.",
    "Combats : %d": "Battles: %d",
    "Victoires : %d  ·  Défaites : %d  ·  Égalités : %d": "Wins: %d  ·  Losses: %d  ·  Draws: %d",
    "Taux de victoire : %.1f %%": "Win rate: %.1f %%",
    "Meilleure série : %d victoires": "Best streak: %d wins",
    "XP finale : %.2f": "Final XP: %.2f",
    "Dégâts infligés : %d": "Damage dealt: %d",
    "Dégâts reçus : %d": "Damage taken: %d",
    "Critiques : %d  ·  Compétences : %d": "Criticals: %d  ·  Skills: %d",
    "Temps en combat : %.1f s": "Time in battle: %.1f s",
    "Dernier adversaire : ": "Final opponent: ",
    "Décès (UTC) : ": "Died (UTC): ",
    "Les statistiques détaillées sont comptées depuis la version 0.2.": "Detailed statistics are tracked starting with version 0.2.",
    "Dernier équipement : ": "Final equipment: ",
    "Bienvenue à la caserne. Votre premier héros vous attend.": "Welcome to the barracks. Your first hero awaits.",
    "Heureux de vous revoir. Vos héros sont prêts.": "Welcome back. Your heroes are ready.",
    "Héros recruté. Préparez son équipement et lancez votre premier duel.": "Hero recruited. Equip them and start your first duel.",
    "Énergie restaurée.": "Energy restored.",
    "0.2  •  CRÉER / ÉQUIPER / COMBATTRE / ÉVOLUER  •  Sauvegarde automatique": "0.2  •  CREATE / EQUIP / FIGHT / GROW  •  Autosave",
    "Guerrier": "Warrior",
    "Archer": "Archer",
    "Mage": "Mage",
    "Militaire": "Trooper",
    "Soldat médiéval": "Knight",
    "Joker": "Joker",
    "Ninja": "Ninja",
    "Moine": "Monk",
    "Ingénieur": "Engineer",
    "Berserker": "Berserker",
    "Nécromancien": "Necromancer",
    "Alien": "Alien",
    "Boxeur": "Boxer",
    "Force": "Strength",
    "Dextérité": "Dexterity",
    "Intelligence": "Intelligence",
    "Endurance": "Endurance",
    "Chance": "Luck",
    "Arme": "Weapon",
    "Armure": "Armor",
    "Familier": "Pet",
    "Objet": "Trinket",
    "Épée large": "Broadsword",
    "Fusil rouillé": "Rusty rifle",
    "Arc en bois": "Wooden bow",
    "Bâton magique": "Magic staff",
    "Lame courte": "Short blade",
    "Masse cloutée": "Spiked mace",
    "Armure de plates": "Plate armor",
    "Veste tactique": "Tactical vest",
    "Tunique légère": "Light tunic",
    "Cuir noir": "Black leather",
    "Loup agile": "Agile wolf",
    "Chien militaire": "Military dog",
    "Chat ninja": "Ninja cat",
    "Corbeau du chaos": "Chaos raven",
    "Fée curieuse": "Curious fairy",
    "Lunettes tactiques": "Tactical goggles",
    "Amulette du néant": "Void amulet",
    "Talisman de chance": "Lucky talisman",
    "Potion étrange": "Strange potion",
    "Dégâts physiques": "Physical damage",
    "Critique à distance": "Ranged critical chance",
    "Vitesse d’attaque": "Attack speed",
    "Dégâts magiques": "Magic damage",
    "Esquive": "Dodge chance",
    "Dégâts ; cadence −20 %": "Damage ; attack speed −20%",
    "Défense": "Defense",
    "PV ; projectiles −5 %": "HP ; projectile damage −5%",
    "Esquive ; vitesse +5 %": "Dodge chance ; speed +5%",
    "Mord tous les 3 tours": "Bites every 3 turns",
    "Réduit la défense ennemie": "Reduces enemy defense",
    "Réduit la défense adverse": "Reduces enemy defense",
    "Copie la compétence adverse au 4e tour": "Copies the enemy skill every 4 turns",
    "Soin à chaque tour": "Healing each turn",
    "Réduit l’esquive adverse": "Reduces enemy dodge",
    "Chance d’annuler une attaque": "Chance to cancel an attack",
    "Critique et esquive": "Critical and dodge chance",
    "Dégâts ± bonus, tiré à chaque duel": "Damage ± bonus, rolled per duel",
    "%s · acquis niv. %d\n%s": "%s · acquired lv. %d\n%s",
    "le Brave": "the Brave",
    "Sans Peur": "the Fearless",
    "de Travers": "the Crooked",
    "l’Improbable": "the Unlikely",
    "du Dimanche": "the Weekend Hero",
    "Frappe lourde": "Heavy strike",
    "Double tir": "Double shot",
    "Boule de feu": "Fireball",
    "Rempart": "Bulwark",
    "Carte folle": "Wild card",
    "Frappe de l’ombre": "Shadow strike",
    "Tourelle": "Turret",
    "Furie": "Fury",
    "Drain de vie": "Life drain",
    "Impulsion": "Pulse",
    "Combo": "Combo",
    "Frappe lourde : dégâts ×1,7 tous les 3 tours": "Heavy strike: ×1.7 damage every 3 turns",
    "Double tir : dégâts ×1,5 tous les 3 tours": "Double shot: ×1.5 damage every 3 turns",
    "Boule de feu : dégâts ×1,6 tous les 3 tours, brûlure": "Fireball: ×1.6 damage every 3 turns, burns",
    "Rafale : dégâts ×1,6, ignore 25 % de défense": "Burst fire: ×1.6 damage, ignores 25% defense",
    "Rempart : dégâts ×1,15 et bouclier de 12 % des PV max": "Bulwark: ×1.15 damage and a shield for 12% max HP",
    "Carte folle : dégâts aléatoires ×0,9 à ×2,1": "Wild card: random ×0.9 to ×2.1 damage",
    "Frappe de l’ombre : dégâts ×1,45 et +12 % d’esquive pour un coup": "Shadow strike: ×1.45 damage and +12% dodge for one attack",
    "Paume apaisante : dégâts ×1,15 et soin de 8 % des PV max": "Soothing palm: ×1.15 damage and heals 8% max HP",
    "Tourelle : dégâts ×1,2 et tir bonus de 6 dégâts": "Turret: ×1.2 damage and a bonus shot for 6 damage",
    "Furie : dégâts ×1,35 à ×2 selon les PV perdus": "Fury: ×1.35 to ×2 damage based on missing HP",
    "Drain de vie : dégâts ×1,35 et soin de 40 % des dégâts infligés": "Life drain: ×1.35 damage and heals 40% of damage dealt",
    "Impulsion : dégâts ×1,3, ignore 50 % de défense": "Pulse: ×1.3 damage, ignores 50% defense",
    "Combo : dégâts ×1,5, retarde l’action adverse de 0,45 s": "Combo: ×1.5 damage, delays enemy action by 0.45 s",
    "CRITIQUE": "CRITICAL",
    "BRÛLURE": "BURN",
    "SOIN": "HEAL",
    "BOUCLIER": "SHIELD",
    "BLOQUÉ": "BLOCKED",
    "MORSURE": "BITE",
    "TOURELLE": "TURRET",
    "COPIE": "COPY",
    "ESQUIVE": "DODGE",
    "ANNULÉ": "CANCELLED",
    "EN FEU": "BURNING",
    "DÉFENSE RÉDUITE": "DEFENSE DOWN",
    "ESQUIVE RENFORCÉE": "DODGE UP",
    "DÉSÉQUILIBRÉ": "STAGGERED",
    "POTION +": "POTION +",
    "POTION −": "POTION −",
    "01  RECRUTEZ — Cinq emplacements et treize classes. Relancez librement avant confirmation. Chaque nouveau héros possède cinq cœurs.": "01  RECRUIT — Five slots and thirteen classes. Reroll freely before confirming. Each new hero has five hearts.",
    "02  ÉQUIPEZ — Une arme, une armure, un familier et un objet. Tous sont compatibles avec chaque classe. L’inventaire reste individuel.": "02  EQUIP — One weapon, armor, pet and trinket. Every class can use all equipment. Inventories are individual.",
    "03  COMBATTEZ — Choisissez un des trois adversaires IA. Duel automatique de 30 secondes maximum, pour 20 énergie. Régénération : 1 énergie par minute, même hors ligne.": "03  FIGHT — Pick one of three AI opponents. Automatic duels last at most 30 seconds and cost 20 energy. Regeneration: 1 energy per minute, even offline.",
    "04  SURVIVEZ — Une défaite coûte un cœur. Victoires et égalités n’en retirent pas et ne restaurent pas les cœurs. À zéro : mort définitive, bilan de carrière et emplacement libéré.": "04  SURVIVE — Each defeat costs one heart. Wins and draws neither cost nor restore hearts. At zero: permanent death, a career summary and a free recruitment slot.",
    "05  PROGRESSEZ — XP : victoire 100 %, défaite 50 %, égalité 75 %. Un point de statistique par niveau ; tous les cinq niveaux, un équipement parmi trois. Maximum : niveau 20.": "05  GROW — XP: win 100%, loss 50%, draw 75%. One stat point per level; every five levels, choose one of three items. Level cap: 20.",
    "06  OBSERVEZ — Rouge : dégâts. Orange : critique ou brûlure. Vert : soin. Bleu : bouclier. Violet : magie ou effet spécial. Les noms des compétences apparaissent à leur activation.": "06  WATCH — Red: damage. Orange: critical or burn. Green: healing. Blue: shield. Purple: magic or special effects. Skill names appear when activated.",
    "07  SOUVENEZ-VOUS — Le cimetière conserve les héros morts, leur équipement final et leur carrière. Les anciennes défaites de la version 0.1 ne retirent aucun cœur à la migration.": "07  REMEMBER — The graveyard preserves fallen heroes, final equipment and careers. Losses from version 0.1 do not cost hearts during migration.",
    "08  SAUVEGARDE — Un duel est enregistré avant son animation. Fermer le jeu ne l’annule pas. Revoir le duel ne redonne ni récompense ni perte de cœur.": "08  SAVE — Duels are saved before their animation. Closing the game does not cancel a duel. Replays never repeat rewards or heart loss.",
    "09  OPTIONS — Choisissez Français ou English. Le choix est sauvegardé. Les noms propres des héros sont conservés.": "09  OPTIONS — Choose Français or English. Your choice is saved. Hero names remain unchanged.",
    "10  DÉVELOPPEMENT — Énergie, XP et équipement de test. Les compteurs de dégâts, critiques et compétences commencent avec cette version ; les anciens résultats restent conservés.": "10  DEVELOPER — Test energy, XP and equipment. Damage, critical and skill counters start with this version; old battle results are preserved.",
    "Rempart : dégâts ×1,15 et bouclier de 6 % des PV max": "Bulwark: ×1.15 damage and a shield for 6% max HP",
    "Paume apaisante : dégâts ×1,15 et soin de 5 % des PV max": "Soothing palm: ×1.15 damage and heals 5% max HP",
    "Copie la compétence adverse tous les 4 tours": "Copies the enemy skill every 4 turns",
    "Avantage +8 % : ": "Advantage +8%: ",
    "PV soignés à chaque tour": "HP restored each turn",
    "Trooper": "Trooper",
    "Paladin": "Paladin",
    "Épée": "Sword",
    "Fusil": "Rifle",
    "Arc court": "Shortbow",
    "Dague": "Dagger",
    "Marteau de guerre": "War hammer",
    "Cuir souple": "Soft leather",
    "Arc long": "Longbow",
    "Arbalète": "Crossbow",
    "Baguette de braise": "Ember wand",
    "Orbe de foudre": "Lightning orb",
    "Sabre": "Saber",
    "Hache de guerre": "War axe",
    "Bâton de combat": "Combat staff",
    "Cestes": "Cestus",
    "Pistolets": "Pistols",
    "Cotte de mailles": "Chainmail",
    "Veste renforcée": "Reinforced vest",
    "Robe runique": "Runic robe",
    "Robe de protection": "Protective robe",
    "Tortue": "Turtle",
    "Médaillon de vigueur": "Vigor medallion",
    "Sceau de résistance": "Resistance seal",
    "Dégâts de la classe": "Class damage",
    "Dégâts de la classe ; portée selon le héros": "Class damage; range depends on hero",
    "Chance de critique": "Critical chance",
    "Dégâts ; cadence −20 % ; boucliers subissent +50 %": "Damage; attack rate −20%; shields take +50%",
    "Résistance physique ; cadence −5 %": "Physical resistance; attack rate −5%",
    "Réduction des dégâts à distance": "Ranged damage reduction",
    "Réduit la résistance physique adverse": "Reduces enemy physical resistance",
    "Dégâts ; cadence −10 %": "Damage; attack rate −10%",
    "Ignore une part de la résistance adverse": "Ignores a share of enemy resistance",
    "Brûlure pendant 2 tours ; rafraîchie sans cumul": "Burn for 2 turns; refreshes without stacking",
    "Dégâts variables, bonus de 0 à la valeur indiquée": "Variable damage bonus from zero to the stated value",
    "Précision et critique": "Accuracy and critical chance",
    "Saignement pendant 2 tours ; rafraîchi sans cumul": "Bleed for 2 turns; refreshes without stacking",
    "Vitesse et esquive": "Speed and dodge",
    "Vitesse et précision": "Speed and accuracy",
    "Résistance physique": "Physical resistance",
    "PV maximum": "Maximum HP",
    "Résistance magique": "Magic resistance",
    "Bouclier initial en proportion des PV maximum": "Initial shield as a share of maximum HP",
    "Rafale : dégâts ×1,6, ignore 15 % de défense": "Burst fire: ×1.6 damage, ignores 15% defense",
    "Paume apaisante : dégâts ×1,15 ; soin 5 % jusqu’à 250 PV max, 2,5 % au-delà": "Soothing palm: ×1.15 damage; heals 5% of max HP up to 250, 2.5% above",
    "Réduit les défenses physique et magique adverses": "Reduces enemy physical and magic defenses",
    "Brûlure 2 tours ; synergie avec la compétence du Mage": "Burn for 2 turns; synergy with the Mage skill"
  },
  "ACTIVE_CLASSES": [
    0,
    1,
    2,
    3,
    4,
    6,
    7,
    8,
    9
  ],
  "RANGED_CLASSES": [
    1,
    3,
    8,
    2
  ],
  "WEAPON_POOLS": {
    "0": [
      0,
      4,
      5
    ],
    "1": [
      2,
      19,
      20
    ],
    "2": [
      3,
      21,
      22
    ],
    "3": [
      1,
      27,
      20
    ],
    "4": [
      0,
      5,
      3
    ],
    "6": [
      4,
      23,
      25
    ],
    "7": [
      25,
      26
    ],
    "8": [
      1,
      20,
      27
    ],
    "9": [
      0,
      24,
      5
    ]
  },
  "ARMOR_POOLS": {
    "0": [
      9,
      8,
      28,
      29,
      6
    ],
    "1": [
      9,
      8,
      28,
      29,
      7
    ],
    "2": [
      8,
      30,
      31
    ],
    "3": [
      29,
      7,
      28
    ],
    "4": [
      28,
      29,
      6
    ],
    "6": [
      9,
      8
    ],
    "7": [
      8,
      30,
      31
    ],
    "8": [
      9,
      8,
      29,
      7
    ],
    "9": [
      9,
      29,
      28
    ]
  }
};
