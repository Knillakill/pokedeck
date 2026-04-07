import { CardDefinition } from './CardDefinition';
import { CardType, CardRarity, CardTarget, CardEffectType, StatusEffectId } from '../types';
import { registerSalamecheCards, SALAMECHE_CARD_IDS } from './salameche_cards.data';
export { SALAMECHE_CARD_IDS };

// ─── 4 Cartes d'Attaque ───────────────────────────────────────────────────────

/** Frappe : attaque de base (ex Strike) */
const vineWhip = new CardDefinition({
    id: 'vine_whip',
    name: 'Frappe',
    type: CardType.ATTACK,
    rarity: CardRarity.STARTER,
    cost: 1,
    description: 'Inflige 6 dégâts.',
    upgradedDescription: 'Inflige 9 dégâts.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 6 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 9 },
    ],
});

/** Tranch'Herbe : frappe tous les ennemis (ex Cleave) */
const razorLeaf = new CardDefinition({
    id: 'razor_leaf',
    name: "Tranch'Herbe",
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    cost: 1,
    description: 'Inflige 4 dégâts à TOUS les ennemis.',
    upgradedDescription: 'Inflige 6 dégâts à TOUS les ennemis.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ALL_ENEMIES, value: 4 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ALL_ENEMIES, value: 6 },
    ],
});

/** Charge : attaque + pioche (ex Pommel Strike) */
const tackle = new CardDefinition({
    id: 'tackle',
    name: 'Charge',
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    cost: 1,
    description: 'Inflige 9 dégâts. Pioche 1 carte.',
    upgradedDescription: 'Inflige 10 dégâts. Pioche 2 cartes.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 9 },
        { type: CardEffectType.DRAW_CARDS, value: 1 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 10 },
        { type: CardEffectType.DRAW_CARDS, value: 2 },
    ],
});

/** Lance-Soleil : gros coup coûteux (ex Bludgeon) */
const solarBeam = new CardDefinition({
    id: 'solar_beam',
    name: 'Lance-Soleil',
    type: CardType.ATTACK,
    rarity: CardRarity.RARE,
    cost: 3,
    description: 'Inflige 32 dégâts.',
    upgradedDescription: 'Inflige 42 dégâts.',
    effects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 32 },
    ],
    upgradedEffects: [
        { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 42 },
    ],
});

// ─── 4 Cartes de Défense ──────────────────────────────────────────────────────

/** Défense : bloc de base (ex Defend) */
const growl = new CardDefinition({
    id: 'growl',
    name: 'Défense',
    type: CardType.SKILL,
    rarity: CardRarity.STARTER,
    cost: 1,
    description: 'Gagne 5 Bloc.',
    upgradedDescription: 'Gagne 8 Bloc.',
    effects: [
        { type: CardEffectType.GAIN_BLOCK, target: CardTarget.SELF, value: 5 },
    ],
    upgradedEffects: [
        { type: CardEffectType.GAIN_BLOCK, target: CardTarget.SELF, value: 8 },
    ],
});

/** Synthèse : bloc + soin (ex Iron Wave) */
const synthesis = new CardDefinition({
    id: 'synthesis',
    name: 'Synthèse',
    type: CardType.SKILL,
    rarity: CardRarity.COMMON,
    cost: 1,
    description: 'Gagne 5 Bloc. Récupère 5 PV.',
    upgradedDescription: 'Gagne 6 Bloc. Récupère 6 PV.',
    effects: [
        { type: CardEffectType.GAIN_BLOCK, target: CardTarget.SELF, value: 5 },
        { type: CardEffectType.HEAL, value: 5 },
    ],
    upgradedEffects: [
        { type: CardEffectType.GAIN_BLOCK, target: CardTarget.SELF, value: 6 },
        { type: CardEffectType.HEAL, value: 6 },
    ],
});

/** Durcissement : bloc + pioche (ex Shrug It Off) */
const harden = new CardDefinition({
    id: 'harden',
    name: 'Durcissement',
    type: CardType.SKILL,
    rarity: CardRarity.COMMON,
    cost: 1,
    description: 'Gagne 8 Bloc. Pioche 1 carte.',
    upgradedDescription: 'Gagne 11 Bloc. Pioche 1 carte.',
    effects: [
        { type: CardEffectType.GAIN_BLOCK, target: CardTarget.SELF, value: 8 },
        { type: CardEffectType.DRAW_CARDS, value: 1 },
    ],
    upgradedEffects: [
        { type: CardEffectType.GAIN_BLOCK, target: CardTarget.SELF, value: 11 },
        { type: CardEffectType.DRAW_CARDS, value: 1 },
    ],
});

/** Croissance : double le bloc (ex Entrench) */
const growth = new CardDefinition({
    id: 'growth',
    name: 'Croissance',
    type: CardType.SKILL,
    rarity: CardRarity.UNCOMMON,
    cost: 2,
    description: 'Double votre Bloc actuel.',
    upgradedDescription: 'Double votre Bloc actuel.',
    upgradedCost: 1,
    effects: [
        { type: CardEffectType.DOUBLE_BLOCK, target: CardTarget.SELF },
    ],
    upgradedEffects: [
        { type: CardEffectType.DOUBLE_BLOCK, target: CardTarget.SELF },
    ],
});

// ─── Cartes Spéciales Pokémon ─────────────────────────────────────────────────

/** Poudre Toxic : applique du poison */
const toxic = new CardDefinition({
    id: 'toxic',
    name: 'Poudre Toxic',
    type: CardType.SKILL,
    rarity: CardRarity.UNCOMMON,
    cost: 2,
    description: 'Applique 3 stacks de Poison.',
    upgradedDescription: 'Applique 6 stacks de Poison.',
    upgradedCost: 1,
    effects: [
        {
            type: CardEffectType.APPLY_STATUS,
            target: CardTarget.ENEMY,
            statusId: StatusEffectId.POISON,
            statusStacks: 3,
        },
    ],
    upgradedEffects: [
        {
            type: CardEffectType.APPLY_STATUS,
            target: CardTarget.ENEMY,
            statusId: StatusEffectId.POISON,
            statusStacks: 6,
        },
    ],
});

/** Poudre Dodo : endort l'ennemi pour 1 tour */
const sleepPowder = new CardDefinition({
    id: 'sleep_powder',
    name: 'Poudre Dodo',
    type: CardType.SKILL,
    rarity: CardRarity.UNCOMMON,
    cost: 3,
    description: "Endort l'ennemi pour 1 tour (saute son tour).",
    upgradedDescription: "Endort l'ennemi pour 1 tour (saute son tour).",
    upgradedCost: 2,
    effects: [
        {
            type: CardEffectType.APPLY_STATUS,
            target: CardTarget.ENEMY,
            statusId: StatusEffectId.SLEEP,
            statusStacks: 1,
        },
    ],
    upgradedEffects: [
        {
            type: CardEffectType.APPLY_STATUS,
            target: CardTarget.ENEMY,
            statusId: StatusEffectId.SLEEP,
            statusStacks: 1,
        },
    ],
});

// ─── Enregistrement de toutes les cartes ──────────────────────────────────────

export function registerAllCards(): void {
    [
        vineWhip, razorLeaf, tackle, solarBeam,
        growl, synthesis, harden, growth,
        toxic, sleepPowder,
    ].forEach((card) => CardDefinition.register(card));

    registerSalamecheCards();
}

export const ATTACK_CARD_IDS = ['vine_whip', 'razor_leaf', 'tackle', 'solar_beam'];
export const DEFENSE_CARD_IDS = ['growl', 'synthesis', 'harden', 'growth'];
export const SPECIAL_CARD_IDS = ['toxic', 'sleep_powder'];

export const STARTER_DECK_IDS = [
    // 4 cartes Frappe
    'vine_whip', 'vine_whip', 'vine_whip', 'vine_whip',
    // 4 cartes Défense
    'growl', 'growl', 'growl', 'growl',
    // Cartes spéciales de départ
    'toxic',
    'sleep_powder',
];

export const ALL_CARD_IDS = [...ATTACK_CARD_IDS, ...DEFENSE_CARD_IDS, ...SPECIAL_CARD_IDS];
