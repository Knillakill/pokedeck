# Plan Ultra-Détaillé — Jeu de Cartes Salamèche (Charmander)

---

## 1. Vision & Philosophie

Salamèche est un personnage **offensif, impulsif et escaladant**.
Son gameplay repose sur l'**accumulation de puissance à travers le combat lui-même** : plus il encaisse, plus il attaque, plus il brûle. Il ne gagne pas en jouant prudemment — il gagne en s'engageant sans relâche.

À la différence de Bulbizarre (patient, contrôle) et Carapuce (défensif), Salamèche est le personnage **aggro** : il termine le combat vite ou il perd.

### Les 4 Archétypes Principaux

| Archétype | Concept central | Mot-clé signature |
|-----------|----------------|-------------------|
| 🔴 **Brûlure** | Enflammer l'ennemi, amplifier la douleur | `Brûlure` |
| 🟠 **Fureur** | Chaque dégât reçu donne de la puissance | `Fureur` |
| ⚔️ **Critique** | Coups critiques fréquents + Danse-Lames | `Critique` |
| 🐉 **Dragon** | Cartes évolutives à haut coût, puissance absolue | `Dragon` |

---

## 2. Mécaniques Spéciales

### 🔴 Brûlure
- Appliquée sur l'ennemi.
- Inflige **2 dégâts fixes** à la fin de chaque tour ennemi (ne diminue pas, dure jusqu'à extinction).
- Ne se cumule pas en stacks mais **peut être intensifiée** (Brûlure Intense : 4 dégâts/tour).
- Certaines cartes **explosent** si l'ennemi est brûlé.

### 🟠 Fureur
- Compteur personnel.
- Chaque fois que **vous subissez des dégâts**, gagnez **1 Fureur**.
- Chaque stack de Fureur ajoute **+1 dégâts** à toutes les attaques Feu.
- Se réinitialise à 0 entre les combats.
- Certaines cartes consomment toute la Fureur pour un effet massif.

### ⚔️ Critique
- Les coups critiques font **×1.75** dégâts (vs ×1.5 par défaut).
- Certaines cartes augmentent le taux de critique de façon permanente ce combat.
- **Tranche** et ses variantes ont un taux de critique naturellement élevé.

### 🐉 Dragon
- Les cartes Dragon ont un coût élevé (2-3) mais des effets disproportionnés.
- Certaines cartes réduisent le coût des cartes Dragon suivantes.
- **Dracogriffe** gagne des bonus si d'autres cartes Dragon ont déjà été jouées ce combat.

### ⚪ Statuts de contrôle
| Statut | Effet |
|--------|-------|
| **Brûlure** | 2 dégâts/tour, ne diminue pas |
| **Brûlure Intense** | 4 dégâts/tour |
| **Peur** | L'ennemi inflige 25% de dégâts en moins (2 tours) |
| **Effroi** | L'ennemi passe son prochain tour (terreur absolue) |

---

## 3. Cartes de Départ (Deck Initial × 10)

| # | Nom | Type | Coût | Effet | Effet+ | Archétype |
|---|-----|------|------|-------|--------|-----------|
| 1 | **Griffe** ×4 | Attaque | 1 | Inflige **8** dégâts | Inflige **10** dégâts | Universel |
| 2 | **Esquive** ×4 | Compétence | 1 | Gagne **7** Défense | Gagne **9** Défense | Défense |
| 3 | **Braise** | Compétence | 1 | Applique **Brûlure**. S'épuise | Ne s'épuise plus | Brûlure |
| 4 | **Rugissement** | Compétence | 1 | Applique **Peur** (ennemi -25% dégâts, 2 tours) | 3 tours | Statut |

---

## 4. Cartes Communes (20 cartes)

### 🔴 Communes — Brûlure (5 cartes)

---

#### BRAISE *(Ember)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **6** dégâts. **30%** de chance d'appliquer **Brûlure**.
- **Effet+** : Inflige **8** dégâts. **50%** de Brûlure.
- **Synergies** : Lance-Flammes (si brûlé, bonus), Flammèche, Coup de Feu
- **Note** : Attaque de base du feu. La chance de brûlure la rend imprévisible mais toujours menaçante.

---

#### COUP DE FEU *(Flame Burst)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **7** dégâts. Si l'ennemi est **déjà brûlé** : inflige **11** dégâts à la place.
- **Effet+** : **9** / **15** dégâts.
- **Synergies** : Braise, Feu Follet, tout ce qui applique Brûlure
- **Note** : Carte qui récompense immédiatement d'avoir brûlé l'ennemi. Braise → Coup de Feu = combo de base.

---

#### FEU FOLLET *(Will-O-Wisp)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Applique **Brûlure** à l'ennemi de façon **infaillible**. S'épuise.
- **Effet+** : Ne s'épuise plus.
- **Synergies** : Coup de Feu, Lance-Flammes, Déflagration
- **Note** : Garantit la Brûlure sans aléatoire. Non améliorée = usage unique tactique, améliorée = disponible chaque combat.

---

#### FUMÉE *(Smog)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **5** dégâts. Applique **Peur** (ennemi -25% dégâts, 2 tours). Applique **Brûlure** (50%).
- **Effet+** : Inflige **6** dégâts. Brûlure à **75%**.
- **Synergies** : Builds Brûlure qui veulent aussi réduire les dégâts reçus
- **Note** : Deux effets en un : réduction dégâts + chance brûlure. Carte très polyvalente.

---

#### NITROCHARGE *(Flame Charge)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **7** dégâts. Gagne **1 Fureur**.
- **Effet+** : Inflige **9** dégâts. Gagne **2 Fureur**.
- **Synergies** : Archétype Fureur, Déflagration (consomme la Fureur)
- **Note** : Lie les archétypes Brûlure et Fureur. Attaque qui construit aussi le compteur de rage.

---

### 🟠 Communes — Fureur (5 cartes)

---

#### GRIFFE *(Scratch)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **8** dégâts.
- **Effet+** : Inflige **11** dégâts.
- **Synergies** : Fureur (bénéficie du buff), Danse-Lames
- **Note** : Attaque de base simple. Bénéficie naturellement de tous les buffs offensifs.

---

#### RUGISSEMENT *(Growl)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Applique **Peur** à l'ennemi (inflige 25% dégâts en moins, 2 tours).
- **Effet+** : **3 tours**.
- **Synergies** : Archétype Fureur (réduire les dégâts entrants pour éviter de subir trop), Vampirisme
- **Note** : Paradoxalement utile dans un deck Fureur : réduit les dégâts reçus pour survivre plus longtemps.

---

#### GROZ'YEUX *(Leer)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Réduit la **Défense** de l'ennemi de **8** ce tour. Si l'ennemi est **brûlé** : réduit de **14**.
- **Effet+** : Réduit de **10** / **18**.
- **Synergies** : Toute attaque forte jouée après (Lance-Flammes, Déflagration)
- **Note** : Perce la défense adverse. Combo avec Brûlure pour maximiser l'effet.

---

#### GRIFFE DE FER *(Metal Claw)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **7** dégâts. **40%** de chance de gagner **1 Fureur supplémentaire**.
- **Effet+** : Inflige **9** dégâts. **60%** de chance.
- **Synergies** : Archétype Fureur, Danse-Lames
- **Note** : Attaque physique avec chance de booster le compteur de rage. Chaque Griffe de Fer jouée peut faire boule de neige.

---

#### GRIMACE *(Scary Face)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Applique **Effroi** : l'ennemi passe son prochain tour. S'épuise.
- **Effet+** : Ne s'épuise plus.
- **Synergies** : Lance-Flammes (inflige dégâts pendant le tour volé), Builds Fureur (prendre moins de coups = ne pas stacker inutilement)
- **Note** : Contrôle dur. Équivalent de Poudre Dodo pour Salamèche. Très fort non améliorée.

---

### ⚔️ Communes — Critique (5 cartes)

---

#### TRANCHE *(Slash)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **8** dégâts. Taux de **Critique élevé** (40% → ×1.75).
- **Effet+** : Inflige **10** dégâts. Critique à **55%**.
- **Synergies** : Danse-Lames, Archétype Critique
- **Note** : L'attaque critique signature de Salamèche. Avec Danse-Lames, les critiques deviennent monstrueux.

---

#### COUP DE GRIFFE *(Fury Swipes)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **3 dégâts × 4 fois**. Chaque hit a une chance de critique indépendante (20%).
- **Effet+** : **4 × 4** dégâts. Critique à 30%.
- **Synergies** : Archétype Critique, Feu Follet (chaque hit peut déclencher effets secondaires futurs)
- **Note** : Multi-hits avec critiques indépendants. Peut faire x1.75 sur 4 hits si combo parfait.

---

#### TAILLADE *(Cut — move universel Pokémon)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **8** dégâts. Si c'est un **Coup Critique**, gagne **1 Fureur**.
- **Effet+** : Inflige **10** dégâts. Critique → **2 Fureur**.
- **Synergies** : Lien Critique-Fureur, Danse-Lames pour augmenter la chance de crit
- **Note** : La carte qui connecte les archétypes Critique et Fureur. Un crit = plus de rage = plus de dégâts.

---

#### DANSE-LAMES *(Swords Dance)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Gagne **2 Force** permanente (+2 dégâts sur toutes les attaques).
- **Effet+** : Gagne **3 Force**.
- **Synergies** : Tranche, Coup de Griffe, Dracogriffe
- **Note** : Équivalent du Danse-Lames de Bulbizarre mais central dans l'archétype Critique de Salamèche.

---

#### MORSURE *(Bite)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **7** dégâts. **30%** de chance de faire reculer l'ennemi (**Tétanise** : l'ennemi ne peut pas attaquer ce tour).
- **Effet+** : Inflige **9** dégâts. Tétanise à **45%**.
- **Synergies** : Combo agressif (si ennemi tétanisé, attaque encore)
- **Note** : Chance d'annuler une attaque ennemie. Très fort dans les builds qui ont besoin de gagner du temps.

---

### 🐉 Communes — Dragon (2 cartes)

---

#### RUGISSEMENT DU DRAGON *(Dragon Rage)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Commune
- **Effet** : Inflige **15 dégâts fixes** (ignore la Défense).
- **Effet+** : Inflige **20 dégâts fixes**.
- **Synergies** : Contre les ennemis avec beaucoup de Défense, Archétype Dragon
- **Note** : Unique : ignore la défense. Parfait contre les ennemis qui se blindent.

---

#### GRIFFE DRAGON *(Dragon Claw)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Commune
- **Effet** : Inflige **14** dégâts.
- **Effet+** : Inflige **18** dégâts.
- **Synergies** : Archétype Dragon (réduit coût des prochaines cartes Dragon), Force Soleil... non, Furie Dragon
- **Note** : Attaque Dragon de base, coûteuse mais puissante. Prépare les combos Dragon.

---

### 🔵 Communes — Défense / Universel (3 cartes)

---

#### ESQUIVE *(Agility)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Gagne **8 Défense**.
- **Effet+** : Gagne **11 Défense**.
- **Synergies** : Archétype Fureur (survivre pour stacker), Bélier/Damoclès (compenser le recul)
- **Note** : Défense de base. Pas un personnage défensif mais il faut survivre pour brûler.

---

#### RÉCUPÉRATION *(Recover — move universel)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Récupère **8 PV**.
- **Effet+** : Récupère **12 PV**.
- **Synergies** : Bélier, Flammèche (recoil), Archétype Fureur
- **Note** : Soin basique. Compense les dégâts de recul des cartes agressives.

---

#### NITRO-SPRINT *(Quick Attack — rapidité)*
- **Type** : Attaque | **Coût** : 0 | **Rareté** : Commune
- **Effet** : Inflige **5** dégâts. **Priorité** (toujours joué avant l'attaque ennemie ce tour).
- **Effet+** : Inflige **7** dégâts.
- **Synergies** : Builds agressifs pour finir l'ennemi avant qu'il attaque
- **Note** : Carte gratuite avec priorité. Parfaite pour exécuter un ennemi à faibles PV.

---

## 5. Cartes Peu Communes (18 cartes)

### 🔴 Peu Communes — Brûlure (5 cartes)

---

#### LANCE-FLAMMES *(Flamethrower)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Inflige **16** dégâts. Si l'ennemi est **brûlé** : inflige **22** dégâts.
- **Effet+** : **19** / **26** dégâts.
- **Synergies** : Feu Follet, Braise (pour garantir la Brûlure avant)
- **Note** : L'attaque Feu signature. Le finisher de l'archétype Brûlure. Toujours jouer après avoir appliqué la Brûlure.

---

#### INTENSIFICATION *(Intensify — référence univers Pokémon Feu)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Si l'ennemi est **brûlé** : transforme la Brûlure en **Brûlure Intense** (4 dégâts/tour au lieu de 2).
- **Effet+** : De plus, inflige immédiatement **8** dégâts bonus.
- **Synergies** : Feu Follet + Intensification = Brûlure Intense infaillible, Déflagration
- **Note** : Doublement du tick de brûlure. Sur 5 tours = 20 dégâts passifs au lieu de 10.

---

#### JET DE FLAMME *(Fire Spin)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : L'ennemi est **Emprisonné dans les flammes** : il ne peut pas fuir et reçoit **3 dégâts au début de chaque tour** pendant **3 tours**.
- **Effet+** : **4 dégâts/tour** pendant **4 tours**.
- **Synergies** : Archétype Brûlure (cumul avec Brûlure), Déflagration
- **Note** : Dégâts sur la durée différents de la Brûlure. Se cumule avec elle pour une pression constante.

---

#### FLAMMÈCHE *(Flare Blitz)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Inflige **22** dégâts. Vous subissez **6** dégâts (recul). Applique automatiquement **Brûlure** à l'ennemi.
- **Effet+** : Inflige **26** dégâts. Recul réduit à **3**.
- **Synergies** : Récupération, Archétype Fureur (recul = +Fureur), Ténacité
- **Note** : Attaque Feu la plus puissante avec recul. Dans l'archétype Fureur, les dégâts reçus sont un avantage.

---

#### CENDRES *(Incinerate — move Pokémon)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Si l'ennemi a une **carte Pouvoir active** : détruit-la et inflige **10** dégâts. S'épuise.
- **Effet+** : Ne s'épuise plus.
- **Synergies** : Contre les ennemis qui se buffent, Feu Follet (appliquer brûlure en même temps)
- **Note** : Anti-buff. Détruit les effets passifs adverses (régénération, force...). Situationnelle mais game-changing.

---

### 🟠 Peu Communes — Fureur (4 cartes)

---

#### RAGE *(Rage — move Pokémon)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Permanent. Chaque fois que vous subissez des dégâts, gagnez **2 Fureur** (au lieu de 1).
- **Effet+** : Gagnez **3 Fureur** par coup reçu.
- **Synergies** : Flammèche (recul = +3 Fureur), Archétype Fureur, Surpuissance
- **Note** : Double ou triple la génération de Fureur. Transforme chaque coup reçu en carburant.

---

#### EXPLOSIVITÉ *(Outrage — référence Dragon/Rage)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Inflige **(Fureur × 2) + 8** dégâts. **Consomme toute la Fureur**.
- **Effet+** : **(Fureur × 3) + 8** dégâts.
- **Synergies** : Rage (pour stacker plus vite), Flammèche + Rage → Explosivité
- **Note** : Le finisher de l'archétype Fureur. 10 stacks = 28 dégâts. 15 stacks = 53 dégâts (avec upgrade).

---

#### ENDURANCE *(Guts — référence capacité Pokémon)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Tant que vous êtes **brûlé, paralysé ou empoisonné**, vos attaques infligent **+3 dégâts**.
- **Effet+** : **+5 dégâts**.
- **Synergies** : S'auto-appliquer des statuts (future mécanique), Archétype Fureur
- **Note** : Transforme les statuts négatifs en avantage offensif.

---

#### FORCE BRUTE *(Superpower — move Pokémon)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Inflige **20** dégâts. Réduit votre **Force** de 1.
- **Effet+** : Inflige **24** dégâts. Ne réduit plus la Force.
- **Synergies** : Danse-Lames (récupérer la Force perdue), Archétype Fureur
- **Note** : Grosse attaque à coût personnel. Améliorée = carte excellente sans inconvénient.

---

### ⚔️ Peu Communes — Critique (5 cartes)

---

#### CHARGE SAUVAGE *(Wild Charge — move Pokémon)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Inflige **12** dégâts. Si c'est un **Coup Critique** : vous récupérez **8 PV**.
- **Effet+** : Inflige **14** dégâts. Récupère **12 PV** sur crit.
- **Synergies** : Archétype Critique, Danse-Lames
- **Note** : Le crit devient aussi un soin. Rend le deck critique plus durable.

---

#### ACUITÉ *(Hone Claws — move Pokémon)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Augmente le **taux de Critique** de toutes vos attaques de **+15%** ce combat.
- **Effet+** : **+20%** de critique.
- **Synergies** : Tranche, Coup de Griffe, Taillade
- **Note** : Buff critique passif cumulable. Avec Danse-Lames + Acuité, les critiques arrivent presque à chaque coup.

---

#### ENTAILLE *(Fury Cutter — move Pokémon)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Inflige **5** dégâts. **Si jouée deux fois de suite dans le même combat** : inflige **10**, puis **20**, puis **30**...
- **Effet+** : Commence à **7** dégâts et double de même.
- **Synergies** : Decks qui recyclent rapidement leurs cartes (Chlorophylle, Désherbaffe)
- **Note** : Carte exponentielle. Dans un deck rapide, peut finir à 30-40 dégâts pour 1 énergie.

---

#### CONTRE-ATTAQUE *(Retaliate — move Pokémon)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Inflige **8** dégâts. Si vous avez subi des dégâts **ce tour** : c'est automatiquement un **Coup Critique**.
- **Effet+** : Inflige **11** dégâts. Crit garanti si blessé.
- **Synergies** : Archétype Fureur (prendre des coups intentionnellement), Flammèche
- **Note** : Garantit un crit si l'ennemi vous a touché ce tour. Symbole de la revanche.

---

#### TRANCHE CROISÉE *(Cross Chop — move Pokémon)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Inflige **16** dégâts. Taux de Critique très élevé (60%).
- **Effet+** : Inflige **19** dégâts. Critique à **75%**.
- **Synergies** : Acuité (critique quasi-certaine), Danse-Lames
- **Note** : L'attaque à plus haute chance de critique du jeu. Avec Acuité + Tranche Croisée = crit à 95%+.

---

### 🐉 Peu Communes — Dragon (4 cartes)

---

#### DRACOGRIFFE *(Dragon Claw améliorée — évolution du move)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Inflige **18** dégâts. Si vous avez joué **une autre carte Dragon ce combat** : inflige **24** dégâts.
- **Effet+** : **22** / **30** dégâts.
- **Synergies** : Rugissement du Dragon, Archétype Dragon
- **Note** : Gagne en puissance si le deck Dragon est cohérent.

---

#### SOUFFLE DRAGON *(Dragon Breath — move Pokémon)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Inflige **12** dégâts. **40%** de chance de **Paralyser** l'ennemi (passe son tour).
- **Effet+** : Inflige **15** dégâts. Paralysie à **60%**.
- **Synergies** : Lance-Flammes (profiter du tour de paralysie), Archétype Dragon
- **Note** : Attaque Dragon avec contrôle. Le temps libre de la paralysie = jouer un Lance-Flammes sans riposter.

---

#### DANSE DU DRAGON *(Dragon Dance — move Pokémon)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Gagne **1 Force** et les cartes Dragon coûtent **1 énergie de moins** (min. 1) ce tour.
- **Effet+** : Gagne **2 Force** et cartes Dragon **-1 coût** pour le reste du combat.
- **Synergies** : Dracogriffe, Rugissement du Dragon, toutes cartes Dragon
- **Note** : Rend l'archétype Dragon jouable rapidement. Lance-Flammes Dragon à coût réduit = brisé.

---

#### DENTS DE DRAGON *(Dragon Fang — référence objet Pokémon devenu move)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Pioche **2 cartes Dragon** depuis votre deck. S'épuise.
- **Effet+** : Pioche **2 cartes Dragon**. Ne s'épuise plus.
- **Synergies** : Archétype Dragon pur (trouver Dracogriffe ou Draco-Météore)
- **Note** : Tuteur. Cherche exactement ce dont le deck Dragon a besoin.

---

## 6. Cartes Rares (15 cartes)

### 🔴 Rares — Brûlure (4 cartes)

---

#### DÉFLAGRATION *(Overheat — move Pokémon)*
- **Type** : Attaque | **Coût** : 3 | **Rareté** : Rare
- **Effet** : Inflige **32** dégâts. Si l'ennemi est **brûlé** : inflige **44** dégâts. Réduit votre **Force** de 2.
- **Effet+** : Coût réduit à **2**. Réduit Force de 1.
- **Synergies** : Feu Follet → Déflagration (combo en 2 cartes), Danse-Lames (récupérer Force)
- **Note** : La plus grosse attaque du jeu. Avec Brûlure active = 44 dégâts en un coup. Coût en Force = gestion stratégique.

---

#### PYROBOMBE *(Fire Blast)*
- **Type** : Attaque | **Coût** : 3 | **Rareté** : Rare
- **Effet** : Inflige **28** dégâts. Applique **Brûlure Intense** automatiquement. **15%** de chance de rater.
- **Effet+** : Ne peut plus rater. Inflige **30** dégâts.
- **Synergies** : Intensification, Lance-Flammes (enchaîner le lendemain)
- **Note** : Grosse attaque + Brûlure Intense d'un coup. Risque de rater non améliorée = tension.

---

#### CHALEUR INFERNALE *(Heat Wave — move Pokémon)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Inflige **14** dégâts. Si l'ennemi a une **Brûlure Intense** : inflige **14** dégâts **supplémentaires** et récupère **10 PV**.
- **Effet+** : **18** dégâts + **18** bonus + **14 PV**.
- **Synergies** : Intensification → Chaleur Infernale (combo 3 cartes)
- **Note** : Récompense massivement la préparation. Feu Follet → Intensification → Chaleur Infernale = environ 40 dégâts + soin.

---

#### SALAMÈCHE DÉCHAÎNÉ *(Overpower — référence capacité Torrent/Blaze)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Rare
- **Effet** : Permanent. Quand vos PV passent sous **33%**, toutes les attaques Feu infligent **+6 dégâts** et appliquent **Brûlure automatiquement**.
- **Effet+** : **+9 dégâts** et Brûlure Intense automatique.
- **Synergies** : Flammèche (s'auto-blesser pour activer), Récupération (jouer au seuil juste)
- **Note** : Mécanique Brasier (capacité réelle de Salamèche). Plus en danger = plus puissant. Très thématique.

---

### 🟠 Rares — Fureur (3 cartes)

---

#### ULTIME FUREUR *(Outrage — move Dragon/Rage)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Inflige **(Fureur × 4) + 6** dégâts. **Consomme toute la Fureur**. Gagne **2 Fureur** de base après.
- **Effet+** : **(Fureur × 5) + 6** dégâts.
- **Synergies** : Rage + Flammèche → Ultime Fureur
- **Note** : Version upgradée d'Explosivité. Même mécanique mais encore plus dévastatrice.

---

#### AVATAR DU FEU *(Blaziken reference — évolution ultime de la ligne Feu)*
- **Type** : Pouvoir | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Permanent. Chaque fois que vous jouez une attaque, gagnez **1 Fureur**.
- **Effet+** : Chaque attaque = **2 Fureur**.
- **Synergies** : Tout deck offensif, Explosivité (finaliser rapidement)
- **Note** : La Fureur n'a plus besoin d'être déclenchée par des dégâts reçus. Chaque attaque construite = plus de puissance.

---

#### RÉSISTANCE *(Iron Will — référence univers Pokémon)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Rare
- **Effet** : Ce combat, vous ne pouvez plus mourir sous **1 PV** pendant **3 tours**. Pendant ces tours, vos attaques infligent **+4 dégâts**.
- **Effet+** : **5 tours**. **+6 dégâts**.
- **Synergies** : Archétype Fureur (s'auto-blesser volontairement), Flammèche
- **Note** : Fenêtre d'invulnérabilité temporaire. Parfait pour jouer Flammèche × 3 sans mourir.

---

### ⚔️ Rares — Critique (4 cartes)

---

#### MEGA-ÉVOLUTION *(Mega Charizard X — référence lore)*
- **Type** : Pouvoir | **Coût** : 3 | **Rareté** : Rare
- **Effet** : Permanent. Tous vos **Coups Critiques** appliquent aussi **Brûlure Intense** automatiquement.
- **Effet+** : Coût réduit à **2**.
- **Synergies** : Tranche Croisée + Acuité (crit 95% = brûlure quasi-certaine), Danse-Lames
- **Note** : Connecte Critique et Brûlure en un seul Pouvoir. Le rêve des deux archétypes fusionnés.

---

#### FURIE TOTALE *(Rage Fist — move Pokémon)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Rare
- **Effet** : Inflige des dégâts égaux au **nombre de fois que vous avez été frappé ce combat** × 3. C'est automatiquement un **Coup Critique**.
- **Effet+** : × 4 par coup reçu.
- **Synergies** : Archétype Fureur, Rage (prendre plus de coups)
- **Note** : La carte qui lie Fureur et Critique. Plus blessé = plus de crit = plus de dégâts. Thème de Salamèche incarné.

---

#### LANCE-SOLEIL ARDENT *(Blast Burn — move exclusif évolution de Feu)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Rare
- **Effet** : **Ce tour** : entre en Chargement. **Au début du prochain tour** : inflige **34 dégâts** automatiquement. C'est un **Coup Critique** si l'ennemi est brûlé.
- **Effet+** : Inflige **40 dégâts**.
- **Synergies** : Feu Follet (brûler avant de charger), Peur Panique (prendre un tour libre pour charger)
- **Note** : Équivalent Lance-Soleil mais Feu. Avec Brûlure = crit garanti = 40 × 1.75 = 70 dégâts.

---

#### COMBO FATAL *(Final Gambit — move Pokémon)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Rare
- **Effet** : Inflige des dégâts égaux à vos **PV actuels**. Vous tombez à **1 PV**. S'épuise.
- **Effet+** : Ne s'épuise plus.
- **Synergies** : Résistance (pour survivre à 1 PV), Récupération (se soigner après), Salamèche Déchaîné (activer le bonus <33% PV)
- **Note** : La carte la plus risquée et la plus récompensante. 80 PV = 80 dégâts. La définition de Salamèche.

---

### 🐉 Rares — Dragon (4 cartes)

---

#### DRACO-MÉTÉORE *(Draco Meteor — move Dragon ultime)*
- **Type** : Attaque | **Coût** : 3 | **Rareté** : Rare
- **Effet** : Inflige **38** dégâts. Réduit votre **Fureur** de 5.
- **Effet+** : Inflige **44** dégâts. Réduit Fureur de 3.
- **Synergies** : Archétype Dragon pur, Danse du Dragon (pour coût réduit)
- **Note** : Le plus gros coup du jeu. La pénalité sur la Fureur oblige un choix stratégique.

---

#### TEMPÊTE DE DRAGON *(Dragon Storm — concept univers Pokémon)*
- **Type** : Pouvoir | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Permanent. Toutes vos cartes Dragon ont leurs effets **améliorés** (comme si elles étaient upgradées) ce combat.
- **Effet+** : De plus, les cartes Dragon coûtent **1 de moins**.
- **Synergies** : Archétype Dragon pur (améliore tout le set Dragon simultanément)
- **Note** : Carte build-defining absolue. Transforme tout le deck Dragon en cartes améliorées.

---

#### DRACAUFEU *(Charizard — référence évolution finale)*
- **Type** : Pouvoir | **Coût** : 3 | **Rareté** : Rare
- **Effet** : Permanent. Vos attaques Feu **appliquent Brûlure automatiquement**. Votre Brûlure fait **3 dégâts/tour** (au lieu de 2).
- **Effet+** : Coût réduit à **2**. Brûlure → **4 dégâts/tour**.
- **Synergies** : Lance-Flammes, Déflagration, tout le deck Feu
- **Note** : La transformation ultime. Chaque attaque Feu devient aussi une application de Brûlure. L'évolution incarnée en carte.

---

#### PURGATOIRE *(Inferno — move Pokémon)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Inflige **10** dégâts. L'ennemi prend **5 dégâts supplémentaires au début de CHAQUE tour** pour le reste du combat (se cumule avec Brûlure).
- **Effet+** : **12** dégâts. **7** dégâts/tour.
- **Synergies** : Brûlure (double dégâts continus), Jet de Flamme (triple pression)
- **Note** : Dégâts permanents non liés à la Brûlure. Ils ne diminuent pas et ne peuvent pas être éteints.

---

## 7. Synergies & Combos Clés

### 🔥 Combo "Incinération Instantanée"
```
Feu Follet → Intensification → Déflagration
```
**Résultat** : Brûlure garantie → Brûlure Intense (4/tour) → Déflagration profite de la Brûlure = **44 dégâts**. Tout en 3 cartes, 4 énergie.

---

### 💢 Combo "Rage Incontrôlable"
```
Rage (Pouvoir) → Flammèche × 3 → Explosivité
```
**Résultat** : Rage double la Fureur par coup reçu. Flammèche donne +6 Fureur (recul × Rage × 3). Explosivité × 3 = **(18 × 3) + 8 = 62 dégâts**.

---

### ⚔️ Combo "Critique Fatal"
```
Danse-Lames × 2 → Acuité → Tranche Croisée
```
**Résultat** : +4 Force + Critique à 95%. Tranche Croisée = **(19 + 4) × 1.75 = 40 dégâts** quasi-certains en un coup.

---

### 🐉 Combo "Éveil du Dragon"
```
Danse du Dragon → Dents de Dragon → Dracogriffe → Draco-Météore
```
**Résultat** : Dragon Dance réduit les coûts, Dents trouve les cartes Dragon, Dracogriffe profite d'une carte Dragon précédente, Draco-Météore à coût réduit = **44 dégâts** pour 2-3 énergie.

---

### 💀 Combo "All-In"
```
Combo Fatal → Salamèche Déchaîné actif → Lance-Flammes
```
**Résultat** : Combo Fatal fait les dégâts PV restants → tombe à 1 PV → Déchaîné s'active → Lance-Flammes +9 dégâts avec Brûlure auto. Maximum risque, maximum récompense.

---

### 🌟 Combo "Dracaufeu Parfait"
```
Dracaufeu (Pouvoir) → Purgatoire → Flammèche → Lance-Flammes
```
**Résultat** : Chaque attaque Feu brûle. Purgatoire = 7 dégâts/tour permanents. Flammèche + Brûlure Intense = 4/tour. Total passif : **11 dégâts/tour** sans compter les dégâts directs.

---

## 8. Tableau Récapitulatif

| Carte | Type | Coût | Rareté | Archétype |
|-------|------|------|--------|-----------|
| Griffe | Attaque | 1 | Starter | Universel |
| Esquive | Compétence | 1 | Starter | Défense |
| Braise (starter) | Compétence | 1 | Starter | Brûlure |
| Rugissement | Compétence | 1 | Starter | Statut |
| Braise | Attaque | 1 | Commune | Brûlure |
| Coup de Feu | Attaque | 1 | Commune | Brûlure |
| Feu Follet | Compétence | 1 | Commune | Brûlure |
| Fumée | Attaque | 1 | Commune | Brûlure/Statut |
| Nitrocharge | Attaque | 1 | Commune | Brûlure/Fureur |
| Griffe | Attaque | 1 | Commune | Attaque |
| Rugissement | Compétence | 1 | Commune | Statut |
| Groz'Yeux | Compétence | 1 | Commune | Brûlure/Débuff |
| Griffe de Fer | Attaque | 1 | Commune | Fureur |
| Peur Panique | Compétence | 1 | Commune | Contrôle |
| Tranche | Attaque | 1 | Commune | Critique |
| Coup de Griffe | Attaque | 1 | Commune | Critique/Multi |
| Taillade | Attaque | 1 | Commune | Critique/Fureur |
| Danse-Lames | Pouvoir | 1 | Commune | Critique/Buff |
| Morsure | Attaque | 1 | Commune | Contrôle |
| Rugissement du Dragon | Attaque | 2 | Commune | Dragon |
| Griffe Dragon | Attaque | 2 | Commune | Dragon |
| Esquive | Compétence | 1 | Commune | Défense |
| Récupération | Compétence | 1 | Commune | Sustain |
| Nitro-Sprint | Attaque | 0 | Commune | Attaque |
| Lance-Flammes | Attaque | 2 | Peu Commune | Brûlure |
| Intensification | Compétence | 1 | Peu Commune | Brûlure |
| Jet de Flamme | Compétence | 1 | Peu Commune | Brûlure |
| Flammèche | Attaque | 2 | Peu Commune | Brûlure/Fureur |
| Cendres | Compétence | 1 | Peu Commune | Anti-Buff |
| Rage | Pouvoir | 1 | Peu Commune | Fureur |
| Explosivité | Attaque | 2 | Peu Commune | Fureur |
| Endurance | Pouvoir | 1 | Peu Commune | Fureur |
| Force Brute | Attaque | 2 | Peu Commune | Fureur |
| Charge Sauvage | Attaque | 1 | Peu Commune | Critique |
| Acuité | Pouvoir | 1 | Peu Commune | Critique |
| Entaille | Attaque | 1 | Peu Commune | Critique |
| Contre-Attaque | Attaque | 1 | Peu Commune | Critique/Fureur |
| Tranche Croisée | Attaque | 2 | Peu Commune | Critique |
| Dracogriffe | Attaque | 2 | Peu Commune | Dragon |
| Souffle Dragon | Attaque | 2 | Peu Commune | Dragon |
| Danse du Dragon | Pouvoir | 1 | Peu Commune | Dragon |
| Dents de Dragon | Compétence | 1 | Peu Commune | Dragon |
| Déflagration | Attaque | 3 | Rare | Brûlure |
| Pyrobombe | Attaque | 3 | Rare | Brûlure |
| Chaleur Infernale | Attaque | 2 | Rare | Brûlure |
| Salamèche Déchaîné | Pouvoir | 1 | Rare | Brûlure/Survie |
| Ultime Fureur | Attaque | 2 | Rare | Fureur |
| Avatar du Feu | Pouvoir | 2 | Rare | Fureur |
| Résistance | Pouvoir | 1 | Rare | Fureur/Survie |
| Mega-Évolution | Pouvoir | 3 | Rare | Critique/Brûlure |
| Furie Totale | Attaque | 1 | Rare | Fureur/Critique |
| Blast Burn | Attaque | 2 | Rare | Critique/Brûlure |
| Combo Fatal | Attaque | 1 | Rare | Universel/Risque |
| Draco-Météore | Attaque | 3 | Rare | Dragon |
| Tempête de Dragon | Pouvoir | 2 | Rare | Dragon |
| Dracaufeu | Pouvoir | 3 | Rare | Brûlure/Dragon |
| Purgatoire | Attaque | 2 | Rare | Brûlure/Dragon |

**Total : 57 cartes** (4 starter + 20 communes + 18 peu communes + 15 rares)

---

## 9. Notes d'Implémentation

### Nouveaux effets à coder
| Effet | Description technique |
|-------|----------------------|
| `Brûlure` | 2 dégâts fixes/tour, ne diminue pas |
| `Brûlure Intense` | 4 dégâts fixes/tour |
| `Fureur` | Compteur offensif, gain sur dégâts reçus |
| `Critique ×1.75` | Multiplicateur plus élevé que le défaut ×1.5 |
| `Taux de Critique` | Pourcentage stackable |
| `Priorité` | Attaque avant l'ennemi ce tour |
| `Chargement (Feu)` | Comme Lance-Soleil : effet différé tour suivant |

### Priorité d'implémentation
1. **Brûlure** + **Coup de Feu** (archétype Brûlure opérationnel de suite)
2. **Fureur** + **Explosivité** (moment satisfaisant rapide)
3. **Tranche** + **Acuité** + **Danse-Lames** (archétype Critique)
4. **Dracaufeu** + **Draco-Météore** (fin game Dragon)
