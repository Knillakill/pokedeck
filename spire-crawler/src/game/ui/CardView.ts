import Phaser from 'phaser';
import { CardInstance } from '../core/cards/CardInstance';
import { CardType, CardEffectType } from '../core/types';
import { CardModal } from './CardModal';
import { sc, fz } from '../config';
import type { Entity } from '../core/entities/Entity';

const CARD_W   = sc(190);
const CARD_H   = sc(265);
const CORNER_R = sc(14);

// ─── Couleurs fallback (placeholders sans image) ──────────────────────────────

const TYPE_COLORS: Record<CardType, number> = {
    [CardType.ATTACK]: 0x27ae60,
    [CardType.SKILL]:  0x16a085,
    [CardType.POWER]:  0x8e44ad,
};

const BORDER_COLORS: Record<CardType, number> = {
    [CardType.ATTACK]: 0x2ecc71,
    [CardType.SKILL]:  0x1abc9c,
    [CardType.POWER]:  0x9b59b6,
};

const CARD_ID_COLORS: Record<string, { bg: number; border: number }> = {
    toxic:        { bg: 0x6c3483, border: 0x9b59b6 },
    sleep_powder: { bg: 0x1a5276, border: 0x2e86c1 },
};

// ─── Mapping carte → texture chargée ─────────────────────────────────────────
function getArtTextureKey(definitionId: string): string {
    return `card_art_${definitionId}`;
}

// ─── Positions du texte SUR l'image template (proportionnelles → scalées) ────
const IMG_COST_X = sc(-70);
const IMG_COST_Y = sc(-110);
const IMG_NAME_X = sc(6);
const IMG_NAME_Y = sc(-106);
const IMG_DESC_X = 0;
const IMG_DESC_Y = sc(68);

// ─── Config & Classe ─────────────────────────────────────────────────────────

export interface CardViewConfig {
    scene: Phaser.Scene;
    card: CardInstance;
    x: number;
    y: number;
    interactive?: boolean;
    scale?: number;
}

export class CardView extends Phaser.GameObjects.Container {
    card: CardInstance;

    /** Fond procédural — null si on utilise une image */
    private bgGfx: Phaser.GameObjects.Graphics | null = null;
    /** Image d'artwork — null si pas de texture disponible */
    private bgImage: Phaser.GameObjects.Image | null = null;
    /** Icône de type (fallback uniquement) */
    private typeIcon: Phaser.GameObjects.Graphics | null = null;

    private costText: Phaser.GameObjects.Text;
    private nameText: Phaser.GameObjects.Text;
    private descText: Phaser.GameObjects.Text;

    private isHovered = false;
    private baseY = 0;
    private baseRotation = 0;
    private baseDepth = 1;
    private usingImage = false;

    // ── Contexte de preview combat ────────────────────────────────────────────
    private previewPlayer: Entity | null = null;
    private previewTarget: Entity | null = null;

    static readonly WIDTH  = CARD_W;
    static readonly HEIGHT = CARD_H;

    constructor(config: CardViewConfig) {
        super(config.scene, config.x, config.y);
        this.card    = config.card;
        this.baseY   = config.y;

        // ── Déterminer si une texture est disponible ──────────────────────
        const texKey = getArtTextureKey(config.card.definitionId);
        this.usingImage = config.scene.textures.exists(texKey);

        // ── Fond ─────────────────────────────────────────────────────────
        if (this.usingImage) {
            config.scene.textures.get(texKey).setFilter(Phaser.Textures.FilterMode.LINEAR);
            this.bgImage = config.scene.add.image(0, 0, texKey);
            this.bgImage.setDisplaySize(CARD_W, CARD_H);
            this.add(this.bgImage);
        } else {
            this.bgGfx = config.scene.add.graphics();
            this.add(this.bgGfx);
            this.typeIcon = config.scene.add.graphics();
            this.add(this.typeIcon);
        }

        // ── Textes ────────────────────────────────────────────────────────
        this.costText = config.scene.add.text(0, 0, String(config.card.cost), {
            fontSize: fz(24),
            fontFamily: 'Georgia, serif',
            fontStyle: 'bold',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3,
            resolution: 2,
        }).setOrigin(0.5);

        this.nameText = config.scene.add.text(0, 0, config.card.name, {
            fontSize: fz(18),
            fontFamily: 'Georgia, serif',
            fontStyle: 'bold',
            color: '#3b1f00',
            stroke: '#f5deb3',
            strokeThickness: 3,
            align: 'center',
            wordWrap: { width: CARD_W - sc(50) },
            resolution: 2,
        }).setOrigin(0.5);

        this.descText = config.scene.add.text(0, 0, config.card.description, {
            fontSize: fz(13),
            fontFamily: 'Georgia, serif',
            color: '#2c1a00',
            stroke: '#f5deb3',
            strokeThickness: 1,
            align: 'center',
            wordWrap: { width: CARD_W - sc(28) },
            resolution: 2,
        }).setOrigin(0.5);

        this.add([this.costText, this.nameText, this.descText]);

        this.draw();

        if (config.interactive !== false) {
            this.setSize(CARD_W, CARD_H);
            this.setInteractive({ cursor: 'pointer' });
            this.on('pointerover', this.onHover, this);
            this.on('pointerout',  this.onOut,   this);
            this.on('pointerup', (ptr: Phaser.Input.Pointer) => {
                if (ptr.rightButtonReleased()) {
                    ptr.event.preventDefault();
                    new CardModal(config.scene, this.card);
                }
            }, this);
        }

        if (config.scale) this.setScale(config.scale);

        config.scene.add.existing(this);
    }

    // ─── Rendu ────────────────────────────────────────────────────────────────

    private draw(): void {
        if (this.usingImage) {
            this.drawWithImage();
        } else {
            this.drawProcedural();
        }
    }

    /** Rendu avec image template : positionne uniquement les textes. */
    private drawWithImage(): void {
        this.costText.setPosition(IMG_COST_X, IMG_COST_Y);
        this.costText.setColor('#ffffff');
        this.costText.setFontSize(sc(15));

        const nameColor  = this.card.upgraded ? '#00cc44' : '#3b1f00';
        const nameStroke = this.card.upgraded ? '#003300' : '#f5deb3';
        this.nameText.setPosition(IMG_NAME_X, IMG_NAME_Y);
        this.nameText.setFontSize(sc(18));
        this.nameText.setColor(nameColor);
        this.nameText.setStroke(nameStroke, 3);
        this.nameText.setWordWrapWidth(CARD_W - sc(60));

        const descColor  = this.card.upgraded ? '#006622' : '#2c1a00';
        const descStroke = this.card.upgraded ? '#ccffcc' : '#f5deb3';
        this.descText.setPosition(IMG_DESC_X, IMG_DESC_Y);
        this.descText.setFontSize(sc(13));
        this.descText.setColor(descColor);
        this.descText.setStroke(descStroke, 1);
        this.descText.setWordWrapWidth(CARD_W - sc(32));
    }

    /** Rendu procédural (fallback sans image). */
    private drawProcedural(): void {
        const g = this.bgGfx!;
        g.clear();

        const override = CARD_ID_COLORS[this.card.definitionId];
        const color  = override?.bg     ?? TYPE_COLORS[this.card.type];
        const border = override?.border ?? BORDER_COLORS[this.card.type];

        // Ombre
        g.fillStyle(0x000000, 0.4);
        g.fillRoundedRect(-CARD_W / 2 + 3, -CARD_H / 2 + 3, CARD_W, CARD_H, CORNER_R);
        // Corps
        g.fillStyle(color, 1);
        g.fillRoundedRect(-CARD_W / 2, -CARD_H / 2, CARD_W, CARD_H, CORNER_R);
        // Bordure
        g.lineStyle(2, border, 1);
        g.strokeRoundedRect(-CARD_W / 2, -CARD_H / 2, CARD_W, CARD_H, CORNER_R);
        // Zone art
        g.fillStyle(0x000000, 0.3);
        g.fillRoundedRect(-CARD_W / 2 + sc(8), -CARD_H / 2 + sc(55), CARD_W - sc(16), sc(50), 4);
        // Séparateur
        g.lineStyle(1, 0xffffff, 0.3);
        g.lineBetween(-CARD_W / 2 + sc(8), CARD_H / 2 - sc(55), CARD_W / 2 - sc(8), CARD_H / 2 - sc(55));
        // Cercle coût
        g.fillStyle(0x2c3e50, 1);
        g.fillCircle(-CARD_W / 2 + sc(14), -CARD_H / 2 + sc(14), sc(12));
        g.lineStyle(2, 0xf39c12, 1);
        g.strokeCircle(-CARD_W / 2 + sc(14), -CARD_H / 2 + sc(14), sc(12));
        // Contour doré si upgradée
        if (this.card.upgraded) {
            g.lineStyle(2, 0xf1c40f, 1);
            g.strokeRoundedRect(-CARD_W / 2 + 1, -CARD_H / 2 + 1, CARD_W - 2, CARD_H - 2, CORNER_R);
        }

        // Type icon
        if (this.typeIcon) {
            this.typeIcon.clear();
            if (this.card.type === CardType.ATTACK) {
                this.typeIcon.fillStyle(0xe74c3c, 1);
                this.typeIcon.fillTriangle(
                    CARD_W / 2 - 14, -CARD_H / 2 + 8,
                    CARD_W / 2 - 4,  -CARD_H / 2 + 16,
                    CARD_W / 2 - 14, -CARD_H / 2 + 24,
                );
            } else if (this.card.type === CardType.SKILL) {
                this.typeIcon.fillStyle(0x3498db, 1);
                this.typeIcon.fillCircle(CARD_W / 2 - 10, -CARD_H / 2 + 16, 8);
            }
        }

        // Positions texte fallback
        this.costText.setPosition(-CARD_W / 2 + sc(14), -CARD_H / 2 + sc(14));
        this.costText.setColor('#ffffff');
        this.costText.setFontSize(sc(18));

        const nameColor = this.card.upgraded ? '#f1c40f' : '#ffffff';
        this.nameText.setPosition(0, -CARD_H / 2 + sc(42));
        this.nameText.setColor(nameColor);
        this.nameText.setStroke('#000000', 2);
        this.nameText.setWordWrapWidth(CARD_W - sc(16));

        this.descText.setPosition(0, CARD_H / 2 - sc(36));
        this.descText.setColor(this.card.upgraded ? '#55ff88' : '#ecf0f1');
        this.descText.setWordWrapWidth(CARD_W - sc(12));
    }

    // ─── Hover ────────────────────────────────────────────────────────────────

    private onHover(): void {
        if (this.isHovered) return;
        this.isHovered = true;
        const targetY = this.scene.scale.height - CardView.HEIGHT / 2 - 15;
        this.scene.tweens.add({
            targets: this,
            y: targetY,
            rotation: 0,
            scaleX: 1.12,
            scaleY: 1.12,
            duration: 140,
            ease: 'Back.easeOut',
        });
        this.setDepth(100);
    }

    private onOut(): void {
        this.isHovered = false;
        this.scene.tweens.add({
            targets: this,
            y: this.baseY,
            rotation: this.baseRotation,
            scaleX: 1,
            scaleY: 1,
            duration: 130,
            ease: 'Power2',
        });
        this.setDepth(this.baseDepth);
    }

    // ─── Preview valeurs combat ───────────────────────────────────────────────

    /**
     * Met à jour le contexte de preview.
     * - player      : entité joueur (pour STRENGTH / WEAK / DEXTERITY)
     * - targetEnemy : ennemi ciblé (pour VULNERABLE)
     * Passer null/null pour revenir à la description de base.
     */
    updatePreview(player: Entity | null, targetEnemy: Entity | null): void {
        this.previewPlayer = player;
        this.previewTarget = targetEnemy;
        this.applyPreview();
    }

    private applyPreview(): void {
        const player = this.previewPlayer;
        const target = this.previewTarget;

        const def     = this.card.definition;
        const effects = this.card.upgraded ? def.getUpgradedEffects() : def.effects;

        let text    = this.card.description;
        let hasUp   = false;
        let hasDown = false;

        if (player) {
            for (const eff of effects) {
                if (eff.type === CardEffectType.DEAL_DAMAGE && eff.value !== undefined) {
                    const base     = eff.value;
                    const outgoing = player.calcOutgoingDamage(base);
                    const final    = target ? target.calcIncomingDamage(outgoing) : outgoing;
                    if (final !== base) {
                        text = text.replace(new RegExp(`\\b${base}\\b`), String(final));
                        if (final > base) hasUp   = true;
                        else              hasDown = true;
                    }
                }
                if (eff.type === CardEffectType.GAIN_BLOCK && eff.value !== undefined) {
                    const base  = eff.value;
                    const final = player.calcOutgoingBlock(base);
                    if (final !== base) {
                        text = text.replace(new RegExp(`\\b${base}\\b`), String(final));
                        if (final > base) hasUp   = true;
                        else              hasDown = true;
                    }
                }
            }
        }

        this.descText.setText(text);

        if (hasDown) {
            this.descText.setColor('#e74c3c');
            this.descText.setStroke(this.usingImage ? '#3b0000' : '#000', 1);
        } else if (hasUp) {
            this.descText.setColor('#27ae60');
            this.descText.setStroke(this.usingImage ? '#003300' : '#000', 1);
        } else {
            if (this.usingImage) {
                this.descText.setColor(this.card.upgraded ? '#006622' : '#2c1a00');
                this.descText.setStroke(this.card.upgraded ? '#ccffcc' : '#f5deb3', 1);
            } else {
                this.descText.setColor(this.card.upgraded ? '#55ff88' : '#ecf0f1');
                this.descText.setStroke('#000', 1);
            }
        }
    }

    // ─── Méthodes publiques ───────────────────────────────────────────────────

    /** Applique le layout fan (rotation + profondeur) assigné par la scène. */
    setFanLayout(rotation: number, depth: number): void {
        this.baseRotation = rotation;
        this.baseDepth    = depth;
        this.setRotation(rotation);
        this.setDepth(depth);
    }

    getBaseDepth(): number { return this.baseDepth; }

    setBaseY(y: number): void {
        this.baseY = y;
        if (!this.isHovered) this.y = y;
    }

    updateCard(card: CardInstance): void {
        this.card = card;
        this.costText.setText(String(card.cost));
        this.nameText.setText(card.name);
        this.descText.setText(card.description);
        if (this.bgImage) {
            const texKey = getArtTextureKey(card.definitionId);
            if (this.scene?.textures?.exists(texKey)) {
                this.bgImage.setTexture(texKey);
            }
        }
        this.draw();
        this.applyPreview();
    }

    /**
     * Joue la carte (attaque) : vole vers la cible avant de disparaître.
     */
    playCardAnimation(onComplete: () => void, targetX: number, targetY: number): void {
        this.scene.tweens.add({
            targets: this,
            x: targetX,
            y: targetY - 20,
            scaleX: 0.3,
            scaleY: 0.3,
            rotation: 0,
            alpha: 0,
            duration: 280,
            ease: 'Cubic.easeIn',
            onComplete,
        });
    }

    /**
     * Compétence / Pouvoir : la carte vole vers la défausse (bas-droite).
     */
    playDiscardAnimation(discardX: number, discardY: number, onComplete: () => void): void {
        const spinDir = Math.random() < 0.5 ? 1 : -1;
        this.scene.tweens.add({
            targets: this,
            x: discardX,
            y: discardY,
            scaleX: 0.22,
            scaleY: 0.22,
            rotation: spinDir * Phaser.Math.DegToRad(Phaser.Math.Between(20, 45)),
            alpha: 0,
            duration: 380,
            ease: 'Cubic.easeIn',
            onComplete,
        });
    }

    /**
     * Animation de pioche : la carte part de la position de la pioche (fromX, fromY)
     * et vole vers sa position courante dans la main.
     * À appeler après avoir positionné la carte à son emplacement final.
     */
    animateFromDeck(fromX: number, fromY: number, delay: number = 0): void {
        const targetX = this.x;
        const targetY = this.y;
        const targetRot = this.rotation;
        this.setPosition(fromX, fromY);
        this.setScale(0.18);
        this.setAlpha(0);
        this.setRotation(0);
        this.scene.tweens.add({
            targets: this,
            x: targetX,
            y: targetY,
            scaleX: 1,
            scaleY: 1,
            rotation: targetRot,
            alpha: 1,
            duration: 360,
            delay,
            ease: 'Back.easeOut',
        });
    }
}
