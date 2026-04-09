# Plan Ultra-Détaillé — Jeu de Cartes Carapuce (Squirtle)

---

## 1. Vision & Philosophie

Carapuce est un personnage **défensif, méthodique et impénétrable**.
Son gameplay repose sur la **carapace comme ressource offensive** : il encaisse, se renforce, puis retourne la douleur. Contrairement à Bulbizarre (contrôle lent) et Salamèche (burst rapide), Carapuce est le personnage **control/tank** : il ralentit tout, accumule de l'avantage et gagne à l'usure.

Sa philosophie est celle d'une tortue : **défense = attaque**.

### Les 4 Archétypes Principaux

| Archétype | Concept central | Mot-clé signature |
|-----------|----------------|-------------------|
| 🔵 **Carapace** | Défense → Dégâts, la protection devient une arme | `Carapace` |
| 💧 **Flux Aquatique** | Pression constante, dégâts + contrôle de terrain | `Flux` |
| 🌊 **Tourbillon** | Momentum : chaque carte jouée amplifie la suivante | `Élan` |
| 🧊 **Gel** | Ralentir, geler, empêcher l'ennemi d'agir | `Gel` |

---

## 2. Mécaniques Spéciales

### 🔵 Carapace
- Un compteur personnel qui s'accumule.
- Chaque fois que vous gagnez de la **Défense**, ajoutez la **moitié** à votre compteur Carapace.
- Certaines cartes **dépensent la Carapace** pour infliger des dégâts ou déclencher des effets.
- **Repli** génère de la Carapace directement.

### 💧 Flux
- Un modificateur d'état actif.
- Quand vous avez **Flux actif**, vos attaques Eau infligent **+3 dégâts** bonus.
- Certaines cartes **activent le Flux** en les jouant.
- Le Flux s'éteint si vous ne jouez **aucune carte Eau** pendant un tour complet.

### 🌊 Élan
- Compteur de momentum.
- Chaque carte jouée dans le même tour ajoute **1 Élan**.
- Certaines cartes **s'améliorent** ou **coûtent moins** si vous avez de l'Élan.
- L'Élan se réinitialise à 0 au début de chaque nouveau tour.

### 🧊 Gel
- Appliqué sur l'ennemi.
- L'ennemi **passe son prochain tour** (comme Sommeil mais se brise sur n'importe quelle attaque reçue).
- **Gel Profond** : l'ennemi passe **2 tours**.
- Certaines cartes infligent des dégâts bonus contre un ennemi **gelé**.

### ⚪ Statuts de contrôle
| Statut | Effet |
|--------|-------|
| **Gel** | Passe son prochain tour, se brise sur attaque |
| **Gel Profond** | Passe 2 tours |
| **Confusion** | 40% de chance de s'attaquer lui-même |
| **Queue en Vrille** | Réduit la Défense de l'ennemi de X (débuff) |
| **Mouillé** | Prend 50% dégâts en plus des attaques Glace |

---

## 3. Cartes de Départ (Deck Initial × 10)

| # | Nom | Type | Coût | Effet | Effet+ | Archétype |
|---|-----|------|------|-------|--------|-----------|
| 1 | **Charge** ×4 | Attaque | 1 | Inflige **6** dégâts | Inflige **9** dégâts | Universel |
| 2 | **Repli** ×4 | Compétence | 1 | Gagne **6** Défense + **3** Carapace | Gagne **9** Défense + **5** Carapace | Carapace |
| 3 | **Pistolet à O** | Attaque | 1 | Inflige **5** dégâts. Active **Flux** | Inflige **8** dégâts. Active **Flux** | Flux |
| 4 | **Queue en Vrille** | Compétence | 1 | Réduit la Défense de l'ennemi de **6** | Réduit de **10** | Débuff |

---

## 4. Cartes Communes (20 cartes)

### 🔵 Communes — Carapace (5 cartes)

---

#### REPLI *(Withdraw)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Gagne **8 Défense**. Gagne **4 Carapace**.
- **Effet+** : Gagne **11 Défense**. Gagne **6 Carapace**.
- **Synergies** : Coud'Krane, Bouclier Éclat, tout l'archétype Carapace
- **Note** : Carte pivot de l'archétype. Génère directement les deux ressources clés.

---

#### BOUCLIER D'EAU *(Aqua Ring — move Pokémon)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Commune
- **Effet** : À la fin de chaque tour, récupère des PV égaux à **votre Carapace ÷ 3** (arrondi).
- **Effet+** : **Carapace ÷ 2** (arrondi).
- **Synergies** : Repli, Bouclier Éclat (pour maximiser la Carapace)
- **Note** : La Carapace ne sert plus seulement à attaquer — elle soigne aussi. Plus elle est haute, plus le soin est fort.

---

#### TORPEUR *(Shell Smash inverse — concept Pokémon)*
- **Type** : Compétence | **Coût** : 0 | **Rareté** : Commune
- **Effet** : Gagne **6 Défense**. S'épuise.
- **Effet+** : Gagne **9 Défense**. Ne s'épuise plus.
- **Synergies** : Toutes les cartes qui utilisent la Défense ou la Carapace
- **Note** : Carte gratuite de défense. Non améliorée = usage unique tactique.

---

#### PROTECTION *(Protect)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Gagne **8 Défense**. S'épuise.
- **Effet+** : Gagne **11 Défense**. Ne s'épuise plus.
- **Synergies** : Coud'Krane (charger pendant qu'on se protège), Élan (jouer avant d'autres cartes)
- **Note** : Gros bloc en urgence. Le plus haut montant de Défense d'une Commune.

---

#### MORSURE *(Bite)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **7** dégâts. **30%** de chance d'appliquer **Confusion** à l'ennemi.
- **Effet+** : Inflige **9** dégâts. Confusion à **45%**.
- **Synergies** : Hydrocanon (profiter de la Confusion), Builds contrôle
- **Note** : Attaque avec chance de contrôle. Confusion = 40% que l'ennemi s'attaque lui-même.

---

### 💧 Communes — Flux Aquatique (5 cartes)

---

#### PISTOLET À O *(Water Gun)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **7** dégâts. Active **Flux** (vos attaques Eau +3 dégâts jusqu'à fin du combat ou silence du Flux).
- **Effet+** : Inflige **9** dégâts. Flux dure **plus longtemps** (ne s'éteint qu'après 2 tours sans Eau).
- **Synergies** : Tout l'archétype Flux, Cascade, Hydrocanon
- **Note** : Carte activatrice du Flux. Jouer en premier dans un tour pour booster toutes les attaques suivantes.

---

#### JET D'EAU *(Water Pulse)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **8** dégâts. **25%** de chance d'appliquer **Confusion**.
- **Effet+** : Inflige **10** dégâts. Confusion à **40%**.
- **Synergies** : Flux (+3 dégâts si actif), Morsure (double chance de confusion)
- **Note** : Attaque Eau basique avec contrôle. Se cumule avec Pistolet à O pour maintenir le Flux.

---

#### AQUA-JET *(Aqua Jet)*
- **Type** : Attaque | **Coût** : 0 | **Rareté** : Commune
- **Effet** : Inflige **5** dégâts. **Priorité** (toujours joué en premier ce tour). Maintient le **Flux** actif.
- **Effet+** : Inflige **6** dégâts.
- **Synergies** : Flux (l'entretenir gratuitement), Builds qui veulent finir vite
- **Note** : Carte gratuite qui entretient le Flux sans coût. Très précieuse dans le mid-game.

---

#### CASCADE *(Waterfall)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Commune
- **Effet** : Inflige **12** dégâts. Si **Flux est actif** : inflige **17** dégâts.
- **Effet+** : **15** / **20** dégâts.
- **Synergies** : Pistolet à O → Cascade (combo de base du Flux), Aqua-Jet
- **Note** : Le premier vrai finisher du Flux. Pistolet à O active le Flux, Cascade explose dessus.

---

#### ONDE SONIQUE *(Supersonic)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Applique **Confusion** à l'ennemi de façon infaillible.
- **Effet+** : De plus, réduit la Défense de l'ennemi de **5**.
- **Synergies** : Cascade (inflige dégâts pendant la Confusion), Hydrocanon
- **Note** : Contrôle dur. 40% de chance que l'ennemi s'attaque lui-même à chaque tour.

---

### 🌊 Communes — Tourbillon / Élan (5 cartes)

---

#### CHARGE *(Tackle)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **8** dégâts.
- **Effet+** : Inflige **11** dégâts.
- **Synergies** : Élan (bénéficie si jouée en 3e+ carte du tour), Flux
- **Note** : Attaque de base. Polyvalente, bénéficie de tous les buffs.

---

#### TOURBILLON *(Whirlpool — move Pokémon)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **6** dégâts. L'ennemi est **Piégé** : reçoit **2 dégâts au début de chaque tour** pendant 3 tours.
- **Effet+** : Inflige **8** dégâts. **3 dégâts/tour** pendant 4 tours.
- **Synergies** : Builds contrôle, Gel (piégé + gelé = pression maximale)
- **Note** : Dégâts sur la durée. Différent de la Brûlure : s'applique aussi sur les ennemis gelés.

---

#### SURF *(Surf)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Commune
- **Effet** : Inflige **12** dégâts. Si c'est **la 3e carte jouée ce tour ou plus** : inflige **17** dégâts.
- **Effet+** : **14** / **20** dégâts.
- **Synergies** : Archétype Élan, Aqua-Jet (carte 0 pour atteindre le seuil)
- **Note** : Récompense de jouer beaucoup de cartes dans le même tour. Un deck rapide la joue toujours à 20.

---

#### ACCÉLÉRATION *(Agility — move Pokémon)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Pioche **1 carte**. Gagne **1 Élan**.
- **Effet+** : Pioche **2 cartes**. Gagne **1 Élan**.
- **Synergies** : Archétype Élan (cycler + générer de l'élan simultanément)
- **Note** : Draw + Élan en une seule carte. Fondamentale pour les decks Tourbillon.

---

#### QUEUE EN VRILLE *(Tail Whip)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Réduit la **Défense** de l'ennemi de **8** ce tour. Si **Élan ≥ 2** : réduit de **13**.
- **Effet+** : Réduit de **10** / **16**.
- **Synergies** : Élan (jouer après 2 cartes), Hydrocanon, Cascade
- **Note** : Prépare un burst aquatique. Idéale en milieu de tour après avoir établi l'Élan.

---

### 🧊 Communes — Gel (3 cartes)

---

#### RAYON GLACE *(Ice Beam)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Commune
- **Effet** : Inflige **12** dégâts. **30%** de chance d'appliquer **Gel**.
- **Effet+** : Inflige **14** dégâts. Gel à **50%**.
- **Synergies** : Builds Gel, Blizzard (si Gel déjà appliqué → bonus)
- **Note** : La carte Glace de base. La chance de Gel la rend imprévisible mais toujours menaçante.

---

#### BRUME *(Haze — move Pokémon)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Annule **tous les buffs actifs** de l'ennemi. S'épuise.
- **Effet+** : Ne s'épuise plus.
- **Synergies** : Contre les ennemis qui se renforcent, Builds contrôle
- **Note** : Supprime Force, Carapace adverse, tout. Situationnelle mais dévastatrice au bon moment.

---

#### GRÊLE *(Hail — move Pokémon)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Met en place **Grêle** : à la fin de chaque tour, inflige **2 dégâts** à l'ennemi. Dure **5 tours**.
- **Effet+** : **3 dégâts/tour**. Dure **7 tours**.
- **Synergies** : Archétype Gel (dégâts passifs pendant que l'ennemi est gelé), Blizzard
- **Note** : Dégâts continus de météo. Combiné avec Gel = l'ennemi prend des dégâts sans pouvoir riposter.

---

### 🔵 Communes — Universel (2 cartes)

---

#### RÉCUPÉRATION *(Recover)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Récupère **7 PV**.
- **Effet+** : Récupère **10 PV**.
- **Synergies** : Tous les archétypes (sustain général)
- **Note** : Soin basique indispensable pour le tank.

---

#### RÉSISTANCE AQUATIQUE *(Water Absorb — capacité Pokémon)*
- **Type** : Compétence | **Coût** : 0 | **Rareté** : Commune
- **Effet** : Si votre Défense actuelle est **supérieure à 10** : récupère **5 PV**. S'épuise.
- **Effet+** : Ne s'épuise plus.
- **Synergies** : Repli + Résistance Aquatique (enchaînement défense/soin)
- **Note** : Soin conditionnel gratuit. Récompense le maintien d'une haute Défense.

---

## 5. Cartes Peu Communes (18 cartes)

### 🔵 Peu Communes — Carapace (5 cartes)

---

#### COUD'KRANE *(Skull Bash)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : **Tour 1** : entre en **Charge** et gagne **10 Défense**. **Tour 2** : inflige **22 dégâts** automatiquement. Génère **11 Carapace** au total.
- **Effet+** : **26 dégâts** au Tour 2.
- **Synergies** : Archétype Carapace (génère massivement), Protection (sécuriser le chargement)
- **Note** : Carte à double tour. Gagne de la Carapace ET attaque. Le symbole du style patient de Carapuce.

---

#### BOUCLIER ÉCLAT *(Shell Blade — move Pokémon)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Inflige des dégâts égaux à votre **Carapace actuelle**. Réduit la Carapace de **5** après.
- **Effet+** : Réduit la Carapace de **3** après.
- **Synergies** : Repli + Bouclier Éclat (construire puis dépenser), Coud'Krane
- **Note** : Convertit la Carapace en dégâts directs. 20 Carapace = 20 dégâts. Excellent ratio.

---

#### ARMURE AQUEUSE *(Aqua Armor — concept univers Pokémon)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Permanent. Chaque fois que vous prenez des dégâts, gagnez **3 Carapace**.
- **Effet+** : Gagnez **4 Carapace** par coup reçu.
- **Synergies** : Bouclier Éclat (transformer les coups reçus en future offensive), Archétype Carapace
- **Note** : Rend chaque attaque ennemie une erreur. Il frappe, tu gagnes de la Carapace, tu contre avec Bouclier Éclat.

---

#### TORRENT *(Torrent — capacité de Carapuce)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Quand vos PV passent **sous 50%**, vos attaques Eau infligent **+4 dégâts** de façon permanente.
- **Effet+** : **+6 dégâts** sous 50% PV.
- **Synergies** : Builds tank qui encaissent (Carapuce prend des coups pour se renforcer)
- **Note** : Mécanique Torrent réelle de Carapuce. L'eau devient plus puissante quand en danger.

---

#### IMPÉNÉTRABLE *(Barrier — move Pokémon)*
- **Type** : Pouvoir | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Permanent. Votre **Défense ne tombe jamais sous 5** (minimum garanti chaque tour).
- **Effet+** : Minimum de **8** Défense garanti.
- **Synergies** : Bouclier d'Eau (Carapace → soin permanent car jamais à 0)
- **Note** : Immunité partielle. Même sans jouer de cartes défensives, tu as toujours un coussin.

---

### 💧 Peu Communes — Flux Aquatique (4 cartes)

---

#### HYDROCANON *(Hydro Pump)*
- **Type** : Attaque | **Coût** : 3 | **Rareté** : Peu Commune
- **Effet** : Inflige **22** dégâts. Si **Flux est actif** : inflige **28** dégâts. **15%** de chance de rater.
- **Effet+** : Ne peut plus rater. **24** / **30** dégâts.
- **Synergies** : Pistolet à O → Hydrocanon (combo essentiel du Flux)
- **Note** : La plus grosse attaque Eau. Le finisher absolu du Flux. Risque de rater non améliorée = gestion.

---

#### AQUA QUEUE *(Aqua Tail)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Inflige **14** dégâts. Maintient le **Flux actif** pour ce tour ET le prochain.
- **Effet+** : Inflige **17** dégâts.
- **Synergies** : Hydrocanon (Flux garanti pour le lendemain), Cascade
- **Note** : Assure la persistance du Flux sur 2 tours. Joué le soir avant Hydrocanon = parfait.

---

#### VAGUE SCINTILLANTE *(Scald — move Pokémon)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Inflige **13** dégâts. **40%** de chance d'appliquer **Brûlure** à l'ennemi. Active **Flux**.
- **Effet+** : Inflige **15** dégâts. Brûlure à **60%**.
- **Synergies** : Hybride Eau/Feu, Cascade (profiter de la Brûlure aussi)
- **Note** : Unique : attaque Eau qui peut brûler. Synergise avec les rares Eau+Brûlure et crée un archétype hybride.

---

#### MARÉE MONTANTE *(Soak — move Pokémon)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Applique **Mouillé** à l'ennemi : prend **50% dégâts en plus** des attaques Glace.
- **Effet+** : De plus, inflige immédiatement **6** dégâts.
- **Synergies** : Archétype Gel (Mouillé + Rayon Glace = dévastateur), Blizzard
- **Note** : Prépare un burst Glace massif. Mouillé × Rayon Glace = 18 dégâts × 1.5 = 27.

---

### 🌊 Peu Communes — Tourbillon / Élan (5 cartes)

---

#### SPIRALE *(Rapid Spin — move Pokémon)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Gagne **3 Élan**. Pioche **1 carte**. Supprime tous les effets de **Piège** sur vous.
- **Effet+** : Gagne **4 Élan**. Pioche **2 cartes**.
- **Synergies** : Archétype Élan (boost massif), Surf (atteindre le seuil d'Élan immédiatement)
- **Note** : Génère de l'Élan ET cycle. La carte la plus importante de l'archétype Tourbillon.

---

#### FLOT DÉCHAÎNÉ *(Torrent Rush — référence univers)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Inflige **(Élan × 3) + 4** dégâts. **Consomme tout l'Élan**.
- **Effet+** : **(Élan × 4) + 4** dégâts.
- **Synergies** : Spirale (générer l'Élan), Aqua-Jet + cartes 0-coût (monter l'Élan)
- **Note** : Le finisher de l'archétype Élan. 5 Élan = 19 dégâts. 8 Élan = 36 dégâts.

---

#### COURANT RAPIDE *(Quick Swim — concept Pokémon)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Permanent. Votre première carte jouée chaque tour **coûte 1 de moins** (min. 0).
- **Effet+** : Les **deux premières** cartes coûtent 1 de moins.
- **Synergies** : Archétype Élan (commencer à construire plus vite), Hydrocanon (coût réduit)
- **Note** : Réduction permanente de coût. Rend tout le deck plus fluide.

---

#### CYCLONE *(Whirlwind — move Pokémon)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Si **Élan ≥ 3** : inflige **12** dégâts et applique **Confusion**. Sinon : inflige seulement **5** dégâts.
- **Effet+** : Élan ≥ 2 suffit. **13** dégâts + Confusion.
- **Synergies** : Spirale, Aqua-Jet (atteindre l'Élan requis), Archétype Tourbillon
- **Note** : Carte conditionnelle puissante. Dans l'archétype Élan, la condition est presque toujours remplie.

---

#### TSUNAMI *(Tsunami — référence univers Pokémon)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Inflige **10** dégâts. Pour chaque **2 Élan** que vous avez : inflige **5 dégâts supplémentaires**.
- **Effet+** : **12** dégâts. +**6** par 2 Élan.
- **Synergies** : Spirale + Tsunami = gros dégâts selon Élan maintenu
- **Note** : Scale avec l'Élan sans le consommer. Idéale en milieu de combo.

---

### 🧊 Peu Communes — Gel (4 cartes)

---

#### AVALANCHE *(Avalanche — move Pokémon)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Inflige **13** dégâts. Si vous avez subi des dégâts **ce tour** : inflige **22** dégâts à la place.
- **Effet+** : **14** / **24** dégâts.
- **Synergies** : Builds tank (encaisser un coup ce tour), Armure Aqueuse
- **Note** : Contre-attaque. Laisser l'ennemi frapper en premier, puis Avalanche = dégâts doublés.

---

#### BLIZZARD *(Blizzard)*
- **Type** : Attaque | **Coût** : 3 | **Rareté** : Peu Commune
- **Effet** : Inflige **20** dégâts. **30%** de chance d'appliquer **Gel**. Si l'ennemi est **Mouillé** : Gel garanti.
- **Effet+** : Inflige **24** dégâts. Gel à **50%** de base. Mouillé → Gel Profond (2 tours).
- **Synergies** : Marée Montante → Blizzard (combo Gel garanti), Grêle
- **Note** : Attaque Glace ultime. Marée Montante la rend infaillible. Gel Profond avec upgrade = 2 tours libres.

---

#### GIVRAGE *(Frost Breath — move Pokémon)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Inflige **7** dégâts. Si l'ennemi est **gelé** : c'est automatiquement un **Coup Critique** (×1.75).
- **Effet+** : Inflige **9** dégâts.
- **Synergies** : Rayon Glace (geler d'abord), Blizzard, Gel garanti
- **Note** : Critique automatique sur ennemi gelé. Gel → Givrage = 9 × 1.75 = 16 dégâts pour 1 énergie.

---

#### VAGUE DE FROID *(Cold Wave — concept univers Pokémon)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Permanent. Quand vous appliquez **Gel** à l'ennemi, celui-ci reçoit immédiatement **6 dégâts bonus**.
- **Effet+** : **9 dégâts bonus** à l'application du Gel.
- **Synergies** : Rayon Glace, Blizzard, Marée Montante + Blizzard
- **Note** : Chaque Gel appliqué = dégâts bonus immédiats. Amplifie massivement l'archétype Gel.

---

## 6. Cartes Rares (15 cartes)

### 🔵 Rares — Carapace (4 cartes)

---

#### CARAPACE ABSOLUE *(Shell Armor — capacité Pokémon)*
- **Type** : Pouvoir | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Permanent. Vous **ne pouvez plus recevoir de Coups Critiques**. De plus, chaque fois que vous bloquez 10+ dégâts avec de la Défense, gagnez **5 Carapace**.
- **Effet+** : Gain de **8 Carapace** sur bloc de 10+.
- **Synergies** : Archétype Carapace (générer massivement), Repli, Protection
- **Note** : Immunité aux critiques + génération passive de Carapace. Rend Carapuce quasi-unkillable.

---

#### BLASTOISE *(Blastoise — évolution finale)*
- **Type** : Pouvoir | **Coût** : 3 | **Rareté** : Rare
- **Effet** : Permanent. Toutes vos attaques Eau infligent **+5 dégâts**. Vos cartes Eau coûtent **1 de moins** (min. 1).
- **Effet+** : Coût réduit à **2**.
- **Synergies** : Hydrocanon (coût 2 au lieu de 3), Cascade, tout le deck Eau
- **Note** : L'évolution ultime en carte. Transforme chaque attaque Eau en monstre.

---

#### CONTRE-CHOC *(Mirror Coat — move Pokémon)*
- **Type** : Compétence | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Inflige à l'ennemi **le double des dégâts que vous avez reçus ce tour** (si vous en avez pris). S'épuise.
- **Effet+** : Ne s'épuise plus.
- **Synergies** : Builds tank qui encaissent (Armure Aqueuse + Contre-Choc = prendre des coups et exploser)
- **Note** : Version Eau du Contrecoup de Bulbizarre. Ennemi frappe pour 15 → toi pour 30.

---

#### MÉGAPUISSANCE *(Mega Launcher — référence Blastoise Mega)*
- **Type** : Pouvoir | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Permanent. Chaque fois que vous dépensez de la **Carapace** (via Bouclier Éclat ou autre), inflige **5 dégâts bonus** supplémentaires.
- **Effet+** : **8 dégâts bonus**.
- **Synergies** : Bouclier Éclat (chaque utilisation inflige bonus), Armure Aqueuse
- **Note** : Amplifie massivement l'archétype Carapace. Chaque dépense de Carapace devient encore plus rentable.

---

### 💧 Rares — Flux Aquatique (3 cartes)

---

#### HYDROCANON ULTIME *(Hydro Cannon — move exclusif évolution Eau)*
- **Type** : Attaque | **Coût** : 3 | **Rareté** : Rare
- **Effet** : Inflige **28** dégâts si **Flux est actif**. Ce tour, le Flux **ne peut pas s'éteindre**. Entre en **Rechargement** (passe le prochain tour à récupérer).
- **Effet+** : Inflige **34** dégâts. Pas de Rechargement.
- **Synergies** : Blastoise (coût réduit à 2), Aqua Queue (Flux garanti)
- **Note** : L'attaque ultime. Avec Blastoise = 39 dégâts pour 2 énergie. Le Rechargement est le prix de la puissance absolue.

---

#### ÉBULLITION *(Steam Eruption — move Pokémon)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Inflige **15** dégâts. Applique **Mouillé** + **Brûlure** simultanément. Active **Flux**.
- **Effet+** : Inflige **19** dégâts.
- **Synergies** : Blizzard (Mouillé → Gel garanti), Vague Scintillante (double Brûlure)
- **Note** : Carte hybride absolue Eau/Feu/Glace. Prépare un Blizzard garanti le tour suivant.

---

#### MAELSTRÖM *(Maelstrom — concept univers)*
- **Type** : Pouvoir | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Permanent. Quand **Flux est actif**, chaque carte jouée génère **1 Élan** bonus.
- **Effet+** : **2 Élan** bonus par carte jouée sous Flux.
- **Synergies** : Archétype Flux + Élan fusionnés, Flot Déchaîné (accumuler Élan massivement)
- **Note** : Fusionne les deux archétypes. Flux actif + Maelström = chaque carte joue pour l'Élan aussi.

---

### 🌊 Rares — Tourbillon / Élan (4 cartes)

---

#### VORTEX AQUATIQUE *(Aqua Vortex — concept univers)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Inflige **12** dégâts. Pioche **1 carte par Élan** que vous avez (max 4). Ne consomme pas l'Élan.
- **Effet+** : Max **5 cartes** pioches.
- **Synergies** : Spirale + Vortex (main gigantesque), Archétype Élan
- **Note** : Convert l'Élan en draw massif. 4 Élan = 4 cartes pioches + 12 dégâts pour 2 énergie.

---

#### SPIRALE INFINIE *(Infinite Spin — référence Rapid Spin)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Rare
- **Effet** : Permanent. L'**Élan ne se réinitialise plus** entre les tours. Il ne fait que monter.
- **Effet+** : De plus, chaque 5 Élan = **+1 énergie** au prochain tour.
- **Synergies** : Archétype Élan entier (accumulation sur plusieurs tours)
- **Note** : Brise la mécanique de base : l'Élan devient permanent. Avec Flot Déchaîné = dégâts exponentiels sur la durée.

---

#### GRAND TOURBILLON *(Grand Cyclone — référence univers)*
- **Type** : Attaque | **Coût** : 3 | **Rareté** : Rare
- **Effet** : Inflige **(Élan × 4) + 8** dégâts. Applique **Confusion** à l'ennemi. Remet **l'Élan à 3** (pas à 0).
- **Effet+** : **(Élan × 5) + 8** dégâts. Élan revient à **5**.
- **Synergies** : Spirale Infinie (Élan énorme accumulé), Maelström
- **Note** : Le finisher Élan ultime. Contrairement à Flot Déchaîné, il conserve de l'Élan après pour continuer.

---

#### CARAPACE BRISÉE *(Shell Smash — move Pokémon)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Rare
- **Effet** : Réduit votre **Défense à 0** et votre **Carapace à 0**. En échange : gagne **5 Force**, pioche **3 cartes** et le prochain Hydrocanon/Cascade inflige **le double**. S'épuise.
- **Effet+** : Ne s'épuise plus.
- **Synergies** : Hydrocanon Ultime (avec le double = 72-84 dégâts), Récupération (reconstruire après)
- **Note** : La carte la plus risquée de Carapuce. Tout sacrifier pour un burst absolu. Thème de Carapace Brisée = tout ou rien.

---

### 🧊 Rares — Gel (4 cartes)

---

#### TEMPÊTE GLACIALE *(Ice Storm — concept univers)*
- **Type** : Attaque | **Coût** : 3 | **Rareté** : Rare
- **Effet** : Inflige **20** dégâts. Applique **Gel Profond** (2 tours). Si la **Grêle est active** : inflige **28** dégâts.
- **Effet+** : **24** / **30** dégâts.
- **Synergies** : Grêle → Tempête Glaciale (condition remplie + Gel Profond)
- **Note** : 2 tours de l'ennemi gelé = 2 tours libres pour préparer l'arsenal.

---

#### VERGLAS *(Black Ice — concept univers)*
- **Type** : Pouvoir | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Permanent. L'ennemi ne peut pas **se débarrasser** du Gel (il ne se brise plus sur une attaque reçue, mais dure jusqu'à la fin de la durée prévue).
- **Effet+** : De plus, le Gel inflige **2 dégâts/tour** à l'ennemi pendant qu'il est gelé.
- **Synergies** : Tout l'archétype Gel (rend le Gel beaucoup plus fiable)
- **Note** : Transforme le Gel en emprisonnement absolu. L'ennemi ne peut plus casser la glace.

---

#### FROID ABSOLU *(Absolute Zero — référence Pokémon/Sheer Cold)*
- **Type** : Compétence | **Coût** : 3 | **Rareté** : Rare
- **Effet** : Applique **Gel Profond** infaillible. Pendant que l'ennemi est gelé, vos attaques ignorent **toute sa Défense**. S'épuise.
- **Effet+** : Ne s'épuise plus.
- **Synergies** : Givrage (crit × 1.75 + ignore défense = massif), Hydrocanon Ultime
- **Note** : La fenêtre parfaite. 2 tours libres avec toute la Défense ennemie ignorée = 2 attaques maximales.

---

#### BLASTOISE GLACE *(Blastoise Ice Cannon — référence lore/FRLG)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Inflige **14** dégâts. Si l'ennemi est **gelé ET mouillé** : inflige **26** dégâts et le **Gel Profond** s'applique automatiquement.
- **Effet+** : **16** / **30** dégâts.
- **Synergies** : Marée Montante (Mouillé) + Rayon Glace (Gel) → Blastoise Glace
- **Note** : Nécessite de préparer 2 statuts mais la récompense est massive. 30 dégâts + Gel Profond = combo létale en 3 cartes.

---

## 7. Synergies & Combos Clés

### 🛡️ Combo "Tortue Impénétrable"
```
Repli → Repli → Coud'Krane (Tour 1) → Bouclier Éclat (Tour 2, auto-déclenche)
```
**Résultat** : 2 × Repli = 16 Défense + 8 Carapace. Coud'Krane charge + 10 Défense + 11 Carapace. Au Tour 2 : Coud'Krane frappe pour 22 + Bouclier Éclat pour 19 (Carapace = 19). **Total : 41 dégâts + tank absolu**.

---

### 💧 Combo "Flux Maximum"
```
Pistolet à O → Aqua Queue → Hydrocanon (Tour suivant avec Flux garanti)
```
**Résultat** : Flux actif → Aqua Queue maintient Flux pour demain → Hydrocanon à **28 dégâts**. Avec Blastoise = 33 dégâts pour 2 énergie.

---

### 🌊 Combo "Tourbillon Infini"
```
Spirale Infinie (Pouvoir) → Spirale × 2 → Maelström → Flot Déchaîné
```
**Résultat** : Spirale Infinie = Élan permanent. 2× Spirale = +8 Élan + 2 cartes. Maelström + Flux = encore plus d'Élan. Flot Déchaîné = **Élan × 4 + 4** potentiellement ≥ 40 dégâts.

---

### 🧊 Combo "Congélation Absolue"
```
Marée Montante → Blizzard → Verglas → Givrage × 2
```
**Résultat** : Mouillé → Blizzard Gel Profond garanti (2 tours) → Verglas (Gel ne se brise plus) → 2× Givrage critique = **12 × 2 = 24 dégâts** sans contre possible.

---

### 💥 Combo "All-In Carapace"
```
Carapace Absolue → Armure Aqueuse × 5 tours → Bouclier Éclat → Mégapuissance
```
**Résultat** : Carapace monte à ~25 en encaissant les coups. Bouclier Éclat = 25 dégâts. Mégapuissance ajoute 8 bonus = **33 dégâts**. L'ennemi a financé sa propre destruction.

---

### 💀 Combo "Carapace Brisée"
```
Carapace Brisée → Blastoise → Hydrocanon Ultime
```
**Résultat** : Carapace Brisée double le prochain Hydrocanon. Blastoise réduit son coût à 2. Hydrocanon Ultime = **34 × 2 = 68 dégâts pour 2 énergie**. Le combo le plus risqué et le plus puissant du jeu.

---

## 8. Tableau Récapitulatif

| Carte | Type | Coût | Rareté | Archétype |
|-------|------|------|--------|-----------|
| Charge | Attaque | 1 | Starter | Universel |
| Repli | Compétence | 1 | Starter | Carapace |
| Pistolet à O | Attaque | 1 | Starter | Flux |
| Queue en Vrille | Compétence | 1 | Starter | Débuff |
| Repli | Compétence | 1 | Commune | Carapace |
| Bouclier d'Eau | Pouvoir | 1 | Commune | Carapace |
| Torpeur | Compétence | 0 | Commune | Carapace |
| Protection | Compétence | 1 | Commune | Carapace |
| Morsure | Attaque | 1 | Commune | Contrôle |
| Pistolet à O | Attaque | 1 | Commune | Flux |
| Jet d'Eau | Attaque | 1 | Commune | Flux/Contrôle |
| Aqua-Jet | Attaque | 0 | Commune | Flux/Priorité |
| Cascade | Attaque | 2 | Commune | Flux |
| Onde Sonique | Compétence | 1 | Commune | Contrôle |
| Charge | Attaque | 1 | Commune | Universel |
| Tourbillon | Attaque | 1 | Commune | Élan/DoT |
| Surf | Attaque | 2 | Commune | Élan |
| Accélération | Compétence | 1 | Commune | Élan/Draw |
| Queue en Vrille | Compétence | 1 | Commune | Élan/Débuff |
| Rayon Glace | Attaque | 2 | Commune | Gel |
| Brume | Compétence | 1 | Commune | Anti-Buff |
| Grêle | Pouvoir | 1 | Commune | Gel |
| Récupération | Compétence | 1 | Commune | Sustain |
| Résistance Aquatique | Compétence | 0 | Commune | Sustain |
| Coud'Krane | Attaque | 2 | Peu Commune | Carapace |
| Bouclier Éclat | Attaque | 2 | Peu Commune | Carapace |
| Armure Aqueuse | Pouvoir | 1 | Peu Commune | Carapace |
| Torrent | Pouvoir | 1 | Peu Commune | Carapace/Survie |
| Impénétrable | Pouvoir | 2 | Peu Commune | Carapace |
| Hydrocanon | Attaque | 3 | Peu Commune | Flux |
| Aqua Queue | Attaque | 2 | Peu Commune | Flux |
| Vague Scintillante | Attaque | 2 | Peu Commune | Flux/Brûlure |
| Marée Montante | Compétence | 1 | Peu Commune | Gel/Flux |
| Spirale | Compétence | 1 | Peu Commune | Élan/Draw |
| Flot Déchaîné | Attaque | 1 | Peu Commune | Élan |
| Courant Rapide | Pouvoir | 1 | Peu Commune | Élan |
| Cyclone | Compétence | 1 | Peu Commune | Élan/Contrôle |
| Tsunami | Attaque | 2 | Peu Commune | Élan |
| Avalanche | Attaque | 2 | Peu Commune | Gel/Tank |
| Blizzard | Attaque | 3 | Peu Commune | Gel |
| Givrage | Attaque | 1 | Peu Commune | Gel/Critique |
| Vague de Froid | Pouvoir | 1 | Peu Commune | Gel |
| Carapace Absolue | Pouvoir | 2 | Rare | Carapace |
| Blastoise | Pouvoir | 3 | Rare | Flux/Universel |
| Contre-Choc | Compétence | 2 | Rare | Carapace |
| Mégapuissance | Pouvoir | 2 | Rare | Carapace |
| Hydrocanon Ultime | Attaque | 3 | Rare | Flux |
| Ébullition | Attaque | 2 | Rare | Flux/Gel |
| Maelström | Pouvoir | 2 | Rare | Flux/Élan |
| Vortex Aquatique | Attaque | 2 | Rare | Élan/Draw |
| Spirale Infinie | Pouvoir | 1 | Rare | Élan |
| Grand Tourbillon | Attaque | 3 | Rare | Élan |
| Carapace Brisée | Compétence | 1 | Rare | All-in |
| Tempête Glaciale | Attaque | 3 | Rare | Gel |
| Verglas | Pouvoir | 2 | Rare | Gel |
| Froid Absolu | Compétence | 3 | Rare | Gel |
| Blastoise Glace | Attaque | 2 | Rare | Gel/Flux |

**Total : 57 cartes** (4 starter + 20 communes + 18 peu communes + 15 rares)

---

## 9. Notes d'Implémentation

### Nouveaux effets à coder
| Effet | Description technique |
|-------|----------------------|
| `Carapace` | Compteur personnel, généré par la Défense |
| `Flux` | Modificateur actif, +3 dégâts Eau tant qu'entretenu |
| `Élan` | Compteur de cartes jouées dans le même tour |
| `Gel` | Skip prochain tour, se brise sur dégâts reçus |
| `Gel Profond` | Skip 2 tours |
| `Mouillé` | +50% dégâts Glace reçus |
| `Confusion` | 40% chance de s'attaquer soi-même |

### Priorité d'implémentation
1. **Carapace** + **Bouclier Éclat** (défense → attaque, thème central immédiatement satisfaisant)
2. **Flux** + **Cascade** + **Hydrocanon** (archétype Flux opérationnel)
3. **Élan** + **Flot Déchaîné** (archétype Tourbillon)
4. **Gel** + **Verglas** + **Blizzard** (archétype Gel, dernier car le plus complexe)
