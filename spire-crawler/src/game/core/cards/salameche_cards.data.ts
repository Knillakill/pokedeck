import { CardDefinition } from './CardDefinition';
import { CardType, CardRarity, CardTarget, CardEffectType, StatusEffectId } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Deck de Départ (STARTER — 4 archétypes)
// ─────────────────────────────────────────────────────────────────────────────

const griffe = new CardDefinition({
    id: 'salameche_griffe',
    name: 'Griffe',
    type: CardType.ATTACK,
    rarity: CardRarity.STARTER,
    cost: 1,
    description: 'Inflige 6 dégâts.',
    upgradedDescription: 'Inflige 9 dégâts.',
    effects: [{ type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 6 }],
    upgradedEffects: [{ type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 9 }],
});

const esquive = new CardDefinition({
    id: 'salameche_esquive',
    name: 'Esquive',
    type: CardType.SKILL,
    rarity: CardRarity.STARTER,
    cost: 1,
    description: 'Gagne 5 Bloc.',
    upgradedDescription: 'Gagne 8 Bloc.',
    effects: [{ type: CardEffectType.GAIN_BLOCK, target: CardTarget.SELF, value: 5 }],
    upgradedEffects: [{ type: CardEffectType.GAIN_BLOCK, target: CardTarget.SELF, value: 8 }],
});

const feufollet = new CardDefinition({
    id: 'salameche_feufollet',
    name: 'Feu Follet',
    type: CardType.SKILL,
    rarity: CardRarity.STARTER,
    cost: 1,
    description: 'Applique 2 stacks de Poison (Brûlure).',
    upgradedDescription: 'Applique 3 stacks de Poison (Brûlure).',
    effects: [{ type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 2 }],
    upgradedEffects: [{ type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 3 }],
});

const rugissement = new CardDefinition({
    id: 'salameche_rugissement',
    name: 'Rugissement',
    type: CardType.SKILL,
    rarity: CardRarity.STARTER,
    cost: 1,
    description: "Applique Faiblesse à l'ennemi (2 stacks).",
    upgradedDescription: "Applique Faiblesse à l'ennemi (3 stacks).",
    effects: [{ type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.WEAK, statusStacks: 2 }],
    upgradedEffects: [{ type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.WEAK, statusStacks: 3 }],
});

// ─────────────────────────────────────────────────────────────────────────────
// Communes — Archétype Brûlure
// ─────────────────────────────────────────────────────────────────────────────

const braise = new CardDefinition({
    id: 'salameche_braise',
    name: 'Braise',
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    cost: 1,
    description: 'Inflige 6 dégâts. Applique 1 Poison (Brûlure).',
    upgradedDescription: 'Inflige 8 dégâts. Applique 2 Poison (Brûlure).',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 6 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 1 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 8 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 2 },
    ],
});

// Note: feufollet est aussi dans le deck starter, il est déclaré en haut
// Voici la version commune (plus puissante) :
const feufolletCommun = new CardDefinition({
    id: 'salameche_feufollet_c',
    name: 'Feu Follet+',
    type: CardType.SKILL,
    rarity: CardRarity.COMMON,
    cost: 1,
    description: 'Applique 3 stacks de Poison (Brûlure).',
    upgradedDescription: 'Applique 4 stacks de Poison (Brûlure).',
    effects: [{ type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 3 }],
    upgradedEffects: [{ type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 4 }],
});

const coupdefeu = new CardDefinition({
    id: 'salameche_coupdefeu',
    name: 'Coup de Feu',
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    cost: 1,
    description: 'Inflige 9 dégâts.',
    upgradedDescription: 'Inflige 11 dégâts.',
    effects: [{ type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 9 }],
    upgradedEffects: [{ type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 11 }],
});

const brouillard = new CardDefinition({
    id: 'salameche_brouillard',
    name: 'Fumée',
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    cost: 1,
    description: 'Inflige 5 dégâts. Applique Faiblesse à l\'ennemi.',
    upgradedDescription: 'Inflige 6 dégâts. Applique 2 Faiblesse à l\'ennemi.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 5 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.WEAK, statusStacks: 1 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 6 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.WEAK, statusStacks: 2 },
    ],
});

const nitrocharge = new CardDefinition({
    id: 'salameche_nitrocharge',
    name: 'Nitrocharge',
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    cost: 1,
    description: 'Inflige 7 dégâts. Gagne 1 Force.',
    upgradedDescription: 'Inflige 9 dégâts. Gagne 2 Force.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 7 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 1 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 9 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 2 },
    ],
});

// ─────────────────────────────────────────────────────────────────────────────
// Communes — Archétype Fureur / Contrôle
// ─────────────────────────────────────────────────────────────────────────────

const grosyeux = new CardDefinition({
    id: 'salameche_grosyeux',
    name: "Groz'Yeux",
    type: CardType.SKILL,
    rarity: CardRarity.COMMON,
    cost: 1,
    description: "Applique 2 Vulnérabilité à l'ennemi (+50% dégâts reçus).",
    upgradedDescription: "Applique 3 Vulnérabilité à l'ennemi.",
    effects: [{ type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.VULNERABLE, statusStacks: 2 }],
    upgradedEffects: [{ type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.VULNERABLE, statusStacks: 3 }],
});

const grimace = new CardDefinition({
    id: 'salameche_grimace',
    name: 'Peur Panique',
    type: CardType.SKILL,
    rarity: CardRarity.COMMON,
    cost: 1,
    description: "Endort l'ennemi (saute son prochain tour).",
    upgradedDescription: "Endort l'ennemi (saute son prochain tour). Pioche 1 carte.",
    effects: [{ type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.SLEEP, statusStacks: 1 }],
    upgradedEffects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.SLEEP, statusStacks: 1 },
        { type: CardEffectType.DRAW_CARDS, value: 1 },
    ],
});

const griffeacier = new CardDefinition({
    id: 'salameche_griffeacier',
    name: 'Griffe de Fer',
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    cost: 1,
    description: 'Inflige 7 dégâts. Gagne 1 Force.',
    upgradedDescription: 'Inflige 9 dégâts. Gagne 2 Force.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 7 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 1 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 9 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 2 },
    ],
});

const morsure = new CardDefinition({
    id: 'salameche_morsure',
    name: 'Morsure',
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    cost: 1,
    description: "Inflige 7 dégâts. Applique Faiblesse à l'ennemi.",
    upgradedDescription: "Inflige 9 dégâts. Applique 2 Faiblesse à l'ennemi.",
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 7 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.WEAK, statusStacks: 1 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 9 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.WEAK, statusStacks: 2 },
    ],
});

// ─────────────────────────────────────────────────────────────────────────────
// Communes — Archétype Critique
// ─────────────────────────────────────────────────────────────────────────────

const tranche = new CardDefinition({
    id: 'salameche_tranche',
    name: 'Tranche',
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    cost: 1,
    description: 'Inflige 10 dégâts.',
    upgradedDescription: 'Inflige 13 dégâts.',
    effects: [{ type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 10 }],
    upgradedEffects: [{ type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 13 }],
});

const coupgriffe = new CardDefinition({
    id: 'salameche_coupgriffe',
    name: 'Coup de Griffe',
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    cost: 1,
    description: 'Inflige 8 dégâts. Pioche 1 carte.',
    upgradedDescription: 'Inflige 10 dégâts. Pioche 1 carte.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 8 },
        { type: CardEffectType.DRAW_CARDS, value: 1 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 10 },
        { type: CardEffectType.DRAW_CARDS, value: 1 },
    ],
});

const taillad = new CardDefinition({
    id: 'salameche_taillad',
    name: 'Taillade',
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    cost: 1,
    description: 'Inflige 8 dégâts. Gagne 1 Force.',
    upgradedDescription: 'Inflige 9 dégâts. Gagne 2 Force.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 8 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 1 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 9 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 2 },
    ],
});

const danselame = new CardDefinition({
    id: 'salameche_danselame',
    name: 'Danse-Lames',
    type: CardType.POWER,
    rarity: CardRarity.COMMON,
    cost: 1,
    description: 'Gagne 2 Force permanente.',
    upgradedDescription: 'Gagne 3 Force permanente.',
    effects: [{ type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 2 }],
    upgradedEffects: [{ type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 3 }],
});

// ─────────────────────────────────────────────────────────────────────────────
// Communes — Archétype Dragon
// ─────────────────────────────────────────────────────────────────────────────

const rugissementdragon = new CardDefinition({
    id: 'salameche_rugissementdragon',
    name: 'Rugissement du Dragon',
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    cost: 2,
    description: 'Inflige 13 dégâts.',
    upgradedDescription: 'Inflige 16 dégâts.',
    effects: [{ type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 13 }],
    upgradedEffects: [{ type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 16 }],
});

const griffedragon = new CardDefinition({
    id: 'salameche_griffedragon',
    name: 'Griffe Dragon',
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    cost: 2,
    description: 'Inflige 14 dégâts.',
    upgradedDescription: 'Inflige 16 dégâts. Pioche 1 carte.',
    effects: [{ type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 14 }],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 16 },
        { type: CardEffectType.DRAW_CARDS, value: 1 },
    ],
});

// ─────────────────────────────────────────────────────────────────────────────
// Communes — Défense / Sustain
// ─────────────────────────────────────────────────────────────────────────────

const recuperation = new CardDefinition({
    id: 'salameche_recuperation',
    name: 'Récupération',
    type: CardType.SKILL,
    rarity: CardRarity.COMMON,
    cost: 1,
    description: 'Récupère 7 PV.',
    upgradedDescription: 'Récupère 10 PV.',
    effects: [{ type: CardEffectType.HEAL, value: 7 }],
    upgradedEffects: [{ type: CardEffectType.HEAL, value: 10 }],
});

const viveattaque = new CardDefinition({
    id: 'salameche_viveattaque',
    name: 'Vive-Attaque',
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    cost: 0,
    description: 'Inflige 5 dégâts.',
    upgradedDescription: 'Inflige 7 dégâts.',
    effects: [{ type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 5 }],
    upgradedEffects: [{ type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 7 }],
});

// ─────────────────────────────────────────────────────────────────────────────
// Peu Communes — Archétype Brûlure
// ─────────────────────────────────────────────────────────────────────────────

const lanceflamme = new CardDefinition({
    id: 'salameche_lanceflamme',
    name: 'Lance-Flammes',
    type: CardType.ATTACK,
    rarity: CardRarity.UNCOMMON,
    cost: 2,
    description: 'Inflige 16 dégâts. Applique 2 Poison (Brûlure).',
    upgradedDescription: 'Inflige 20 dégâts. Applique 3 Poison (Brûlure).',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 16 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 2 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 20 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 3 },
    ],
});

const intensification = new CardDefinition({
    id: 'salameche_intensification',
    name: 'Intensification',
    type: CardType.SKILL,
    rarity: CardRarity.UNCOMMON,
    cost: 1,
    description: 'Applique 3 Poison (Brûlure Intense) à l\'ennemi. Gagne 1 Force.',
    upgradedDescription: 'Applique 4 Poison. Gagne 2 Force. Inflige 8 dégâts.',
    effects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 3 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 1 },
    ],
    upgradedEffects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 4 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 2 },
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 8 },
    ],
});

const jetdeflamme = new CardDefinition({
    id: 'salameche_jetdeflamme',
    name: 'Jet de Flamme',
    type: CardType.SKILL,
    rarity: CardRarity.UNCOMMON,
    cost: 1,
    description: 'Applique 4 Poison (flammes persistantes). Gagne 4 Bloc.',
    upgradedDescription: 'Applique 5 Poison. Gagne 6 Bloc.',
    effects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 4 },
        { type: CardEffectType.GAIN_BLOCK, target: CardTarget.SELF, value: 4 },
    ],
    upgradedEffects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 5 },
        { type: CardEffectType.GAIN_BLOCK, target: CardTarget.SELF, value: 6 },
    ],
});

const flammeche = new CardDefinition({
    id: 'salameche_flammeche',
    name: 'Flammèche',
    type: CardType.ATTACK,
    rarity: CardRarity.UNCOMMON,
    cost: 2,
    description: 'Inflige 20 dégâts. Gagne 2 Force (adrénaline du recul).',
    upgradedDescription: 'Inflige 24 dégâts. Gagne 3 Force.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 20 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 2 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 24 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 3 },
    ],
});

const cendre = new CardDefinition({
    id: 'salameche_cendre',
    name: 'Cendres',
    type: CardType.SKILL,
    rarity: CardRarity.UNCOMMON,
    cost: 1,
    description: "Applique 3 Vulnérabilité à l'ennemi. Pioche 1 carte.",
    upgradedDescription: "Applique 4 Vulnérabilité à l'ennemi. Pioche 2 cartes.",
    effects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.VULNERABLE, statusStacks: 3 },
        { type: CardEffectType.DRAW_CARDS, value: 1 },
    ],
    upgradedEffects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.VULNERABLE, statusStacks: 4 },
        { type: CardEffectType.DRAW_CARDS, value: 2 },
    ],
});

// ─────────────────────────────────────────────────────────────────────────────
// Peu Communes — Archétype Fureur
// ─────────────────────────────────────────────────────────────────────────────

const rage = new CardDefinition({
    id: 'salameche_rage',
    name: 'Rage',
    type: CardType.POWER,
    rarity: CardRarity.UNCOMMON,
    cost: 1,
    description: 'Gagne 2 Force permanente. Gain de 1 Épines.',
    upgradedDescription: 'Gagne 3 Force permanente. Gain de 2 Épines.',
    effects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 2 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.THORNS, statusStacks: 1 },
    ],
    upgradedEffects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 3 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.THORNS, statusStacks: 2 },
    ],
});

const explosivite = new CardDefinition({
    id: 'salameche_explosivite',
    name: 'Explosivité',
    type: CardType.ATTACK,
    rarity: CardRarity.UNCOMMON,
    cost: 2,
    description: 'Inflige 22 dégâts. Applique 2 Vulnérabilité à l\'ennemi.',
    upgradedDescription: 'Inflige 26 dégâts. Applique 3 Vulnérabilité à l\'ennemi.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 22 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.VULNERABLE, statusStacks: 2 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 26 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.VULNERABLE, statusStacks: 3 },
    ],
});

const endurence = new CardDefinition({
    id: 'salameche_endurence',
    name: 'Endurance',
    type: CardType.POWER,
    rarity: CardRarity.UNCOMMON,
    cost: 1,
    description: 'Gagne 2 Force et 1 Dextérité permanente.',
    upgradedDescription: 'Gagne 3 Force et 2 Dextérité permanente.',
    effects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 2 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.DEXTERITY, statusStacks: 1 },
    ],
    upgradedEffects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 3 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.DEXTERITY, statusStacks: 2 },
    ],
});

const forcebrute = new CardDefinition({
    id: 'salameche_forcebrute',
    name: 'Force Brute',
    type: CardType.ATTACK,
    rarity: CardRarity.UNCOMMON,
    cost: 2,
    description: 'Inflige 16 dégâts.',
    upgradedDescription: 'Inflige 20 dégâts. Gagne 1 Force.',
    effects: [{ type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 16 }],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 20 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 1 },
    ],
});

// ─────────────────────────────────────────────────────────────────────────────
// Peu Communes — Archétype Critique
// ─────────────────────────────────────────────────────────────────────────────

const chargesauvage = new CardDefinition({
    id: 'salameche_chargesauvage',
    name: 'Charge Sauvage',
    type: CardType.ATTACK,
    rarity: CardRarity.UNCOMMON,
    cost: 1,
    description: 'Inflige 8 dégâts. Récupère 5 PV.',
    upgradedDescription: 'Inflige 9 dégâts. Récupère 8 PV.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 8 },
        { type: CardEffectType.HEAL, value: 5 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 9 },
        { type: CardEffectType.HEAL, value: 8 },
    ],
});

const accuite = new CardDefinition({
    id: 'salameche_accuite',
    name: 'Acuité',
    type: CardType.POWER,
    rarity: CardRarity.UNCOMMON,
    cost: 1,
    description: 'Gagne 2 Force et 1 Dextérité.',
    upgradedDescription: 'Gagne 3 Force et 2 Dextérité.',
    effects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 2 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.DEXTERITY, statusStacks: 1 },
    ],
    upgradedEffects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 3 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.DEXTERITY, statusStacks: 2 },
    ],
});

const entaille = new CardDefinition({
    id: 'salameche_entaille',
    name: 'Entaille',
    type: CardType.ATTACK,
    rarity: CardRarity.UNCOMMON,
    cost: 1,
    description: 'Inflige 6 dégâts. Pioche 1 carte.',
    upgradedDescription: 'Inflige 8 dégâts. Pioche 2 cartes.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 6 },
        { type: CardEffectType.DRAW_CARDS, value: 1 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 8 },
        { type: CardEffectType.DRAW_CARDS, value: 2 },
    ],
});

const contreattaque = new CardDefinition({
    id: 'salameche_contreattaque',
    name: 'Contre-Attaque',
    type: CardType.ATTACK,
    rarity: CardRarity.UNCOMMON,
    cost: 1,
    description: 'Inflige 9 dégâts. Applique 1 Vulnérabilité à l\'ennemi.',
    upgradedDescription: 'Inflige 11 dégâts. Applique 2 Vulnérabilité à l\'ennemi.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 9 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.VULNERABLE, statusStacks: 1 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 11 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.VULNERABLE, statusStacks: 2 },
    ],
});

const tranchecroiser = new CardDefinition({
    id: 'salameche_tranchecroiser',
    name: 'Tranche Croisée',
    type: CardType.ATTACK,
    rarity: CardRarity.UNCOMMON,
    cost: 2,
    description: 'Inflige 18 dégâts.',
    upgradedDescription: 'Inflige 20 dégâts. Gagne 1 Force.',
    effects: [{ type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 18 }],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 20 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 1 },
    ],
});

// ─────────────────────────────────────────────────────────────────────────────
// Peu Communes — Archétype Dragon
// ─────────────────────────────────────────────────────────────────────────────

const dracogriffe = new CardDefinition({
    id: 'salameche_dracogriffe',
    name: 'Dracogriffe',
    type: CardType.ATTACK,
    rarity: CardRarity.UNCOMMON,
    cost: 2,
    description: 'Inflige 20 dégâts. Applique 2 Vulnérabilité.',
    upgradedDescription: 'Inflige 22 dégâts. Applique 3 Vulnérabilité.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 20 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.VULNERABLE, statusStacks: 2 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 22 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.VULNERABLE, statusStacks: 3 },
    ],
});

const souffledragon = new CardDefinition({
    id: 'salameche_souffledragon',
    name: 'Souffle Dragon',
    type: CardType.ATTACK,
    rarity: CardRarity.UNCOMMON,
    cost: 2,
    description: "Inflige 13 dégâts. Endort l'ennemi.",
    upgradedDescription: "Inflige 15 dégâts. Endort l'ennemi. Pioche 1 carte.",
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 13 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.SLEEP, statusStacks: 1 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 15 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.SLEEP, statusStacks: 1 },
        { type: CardEffectType.DRAW_CARDS, value: 1 },
    ],
});

const dansedragon = new CardDefinition({
    id: 'salameche_dansedragon',
    name: 'Danse du Dragon',
    type: CardType.POWER,
    rarity: CardRarity.UNCOMMON,
    cost: 1,
    description: 'Gagne 2 Force et 2 Dextérité permanente.',
    upgradedDescription: 'Gagne 3 Force et 3 Dextérité permanente.',
    effects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 2 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.DEXTERITY, statusStacks: 2 },
    ],
    upgradedEffects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 3 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.DEXTERITY, statusStacks: 3 },
    ],
});

const dentdragon = new CardDefinition({
    id: 'salameche_dentdragon',
    name: 'Dents de Dragon',
    type: CardType.SKILL,
    rarity: CardRarity.UNCOMMON,
    cost: 1,
    description: 'Pioche 2 cartes.',
    upgradedDescription: 'Pioche 3 cartes.',
    effects: [{ type: CardEffectType.DRAW_CARDS, value: 2 }],
    upgradedEffects: [{ type: CardEffectType.DRAW_CARDS, value: 3 }],
});

// ─────────────────────────────────────────────────────────────────────────────
// Rares — Archétype Brûlure
// ─────────────────────────────────────────────────────────────────────────────

const deflagration = new CardDefinition({
    id: 'salameche_deflagration',
    name: 'Déflagration',
    type: CardType.ATTACK,
    rarity: CardRarity.RARE,
    cost: 3,
    description: 'Inflige 28 dégâts. Applique 3 Poison (Brûlure intense).',
    upgradedDescription: 'Inflige 20 dégâts. Applique 4 Poison.',
    upgradedCost: 2,
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 28 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 3 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 20 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 4 },
    ],
});

const pyrobomb = new CardDefinition({
    id: 'salameche_pyrobomb',
    name: 'Pyrobombe',
    type: CardType.ATTACK,
    rarity: CardRarity.RARE,
    cost: 3,
    description: 'Inflige 28 dégâts. Applique 4 Poison. Applique 3 Vulnérabilité.',
    upgradedDescription: 'Inflige 28 dégâts. Applique 6 Poison. Applique 4 Vulnérabilité.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 28 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 4 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.VULNERABLE, statusStacks: 3 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 28 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 6 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.VULNERABLE, statusStacks: 4 },
    ],
});

const chaleurinfernal = new CardDefinition({
    id: 'salameche_chaleurinfernal',
    name: 'Chaleur Infernale',
    type: CardType.ATTACK,
    rarity: CardRarity.RARE,
    cost: 2,
    description: 'Inflige 20 dégâts. Récupère 8 PV.',
    upgradedDescription: 'Inflige 24 dégâts. Récupère 12 PV.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 20 },
        { type: CardEffectType.HEAL, value: 8 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 24 },
        { type: CardEffectType.HEAL, value: 12 },
    ],
});

const dechainer = new CardDefinition({
    id: 'salameche_dechainer',
    name: 'Déchaîné',
    type: CardType.POWER,
    rarity: CardRarity.RARE,
    cost: 1,
    description: 'Gagne 3 Force et 2 Épines permanentes. (Brasier : plus blessé = plus dangereux)',
    upgradedDescription: 'Gagne 4 Force et 3 Épines permanentes.',
    effects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 3 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.THORNS, statusStacks: 2 },
    ],
    upgradedEffects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 4 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.THORNS, statusStacks: 3 },
    ],
});

// ─────────────────────────────────────────────────────────────────────────────
// Rares — Archétype Fureur
// ─────────────────────────────────────────────────────────────────────────────

const ultimfureur = new CardDefinition({
    id: 'salameche_ultimfureur',
    name: 'Ultime Fureur',
    type: CardType.ATTACK,
    rarity: CardRarity.RARE,
    cost: 2,
    description: 'Inflige 30 dégâts. Gagne 2 Force.',
    upgradedDescription: 'Inflige 36 dégâts. Gagne 3 Force.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 30 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 2 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 36 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 3 },
    ],
});

const avatarefeu = new CardDefinition({
    id: 'salameche_avatarefeu',
    name: 'Avatar du Feu',
    type: CardType.POWER,
    rarity: CardRarity.RARE,
    cost: 2,
    description: 'Gagne 4 Force et 2 Métallisation permanentes.',
    upgradedDescription: 'Gagne 5 Force et 3 Métallisation permanentes.',
    effects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 4 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.METALLICIZE, statusStacks: 2 },
    ],
    upgradedEffects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 5 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.METALLICIZE, statusStacks: 3 },
    ],
});

const resistance = new CardDefinition({
    id: 'salameche_resistance',
    name: 'Résistance',
    type: CardType.POWER,
    rarity: CardRarity.RARE,
    cost: 1,
    description: 'Gagne 3 Métallisation et 2 Force permanentes.',
    upgradedDescription: 'Gagne 4 Métallisation et 3 Force permanentes.',
    effects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.METALLICIZE, statusStacks: 3 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 2 },
    ],
    upgradedEffects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.METALLICIZE, statusStacks: 4 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 3 },
    ],
});

// ─────────────────────────────────────────────────────────────────────────────
// Rares — Archétype Critique
// ─────────────────────────────────────────────────────────────────────────────

const boudefeu = new CardDefinition({
    id: 'salameche_boudefeu',
    name: 'Dracaufeu',
    type: CardType.POWER,
    rarity: CardRarity.RARE,
    cost: 3,
    description: 'Gagne 4 Force, 2 Dextérité et 2 Métallisation permanentes. (Éveil du Dracaufeu)',
    upgradedDescription: 'Gagne 4 Force, 2 Dextérité et 3 Métallisation.',
    upgradedCost: 2,
    effects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 4 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.DEXTERITY, statusStacks: 2 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.METALLICIZE, statusStacks: 2 },
    ],
    upgradedEffects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 4 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.DEXTERITY, statusStacks: 2 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.METALLICIZE, statusStacks: 3 },
    ],
});

const furytotal = new CardDefinition({
    id: 'salameche_furytotal',
    name: 'Furie Totale',
    type: CardType.ATTACK,
    rarity: CardRarity.RARE,
    cost: 1,
    description: 'Inflige 20 dégâts. Gagne 2 Force.',
    upgradedDescription: 'Inflige 24 dégâts. Gagne 3 Force.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 20 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 2 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 24 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 3 },
    ],
});

const lancesoleil = new CardDefinition({
    id: 'salameche_lancesoleil',
    name: 'Blast Burn',
    type: CardType.ATTACK,
    rarity: CardRarity.RARE,
    cost: 2,
    description: 'Inflige 28 dégâts. Applique 3 Poison.',
    upgradedDescription: 'Inflige 32 dégâts. Applique 4 Poison.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 28 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 3 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 32 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 4 },
    ],
});

const combotfatal = new CardDefinition({
    id: 'salameche_combotfatal',
    name: 'Combo Fatal',
    type: CardType.ATTACK,
    rarity: CardRarity.RARE,
    cost: 1,
    description: 'Inflige 24 dégâts. Gagne 3 Force.',
    upgradedDescription: 'Inflige 30 dégâts. Gagne 4 Force.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 24 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 3 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 30 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 4 },
    ],
});

// ─────────────────────────────────────────────────────────────────────────────
// Rares — Archétype Dragon
// ─────────────────────────────────────────────────────────────────────────────

const dracometeore = new CardDefinition({
    id: 'salameche_dracometeore',
    name: 'Draco-Météore',
    type: CardType.ATTACK,
    rarity: CardRarity.RARE,
    cost: 3,
    description: 'Inflige 30 dégâts. Applique 4 Vulnérabilité à l\'ennemi.',
    upgradedDescription: 'Inflige 36 dégâts. Applique 5 Vulnérabilité.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 30 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.VULNERABLE, statusStacks: 4 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 36 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.VULNERABLE, statusStacks: 5 },
    ],
});

const tempetdragon = new CardDefinition({
    id: 'salameche_tempetdragon',
    name: 'Tempête de Dragon',
    type: CardType.POWER,
    rarity: CardRarity.RARE,
    cost: 2,
    description: 'Gagne 4 Force, 3 Dextérité et 2 Épines permanentes.',
    upgradedDescription: 'Gagne 5 Force, 3 Dextérité et 3 Épines.',
    upgradedCost: 1,
    effects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 4 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.DEXTERITY, statusStacks: 3 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.THORNS, statusStacks: 2 },
    ],
    upgradedEffects: [
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.STRENGTH, statusStacks: 5 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.DEXTERITY, statusStacks: 3 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.THORNS, statusStacks: 3 },
    ],
});

const purgatoire = new CardDefinition({
    id: 'salameche_purgatoire',
    name: 'Purgatoire',
    type: CardType.ATTACK,
    rarity: CardRarity.RARE,
    cost: 2,
    description: 'Inflige 10 dégâts. Applique 5 Poison (dégâts permanents).',
    upgradedDescription: 'Inflige 12 dégâts. Applique 7 Poison.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 10 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 5 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 12 },
        { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 7 },
    ],
});

// ─────────────────────────────────────────────────────────────────────────────
// Enregistrement
// ─────────────────────────────────────────────────────────────────────────────

const ALL_SALAMECHE_CARDS = [
    // Starters
    griffe, esquive, feufollet, rugissement,
    // Communes
    braise, feufolletCommun, coupdefeu, brouillard, nitrocharge,
    grosyeux, grimace, griffeacier, morsure,
    tranche, coupgriffe, taillad, danselame,
    rugissementdragon, griffedragon,
    recuperation, viveattaque,
    // Peu Communes
    lanceflamme, intensification, jetdeflamme, flammeche, cendre,
    rage, explosivite, endurence, forcebrute,
    chargesauvage, accuite, entaille, contreattaque, tranchecroiser,
    dracogriffe, souffledragon, dansedragon, dentdragon,
    // Rares
    deflagration, pyrobomb, chaleurinfernal, dechainer,
    ultimfureur, avatarefeu, resistance,
    boudefeu, furytotal, lancesoleil, combotfatal,
    dracometeore, tempetdragon, purgatoire,
];

export function registerSalamecheCards(): void {
    ALL_SALAMECHE_CARDS.forEach(card => CardDefinition.register(card));
}

/** Deck de départ : Griffe×4, Esquive×4, Feu Follet×1, Rugissement×1 */
export const SALAMECHE_STARTER_DECK_IDS = [
    'salameche_griffe',   'salameche_griffe',   'salameche_griffe',   'salameche_griffe',
    'salameche_esquive',  'salameche_esquive',  'salameche_esquive',  'salameche_esquive',
    'salameche_feufollet',
    'salameche_rugissement',
];

/** Toutes les cartes Salamèche (sauf starters) disponibles en récompense */
export const SALAMECHE_CARD_IDS = ALL_SALAMECHE_CARDS
    .filter(c => c.rarity !== 'STARTER')
    .map(c => c.id);

/** Toutes les cartes Salamèche (starters inclus) */
export const SALAMECHE_ALL_CARD_IDS = ALL_SALAMECHE_CARDS.map(c => c.id);
