import { Scene } from 'phaser';
import { CombatEngine } from '../core/combat/CombatEngine';
import { RunManager } from '../core/RunManager';
import { CardView } from '../ui/CardView';
import { EnemyView } from '../ui/EnemyView';
import { PlayerHUD, BottomBar } from '../ui/PlayerHUD';
import { CombatPhase } from '../core/types';
import { CardInstance } from '../core/cards/CardInstance';

export interface BattleSceneData {
    enemyIds: string[];
    nodeId: string;
    isElite?: boolean;
    isBoss?: boolean;
}

// Coordonnées du champ de bataille — calibrées sur background.jpg
// La route sablonneuse est à ~70-72% de la hauteur (768px → y ≈ 538-552)
const PLAYER_X_RATIO    = 0.30;   // x = width * 0.30 — avancé vers le centre
const ROAD_RATIO_PLAYER = 0.68;
const ROAD_RATIO_ENEMY  = 0.67;
// Alias calculé après init (nécessaire pour shake/damage)
let PLAYER_SPRITE_X = 300;

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

    // ── Drag & drop ───────────────────────────────────────────────────────────
    private draggedCard: CardView | null = null;
    private dragOrigX = 0;
    private dragOrigY = 0;
    private dragOrigRotation = 0;
    private dragArrow!: Phaser.GameObjects.Graphics;
    private dropZones: Phaser.GameObjects.Zone[] = [];

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
        const spacing = 150;
        const rightZoneCenter = width * 0.73;
        const startX = rightZoneCenter - ((enemies.length - 1) * spacing) / 2;

        this.dropZones = [];

        enemies.forEach((enemy, i) => {
            const ex = startX + i * spacing;
            const ey = height * ROAD_RATIO_ENEMY;

            const view = new EnemyView(this, ex, ey, enemy);
            this.enemyViews.push(view);

            // EnemyView configure son propre interactive — on ajoute juste le clic
            view.on('pointerup', () => this.onEnemyClick(enemy.id));

            // Zone de dépôt de carte sur cet ennemi
            const dz = this.add.zone(ex, ey, 160, 200)
                .setRectangleDropZone(160, 200);
            (dz as any).enemyId = enemy.id;
            this.dropZones.push(dz);
        });
    }

    private onEnemyClick(enemyId: string): void {
        this.selectedTarget = this.selectedTarget === enemyId ? null : enemyId;
        this.refreshEnemyHighlights();
    }

    private refreshEnemyHighlights(): void {
        for (const view of this.enemyViews) {
            view.setAlpha(this.selectedTarget && view.enemy.id !== this.selectedTarget ? 0.6 : 1);
        }
    }

    // ─── Joueur ───────────────────────────────────────────────────────────────

    private createPlayerSprite(): void {
        const { height } = this.scale;
        const spriteY = height * ROAD_RATIO_PLAYER;

        const container = this.add.container(PLAYER_SPRITE_X, spriteY);

        // Bulbasaur source ≈ 80px × 4.55 = 364px → demi = 182px
        const PLAYER_SCALE     = 4.55;
        const PLAYER_HALF_H    = Math.round(80 * PLAYER_SCALE / 2);

        const shadow = this.add.graphics();
        shadow.fillStyle(0x000000, 0.25);
        shadow.fillEllipse(0, PLAYER_HALF_H, 210, 34);
        container.add(shadow);

        if (this.textures.exists('bulbasaur_sprite')) {
            const sprite = this.add.image(0, 0, 'bulbasaur_sprite');
            sprite.setScale(PLAYER_SCALE);
            sprite.setFlipX(true);
            container.add(sprite);
        } else {
            const g = this.add.graphics();
            const s = 2.86;  // 2.2 * S
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

    private createPlayerHUD(player: import('../core/entities/Player').Player): void {
        const { height } = this.scale;
        // Bulbasaur × 4.55 → demi-hauteur ≈ 182px
        const PLAYER_HALF_H = Math.round(80 * 4.55 / 2);
        const spriteTop = height * ROAD_RATIO_PLAYER - PLAYER_HALF_H;
        this.playerHUD = new PlayerHUD(this, PLAYER_SPRITE_X, spriteTop, player);

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
            this.input.setDraggable(view);
            this.cardViews.push(view);
        });
    }

    // ─── Drag & Drop ──────────────────────────────────────────────────────────

    private setupDragDrop(): void {
        this.dragArrow = this.add.graphics().setDepth(50);

        this.input.on('dragstart', (_ptr: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject) => {
            const view = obj as CardView;
            if (this.inputLocked || this.engine.phase !== CombatPhase.PLAYER_TURN) return;
            this.draggedCard       = view;
            this.dragOrigX         = view.x;
            this.dragOrigY         = view.y;
            this.dragOrigRotation  = view.rotation;
            view.setDepth(200);
            view.setScale(1.06);
            // Redresser la carte pendant le drag
            this.tweens.add({ targets: view, rotation: 0, duration: 80, ease: 'Power2' });
        });

        this.input.on('drag', (_ptr: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject, x: number, y: number) => {
            const view = obj as CardView;
            view.x = x;
            view.y = y;

            // Flèche de ciblage du point de départ vers la carte
            this.dragArrow.clear();
            if (!this.draggedCard) return;
            this.dragArrow.lineStyle(3, 0xf39c12, 0.7);
            this.dragArrow.beginPath();
            this.dragArrow.moveTo(this.dragOrigX, this.dragOrigY - 30);
            this.dragArrow.lineTo(x, y);
            this.dragArrow.strokePath();
            // Pointe de flèche
            const angle = Math.atan2(y - (this.dragOrigY - 30), x - this.dragOrigX);
            this.dragArrow.fillStyle(0xf39c12, 0.9);
            this.dragArrow.fillTriangle(
                x + Math.cos(angle) * 14,        y + Math.sin(angle) * 14,
                x + Math.cos(angle - 2.4) * 14,  y + Math.sin(angle - 2.4) * 14,
                x + Math.cos(angle + 2.4) * 14,  y + Math.sin(angle + 2.4) * 14,
            );
        });

        this.input.on('dragenter', (_ptr: Phaser.Input.Pointer, _obj: Phaser.GameObjects.GameObject, zone: Phaser.GameObjects.Zone) => {
            const enemyId = (zone as any).enemyId as string | undefined;
            if (enemyId) {
                const ev = this.enemyViews.find(v => v.enemy.id === enemyId);
                ev?.setAlpha(0.75);
                this.tweens.add({ targets: ev, scaleX: 1.1, scaleY: 1.1, duration: 80 });
            }
        });

        this.input.on('dragleave', (_ptr: Phaser.Input.Pointer, _obj: Phaser.GameObjects.GameObject, zone: Phaser.GameObjects.Zone) => {
            const enemyId = (zone as any).enemyId as string | undefined;
            if (enemyId) {
                const ev = this.enemyViews.find(v => v.enemy.id === enemyId);
                ev?.setAlpha(1);
                this.tweens.add({ targets: ev, scaleX: 1, scaleY: 1, duration: 80 });
            }
        });

        this.input.on('drop', (_ptr: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject, zone: Phaser.GameObjects.Zone) => {
            const view = obj as CardView;
            const enemyId = (zone as any).enemyId as string | undefined;
            this.dragArrow.clear();
            this.playDraggedCard(view, enemyId ?? null);
        });

        this.input.on('dragend', (_ptr: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject, dropped: boolean) => {
            const view = obj as CardView;
            this.dragArrow.clear();
            if (!dropped) {
                // Carte non déposée sur une zone valide
                const { height } = this.scale;
                // Si la carte a été glissée dans la moitié haute (zone de jeu) → jouer sans cible spécifique
                if (view.y < height * 0.60) {
                    this.playDraggedCard(view, this.selectedTarget ?? this.engine.enemies[0]?.id ?? null);
                } else {
                    // Retour à la position et rotation d'origine
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
            }
            this.draggedCard = null;
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
        view.setScale(1);
        view.setDepth(0);
        view.playCardAnimation(() => {
            const played = this.engine.playCard(view.card.instanceId, targetId ?? undefined);
            if (played) this.refreshAllUI();
            this.inputLocked = false;
        });
        // Réinitialiser l'alpha des ennemis
        this.enemyViews.forEach(ev => { ev.setAlpha(1); this.tweens.add({ targets: ev, scaleX: 1, scaleY: 1, duration: 80 }); });
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

        const targetId = this.selectedTarget ?? this.engine.enemies[0]?.id;

        this.inputLocked = true;
        view.playCardAnimation(() => {
            const played = this.engine.playCard(card.instanceId, targetId);
            if (played) {
                this.refreshAllUI();
            }
            this.inputLocked = false;
        });
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
        }
        if (phase === CombatPhase.DRAW_PHASE) {
            this.playerHUD?.refresh();
            this.bottomBar?.refresh();
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
