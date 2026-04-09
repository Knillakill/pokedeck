import Phaser from 'phaser';
import { Player } from '../core/entities/Player';
import { sc, fz, C } from '../config';
import { StatusEffectId } from '../core/types';
import { StatusEffect } from '../core/effects/StatusEffect';

// Barre HP mini
const MINI_W  = sc(150);
const MINI_H  = sc(8);  // barre fine style Pokémon

// Panneau complet (survol)
const FULL_W  = sc(170);
const FULL_H  = sc(10);
const PANEL_H = sc(60); // hauteur mini, s'étend dynamiquement

// Layout badges statuts
const BADGE_H   = sc(22);
const BADGE_GAP = sc(4);
const BADGE_NRM = sc(38);
const BADGE_PSN = sc(64);

const HUD_PAD    = sc(12);  // espace entre bas du sprite et barre HP
const STATUS_PAD = sc(5);   // espace entre bas de la barre HP et rangée statuts

// Icônes et couleurs des statuts (même table que EnemyView)
interface StatusCfg { icon: string; bg: number; border: number }
const STATUS_CFG: Partial<Record<StatusEffectId, StatusCfg>> = {
    [StatusEffectId.POISON]:      { icon: '☠', bg: 0x5b2c6f, border: 0x9b59b6 },
    [StatusEffectId.WEAK]:        { icon: '⬇', bg: 0x935116, border: 0xe67e22 },
    [StatusEffectId.VULNERABLE]:  { icon: '▲', bg: 0x922b21, border: 0xe74c3c },
    [StatusEffectId.STRENGTH]:    { icon: '⬆', bg: 0x1a5276, border: 0x3498db },
    [StatusEffectId.DEXTERITY]:   { icon: '◆', bg: 0x0e6655, border: 0x1abc9c },
    [StatusEffectId.THORNS]:      { icon: '✦', bg: 0x0e6251, border: 0x1abc9c },
    [StatusEffectId.REGEN]:       { icon: '♥', bg: 0x1e8449, border: 0x27ae60 },
    [StatusEffectId.METALLICIZE]: { icon: '◈', bg: 0x424949, border: 0x85929e },
    [StatusEffectId.SLEEP]:       { icon: 'Z', bg: 0x4a235a, border: 0x8e44ad },
};
const BLOCK_CFG: StatusCfg = { icon: '▣', bg: 0x1a6fa8, border: 0x5dade2 };

/**
 * HUD joueur style Slay the Spire.
 * Ancré au BAS du sprite joueur (spriteBottomY en BattleScene).
 *  - Toujours visible : barre HP + rangée statuts/bouclier
 *  - Survol          : panneau complet (HP détaillé)
 */
export class PlayerHUD extends Phaser.GameObjects.Container {
    private player: Player;
    private miniBarGfx: Phaser.GameObjects.Graphics;
    private miniHpText: Phaser.GameObjects.Text;
    private statusRowCtn: Phaser.GameObjects.Container;
    private infoPanel: Phaser.GameObjects.Container;
    private panelBg: Phaser.GameObjects.Graphics;
    private fullHpBar: Phaser.GameObjects.Graphics;
    private hpText: Phaser.GameObjects.Text;
    private statusDescCtn: Phaser.GameObjects.Container;

    // Tooltip + détection hover badge
    private tooltipCtn: Phaser.GameObjects.Container | null = null;
    private badgeData: Array<{ bx: number; w: number; title: string; desc: string }> = [];

    constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
        super(scene, x, y);
        this.player = player;

        // ── Barre HP mini (y=0 = bas du sprite, donc positif = en dessous) ───
        const barTop = HUD_PAD;
        this.miniBarGfx = scene.add.graphics();
        this.miniHpText = scene.add.text(0, barTop + MINI_H / 2, '', {
            fontSize: fz(12), fontFamily: 'Georgia, serif', fontStyle: 'bold',
            color: '#fff', stroke: '#000', strokeThickness: 2, resolution: 2,
        }).setOrigin(0.5);

        // ── Rangée statuts (sous la barre) ────────────────────────────────────
        const statusRowY = barTop + MINI_H + STATUS_PAD + BADGE_H / 2;
        this.statusRowCtn = scene.add.container(0, statusRowY);

        // ── Panneau survol (sous la rangée statuts) ───────────────────────────
        const panelTop = barTop + MINI_H + STATUS_PAD + BADGE_H + sc(8);
        this.infoPanel = scene.add.container(0, panelTop);
        this.infoPanel.setVisible(false);
        this.infoPanel.setDepth(8);

        this.panelBg      = scene.add.graphics();
        this.fullHpBar    = scene.add.graphics();
        this.hpText       = scene.add.text(0, sc(30), '', {
            fontSize: fz(12), fontFamily: 'Georgia, serif',
            color: '#ecf0f1', stroke: '#000', strokeThickness: 2, resolution: 2,
        }).setOrigin(0.5);
        this.statusDescCtn = scene.add.container(-FULL_W / 2, sc(42));

        this.infoPanel.add([this.panelBg, this.fullHpBar, this.hpText, this.statusDescCtn]);

        this.add([this.miniBarGfx, this.miniHpText, this.statusRowCtn, this.infoPanel]);

        // ── Interactivité hover ───────────────────────────────────────────────
        const hitH = HUD_PAD + MINI_H + STATUS_PAD + BADGE_H + sc(120);
        this.setSize(MINI_W + sc(40), hitH);
        this.setInteractive({ cursor: 'default' });
        this.on('pointerover', () => this.infoPanel.setVisible(true));
        this.on('pointerout',  () => { this.infoPanel.setVisible(false); this.hideTooltip(); });
        this.on('pointermove', (ptr: Phaser.Input.Pointer) => this.checkBadgeHover(ptr));

        // Tooltip scène
        this.createTooltip(scene);
        scene.events.once('shutdown', () => { this.tooltipCtn?.destroy(); this.tooltipCtn = null; });

        scene.add.existing(this);
        this.refresh();
    }

    // ── Tooltip ───────────────────────────────────────────────────────────────

    private createTooltip(scene: Phaser.Scene): void {
        const ctn   = scene.add.container(0, 0).setDepth(300).setVisible(false);
        const bg    = scene.add.graphics();
        const title = scene.add.text(sc(8), sc(6), '', {
            fontSize: fz(13), fontFamily: 'Georgia, serif', fontStyle: 'bold',
            color: C.S_GOLD, stroke: '#000', strokeThickness: 2, resolution: 2,
        });
        const desc = scene.add.text(sc(8), sc(24), '', {
            fontSize: fz(11), fontFamily: 'Georgia, serif',
            color: C.S_MUTED, stroke: '#000', strokeThickness: 1,
            wordWrap: { width: sc(190) }, resolution: 2,
        });
        ctn.add([bg, title, desc]);
        this.tooltipCtn = ctn;
    }

    private showTooltip(screenX: number, screenY: number, title: string, desc: string): void {
        if (!this.tooltipCtn || !this.scene) return;
        const [bg, titleTxt, descTxt] = this.tooltipCtn.list as [
            Phaser.GameObjects.Graphics,
            Phaser.GameObjects.Text,
            Phaser.GameObjects.Text,
        ];
        titleTxt.setText(title);
        descTxt.setText(desc);
        const W = sc(210);
        const h = sc(8) + titleTxt.height + descTxt.height + sc(14);
        bg.clear();
        bg.fillStyle(C.BG_PANEL, 0.95);
        bg.fillRoundedRect(0, 0, W, h, sc(7));
        bg.lineStyle(1.5, C.GOLD_BORDER, 0.85);
        bg.strokeRoundedRect(0, 0, W, h, sc(7));
        const sw = this.scene.scale.width;
        const tx = screenX + W + 16 > sw ? screenX - W - 8 : screenX + 10;
        const ty = Math.max(8, screenY - h - 8);
        this.tooltipCtn.setPosition(tx, ty).setVisible(true);
    }

    private hideTooltip(): void {
        this.tooltipCtn?.setVisible(false);
    }

    private checkBadgeHover(ptr: Phaser.Input.Pointer): void {
        const localX = ptr.x - this.x;
        const localY = ptr.y - this.y;
        const rowY   = this.statusRowCtn.y;
        if (Math.abs(localY - rowY) <= BADGE_H) {
            for (const b of this.badgeData) {
                if (localX >= b.bx - b.w / 2 && localX <= b.bx + b.w / 2) {
                    this.showTooltip(ptr.x, ptr.y, b.title, b.desc);
                    return;
                }
            }
        }
        this.hideTooltip();
    }

    // ── API pour BattleScene ──────────────────────────────────────────────────

    showPanel(): void { this.infoPanel.setVisible(true); }
    hidePanel(): void { this.infoPanel.setVisible(false); }

    // ── Refresh ───────────────────────────────────────────────────────────────

    refresh(): void {
        if (!this.scene) return;
        const p     = this.player;
        const ratio = Math.max(0, p.hp / p.maxHp);
        // Barre de vie style Pokémon : toujours rouge, s'assombrit à très bas HP
        const HP_RED      = 0xc0392b;
        const HP_RED_HI   = 0xe74c3c;
        const HP_RED_DARK = 0x7b241c;
        const hpBarColor  = ratio < 0.15 ? HP_RED_DARK : HP_RED;
        const hpHiColor   = ratio < 0.15 ? HP_RED      : HP_RED_HI;

        // ── Barre HP mini ─────────────────────────────────────────────────────
        const barTop = HUD_PAD;
        this.miniBarGfx.clear();
        const mx = -MINI_W / 2;
        const rc = MINI_H / 2;
        this.miniBarGfx.fillStyle(0x1a0808, 1);
        this.miniBarGfx.fillRoundedRect(mx - 1, barTop - 1, MINI_W + 2, MINI_H + 2, rc + 1);
        this.miniBarGfx.fillStyle(0x2d1010, 1);
        this.miniBarGfx.fillRoundedRect(mx, barTop, MINI_W, MINI_H, rc);
        if (ratio > 0) {
            this.miniBarGfx.fillStyle(hpBarColor, 1);
            this.miniBarGfx.fillRoundedRect(mx, barTop, MINI_W * ratio, MINI_H, rc);
            this.miniBarGfx.fillStyle(hpHiColor, 0.45);
            this.miniBarGfx.fillRoundedRect(mx, barTop, MINI_W * ratio, MINI_H / 2, rc);
        }
        this.miniHpText.setY(barTop + MINI_H / 2);
        this.miniHpText.setText(`${p.hp}`);

        // ── Barre HP complète (panneau survol) ────────────────────────────────
        this.fullHpBar.clear();
        const bx = -FULL_W / 2;
        const by = sc(8);
        this.fullHpBar.fillStyle(0x1a0808, 0.95);
        this.fullHpBar.fillRoundedRect(bx - 3, by - 3, FULL_W + 6, FULL_H + 6, 7);
        this.fullHpBar.fillStyle(0x2d1010, 1);
        this.fullHpBar.fillRoundedRect(bx, by, FULL_W, FULL_H, 5);
        this.fullHpBar.fillStyle(hpBarColor, 1);
        this.fullHpBar.fillRoundedRect(bx, by, FULL_W * ratio, FULL_H, 5);
        this.fullHpBar.fillStyle(hpHiColor, 0.35);
        this.fullHpBar.fillRoundedRect(bx, by, FULL_W * ratio, FULL_H / 2, 4);
        this.hpText.setText(`${p.hp} / ${p.maxHp} PV`);

        // ── Rangée statuts + bloc ─────────────────────────────────────────────
        this.rebuildStatusRow(p.block, [...p.statuses.values()]);

        // ── Descriptions des effets dans le panneau survol ────────────────────
        this.statusDescCtn.removeAll(true);
        let dy = 0;

        if (p.block > 0) {
            const txt = this.scene.add.text(0, dy,
                `▣ Bouclier ${p.block} — Absorbe ${p.block} dégâts en priorité.`, {
                fontSize: fz(10), fontFamily: 'Georgia, serif',
                color: '#74b9ff', wordWrap: { width: FULL_W - sc(4) }, resolution: 2,
            });
            this.statusDescCtn.add(txt);
            dy += txt.height + sc(3);
        }
        for (const effect of p.statuses.values()) {
            const cfg  = STATUS_CFG[effect.id];
            const icon = cfg?.icon ?? '●';
            const txt  = this.scene.add.text(0, dy,
                `${icon} ${effect.name} (${effect.stacks}) — ${effect.getDescription()}`, {
                fontSize: fz(10), fontFamily: 'Georgia, serif',
                color: '#ecf0f1', wordWrap: { width: FULL_W - sc(4) }, resolution: 2,
            });
            this.statusDescCtn.add(txt);
            dy += txt.height + sc(3);
        }

        // Redimensionne le fond du panneau
        const panelContentH = Math.max(sc(46), sc(42) + dy + sc(8));
        this.panelBg.clear();
        this.panelBg.fillStyle(C.BG_PANEL, 0.94);
        this.panelBg.fillRoundedRect(-FULL_W / 2 - 10, 0, FULL_W + 20, panelContentH, 10);
        this.panelBg.lineStyle(1.5, C.GOLD_BORDER, 0.65);
        this.panelBg.strokeRoundedRect(-FULL_W / 2 - 10, 0, FULL_W + 20, panelContentH, 10);
    }

    // ── Reconstruction de la rangée statuts ──────────────────────────────────

    private rebuildStatusRow(block: number, statuses: StatusEffect[]): void {
        this.statusRowCtn.removeAll(true);
        this.badgeData = [];

        type Badge = {
            w: number; icon: string; bg: number; border: number;
            stacks: number; preview?: string;
            title: string; desc: string;
        };
        const badges: Badge[] = [];

        if (block > 0) {
            badges.push({
                w: BADGE_NRM, icon: BLOCK_CFG.icon, bg: BLOCK_CFG.bg, border: BLOCK_CFG.border,
                stacks: block,
                title: 'Bouclier',
                desc:  `Absorbe ${block} dégâts en priorité avant de perdre des PV. Se dissipe en fin de tour.`,
            });
        }
        for (const effect of statuses) {
            const cfg = STATUS_CFG[effect.id];
            if (!cfg) continue;
            const isPoison = effect.id === StatusEffectId.POISON;
            badges.push({
                w: isPoison ? BADGE_PSN : BADGE_NRM,
                icon: cfg.icon, bg: cfg.bg, border: cfg.border,
                stacks: effect.stacks,
                preview: isPoison ? `-${effect.stacks}` : undefined,
                title: effect.name,
                desc:  effect.getDescription(),
            });
        }

        if (badges.length === 0) return;

        const totalW = badges.reduce((s, b, i) => s + b.w + (i > 0 ? BADGE_GAP : 0), 0);
        let cx = -totalW / 2;

        for (const b of badges) {
            const bx = cx + b.w / 2;
            cx += b.w + BADGE_GAP;

            const gfx = this.scene.add.graphics();
            gfx.fillStyle(b.bg, 0.95);
            gfx.fillRoundedRect(bx - b.w / 2, -BADGE_H / 2, b.w, BADGE_H, 5);
            gfx.lineStyle(1.5, b.border, 0.85);
            gfx.strokeRoundedRect(bx - b.w / 2, -BADGE_H / 2, b.w, BADGE_H, 5);
            this.statusRowCtn.add(gfx);

            if (b.preview) {
                const lx = bx - b.w * 0.23;
                const rx = bx + b.w * 0.25;
                this.statusRowCtn.add(
                    this.scene.add.text(lx, 0, `${b.icon}${b.stacks}`, {
                        fontSize: fz(12), color: '#fff', stroke: '#000', strokeThickness: 2, resolution: 2,
                    }).setOrigin(0.5)
                );
                this.statusRowCtn.add(
                    this.scene.add.text(rx, 0, b.preview, {
                        fontSize: fz(11), color: '#2ecc71', stroke: '#000', strokeThickness: 2, resolution: 2,
                    }).setOrigin(0.5)
                );
            } else {
                this.statusRowCtn.add(
                    this.scene.add.text(bx, 0, `${b.icon}${b.stacks}`, {
                        fontSize: fz(12), color: '#fff', stroke: '#000', strokeThickness: 2, resolution: 2,
                    }).setOrigin(0.5)
                );
            }

            // Stocker pour détection hover
            this.badgeData.push({ bx, w: b.w, title: b.title, desc: b.desc });
        }
    }
}

// ─────────────────────────────────────────────────────────────────────────────

const CRYSTAL_R  = sc(26);
const PILE_W     = sc(52);
const PILE_H     = sc(73);

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

    /** Position centre de la pioche (coordonnées scène absolues). */
    readonly deckPos:    { x: number; y: number };
    /** Position centre de la défausse (coordonnées scène absolues). */
    readonly discardPos: { x: number; y: number };

    private readonly sw: number;
    private readonly sh: number;

    constructor(scene: Phaser.Scene, player: Player) {
        this.scene  = scene;
        this.player = player;
        this.sw     = scene.scale.width;
        this.sh     = scene.scale.height;

        const pileY   = this.sh - PILE_H / 2 - sc(12);
        const drawX   = PILE_W / 2 + sc(20);
        const discX   = this.sw - PILE_W / 2 - sc(20);

        this.deckPos    = { x: drawX, y: pileY };
        this.discardPos = { x: discX, y: pileY };

        this.crystalGfx = scene.add.graphics().setDepth(10);
        const crystalY  = pileY - PILE_H / 2 - CRYSTAL_R * 1.6;
        this.energyText = scene.add.text(
            drawX, crystalY, '',
            { fontSize: fz(20), fontFamily: 'Georgia, serif', fontStyle: 'bold',
              color: '#ffffff', stroke: '#000', strokeThickness: 3, resolution: 2 }
        ).setOrigin(0.5).setDepth(11);

        this.drawCountText    = this.makeCardPile(drawX, pileY, false);
        this.discardCountText = this.makeCardPile(discX, pileY, true);

        scene.add.text(drawX, pileY + PILE_H / 2 + sc(12), 'Pioche', {
            fontSize: fz(11), fontFamily: 'Georgia, serif',
            color: C.S_MUTED, stroke: '#000', strokeThickness: 1, resolution: 2,
        }).setOrigin(0.5).setDepth(10);
        scene.add.text(discX, pileY + PILE_H / 2 + sc(12), 'Défausse', {
            fontSize: fz(11), fontFamily: 'Georgia, serif',
            color: C.S_MUTED, stroke: '#000', strokeThickness: 1, resolution: 2,
        }).setOrigin(0.5).setDepth(10);

        this.goldText = scene.add.text(
            this.sw - sc(14), sc(14), '',
            { fontSize: fz(15), fontFamily: 'Georgia, serif',
              color: C.S_GOLD, stroke: '#000', strokeThickness: 2, resolution: 2 }
        ).setOrigin(1, 0).setDepth(10);

        this.refresh();
    }

    private makeCardPile(x: number, y: number, isDiscard: boolean): Phaser.GameObjects.Text {
        const hasBack = this.scene.textures.exists('card_back');

        for (let i = 3; i >= 1; i--) {
            const shadow = this.scene.add.graphics().setDepth(9);
            shadow.fillStyle(0x000000, 0.35);
            shadow.fillRoundedRect(x - PILE_W / 2 + i * 3, y - PILE_H / 2 + i * 3, PILE_W, PILE_H, 4);
        }

        if (hasBack) {
            for (let i = 3; i >= 1; i--) {
                this.scene.add.image(x + i * 2, y + i * 2, 'card_back')
                    .setDisplaySize(PILE_W, PILE_H).setDepth(9)
                    .setTint(isDiscard ? 0x555566 : 0x889988);
            }
            const front = this.scene.add.image(x, y, 'card_back')
                .setDisplaySize(PILE_W, PILE_H).setDepth(10);
            if (isDiscard) front.setTint(0x8899aa);
        } else {
            const g = this.scene.add.graphics().setDepth(10);
            g.fillStyle(isDiscard ? C.BG_SURFACE : C.BG_PANEL, 1);
            g.fillRoundedRect(x - PILE_W / 2, y - PILE_H / 2, PILE_W, PILE_H, sc(6));
            g.lineStyle(1, isDiscard ? C.PURPLE_SOFT : C.GOLD_DIM, 0.8);
            g.strokeRoundedRect(x - PILE_W / 2, y - PILE_H / 2, PILE_W, PILE_H, sc(6));
        }

        const badgeX = x + PILE_W / 2 - sc(2);
        const badgeY = y + PILE_H / 2 - sc(2);
        const badgeBg = this.scene.add.graphics().setDepth(12);
        badgeBg.fillStyle(C.BG_DEEP, 0.92);
        badgeBg.fillRoundedRect(badgeX - sc(18), badgeY - sc(14), sc(22), sc(16), sc(5));
        badgeBg.lineStyle(1, C.GOLD_DIM, 0.5);
        badgeBg.strokeRoundedRect(badgeX - sc(18), badgeY - sc(14), sc(22), sc(16), sc(5));

        return this.scene.add.text(badgeX - sc(7), badgeY - sc(6), '0', {
            fontSize: fz(12), fontFamily: 'Georgia, serif', fontStyle: 'bold',
            color: C.S_GOLD,
            stroke: '#000', strokeThickness: 2, resolution: 2,
        }).setOrigin(0.5).setDepth(13);
    }

    refresh(): void {
        const p = this.player;
        if (!p) return;

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
