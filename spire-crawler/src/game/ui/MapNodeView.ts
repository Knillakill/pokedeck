import Phaser from 'phaser';
import { MapNode, NodeType } from '../core/types';

const NODE_RADIUS = 24;

const NODE_COLORS: Record<NodeType, number> = {
    [NodeType.MONSTER]: 0xe74c3c,
    [NodeType.ELITE]:   0xe67e22,
    [NodeType.REST]:    0x27ae60,
    [NodeType.EVENT]:   0x9b59b6,
    [NodeType.SHOP]:    0xf39c12,
    [NodeType.BOSS]:    0x8e44ad,
    [NodeType.START]:   0x2ecc71,
};

const NODE_ICONS: Record<NodeType, string> = {
    [NodeType.MONSTER]: '⚔',
    [NodeType.ELITE]:   '💀',
    [NodeType.REST]:    '🔥',
    [NodeType.EVENT]:   '❓',
    [NodeType.SHOP]:    '🛒',
    [NodeType.BOSS]:    '👑',
    [NodeType.START]:   '▶',
};

const NODE_LABELS: Record<NodeType, string> = {
    [NodeType.MONSTER]: 'Combat',
    [NodeType.ELITE]:   'Elite',
    [NodeType.REST]:    'Repos',
    [NodeType.EVENT]:   'Évènement',
    [NodeType.SHOP]:    'Boutique',
    [NodeType.BOSS]:    'Boss',
    [NodeType.START]:   'Départ',
};

export type NodeClickCallback = (node: MapNode) => void;

export class MapNodeView extends Phaser.GameObjects.Container {
    node: MapNode;
    private gfx: Phaser.GameObjects.Graphics;
    private icon: Phaser.GameObjects.Text;
    private label: Phaser.GameObjects.Text;
    private pulse: Phaser.Tweens.Tween | null = null;

    constructor(scene: Phaser.Scene, x: number, y: number, node: MapNode, onClickCb?: NodeClickCallback) {
        super(scene, x, y);
        this.node = node;

        this.gfx = scene.add.graphics();
        this.icon = scene.add.text(0, -4, NODE_ICONS[node.type], {
            fontSize: '18px',
        }).setOrigin(0.5);

        this.label = scene.add.text(0, NODE_RADIUS + 6, NODE_LABELS[node.type], {
            fontSize: '9px', fontFamily: 'Georgia, serif',
            color: '#ecf0f1', stroke: '#000', strokeThickness: 1,
        }).setOrigin(0.5);

        this.add([this.gfx, this.icon, this.label]);
        this.draw(false);

        scene.add.existing(this);

        if (onClickCb) {
            this.setSize(NODE_RADIUS * 2, NODE_RADIUS * 2);
            this.setInteractive({ cursor: 'pointer' });
            this.on('pointerup', () => onClickCb(node));
            this.on('pointerover', () => this.draw(true));
            this.on('pointerout', () => this.draw(false));
        }
    }

    private draw(hovered: boolean): void {
        this.gfx.clear();
        const color = NODE_COLORS[this.node.type];
        const scale = hovered ? 1.15 : 1;

        this.gfx.fillStyle(0x000000, 0.5);
        this.gfx.fillCircle(3, 3, NODE_RADIUS * scale);

        if (this.node.completed) {
            this.gfx.fillStyle(0x2c3e50, 0.5);
        } else {
            this.gfx.fillStyle(color, 1);
        }
        this.gfx.fillCircle(0, 0, NODE_RADIUS * scale);

        this.gfx.lineStyle(hovered ? 3 : 2, hovered ? 0xffffff : 0x000000, 1);
        this.gfx.strokeCircle(0, 0, NODE_RADIUS * scale);

        if (this.node.completed) {
            this.gfx.lineStyle(2, 0x27ae60, 1);
            this.gfx.strokeCircle(0, 0, NODE_RADIUS * 0.6);
        }

        this.icon.setAlpha(this.node.completed ? 0.4 : 1);
    }

    setAvailable(available: boolean): void {
        if (this.pulse) {
            this.pulse.stop();
            this.pulse = null;
        }

        if (available && !this.node.completed) {
            this.pulse = this.scene.tweens.add({
                targets: this,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 600,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
            });
        } else {
            this.setScale(1);
        }

        this.setInteractive(available && !this.node.completed);
    }
}
