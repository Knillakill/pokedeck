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

// ─── Roucool ──────────────────────────────────────────────────────────────────
const pidgey: EnemyDefinition = {
    id: 'pidgey',
    name: 'Roucool',
    maxHp: 28,
    hpVariance: 6,
    isSequential: false,
    movePattern: [
        {
            id: 'gust',
            name: 'Tornade',
            intent: IntentType.ATTACK,
            weight: 3,
            cantRepeatTwice: true,
            effects: [
                { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.SELF, value: 6 },
            ],
        },
        {
            id: 'sand_attack',
            name: 'Jet de Sable',
            intent: IntentType.DEBUFF,
            weight: 2,
            cantRepeatTwice: true,
            effects: [
                { type: CardEffectType.APPLY_STATUS, target: CardTarget.SELF, statusId: StatusEffectId.WEAK, statusStacks: 1 },
            ],
        },
        {
            id: 'quick_attack',
            name: 'Vive-Attaque',
            intent: IntentType.ATTACK,
            weight: 2,
            effects: [
                { type: CardEffectType.DEAL_DAMAGE, target: CardTarget.SELF, value: 8 },
            ],
        },
    ],
};

// ─── Registre ────────────────────────────────────────────────────────────────

const enemyRegistry = new Map<string, EnemyDefinition>();

export function registerAllEnemies(): void {
    [pidgey].forEach(e => enemyRegistry.set(e.id, e));
}

export function getEnemyDefinition(id: string): EnemyDefinition {
    const def = enemyRegistry.get(id);
    if (!def) throw new Error(`Ennemi introuvable : ${id}`);
    return def;
}

export const NORMAL_ENEMY_IDS = ['pidgey'];
export const BOSS_ENEMY_IDS   = ['pidgey'];
