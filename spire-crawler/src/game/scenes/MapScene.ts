import { Scene } from 'phaser';
import { RunManager } from '../core/RunManager';
import { MapNode, NodeType } from '../core/types';
import { MapNodeView } from '../ui/MapNodeView';

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
        bg.fillGradientStyle(0x0d0d1a, 0x0d1117, 0x1a0d2e, 0x0d0d1a, 1);
        bg.fillRect(0, 0, width, height);

        // Brume décorative
        for (let i = 0; i < 12; i++) {
            const mist = this.add.graphics();
            mist.fillStyle(0x6c5ce7, 0.03 + Math.random() * 0.04);
            const cx = Math.random() * width;
            const cy = Math.random() * height;
            mist.fillEllipse(cx, cy, 200 + Math.random() * 300, 80 + Math.random() * 120);
        }
    }

    private drawTitle(): void {
        const run = RunManager.instance;
        this.add.text(this.scale.width / 2, 28, `Acte ${run.act} — Étage ${run.floor}`, {
            fontSize: '16px', fontFamily: 'Georgia, serif',
            color: '#f39c12', stroke: '#000', strokeThickness: 2,
        }).setOrigin(0.5);
    }

    private drawPlayerInfo(run: RunManager): void {
        this.add.text(16, 16, `❤ ${run.playerHp}/${run.playerMaxHp}  💰 ${run.playerGold}  📦 ${run.deck.length} cartes`, {
            fontSize: '13px', fontFamily: 'Georgia, serif', color: '#ecf0f1',
        });
    }

    private buildMapGraph(run: RunManager): void {
        const { width, height } = this.scale;
        const map = run.map;
        const nodes = map.nodes;

        // Calcul des positions visuelles basées sur row/col
        const maxRow = Math.max(...nodes.map(n => n.row));
        const paddingX = 150;
        const paddingY = 80;
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

        // Dessiner les connexions en premier
        const lineGfx = this.add.graphics();
        nodes.forEach(node => {
            const from = posMap.get(node.id)!;
            node.connections.forEach(targetId => {
                const to = posMap.get(targetId);
                if (!to) return;
                lineGfx.lineStyle(2, node.completed ? 0xf39c12 : 0x4a4a6a, node.completed ? 0.8 : 0.4);
                lineGfx.lineBetween(from.x, from.y, to.x, to.y);
            });
        });

        // Nœuds disponibles
        const availableIds = new Set(run.getAvailableNodes().map(n => n.id));

        // Créer les vues
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
                    // Pour l'instant, repose
                    this.scene.start('RestScene', { nodeId: node.id });
                    break;

                default:
                    break;
            }
        });
    }
}
