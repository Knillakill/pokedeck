import { EnemyMoveData, IntentType, CardTarget, CardEffectType, StatusEffectId } from '../types';

export interface EnemyDefinition {
    id: string;
    name: string;
    maxHp: number;
    hpVariance?: number;
    movePattern: (EnemyMoveData & { weight?: number })[];
    isSequential?: boolean;
    isElite?: boolean;
    isBoss?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTE 1 — Ennemis Normaux
// Convention targets dans resolveEnemyMove (CombatEngine) :
//   CardTarget.SELF   → applique sur l'ennemi lui-même (blocs, buffs)
//   CardTarget.ENEMY  → applique sur le JOUEUR (debuffs, poison au joueur)
// ─────────────────────────────────────────────────────────────────────────────

// ─── Rattata — 28 PV ────────────────────────────────────────────────────────
// Cycle séquentiel 3 tours : Morsure(6) → Charge Rapide(9) → Morsure(6)
// Rôle : ennemi d'introduction, aucune mécanique complexe.
const rattata: EnemyDefinition = {
    id: 'rattata',
    name: 'Rattata',
    maxHp: 28,
    hpVariance: 4,
    isSequential: true,
    movePattern: [
        {
            id: 'bite',
            name: 'Morsure',
            intent: IntentType.ATTACK,
            effects: [
                { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 6 },
            ],
        },
        {
            id: 'quick_charge',
            name: 'Charge Rapide',
            intent: IntentType.ATTACK,
            effects: [
                { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 9 },
            ],
        },
        {
            id: 'bite2',
            name: 'Morsure',
            intent: IntentType.ATTACK,
            effects: [
                { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 6 },
            ],
        },
    ],
};

// ─── Roucool — 22 PV ────────────────────────────────────────────────────────
// Cycle séquentiel 2 tours : Tornade(5 + Faiblesse joueur) → Vive-Attaque(9)
// Rôle : introduit le statut Faiblesse et la notion de débuff d'attaque.
const pidgey: EnemyDefinition = {
    id: 'pidgey',
    name: 'Roucool',
    maxHp: 22,
    hpVariance: 4,
    isSequential: true,
    movePattern: [
        {
            id: 'gust',
            name: 'Tornade',
            intent: IntentType.ATTACK_DEBUFF,
            effects: [
                { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 5 },
                // Faiblesse sur le JOUEUR (CardTarget.ENEMY = target du joueur dans ce contexte)
                { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.WEAK, statusStacks: 1 },
            ],
        },
        {
            id: 'quick_attack',
            name: 'Vive-Attaque',
            intent: IntentType.ATTACK,
            effects: [
                { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 9 },
            ],
        },
    ],
};

// ─── Chenipan — 30 PV ───────────────────────────────────────────────────────
// Cycle séquentiel 3 tours : Morsure(4) → Ligotage(Faiblesse 2) → Toile Soyeuse(Bloc 4 sur soi)
// Rôle : introduit le stall et la Faiblesse prolongée.
const chenipan: EnemyDefinition = {
    id: 'chenipan',
    name: 'Chenipan',
    maxHp: 30,
    hpVariance: 4,
    isSequential: true,
    movePattern: [
        {
            id: 'bite',
            name: 'Morsure',
            intent: IntentType.ATTACK,
            effects: [
                { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 4 },
            ],
        },
        {
            id: 'string_wrap',
            name: 'Ligotage',
            intent: IntentType.DEBUFF,
            effects: [
                // Faiblesse sur le JOUEUR
                { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.WEAK, statusStacks: 2 },
            ],
        },
        {
            id: 'silk_shield',
            name: 'Toile Soyeuse',
            intent: IntentType.DEFEND,
            effects: [
                // Bloc sur l'ennemi lui-même (CardTarget.SELF)
                { type: CardEffectType.GAIN_BLOCK, target: CardTarget.SELF, value: 4 },
            ],
        },
    ],
};

// ─── Aspicot — 28 PV ────────────────────────────────────────────────────────
// Cycle séquentiel 2 tours : Dard Venin(5 + Poison 2 joueur) → Attaque(6)
// Rôle : introduit le Poison et son accumulation.
const aspicot: EnemyDefinition = {
    id: 'aspicot',
    name: 'Aspicot',
    maxHp: 28,
    hpVariance: 4,
    isSequential: true,
    movePattern: [
        {
            id: 'poison_sting',
            name: 'Dard Venin',
            intent: IntentType.ATTACK_DEBUFF,
            effects: [
                { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 5 },
                // Poison sur le JOUEUR (CardTarget.ENEMY = joueur du point de vue ennemi)
                { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 2 },
            ],
        },
        {
            id: 'tackle',
            name: 'Attaque',
            intent: IntentType.ATTACK,
            effects: [
                { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 6 },
            ],
        },
    ],
};

// ─── Racaillou — 44 PV ──────────────────────────────────────────────────────
// Cycle séquentiel 4 tours : Jet de Pierres(9) → Durcissement(Bloc 6) → Jet de Pierres(9) → Jet de Pierres(9)
// Rôle : ennemi tank de l'Acte 1, introduit le Bloc ennemi.
const racaillou: EnemyDefinition = {
    id: 'racaillou',
    name: 'Racaillou',
    maxHp: 44,
    hpVariance: 6,
    isSequential: true,
    movePattern: [
        {
            id: 'rock_throw_1',
            name: 'Jet de Pierres',
            intent: IntentType.ATTACK,
            effects: [
                { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 9 },
            ],
        },
        {
            id: 'harden',
            name: 'Durcissement',
            intent: IntentType.DEFEND,
            effects: [
                // Bloc sur l'ennemi lui-même
                { type: CardEffectType.GAIN_BLOCK, target: CardTarget.SELF, value: 6 },
            ],
        },
        {
            id: 'rock_throw_2',
            name: 'Jet de Pierres',
            intent: IntentType.ATTACK,
            effects: [
                { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 9 },
            ],
        },
        {
            id: 'rock_throw_3',
            name: 'Jet de Pierres',
            intent: IntentType.ATTACK,
            effects: [
                { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 9 },
            ],
        },
    ],
};

// ─── Mystherbe — 34 PV ──────────────────────────────────────────────────────
// Cycle séquentiel 3 tours : Acide(6) → Poudre Toxik(Poison 3 joueur) → Somnifère(Faiblesse 2 joueur)
// Rôle : combine Poison et Faiblesse, ennemi le plus dangereux en termes de débuffs Acte 1.
const mystherbe: EnemyDefinition = {
    id: 'mystherbe',
    name: 'Mystherbe',
    maxHp: 34,
    hpVariance: 4,
    isSequential: true,
    movePattern: [
        {
            id: 'acid',
            name: 'Acide',
            intent: IntentType.ATTACK,
            effects: [
                { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.ENEMY, value: 6 },
            ],
        },
        {
            id: 'toxic_powder',
            name: 'Poudre Toxik',
            intent: IntentType.DEBUFF,
            effects: [
                // Poison sur le JOUEUR
                { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.POISON, statusStacks: 3 },
            ],
        },
        {
            id: 'sleep_powder',
            name: 'Somnifère',
            intent: IntentType.DEBUFF,
            effects: [
                // Faiblesse sur le JOUEUR (réduit ses dégâts, pas endormissement)
                { type: CardEffectType.APPLY_STATUS, target: CardTarget.ENEMY, statusId: StatusEffectId.WEAK, statusStacks: 2 },
            ],
        },
    ],
};

// ─── Registre ─────────────────────────────────────────────────────────────────

const enemyRegistry = new Map<string, EnemyDefinition>();

export function registerAllEnemies(): void {
    [pidgey, rattata, aspicot, chenipan, racaillou, mystherbe]
        .forEach(e => enemyRegistry.set(e.id, e));
}

export function getEnemyDefinition(id: string): EnemyDefinition {
    const def = enemyRegistry.get(id);
    if (!def) throw new Error(`Ennemi introuvable : ${id}`);
    return def;
}

export const NORMAL_ENEMY_IDS = ['pidgey', 'rattata', 'aspicot', 'chenipan', 'racaillou', 'mystherbe'];
// Boss Acte 1 : Ronflex (à implémenter)
export const BOSS_ENEMY_IDS   = ['rattata']; // placeholder jusqu'à Ronflex
