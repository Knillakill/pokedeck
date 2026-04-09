# Plan des Ennemis — Pokémon Deckbuilder Roguelike
> Document de conception — Version 1.0

---

## Table des Matières

1. [Philosophie d'équilibrage](#1-philosophie-déquilibrage)
2. [Structure des Actes](#2-structure-des-actes)
3. [Acte 1 — La Route](#3-acte-1--la-route)
   - [Ennemis normaux](#31-ennemis-normaux)
   - [Élites](#32-élites)
   - [Boss : Ronflex](#33-boss--ronflex)
4. [Acte 2 — La Forêt Maudite](#4-acte-2--la-forêt-maudite)
   - [Ennemis normaux](#41-ennemis-normaux)
   - [Élites](#42-élites)
   - [Boss : Dracolosse](#43-boss--dracolosse)
5. [Acte 3 — Le Sommet Légendaire](#5-acte-3--le-sommet-légendaire)
   - [Ennemis normaux](#51-ennemis-normaux)
   - [Élites](#52-élites--oiseaux-légendaires)
   - [Boss Final : Mewtwo](#53-boss-final--mewtwo)
6. [Tableaux de Synthèse Équilibrage](#6-tableaux-de-synthèse-équilibrage)
7. [Glossaire des Statuts](#7-glossaire-des-statuts)

---

## 1. Philosophie d'Équilibrage

### Principes fondamentaux

Le jeu s'inspire directement de **Slay the Spire** dans sa courbe de difficulté et sa structure roguelike, mais l'univers Pokémon impose des contraintes et des opportunités supplémentaires :

- **Lisibilité des intentions** : Chaque ennemi doit être lisible au premier regard. L'icône d'intention au-dessus de l'ennemi indique toujours ce qu'il va faire le tour suivant. Les actions puissantes (⚠️ SIGNALÉ) s'annoncent 1 tour à l'avance.
- **Montée en pression progressive** : Un combat d'Acte 1 doit pouvoir être résolu avec un deck de départ. Un combat d'Acte 3 exige une stratégie construite.
- **Cohérence thématique** : Les patterns de chaque Pokémon reflètent ses attaques canoniques (jeux, anime) pour l'immersion.
- **Punition de la passivité** : Les ennemis escaladent s'ils ne sont pas éliminés rapidement. Laisser un ennemi en vie trop longtemps est toujours pénalisant.
- **Respect des immunités** : Certains ennemis (types Spectre) sont immunisés aux attaques Normales. Le joueur doit adapter son deck en conséquence.

### Courbe de difficulté par acte

| Acte | PV ennemis normaux | Dégâts ennemis normaux | Thème statuts dominants |
|------|--------------------|------------------------|-------------------------|
| 1    | 20–50 PV           | 6–12 dmg/tour          | Poison, Faiblesse       |
| 2    | 38–65 PV           | 10–18 dmg/tour         | Sommeil, Paralysie, Défausse |
| 3    | 70–115 PV          | 14–24 dmg/tour         | Gel, Brûlure, Vulnérabilité |

### Nomenclature des statuts

Voir [Glossaire des Statuts](#7-glossaire-des-statuts) pour la définition complète de chaque statut utilisé dans ce document.

---

## 2. Structure des Actes

### Carte générale d'un acte

Chaque acte comporte **8 salles** avant le boss. La disposition est semi-aléatoire mais respecte les contraintes suivantes :

```
[Entrée]
  ├─ Salle normale
  ├─ Salle normale
  ├─ Salle normale ou Campfire
  ├─ ÉLITE (obligatoire, une seule par acte)
  ├─ Boutique (une seule par acte)
  ├─ Salle Trésor (une seule par acte)
  ├─ Salle normale ou Campfire
  └─ [Boss]
```

### Types de salles

| Type de salle | Fréquence | Description |
|---------------|-----------|-------------|
| **Normale** | 3–4 par acte | Combat contre 1–2 ennemis normaux. Récompense : Or + choix de carte |
| **Élite** | 1 par acte | Combat difficile contre un ennemi élite. Récompense : Relique garantie |
| **Boss** | 1 par acte | Combat le plus difficile. Récompense : Relique rare/légendaire + Or×1.5 |
| **Boutique** | 1 par acte | Achat de cartes, reliques, potions. Peut retirer une carte du deck |
| **Trésor** | 1 par acte | Relique garantie, pas de combat |
| **Campfire** | 1–2 par acte | Soin (restaure 30% PV max) ou Amélioration de carte (1 carte au choix) |

### Récompenses post-combat

- **Combat normal** : 10–25 Or + choix parmi 3 nouvelles cartes (ou passer)
- **Élite** : 25–50 Or + Relique aléatoire (commune à rare selon acte)
- **Boss** : Or×1.5 + Relique rare garantie (Acte 1), Légendaire (Acte 2), Légendaire + bonus (Acte 3)

---

## 3. Acte 1 — La Route

> *Les chemins champêtres de Kanto sont peuplés de Pokémon sauvages encore inexpérimentés. Ne vous y fiez pas : certains d'entre eux vous surprendront.*

**Contexte thématique** : Routes herbacées de la région Kanto, début de l'aventure. Les ennemis sont des Pokémon sauvages de bas niveau, mais introduisent progressivement les mécaniques de statut (Poison, Faiblesse) que le joueur devra maîtriser.

---

### 3.1 Ennemis Normaux

#### Tableau récapitulatif — Acte 1

| Pokémon    | PV  | Dégâts/tour moy. | Statuts appliqués | Difficulté |
|------------|-----|------------------|-------------------|------------|
| Rattata    | 28  | 7                | Aucun             | ⭐         |
| Roucool    | 22  | 7                | Faiblesse         | ⭐⭐        |
| Chenipan   | 30  | 4 (+ stall)      | Faiblesse         | ⭐⭐        |
| Aspicot    | 28  | 5 + Poison        | Poison            | ⭐⭐        |
| Racaillou  | 44  | 9 (avec bloc)    | Aucun             | ⭐⭐⭐       |
| Mystherbe  | 34  | 6 (+ stall)      | Poison, Faiblesse | ⭐⭐⭐       |

---

#### 🐀 Rattata — 28 PV

**Type** : Normal  
**Rôle** : Ennemi d'introduction, aucune mécanique complexe.

**Pattern (cycle de 3 tours) :**

| Tour | Action | Effets |
|------|--------|--------|
| 1 | **Morsure** | 6 dégâts |
| 2 | **Charge Rapide** | 9 dégâts |
| 3 | **Morsure** | 6 dégâts |
| (retour tour 1) | — | — |

**Description des actions :**
- **Morsure** : Attaque physique simple. 6 dégâts directs. Aucun effet secondaire.
- **Charge Rapide** : Attaque plus puissante. 9 dégâts directs. Aucun effet secondaire.

**Stratégie joueur :**
- Ennemi le plus basique du jeu. Sert à enseigner le cycle d'intention.
- Priorité : éliminer rapidement pour conserver les ressources.
- Le bloc suffit à absorber les deux tours où il attaque.

**Récompenses :** 10–15 Or.

---

#### 🐦 Roucool — 22 PV

**Type** : Normal/Vol  
**Rôle** : Introduit le statut **Faiblesse** et la notion de débuff d'attaque.

**Pattern (cycle de 2 tours) :**

| Tour | Action | Effets |
|------|--------|--------|
| 1 | **Tornade** | 5 dégâts + applique **1 Faiblesse** au joueur |
| 2 | **Vive-Attaque** | 9 dégâts |
| (retour tour 1) | — | — |

**Description des actions :**
- **Tornade** : Attaque aérienne légère. 5 dégâts + le joueur reçoit **1 stack de Faiblesse** (ses attaques font -5% de dégâts par stack).
- **Vive-Attaque** : Attaque prioritaire. 9 dégâts directs.

**Stratégie joueur :**
- ⚠️ La Faiblesse s'accumule si le joueur laisse Roucool en vie trop longtemps.
- Après 3–4 tours, les attaques du joueur peuvent être significativement réduites.
- Éliminer en priorité si la composition du deck est axée sur les attaques.

**Récompenses :** 10–15 Or.

---

#### 🐛 Chenipan — 30 PV

**Type** : Insecte  
**Rôle** : Introduit le stall (stratégie de temporisation) et le statut Faiblesse prolongée.

**Pattern (cycle de 3 tours) :**

| Tour | Action | Effets |
|------|--------|--------|
| 1 | **Morsure** | 4 dégâts |
| 2 | **Ligotage** | 0 dégâts + applique **Faiblesse 2 tours** au joueur |
| 3 | **Toile Soyeuse** | 0 dégâts + gagne **4 Bloc** |
| (retour tour 1) | — | — |

**Description des actions :**
- **Morsure** : Attaque mineure. 4 dégâts directs.
- **Ligotage** : Aucun dégât. Applique **Faiblesse** au joueur pendant 2 tours (ses dégâts sont réduits).
- **Toile Soyeuse** : Aucun dégât. Chenipan génère **4 Bloc** pour lui-même. Cette Toile est prioritaire sur les petites attaques du joueur.

**Stratégie joueur :**
- 🔴 DANGER si le joueur a un faible débit de dégâts : la Toile Soyeuse peut devenir difficile à percer.
- Le cycle de Faiblesse répété (tour 2 tous les 3 tours) s'accumule si le combat dure.
- Recommandé : Éliminer en 2–3 tours avant qu'il ne génère trop de Bloc.

**Récompenses :** 10–15 Or.

---

#### 🐝 Aspicot — 28 PV

**Type** : Insecte/Poison  
**Rôle** : Introduit le statut **Poison** et son accumulation progressive.

**Pattern (cycle de 2 tours) :**

| Tour | Action | Effets |
|------|--------|--------|
| 1 | **Dard Venin** | 5 dégâts + applique **2 stacks de Poison** au joueur |
| 2 | **Attaque** | 6 dégâts directs |
| (retour tour 1) | — | — |

**Description des actions :**
- **Dard Venin** : Piqûre venimeuse. 5 dégâts + le joueur reçoit **2 stacks de Poison** (perd ce nombre de PV à la fin de chaque tour jusqu'à ce que le Poison se dissipe ou soit soigné).
- **Attaque** : Coup direct. 6 dégâts.

**Stratégie joueur :**
- ⚠️ Le Poison s'accumule : après 2 tours, le joueur prend déjà 4 dégâts/fin de tour.
- Si le joueur a une potion de soin ou une carte anti-Poison, les utiliser tôt.
- La menace réelle est le Poison cumulé sur plusieurs combats (persistance entre combats non soigné).

**Récompenses :** 10–15 Or.

---

#### 🪨 Racaillou — 44 PV

**Type** : Roche/Sol  
**Rôle** : Introduit le Bloc ennemi et la notion de burst de dégâts concentré.

**Pattern (cycle de 4 tours) :**

| Tour | Action | Effets |
|------|--------|--------|
| 1 | **Jet de Pierres** | 9 dégâts |
| 2 | **Durcissement** | 0 dégâts + gagne **6 Bloc** |
| 3 | **Jet de Pierres** | 9 dégâts |
| 4 | **Jet de Pierres** | 9 dégâts |
| (retour tour 1) | — | — |

**Description des actions :**
- **Jet de Pierres** : Lancer de roches. 9 dégâts directs.
- **Durcissement** : Défense passive. Gagne **6 Bloc** pour lui-même. Le Bloc est perdu au début du tour suivant si non utilisé.

**Stratégie joueur :**
- Ennemi tank de l'Acte 1. Ses 44 PV et son Durcissement régulier en font le combat le plus long du premier acte.
- ⚠️ Ne pas perdre une attaque sur le tour de Durcissement si possible : attaquer quand il n'a pas de Bloc.
- Les cartes perçantes (ignorent le Bloc) sont particulièrement efficaces ici.
- Risque : s'il est associé à un autre ennemi (Roucool, Aspicot), la gestion des priorités devient critique.

**Récompenses :** 12–18 Or.

---

#### 🌿 Mystherbe — 34 PV

**Type** : Plante/Poison  
**Rôle** : Combine Poison et Faiblesse pour un stall dangereux. Ennemi le plus menaçant de l'Acte 1 en termes de débuffs.

**Pattern (cycle de 3 tours) :**

| Tour | Action | Effets |
|------|--------|--------|
| 1 | **Acide** | 6 dégâts |
| 2 | **Poudre Toxik** | 0 dégâts + applique **3 stacks de Poison** au joueur |
| 3 | **Somnifère** | 0 dégâts + applique **Faiblesse 2 tours** au joueur |
| (retour tour 1) | — | — |

**Description des actions :**
- **Acide** : Attaque corrosive. 6 dégâts directs.
- **Poudre Toxik** : Nuage toxique. Aucun dégât direct. Applique **3 stacks de Poison** au joueur — le dégât par tour commence élevé.
- **Somnifère** : Poudre soporifique. Aucun dégât. Applique **Faiblesse pendant 2 tours** : les dégâts du joueur sont réduits. Note : le Somnifère n'endort PAS le joueur dans ce contexte, il réduit seulement son efficacité offensive.

**Stratégie joueur :**
- 🔴 DANGER : Si le joueur laisse passer les tours 2 et 3, il cumule rapidement 3 Poison + Faiblesse.
- ⚠️ Tour 2 (Poudre Toxik) est la priorité absolue de mort. Un Mystherbe tué avant le tour 2 est inoffensif.
- Associé à Aspicot, le Poison peut atteindre 5+ stacks très rapidement.
- Éliminer en priorité absolue dans tout combat multi-ennemis.

**Récompenses :** 12–18 Or.

---

### 3.2 Élites

> Les élites de l'Acte 1 sont des Pokémon sauvages exceptionnellement puissants que le joueur a la possibilité d'éviter. Affronter une élite est toujours facultatif mais garantit une relique.

---

#### 👑 Nidoking — 110 PV (Élite Acte 1)

**Type** : Poison/Sol  
**Rôle** : Ennemi multi-menaces combinant Poison et Vulnérabilité. Récompense : Relique commune garantie.

**Pattern (cycle de 3 tours) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Corne Venimeuse** | 13 dégâts + applique **3 stacks de Poison** | ☠️ Attaque + Poison |
| 2 | **Coup de Boue** | 11 dégâts + applique **2 stacks de Vulnérabilité** au joueur | 💥 Attaque + Débuff |
| 3 | **Double Équipe** | 0 dégâts + gagne **8 Bloc** | 🛡️ Défense |
| (retour tour 1) | — | — | — |

**Mécaniques spéciales :**
- **Régal du Poison** : Si le joueur accumule **plus de 8 stacks de Poison actifs**, Nidoking saute son prochain tour offensif pour "se régaler" (animation spéciale, 0 dégâts). C'est une interaction thématique qui punit les decks qui ignorent le Poison. Après ce tour de régal, il reprend son cycle normal.

**Description des actions :**
- **Corne Venimeuse** : Coup de corne empoisonnée. 13 dégâts + 3 Poison. Sur un cycle complet, le joueur accumule 3 Poison tous les 3 tours.
- **Coup de Boue** : Projection de boue. 11 dégâts + 2 stacks de **Vulnérabilité** (le joueur reçoit 25% de dégâts supplémentaires par stack pendant X tours).
- **Double Équipe** : Esquive. Nidoking gagne 8 Bloc. Ce tour est idéal pour jouer des cartes de préparation plutôt que d'attaquer contre le Bloc.

**Stratégie joueur :**
- ⚠️ Le combo Coup de Boue (Vulnérabilité) + Corne Venimeuse (Poison) est dévastateur si les deux s'accumulent.
- Priorité : Soigner le Poison entre chaque apparition de la Corne Venimeuse si possible.
- Le tour de Double Équipe offre une fenêtre pour les cartes de soin ou d'amélioration.
- 🔴 DANGER : Ne pas avoir de carte de soin du Poison à ce stade peut coûter énormément de PV sur la longueur.

**Récompenses :** 25–40 Or + Relique commune aléatoire.

---

#### 🔥 Arcanin — 105 PV (Élite Acte 1)

**Type** : Feu  
**Rôle** : Ennemi à escalade de Force. Le joueur doit anticiper les phases de buffs offensifs.

**Pattern (cycle de 4 tours) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Feu Follet** | 0 dégâts + applique **Brûlure** au joueur | 🔥 Débuff |
| 2 | **Morsure** | 16 dégâts + applique **2 stacks de Faiblesse** au joueur | 💥 Attaque + Débuff |
| 3 | **Rugissement** | 0 dégâts + Arcanin gagne **+3 Force** (permanent pour ce combat) | ⬆️ Buff Attaque — ⚠️ SIGNALÉ |
| 4 | **Morsure (boostée)** | 16 + Force = 19 dégâts (+ toute Force accumulée) + **2 stacks de Faiblesse** | 💥 Attaque renforcée |
| (retour tour 1) | — | — | — |

**Mécaniques spéciales :**
- **Escalade de Force** : Chaque fois qu'Arcanin joue Rugissement (tour 3 de chaque cycle), il gagne **+3 Force permanente**. Après 2 cycles, sa Morsure inflige 22 dégâts. Après 3 cycles, 25 dégâts. Le combat doit être résolu rapidement.
- ⚠️ SIGNALÉ : Le Rugissement est toujours annoncé 1 tour à l'avance avec une icône de buff spéciale. Cela donne au joueur la possibilité de concentrer ses dégâts avant que le buff ne s'applique.

**Description des actions :**
- **Feu Follet** : Flammes mystérieuses. Aucun dégât direct. Applique **Brûlure** au joueur : le joueur perd X PV à la fin de chaque tour (X = stacks de Brûlure).
- **Morsure** : Attaque de base. 16 dégâts + 2 Faiblesse au joueur.
- **Rugissement** : Intimidation rugissante. Arcanin buffs sa Force de +3. L'animation montre ses muscles se gonfler. ⚠️ SIGNALÉ le tour précédent.
- **Morsure boostée** : Identique à Morsure mais les dégâts incluent la Force accumulée.

**Stratégie joueur :**
- 🔴 DANGER : Ce combat exige une élimination rapide. Chaque cycle complet rend Arcanin plus meurtrier.
- Idéalement, tuer Arcanin avant qu'il ne joue Rugissement une deuxième fois.
- Soigner la Brûlure en priorité si le joueur a peu de PV.
- Les cartes de réduction de Force ennemie (si disponibles) sont extrêmement précieuses ici.

**Récompenses :** 25–40 Or + Relique commune aléatoire.

---

### 3.3 Boss — Ronflex

#### 😴 Ronflex — 240 PV (Boss Acte 1)

**Type** : Normal  
**Rôle** : Boss massif et lent. Introduit les mécaniques de phase et la gestion de la sustain ennemie.

**Vue d'ensemble :**
Ronflex est un boss de patience. Ses dégâts individuels sont dévastateurs mais espacés. Sa capacité à se soigner exige que le joueur maintienne une pression offensive constante sans jamais laisser Repos se résoudre sans réponse.

---

**PHASE 1 — "Le Sommeil Tranquille" (240 → 120 PV)**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Écrasement** | 16 dégâts | 💥 Attaque lourde |
| 2 | **Repos** | 0 dégâts + Ronflex se soigne **25 PV** | 💤 Soin — ⚠️ SIGNALÉ |
| 3 | **Amnésie** | 0 dégâts + gagne **18 Bloc** | 🛡️ Défense massive |
| 4 | **Hyper-Faisceau** | 28 dégâts + Ronflex **passe son prochain tour** (fatigue) | 🔴 ATTAQUE DÉVASTATRICE — ⚠️ SIGNALÉ |
| (retour tour 1) | — | — | — |

**Description des actions — Phase 1 :**
- **Écrasement** : Coup de masse corporelle. 16 dégâts. Attaque prévisible.
- **Repos** : Ronflex s'allonge et récupère. Soigne **25 PV**. ⚠️ SIGNALÉ 1 tour à l'avance : l'icône montre des zzzz. Le joueur peut tenter d'infliger suffisamment de dégâts ce tour pour invalider le soin.
- **Amnésie** : Ronflex oublie ses problèmes. Gagne **18 Bloc**. Tour idéal pour les cartes de préparation.
- **Hyper-Faisceau** : Rayon dévastateur. 28 dégâts. ⚠️ SIGNALÉ 1 tour à l'avance. Après l'avoir joué, Ronflex est épuisé et passe son tour suivant (retour à tour 1 mais décalé).

---

**PHASE 2 — "Le Réveil Furieux" (< 120 PV)**

*Transition : Quand Ronflex passe sous 120 PV, animation spéciale. Il se réveille brutalement. Son pattern change immédiatement au début du tour suivant.*

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Éboulement** | 22 dégâts | 💥 Attaque renforcée |
| 2 | **Goinfrerie** | 0 dégâts + se soigne **15 PV** | 🍖 Soin — ⚠️ SIGNALÉ |
| 3 | **Hyper Tranche** | 26 dégâts | 💥 Attaque finale |
| (retour tour 1) | — | — | — |

**Description des actions — Phase 2 :**
- **Éboulement** : Ronflex roule sur l'adversaire. 22 dégâts. Plus fort que l'Écrasement.
- **Goinfrerie** : Mange frénétiquement. Se soigne **15 PV**. ⚠️ SIGNALÉ 1 tour avant avec une icône de nourriture. Soin plus faible qu'en Phase 1 mais plus fréquent.
- **Hyper Tranche** : Coup tranchant surpuissant. 26 dégâts. Aucun statut secondaire.

---

**Stratégie globale — Ronflex :**
- Phase 1 : Maximiser les dégâts aux tours 1 et 2. Tenter d'annuler le Repos en infligeant plus de 25 dégâts ce tour.
- 🔴 DANGER : Hyper-Faisceau (28 dégâts) peut one-shot un joueur avec peu de PV et sans Bloc suffisant. Toujours avoir 28+ de Bloc avant ce tour ou soigner/esquiver.
- Phase 2 : Le rythme s'accélère. Enchaîner Éboulement → Goinfrerie → Hyper Tranche = 63 dégâts sur 3 tours. Une défense solide est obligatoire.
- Le soin de Phase 1 (25 PV) est la menace principale pour les decks lents. Prioriser les cartes de hauts dégâts instantanés.

**Récompenses :**
- **Relique rare aléatoire** (pool Acte 1)
- **Or ×1.5** (multiplicateur sur l'or de base du boss)
- Accès à l'Acte 2

---

## 4. Acte 2 — La Forêt Maudite

> *Les ombres s'épaississent entre les arbres centenaires. Des Pokémon de type Spectre et Psy rôdent dans la pénombre. L'immunité et la manipulation du deck deviennent des menaces réelles.*

**Contexte thématique** : Forêt hantée. L'atmosphère est oppressante. Les ennemis exploitent la manipulation de deck (défausse, malédictions) et les statuts mentaux (Sommeil, Hypnose). Pour la première fois, certains ennemis sont **immunisés aux attaques Normales**.

---

### 4.1 Ennemis Normaux

#### Tableau récapitulatif — Acte 2

| Pokémon    | PV  | Dégâts/tour moy. | Statuts/Mécaniques | Difficulté |
|------------|-----|------------------|--------------------|------------|
| Fantominus | 38  | 8 (vol PV)        | Sommeil, Vol de PV, IMMUNITÉ Normale | ⭐⭐⭐ |
| Magnéti    | 50  | 11 (50% Paralysie)| Paralysie          | ⭐⭐⭐      |
| Osselait   | 55  | 13                | Critique garanti   | ⭐⭐⭐      |
| Koffing    | 52  | 10 (+ ON DEATH)   | Poison, Explosion  | ⭐⭐⭐⭐     |
| Hypno      | 65  | 9                 | Sommeil, Faiblesse | ⭐⭐⭐⭐     |
| Voltorbe   | 48  | 10 (+ Explosion)  | Paralysie, Explosion | ⭐⭐⭐⭐   |

---

#### 👻 Fantominus — 38 PV

**Type** : Spectre/Poison  
**Rôle** : Premier ennemi avec immunité. Introduit la mécanique de vol de PV et le Sommeil court.

**⚠️ IMMUNITÉ : Attaques de type Normal — Ces attaques ne font aucun dégât à Fantominus.**

**Pattern (cycle de 3 tours) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Léchouille** | 11 dégâts + vole **3 PV** au joueur (Fantominus se soigne de 3) | 💜 Attaque + Vol de vie |
| 2 | **Hypnose** | 0 dégâts + applique **Sommeil 1 tour** au joueur (30% d'échec) | 😴 Sommeil — ⚠️ Peut échouer |
| 3 | **Charge Spectre** | 14 dégâts | 💥 Attaque Spectre forte |
| (retour tour 1) | — | — | — |

**Description des actions :**
- **Léchouille** : Coup fantomatique suçant la vie. 11 dégâts + Fantominus récupère 3 PV.
- **Hypnose** : Tentative d'endormissement. **30% de chance d'échec** (l'ennemi rate son action). Si réussi, le joueur est **Endormi pendant 1 tour** : il ne peut pas jouer de cartes ce tour.
- **Charge Spectre** : Assaut spectral. 14 dégâts. Attaque d'un type qui ne peut pas être réduite par les immunités Normales du joueur.

**Stratégie joueur :**
- 🔴 DANGER : Si le joueur n'a pas de cartes de type Spectre, Plante, Psy ou Sol dans son deck, Fantominus sera très difficile à tuer.
- Vérifier AVANT ce combat si le deck contient des attaques non-Normales.
- L'Hypnose ratée (30%) est aléatoire : ne pas compter dessus.
- Le vol de vie rend Fantominus survivant plus longtemps qu'il n'y paraît.

**Récompenses :** 15–22 Or.

---

#### ⚡ Magnéti — 50 PV

**Type** : Électrik/Acier  
**Rôle** : Introduit le statut **Paralysie** et son effet d'aléa sur le joueur.

**Pattern (cycle de 3 tours) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Cage-Éclair** | 10 dégâts + **50% de chance de Paralysie** au joueur | ⚡ Attaque + Paralysie |
| 2 | **Tonnerre** | 14 dégâts | 💥 Attaque forte |
| 3 | **Armure de Métal** | 0 dégâts + gagne **8 Bloc** | 🛡️ Défense |
| (retour tour 1) | — | — | — |

**Description des actions :**
- **Cage-Éclair** : Décharge électrique. 10 dégâts. **50% de chance** d'appliquer **Paralysie** au joueur : pendant X tours, il a 25% de chance de perdre 1 énergie au début de son tour.
- **Tonnerre** : Éclair puissant. 14 dégâts. Aucun effet secondaire.
- **Armure de Métal** : Renforcement magnétique. Gagne **8 Bloc**. Tour prévisible.

**Stratégie joueur :**
- ⚠️ La Paralysie à 50% est l'un des statuts les plus frustrants du jeu. Tuer Magnéti vite.
- L'Armure de Métal au tour 3 est prévisible : concentrer les dégâts aux tours 1 et 2.
- Si Paralysié, planifier en supposant d'avoir 1 énergie en moins par tour comme worst case.

**Récompenses :** 15–22 Or.

---

#### 💀 Osselait — 55 PV

**Type** : Sol  
**Rôle** : Ennemi mid-range solide avec une attaque à coup critique garanti. Introduit la notion de blocage massif nécessaire.

**Pattern (cycle de 3 tours) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Coup Bâton** | 12 dégâts | 💥 Attaque |
| 2 | **Armure d'Os** | 0 dégâts + gagne **10 Bloc** | 🛡️ Défense forte |
| 3 | **Fauchage** | 17 dégâts — **coup critique garanti** | 💥🗡️ CRITIQUE GARANTI — ⚠️ SIGNALÉ |
| (retour tour 1) | — | — | — |

**Description des actions :**
- **Coup Bâton** : Frappe osseuse. 12 dégâts directs.
- **Armure d'Os** : Crée un bouclier d'os. Gagne **10 Bloc**. Bloc très élevé, difficile à percer sans cartes appropriées.
- **Fauchage** : Coup de faux. **17 dégâts**, **critique garanti** (ignore X% du Bloc du joueur, ou dégâts doublés selon implémentation). ⚠️ SIGNALÉ au tour précédent.

**Stratégie joueur :**
- ⚠️ Le Fauchage est SIGNALÉ au tour 2 (pendant l'Armure d'Os). Se préparer à absorber 17+ dégâts au tour 3.
- Ne pas gaspiller toutes ses cartes d'attaque contre le Bloc au tour 2 : les économiser pour l'Armure d'Os retombée et le tour 1 suivant.
- 🔴 DANGER : Le combo Armure d'Os + Fauchage consécutifs peut tromper : le Bloc protège Osselait mais pas le joueur.

**Récompenses :** 15–22 Or.

---

#### 💨 Koffing — 52 PV

**Type** : Poison  
**Rôle** : Ennemi à mécanique de mort explosive. Introduit la **mécanique ON DEATH** et la nécessité d'anticiper la mort d'un ennemi.

**Pattern (cycle de 3 tours + événement mort) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Smog** | 8 dégâts + applique **4 stacks de Poison** au joueur | ☠️ Attaque + Poison fort |
| 2 | **Odeur Fétide** | 0 dégâts + gagne **6 Bloc** | 🛡️ Défense |
| 3 | **Smog** | 8 dégâts + applique **4 stacks de Poison** au joueur | ☠️ Attaque + Poison fort |
| **ON DEATH** | **Déflagration** | **15 dégâts à TOUS les ennemis ET le joueur** | 💥 EXPLOSION |

**Description des actions :**
- **Smog** : Projection de gaz toxique. 8 dégâts + 4 Poison. Très agressif pour l'Acte 2.
- **Odeur Fétide** : Émission défensive. Gagne 6 Bloc. Tour de pause offensif.
- **Déflagration (ON DEATH)** : 🔴 Quand Koffing est tué, il explose. Inflige **15 dégâts immédiats au joueur** (et aux autres ennemis si combat multi). Ce dégât IGNORE le Bloc.

**Stratégie joueur :**
- 🔴 DANGER : L'explosion de mort est l'une des mécaniques les plus surprenantes du jeu. Tuer Koffing avec des dégâts exacts pour mourir à 0 PV.
- ⚠️ Ne pas tuer Koffing quand le joueur est à moins de 15 PV sans Bloc ou soin disponible.
- La Déflagration est particulièrement dangereuse si Koffing mourait en fin de tour avec Poison actif (double peine).
- Si possible, utiliser des cartes à dégâts graduels (Poison sur l'ennemi) pour lui laisser le temps de mourir "à distance".

**Récompenses :** 15–22 Or.

---

#### 🌙 Hypno — 65 PV

**Type** : Psy  
**Rôle** : Ennemi de contrôle. Le Sommeil long et la Faiblesse prolongée peuvent ruiner un tour complet.

**Pattern (cycle de 3 tours) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Hypnose** | 0 dégâts + **Sommeil 2 tours** au joueur (**25% d'échec**) | 😴 Sommeil — ⚠️ SIGNALÉ |
| 2 | **Psyko** | 14 dégâts | 💥 Attaque Psy |
| 3 | **Berceuse** | 0 dégâts + applique **Faiblesse 3 tours** au joueur | 🎵 Faiblesse longue — ⚠️ SIGNALÉ |
| (retour tour 1) | — | — | — |

**Description des actions :**
- **Hypnose** : Pendule hypnotique. **Sommeil 2 tours** — le joueur ne peut jouer aucune carte pendant 2 tours consécutifs. **25% de chance d'échec**. ⚠️ SIGNALÉ au tour précédent.
- **Psyko** : Attaque psychique. 14 dégâts directs.
- **Berceuse** : Mélodie endormante. Applique **Faiblesse 3 tours** (les dégâts du joueur sont réduits). ⚠️ SIGNALÉ.

**Stratégie joueur :**
- 🔴 DANGER : Sommeil 2 tours = le joueur perd 2 tours complets. Hypno en profite pour Psyko deux fois = 28 dégâts en 2 tours sans réponse possible.
- Les potions peuvent être utilisées pendant le Sommeil dans certaines implémentations : vérifier.
- Tuer Hypno avant son premier tour est idéal. Il a 65 PV, ce qui est élevé pour l'Acte 2.
- La Berceuse au tour 3 précède toujours une nouvelle Hypnose : le combo Berceuse → Hypnose est particulièrement dévastateur.

**Récompenses :** 18–25 Or.

---

#### ⚡ Voltorbe — 48 PV

**Type** : Électrik  
**Rôle** : Ennemi kamikaze. La menace principale est son explosion à faible PV. Gestion HP critique.

**Pattern (dynamique + événement PV) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Cage-Éclair** | 10 dégâts + **30% de chance de Paralysie** au joueur | ⚡ Attaque + Paralysie |
| 2 | **Cage-Éclair** | 10 dégâts + **30% de chance de Paralysie** au joueur | ⚡ Attaque + Paralysie |
| **SEUIL 20% PV** | **ALERTE** | 0 dégâts — Voltorbe **clignote en rouge**, icône ALERTE visible | 🚨 ALERTE PRÉ-EXPLOSION |
| **Tour suivant ALERTE** | **Explosion** | **25 dégâts au joueur — ignore le Bloc** | 💥 EXPLOSION FATALE |

**Description des actions :**
- **Cage-Éclair** : Décharge. 10 dégâts + 30% Paralysie. Répété indéfiniment jusqu'au seuil critique.
- **ALERTE** : Quand Voltorbe atteint 20% de ses PV restants (environ 10 PV), il passe le tour à "charger". Animation de clignotement rouge. L'icône d'intention indique une explosion imminente.
- **Explosion** : Le tour suivant l'Alerte, Voltorbe explose. **25 dégâts ignorant le Bloc**. Voltorbe meurt également.

**Stratégie joueur :**
- 🔴 DANGER CRITIQUE : Si le joueur amène Voltorbe sous 10 PV, il a UN SEUL TOUR pour le tuer avant l'Explosion.
- Idéal : le tuer en un seul burst de dégâts depuis 20+ PV pour éviter le seuil d'Alerte.
- Alternativement : laisser Voltorbe à exactement 11–12 PV et jouer une carte d'exactement 11–12 dégâts.
- ⚠️ Ne jamais laisser Voltorbe en vie après l'Alerte si le joueur est à moins de 25 PV.
- La Paralysie à 30% est secondaire face à la menace explosive.

**Récompenses :** 15–22 Or.

---

### 4.2 Élites

> Les élites de l'Acte 2 sont significativement plus dangereuses. Leurs mécaniques spéciales peuvent complètement déstructurer le deck ou l'énergie du joueur.

---

#### 👁️ Ectoplasma (Gengar) — 130 PV (Élite Acte 2)

**Type** : Spectre/Poison  
**Rôle** : Ennemi de contrôle de deck. Ses capacités de défausse sont les plus menaçantes de l'Acte 2.

**⚠️ IMMUNITÉ : Attaques de type Normal — Ces attaques ne font aucun dégât à Ectoplasma.**

**Pattern (cycle de 3 tours) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Faux-Chage** | 18 dégâts + force le joueur à **défausser 2 cartes** de sa main | 💜 Attaque + Défausse |
| 2 | **Ombre Portée** | 22 dégâts | 💥 Attaque Spectre lourde |
| 3 | **Cauchemar** | 0 dégâts + le joueur **défausse 2 cartes aléatoires** de sa main | 😈 Défausse — ⚠️ SIGNALÉ |
| (retour tour 1) | — | — | — |

**Description des actions :**
- **Faux-Chage** : Assaut spectral. 18 dégâts + le joueur doit immédiatement défausser 2 cartes de sa main (il choisit lesquelles).
- **Ombre Portée** : Coup d'ombre dimensionnel. 22 dégâts. Attaque la plus puissante du cycle.
- **Cauchemar** : Manipulation mentale. Aucun dégât. **2 cartes aléatoires** de la main du joueur sont défaussées (sans son choix). ⚠️ SIGNALÉ au tour précédent.

**Stratégie joueur :**
- 🔴 DANGER : Si le joueur a peu de cartes en main (3–4), Cauchemar peut lui faire perdre ses meilleures cartes.
- Avant le tour de Cauchemar (⚠️ SIGNALÉ au tour 2), le joueur doit jouer un maximum de cartes pour réduire sa main.
- Les cartes à très faible coût en énergie (0 énergie) devraient être jouées en priorité pour vider la main.
- Immunité aux attaques Normales : avoir des cartes Spectre, Psy ou Plante est indispensable.
- Le combo Faux-Chage + Cauchemar sur un cycle de 3 tours = 4 cartes défaussées. Sur 2 cycles = 8 cartes perdues du deck actif.

**Récompenses :** 30–50 Or + Relique rare aléatoire (pool Acte 2).

---

#### 🐉 Léviator (Gyarados) — 155 PV (Élite Acte 2)

**Type** : Eau/Vol  
**Rôle** : Ennemi à scaling passif de dégâts. Plus le joueur attaque, plus Léviator contre-attaque fort.

**Pattern (cycle de 4 tours) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Cascade** | 22 dégâts | 💥 Attaque eau lourde |
| 2 | **Colère (Passive)** | **PASSIVE** : Léviator gagne **+4 dégâts permanents pour chaque attaque reçue CE tour** | 🔴 Aura active — ⚠️ SIGNALÉ |
| 3 | **Aqua-Queue** | 0 dégâts + Léviator gagne **18 Bloc** + son prochain coup inflige **+10 dégâts bonus** | 🛡️ Défense + buff offensif |
| 4 | **Morsure** | 24 dégâts + applique **2 stacks de Vulnérabilité** au joueur | 💥 Attaque + Vulnérabilité |
| (retour tour 1) | — | — | — |

**Mécaniques spéciales :**
- **Colère (Passive Tour 2)** : Ce tour, Léviator est en mode Rage. Chaque fois que le joueur lui inflige des dégâts (quelle que soit la carte), Léviator gagne **+4 dégâts permanents** sur ses prochaines attaques. Jouer 3 cartes d'attaque = +12 dégâts permanents pour Léviator.
- ⚠️ SIGNALÉ : L'icône de Colère est visible dès le tour 1 (annonce du tour 2).

**Description des actions :**
- **Cascade** : Torrent d'eau puissant. 22 dégâts.
- **Colère** : Activation de la rage. Le joueur doit choisir entre ne pas attaquer ce tour (pour éviter les stacks de Colère) ou attaquer en sachant que Léviator deviendra plus fort.
- **Aqua-Queue** : Frappe défensive. 18 Bloc + bonus offensif de +10 dégâts sur la prochaine attaque.
- **Morsure** : Coup de mâchoires. 24 dégâts + 2 Vulnérabilité au joueur.

**Stratégie joueur :**
- 🔴 DANGER : Le tour de Colère est le plus critique du combat. Ne pas attaquer ce tour peut être la meilleure décision, même si cela "gaspille" un tour.
- Si le joueur n'attaque pas au tour 2, il évite les stacks de Colère mais prend Cascade (22 dmg) le tour suivant avec 0 Colère accumulée.
- Idéal : utiliser uniquement 1 attaque au tour de Colère si inévitable, pour limiter les stacks à +4.
- L'Aqua-Queue donne un Bloc de 18 ET un bonus de +10 au prochain coup : après Aqua-Queue, la Morsure inflige 34 dégâts. Préparer 34+ de Bloc.

**Récompenses :** 30–50 Or + Relique rare aléatoire (pool Acte 2).

---

#### 🔮 Alakazam — 140 PV (Élite Acte 2)

**Type** : Psy  
**Rôle** : Ennemi de contrôle d'énergie et de deck. Combine dégâts et manipulation pour désorienter le joueur.

**Pattern (cycle de 4 tours) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Psyko** | 20 dégâts | 💥 Attaque Psy forte |
| 2 | **Clairvoyance** | 0 dégâts + révèle les **3 prochaines cartes** à piocher du joueur (information pure) | 🔭 Info + Préparation |
| 3 | **Échange** | 14 dégâts + le joueur **perd 1 énergie** au début de son prochain tour | 💥 Attaque + Drain énergie — ⚠️ SIGNALÉ |
| 4 | **Psycho** | 24 dégâts + le joueur **défausse 1 carte aléatoire** | 💥 Attaque + Défausse |
| (retour tour 1) | — | — | — |

**Description des actions :**
- **Psyko** : Onde psychique. 20 dégâts.
- **Clairvoyance** : Lecture mentale. Révèle visuellement les 3 prochaines cartes de la pioche du joueur. Alakazam les "lit" mais ne fait rien d'autre — c'est une information pure pour le joueur, qui peut ajuster sa stratégie en conséquence.
- **Échange** : Vol psychique d'énergie. 14 dégâts + le joueur commence son prochain tour avec **1 énergie en moins**. ⚠️ SIGNALÉ.
- **Psycho** : Assaut mental puissant. 24 dégâts + défausse aléatoire de 1 carte de la main du joueur.

**Stratégie joueur :**
- La Clairvoyance est une mécanique d'information : utiliser ces informations pour planifier.
- ⚠️ Avant l'Échange (tour 3), anticiper un tour à seulement 2 énergies au lieu de 3. Jouer des cartes qui fonctionnent à bas coût.
- Le combo Échange + Psycho sur tours consécutifs = dégâts + énergie réduite + défausse.
- 🔴 DANGER : Alakazam a 140 PV et des dégâts élevés (20–24). Sans soin ou défense, il tue rapidement.

**Récompenses :** 30–50 Or + Relique rare aléatoire (pool Acte 2).

---

### 4.3 Boss — Dracolosse

#### 🐉 Dracolosse (Dragonite) — 310 PV (Boss Acte 2)

**Type** : Dragon/Vol  
**Rôle** : Boss d'escalade offensive. Chaque cycle, il accumule de la Force via Danse Dragon. Ses dégâts finaux sont catastrophiques si non éliminé assez vite.

---

**PHASE 1 — "La Danse du Dragon" (310 → 160 PV)**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Aéropique** | 22 dégâts | 💥 Attaque Vol |
| 2 | **Rage Dragon** | 18 dégâts + Dracolosse gagne **3 stacks de Fureur** | 💥 Attaque + Buff Fureur |
| 3 | **Hyper Faisceau** | 34 dégâts — Dracolosse **passe son prochain tour** | 🔴 ATTAQUE DÉVASTATRICE — ⚠️ SIGNALÉ 1 TOUR AVANT |
| 4 | **Danse Dragon** | 0 dégâts + Dracolosse gagne **6 Force permanente** | ⬆️ BUFF MASSIF — ⚠️ SIGNALÉ |
| (retour tour 1) | — | — | — |

**Mécaniques de la Fureur :**
- **Fureur** : Chaque stack de Fureur augmente les dégâts de Dracolosse de +2. Après 1 cycle, la Rage Dragon lui donne 3 Fureur = +6 dégâts à toutes ses attaques suivantes.
- La Fureur et la Force se cumulent. Après 2 cycles : +6 Fureur + 6 Force = +12 dégâts sur toutes ses attaques.

---

**PHASE 2 — "L'Ultime Déchaînement" (< 160 PV)**

*Transition : Animation de transformation. Dracolosse rugit, ses yeux brillent en orange. Son pattern change immédiatement.*

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Danse Dragon** | 0 dégâts + gagne **5 Force** | ⬆️ Buff immédiat — ⚠️ SIGNALÉ |
| 2 | **Combo Dragon** | 22 + 16 dégâts (**2 hits séparés**) | 💥 Attaque double |
| 3 | **Combo Dragon** | 22 + 16 dégâts (**2 hits séparés**) | 💥 Attaque double |
| 4 | **COMPTE À REBOURS 3** | Annonce de Danse Ultime dans 3 tours (icône compte à rebours) | ⏳ COMPTE À REBOURS — ⚠️ SIGNALÉ MASSIF |
| 5 | **COMPTE À REBOURS 2** | Continuation du compte à rebours | ⏳ 2 TOURS |
| 6 | **COMPTE À REBOURS 1** | Continuation du compte à rebours | ⏳ 1 TOUR |
| 7 | **DANSE ULTIME** | 50 dégâts — **IGNORE LE BLOC** | 🔴 COUP FATAL |

**Note sur le Compte à Rebours :** Si Dracolosse est tué pendant le compte à rebours, la Danse Ultime n'est pas résolue. C'est une fenêtre de tension maximale conçue pour forcer le joueur à pousser ses dernières ressources offensives.

---

**Stratégie globale — Dracolosse :**
- Phase 1 : L'Hyper Faisceau à 34 dégâts est la principale menace. ⚠️ SIGNALÉ au tour 2 (pendant Rage Dragon). Avoir 34+ de Bloc au tour 3.
- Tuer Dracolosse avant le 2e Danse Dragon si possible. Chaque Danse Dragon = +6 Force permanente.
- Phase 2 : Le Combo Dragon (2 hits = 38 dégâts) est plus régulier que l'Hyper Faisceau mais tout aussi dévastateur.
- 🔴 DANGER MAXIMAL : La Danse Ultime à 50 dégâts ignore le Bloc. Si le joueur n'a pas tué Dracolosse avant la résolution, il doit absorber 50 dégâts directs. Avec la Force accumulée, cela peut dépasser 60 dégâts.
- Stratégie recommandée : En Phase 2, tout consacrer à tuer Dracolosse pendant les 3 tours du compte à rebours.

**Récompenses :**
- **Relique légendaire** (pool Acte 2)
- **Amélioration gratuite d'1 carte** au choix dans le deck actuel
- Accès à l'Acte 3

---

## 5. Acte 3 — Le Sommet Légendaire

> *Les vents hurlent au sommet du Mont Spire. Les Pokémon qui vivent ici ne connaissent pas la pitié. Les Légendaires vous attendent.*

**Contexte thématique** : Altitude extrême, froid et électricité dans l'air. Les ennemis normaux sont des Pokémon d'élite de Gen 1 au sommet de leur puissance. Les élites sont les Trois Oiseaux Légendaires. Le Boss Final est Mewtwo lui-même.

---

### 5.1 Ennemis Normaux

#### Tableau récapitulatif — Acte 3

| Pokémon     | PV  | Dégâts/tour moy. | Statuts/Mécaniques | Difficulté |
|-------------|-----|------------------|--------------------|------------|
| Machamp     | 82  | 14               | Vulnérabilité, Faiblesse | ⭐⭐⭐⭐ |
| Steelix     | 98  | 16 (avec Bloc)   | Vulnérabilité, Bloc massif | ⭐⭐⭐⭐ |
| Tauros      | 84  | 19               | Faiblesse, Coup chargé | ⭐⭐⭐⭐ |
| Électabuzz  | 78  | 14               | Paralysie, Soin | ⭐⭐⭐⭐ |
| Lokhlass    | 88  | 16               | Sommeil, Gel | ⭐⭐⭐⭐⭐ |

---

#### 💪 Machamp — 82 PV

**Type** : Combat  
**Rôle** : Ennemi offensif pur avec application de Vulnérabilité. Ses 4 bras permettent des attaques multiples.

**Pattern (cycle de 4 tours) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Poing de Feu** | 14 dégâts + applique **2 stacks de Vulnérabilité** au joueur | 🔥 Attaque + Vulnérabilité |
| 2 | **Mégapoing** | 18 dégâts | 💥 Attaque lourde |
| 3 | **Vitesse Extrême** | 12 dégâts × **2 hits** (24 total) | ⚡ Attaque double |
| 4 | **Intimidation** | 0 dégâts + applique **Faiblesse 2 tours** au joueur | 😤 Débuff — ⚠️ SIGNALÉ |
| (retour tour 1) | — | — | — |

**Description des actions :**
- **Poing de Feu** : Uppercut enflammé. 14 dégâts + 2 Vulnérabilité (joueur reçoit +25% dégâts par stack pour X tours).
- **Mégapoing** : Coup concentré des 4 poings. 18 dégâts.
- **Vitesse Extrême** : Double frappe ultra-rapide. 12 + 12 = 24 dégâts totaux en 2 hits. Chaque hit peut provoquer des effets séparément.
- **Intimidation** : Rugissement intimidant. Aucun dégât. Faiblesse 2 tours. ⚠️ SIGNALÉ.

**Stratégie joueur :**
- 🔴 DANGER : La Vulnérabilité au tour 1 + Mégapoing au tour 2 = le Mégapoing inflige 22+ dégâts effectifs (avec Vulnérabilité active).
- Vitesse Extrême (24 dégâts) est l'attaque la plus forte du cycle. La Vulnérabilité du tour 1 la rend dévastatrice si elle est encore active au tour 3.
- L'Intimidation au tour 4 prépare le cycle suivant : Poing de Feu avec Faiblesse active = encore plus de débuffs cumulés.

**Récompenses :** 20–30 Or.

---

#### 🐍 Steelix — 98 PV

**Type** : Acier/Sol  
**Rôle** : Tank ultra-résistant. Ses cycles défensifs-offensifs exigent de percer une Armure de Métal massive.

**Pattern (cycle de 4 tours) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Cassage** | 16 dégâts | 💥 Attaque acier |
| 2 | **Armure de Métal** | 0 dégâts + gagne **18 Bloc** | 🛡️ Défense extrême — ⚠️ SIGNALÉ |
| 3 | **Croc Fatal** | 22 dégâts + applique **3 stacks de Vulnérabilité** | 💥 Attaque + Vulnérabilité forte — ⚠️ SIGNALÉ |
| 4 | **Armure de Métal** | 0 dégâts + gagne **18 Bloc** | 🛡️ Défense extrême |
| (retour tour 1) | — | — | — |

**Description des actions :**
- **Cassage** : Frappe d'acier massif. 16 dégâts.
- **Armure de Métal** : Renforcement total. Gagne **18 Bloc**. Extrêmement difficile à percer sans cartes perçantes ou Vulnérabilité.
- **Croc Fatal** : Morsure d'acier mortelle. 22 dégâts + **3 Vulnérabilité**. ⚠️ SIGNALÉ au tour 2.
- **Armure de Métal (bis)** : Identique au tour 2. Steelix enchaîne 2 Armures de Métal sur 4 tours.

**Stratégie joueur :**
- ⚠️ L'Armure de Métal (18 Bloc) aux tours 2 et 4 signifie que Steelix est quasi-invincible la moitié du temps avec un deck d'attaques faibles.
- Cartes perçantes indispensables, ou accumuler suffisamment de dégâts pour dépasser 18 en 1 tour.
- Appliquer la Vulnérabilité sur Steelix (si carte disponible) rend ses tours sans Armure beaucoup plus vulnérables.
- 🔴 DANGER : Croc Fatal (22 dmg + 3 Vulnérabilité) précède souvent une nouvelle série d'attaques avec Vulnérabilité active.

**Récompenses :** 20–30 Or.

---

#### 🐂 Tauros — 84 PV

**Type** : Normal  
**Rôle** : Ennemi imprévisible avec un coup chargé très puissant. Le cycle de Jackpot oblige à anticiper 2 tours d'avance.

**Pattern (cycle de 4 tours) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Bélier** | 19 dégâts | 💥 Charge directe |
| 2 | **Jackpot (Charge)** | 0 dégâts + annonce de "Jackpot" — Tauros charge son prochain coup | ⏳ CHARGE — ⚠️ SIGNALÉ |
| 3 | **Jackpot (Résolution)** | 24 dégâts — **coup chargé** | 💥 Attaque chargée forte |
| 4 | **Intimidation** | 0 dégâts + applique **3 stacks de Faiblesse** au joueur | 😤 Débuff fort — ⚠️ SIGNALÉ |
| (retour tour 1) | — | — | — |

**Description des actions :**
- **Bélier** : Charge de taureau. 19 dégâts directs. Attaque simple.
- **Jackpot (Charge)** : Tauros gratte le sol et prend de l'élan. 0 dégâts. ⚠️ SIGNALÉ avec une icône de charge. Le joueur sait que le prochain coup sera le Jackpot résolu.
- **Jackpot (Résolution)** : Impact de la charge. 24 dégâts.
- **Intimidation** : Meugle d'intimidation. 3 stacks de Faiblesse prolongée. ⚠️ SIGNALÉ.

**Stratégie joueur :**
- Le Bélier (19 dmg) + Jackpot résolu (24 dmg) = 43 dégâts en 2 tours. Défense solide nécessaire.
- L'Intimidation à 3 stacks est particulièrement sévère : avec 3 Faiblesse, les attaques du joueur sont réduites.
- Le combo Intimidation → Bélier (prochain cycle) avec Faiblesse active est particulièrement efficace pour Tauros.
- 🔴 DANGER : Avec la Faiblesse active du cycle précédent, Tauros peut dominer un cycle entier si le joueur ne soigne pas ses statuts.

**Récompenses :** 20–30 Or.

---

#### ⚡ Électabuzz — 78 PV

**Type** : Électrik  
**Rôle** : Ennemi qui se soigne à mi-combat. Combine pression offensive et sustain.

**Pattern (cycle de 4 tours) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Tonnerre** | 16 dégâts + **50% de chance de Paralysie** | ⚡ Attaque + Paralysie |
| 2 | **Soin** | 0 dégâts + se soigne **15 PV** | 💚 Soin — ⚠️ SIGNALÉ |
| 3 | **Tonnerre** | 16 dégâts + **50% de chance de Paralysie** | ⚡ Attaque + Paralysie |
| 4 | **Cage-Éclair** | 14 dégâts × **2 hits** (28 total) | ⚡ Attaque double |
| (retour tour 1) | — | — | — |

**Description des actions :**
- **Tonnerre** : Éclair puissant. 16 dégâts + 50% Paralysie. S'utilise deux fois par cycle.
- **Soin** : Récupération électrique. Se soigne de 15 PV. ⚠️ SIGNALÉ au tour précédent.
- **Cage-Éclair** : Double décharge. 14 + 14 = 28 dégâts en 2 hits. Risque de Paralysie sur chaque hit.

**Stratégie joueur :**
- ⚠️ Le Soin de 15 PV au tour 2 exige que le joueur inflige plus de 15 dégâts à chaque tour pour avancer dans le combat.
- La Paralysie à 50% sur le Tonnerre peut s'accumuler si le joueur subit plusieurs Tonnerres consécutifs.
- La Cage-Éclair (28 dégâts en 2 hits) est la menace principale du cycle. Avec Paralysie active, le joueur peut ne pas avoir assez de ressources pour bloquer.
- 🔴 DANGER : Si Paralysé et sous pression, le joueur perd rapidement le contrôle du combat.

**Récompenses :** 20–30 Or.

---

#### 🌊 Lokhlass — 88 PV

**Type** : Eau/Normal  
**Rôle** : Ennemi multi-menaces combinant Sommeil et Gel. L'ennemi normal le plus difficile de l'Acte 3.

**Pattern (cycle de 4 tours) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Hydrocanon** | 18 dégâts | 💧 Attaque eau forte |
| 2 | **Chant** | 0 dégâts + applique **Sommeil 1 tour** au joueur | 🎵 Sommeil — ⚠️ SIGNALÉ |
| 3 | **Blizzard** | 14 dégâts + applique **Gel 2 tours** au joueur | ❄️ Attaque + Gel |
| 4 | **Hydrocanon** | 18 dégâts | 💧 Attaque eau forte |
| (retour tour 1) | — | — | — |

**Description des actions :**
- **Hydrocanon** : Canon à eau. 18 dégâts directs. Utilisé 2 fois par cycle.
- **Chant** : Mélodie aquatique. Applique **Sommeil 1 tour** au joueur. ⚠️ SIGNALÉ. Le joueur perd 1 tour complet.
- **Blizzard** : Tempête de glace. 14 dégâts + **Gel 2 tours** : le joueur ne peut pas jouer de cartes d'attaque pendant 2 tours (variante : pioche réduite ou coût en énergie augmenté).

**Stratégie joueur :**
- 🔴 DANGER MAXIMAL : Sommeil 1 tour + Blizzard (Gel 2 tours) = le joueur peut être non-opérationnel pendant 3 tours consécutifs.
- Le combo Chant (tour 2) → Blizzard (tour 3) → Hydrocanon (tour 4) inflige 32 dégâts pendant que le joueur ne peut pas se défendre.
- Avoir des potions anti-statut est vital avant ce combat.
- ⚠️ Tour 2 (Chant) est ⚠️ SIGNALÉ au tour 1. Se préparer à perdre un tour.

**Récompenses :** 22–32 Or.

---

### 5.2 Élites — Oiseaux Légendaires

> Les Trois Oiseaux Légendaires sont les élites de l'Acte 3. Un seul d'entre eux apparaît par run (aléatoire). Ils sont significativement plus puissants que les élites précédentes.

---

#### ❄️ Artikodin — 185 PV (Élite Acte 3)

**Type** : Glace/Vol  
**Rôle** : Élite de contrôle et d'usure. Son Aura de Grêle inflige des dégâts passifs constants. Le Gel est dévastateur.

**Pattern (cycle de 4 tours) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Blizzard** | 24 dégâts + applique **Gel 2 tours** au joueur | ❄️ Attaque + Gel fort — ⚠️ SIGNALÉ |
| 2 | **Tempête de Grêle** | 0 dégâts + active **AURA DE GRÊLE** : le joueur perd **6 PV/tour pendant 3 tours** | 🌨️ AURA ACTIVE — ⚠️ SIGNALÉ |
| 3 | **Bouclier de Glace** | 0 dégâts + gagne **22 Bloc** + **immunité aux attaques de type Feu** au prochain tour | 🛡️ Défense + Immunité — ⚠️ SIGNALÉ |
| 4 | **Blizzard** | 24 dégâts + applique **Gel 2 tours** au joueur | ❄️ Attaque + Gel fort |
| (retour tour 1) | — | — | — |

**Mécaniques spéciales :**
- **Aura de Grêle** : Une fois activée (tour 2), le joueur perd 6 PV à la fin de chaque tour pendant 3 tours (total 18 PV de dégâts passifs). L'Aura peut être réactivée si Artikodin joue à nouveau Tempête de Grêle.
- **Bouclier de Glace** : L'immunité au Feu dure uniquement 1 tour (le prochain tour après Bouclier). Les cartes de Feu du joueur sont inutiles ce tour.

**Stratégie joueur :**
- 🔴 DANGER EXTRÊME : Gel 2 tours + Aura de Grêle + Blizzard = le joueur peut perdre 48+ PV en 4 tours sans se défendre efficacement.
- Avoir des cartes de guérison des statuts de Gel est impératif avant ce combat.
- L'immunité au Feu au tour 3 est prévisible (⚠️ SIGNALÉ) : éviter les cartes Feu ce tour.
- Le Bouclier de Glace (22 Bloc) est très élevé. Les cartes perçantes ou la Vulnérabilité appliquée sur Artikodin sont recommandées.

**Récompenses :** 40–65 Or + Relique légendaire (pool Acte 3).

---

#### ⚡ Électhor — 195 PV (Élite Acte 3)

**Type** : Électrik/Vol  
**Rôle** : Élite de pression électrique pure. Sa Maîtrise lui octroie une Force permanente massive.

**Pattern (cycle de 4 tours) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Tonnerre** | 24 dégâts + **50% de chance de Paralysie** | ⚡ Attaque forte + Paralysie |
| 2 | **Cage-Éclair** | 14 dégâts × **3 hits** (42 total) | ⚡ Triple attaque |
| 3 | **Maîtrise** | 0 dégâts + Électhor gagne **+6 Force permanente** au prochain tour | ⬆️ BUFF MASSIF — ⚠️ SIGNALÉ |
| 4 | **Cage-Éclair (boostée)** | 14+6=20 dégâts × 3 hits (60 total) | ⚡ Triple attaque renforcée |
| (retour tour 1) | — | — | — |

**Mécaniques spéciales :**
- **Maîtrise** : Électhor canalise la foudre. ⚠️ SIGNALÉ au tour 2 (pendant Cage-Éclair). Le prochain tour, il gagne **+6 Force permanente**. Après 2 cycles, sa Cage-Éclair inflige 26 × 3 = 78 dégâts.
- La Paralysie peut frapper sur chacun des 3 hits de Cage-Éclair. Probabilité cumulée de Paralysie : élevée.

**Stratégie joueur :**
- 🔴 DANGER CRITIQUE : La Cage-Éclair triple hit (42 dégâts) est déjà dévastatrice. Avec Maîtrise (Force +6), elle passe à 60+ dégâts.
- Tuer Électhor AVANT qu'il joue Maîtrise une deuxième fois est absolument critique.
- La Paralysie sur 3 hits = risque de perdre de l'énergie au tour suivant avec une probabilité élevée.
- Les cartes anti-Paralysie sont particulièrement précieuses ici.

**Récompenses :** 40–65 Or + Relique légendaire (pool Acte 3).

---

#### 🔥 Sulfura — 190 PV (Élite Acte 3)

**Type** : Feu/Vol  
**Rôle** : Élite de dégâts persistants. La Brûlure Intense est plus sévère que la Brûlure normale. Sa Danse du Feu combine soin et buff offensif.

**Pattern (cycle de 4 tours) :**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Lance-Flammes** | 22 dégâts + applique **Brûlure Intense** au joueur | 🔥 Attaque + Brûlure forte |
| 2 | **Feu Sacré** | 28 dégâts + applique **Brûlure Intense** au joueur | 🔥 Attaque très forte + Brûlure forte |
| 3 | **Danse du Feu** | 0 dégâts + Sulfura se soigne **20 PV** + gagne **+4 Force** | 💃🔥 Soin + Buff — ⚠️ SIGNALÉ |
| 4 | **Lance-Flammes** | 22+Force dégâts + **Brûlure Intense** | 🔥 Attaque renforcée + Brûlure |
| (retour tour 1) | — | — | — |

**Mécaniques spéciales :**
- **Brûlure Intense** : Variante plus sévère de la Brûlure. Inflige **3 PV de dégâts par tour** (vs 1–2 pour la Brûlure normale). Se cumule avec les Brûlures précédentes.
- **Danse du Feu** : ⚠️ SIGNALÉ au tour 2. Sulfura se soigne de 20 PV ET gagne +4 Force permanente. Après 2 cycles, sa Force = +8 sur toutes les attaques.

**Stratégie joueur :**
- 🔴 DANGER : Lance-Flammes (22) + Feu Sacré (28) = 50 dégâts en 2 tours + Brûlure Intense cumulée.
- La Brûlure Intense s'accumule : après 2 cycles sans soin, le joueur perd 6+ PV par tour en passif.
- Tuer Sulfura avant la 2e Danse du Feu. Avec +8 Force, son Lance-Flammes inflige 30 dégâts.
- ⚠️ SIGNALÉ : Infliger max de dégâts au tour 2 (Feu Sacré) pour réduire l'efficacité du soin de Danse du Feu.
- Avoir des cartes ou potions de soin de la Brûlure est critique.

**Récompenses :** 40–65 Or + Relique légendaire (pool Acte 3).

---

### 5.3 Boss Final — Mewtwo

#### 🔮 Mewtwo — 420 PV (Boss Final)

**Type** : Psy  
**Rôle** : Boss ultime en 3 phases. Chaque phase introduit une nouvelle mécanique qui redéfinit la stratégie. La Phase 3 est une course contre la mort.

**Vue d'ensemble :**
Mewtwo est le test ultime du deck du joueur. Ses 3 phases exigent des réponses différentes : défense en Phase 1, attaque en Phase 2, survie pure en Phase 3. L'Aura permanente de la Phase 3 (+8 dégâts sur tout) rend chaque coup potentiellement fatal.

---

**PHASE 1 — "L'Observation" (420 → 280 PV)**

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Psyko** | 26 dégâts | 💥 Attaque Psy |
| 2 | **Frappe Éclair** | 16 dégâts × **2 hits** (32 total) | ⚡ Attaque double |
| 3 | **Télékinésie** | 0 dégâts + ajoute **2 cartes Malédiction** dans le deck du joueur | 🔮 Malédiction — ⚠️ SIGNALÉ |
| 4 | **Bouclier Psy** | 0 dégâts + gagne **28 Bloc** + **reflète 8 dégâts** sur le prochain coup reçu | 🛡️ Défense + Réflexion — ⚠️ SIGNALÉ |
| (retour tour 1) | — | — | — |

**Mécaniques spéciales — Phase 1 :**
- **Télékinésie (Malédictions)** : Mewtwo insère 2 cartes **Malédiction** dans le deck du joueur. Les Malédictions n'ont aucun effet utile et occupent une place en main, obligeant à les défausser ou les jouer "à vide" pour 0 effet.
- **Bouclier Psy (Réflexion)** : Si le joueur attaque Mewtwo pendant son Bouclier, Mewtwo renvoie 8 dégâts fixes sur le joueur. Attaquer avec des attaques à Bloc n'est pas concerné.

---

**PHASE 2 — "La Domination" (280 → 100 PV)**

*Transition : Mewtwo flotte plus haut, ses yeux brillent. Animation de mise en garde. Son pattern change immédiatement.*

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Puissance Psy** | 34 dégâts | 💥 Attaque Psy massive |
| 2 | **Amnésie** | 0 dégâts + **retire définitivement 2 cartes aléatoires du deck du joueur pour ce combat** | 🗑️ SUPPRESSION — ⚠️ SIGNALÉ MAJEUR |
| 3 | **Barrière** | 0 dégâts + gagne **40 Bloc** | 🛡️ Défense extrême |
| 4 | **Mégapsycho** | 26 dégâts + le joueur **défausse 2 cartes de sa main** | 💥 Attaque + Défausse |
| (retour tour 1) | — | — | — |

**Mécaniques spéciales — Phase 2 :**
- **Amnésie (Suppression)** : 🔴 Mécanique la plus menaçante de Phase 2. Mewtwo "efface" 2 cartes du deck du joueur **pour la durée de ce combat uniquement** (elles sont récupérées après). Les cartes sont choisies aléatoirement parmi le deck total. ⚠️ SIGNALÉ avec une icône de suppression violette très visible.
- **Barrière** : 40 Bloc est quasi-imprenable sans cartes perçantes. Le joueur doit soit attaquer suffisamment fort pour le traverser, soit attendre son expiration.

---

**PHASE 3 — "La Fureur Absolue" (< 100 PV)**

*Transition : Mewtwo hurle. L'écran tremble. **AURA PERMANENTE ACTIVÉE** : tous les dégâts de Mewtwo sont augmentés de **+8** pour le reste du combat.*

| Tour | Action | Effets | Icône d'intention |
|------|--------|--------|------------------|
| 1 | **Puissance-Z** | 44+8 = **52 dégâts** (avec Aura) | 🔴 ATTAQUE FATALE |
| 2 | **Barrage Psy** | 18+8 = **26 dégâts** × 3 hits (**78 total** avec Aura) | 💥 Triple attaque dévastatrice |
| 3 | **Cri Mortel** | 0 dégâts + applique **Vulnérabilité ×3** ET **Faiblesse ×3** au joueur | 💀 DÉBUFF DOUBLE MAXIMAL — ⚠️ SIGNALÉ |
| (retour tour 1) | — | — | — |

**Mécaniques spéciales — Phase 3 :**
- **Aura Permanente (+8 dégâts)** : Toutes les valeurs de dégâts affichées dans cette phase incluent déjà les +8 de l'Aura dans les descriptions ci-dessus.
- **Cri Mortel** : ⚠️ SIGNALÉ. 3 Vulnérabilité ET 3 Faiblesse simultanément. Le tour suivant, les attaques de Mewtwo infligent des dégâts amplifiés par la Vulnérabilité, et les attaques du joueur sont réduites par la Faiblesse. Combinaison brutale.

---

**Stratégie globale — Mewtwo :**

**Phase 1 :**
- Gérer les Malédictions proactivement. Avoir des cartes qui permettent d'épurer le deck ou de défausser des Malédictions.
- Le Bouclier Psy (28 Bloc + réflexion) : soit ne pas attaquer ce tour, soit ignorer les 8 dégâts de réflexion si les dégâts infligés valent le coût.
- Objectif : passer à la Phase 2 rapidement avant l'accumulation de Malédictions.

**Phase 2 :**
- ⚠️ SIGNALÉ Amnésie : Avant ce tour, jouer toutes les cartes clés de la main. Les cartes en main ne peuvent pas être supprimées — seulement les cartes dans le deck/défausse.
- La Barrière (40 Bloc) est le moment pour les cartes de préparation, buffs ou soins.
- Objectif : infliger 180 dégâts (280 → 100 PV) le plus vite possible.

**Phase 3 :**
- 🔴 DANGER MAXIMAL : L'Aura rend tout potentiellement fatal.
- Puissance-Z (52 dégâts) one-shot avec peu de PV. Toujours avoir 52+ de Bloc disponible.
- Barrage Psy (78 dégâts en 3 hits) avec Vulnérabilité active = plus de 90 dégâts effectifs.
- Le Cri Mortel est la mécanique la plus dangereuse de tout le jeu. Tuer Mewtwo AVANT qu'il résolve le cycle Cri Mortel → Puissance-Z.
- Recommandation : entrer en Phase 3 avec un maximum de PV et de potions.

**Récompenses Finales :**
- **FIN DE PARTIE** — Écran de victoire
- **Statistiques du run** (cartes jouées, dégâts infligés, PV restants, tours utilisés)
- **Or maximum** du run affiché
- Déblocage d'éventuels contenus bonus (runs ultérieurs, difficultés supérieures)

---

## 6. Tableaux de Synthèse Équilibrage

### 6.1 Comparaison PV par acte

| Acte | Ennemi Normal (min) | Ennemi Normal (max) | Élite (min) | Élite (max) | Boss |
|------|---------------------|---------------------|-------------|-------------|------|
| 1    | 22 (Roucool)        | 44 (Racaillou)      | 105 (Arcanin)| 110 (Nidoking)| 240 (Ronflex) |
| 2    | 38 (Fantominus)     | 65 (Hypno)          | 130 (Ectoplasma)| 155 (Léviator)| 310 (Dracolosse) |
| 3    | 78 (Électabuzz)     | 98 (Steelix)        | 185 (Artikodin)| 195 (Électhor)| 420 (Mewtwo) |

### 6.2 Comparaison dégâts par acte

| Acte | Min dégâts/action | Max dégâts/action | Dégâts burst max (1 tour) | Statuts principaux |
|------|-------------------|-------------------|---------------------------|--------------------|
| 1    | 4 (Chenipan)      | 12 (Corne Venimeuse)| 28 (Hyper-Faisceau Ronflex)| Poison, Faiblesse |
| 2    | 8 (Smog)          | 22 (Cascade)      | 34 (Hyper Faisceau Dracolosse)| Sommeil, Paralysie, Défausse |
| 3    | 14 (Poing de Feu) | 28 (Feu Sacré)    | 52 (Puissance-Z Mewtwo)  | Gel, Brûlure, Vulnérabilité, Suppression |

### 6.3 Récapitulatif complet de tous les ennemis

| # | Nom | Acte | Type | PV | Dégâts max/action | Statuts appliqués | Spéciale |
|---|-----|------|------|----|-------------------|-------------------|---------|
| 1 | Rattata | 1 (Normal) | Normal | 28 | 9 | — | Aucune |
| 2 | Roucool | 1 (Normal) | Normal/Vol | 22 | 9 | Faiblesse | Aucune |
| 3 | Chenipan | 1 (Normal) | Insecte | 30 | 4 | Faiblesse | Bloc généré |
| 4 | Aspicot | 1 (Normal) | Insecte/Poison | 28 | 6 | Poison | Aucune |
| 5 | Racaillou | 1 (Normal) | Roche/Sol | 44 | 9 | — | Bloc périodique |
| 6 | Mystherbe | 1 (Normal) | Plante/Poison | 34 | 6 | Poison, Faiblesse | Stall |
| 7 | Nidoking | 1 (Élite) | Poison/Sol | 110 | 13 | Poison, Vulnérabilité | Régal du Poison |
| 8 | Arcanin | 1 (Élite) | Feu | 105 | 19+ | Brûlure, Faiblesse | Escalade de Force |
| 9 | Ronflex | 1 (Boss) | Normal | 240 | 28 | — | Soin, 2 phases |
| 10 | Fantominus | 2 (Normal) | Spectre/Poison | 38 | 14 | Sommeil | Immunité Normale, Vol de vie |
| 11 | Magnéti | 2 (Normal) | Électrik/Acier | 50 | 14 | Paralysie | Bloc métallique |
| 12 | Osselait | 2 (Normal) | Sol | 55 | 17 | — | Critique garanti |
| 13 | Koffing | 2 (Normal) | Poison | 52 | 8 | Poison | ON DEATH Explosion |
| 14 | Hypno | 2 (Normal) | Psy | 65 | 14 | Sommeil, Faiblesse | Sommeil long |
| 15 | Voltorbe | 2 (Normal) | Électrik | 48 | 10 | Paralysie | Explosion seuil PV |
| 16 | Ectoplasma | 2 (Élite) | Spectre/Poison | 130 | 22 | Défausse | Immunité Normale |
| 17 | Léviator | 2 (Élite) | Eau/Vol | 155 | 24 | Vulnérabilité | Colère (scaling) |
| 18 | Alakazam | 2 (Élite) | Psy | 140 | 24 | Défausse, Drain énergie | Clairvoyance |
| 19 | Dracolosse | 2 (Boss) | Dragon/Vol | 310 | 50 | Vulnérabilité | Escalade Force, Danse Ultime |
| 20 | Machamp | 3 (Normal) | Combat | 82 | 24 | Vulnérabilité, Faiblesse | Double hit |
| 21 | Steelix | 3 (Normal) | Acier/Sol | 98 | 22 | Vulnérabilité | Bloc double massif |
| 22 | Tauros | 3 (Normal) | Normal | 84 | 24 | Faiblesse | Coup chargé |
| 23 | Électabuzz | 3 (Normal) | Électrik | 78 | 28 | Paralysie | Soin mi-combat |
| 24 | Lokhlass | 3 (Normal) | Eau/Normal | 88 | 18 | Sommeil, Gel | Combo contrôle |
| 25 | Artikodin | 3 (Élite) | Glace/Vol | 185 | 24 | Gel | Aura de Grêle |
| 26 | Électhor | 3 (Élite) | Électrik/Vol | 195 | 60+ | Paralysie | Triple hit, Maîtrise |
| 27 | Sulfura | 3 (Élite) | Feu/Vol | 190 | 28 | Brûlure Intense | Soin + Buff |
| 28 | Mewtwo | 3 (Boss Final) | Psy | 420 | 78 | Malédiction, Suppression, Vulnérabilité | 3 phases, Aura |

### 6.4 Matrice de couverture des statuts

| Statut | Acte 1 | Acte 2 | Acte 3 |
|--------|--------|--------|--------|
| Poison | ⭐⭐⭐ (Aspicot, Mystherbe, Nidoking, Koffing) | ⭐⭐ (Ectoplasma) | — |
| Faiblesse | ⭐⭐ (Roucool, Chenipan, Mystherbe) | ⭐ (Hypno) | ⭐⭐ (Machamp, Tauros, Mewtwo) |
| Brûlure | ⭐ (Arcanin) | — | ⭐⭐ (Sulfura) |
| Paralysie | — | ⭐⭐⭐ (Magnéti, Voltorbe, Électhor) | ⭐⭐ (Électabuzz, Électhor) |
| Sommeil | — | ⭐⭐ (Fantominus, Hypno) | ⭐⭐ (Lokhlass) |
| Vulnérabilité | ⭐ (Nidoking) | ⭐⭐ (Léviator, Alakazam) | ⭐⭐⭐ (Machamp, Steelix, Mewtwo) |
| Gel | — | — | ⭐⭐ (Artikodin, Lokhlass) |
| Défausse | — | ⭐⭐⭐ (Ectoplasma, Alakazam, Dracolosse) | ⭐⭐ (Mewtwo) |
| Malédiction | — | — | ⭐ (Mewtwo Phase 1) |
| Suppression deck | — | — | ⭐ (Mewtwo Phase 2) |

---

## 7. Glossaire des Statuts

### Statuts négatifs (appliqués au joueur)

| Statut | Effet | Durée | Soignable |
|--------|-------|-------|-----------|
| **Poison** | Perd X PV à la fin de chaque tour (X = stacks) | Jusqu'à soin ou fin de combat | Oui (potion, certaines cartes) |
| **Brûlure** | Perd 1–2 PV à la fin de chaque tour | Jusqu'à soin | Oui |
| **Brûlure Intense** | Perd 3 PV à la fin de chaque tour | Jusqu'à soin | Oui |
| **Paralysie** | 25% de chance de perdre 1 énergie au début du tour | X tours | Oui |
| **Faiblesse** | Réduit les dégâts des attaques du joueur de 5% par stack | X tours ou X stacks | Oui |
| **Vulnérabilité** | Le joueur reçoit 25% de dégâts supplémentaires par stack | X tours | Oui |
| **Sommeil** | Le joueur ne peut pas jouer de cartes pendant X tours | X tours | Potion uniquement |
| **Gel** | Le joueur ne peut pas jouer de cartes d'attaque pendant X tours | X tours | Potion uniquement |
| **Malédiction** | Carte inutile dans le deck, ne sert à rien | Permanent (ce run) | Boutique (retrait) |

### Statuts positifs (appliqués aux ennemis sur eux-mêmes)

| Statut | Effet |
|--------|-------|
| **Bloc** | Absorbe les prochains dégâts reçus. Disparaît au début du tour suivant de l'ennemi. |
| **Force** | Augmente les dégâts de toutes les attaques. Permanent pour ce combat. |
| **Fureur** | Variante de Force spécifique à Dracolosse. Mêmes effets. |
| **Aura** | Bonus de dégâts permanent actif (Mewtwo Phase 3). |

### Mécaniques spéciales

| Mécanique | Description |
|-----------|-------------|
| **⚠️ SIGNALÉ** | L'action est annoncée 1 tour à l'avance avec une icône d'intention visible. Le joueur peut se préparer. |
| **ON DEATH** | L'effet se déclenche à la mort de l'ennemi, pas pendant son tour. |
| **IMMUNITÉ** | Aucun dégât d'un certain type ne peut être infligé à cet ennemi. |
| **COMPTE À REBOURS** | L'ennemi annonce une action dévastatrice dans N tours. Affichée en icône numérotée. |
| **Escalade** | Les dégâts ou Force de l'ennemi augmentent chaque cycle. Indicateur visible en jeu. |
| **Réflexion** | Les dégâts reçus pendant cet état sont renvoyés partiellement sur l'attaquant. |

---

*Document de conception v1.0 — Équipe de développement Spire Crawler*  
*Dernière mise à jour : Acte 1–3 complets avec 28 ennemis, élites et boss.*
