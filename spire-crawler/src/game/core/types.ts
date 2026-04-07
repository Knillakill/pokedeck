// ─── Enums ────────────────────────────────────────────────────────────────────

export enum CardType {
    ATTACK = 'ATTACK',
    SKILL = 'SKILL',
    POWER = 'POWER',
}

export enum CardTarget {
    ENEMY = 'ENEMY',
    ALL_ENEMIES = 'ALL_ENEMIES',
    SELF = 'SELF',
}

export enum CardRarity {
    STARTER = 'STARTER',
    COMMON = 'COMMON',
    UNCOMMON = 'UNCOMMON',
    RARE = 'RARE',
}

export enum CardEffectType {
    DEAL_DAMAGE = 'DEAL_DAMAGE',
    GAIN_BLOCK = 'GAIN_BLOCK',
    APPLY_STATUS = 'APPLY_STATUS',
    DRAW_CARDS = 'DRAW_CARDS',
    GAIN_ENERGY = 'GAIN_ENERGY',
    DOUBLE_BLOCK = 'DOUBLE_BLOCK',
    HEAL = 'HEAL',
}

export enum StatusEffectId {
    WEAK = 'WEAK',
    VULNERABLE = 'VULNERABLE',
    STRENGTH = 'STRENGTH',
    DEXTERITY = 'DEXTERITY',
    POISON = 'POISON',
    REGEN = 'REGEN',
    THORNS = 'THORNS',
    METALLICIZE = 'METALLICIZE',
    SLEEP = 'SLEEP',
}

export enum IntentType {
    ATTACK = 'ATTACK',
    DEFEND = 'DEFEND',
    BUFF = 'BUFF',
    DEBUFF = 'DEBUFF',
    ATTACK_DEBUFF = 'ATTACK_DEBUFF',
    ATTACK_BUFF = 'ATTACK_BUFF',
    UNKNOWN = 'UNKNOWN',
}

export enum CombatPhase {
    START_OF_COMBAT = 'START_OF_COMBAT',
    DRAW_PHASE = 'DRAW_PHASE',
    PLAYER_TURN = 'PLAYER_TURN',
    END_TURN = 'END_TURN',
    ENEMY_TURN = 'ENEMY_TURN',
    VICTORY = 'VICTORY',
    DEFEAT = 'DEFEAT',
}

export enum NodeType {
    MONSTER = 'MONSTER',
    ELITE = 'ELITE',
    REST = 'REST',
    EVENT = 'EVENT',
    SHOP = 'SHOP',
    BOSS = 'BOSS',
    START = 'START',
}

// ─── Card Interfaces ──────────────────────────────────────────────────────────

export interface CardEffectData {
    type: CardEffectType;
    target?: CardTarget;
    value?: number;
    statusId?: StatusEffectId;
    statusStacks?: number;
}

export interface CardDefinitionData {
    id: string;
    name: string;
    type: CardType;
    rarity: CardRarity;
    cost: number;
    description: string;
    effects: CardEffectData[];
    upgradedEffects?: CardEffectData[];
    upgradedDescription?: string;
    upgradedCost?: number;
    keywords?: string[];
}

export interface CardInstanceData {
    instanceId: string;
    definitionId: string;
    upgraded: boolean;
}

// ─── Status Effect Interfaces ─────────────────────────────────────────────────

export interface StatusEffectData {
    id: StatusEffectId;
    stacks: number;
}

// ─── Entity Interfaces ────────────────────────────────────────────────────────

export interface EntityData {
    id: string;
    name: string;
    maxHp: number;
    hp: number;
    block: number;
    statuses: StatusEffectData[];
}

export interface PlayerData extends EntityData {
    energy: number;
    maxEnergy: number;
    gold: number;
    drawPile: CardInstanceData[];
    hand: CardInstanceData[];
    discardPile: CardInstanceData[];
    exhaustPile: CardInstanceData[];
}

export interface EnemyMoveData {
    id: string;
    name: string;
    intent: IntentType;
    effects: CardEffectData[];
    cantRepeatTwice?: boolean;
    condition?: string;
}

export interface EnemyDefinitionData {
    id: string;
    name: string;
    maxHp: number;
    movePattern: EnemyMoveData[];
    isElite?: boolean;
    isBoss?: boolean;
}

export interface EnemyData extends EntityData {
    definitionId: string;
    currentMoveIndex: number;
    lastMoveId: string | null;
    nextMove: EnemyMoveData;
}

// ─── Combat State ─────────────────────────────────────────────────────────────

export interface CombatStateData {
    phase: CombatPhase;
    turn: number;
    player: PlayerData;
    enemies: EnemyData[];
    log: string[];
}

// ─── Map ──────────────────────────────────────────────────────────────────────

export interface MapNode {
    id: string;
    type: NodeType;
    row: number;
    col: number;
    enemyIds?: string[]; // liste d'ennemis pour le combat
    connections: string[];
    completed: boolean;
}

export interface MapData {
    nodes: MapNode[];
    currentNodeId: string | null;
    act: number;
}

// ─── Run State (persisté en mémoire pendant un run) ──────────────────────────

export interface RunState {
    player: {
        maxHp: number;
        hp: number;
        gold: number;
        deck: CardInstanceData[];
    };
    map: MapData;
    act: number;
    floor: number;
}

// ─── Events émis par le CombatEngine ─────────────────────────────────────────

export type CombatEventType =
    | 'phase_changed'
    | 'card_played'
    | 'damage_dealt'
    | 'block_gained'
    | 'status_applied'
    | 'card_drawn'
    | 'card_discarded'
    | 'enemy_died'
    | 'player_died'
    | 'combat_victory'
    | 'combat_defeat'
    | 'log_entry'
    | 'enemy_action'; // { enemyId: string } — déclenche l'animation d'action

export interface CombatEvent {
    type: CombatEventType;
    payload?: Record<string, unknown>;
}
