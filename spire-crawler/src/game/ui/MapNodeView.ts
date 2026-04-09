import Phaser from 'phaser';
import { MapNode, NodeType } from '../core/types';
import { sc, fz, C } from '../config';

const NODE_R = sc(24);   // rayon principal
const RING_R = sc(30);   // rayon de l'anneau or externe

const NODE_FILL: Record<NodeType, number> = {
    [NodeType.MONSTER]: 0x3a0a0a,
    [NodeType.ELITE]:   0x2e1800,
    [NodeType.REST]:    0x0a2e14,
    [NodeType.EVENT]:   0x1a0a3a,
    [NodeType.SHOP]:    0x2e2000,
    [NodeType.BOSS]:    0x1a0028,
    [NodeType.START]:   0x0a2e14,
};

const NODE_ACCENT: Record<NodeType, number> = {
    [NodeType.MONSTER]: 0xe05050,
    [NodeType.ELITE]:   0xe67e22,
    [NodeType.REST]:    0x27ae60,
    [NodeType.EVENT]:   0x9b59b6,
    [NodeType.SHOP]:    0xf0c040,
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
    [NodeType.ELITE]:   'Élite',
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

        this.icon = scene.add.text(0, -sc(4), NODE_ICONS[node.type], {
            fontSize: fz(16), resolution: 2,
        }).setOrigin(0.5);

        this.label = scene.add.text(0, NODE_R + sc(10), NODE_LABELS[node.type], {
            fontSize: fz(10), fontFamily: 'Georgia, serif',
            color: C.S_MUTED, stroke: '#000', strokeThickness: 1, resolution: 2,
        }).setOrigin(0.5);

        this.add([this.gfx, this.icon, this.label]);
        this.draw(false);

        scene.add.existing(this);

        if (onClickCb) {
            this.setSize(RING_R * 2 + sc(8), RING_R * 2 + sc(24));
            this.setInteractive({ cursor: 'pointer' });
            this.on('pointerup', () => onClickCb(node));
            this.on('pointerover', () => {
                this.draw(true);
                scene.tweens.add({ targets: this, scaleX: 1.12, scaleY: 1.12, duration: 100, ease: 'Quad.Out' });
            });
            this.on('pointerout', () => {
                this.draw(false);
                scene.tweens.add({ targets: this, scaleX: 1, scaleY: 1, duration: 100, ease: 'Quad.Out' });
            });
        }
    }

    private draw(hovered: boolean): void {
        this.gfx.clear();
        const fill   = NODE_FILL[this.node.type];
        const accent = NODE_ACCENT[this.node.type];

        if (this.node.completed) {
            // Nœud complété : grisé + coche or
            this.gfx.fillStyle(0x000000, 0.4);
            this.gfx.fillCircle(sc(2), sc(2), NODE_R);
            this.gfx.fillStyle(C.BG_SURFACE, 0.9);
            this.gfx.fillCircle(0, 0, NODE_R);
            this.gfx.lineStyle(1.5, C.GOLD_DIM, 0.5);
            this.gfx.strokeCircle(0, 0, NODE_R);
            this.icon.setAlpha(0.35);
            this.label.setColor(C.S_DIM);
            return;
        }

        // Ombre portée
        this.gfx.fillStyle(0x000000, 0.55);
        this.gfx.fillCircle(sc(3), sc(3), NODE_R);

        // Corps principal
        this.gfx.fillStyle(fill, 1);
        this.gfx.fillCircle(0, 0, NODE_R);

        // Reflet interne (type accent)
        this.gfx.fillStyle(accent, 0.22);
        this.gfx.fillCircle(0, 0, NODE_R - sc(2));

        // Bordure accent type
        this.gfx.lineStyle(hovered ? sc(2.5) : sc(1.5), accent, hovered ? 1 : 0.8);
        this.gfx.strokeCircle(0, 0, NODE_R);

        // Anneau or externe (toujours présent, plus brillant au hover)
        this.gfx.lineStyle(hovered ? sc(2) : sc(1), hovered ? C.GOLD : C.GOLD_BORDER, hovered ? 0.95 : 0.5);
        this.gfx.strokeCircle(0, 0, RING_R);

        this.icon.setAlpha(1);
        this.label.setColor(hovered ? C.S_GOLD : C.S_MUTED);
    }

    setAvailable(available: boolean): void {
        if (this.pulse) {
            this.pulse.stop();
            this.pulse = null;
        }

        if (available && !this.node.completed) {
            // Pulsation dorée : scale de l'anneau via alpha
            const proxy = { v: 0.5 };
            this.pulse = this.scene.tweens.add({
                targets: proxy,
                v: 1,
                duration: 700,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
                onUpdate: () => {
                    this.gfx.clear();
                    this.draw(false);
                    // Sur-dessine l'anneau or pulsant
                    this.gfx.lineStyle(sc(2.5), C.GOLD, proxy.v * 0.9);
                    this.gfx.strokeCircle(0, 0, RING_R + sc(4));
                },
            });
        } else {
            this.setScale(1);
        }

        this.setInteractive(available && !this.node.completed);
    }
}
