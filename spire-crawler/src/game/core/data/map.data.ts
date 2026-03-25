import { MapData, MapNode, NodeType } from '../types';
import { NORMAL_ENEMY_IDS, BOSS_ENEMY_IDS } from './enemies.data';

let nodeCounter = 0;

function makeNode(type: NodeType, row: number, col: number, enemyId?: string): MapNode {
    return {
        id: `node_${++nodeCounter}`,
        type,
        row,
        col,
        enemyId,
        connections: [],
        completed: false,
    };
}

function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

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
    const r1a = makeNode(NodeType.MONSTER, 1, 0, pickRandom(NORMAL_ENEMY_IDS));
    const r1b = makeNode(NodeType.REST, 1, 1);

    // Rangée 2 : 2 nœuds
    const r2a = makeNode(NodeType.MONSTER, 2, 0, pickRandom(NORMAL_ENEMY_IDS));
    const r2b = makeNode(NodeType.MONSTER, 2, 1, pickRandom(NORMAL_ENEMY_IDS));

    // Rangée 3 : 2 nœuds
    const r3a = makeNode(NodeType.MONSTER, 3, 0, pickRandom(NORMAL_ENEMY_IDS));
    const r3b = act >= 2 ? makeNode(NodeType.EVENT, 3, 1) : makeNode(NodeType.REST, 3, 1);

    // Rangée 4 : Elite
    const r4 = makeNode(NodeType.ELITE, 4, 0, pickRandom(NORMAL_ENEMY_IDS));

    // Boss
    const boss = makeNode(NodeType.BOSS, 5, 0, BOSS_ENEMY_IDS[0]);

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
