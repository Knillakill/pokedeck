import Phaser from 'phaser';
import { IntentType } from '../core/types';
import { sc, fz, C } from '../config';

const ICON_SIZE = sc(72);   // agrandi pour meilleure lisibilité

const INTENT_COLORS: Record<IntentType, number> = {
    [IntentType.ATTACK]:        0xe74c3c,
    [IntentType.DEFEND]:        0x3498db,
    [IntentType.BUFF]:          0x2ecc71,
    [IntentType.DEBUFF]:        0x9b59b6,
    [IntentType.ATTACK_DEBUFF]: 0xe67e22,
    [IntentType.ATTACK_BUFF]:   0xf39c12,
    [IntentType.UNKNOWN]:       0x7f8c8d,
};

const INTENT_LABELS: Record<IntentType, string> = {
    [IntentType.ATTACK]:        '⚔',
    [IntentType.DEFEND]:        '🛡',
    [IntentType.BUFF]:          '↑',
    [IntentType.DEBUFF]:        '↓',
    [IntentType.ATTACK_DEBUFF]: '⚔↓',
    [IntentType.ATTACK_BUFF]:   '⚔↑',
    [IntentType.UNKNOWN]:       '?',
};

function buildTooltipText(intent: IntentType, damage?: number): string {
    switch (intent) {
        case IntentType.ATTACK:
            return damage ? `Va attaquer\npour ${damage} dégâts` : 'Va attaquer';
        case IntentType.DEFEND:
            return 'Va se défendre\net gagner du Bloc';
        case IntentType.BUFF:
            return 'Va se renforcer';
        case IntentType.DEBUFF:
            return 'Va appliquer\nun affaiblissement';
        case IntentType.ATTACK_DEBUFF:
            return damage
                ? `Va attaquer (${damage} dégâts)\net affaiblir`
                : 'Va attaquer et affaiblir';
        case IntentType.ATTACK_BUFF:
            return damage
                ? `Va attaquer (${damage} dégâts)\net se renforcer`
                : 'Va attaquer et se renforcer';
        case IntentType.UNKNOWN:
        default:
            return 'Intention inconnue';
    }
}

export class IntentIcon extends Phaser.GameObjects.Container {
    private gfx: Phaser.GameObjects.Graphics;
    private label: Phaser.GameObjects.Text;
    private dmgText: Phaser.GameObjects.Text;
    private tooltip: Phaser.GameObjects.Container;

    private currentIntent: IntentType = IntentType.UNKNOWN;
    private currentDamage?: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.gfx = scene.add.graphics();

        this.label = scene.add.text(0, -2, '?', {
            fontSize: fz(30),
            fontFamily: 'sans-serif',
            fontStyle: 'bold',
            color: '#ffffff',
        }).setOrigin(0.5);

        // Dégâts : très visible, gros et rouge vif
        this.dmgText = scene.add.text(0, ICON_SIZE / 2 + sc(18), '', {
            fontSize: fz(30),
            fontFamily: 'Georgia, serif',
            fontStyle: 'bold',
            color: '#ff4444',
            stroke: '#000',
            strokeThickness: sc(5),
            resolution: 2,
        }).setOrigin(0.5);

        this.tooltip = this.buildTooltip(scene);
        this.tooltip.setVisible(false);

        this.add([this.gfx, this.label, this.dmgText, this.tooltip]);

        // Zone interactive sur l'icône
        this.setSize(ICON_SIZE + 16, ICON_SIZE + 32);
        this.setInteractive({ cursor: 'help' });

        this.on('pointerover', () => this.tooltip.setVisible(true));
        this.on('pointerout',  () => this.tooltip.setVisible(false));

        scene.add.existing(this);
    }

    private buildTooltip(scene: Phaser.Scene): Phaser.GameObjects.Container {
        const container = scene.add.container(0, -ICON_SIZE / 2 - 14);

        const bg = scene.add.graphics();
        container.add(bg);

        const text = scene.add.text(0, 0, '', {
            fontSize: fz(12), fontFamily: 'Georgia, serif',
            color: C.S_TEXT, stroke: '#000', strokeThickness: 2,
            align: 'center', resolution: 2,
        }).setOrigin(0.5);
        container.add(text);

        // On stocke les refs pour les mettre à jour
        (container as any)._bg   = bg;
        (container as any)._text = text;

        return container;
    }

    private refreshTooltip(): void {
        const text  = (this.tooltip as any)._text as Phaser.GameObjects.Text;
        const bg    = (this.tooltip as any)._bg   as Phaser.GameObjects.Graphics;

        const content = buildTooltipText(this.currentIntent, this.currentDamage);
        text.setText(content);

        const lines  = content.split('\n').length;
        const padX   = 14;
        const padY   = 10;
        const w      = Math.max(text.width + padX * 2, 120);
        const h      = lines * 18 + padY * 2;

        // Repositionner au-dessus de l'icône avec décalage selon hauteur
        this.tooltip.setPosition(0, -ICON_SIZE / 2 - h - 6);
        text.setPosition(0, 0);

        bg.clear();
        bg.fillStyle(C.BG_PANEL, 0.94);
        bg.fillRoundedRect(-w / 2, -h / 2, w, h, sc(8));
        // Bord or + accent d'intent
        bg.lineStyle(1.5, C.GOLD_BORDER, 0.55);
        bg.strokeRoundedRect(-w / 2, -h / 2, w, h, sc(8));
        bg.lineStyle(1, INTENT_COLORS[this.currentIntent], 0.6);
        bg.strokeRoundedRect(-w / 2 + sc(2), -h / 2 + sc(2), w - sc(4), h - sc(4), sc(6));
    }

    update(intent: IntentType, damage?: number): void {
        this.currentIntent = intent;
        this.currentDamage = damage;

        this.gfx.clear();
        const color = INTENT_COLORS[intent];

        // Ombre portée
        this.gfx.fillStyle(0x000000, 0.55);
        this.gfx.fillCircle(sc(3), sc(3), ICON_SIZE / 2);
        // Corps principal
        this.gfx.fillStyle(color, 1);
        this.gfx.fillCircle(0, 0, ICON_SIZE / 2);
        // Reflet interne
        this.gfx.fillStyle(0xffffff, 0.18);
        this.gfx.fillCircle(-sc(4), -sc(5), ICON_SIZE / 5);
        // Bordure accent (couleur d'intent)
        this.gfx.lineStyle(sc(1.5), color, 0.9);
        this.gfx.strokeCircle(0, 0, ICON_SIZE / 2 + sc(2));
        // Anneau or externe (cohérence visuelle premium)
        this.gfx.lineStyle(sc(1), C.GOLD_BORDER, 0.65);
        this.gfx.strokeCircle(0, 0, ICON_SIZE / 2 + sc(5));

        this.label.setText(INTENT_LABELS[intent]);

        const isAttack = intent === IntentType.ATTACK
            || intent === IntentType.ATTACK_BUFF
            || intent === IntentType.ATTACK_DEBUFF;

        // Affiche "⚔ 12" pour les attaques, rien sinon
        this.dmgText.setText(damage && damage > 0 && isAttack ? `⚔ ${damage}` : '');

        this.refreshTooltip();
        this.tooltip.setDepth(50);
    }
}
