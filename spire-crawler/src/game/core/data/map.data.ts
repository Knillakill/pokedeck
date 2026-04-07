import { MapData, MapNode, NodeType } from '../types';
import { BOSS_ENEMY_IDS } from './enemies.data';

let nodeCounter = 0;

function makeNode(type: NodeType, row: number, col: number, enemyIds?: string[]): MapNode {
    return {
        id: `node_${++nodeCounter}`,
        type,
        row,
        col,
        enemyIds,
        connections: [],
        completed: false,
    };
}

function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

// ── Tables d'encounters ───────────────────────────────────────────────────────
// Combats normaux : 2-3 ennemis pour plus de difficulté
const NORMAL_ENCOUNTERS_2: string[][] = [
    ['pidgey',   'rattata'],
    ['chenipan', 'aspicot'],
    ['rattata',  'mystherbe'],
    ['racaillou','pidgey'],
    ['aspicot',  'mystherbe'],
    ['rattata',  'chenipan'],
    ['pidgey',   'aspicot'],
];

const NORMAL_ENCOUNTERS_3: string[][] = [
    ['rattata',  'pidgey',  'chenipan'],
    ['aspicot',  'mystherbe', 'rattata'],
    ['chenipan', 'rattata', 'pidgey'],
    ['mystherbe','aspicot', 'chenipan'],
];

// Mix 60% × 2 ennemis, 40% × 3 ennemis pour les salles normales
function pickNormalEncounter(): string[] {
    return Math.random() < 0.6
        ? pickRandom(NORMAL_ENCOUNTERS_2)
        : pickRandom(NORMAL_ENCOUNTERS_3);
}

// Élites : toujours 2 ennemis, choix plus coriaces
const ELITE_ENCOUNTERS: string[][] = [
    ['racaillou', 'rattata'],
    ['racaillou', 'mystherbe'],
    ['racaillou', 'pidgey'],
    ['rattata',   'racaillou'],
];

/**
 * Génère un acte de map avec la structure suivante :
 *
 * Row 0 : START
 * Row 1–3 : 2 colonnes possibles (Monstre, Repos, alternés)
 * Row 4 : ELITE
 * Row 5 : BOSS
 *
 * Les connexions forment un graphe dirigé avec bifurcations.
 */
export function generateMap(act = 1): MapData {
    nodeCounter = 0;

    const start = makeNode(NodeType.START, 0, 0);
    start.completed = true;

    // Rangée 1 : 2 nœuds
    const r1a = makeNode(NodeType.MONSTER, 1, 0, pickNormalEncounter());
    const r1b = makeNode(NodeType.REST, 1, 1);

    // Rangée 2 : 2 nœuds
    const r2a = makeNode(NodeType.MONSTER, 2, 0, pickNormalEncounter());
    const r2b = makeNode(NodeType.MONSTER, 2, 1, pickNormalEncounter());

    // Rangée 3 : 2 nœuds
    const r3a = makeNode(NodeType.MONSTER, 3, 0, pickNormalEncounter());
    const r3b = act >= 2 ? makeNode(NodeType.EVENT, 3, 1) : makeNode(NodeType.REST, 3, 1);

    // Rangée 4 : Elite (2 ennemis)
    const r4 = makeNode(NodeType.ELITE, 4, 0, pickRandom(ELITE_ENCOUNTERS));

    // Boss (solo)
    const boss = makeNode(NodeType.BOSS, 5, 0, [BOSS_ENEMY_IDS[0]]);

    // Connexions
    start.connections = [r1a.id, r1b.id];
    r1a.connections = [r2a.id, r2b.id];
    r1b.connections = [r2a.id, r2b.id];
    r2a.connections = [r3a.id];
    r2b.connections = [r3b.id];
    r3a.connections = [r4.id];
    r3b.connections = [r4.id];
    r4.connections = [boss.id];

    const nodes = [start, r1a, r1b, r2a, r2b, r3a, r3b, r4, boss];

    return {
        nodes,
        currentNodeId: start.id,
        act,
    };
}
