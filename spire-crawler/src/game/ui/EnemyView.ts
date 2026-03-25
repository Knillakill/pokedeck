import Phaser from 'phaser';
import { Enemy } from '../core/entities/Enemy';
import { IntentIcon } from './IntentIcon';
import { sc, fz } from '../config';

// Dimensions placeholder procédural
const ENEMY_W    = sc(130);
const ENEMY_H    = sc(160);

const SPRITE_SCALE   = 3.6;   // 2.8 * S
// Pidgey ≈ 80px source × SPRITE_SCALE / 2
const SPRITE_HALF_H  = Math.round(80 * SPRITE_SCALE / 2);

// Mini barre (toujours visible)
const MINI_W = sc(130);
const MINI_H = sc(18);

// Panneau complet (survol)
const FULL_W  = sc(160);
const FULL_H  = sc(10);
const PANEL_H = sc(108);

export class EnemyView extends Phaser.GameObjects.Container {
    enemy: Enemy;
    private gfxBody: Phaser.GameObjects.Graphics;
    private miniBarGfx: Phaser.GameObjects.Graphics;
    private miniHpText!: Phaser.GameObjects.Text;
    private miniShieldGfx!: Phaser.GameObjects.Graphics;
    private miniShieldText!: Phaser.GameObjects.Text;
    private infoPanel!: Phaser.GameObjects.Container;
    private fullHpBar!: Phaser.GameObjects.Graphics;
    private hpText!: Phaser.GameObjects.Text;
    private blockBadge!: Phaser.GameObjects.Container;
    private nameText!: Phaser.GameObjects.Text;
    private statusContainer!: Phaser.GameObjects.Container;
    intentIcon: IntentIcon;
    private usingSprite: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, enemy: Enemy) {
        super(scene, x, y);
        this.enemy = enemy;

        const texKey = `enemy_sprite_${enemy.definition.id}`;
        this.usingSprite = scene.textures.exists(texKey);
        const sh = this.usingSprite ? SPRITE_HALF_H : ENEMY_H / 2;

        // ── Corps / sprite ───────────────────────────────────────────────────
        this.gfxBody = scene.add.graphics();
        if (this.usingSprite) {
            scene.textures.get(texKey).setFilter(Phaser.Textures.FilterMode.LINEAR);
            const img = scene.add.image(0, 0, texKey).setScale(SPRITE_SCALE);
            const shadow = scene.add.graphics();
            shadow.fillStyle(0x000000, 0.22);
            shadow.fillEllipse(0, sh + 6, FULL_W, 18);
            this.add([shadow, img]);
        } else {
            this.draw();
        }

        // ── Intent icon (au-dessus de tout) ──────────────────────────────────
        this.intentIcon = new IntentIcon(scene, 0, -sh - PANEL_H - 48);

        // ── Panneau info complet (survol, caché par défaut) ───────────────────
        this.buildInfoPanel(scene, sh, enemy.name);
        this.infoPanel.setVisible(false);
        this.infoPanel.setDepth(8);

        // ── Mini barre HP (toujours visible) ──────────────────────────────────
        this.miniBarGfx   = scene.add.graphics();
        const barCY = -sh - MINI_H / 2 - 4;
        this.miniHpText   = scene.add.text(0, barCY, '', {
            fontSize: fz(10), fontFamily: 'Georgia, serif', fontStyle: 'bold',
            color: '#fff', stroke: '#000', strokeThickness: 2, resolution: 2,
        }).setOrigin(0.5);
        this.miniShieldGfx  = scene.add.graphics();
        this.miniShieldText = scene.add.text(-MINI_W / 2 - 22, barCY, '', {
            fontSize: fz(10), fontFamily: 'Georgia, serif', fontStyle: 'bold',
            color: '#fff', stroke: '#000', strokeThickness: 2, resolution: 2,
        }).setOrigin(0.5);

        this.add([this.gfxBody, this.intentIcon, this.infoPanel,
            this.miniShieldGfx, this.miniShieldText, this.miniBarGfx, this.miniHpText]);

        // ── Interaction : hover affiche/cache le panneau ───────────────────────
        const hitH = sh * 2 + PANEL_H + 60;
        this.setSize(FULL_W + 30, hitH);
        this.setInteractive({ cursor: 'pointer' });
        this.on('pointerover', () => this.infoPanel.setVisible(true));
        this.on('pointerout',  () => this.infoPanel.setVisible(false));

        (scene.add as Phaser.GameObjects.GameObjectFactory).existing(
            this as unknown as Phaser.GameObjects.GameObject
        );
        this.refresh();
    }

    // ── Construction du panneau info ──────────────────────────────────────────

    private buildInfoPanel(scene: Phaser.Scene, sh: number, name: string): void {
        // Le panneau est ancré au bas au niveau du sommet du sprite
        this.infoPanel = scene.add.container(0, -sh - 10);

        const bg = scene.add.graphics();
        bg.fillStyle(0x000000, 0.75);
        bg.fillRoundedRect(-FULL_W / 2 - 10, -PANEL_H, FULL_W + 20, PANEL_H, 10);
        bg.lineStyle(1, 0x4a4a6a, 0.85);
        bg.strokeRoundedRect(-FULL_W / 2 - 10, -PANEL_H, FULL_W + 20, PANEL_H, 10);

        this.nameText = scene.add.text(0, -PANEL_H + 14, name, {
            fontSize: fz(15), fontFamily: 'Georgia, serif', fontStyle: 'bold',
            color: '#ecf0f1', stroke: '#000', strokeThickness: 3, resolution: 2,
        }).setOrigin(0.5);

        this.fullHpBar = scene.add.graphics();

        this.hpText = scene.add.text(0, -PANEL_H + 62, '', {
            fontSize: fz(13), fontFamily: 'Georgia, serif',
            color: '#ecf0f1', stroke: '#000', strokeThickness: 2, resolution: 2,
        }).setOrigin(0.5);

        this.blockBadge      = scene.add.container(0, -PANEL_H + 80);
        this.statusContainer = scene.add.container(0, -PANEL_H + 98);

        this.infoPanel.add([bg, this.nameText, this.fullHpBar, this.hpText,
            this.blockBadge, this.statusContainer]);
    }

    // ── Fallback procédural ───────────────────────────────────────────────────

    private draw(): void {
        this.gfxBody.clear();
        const isElite = this.enemy.definition.isElite;
        const isBoss  = this.enemy.definition.isBoss;
        const bodyColor = isBoss ? 0x8e44ad : isElite ? 0xe67e22 : 0x2c3e50;
        this.gfxBody.fillStyle(0x000000, 0.4);
        this.gfxBody.fillEllipse(4, 4, ENEMY_W, ENEMY_H);
        this.gfxBody.fillStyle(bodyColor, 1);
        this.gfxBody.fillEllipse(0, 0, ENEMY_W, ENEMY_H);
        this.gfxBody.lineStyle(2, isBoss ? 0xf39c12 : 0x7f8c8d, 1);
        this.gfxBody.strokeEllipse(0, 0, ENEMY_W, ENEMY_H);
        this.gfxBody.fillStyle(0xe74c3c, 1);
        this.gfxBody.fillCircle(-12, -8, 6);
        this.gfxBody.fillCircle(12, -8, 6);
        this.gfxBody.fillStyle(0xffffff, 1);
        this.gfxBody.fillCircle(-10, -9, 2);
        this.gfxBody.fillCircle(14, -9, 2);
    }

    // ── Refresh ───────────────────────────────────────────────────────────────

    refresh(): void {
        if (!this.scene) return;
        const e     = this.enemy;
        const sh    = this.usingSprite ? SPRITE_HALF_H : ENEMY_H / 2;
        const ratio = Math.max(0, e.hp / e.maxHp);
        const hpColor = ratio > 0.5 ? 0x27ae60 : ratio > 0.25 ? 0xf39c12 : 0xe74c3c;

        // ── Mini barre (toujours visible, au-dessus du sprite) ────────────────
        this.miniBarGfx.clear();
        this.miniShieldGfx.clear();
        const mx  = -MINI_W / 2;
        const my  = -sh - MINI_H - 4;
        const r   = MINI_H / 2;
        // Track
        this.miniBarGfx.fillStyle(0x0a0a14, 0.92);
        this.miniBarGfx.fillRoundedRect(mx - 1, my - 1, MINI_W + 2, MINI_H + 2, r + 1);
        this.miniBarGfx.fillStyle(0x1a1a2e, 1);
        this.miniBarGfx.fillRoundedRect(mx, my, MINI_W, MINI_H, r);
        // Remplissage HP
        if (ratio > 0) {
            this.miniBarGfx.fillStyle(hpColor, 1);
            this.miniBarGfx.fillRoundedRect(mx, my, MINI_W * ratio, MINI_H, r);
            // Reflet
            this.miniBarGfx.fillStyle(0xffffff, 0.15);
            this.miniBarGfx.fillRoundedRect(mx, my, MINI_W * ratio, MINI_H / 2, r);
        }
        // Bloc — overlay bleu par-dessus depuis la gauche
        if (e.block > 0) {
            const blockRatio = Math.min(e.block / e.maxHp, 1);
            this.miniBarGfx.fillStyle(0x2980b9, 0.75);
            this.miniBarGfx.fillRoundedRect(mx, my, MINI_W * blockRatio, MINI_H, r);
            this.miniBarGfx.fillStyle(0x74b9ff, 0.25);
            this.miniBarGfx.fillRoundedRect(mx, my, MINI_W * blockRatio, MINI_H / 2, r);
            // Bouclier à gauche
            const sx = -MINI_W / 2 - 22;
            const sy = my;
            this.miniShieldGfx.fillStyle(0x1a6fa8, 1);
            this.miniShieldGfx.fillRoundedRect(sx - 14, sy, 28, MINI_H, 6);
            this.miniShieldGfx.lineStyle(1.5, 0x74b9ff, 1);
            this.miniShieldGfx.strokeRoundedRect(sx - 14, sy, 28, MINI_H, 6);
            this.miniShieldText.setText(String(e.block));
            this.miniShieldText.setVisible(true);
        } else {
            this.miniShieldText.setVisible(false);
        }
        this.miniHpText.setY(-sh - MINI_H / 2 - 4);
        this.miniHpText.setText(`${e.hp}`);

        // ── Barre HP complète (dans le panneau) ───────────────────────────────
        this.fullHpBar.clear();
        const bx = -FULL_W / 2;
        const by = -PANEL_H + 32;
        this.fullHpBar.fillStyle(0x0a0a14, 0.9);
        this.fullHpBar.fillRoundedRect(bx - 3, by - 3, FULL_W + 6, FULL_H + 6, 7);
        this.fullHpBar.fillStyle(0x1a1a2e, 1);
        this.fullHpBar.fillRoundedRect(bx, by, FULL_W, FULL_H, 5);
        this.fullHpBar.fillStyle(hpColor, 1);
        this.fullHpBar.fillRoundedRect(bx, by, FULL_W * ratio, FULL_H, 5);
        this.fullHpBar.fillStyle(0xffffff, 0.12);
        this.fullHpBar.fillRoundedRect(bx, by, FULL_W * ratio, FULL_H / 2, 4);

        this.hpText.setText(`${e.hp} / ${e.maxHp} PV`);

        // ── Badge bloc ────────────────────────────────────────────────────────
        this.blockBadge.removeAll(true);
        if (e.block > 0) {
            const shield = this.scene.add.graphics();
            shield.fillStyle(0x2980b9, 0.9);
            shield.fillRoundedRect(-32, -13, 64, 26, 6);
            shield.lineStyle(1, 0x3498db, 1);
            shield.strokeRoundedRect(-32, -13, 64, 26, 6);
            const txt = this.scene.add.text(0, 0, `🛡 ${e.block}`, {
                fontSize: fz(13), fontFamily: 'Georgia, serif',
                color: '#ecf0f1', stroke: '#000', strokeThickness: 2,
            }).setOrigin(0.5);
            this.blockBadge.add([shield, txt]);
        }

        // ── Statuts ───────────────────────────────────────────────────────────
        this.statusContainer.removeAll(true);
        const statuses = [...e.statuses.values()];
        const sx0 = -((statuses.length - 1) * 24) / 2;
        statuses.forEach((effect, i) => {
            const dot = this.scene.add.graphics();
            dot.fillStyle(effect.isDebuff ? 0x9b59b6 : 0x27ae60, 0.95);
            dot.fillRoundedRect(-12, -12, 24, 24, 5);
            dot.x = sx0 + i * 24;
            const lbl = this.scene.add.text(sx0 + i * 24, 0,
                `${effect.name[0]}${effect.stacks}`,
                { fontSize: fz(11), color: '#fff', stroke: '#000', strokeThickness: 1, resolution: 2 }
            ).setOrigin(0.5);
            this.statusContainer.add([dot, lbl]);
        });

        // ── Intent ────────────────────────────────────────────────────────────
        this.intentIcon.update(e.intent, e.intentDamage);

        this.setVisible(!e.isDead);
        this.setAlpha(e.isDead ? 0 : 1);
    }

    playHitAnimation(): void {
        this.scene.tweens.add({
            targets: this, x: this.x + 10,
            duration: 50, yoyo: true, repeat: 3, ease: 'Linear',
        });
        this.scene.cameras.main.shake(200, 0.005);
    }

    playDeathAnimation(onComplete: () => void): void {
        this.scene.tweens.add({
            targets: this,
            alpha: 0, scaleX: 1.4, scaleY: 0, y: this.y + 30,
            duration: 500, ease: 'Power3', onComplete,
        });
    }
}
