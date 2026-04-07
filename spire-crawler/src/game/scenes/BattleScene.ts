import { Scene } from 'phaser';
import { CombatEngine } from '../core/combat/CombatEngine';
import { RunManager } from '../core/RunManager';
import { CardView } from '../ui/CardView';
import { EnemyView } from '../ui/EnemyView';
import { PlayerHUD, BottomBar } from '../ui/PlayerHUD';
import { CombatPhase, CardType } from '../core/types';
import { CardInstance } from '../core/cards/CardInstance';

export interface BattleSceneData {
    enemyIds: string[];
    nodeId: string;
    isElite?: boolean;
    isBoss?: boolean;
}

// Coordonnées du champ de bataille — calibrées sur background.jpg
const PLAYER_X_RATIO    = 0.30;
const ROAD_RATIO_PLAYER = 0.68;
const ROAD_RATIO_ENEMY  = 0.67;
let PLAYER_SPRITE_X = 300;

// ── Bulbizarre GIF — normalisation taille personnage ────────────────────────
// Mesures réelles (System.Drawing) :
//   idle.gif      : personnage 43×48 px dans canvas 45×49  → 98 % du canvas
//   attaque.gif   : personnage 48×53 px dans canvas 192×192 → 27 % du canvas
//   competence.gif: identique
// display_action = display_idle_H × (192/53) ≈ 3.62  →  personnages à la même taille
const BULBI_IDLE_H    = 130;
const BULBI_IDLE_W    = Math.round(45 * BULBI_IDLE_H / 49); // ≈ 119 px
const BULBI_ACTION_SZ = Math.round(BULBI_IDLE_H * 192 / 53);// ≈ 471 px
const BULBI_GIF_BOX   = BULBI_ACTION_SZ;              // wrapper carré = taille max
const BULBI_Y_OFFSET  = Math.round(BULBI_GIF_BOX / 2 - BULBI_IDLE_H / 2); // ≈ 170 px
const BULBI_ACTION_FEET_OFFSET = BULBI_ACTION_SZ - Math.round(163 * BULBI_ACTION_SZ / 192); // ≈ 71 px

// ── Salamèche GIF — même approche DOM que Bulbizarre ────────────────────────
// Les GIFs sont dans assets/salameche/sprite/ : idle.gif, attaque.gif, competence.gif
// Dimensions estimées similaires à Bulbizarre — à ajuster si besoin.
const SALAM_IDLE_H    = 130;
const SALAM_IDLE_W    = 100;
const SALAM_ACTION_SZ = 300;
const SALAM_GIF_BOX   = SALAM_ACTION_SZ;
const SALAM_Y_OFFSET  = Math.round(SALAM_GIF_BOX / 2 - SALAM_IDLE_H / 2); // ≈ 85 px
// Durées estimées des animations (ms) — à calibrer sur les GIFs réels
const SALAM_ANIM_DURATIONS: Record<string, number> = { attaque: 1200, competence: 1600 };

// Config spritesheet par personnage
// Bulbizarre et Salamèche utilisent des GIFs DOM — ssKey ignoré pour eux.
// Carapuce : bande unique 8 frames  (frameWidth 58, frameHeight 75)
interface SpriteConfig {
    ssKey: string; animKey: string;
    scale: number; halfH: number; flipX: boolean;
    frameStart: number; frameEnd: number;
}
const PLAYER_SPRITE_CONFIG: Record<string, SpriteConfig> = {
    'bulbizarre': { ssKey: 'ss_bulbizarre', animKey: 'bulbizarre_idle', scale: 3.0,  halfH: 188, flipX: true,  frameStart: 0, frameEnd: 0  },
    'carapuce':   { ssKey: 'ss_carapuce',   animKey: 'carapuce_idle',   scale: 5.0,  halfH: 190, flipX: false, frameStart: 0, frameEnd: 7  },
};

export class BattleScene extends Scene {
    private engine!: CombatEngine;
    private cardViews: CardView[] = [];
    private enemyViews: EnemyView[] = [];
    private playerHUD!: PlayerHUD;
    private bottomBar!: BottomBar;
    private playerSprite!: Phaser.GameObjects.Container;
    private _endTurnBtn!: Phaser.GameObjects.Container;
    private logText!: Phaser.GameObjects.Text;
    private phaseText!: Phaser.GameObjects.Text;
    private selectedTarget: string | null = null;
    private nodeId!: string;
    private inputLocked = false;
    private playerSpriteHalfH = 190;

    // ── Bulbizarre GIF (DOM, deux <img> fixes — jamais de changement de taille visible)
    private bulbiGifIdle:   HTMLImageElement | null = null;
    private bulbiGifAction: HTMLImageElement | null = null;
    private bulbiGifDom:    Phaser.GameObjects.DOMElement | null = null;
    private bulbiAnimReset: ReturnType<typeof setTimeout> | null = null;

    // ── Salamèche GIF (même approche DOM)
    private salamGifIdle:   HTMLImageElement | null = null;
    private salamGifAction: HTMLImageElement | null = null;
    private salamGifDom:    Phaser.GameObjects.DOMElement | null = null;
    private salamAnimReset: ReturnType<typeof setTimeout> | null = null;

    // ── Drag & drop ───────────────────────────────────────────────────────────
    private draggedCard: CardView | null = null;
    private dragOrigX = 0;
    private dragOrigY = 0;
    private dragOrigRotation = 0;
    private dragArrow!: Phaser.GameObjects.Graphics;
    private dropZones: Phaser.GameObjects.Zone[] = [];
    private hoveredEnemyId: string | null = null;
    private targetRingGfx!: Phaser.GameObjects.Graphics;
    private targetRingTween: Phaser.Tweens.Tween | null = null;

    constructor() {
        super('BattleScene');
    }

    create(data: BattleSceneData): void {
        // Réinitialisation explicite entre deux combats (la scène est réutilisée)
        this.cardViews = [];
        this.enemyViews = [];
        this.selectedTarget = null;
        this.inputLocked = false;

        const run = RunManager.instance;
        const player = run.buildPlayer();
        this.nodeId = data.nodeId;

        this.engine = new CombatEngine(player, data.enemyIds);
        this.registerEngineEvents();

        // Recalcul dynamique selon la taille de l'écran
        PLAYER_SPRITE_X = Math.round(this.scale.width * PLAYER_X_RATIO);

        this.drawBackground(data.isBoss);
        this.createPlayerAnimations();
        this.createEnemyViews();
        this.createPlayerSprite();
        this.createPlayerHUD(player);
        this.createBottomBar(player);
        this.createEndTurnButton();
        this.setupDragDrop();
        this.createLogPanel();
        this.createPhaseText();

        this.cameras.main.fadeIn(500);
        this.engine.startCombat();
    }

    // ─── Fond ─────────────────────────────────────────────────────────────────

    private drawBackground(isBoss = false): void {
        const { width, height } = this.scale;

        if (this.textures.exists('battle_bg')) {
            const bg = this.add.image(width / 2, height / 2, 'battle_bg');
            bg.setDisplaySize(width, height);
            if (isBoss) bg.setTint(0xaa4444);
        } else {
            const bg = this.add.graphics();
            if (isBoss) {
                bg.fillGradientStyle(0x1a0000, 0x2d0000, 0x1a0000, 0x2d0000, 1);
            } else {
                bg.fillGradientStyle(0x0d1117, 0x1a1a2e, 0x0d1117, 0x16213e, 1);
            }
            bg.fillRect(0, 0, width, height);
        }

        // Overlay semi-transparent sur la zone cartes pour les rendre lisibles
        const cardTopY = height - 185;
        const cardStrip = this.add.graphics();
        cardStrip.fillStyle(0x000000, 0.45);
        cardStrip.fillRect(0, cardTopY, width, height - cardTopY);
        cardStrip.lineStyle(1, 0x2a2a3e, 0.6);
        cardStrip.lineBetween(0, cardTopY, width, cardTopY);
    }

    // ─── Enemies ──────────────────────────────────────────────────────────────

    private createEnemyViews(): void {
        const { width, height } = this.scale;
        const enemies = this.engine.enemies;

        // Espacement adaptatif — plus généreux pour faciliter le ciblage
        const spacing = enemies.length >= 3 ? 190 : 230;
        const rightZoneCenter = width * 0.73;
        const startX = rightZoneCenter - ((enemies.length - 1) * spacing) / 2;

        this.dropZones = [];

        enemies.forEach((enemy, i) => {
            // Ennemi du milieu (trio) légèrement avancé pour la profondeur
            const yOffset = (enemies.length === 3 && i === 1) ? -20 : 0;
            const ex = startX + i * spacing;
            const ey = height * ROAD_RATIO_ENEMY + yOffset;

            const view = new EnemyView(this, ex, ey, enemy);
            this.enemyViews.push(view);

            view.on('pointerup', () => this.onEnemyClick(enemy.id));

            // Zone de dépôt généreuse — toujours 180×260 px quelle que soit la config
            const dz = this.add.zone(ex, ey, 180, 260)
                .setRectangleDropZone(180, 260);
            (dz as any).enemyId = enemy.id;
            this.dropZones.push(dz);
        });
    }

    private onEnemyClick(enemyId: string): void {
        const wasSelected = this.selectedTarget === enemyId;
        this.selectedTarget = wasSelected ? null : enemyId;
        this.refreshEnemyHighlights();

        if (!wasSelected) {
            const ev = this.enemyViews.find(v => v.enemy.id === enemyId);
            if (ev) {
                // Pop de sélection
                this.tweens.add({ targets: ev, scaleX: 1.1, scaleY: 1.1, duration: 80, yoyo: true, repeat: 0, ease: 'Back.easeOut' });
                this.showEnemyTargetRing(ev.x, ev.y, true);
            }
        } else {
            this.showEnemyTargetRing(0, 0, false);
        }
    }

    private refreshEnemyHighlights(): void {
        for (const view of this.enemyViews) {
            view.setAlpha(this.selectedTarget && view.enemy.id !== this.selectedTarget ? 0.6 : 1);
        }
    }

    // ─── Joueur ───────────────────────────────────────────────────────────────

    private createPlayerAnimations(): void {
        const configs = Object.values(PLAYER_SPRITE_CONFIG);
        configs.forEach(({ ssKey, animKey, frameStart, frameEnd }) => {
            if (!this.anims.exists(animKey) && this.textures.exists(ssKey)) {
                this.anims.create({
                    key: animKey,
                    frames: this.anims.generateFrameNumbers(ssKey, { start: frameStart, end: frameEnd }),
                    frameRate: 8,
                    repeat: -1,
                });
            }
        });
    }

    private createPlayerSprite(): void {
        const { height } = this.scale;
        const spriteY = height * ROAD_RATIO_PLAYER;
        const characterId = RunManager.instance.characterId ?? 'bulbizarre';

        // ── Bulbizarre : rendu via DOM <img> pour supporter les GIFs ─────────
        if (characterId === 'bulbizarre') {
            // Wrapper carré fixe (BULBI_GIF_BOX²), décalé vers le haut de BULBI_Y_OFFSET
            // pour que le personnage IDLE soit centré sur spriteY (pas le wrapper).
            // Pieds = bas du wrapper = spriteY + BULBI_IDLE_H/2.
            const feetY = spriteY + Math.round(BULBI_IDLE_H / 2);
            this.playerSpriteHalfH = Math.round(BULBI_IDLE_H / 2) + 20; // HUD juste au-dessus

            // Ombre sous les pieds
            const shadow = this.add.graphics();
            shadow.fillStyle(0x000000, 0.25);
            shadow.fillEllipse(PLAYER_SPRITE_X, feetY, 130, 22);

            const wrapper = document.createElement('div');
            wrapper.style.cssText =
                `width:${BULBI_GIF_BOX}px;height:${BULBI_GIF_BOX}px;` +
                'position:relative;pointer-events:none;overflow:visible;';

            // ── img idle : taille fixe permanente, toujours visible au repos ──
            const imgIdle = document.createElement('img');
            imgIdle.src = 'assets/bulbi/sprite/idle.gif';
            imgIdle.style.cssText =
                'position:absolute;bottom:0px;left:50%;' +
                'transform:translateX(-50%) scaleX(-1);' +
                `width:${BULBI_IDLE_W}px;height:${BULBI_IDLE_H}px;` +
                'image-rendering:pixelated;display:block;';

            // ── img action : taille fixe permanente, cachée. Le src change PENDANT
            //    qu'elle est cachée → jamais de flash de taille incorrecte.
            const imgAction = document.createElement('img');
            imgAction.style.cssText =
                `position:absolute;bottom:-${BULBI_ACTION_FEET_OFFSET}px;left:50%;` +
                'transform:translateX(-50%) scaleX(-1);' +
                `width:${BULBI_ACTION_SZ}px;height:${BULBI_ACTION_SZ}px;` +
                'image-rendering:pixelated;display:none;';

            wrapper.appendChild(imgIdle);
            wrapper.appendChild(imgAction);

            const domEl = this.add.dom(PLAYER_SPRITE_X, spriteY - BULBI_Y_OFFSET, wrapper);
            domEl.setDepth(5);

            this.bulbiGifIdle   = imgIdle;
            this.bulbiGifAction = imgAction;
            this.bulbiGifDom    = domEl;

            this.playerSprite = this.add.container(PLAYER_SPRITE_X, spriteY);

            this.events.once('shutdown', () => {
                if (this.bulbiAnimReset !== null) clearTimeout(this.bulbiAnimReset);
                this.bulbiGifIdle   = null;
                this.bulbiGifAction = null;
                this.bulbiGifDom    = null;
            });
            return;
        }

        // ── Salamèche : rendu via DOM <img> (GIFs) ────────────────────────────
        if (characterId === 'salamèche') {
            const feetY = spriteY + Math.round(SALAM_IDLE_H / 2);
            this.playerSpriteHalfH = Math.round(SALAM_IDLE_H / 2) + 20;

            const shadow = this.add.graphics();
            shadow.fillStyle(0x000000, 0.25);
            shadow.fillEllipse(PLAYER_SPRITE_X, feetY, 120, 20);

            const wrapper = document.createElement('div');
            wrapper.style.cssText =
                `width:${SALAM_GIF_BOX}px;height:${SALAM_GIF_BOX}px;` +
                'position:relative;pointer-events:none;overflow:visible;';

            const imgIdle = document.createElement('img');
            imgIdle.src = 'assets/salameche/sprite/idle.gif';
            imgIdle.style.cssText =
                'position:absolute;bottom:0px;left:50%;' +
                'transform:translateX(-50%) scaleX(-1);' +
                `width:${SALAM_IDLE_W}px;height:${SALAM_IDLE_H}px;` +
                'image-rendering:pixelated;display:block;';

            const imgAction = document.createElement('img');
            imgAction.style.cssText =
                'position:absolute;bottom:0px;left:50%;' +
                'transform:translateX(-50%) scaleX(-1);' +
                `width:${SALAM_ACTION_SZ}px;height:${SALAM_ACTION_SZ}px;` +
                'image-rendering:pixelated;display:none;';

            wrapper.appendChild(imgIdle);
            wrapper.appendChild(imgAction);

            const domEl = this.add.dom(PLAYER_SPRITE_X, spriteY - SALAM_Y_OFFSET, wrapper);
            domEl.setDepth(5);

            this.salamGifIdle   = imgIdle;
            this.salamGifAction = imgAction;
            this.salamGifDom    = domEl;

            this.playerSprite = this.add.container(PLAYER_SPRITE_X, spriteY);

            this.events.once('shutdown', () => {
                if (this.salamAnimReset !== null) clearTimeout(this.salamAnimReset);
                this.salamGifIdle   = null;
                this.salamGifAction = null;
                this.salamGifDom    = null;
            });
            return;
        }

        // ── Autres personnages : spritesheet Phaser ───────────────────────────
        const container = this.add.container(PLAYER_SPRITE_X, spriteY);
        const cfg = PLAYER_SPRITE_CONFIG[characterId] ?? PLAYER_SPRITE_CONFIG['carapuce'];
        this.playerSpriteHalfH = cfg.halfH;

        const shadow = this.add.graphics();
        shadow.fillStyle(0x000000, 0.25);
        shadow.fillEllipse(0, cfg.halfH, 210, 34);
        container.add(shadow);

        if (this.textures.exists(cfg.ssKey)) {
            const sprite = this.add.sprite(0, 0, cfg.ssKey);
            sprite.setScale(cfg.scale);
            sprite.setFlipX(cfg.flipX);
            if (this.anims.exists(cfg.animKey)) {
                sprite.play(cfg.animKey);
            }
            container.add(sprite);
        } else {
            // Fallback procédural
            const g = this.add.graphics();
            const s = 2.86;
            g.fillStyle(0x27ae60, 1);
            g.fillEllipse(0, s * 8, s * 72, s * 60);
            g.fillStyle(0x2ecc71, 1);
            g.fillCircle(0, -s * 22, s * 26);
            g.fillStyle(0x6d4c41, 1);
            g.fillEllipse(s * 18, -s * 10, s * 28, s * 24);
            g.fillStyle(0xe74c3c, 1);
            g.fillCircle(-s * 9, -s * 24, s * 5);
            g.fillCircle(s * 9, -s * 24, s * 5);
            container.add(g);
        }

        this.playerSprite = container;
    }

    /**
     * Bascule l'animation GIF de Bulbizarre (DOM img).
     * idle : boucle en permanence.
     * attaque / compétence : joue une fois puis revient à idle.
     * Les durées sont estimées d'après le nombre de frames × ~40 ms/frame.
     */
    private playBulbiAnim(type: 'idle' | 'attaque' | 'competence'): void {
        if (!this.bulbiGifIdle || !this.bulbiGifAction) return;
        if (this.bulbiAnimReset !== null) {
            clearTimeout(this.bulbiAnimReset);
            this.bulbiAnimReset = null;
        }

        const idle   = this.bulbiGifIdle;
        const action = this.bulbiGifAction;

        if (type === 'idle') {
            // Afficher idle, cacher action
            idle.style.display   = 'block';
            action.style.display = 'none';
            // Réinitialiser le src action PENDANT qu'il est caché → aucun flash,
            // l'animation repartira du début à la prochaine utilisation.
            action.src = '';
        } else {
            // 1. Changer le src PENDANT que l'élément est caché (display:none)
            //    → le navigateur décode le GIF à la bonne taille CSS sans jamais l'afficher.
            action.src = `assets/bulbi/sprite/${type}.gif`;

            // 2. Basculer l'affichage au frame suivant (src déjà appliqué, pas de flash)
            requestAnimationFrame(() => {
                action.style.display = 'block';
                idle.style.display   = 'none';
            });

            // Durées mesurées (30 ms/frame) : attaque 51f=1530ms, compétence 66f=1980ms
            const durations: Record<string, number> = { attaque: 1430, competence: 1880 };
            this.bulbiAnimReset = setTimeout(() => {
                this.playBulbiAnim('idle');
                this.bulbiAnimReset = null;
            }, durations[type] ?? 1430);
        }
    }

    /**
     * Bascule l'animation GIF de Salamèche (DOM img).
     * Même logique que playBulbiAnim.
     */
    private playSalamAnim(type: 'idle' | 'attaque' | 'competence'): void {
        if (!this.salamGifIdle || !this.salamGifAction) return;
        if (this.salamAnimReset !== null) {
            clearTimeout(this.salamAnimReset);
            this.salamAnimReset = null;
        }

        const idle   = this.salamGifIdle;
        const action = this.salamGifAction;

        if (type === 'idle') {
            idle.style.display   = 'block';
            action.style.display = 'none';
            action.src = '';
        } else {
            action.src = `assets/salameche/sprite/${type}.gif`;
            requestAnimationFrame(() => {
                action.style.display = 'block';
                idle.style.display   = 'none';
            });
            const duration = SALAM_ANIM_DURATIONS[type] ?? 1200;
            this.salamAnimReset = setTimeout(() => {
                this.playSalamAnim('idle');
                this.salamAnimReset = null;
            }, duration);
        }
    }

    private createPlayerHUD(player: import('../core/entities/Player').Player): void {
        const { height } = this.scale;
        // Ancré au BAS du sprite pour que la barre HP et les statuts s'affichent en dessous
        const spriteBottom = height * ROAD_RATIO_PLAYER + this.playerSpriteHalfH;
        this.playerHUD = new PlayerHUD(this, PLAYER_SPRITE_X, spriteBottom, player);

        const spriteZone = this.add.zone(PLAYER_SPRITE_X, height * ROAD_RATIO_PLAYER, 280, 380)
            .setInteractive({ cursor: 'default' });
        spriteZone.on('pointerover', () => this.playerHUD.showPanel());
        spriteZone.on('pointerout',  () => this.playerHUD.hidePanel());
    }

    private createBottomBar(player: import('../core/entities/Player').Player): void {
        this.bottomBar = new BottomBar(this, player);
    }

    // ─── Main ─────────────────────────────────────────────────────────────────

    private rebuildHand(): void {
        this.cardViews.forEach(v => v.destroy());
        this.cardViews = [];

        const hand = this.engine.player.hand;
        if (hand.length === 0) return;

        const { width, height } = this.scale;
        const cardW  = CardView.WIDTH;
        const count  = hand.length;
        const half   = (count - 1) / 2;

        // ── Fan parameters (style Slay the Spire) ────────────────────────────
        // Rotation modérée : bords à ±MAX_ANGLE_DEG
        const MAX_ANGLE_DEG = 7;
        // Arc vertical subtil
        const ARC_LIFT = 4;

        // Espacement compact : fort chevauchement comme STS
        const maxTotalW = width * 0.60;
        const spacing   = count > 1
            ? Math.min(cardW * 0.52, (maxTotalW - cardW) / (count - 1))
            : 0;
        const totalW = (count - 1) * spacing + cardW;
        const startX = width / 2 - totalW / 2 + cardW / 2;

        // Style STS : ~45 % de la carte visible, le reste enfoui dans le bas
        //   visible = 0.45 * H  →  baseY = height + 0.05 * H
        const baseY = height + CardView.HEIGHT * 0.05;

        hand.forEach((card, i) => {
            const offset   = i - half;                                     // -half … +half
            const angleDeg = count > 1 ? offset * (MAX_ANGLE_DEG / half) : 0;
            const rotation = Phaser.Math.DegToRad(angleDeg);
            const yArc     = -Math.abs(offset) * ARC_LIFT;                // bords remontent
            const depth    = i + 1;                                        // gauche derrière, droite devant

            const view = new CardView({
                scene: this,
                card,
                x: startX + i * spacing,
                y: baseY + yArc,
            });
            view.setFanLayout(rotation, depth);
            view.updatePreview(this.engine.player, null);
            this.input.setDraggable(view);
            this.cardViews.push(view);
        });
    }

    // ─── Drag & Drop ──────────────────────────────────────────────────────────

    private setupDragDrop(): void {
        this.dragArrow    = this.add.graphics().setDepth(50);
        this.targetRingGfx = this.add.graphics().setDepth(6);

        this.input.on('dragstart', (_ptr: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject) => {
            const view = obj as CardView;
            if (this.inputLocked || this.engine.phase !== CombatPhase.PLAYER_TURN) return;
            this.draggedCard       = view;
            this.dragOrigX         = view.x;
            this.dragOrigY         = view.y;
            this.dragOrigRotation  = view.rotation;
            view.setDepth(200);
            this.tweens.add({ targets: view, scaleX: 1.08, scaleY: 1.08, rotation: 0, duration: 100, ease: 'Back.easeOut' });
        });

        this.input.on('drag', (_ptr: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject, x: number, y: number) => {
            const view = obj as CardView;
            view.x = x;
            view.y = y;
            if (!this.draggedCard) return;
            this.drawBezierArrow(this.dragOrigX, this.dragOrigY - 20, x, y);
        });

        this.input.on('dragenter', (_ptr: Phaser.Input.Pointer, _obj: Phaser.GameObjects.GameObject, zone: Phaser.GameObjects.Zone) => {
            const enemyId = (zone as any).enemyId as string | undefined;
            if (enemyId) {
                this.hoveredEnemyId = enemyId;
                const ev = this.enemyViews.find(v => v.enemy.id === enemyId);
                if (ev) {
                    this.showEnemyTargetRing(ev.x, ev.y, true);
                    // Preview avec la vulnérabilité de la cible
                    this.draggedCard?.updatePreview(this.engine.player, ev.enemy);
                }
            }
        });

        this.input.on('dragleave', (_ptr: Phaser.Input.Pointer, _obj: Phaser.GameObjects.GameObject, zone: Phaser.GameObjects.Zone) => {
            const enemyId = (zone as any).enemyId as string | undefined;
            if (enemyId) {
                if (this.hoveredEnemyId === enemyId) this.hoveredEnemyId = null;
                this.showEnemyTargetRing(0, 0, false);
                // Retour au preview joueur seul (sans cible)
                this.draggedCard?.updatePreview(this.engine.player, null);
            }
        });

        this.input.on('drop', (_ptr: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject, zone: Phaser.GameObjects.Zone) => {
            const view = obj as CardView;
            const enemyId = (zone as any).enemyId as string | undefined;
            this.dragArrow.clear();
            this.showEnemyTargetRing(0, 0, false);
            this.hoveredEnemyId = null;
            this.playDraggedCard(view, enemyId ?? null);
        });

        this.input.on('dragend', (_ptr: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject, dropped: boolean) => {
            const view = obj as CardView;
            this.dragArrow.clear();
            this.showEnemyTargetRing(0, 0, false);
            this.hoveredEnemyId = null;
            if (!dropped) {
                const { height } = this.scale;
                // Tolérance généreuse : lâcher n'importe où dans les 70% du haut joue la carte
                // sur l'ennemi le plus proche (ou la cible sélectionnée)
                if (view.y < height * 0.70) {
                    const nearest = this.findNearestEnemy(view.x, view.y);
                    this.playDraggedCard(view, nearest ?? this.selectedTarget ?? this.engine.enemies.find(e => !e.isDead)?.id ?? null);
                } else {
                    this.tweens.add({
                        targets: view,
                        x: this.dragOrigX, y: this.dragOrigY,
                        rotation: this.dragOrigRotation,
                        scaleX: 1, scaleY: 1,
                        duration: 220, ease: 'Back.easeOut',
                        onComplete: () => { view.setDepth(view.getBaseDepth()); },
                    });
                }
            }
            this.draggedCard = null;
        });
    }

    // ── Utilitaires ciblage ───────────────────────────────────────────────────

    /** Renvoie l'id de l'ennemi vivant le plus proche du point (x, y). */
    private findNearestEnemy(x: number, y: number): string | null {
        const living = this.enemyViews.filter(v => !v.enemy.isDead);
        if (living.length === 0) return null;
        let best = living[0];
        let bestDist = Phaser.Math.Distance.Between(x, y, best.x, best.y);
        for (const ev of living.slice(1)) {
            const d = Phaser.Math.Distance.Between(x, y, ev.x, ev.y);
            if (d < bestDist) { bestDist = d; best = ev; }
        }
        return best.enemy.id;
    }

    // ── Flèche bezier ─────────────────────────────────────────────────────────
    private drawBezierArrow(sx: number, sy: number, ex: number, ey: number): void {
        const g = this.dragArrow;
        g.clear();

        // Point de contrôle : légèrement au-dessus du milieu pour un arc naturel
        const cpx = (sx + ex) / 2;
        const cpy = Math.min(sy, ey) - 80;

        const STEPS = 32;
        const pts: { x: number; y: number }[] = [];
        for (let i = 0; i <= STEPS; i++) {
            const t = i / STEPS;
            const it = 1 - t;
            pts.push({
                x: it * it * sx + 2 * it * t * cpx + t * t * ex,
                y: it * it * sy + 2 * it * t * cpy + t * t * ey,
            });
        }

        // Couche glow (large, transparente)
        g.lineStyle(12, 0xe74c3c, 0.12);
        g.beginPath(); g.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) g.lineTo(pts[i].x, pts[i].y);
        g.strokePath();

        // Ligne principale (épaisse, orange-dorée)
        g.lineStyle(4, 0xf39c12, 0.88);
        g.beginPath(); g.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) g.lineTo(pts[i].x, pts[i].y);
        g.strokePath();

        // Points espacés le long de la courbe (effet tirets stylisés)
        for (let i = 4; i < pts.length - 4; i += 5) {
            const t = i / STEPS;
            g.fillStyle(0xffffff, 0.55 * t);
            g.fillCircle(pts[i].x, pts[i].y, 2.5);
        }

        // Tête de flèche orientée selon la tangente finale
        const tail = pts[pts.length - 4];
        const tip  = pts[pts.length - 1];
        const ang  = Math.atan2(tip.y - tail.y, tip.x - tail.x);
        const tLen = 20;
        const tAng = 0.42;
        // Glow derrière la pointe
        g.fillStyle(0xe74c3c, 0.25);
        g.fillTriangle(
            tip.x + Math.cos(ang) * (tLen + 8),           tip.y + Math.sin(ang) * (tLen + 8),
            tip.x + Math.cos(ang - tAng) * (tLen + 8),   tip.y + Math.sin(ang - tAng) * (tLen + 8),
            tip.x + Math.cos(ang + tAng) * (tLen + 8),   tip.y + Math.sin(ang + tAng) * (tLen + 8),
        );
        // Pointe solide
        g.fillStyle(0xe74c3c, 0.95);
        g.fillTriangle(
            tip.x + Math.cos(ang) * tLen,         tip.y + Math.sin(ang) * tLen,
            tip.x + Math.cos(ang - tAng) * tLen,  tip.y + Math.sin(ang - tAng) * tLen,
            tip.x + Math.cos(ang + tAng) * tLen,  tip.y + Math.sin(ang + tAng) * tLen,
        );
    }

    // ── Ring de ciblage (hover drag ou ennemi sélectionné) ────────────────────
    private showEnemyTargetRing(x: number, y: number, visible: boolean): void {
        if (this.targetRingTween) { this.targetRingTween.destroy(); this.targetRingTween = null; }
        this.targetRingGfx.clear();
        if (!visible) return;

        const drawRing = (alpha: number) => {
            this.targetRingGfx.clear();
            this.targetRingGfx.lineStyle(2.5, 0xe74c3c, alpha);
            this.targetRingGfx.strokeCircle(x, y, 58);
            this.targetRingGfx.lineStyle(1.5, 0xf39c12, alpha * 0.6);
            this.targetRingGfx.strokeCircle(x, y, 68);
            // Quatre petites encoches aux coins
            for (let i = 0; i < 4; i++) {
                const a = (i * Math.PI / 2) + Math.PI / 4;
                const r1 = 56, r2 = 62;
                this.targetRingGfx.lineStyle(2, 0xffffff, alpha * 0.8);
                this.targetRingGfx.lineBetween(
                    x + Math.cos(a) * r1, y + Math.sin(a) * r1,
                    x + Math.cos(a) * r2, y + Math.sin(a) * r2,
                );
            }
        };

        drawRing(0.9);
        const proxy = { alpha: 0.9 };
        this.targetRingTween = this.tweens.add({
            targets: proxy,
            alpha: 0.35,
            duration: 550,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            onUpdate: () => drawRing(proxy.alpha),
        });
    }

    // ── Effet d'impact sur l'ennemi ───────────────────────────────────────────
    private showImpactEffect(x: number, y: number): void {
        // Anneau d'onde de choc
        const ring = this.add.graphics().setDepth(102);
        ring.lineStyle(5, 0xffffff, 1);
        ring.strokeCircle(x, y, 14);
        this.tweens.add({
            targets: ring, scaleX: 3.5, scaleY: 3.5, alpha: 0,
            duration: 380, ease: 'Power2',
            onComplete: () => ring.destroy(),
        });
        // Flash orange central
        const flash = this.add.graphics().setDepth(103);
        flash.fillStyle(0xf39c12, 0.92);
        flash.fillCircle(x, y, 22);
        this.tweens.add({
            targets: flash, scaleX: 2.2, scaleY: 2.2, alpha: 0,
            duration: 220, ease: 'Power3',
            onComplete: () => flash.destroy(),
        });
        // Éclats radiaux (8 traits courts)
        const sparks = this.add.graphics().setDepth(101);
        for (let i = 0; i < 8; i++) {
            const a = (i / 8) * Math.PI * 2;
            const r0 = 18, r1 = 38;
            sparks.lineStyle(2, i % 2 === 0 ? 0xffffff : 0xf39c12, 0.9);
            sparks.lineBetween(
                x + Math.cos(a) * r0, y + Math.sin(a) * r0,
                x + Math.cos(a) * r1, y + Math.sin(a) * r1,
            );
        }
        this.tweens.add({
            targets: sparks, scaleX: 2, scaleY: 2, alpha: 0,
            duration: 300, ease: 'Power2',
            onComplete: () => sparks.destroy(),
        });
    }

    private playDraggedCard(view: CardView, targetId: string | null): void {
        if (this.inputLocked || this.engine.phase !== CombatPhase.PLAYER_TURN) {
            this.returnCard(view);
            return;
        }
        if (!this.engine.player.canPlayCard(view.card.cost)) {
            this.shakeCard(view);
            this.returnCard(view);
            return;
        }
        this.inputLocked = true;
        view.setDepth(200);
        this.triggerPlayerAnim(view.card.definition.type);

        // Reset scale des ennemis
        this.enemyViews.forEach(ev => { this.tweens.killTweensOf(ev); ev.setAlpha(1); this.tweens.add({ targets: ev, scaleX: 1, scaleY: 1, duration: 80 }); });

        const resolvedTargetId = targetId ?? this.engine.enemies.find(e => !e.isDead)?.id ?? null;
        const targetEv = this.enemyViews.find(v => v.enemy.id === resolvedTargetId);
        const isAttack = view.card.definition.type === CardType.ATTACK;

        // Pour les attaques : la carte vole vers l'ennemi → impact → résolution
        const tx = isAttack && targetEv ? targetEv.x : undefined;
        const ty = isAttack && targetEv ? targetEv.y : undefined;

        view.playCardAnimation(() => {
            if (isAttack && tx !== undefined && ty !== undefined) {
                this.showImpactEffect(tx, ty);
            }
            const played = this.engine.playCard(view.card.instanceId, resolvedTargetId ?? undefined);
            if (played) this.refreshAllUI();
            this.inputLocked = false;
        }, tx, ty);
    }

    private returnCard(view: CardView): void {
        this.tweens.add({
            targets: view,
            x: this.dragOrigX,
            y: this.dragOrigY,
            rotation: this.dragOrigRotation,
            scaleX: 1, scaleY: 1,
            duration: 220,
            ease: 'Back.easeOut',
            onComplete: () => { view.setDepth(view.getBaseDepth()); },
        });
    }

    private onCardClick(card: CardInstance, view: CardView): void {
        if (this.inputLocked) return;
        if (this.engine.phase !== CombatPhase.PLAYER_TURN) return;
        if (!this.engine.player.canPlayCard(card.cost)) {
            this.shakeCard(view);
            return;
        }

        const resolvedTargetId = this.selectedTarget ?? this.engine.enemies.find(e => !e.isDead)?.id ?? null;
        const targetEv = this.enemyViews.find(v => v.enemy.id === resolvedTargetId);
        const isAttack = card.definition.type === CardType.ATTACK;

        this.inputLocked = true;
        this.triggerPlayerAnim(card.definition.type);

        const tx = isAttack && targetEv ? targetEv.x : undefined;
        const ty = isAttack && targetEv ? targetEv.y : undefined;

        view.playCardAnimation(() => {
            if (isAttack && tx !== undefined && ty !== undefined) {
                this.showImpactEffect(tx, ty);
            }
            const played = this.engine.playCard(card.instanceId, resolvedTargetId ?? undefined);
            if (played) this.refreshAllUI();
            this.inputLocked = false;
        }, tx, ty);
    }

    /** Déclenche l'animation du joueur selon le type de carte joué. */
    private triggerPlayerAnim(cardType: CardType): void {
        // Bulbizarre
        if (this.bulbiGifIdle) {
            if (cardType === CardType.ATTACK) {
                this.playBulbiAnim('attaque');
            } else if (cardType === CardType.SKILL || cardType === CardType.POWER) {
                this.playBulbiAnim('competence');
            }
            return;
        }
        // Salamèche
        if (this.salamGifIdle) {
            if (cardType === CardType.ATTACK) {
                this.playSalamAnim('attaque');
            } else if (cardType === CardType.SKILL || cardType === CardType.POWER) {
                this.playSalamAnim('competence');
            }
        }
    }

    private shakeCard(view: CardView): void {
        this.tweens.add({
            targets: view,
            x: view.x + 6,
            duration: 40,
            yoyo: true,
            repeat: 3,
        });
    }

    // ─── End Turn ─────────────────────────────────────────────────────────────

    private createEndTurnButton(): void {
        const { width, height: _h } = this.scale;
        const height = _h;
        const btn = this.add.container(width - 80, height / 2);

        const bg = this.add.graphics();
        const drawBg = (hover: boolean) => {
            bg.clear();
            bg.fillStyle(hover ? 0x27ae60 : 0x1e8449, 1);
            bg.fillRoundedRect(-55, -30, 110, 60, 12);
            bg.lineStyle(2, hover ? 0x2ecc71 : 0x27ae60, 1);
            bg.strokeRoundedRect(-55, -30, 110, 60, 12);
        };
        drawBg(false);

        const label = this.add.text(0, 0, 'Fin\nde Tour', {
            fontSize: '14px', fontFamily: 'Georgia, serif',
            color: '#fff', align: 'center',
        }).setOrigin(0.5);

        btn.add([bg, label]);

        const zone = this.add.zone(0, 0, 110, 60).setInteractive({ cursor: 'pointer' });
        zone.on('pointerover', () => drawBg(true));
        zone.on('pointerout', () => drawBg(false));
        zone.on('pointerup', () => {
            if (this.inputLocked) return;
            if (this.engine.phase !== CombatPhase.PLAYER_TURN) return;
            this.inputLocked = true;
            this.engine.endPlayerTurn();
            this.inputLocked = false;
        });
        btn.add(zone);

        this._endTurnBtn = btn;
    }

    // ─── Log ──────────────────────────────────────────────────────────────────

    private createLogPanel(): void {
        const { width } = this.scale;
        const bg = this.add.graphics();
        bg.fillStyle(0x000000, 0.5);
        bg.fillRoundedRect(width - 200, 40, 190, 200, 8);

        this.logText = this.add.text(width - 194, 48, '', {
            fontSize: '9px',
            fontFamily: 'monospace',
            color: '#bdc3c7',
            wordWrap: { width: 180 },
        });
    }

    private createPhaseText(): void {
        this.phaseText = this.add.text(this.scale.width / 2, 36, '', {
            fontSize: '14px',
            fontFamily: 'Georgia, serif',
            color: '#f39c12',
            stroke: '#000',
            strokeThickness: 2,
        }).setOrigin(0.5).setDepth(20);
    }

    // ─── Engine Events ────────────────────────────────────────────────────────

    private registerEngineEvents(): void {
        this.engine.on('phase_changed', (e) => {
            const phase = e.payload?.phase as CombatPhase;
            this.onPhaseChanged(phase);
        });

        this.engine.on('card_drawn', () => {
            this.rebuildHand();
        });

        this.engine.on('card_played', () => {
            this.rebuildHand();
            this.refreshEnemies();
            this.playerHUD?.refresh();
            this.bottomBar?.refresh();
        });

        this.engine.on('card_discarded', () => {
            this.rebuildHand();
        });

        this.engine.on('damage_dealt', (e) => {
            const targetId = e.payload?.targetId as string;
            const amount = e.payload?.amount as number;
            this.showDamageNumber(targetId, amount);

            const enemyView = this.enemyViews.find(v => v.enemy.id === targetId);
            if (enemyView) {
                enemyView.playHitAnimation();
                enemyView.refresh();
            } else {
                // Dégâts au joueur
                this.cameras.main.shake(150, 0.008);
                this.shakePlayerSprite();
                this.playerHUD?.refresh();
            }
        });

        this.engine.on('block_gained', () => {
            this.playerHUD?.refresh();
            this.refreshEnemies();
        });

        this.engine.on('status_applied', () => {
            this.playerHUD?.refresh();
            this.refreshEnemies();
        });

        this.engine.on('enemy_action', (e) => {
            const id = e.payload?.enemyId as string;
            const view = this.enemyViews.find(v => v.enemy.id === id);
            view?.playActionAnim();
        });

        this.engine.on('enemy_died', (e) => {
            const id = e.payload?.enemyId as string;
            const view = this.enemyViews.find(v => v.enemy.id === id);
            view?.playDeathAnimation(() => view.setVisible(false));
        });

        this.engine.on('log_entry', (e) => {
            const msg = e.payload?.message as string;
            const lines = this.logText.text.split('\n');
            lines.push(msg);
            if (lines.length > 18) lines.shift();
            this.logText.setText(lines.join('\n'));
        });

        this.engine.on('combat_victory', () => {
            this.inputLocked = true;
            this.time.delayedCall(800, () => this.onVictory());
        });

        this.engine.on('combat_defeat', () => {
            this.inputLocked = true;
            this.time.delayedCall(800, () => this.onDefeat());
        });
    }

    private onPhaseChanged(phase: CombatPhase): void {
        const labels: Partial<Record<CombatPhase, string>> = {
            [CombatPhase.PLAYER_TURN]: 'Votre Tour',
            [CombatPhase.ENEMY_TURN]: 'Tour Ennemi',
            [CombatPhase.DRAW_PHASE]: 'Pioche...',
            [CombatPhase.VICTORY]: 'VICTOIRE !',
            [CombatPhase.DEFEAT]: 'DÉFAITE...',
        };
        const label = labels[phase] ?? '';
        this.phaseText.setText(label);

        if (phase === CombatPhase.PLAYER_TURN) {
            this.refreshAllUI();
        }
        if (phase === CombatPhase.ENEMY_TURN) {
            this.cardViews.forEach(v => v.disableInteractive());
            this.refreshEnemies();
            // Lancer le traitement séquentiel des ennemis (gauche → droite)
            // Délai initial : laisse le temps aux animations de carte de finir
            this.time.delayedCall(350, () => this.processNextEnemyStep());
        }
        if (phase === CombatPhase.DRAW_PHASE) {
            this.playerHUD?.refresh();
            this.bottomBar?.refresh();
        }
    }

    /**
     * Traite le prochain ennemi dans la file, puis se rappelle après un délai
     * pour laisser les animations se terminer. S'arrête dès que le tour ennemi est fini.
     */
    private processNextEnemyStep(): void {
        if (this.engine.phase !== CombatPhase.ENEMY_TURN) return;

        const hasMore = this.engine.resolveNextEnemy();

        if (hasMore) {
            // Attendre que l'animation d'attaque + dégâts soit visible avant le prochain ennemi
            this.time.delayedCall(750, () => this.processNextEnemyStep());
        } else {
            // Plus d'ennemis dans la file — appel final pour déclencher startPlayerTurn()
            this.time.delayedCall(600, () => {
                if (this.engine.phase === CombatPhase.ENEMY_TURN) {
                    this.engine.resolveNextEnemy();
                }
            });
        }
    }

    private refreshAllUI(): void {
        this.rebuildHand();
        this.refreshEnemies();
        this.playerHUD?.refresh();
        this.bottomBar?.refresh();
    }

    private refreshEnemies(): void {
        this.enemyViews.forEach(v => v.refresh());
    }

    private shakePlayerSprite(): void {
        if (!this.playerSprite) return;
        const baseX = PLAYER_SPRITE_X;
        this.tweens.add({
            targets: this.playerSprite,
            x: baseX - 12,
            duration: 50,
            yoyo: true,
            repeat: 2,
            onComplete: () => { this.playerSprite.x = baseX; },
        });
    }

    private showDamageNumber(targetId: string, amount: number): void {
        let x = this.scale.width / 2;
        let y = this.scale.height / 2;

        if (targetId === this.engine.player.id) {
            x = PLAYER_SPRITE_X;
            y = this.scale.height * ROAD_RATIO_PLAYER - 90;
        } else {
            const view = this.enemyViews.find(v => v.enemy.id === targetId);
            if (view) { x = view.x; y = view.y - 30; }
        }

        const dmgText = this.add.text(x + (Math.random() * 30 - 15), y, `-${amount}`, {
            fontSize: '22px',
            fontFamily: 'Georgia, serif',
            color: '#e74c3c',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5).setDepth(30);

        this.tweens.add({
            targets: dmgText,
            y: dmgText.y - 50,
            alpha: 0,
            duration: 800,
            ease: 'Power2',
            onComplete: () => dmgText.destroy(),
        });
    }

    // ─── Fin de combat ────────────────────────────────────────────────────────

    private onVictory(): void {
        RunManager.instance.syncFromPlayer(this.engine.player);
        RunManager.instance.markNodeCompleted(this.nodeId);

        this.cameras.main.fadeOut(500, 255, 215, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('RewardScene', {
                nodeId: this.nodeId,
                isElite: false,
                isBoss: false,
            });
        });
    }

    private onDefeat(): void {
        this.cameras.main.fadeOut(600, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('GameOver');
        });
    }
}
