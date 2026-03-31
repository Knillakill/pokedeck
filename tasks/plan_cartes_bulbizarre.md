# Plan Ultra-Détaillé — Jeu de Cartes Bulbizarre

---

## 1. Vision & Philosophie

Bulbizarre est un personnage **polyvalent et stratégique**, pas un simple spammeur de dégâts.
Son gameplay repose sur la **patience, l'accumulation et la synergie** entre ses cartes.
À l'image du Soldat de Fer dans Slay the Spire, chaque carte doit avoir une **raison d'exister dans un archétype précis**, et les vraies récompenses viennent des **combos entre cartes**.

### Les 4 Archétypes Principaux

| Archétype | Concept central | Mot-clé signature |
|-----------|----------------|-------------------|
| 🟣 **Poison** | Empoisonner l'ennemi, amplifier les stacks | `Poison` |
| 🟡 **Croissance** | Accumuler des buffs offensifs, finir fort | `Croissance` |
| 🟢 **Graine & Sustain** | Contrôle temporel, drain, soin | `Graine` |
| 🔵 **Défense & Parade** | Capitaliser sur la défense pour contre-attaquer | `Défense` |

---

## 2. Mécaniques Spéciales

### 🟣 Poison
- Chaque stack de Poison inflige **1 dégât à la fin du tour ennemi**, puis diminue de 1.
- Le **Poison Sévère** (Toxik) commence haut et **augmente** de 2 par tour au lieu de diminuer.
- Certaines cartes s'amplifient si l'ennemi est empoisonné.

### 🟡 Croissance
- Un compteur de buff personnel (Pouvoir).
- Chaque stack de **Croissance** ajoute **+2 dégâts** à toutes les attaques Végétales.
- Se cumule sans limite, mais se réinitialise entre les combats.

### 🟢 Graine
- Appliquée sur l'ennemi comme un Pouvoir.
- **Chaque fin de tour** : l'ennemi perd des PV, et le joueur en récupère.
- Certaines cartes deviennent plus puissantes si l'ennemi a une Graine active.

### 🔵 Défense (mécanique bloc-to-damage)
- Certaines cartes convertissent la **Défense excédentaire** en dégâts ou en ressources.
- Une carte rare permet de **dépenser de la Défense** pour attaquer.

### ⚪ Statuts de contrôle
| Statut | Effet |
|--------|-------|
| **Sommeil** | L'ennemi passe son prochain tour |
| **Paralysie** | 40% de chance que l'ennemi passe son tour |
| **Fragilité** | L'ennemi prend 50% de dégâts en plus (2 tours) |
| **Faiblesse** | L'ennemi inflige 25% de dégâts en moins (2 tours) |

---

## 3. Cartes de Départ (Deck Initial × 10)

Ces cartes forment le deck de base. Simples, fonctionnelles, représentent chaque archétype.

| # | Nom | Type | Coût | Effet | Effet+ | Archétype |
|---|-----|------|------|-------|--------|-----------|
| 1 | **Frappe** ×4 | Attaque | 1 | Inflige **8** dégâts | Inflige **10** dégâts | Universel |
| 2 | **Défense** ×4 | Compétence | 1 | Gagne **7** Défense | Gagne **9** Défense | Défense |
| 3 | **Poudre Toxik** | Compétence | 1 | Applique **3** Poison | Applique **5** Poison | Poison |
| 4 | **Poudre Dodo** | Compétence | 2 | Applique **Sommeil**. S'épuise | Ne s'épuise plus | Statut |

---

## 4. Cartes Communes (20 cartes)

> Accessibles dès le début, piliers de base de chaque archétype.

### 🟣 Communes — Poison (5 cartes)

---

#### BOMBE BEURK *(Sludge Bomb)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **7** dégâts. Applique **3** Poison.
- **Effet+** : Inflige **9** dégâts. Applique **4** Poison.
- **Synergies** : Bombe Acide, Façade, Toxik
- **Note** : Carte hybride attaque/poison idéale pour ouvrir un tour.

---

#### BOMBE ACIDE *(Acid Spray)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **4** dégâts. Applique **2 Fragilité** (l'ennemi prend 50% dégâts en plus pendant 2 tours).
- **Effet+** : Inflige **5** dégâts. Applique **3 Fragilité**.
- **Synergies** : Toute attaque forte jouée après (Lance-Soleil, Damoclès)
- **Note** : Prépare un burst de dégâts. Jouée avant une attaque lourde, les dégâts explosent.

---

#### CRADOVAGUE *(Sludge Wave)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Commune
- **Effet** : Inflige **10** dégâts. Applique **2** Poison.
- **Effet+** : Inflige **12** dégâts. Applique **3** Poison.
- **Synergies** : Toxik (pour amplifier le poison après), Vampigraine
- **Note** : Contre plusieurs ennemis à terme (future feature). Pour l'instant : dégâts + poison en un seul coup.

---

#### FAÇADE *(Facade)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **8** dégâts. Si l'ennemi est **Empoisonné, Paralysé ou Endormi** : inflige **14** dégâts à la place.
- **Effet+** : **10** / **18** dégâts.
- **Synergies** : Poudre Toxik, Poudre Dodo, Plaquage
- **Note** : Récompense fortement l'application préalable d'un statut. Symbole de la synergie Statut→Attaque.

---

#### PLAQUAGE *(Body Slam)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **8** dégâts. **25%** de chance d'appliquer **Paralysie**.
- **Effet+** : Inflige **10** dégâts. **40%** de Paralysie.
- **Synergies** : Façade (si paralysie se déclenche), Danse Lames
- **Note** : L'aspect aléatoire est intentionnel : chaque Plaquage joué est une chance d'enchaîner avec Façade au prochain tour.

---

### 🟡 Communes — Croissance / Attaque (7 cartes)

---

#### FOUET LIANES *(Vine Whip)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **8** dégâts.
- **Effet+** : Inflige **11** dégâts.
- **Synergies** : Croissance (bénéficie du buff), Danse Lames
- **Note** : Attaque de base solide, bénéficie naturellement de Croissance.

---

#### CHARGE *(Tackle)*
- **Type** : Attaque | **Coût** : 0 | **Rareté** : Commune
- **Effet** : Inflige **5** dégâts.
- **Effet+** : Inflige **7** dégâts.
- **Synergies** : Danse Lames, Croissance
- **Note** : Gratuite. En fin de tour quand il ne reste plus d'énergie, elle passe quand même.

---

#### TRANCH'HERBE *(Razor Leaf)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **7** dégâts. Taux de **Coup Critique** élevé (33% → ×1.5 dégâts).
- **Effet+** : Inflige **9** dégâts. Critique à **50%**.
- **Synergies** : Croissance, Danse Lames
- **Note** : La carte à haute variance de l'archétype attaque. Potentiellement la plus forte par coup.

---

#### FEUILLE MAGIK *(Magical Leaf)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **8** dégâts. **Ne peut pas rater** (ignore l'Esquive).
- **Effet+** : Inflige **11** dégâts.
- **Synergies** : Contre les ennemis avec mécaniques d'esquive (futurs boss)
- **Note** : Fiabilité totale. Aucune mauvaise surprise.

---

#### BALLE GRAINE *(Bullet Seed)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **3 dégâts × 3 fois** (9 total). Chaque coup peut déclencher un effet séparé.
- **Effet+** : **4 × 3** (12 total).
- **Synergies** : Vampigraine (chaque coup déclenche le drain), Bombe Acide (fragilité × 3 hits)
- **Note** : Carte multi-hits. Fondamentale pour les builds qui veulent déclencher des effets répétés.

---

#### DÉSHERBAFFE *(Trailblaze)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **7** dégâts. **Pioche 1 carte**.
- **Effet+** : Inflige **9** dégâts. Pioche **1 carte**.
- **Synergies** : N'importe quel combo qui a besoin de cycler rapidement
- **Note** : Génère de la valeur de main. Attaque ET piocher en même temps = efficacité maximale.

---

#### CROISSANCE *(Growth)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Gagne **1 Croissance** (toutes les attaques infligent +2 dégâts de façon permanente ce combat).
- **Effet+** : Gagne **2 Croissance** immédiatement.
- **Synergies** : Toutes les attaques Végétales, Danse Lames, Rengorgement
- **Note** : Carte pivot de l'archétype Croissance. Plus elle arrive tôt, plus elle est puissante.

---

### 🟢 Communes — Graine & Sustain (4 cartes)

---

#### VAMPIGRAINE *(Leech Seed)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Commune
- **Effet** : À la fin de **chaque tour**, l'ennemi perd **3 PV** et vous récupérez **3 PV**.
- **Effet+** : **4 PV** par tour.
- **Synergies** : Éco-Sphère (bonus dégâts), Enracinement (double sustain), Amnésie
- **Note** : Le cœur de l'archétype Graine. Passive permanente qui s'accumule au fil des tours.

---

#### SYNTHÈSE *(Synthesis)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Récupère **8 PV**.
- **Effet+** : Récupère **12 PV**.
- **Synergies** : Vampigraine (sustain cumulatif), Bélier/Damoclès (compense l'auto-dégât)
- **Note** : Soin simple et efficace. Indispensable dans les decks qui s'auto-blessent.

---

#### ABRI *(Protect)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Gagne **12 Défense**. S'épuise.
- **Effet+** : Gagne **16 Défense**. Ne s'épuise plus.
- **Synergies** : Mur Lumière, Amnésie, Clonage
- **Note** : Bloque un coup fort en urgence. Non améliorée = usage unique tactique.

---

#### MUR LUMIÈRE *(Light Screen)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Réduit tous les dégâts reçus de **3** pendant **3 tours**.
- **Effet+** : Réduit de **4** pendant **4 tours**.
- **Synergies** : Amnésie, Abri, Rune Protect
- **Note** : Passif temporaire défensif. Idéal face à des ennemis qui attaquent plusieurs fois.

---

### 🔵 Communes — Statut / Contrôle (4 cartes)

---

#### RUGISSEMENT *(Growl)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Applique **Faiblesse** à l'ennemi (inflige 25% de dégâts en moins pendant **2 tours**).
- **Effet+** : **3 tours**.
- **Synergies** : Vampigraine (survive plus longtemps), Enracinement, builds sustain
- **Note** : Réduit la pression offensive adverse. Permet de tenir plus longtemps.

---

#### POUDRE DODO *(Sleep Powder)*
- **Type** : Compétence | **Coût** : 2 | **Rareté** : Commune
- **Effet** : Applique **Sommeil** (l'ennemi passe son prochain tour). S'épuise.
- **Effet+** : Ne s'épuise plus.
- **Synergies** : Façade, Faux-Chage, Lance-Soleil (profite du tour gratuit)
- **Note** : Gain d'un tour complet. L'une des cartes de contrôle les plus puissantes.

---

#### CANON GRAINE *(Seed Bomb)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Inflige **9** dégâts. Si l'ennemi n'a **aucun Pouvoir actif** : inflige **14** dégâts.
- **Effet+** : **12** / **18** dégâts.
- **Synergies** : Faux-Chage (idéale contre boss propres), Poudre Dodo (avant d'appliquer des états)
- **Note** : Récompense de frapper un ennemi "vierge" de buffs.

---

#### DÉSHERBAFFE *(déjà listée — remplacée par :)*

#### RENGORGEMENT *(Work Up)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Commune
- **Effet** : Gagne **1 Force** (+1 dégâts à toutes les attaques, permanent ce combat) et **1 Croissance**.
- **Effet+** : **2 Force** et **1 Croissance**.
- **Synergies** : Toutes les attaques, surtout Fouet Lianes et Balle Graine
- **Note** : Combine deux buffs offensifs en une seule carte. Très polyvalent.

---

## 5. Cartes Peu Communes (18 cartes)

> Cartes à double effet ou plus puissantes. Définissent la direction d'un build.

### 🟣 Peu Communes — Poison (5 cartes)

---

#### TOXIK *(Toxic)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Applique **Poison Sévère** : commence à **5** stacks et augmente de **2** chaque tour (au lieu de diminuer).
- **Effet+** : Commence à **7** stacks.
- **Synergies** : Vampigraine, Façade, Bombe Beurk
- **Note** : Carte signature de l'archétype Poison. Le plus tôt jouée, le plus elle fait mal.

---

#### GIGA-SANGSUE *(Giga Drain)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Inflige **12** dégâts. Récupère **la moitié des dégâts infligés** en PV.
- **Effet+** : Inflige **15** dégâts.
- **Synergies** : Fragilité (plus de dégâts = plus de soin), Croissance
- **Note** : Attaque + soin hybride. Permet de récupérer agressivement de la vie.

---

#### SPORE *(Spore — attaque de champignon, univers Pokémon)*
- **Type** : Compétence | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Applique **Sommeil infaillible** (contrairement à Poudre Dodo, ne peut pas être résisté). S'épuise.
- **Effet+** : Ne s'épuise plus.
- **Synergies** : Façade (condition statut), Lance-Soleil (tour libre pour charger)
- **Note** : Version premium de Poudre Dodo. Coûte plus cher mais ne rate jamais.

---

#### LAME FEUILLE *(Leaf Blade — move Pokémon universel Plante)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Inflige **15** dégâts. Si l'ennemi est **Empoisonné** : inflige **22** dégâts à la place.
- **Effet+** : **18** / **28** dégâts.
- **Synergies** : Toxik, Bombe Beurk, Poudre Toxik
- **Note** : Finisher de l'archétype Poison. Jouer après avoir empoisonné = burst massif.

---

#### TOURBILLON FEUILLES *(Leaf Storm — move Pokémon)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Inflige **20** dégâts. Réduit votre **Croissance** de 2 (coût offensif).
- **Effet+** : Inflige **24** dégâts. Réduit Croissance de 1.
- **Synergies** : À jouer AVANT de stacker Croissance, ou avec Rengorgement pour récupérer.
- **Note** : Puissance immédiate au prix du buff futur. Choix stratégique : burst ou montée en puissance ?

---

### 🟡 Peu Communes — Croissance / Attaque (5 cartes)

---

#### LANCE-SOLEIL *(Solar Beam)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : **Ce tour** : entre en **Chargement** (marque la carte). **Au début du prochain tour** : inflige automatiquement **26** dégâts (sans coût d'énergie).
- **Effet+** : Inflige **32** dégâts au déclenchement.
- **Synergies** : Poudre Dodo / Spore (charger pendant que l'ennemi dort), Rune Protect
- **Note** : La carte la plus iconique. Demande de la planification mais offre un ratio dommages/énergie exceptionnel.

---

#### BÉLIER *(Take Down)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Inflige **18** dégâts. Vous subissez **4** dégâts (recul).
- **Effet+** : Inflige **22** dégâts. Recul réduit à **2**.
- **Synergies** : Synthèse, Vampigraine (pour compenser le recul), Ténacité
- **Note** : Attaque puissante mais risquée. Récompense les builds avec sustain.

---

#### DAMOCLÈS *(Double-Edge)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Inflige **24** dégâts. Vous subissez **6** dégâts.
- **Effet+** : Inflige **28** dégâts. Recul inchangé.
- **Synergies** : Ténacité (survivre à l'auto-dégât), Synthèse, Vampigraine
- **Note** : Version extrême de Bélier. Dégâts massifs mais coût personnel significatif.

---

#### DANSE LAMES *(Swords Dance)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Gagne **2 Force** permanente (toutes les attaques +2 dégâts).
- **Effet+** : Gagne **3 Force**.
- **Synergies** : Croissance (cumul offensif), Fouet Lianes, Balle Graine (chaque hit bénéficie)
- **Note** : Seul Pouvoir pure Force. Très fort dans un deck centré attaque.

---

#### DANSE FLEURS *(Petal Dance)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Inflige **6 dégâts × 3 fois**. Après : **Confusion** pendant 1 tour (les cartes jouées ce tour sont choisies aléatoirement dans la main).
- **Effet+** : **8 × 3**. Pas de Confusion.
- **Synergies** : Balle Graine (multi-hit), Vampigraine (drain par hit)
- **Note** : Gros burst mais risque de jouer des cartes non désirées. Améliorée = carte excellente sans inconvénient.

---

### 🟢 Peu Communes — Graine & Sustain (4 cartes)

---

#### ENRACINEMENT *(Ingrain — move Pokémon)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Au début de chaque tour, récupère **5 PV** automatiquement.
- **Effet+** : Récupère **7 PV** par tour.
- **Synergies** : Vampigraine (double sustain passif), Bélier/Damoclès (compense l'auto-dégât)
- **Note** : Passif de régénération. Permet de jouer un style très agressif avec recul sans mourir.

---

#### ÉCO-SPHÈRE *(Energy Ball)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Peu Commune
- **Effet** : Inflige **14** dégâts. Si l'ennemi a une **Graine active** : inflige **22** dégâts.
- **Effet+** : **17** / **28** dégâts.
- **Synergies** : Vampigraine (condition Graine), Enracinement
- **Note** : Attaque pivot de l'archétype Graine. Vampigraine + Éco-Sphère = combo de base.

---

#### AMNÉSIE *(Amnesia)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Au début de chaque tour, gagne **4 Défense** automatiquement.
- **Effet+** : **6 Défense** par tour.
- **Synergies** : Mur Lumière, Abri, builds Défense
- **Note** : Accumulation passive de défense. Sur la durée, devient un bouclier permanent.

---

#### CHLOROPHYLLE *(Chlorophyll — capacité spéciale de Bulbizarre)*
- **Type** : Compétence | **Coût** : 0 | **Rareté** : Peu Commune
- **Effet** : Pioche **2 cartes**. S'épuise.
- **Effet+** : Pioche **2 cartes**. Ne s'épuise plus.
- **Synergies** : Tous les decks (cycle), surtout Lance-Soleil (trouver la carte de chargement)
- **Note** : Draw gratuit. Non améliorée : usage unique stratégique. Améliorée : recyclage infini.

---

### 🔵 Peu Communes — Défense & Contrôle (4 cartes)

---

#### CLONAGE *(Substitute)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Perdez **8 PV**. Gagnez **16 Défense**. S'épuise.
- **Effet+** : Perdez **6 PV**. Gagnez **16 Défense**. Ne s'épuise plus.
- **Synergies** : Synthèse (récupérer les PV perdus), Vampigraine (régénération passive)
- **Note** : Convertit les PV en Défense. Très fort dans les builds qui ont du sustain.

---

#### RUNE PROTECT *(Safeguard)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Immunité totale contre les effets de **Statut** pendant **3 tours**.
- **Effet+** : **5 tours**.
- **Synergies** : Décks qui ont besoin de charger Lance-Soleil sans être perturbés
- **Note** : Contre les ennemis qui appliquent des statuts gênants (Paralysie, Sommeil).

---

#### TÉNACITÉ *(Endure)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Ce tour, si vous allez mourir, survivez à **1 PV** à la place. S'épuise.
- **Effet+** : Ne s'épuise plus.
- **Synergies** : Bélier, Damoclès (évite la mort par recul), Façade (survivre pour contre-attaquer)
- **Note** : Filet de sécurité ultime. Améliorée = utilisable chaque combat.

---

#### FAUX-CHAGE *(False Swipe)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Peu Commune
- **Effet** : Réduit les PV de l'ennemi à exactement **50%** de ses PV actuels (ne peut pas tuer). S'épuise.
- **Effet+** : Réduit à **33%**. Ne s'épuise plus.
- **Synergies** : Toxik (puis laisser le poison finir le travail), Lance-Soleil
- **Note** : Supprime la moitié des PV d'un coup. Légendaire contre les boss avec beaucoup de PV.

---

## 6. Cartes Rares (15 cartes)

> Cartes qui définissent un build entier. Chacune est le cœur d'un archétype.

---

### 🟣 Rares — Poison (4 cartes)

---

#### VENIN MORTEL *(Venoshock — move Pokémon)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Inflige **10** dégâts. Si l'ennemi est empoisonné : **double les stacks de Poison** actuels EN PLUS des dégâts.
- **Effet+** : Inflige **14** dégâts. Double toujours.
- **Synergies** : Toxik (stacks montent déjà, puis explosent), Bombe Beurk
- **Note** : La carte qui rend le Poison Sévère vraiment terrifiant. Toxik → Venin Mortel = combo létal.

---

#### PLUIE ACIDE *(Acid Rain — référence Pokémon/environnement)*
- **Type** : Pouvoir | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Permanent. Au début de chaque tour de l'ennemi, applique **2 Poison** supplémentaires.
- **Effet+** : **3 Poison** par tour automatiquement.
- **Synergies** : Toxik (stacks exponentiels), Venin Mortel
- **Note** : Passif qui transforme chaque tour ennemi en accumulation de poison. Avec Toxik Sévère, le poison peut dépasser 20 stacks.

---

#### NUAGE TOXIQUE *(Toxic Spikes — move Pokémon)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Rare
- **Effet** : Pose des **Piques Toxiques**. Chaque fois que l'ennemi attaque, il reçoit **2 Poison**. Dure **4 attaques**.
- **Effet+** : **3 Poison** par attaque. **6 attaques**.
- **Synergies** : Builds défensifs qui encaissent des coups intentionnellement
- **Note** : Inversion totale : les attaques ennemies l'empoisonnent lui-même. Combo avec Rugissement.

---

#### ASSIMILATION *(Absorb — move Pokémon)*
- **Type** : Attaque | **Coût** : 1 | **Rareté** : Rare
- **Effet** : Inflige des dégâts égaux aux **stacks de Poison actuels** sur l'ennemi. Récupère **la moitié** en PV.
- **Effet+** : Récupère **tous les dégâts** en PV.
- **Synergies** : Toxik, Pluie Acide (maximiser les stacks avant de jouer)
- **Note** : Le finisher absolu de l'archétype Poison. 20 stacks = 20 dégâts + 10-20 soins.

---

### 🟡 Rares — Croissance / Attaque (4 cartes)

---

#### Zenith *(Sunny Day — move Pokémon)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Rare
- **Effet** : Ce combat, **Lance-Soleil ne nécessite plus de tour de chargement** (inflige directement ses dégâts).
- **Effet+** : De plus, Lance-Soleil inflige **+8 dégâts**.
- **Synergies** : Lance-Soleil (rendu instantané), Croissance
- **Note** : Carte qui transforme Lance-Soleil en attaque 3 coûts de 26+ dégâts immédiats. Combo emblématique.

---

#### MÉGA-FLORIZARRE *(Mega Venusaur — évolution ultime, référence lore)*
- **Type** : Pouvoir | **Coût** : 3 | **Rareté** : Rare
- **Effet** : Permanent. Tous vos Pouvoirs actifs voient leur effet **doublé** (Croissance ×2, Force ×2, Vampigraine ×2...).
- **Effet+** : Coût réduit à **2**.
- **Synergies** : Croissance, Danse Lames, Vampigraine, Enracinement
- **Note** : La carte la plus puissante du jeu si les conditions sont réunies. Nécessite un deck orienté Pouvoirs.

---

#### SURPUISSANCE *(Overgrow — capacité spéciale de Bulbizarre)*
- **Type** : Pouvoir | **Coût** : 1 | **Rareté** : Rare
- **Effet** : Quand vos PV passent **sous 50%**, toutes vos attaques infligent **+4 dégâts** de façon permanente.
- **Effet+** : **+6 dégâts** sous 50% PV.
- **Synergies** : Bélier, Damoclès (s'auto-blesser pour activer), Ténacité
- **Note** : Mécanique de come-back. Perd en vie, gagne en puissance. Référence directe à la capacité réelle de Bulbizarre.

---

#### TONNERRE VÉGÉTAL *(Wood Hammer — move Pokémon)*
- **Type** : Attaque | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Inflige **(Force × 3) + (Croissance × 2) + 10** dégâts. Vous subissez les dégâts en recul.
- **Effet+** : Recul réduit de moitié.
- **Synergies** : Danse Lames + Croissance (maximiser avant de jouer), Synthèse/Ténacité
- **Note** : Dégâts qui **scalent** avec tous vos buffs offensifs. Le finisher ultime de l'archétype Croissance.

---

### 🟢 Rares — Graine & Sustain (4 cartes)

---

#### TOILE HERBEUSE *(Grassy Terrain — move Pokémon)*
- **Type** : Pouvoir | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Ce combat, toutes vos cartes de soin soignent **+50%**. Vampigraine soigne **le double**.
- **Effet+** : Soins **+75%**. Vampigraine soigne **le triple**.
- **Synergies** : Synthèse, Vampigraine, Enracinement, Giga-Sangsue
- **Note** : Transforme l'archétype Sustain en machine à récupérer des PV. Presque immortel combiné à Enracinement + Vampigraine.

---

#### BULBE SACRÉ *(Référence lore — le bulbe de Bulbizarre contient de l'énergie vitale)*
- **Type** : Compétence | **Coût** : 0 | **Rareté** : Rare
- **Effet** : Gagne autant de **Défense** que vos **PV manquants** ÷ 2. S'épuise.
- **Effet+** : Gagne autant de **Défense** que vos **PV manquants**. Ne s'épuise plus.
- **Synergies** : Bélier, Damoclès, Clonage (s'auto-blesser pour générer de la Défense)
- **Note** : Plus vous êtes blessé, plus cette carte devient puissante. Combo : Damoclès + Bulbe Sacré = attaque + bloc massif.

---

#### RACINES PROFONDES *(Deep Roots — référence univers Pokémon)*
- **Type** : Pouvoir | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Permanent. À la fin de votre tour, si vous avez **plus de Défense que de dégâts reçus ce tour**, récupérez **4 PV**.
- **Effet+** : Récupère **6 PV**.
- **Synergies** : Amnésie, Mur Lumière, Abri
- **Note** : Récompense de **bien défendre**. Un deck défensif bien construit gagne de la vie à chaque tour.

---

#### PARASITISME *(Parasect reference — univers Pokémon Plante/Poison)*
- **Type** : Pouvoir | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Permanent. Chaque fois que l'ennemi perd des PV par **Vampigraine ou Graine**, vous récupérez **2 PV supplémentaires**.
- **Effet+** : **3 PV supplémentaires**.
- **Synergies** : Vampigraine, Éco-Sphère, Toile Herbeuse
- **Note** : Amplifie chaque tick de drain. Avec Vampigraine + Toile Herbeuse + Parasitisme = sustain absolu.

---

### 🔵 Rares — Défense & Contrôle (3 cartes)

---

#### CONTRECOUP *(Counter — move Pokémon)*
- **Type** : Compétence | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Inflige à l'ennemi **le double des dégâts reçus ce tour** sous forme de dégâts directs. S'épuise.
- **Effet+** : Ne s'épuise plus.
- **Synergies** : Mur Lumière (réduire les dégâts reçus mais conserver le total), Clonage
- **Note** : La seule carte qui transforme la douleur en dommages. Contre un boss qui frappe fort = réponse dévastatrice.

---

#### BOUCLIER VÉGÉTAL *(Flower Shield — move Pokémon)*
- **Type** : Compétence | **Coût** : 1 | **Rareté** : Rare
- **Effet** : Gagne **20 Défense**. Si votre Défense actuelle dépasse vos PV max : l'excédent devient des dégâts sur l'ennemi.
- **Effet+** : **24 Défense**.
- **Synergies** : Amnésie, Abri, Racines Profondes
- **Note** : La carte qui connecte l'archétype Défense à l'archétype Attaque. Trop de défense → attaque automatique.

---

#### HERBIZARRE *(Ivysaur — évolution intermédiaire, concept de transition)*
- **Type** : Pouvoir | **Coût** : 2 | **Rareté** : Rare
- **Effet** : Permanent. Chaque carte jouée depuis la **Défausse** (via une mécanique de recyclage) inflige **5 dégâts bonus** à l'ennemi.
- **Effet+** : **8 dégâts bonus**.
- **Synergies** : Chlorophylle, Désherbaffe, tout deck avec beaucoup de cycles
- **Note** : Récompense le fait de cycler son deck rapidement. Chaque carte "revue" fait des dégâts passifs.

---

## 7. Synergies & Combos Clés

### 🔥 Combo "Soleil Brûlant"
```
Croissance × 2 → Danse Lames → Force Soleil → Lance-Soleil
```
**Résultat** : Lance-Soleil instantané à 26 + (Croissance × 2) + (Force × 2) dégâts.
> Exemple : 2 Croissance + 2 Force = 26 + 4 + 4 = **34 dégâts en un coup**, sans attendre un tour.

---

### ☠️ Combo "Poison Exponentiel"
```
Toxik → Pluie Acide → Venin Mortel
```
**Résultat** : Toxik applique 5 stacks (augmente de 2/tour). Pluie Acide ajoute 3/tour. Au tour 3 = ~16 stacks. Venin Mortel les **double** → 32 dégâts/tour par le seul poison.

---

### 💚 Combo "Immortalité Végétale"
```
Vampigraine → Enracinement → Toile Herbeuse → Parasitisme
```
**Résultat** : Chaque tour récupère (Vampigraine × 2 + Enracinement) × Toile Herbeuse + Parasitisme. En pratique : **15-20 PV récupérés passifs par tour**.

---

### 💥 Combo "Tonnerre Sacrificiel"
```
Damoclès → Bulbe Sacré → Tonnerre Végétal
```
**Résultat** : Damoclès inflige 24 et vous blesse. Bulbe Sacré convertit les PV perdus en Défense. Tonnerre Végétal explose avec les buffs actifs.

---

### 🌀 Combo "Contrôle Absolu"
```
Spore → Lance-Soleil (chargement) → Faux-Chage → Toxik
```
**Résultat** : L'ennemi dort → Lance-Soleil se charge gratuitement → Faux-Chage réduit à 33% PV → Toxik finit avec le poison.

---

### 🛡️ Combo "Contre-Offensive"
```
Rugissement → Amnésie × 3 tours → Bouclier Végétal → Contrecoup
```
**Résultat** : L'ennemi frappe moins fort. Amnésie accumule de la Défense. Bouclier Végétal déborde en dégâts. Contrecoup punit la prochaine attaque.

---

## 8. Tableau Récapitulatif

| Carte | Type | Coût | Rareté | Archétype |
|-------|------|------|--------|-----------|
| Frappe | Attaque | 1 | Starter | Universel |
| Défense | Compétence | 1 | Starter | Défense |
| Poudre Toxik | Compétence | 1 | Starter | Poison |
| Poudre Dodo | Compétence | 2 | Starter | Statut |
| Bombe Beurk | Attaque | 1 | Commune | Poison |
| Bombe Acide | Compétence | 1 | Commune | Poison/Statut |
| Cradovague | Attaque | 2 | Commune | Poison |
| Façade | Attaque | 1 | Commune | Statut→Attaque |
| Plaquage | Attaque | 1 | Commune | Statut |
| Fouet Lianes | Attaque | 1 | Commune | Attaque |
| Charge | Attaque | 0 | Commune | Attaque |
| Tranch'Herbe | Attaque | 1 | Commune | Attaque |
| Feuille Magik | Attaque | 1 | Commune | Attaque |
| Balle Graine | Attaque | 1 | Commune | Attaque/Multi |
| Désherbaffe | Attaque | 1 | Commune | Attaque/Draw |
| Croissance | Pouvoir | 1 | Commune | Croissance |
| Rengorgement | Pouvoir | 1 | Commune | Attaque/Buff |
| Vampigraine | Pouvoir | 1 | Commune | Graine |
| Synthèse | Compétence | 1 | Commune | Sustain |
| Abri | Compétence | 1 | Commune | Défense |
| Mur Lumière | Pouvoir | 1 | Commune | Défense |
| Rugissement | Compétence | 1 | Commune | Statut |
| Canon Graine | Attaque | 1 | Commune | Attaque |
| Toxik | Compétence | 1 | Peu Commune | Poison |
| Giga-Sangsue | Attaque | 2 | Peu Commune | Poison/Sustain |
| Spore | Compétence | 2 | Peu Commune | Statut |
| Lame Feuille | Attaque | 2 | Peu Commune | Poison→Attaque |
| Tourbillon Feuilles | Attaque | 2 | Peu Commune | Attaque |
| Lance-Soleil | Attaque | 2 | Peu Commune | Attaque |
| Bélier | Attaque | 2 | Peu Commune | Attaque/Risque |
| Damoclès | Attaque | 2 | Peu Commune | Attaque/Risque |
| Danse Lames | Pouvoir | 1 | Peu Commune | Attaque/Buff |
| Danse Fleurs | Attaque | 1 | Peu Commune | Attaque/Multi |
| Enracinement | Pouvoir | 1 | Peu Commune | Sustain |
| Éco-Sphère | Attaque | 2 | Peu Commune | Graine→Attaque |
| Amnésie | Pouvoir | 1 | Peu Commune | Défense |
| Chlorophylle | Compétence | 0 | Peu Commune | Universel |
| Clonage | Compétence | 1 | Peu Commune | Défense |
| Rune Protect | Compétence | 1 | Peu Commune | Défense |
| Ténacité | Compétence | 1 | Peu Commune | Survie |
| Faux-Chage | Attaque | 1 | Peu Commune | Contrôle |
| Venin Mortel | Attaque | 2 | Rare | Poison |
| Pluie Acide | Pouvoir | 2 | Rare | Poison |
| Nuage Toxique | Compétence | 1 | Rare | Poison |
| Assimilation | Attaque | 1 | Rare | Poison |
| Force Soleil | Pouvoir | 1 | Rare | Attaque |
| Méga-Florizarre | Pouvoir | 3 | Rare | Universel/Buff |
| Surpuissance | Pouvoir | 1 | Rare | Attaque/Survie |
| Tonnerre Végétal | Attaque | 2 | Rare | Attaque |
| Toile Herbeuse | Pouvoir | 2 | Rare | Sustain |
| Bulbe Sacré | Compétence | 0 | Rare | Défense |
| Racines Profondes | Pouvoir | 2 | Rare | Défense |
| Parasitisme | Pouvoir | 2 | Rare | Graine |
| Contrecoup | Compétence | 2 | Rare | Défense→Attaque |
| Bouclier Végétal | Compétence | 1 | Rare | Défense→Attaque |
| Herbizarre | Pouvoir | 2 | Rare | Cycle |

**Total : 57 cartes** (5 starter + 20 communes + 18 peu communes + 14 rares)

---

## 9. Notes d'Implémentation

### Priorité de développement
1. **Phase 1** — Cartes communes toutes implémentées (fondation solide)
2. **Phase 2** — Peu communes Poison + Croissance (deux archétypes définis)
3. **Phase 3** — Rares Poison + Combo Force Soleil (moments "wow")
4. **Phase 4** — Rares Défense + Sustain (compléter les 4 archétypes)

### Nouveaux effets à coder
| Effet | Description technique |
|-------|----------------------|
| `Poison Sévère` | Stack qui augmente au lieu de diminuer |
| `Croissance` | Compteur de buff offensif cumulable |
| `Graine` | Pouvoir sur ennemi avec tick de drain/soin |
| `Fragilité` | Modificateur de dégâts reçus ×1.5 |
| `Faiblesse` | Modificateur de dégâts infligés ×0.75 |
| `Chargement` | Carte à double-tour (jouer → effet au prochain tour) |
| `Force` | Buff de dégâts permanent (comme Strength dans STS) |

### Cartes à implémenter en priorité absolue (pour les combos les plus fun)
1. **Toxik** + **Venin Mortel** (archétype Poison instantanément satisfaisant)
2. **Lance-Soleil** + **Force Soleil** (moment iconique Pokémon)
3. **Vampigraine** + **Éco-Sphère** (synergie visible et claire)
4. **Surpuissance** (connecte mécaniquement à la capacité réelle du Pokémon)
