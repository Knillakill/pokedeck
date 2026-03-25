import Phaser from 'phaser';
import { Player } from '../core/entities/Player';
import { sc, fz } from '../config';

// Mini barre (toujours visible)
const MINI_W = sc(130);
const MINI_H = sc(18);

// Panneau complet (survol)
const FULL_W  = sc(170);
const FULL_H  = sc(13);
const PANEL_H = sc(110);

/**
 * Panneau d'info joueur style Slay the Spire.
 * Ancré au SOMMET du sprite joueur.
 *  - État normal  : juste une mini barre HP
 *  - Au survol    : panneau complet (nom, barre, PV, bloc, statuts)
 */
export class PlayerHUD extends Phaser.GameObjects.Container {
    private player: Player;
    private miniBarGfx: Phaser.GameObjects.Graphics;
    private miniHpText: Phaser.GameObjects.Text;
    private miniShieldGfx: Phaser.GameObjects.Graphics;
    private miniShieldText: Phaser.GameObjects.Text;
    private infoPanel: Phaser.GameObjects.Container;
    private fullHpBar: Phaser.GameObjects.Graphics;
    private nameText: Phaser.GameObjects.Text;
    private hpText: Phaser.GameObjects.Text;
    private blockBadge: Phaser.GameObjects.Container;
    private statusRow: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
        super(scene, x, y);
        this.player = player;

        // ── Mini barre (toujours visible) ──────────────────────────────────
        this.miniBarGfx    = scene.add.graphics();
        const barCY = MINI_H / 2;
        this.miniHpText    = scene.add.text(0, barCY, '', {
            fontSize: fz(10), fontFamily: 'Georgia, serif', fontStyle: 'bold',
            color: '#fff', stroke: '#000', strokeThickness: 2, resolution: 2,
        }).setOrigin(0.5);
        this.miniShieldGfx  = scene.add.graphics();
        this.miniShieldText = scene.add.text(-MINI_W / 2 - 22, barCY, '', {
            fontSize: fz(10), fontFamily: 'Georgia, serif', fontStyle: 'bold',
            color: '#fff', stroke: '#000', strokeThickness: 2, resolution: 2,
        }).setOrigin(0.5);

        // ── Panneau complet (caché par défaut, s'étend vers le haut) ──────
        this.infoPanel = scene.add.container(0, -8);
        this.infoPanel.setVisible(false);
        this.infoPanel.setDepth(8);

        const bg = scene.add.graphics();
        bg.fillStyle(0x000000, 0.75);
        bg.fillRoundedRect(-FULL_W / 2 - 10, -PANEL_H, FULL_W + 20, PANEL_H, 10);
        bg.lineStyle(1, 0x4a4a6a, 0.85);
        bg.strokeRoundedRect(-FULL_W / 2 - 10, -PANEL_H, FULL_W + 20, PANEL_H, 10);

        this.nameText = scene.add.text(0, -PANEL_H + 14, player.name, {
            fontSize: fz(16), fontFamily: 'Georgia, serif', fontStyle: 'bold',
            color: '#ecf0f1', stroke: '#000', strokeThickness: 3, resolution: 2,
        }).setOrigin(0.5);

        this.fullHpBar = scene.add.graphics();

        this.hpText = scene.add.text(0, -PANEL_H + 62, '', {
            fontSize: fz(14), fontFamily: 'Georgia, serif',
            color: '#ecf0f1', stroke: '#000', strokeThickness: 2, resolution: 2,
        }).setOrigin(0.5);

        this.blockBadge = scene.add.container(0, -PANEL_H + 82);
        this.statusRow  = scene.add.container(0, -PANEL_H + 100);

        this.infoPanel.add([bg, this.nameText, this.fullHpBar, this.hpText,
            this.blockBadge, this.statusRow]);

        this.add([this.miniShieldGfx, this.miniShieldText,
            this.miniBarGfx, this.miniHpText, this.infoPanel]);

        scene.add.existing(this);
        this.refresh();
    }

    // ── API pour BattleScene ──────────────────────────────────────────────────

    showPanel(): void { this.infoPanel.setVisible(true); }
    hidePanel(): void { this.infoPanel.setVisible(false); }

    // ── Refresh ───────────────────────────────────────────────────────────────

    refresh(): void {
        if (!this.scene) return;
        const p     = this.player;
        const ratio = Math.max(0, p.hp / p.maxHp);
        const hpColor = ratio > 0.5 ? 0x27ae60 : ratio > 0.25 ? 0xf39c12 : 0xe74c3c;

        // ── Mini barre ────────────────────────────────────────────────────────
        this.miniBarGfx.clear();
        this.miniShieldGfx.clear();
        const mx = -MINI_W / 2;
        const rc = MINI_H / 2;
        // Contour + track
        this.miniBarGfx.fillStyle(0x0a0a14, 0.92);
        this.miniBarGfx.fillRoundedRect(mx - 1, -1, MINI_W + 2, MINI_H + 2, rc + 1);
        this.miniBarGfx.fillStyle(0x1a1a2e, 1);
        this.miniBarGfx.fillRoundedRect(mx, 0, MINI_W, MINI_H, rc);
        // Remplissage HP
        if (ratio > 0) {
            this.miniBarGfx.fillStyle(hpColor, 1);
            this.miniBarGfx.fillRoundedRect(mx, 0, MINI_W * ratio, MINI_H, rc);
            this.miniBarGfx.fillStyle(0xffffff, 0.15);
            this.miniBarGfx.fillRoundedRect(mx, 0, MINI_W * ratio, MINI_H / 2, rc);
        }
        // Bloc — overlay bleu depuis la gauche
        if (p.block > 0) {
            const blockRatio = Math.min(p.block / p.maxHp, 1);
            this.miniBarGfx.fillStyle(0x2980b9, 0.75);
            this.miniBarGfx.fillRoundedRect(mx, 0, MINI_W * blockRatio, MINI_H, rc);
            this.miniBarGfx.fillStyle(0x74b9ff, 0.25);
            this.miniBarGfx.fillRoundedRect(mx, 0, MINI_W * blockRatio, MINI_H / 2, rc);
            // Bouclier à gauche
            const sx = -MINI_W / 2 - 22;
            this.miniShieldGfx.fillStyle(0x1a6fa8, 1);
            this.miniShieldGfx.fillRoundedRect(sx - 14, 0, 28, MINI_H, 6);
            this.miniShieldGfx.lineStyle(1.5, 0x74b9ff, 1);
            this.miniShieldGfx.strokeRoundedRect(sx - 14, 0, 28, MINI_H, 6);
            this.miniShieldText.setText(String(p.block));
            this.miniShieldText.setVisible(true);
        } else {
            this.miniShieldText.setVisible(false);
        }
        this.miniHpText.setText(`${p.hp}`);

        // ── Barre complète (dans le panneau) ──────────────────────────────────
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

        this.hpText.setText(`${p.hp} / ${p.maxHp} PV`);

        // ── Bloc ──────────────────────────────────────────────────────────────
        this.blockBadge.removeAll(true);
        if (p.block > 0) {
            const shield = this.scene.add.graphics();
            shield.fillStyle(0x2980b9, 0.9);
            shield.fillRoundedRect(sc(-32), sc(-13), sc(64), sc(26), 6);
            shield.lineStyle(1, 0x3498db, 1);
            shield.strokeRoundedRect(sc(-32), sc(-13), sc(64), sc(26), 6);
            const txt = this.scene.add.text(0, 0, `🛡 ${p.block}`, {
                fontSize: fz(14), fontFamily: 'Georgia, serif',
                color: '#ecf0f1', stroke: '#000', strokeThickness: 2, resolution: 2,
            }).setOrigin(0.5);
            this.blockBadge.add([shield, txt]);
        }

        // ── Statuts ───────────────────────────────────────────────────────────
        this.statusRow.removeAll(true);
        const statuses = [...p.statuses.values()];
        const sx0 = -((statuses.length - 1) * 24) / 2;
        statuses.forEach((effect, i) => {
            const dot = this.scene.add.graphics();
            dot.fillStyle(effect.isDebuff ? 0x9b59b6 : 0x27ae60, 0.9);
            dot.fillRoundedRect(-10, -10, 20, 20, 4);
            dot.x = sx0 + i * 24;
            const lbl = this.scene.add.text(sx0 + i * 24, 0,
                `${effect.name[0]}${effect.stacks}`,
                { fontSize: fz(11), color: '#fff', stroke: '#000', strokeThickness: 1, resolution: 2 }
            ).setOrigin(0.5);
            this.statusRow.add([dot, lbl]);
        });
    }
}

// ─────────────────────────────────────────────────────────────────────────────

const CRYSTAL_R  = sc(26);
const PILE_W     = sc(52);   // largeur affichée du dos de carte
const PILE_H     = sc(73);   // hauteur affichée du dos de carte

/**
 * Layout bas de l'écran (style Slay the Spire) :
 *  BAS-GAUCHE            BAS-DROITE    HAUT-DROITE
 *  [cristal énergie]                   [💰 or]
 *  [📦 pioche]           [♻ défausse]
 */
export class BottomBar {
    private scene: Phaser.Scene;
    private player: Player;
    private crystalGfx: Phaser.GameObjects.Graphics;
    private energyText: Phaser.GameObjects.Text;
    private drawCountText!: Phaser.GameObjects.Text;
    private discardCountText!: Phaser.GameObjects.Text;
    private goldText: Phaser.GameObjects.Text;

    private readonly sw: number;
    private readonly sh: number;

    constructor(scene: Phaser.Scene, player: Player) {
        this.scene  = scene;
        this.player = player;
        this.sw     = scene.scale.width;
        this.sh     = scene.scale.height;

        // Positions des piles
        const pileY   = this.sh - PILE_H / 2 - sc(12);
        const drawX   = PILE_W / 2 + sc(20);
        const discX   = this.sw - PILE_W / 2 - sc(20);

        // ── Cristal d'énergie (au-dessus de la pioche) ───────────────────────
        this.crystalGfx = scene.add.graphics().setDepth(10);
        const crystalY  = pileY - PILE_H / 2 - CRYSTAL_R * 1.6;
        this.energyText = scene.add.text(
            drawX, crystalY, '',
            { fontSize: fz(20), fontFamily: 'Georgia, serif', fontStyle: 'bold',
              color: '#ffffff', stroke: '#000', strokeThickness: 3, resolution: 2 }
        ).setOrigin(0.5).setDepth(11);

        // ── Pioche (bas-gauche) ───────────────────────────────────────────────
        this.drawCountText = this.makeCardPile(drawX, pileY, false);

        // ── Défausse (bas-droite) ─────────────────────────────────────────────
        this.discardCountText = this.makeCardPile(discX, pileY, true);

        // ── Libellés ──────────────────────────────────────────────────────────
        scene.add.text(drawX, pileY + PILE_H / 2 + sc(12), 'Pioche', {
            fontSize: fz(11), fontFamily: 'Georgia, serif',
            color: '#bdc3c7', stroke: '#000', strokeThickness: 1, resolution: 2,
        }).setOrigin(0.5).setDepth(10);
        scene.add.text(discX, pileY + PILE_H / 2 + sc(12), 'Défausse', {
            fontSize: fz(11), fontFamily: 'Georgia, serif',
            color: '#bdc3c7', stroke: '#000', strokeThickness: 1, resolution: 2,
        }).setOrigin(0.5).setDepth(10);

        // ── Or (haut-droite) ──────────────────────────────────────────────────
        this.goldText = scene.add.text(
            this.sw - sc(14), sc(14), '',
            { fontSize: fz(15), fontFamily: 'Georgia, serif',
              color: '#f1c40f', stroke: '#000', strokeThickness: 2, resolution: 2 }
        ).setOrigin(1, 0).setDepth(10);

        this.refresh();
    }

    /**
     * Crée une pile de cartes (dos de carte empilé) + retourne le Text du compteur.
     * isDiscard: teinte grisée pour les cartes défaussées.
     */
    private makeCardPile(x: number, y: number, isDiscard: boolean): Phaser.GameObjects.Text {
        const hasBack = this.scene.textures.exists('card_back');

        // ── Ombres de profondeur (cartes en dessous) ──────────────────────────
        for (let i = 3; i >= 1; i--) {
            const shadow = this.scene.add.graphics().setDepth(9);
            shadow.fillStyle(0x000000, 0.35);
            shadow.fillRoundedRect(
                x - PILE_W / 2 + i * 3,
                y - PILE_H / 2 + i * 3,
                PILE_W, PILE_H, 4
            );
        }

        if (hasBack) {
            // Cartes "en dessous" (légèrement décalées)
            for (let i = 3; i >= 1; i--) {
                const ghost = this.scene.add.image(x + i * 2, y + i * 2, 'card_back')
                    .setDisplaySize(PILE_W, PILE_H)
                    .setDepth(9)
                    .setTint(isDiscard ? 0x555566 : 0x889988);
            }
            // Carte du dessus
            const front = this.scene.add.image(x, y, 'card_back')
                .setDisplaySize(PILE_W, PILE_H)
                .setDepth(10);
            if (isDiscard) front.setTint(0x8899aa);
        } else {
            // Fallback si texture absente
            const g = this.scene.add.graphics().setDepth(10);
            g.fillStyle(isDiscard ? 0x445566 : 0x224433, 1);
            g.fillRoundedRect(x - PILE_W / 2, y - PILE_H / 2, PILE_W, PILE_H, 4);
            g.lineStyle(1, 0x4a6a5a, 1);
            g.strokeRoundedRect(x - PILE_W / 2, y - PILE_H / 2, PILE_W, PILE_H, 4);
        }

        // ── Badge compteur (coin bas-droite de la pile) ───────────────────────
        const badgeX = x + PILE_W / 2 - sc(2);
        const badgeY = y + PILE_H / 2 - sc(2);
        const badgeBg = this.scene.add.graphics().setDepth(12);
        badgeBg.fillStyle(0x000000, 0.82);
        badgeBg.fillRoundedRect(badgeX - sc(18), badgeY - sc(14), sc(20), sc(16), 5);

        const countTxt = this.scene.add.text(badgeX - sc(8), badgeY - sc(6), '0', {
            fontSize: fz(12), fontFamily: 'Georgia, serif', fontStyle: 'bold',
            color: isDiscard ? '#aabbcc' : '#eeffee',
            stroke: '#000', strokeThickness: 2, resolution: 2,
        }).setOrigin(0.5).setDepth(13);

        return countTxt;
    }

    refresh(): void {
        const p = this.player;
        if (!p) return;

        // ── Cristal ───────────────────────────────────────────────────────────
        const pileY    = this.sh - PILE_H / 2 - sc(12);
        const drawX    = PILE_W / 2 + sc(20);
        const crystalY = pileY - PILE_H / 2 - CRYSTAL_R * 1.6;

        const g    = this.crystalGfx;
        const cx   = drawX;
        const cy   = crystalY;
        const r    = CRYSTAL_R;
        const full = p.energy > 0;

        g.clear();
        g.fillStyle(0x000000, 0.4);
        g.fillTriangle(cx - r + 2, cy + 2, cx + r + 2, cy + 2, cx + 2, cy - r * 1.3 + 2);
        g.fillTriangle(cx - r + 2, cy + 2, cx + r + 2, cy + 2, cx + 2, cy + r * 0.8 + 2);
        g.fillStyle(full ? 0x00aaff : 0x2c3e50, 1);
        g.fillTriangle(cx - r, cy, cx + r, cy, cx, cy - r * 1.3);
        g.fillStyle(full ? 0x0055cc : 0x1a252f, 1);
        g.fillTriangle(cx - r, cy, cx + r, cy, cx, cy + r * 0.8);
        g.fillStyle(0xffffff, full ? 0.35 : 0.1);
        g.fillTriangle(cx - r * 0.4, cy - r * 0.2, cx, cy - r * 0.2, cx - r * 0.2, cy - r * 0.9);
        g.lineStyle(2, full ? 0x55ddff : 0x4a5a6a, 1);
        g.strokeTriangle(cx - r, cy, cx + r, cy, cx, cy - r * 1.3);
        g.strokeTriangle(cx - r, cy, cx + r, cy, cx, cy + r * 0.8);

        this.energyText.setPosition(drawX, crystalY);
        this.energyText.setText(`${p.energy}/${p.maxEnergy}`);

        this.drawCountText.setText(String(p.drawPileSize));
        this.discardCountText.setText(String(p.discardPileSize));
        this.goldText.setText(`💰 ${p.gold}`);
    }
}
