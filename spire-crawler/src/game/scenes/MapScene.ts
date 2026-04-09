import { Scene } from 'phaser';
import { RunManager } from '../core/RunManager';
import { MapNode, NodeType } from '../core/types';
import { MapNodeView } from '../ui/MapNodeView';
import { C, sc, fz } from '../config';

export class MapScene extends Scene {
    private nodeViews: MapNodeView[] = [];

    constructor() {
        super('MapScene');
    }

    create(): void {
        const run = RunManager.instance;

        this.drawBackground();
        this.drawTitle();
        this.drawPlayerInfo(run);
        this.buildMapGraph(run);

        this.cameras.main.fadeIn(500);
    }

    private drawBackground(): void {
        const { width, height } = this.scale;
        const bg = this.add.graphics();
        bg.fillGradientStyle(C.BG_DEEP, C.BG_DEEP, C.BG_MAIN, C.BG_PANEL, 1);
        bg.fillRect(0, 0, width, height);

        // Brume violette plus dense
        for (let i = 0; i < 18; i++) {
            const mist = this.add.graphics();
            mist.fillStyle(C.PURPLE, 0.04 + Math.random() * 0.06);
            const cx = Math.random() * width;
            const cy = Math.random() * height;
            mist.fillEllipse(cx, cy, 250 + Math.random() * 320, 90 + Math.random() * 140);
        }

        // Ligne or en bas — horizon du donjon
        const deco = this.add.graphics();
        deco.lineStyle(1, C.GOLD_DIM, 0.35);
        deco.lineBetween(0, height - sc(8), width, height - sc(8));
    }

    private drawTitle(): void {
        const run = RunManager.instance;
        const { width } = this.scale;

        // Fond titre
        const titBg = this.add.graphics();
        titBg.fillStyle(C.BG_PANEL, 0.85);
        titBg.fillRoundedRect(width / 2 - sc(180), sc(10), sc(360), sc(34), sc(8));
        titBg.lineStyle(1, C.GOLD_BORDER, 0.5);
        titBg.strokeRoundedRect(width / 2 - sc(180), sc(10), sc(360), sc(34), sc(8));

        this.add.text(width / 2, sc(27), `Acte ${run.act}  —  Étage ${run.floor}`, {
            fontSize: fz(15), fontFamily: 'Georgia, serif', fontStyle: 'bold',
            color: C.S_GOLD, stroke: '#000', strokeThickness: 2, resolution: 2,
        }).setOrigin(0.5);
    }

    private drawPlayerInfo(run: RunManager): void {
        const infoBg = this.add.graphics();
        infoBg.fillStyle(C.BG_PANEL, 0.82);
        infoBg.fillRoundedRect(sc(8), sc(10), sc(280), sc(34), sc(8));
        infoBg.lineStyle(1, C.GOLD_DIM, 0.45);
        infoBg.strokeRoundedRect(sc(8), sc(10), sc(280), sc(34), sc(8));

        this.add.text(sc(20), sc(27),
            `❤ ${run.playerHp}/${run.playerMaxHp}   💰 ${run.playerGold}   📦 ${run.deck.length} cartes`, {
            fontSize: fz(12), fontFamily: 'Georgia, serif',
            color: C.S_TEXT, stroke: '#000', strokeThickness: 1, resolution: 2,
        }).setOrigin(0, 0.5);
    }

    private buildMapGraph(run: RunManager): void {
        const { width, height } = this.scale;
        const map = run.map;
        const nodes = map.nodes;

        const maxRow = Math.max(...nodes.map(n => n.row));
        const paddingX = sc(150);
        const paddingY = sc(80);
        const usableW = width - paddingX * 2;
        const usableH = height - paddingY * 2;

        const posMap = new Map<string, { x: number; y: number }>();

        nodes.forEach(node => {
            const colCount = nodes.filter(n => n.row === node.row).length;
            const colSpacing = colCount > 1 ? usableW / (colCount - 1) : 0;
            const colOffset = colCount > 1 ? paddingX + node.col * colSpacing : width / 2;
            const rowY = height - paddingY - (node.row / maxRow) * usableH;
            posMap.set(node.id, { x: colOffset, y: rowY });
        });

        // Connexions
        const lineGfx = this.add.graphics();
        nodes.forEach(node => {
            const from = posMap.get(node.id)!;
            node.connections.forEach(targetId => {
                const to = posMap.get(targetId);
                if (!to) return;
                if (node.completed) {
                    lineGfx.lineStyle(3, C.GOLD_DEEP, 0.85);
                    lineGfx.lineBetween(from.x, from.y, to.x, to.y);
                    // Lueur sur le chemin complété
                    lineGfx.lineStyle(7, C.GOLD, 0.12);
                    lineGfx.lineBetween(from.x, from.y, to.x, to.y);
                } else {
                    lineGfx.lineStyle(1.5, C.PURPLE_SOFT, 0.5);
                    lineGfx.lineBetween(from.x, from.y, to.x, to.y);
                }
            });
        });

        const availableIds = new Set(run.getAvailableNodes().map(n => n.id));

        nodes.forEach(node => {
            const pos = posMap.get(node.id)!;
            const view = new MapNodeView(this, pos.x, pos.y, node, (n) => this.onNodeClick(n));
            view.setAvailable(availableIds.has(node.id));
            this.nodeViews.push(view);
        });
    }

    private onNodeClick(node: MapNode): void {
        const run = RunManager.instance;
        const available = run.getAvailableNodes();
        if (!available.find(n => n.id === node.id)) return;

        this.cameras.main.fadeOut(300, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            switch (node.type) {
                case NodeType.MONSTER:
                case NodeType.ELITE:
                case NodeType.BOSS:
                    this.scene.start('BattleScene', {
                        enemyIds: node.enemyIds ?? [],
                        nodeId: node.id,
                        isElite: node.type === NodeType.ELITE,
                        isBoss: node.type === NodeType.BOSS,
                    });
                    break;
                case NodeType.REST:
                    this.scene.start('RestScene', { nodeId: node.id });
                    break;
                case NodeType.EVENT:
                    this.scene.start('RestScene', { nodeId: node.id });
                    break;
                default:
                    break;
            }
        });
    }
}
