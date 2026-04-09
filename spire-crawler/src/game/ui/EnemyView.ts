import Phaser from 'phaser';
import { Enemy } from '../core/entities/Enemy';
import { IntentIcon } from './IntentIcon';
import { sc, fz, C } from '../config';
import { StatusEffectId } from '../core/types';
import { StatusEffect } from '../core/effects/StatusEffect';

// Dimensions placeholder procédural
const ENEMY_W = sc(130);
const ENEMY_H = sc(160);

// Sprite idle : boîte fixe 130×130
const GIF_BOX  = 130;
const GIF_HALF = GIF_BOX / 2;

// Animations d'action
const ACTION_GIF_SZ      = 460;
const ACTION_FEET_OFFSET = 75;

interface EnemyGifCfg {
    idlePath?:        string;
    attackPath?:      string;
    attackDurationMs: number;
}
const ENEMY_GIF: Record<string, EnemyGifCfg> = {
    pidgey:   { idlePath: 'assets/enemy/roucool.gif',   attackDurationMs: 0   },
    rattata:  { idlePath: 'assets/enemy/rattata.gif',   attackDurationMs: 0   },
    chenipan: { idlePath: 'assets/enemy/chenipan.gif',
                attackPath: 'assets/enemy/chenipanattaque.gif', attackDurationMs: 1580 },
    aspicot:  { idlePath: 'assets/enemy/idle.gif',
                attackPath: 'assets/enemy/aspicotattaque.gif',  attackDurationMs: 1430 },
    racaillou:{ idlePath: 'assets/enemy/racaillou.gif', attackDurationMs: 0   },
    mystherbe:{ idlePath: 'assets/enemy/mystherbe.gif', attackDurationMs: 0   },
};

// ── HUD layout ────────────────────────────────────────────────────────────────
const MINI_W     = sc(160);
const MINI_H     = sc(8);    // barre fine style Pokémon
const HUD_PAD    = sc(10);
const STATUS_PAD = sc(5);
const BADGE_H    = sc(22);
const BADGE_GAP  = sc(4);
const BADGE_NRM  = sc(38);
const BADGE_PSN  = sc(64);
const FULL_W     = sc(180);
const FULL_H     = sc(10);

// ── Icônes et couleurs des statuts ────────────────────────────────────────────
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

export class EnemyView extends Phaser.GameObjects.Container {
    enemy: Enemy;
    private gfxBody: Phaser.GameObjects.Graphics;
    private miniBarGfx: Phaser.GameObjects.Graphics;
    private miniHpText!: Phaser.GameObjects.Text;
    private statusRowCtn!: Phaser.GameObjects.Container;
    private infoPanel!: Phaser.GameObjects.Container;
    private panelBg!: Phaser.GameObjects.Graphics;
    private fullHpBar!: Phaser.GameObjects.Graphics;
    private hpText!: Phaser.GameObjects.Text;
    private statusDescCtn!: Phaser.GameObjects.Container;
    intentIcon: IntentIcon;
    private usingSprite: boolean;

    // DOM GIFs
    private gifIdleDom:   Phaser.GameObjects.DOMElement | null = null;
    private gifIdleImg:   HTMLImageElement | null = null;
    private gifActionDom: Phaser.GameObjects.DOMElement | null = null;
    private gifActionImg: HTMLImageElement | null = null;
    private gifActionTimer: ReturnType<typeof setTimeout> | null = null;

    // Tooltip (objet de scène, pas dans ce container)
    private tooltipCtn: Phaser.GameObjects.Container | null = null;

    // Données des badges pour détection hover
    private badgeData: Array<{ bx: number; w: number; title: string; desc: string }> = [];

    constructor(scene: Phaser.Scene, x: number, y: number, enemy: Enemy) {
        super(scene, x, y);
        this.enemy = enemy;

        const texKey  = `enemy_sprite_${enemy.definition.id}`;
        const gifCfg  = ENEMY_GIF[enemy.definition.id];
        this.usingSprite = !gifCfg && scene.textures.exists(texKey);
        const sh = gifCfg ? GIF_HALF : (this.usingSprite ? Math.round(80 * 3.6 / 2) : ENEMY_H / 2);

        // ── Corps / sprite ───────────────────────────────────────────────────
        this.gfxBody = scene.add.graphics();

        if (gifCfg) {
            if (gifCfg.idlePath) {
                const imgIdle = document.createElement('img');
                imgIdle.src = gifCfg.idlePath;
                imgIdle.style.cssText =
                    `width:${GIF_BOX}px;height:${GIF_BOX}px;` +
                    'object-fit:contain;image-rendering:pixelated;' +
                    'pointer-events:none;display:block;position:relative;z-index:0;';
                this.gifIdleImg = imgIdle;

                // ── Wrapper parent (suggestion user) ─────────────────────────
                // Contient le GIF + une zone de hit transparente pour le hover.
                // La zone de hit redispatch aussi les events pointer au canvas
                // Phaser pour que drag-drop / click ennemis continuent de fonctionner.
                const hitW = GIF_BOX + 60;
                const hitH_div = GIF_BOX + 70;
                const wrapDiv = document.createElement('div');
                wrapDiv.style.cssText =
                    `width:${hitW}px;height:${hitH_div}px;` +
                    'position:relative;overflow:visible;';

                // GIF centré dans le wrapper
                const gifContainer = document.createElement('div');
                gifContainer.style.cssText =
                    `position:absolute;` +
                    `left:${(hitW - GIF_BOX) / 2}px;` +
                    `top:${(hitH_div - GIF_BOX) / 2}px;` +
                    'pointer-events:none;';
                gifContainer.appendChild(imgIdle);
                wrapDiv.appendChild(gifContainer);

                // Zone de hit transparente (couvre tout le wrapper)
                const hitDiv = document.createElement('div');
                hitDiv.style.cssText =
                    'position:absolute;inset:0;cursor:pointer;' +
                    'pointer-events:auto;background:transparent;z-index:1;';

                // Hover → affiche / cache le panneau info
                hitDiv.addEventListener('mouseenter', () => {
                    if (this.infoPanel) this.infoPanel.setVisible(true);
                });
                hitDiv.addEventListener('mouseleave', () => {
                    if (this.infoPanel) this.infoPanel.setVisible(false);
                    this.hideTooltip();
                });
                hitDiv.addEventListener('mousemove', (e) => {
                    if (this.infoPanel?.visible && this.scene) {
                        this.checkBadgeHoverDom(e.clientX, e.clientY);
                    }
                });

                // Redispatch des events pointer vers le canvas Phaser
                // (nécessaire pour que drag-drop et click-ennemi fonctionnent)
                const canvas = scene.game.canvas;
                const fwd = (e: PointerEvent) => {
                    canvas.dispatchEvent(new PointerEvent(e.type, {
                        bubbles: false, cancelable: true,
                        clientX: e.clientX, clientY: e.clientY,
                        pointerId: e.pointerId,
                        pointerType: e.pointerType || 'mouse',
                        buttons: e.buttons,
                        pressure: e.pressure || 0,
                    }));
                };
                (['pointerdown', 'pointermove', 'pointerup', 'pointercancel'] as const)
                    .forEach(t => hitDiv.addEventListener(t, fwd as EventListener));

                wrapDiv.appendChild(hitDiv);

                this.gifIdleDom = scene.add.dom(x, y, wrapDiv).setDepth(4);
                if (this.gifIdleDom.node.parentElement)
                    this.gifIdleDom.node.parentElement.style.pointerEvents = 'none';
            } else {
                this.draw();
            }

            if (gifCfg.attackPath) {
                const wrapper = document.createElement('div');
                wrapper.style.cssText =
                    `width:${ACTION_GIF_SZ}px;height:${ACTION_GIF_SZ}px;` +
                    'position:relative;pointer-events:none;overflow:visible;';
                const imgAction = document.createElement('img');
                imgAction.style.cssText =
                    `position:absolute;bottom:-${ACTION_FEET_OFFSET}px;left:50%;` +
                    'transform:translateX(-50%);' +
                    `width:${ACTION_GIF_SZ}px;height:${ACTION_GIF_SZ}px;` +
                    'image-rendering:pixelated;display:none;';
                wrapper.appendChild(imgAction);
                const actionYOffset = Math.round(ACTION_GIF_SZ / 2 - GIF_HALF);
                this.gifActionDom = scene.add.dom(x, y - actionYOffset, wrapper).setDepth(5);
                if (this.gifActionDom.node.parentElement)
                    this.gifActionDom.node.parentElement.style.pointerEvents = 'none';
                this.gifActionImg = imgAction;
            }

            const shadow = scene.add.graphics();
            shadow.fillStyle(0x000000, 0.22);
            shadow.fillEllipse(0, sh + 6, FULL_W, 18);
            this.add(shadow);

        } else if (this.usingSprite) {
            const SPRITE_SCALE = 3.6;
            scene.textures.get(texKey).setFilter(Phaser.Textures.FilterMode.LINEAR);
            const img = scene.add.image(0, 0, texKey).setScale(SPRITE_SCALE);
            const shadow = scene.add.graphics();
            shadow.fillStyle(0x000000, 0.22);
            shadow.fillEllipse(0, sh + 6, FULL_W, 18);
            this.add([shadow, img]);
        } else {
            this.draw();
        }

        // ── Intent icon ───────────────────────────────────────────────────────
        const intentY = -(sh + sc(90));
        this.intentIcon = new IntentIcon(scene, 0, intentY);

        // ── Barre HP fine (sous le sprite) ────────────────────────────────────
        const barCY = sh + HUD_PAD + MINI_H / 2;
        this.miniBarGfx = scene.add.graphics();
        this.miniHpText = scene.add.text(0, barCY, '', {
            fontSize: fz(12), fontFamily: 'Georgia, serif', fontStyle: 'bold',
            color: '#fff', stroke: '#000', strokeThickness: 3, resolution: 2,
        }).setOrigin(0.5);

        // ── Rangée statuts ─────────────────────────────────────────────────────
        const statusRowY = sh + HUD_PAD + MINI_H + STATUS_PAD + BADGE_H / 2;
        this.statusRowCtn = scene.add.container(0, statusRowY);

        // ── Panneau info survol ────────────────────────────────────────────────
        this.buildInfoPanel(scene, sh);
        this.infoPanel.setVisible(false);
        this.infoPanel.setDepth(8);

        this.add([this.gfxBody, this.intentIcon, this.infoPanel,
            this.miniBarGfx, this.miniHpText, this.statusRowCtn]);

        // ── Interaction ───────────────────────────────────────────────────────
        const hitH = sh * 2 + BADGE_H + sc(120);
        this.setSize(FULL_W + 30, hitH);
        this.setInteractive({ cursor: 'pointer' });
        this.on('pointerover', () => this.infoPanel.setVisible(true));
        this.on('pointerout',  () => { this.infoPanel.setVisible(false); this.hideTooltip(); });
        this.on('pointermove', (ptr: Phaser.Input.Pointer) => this.checkBadgeHover(ptr));

        // ── Tooltip scène (singleton par ennemi) ──────────────────────────────
        this.createTooltip(scene);

        // Cleanup tooltip à la destruction de la scène
        scene.events.once('shutdown', () => { this.tooltipCtn?.destroy(); this.tooltipCtn = null; });

        (scene.add as Phaser.GameObjects.GameObjectFactory).existing(
            this as unknown as Phaser.GameObjects.GameObject
        );
        this.refresh();
    }

    // ── Tooltip ───────────────────────────────────────────────────────────────

    private createTooltip(scene: Phaser.Scene): void {
        const ctn = scene.add.container(0, 0).setDepth(300).setVisible(false);
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

    showTooltip(screenX: number, screenY: number, title: string, desc: string): void {
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

    hideTooltip(): void {
        this.tooltipCtn?.setVisible(false);
    }

    private checkBadgeHover(ptr: Phaser.Input.Pointer): void {
        this.checkBadgeHoverDom(ptr.x, ptr.y);
    }

    /**
     * Vérifie si (clientX, clientY) survole un badge de statut.
     * Accepte des coordonnées canvas (Phaser) OU client DOM (depuis hitDiv).
     */
    private checkBadgeHoverDom(cx: number, cy: number): void {
        if (!this.scene) return;

        // Convertir coordonnées client DOM → coordonnées canvas si nécessaire
        let gx = cx;
        let gy = cy;
        const canvas = this.scene.game.canvas;
        const rect   = canvas.getBoundingClientRect();
        if (cx > rect.right || cy > rect.bottom || cx < rect.left || cy < rect.top) {
            // Coordonnées déjà en espace canvas (from Phaser pointer)
        } else {
            // Coordonnées client DOM → espace jeu
            const scaleX = this.scene.scale.width  / rect.width;
            const scaleY = this.scene.scale.height / rect.height;
            gx = (cx - rect.left) * scaleX;
            gy = (cy - rect.top)  * scaleY;
        }

        const localX = gx - this.x;
        const localY = gy - this.y;
        const rowY   = this.statusRowCtn.y;

        if (Math.abs(localY - rowY) <= BADGE_H) {
            for (const b of this.badgeData) {
                if (localX >= b.bx - b.w / 2 && localX <= b.bx + b.w / 2) {
                    this.showTooltip(gx, gy, b.title, b.desc);
                    return;
                }
            }
        }
        this.hideTooltip();
    }

    // ── Panneau info survol ────────────────────────────────────────────────────

    private buildInfoPanel(scene: Phaser.Scene, sh: number): void {
        const panelY = sh + HUD_PAD + MINI_H + STATUS_PAD + BADGE_H + sc(10);
        this.infoPanel = scene.add.container(0, panelY);
        this.panelBg   = scene.add.graphics();

        // Nom en haut du panneau (visible au hover)
        const nameLabel = scene.add.text(0, sc(6), this.enemy.name, {
            fontSize: fz(14), fontFamily: 'Georgia, serif', fontStyle: 'bold',
            color: C.S_GOLD, stroke: '#000', strokeThickness: 2, resolution: 2,
        }).setOrigin(0.5);

        this.fullHpBar = scene.add.graphics();
        this.hpText    = scene.add.text(0, sc(46), '', {
            fontSize: fz(12), fontFamily: 'Georgia, serif',
            color: '#ecf0f1', stroke: '#000', strokeThickness: 2, resolution: 2,
        }).setOrigin(0.5);

        // Container pour les descriptions des effets (reconstruit dans refresh)
        this.statusDescCtn = scene.add.container(-FULL_W / 2, sc(58));

        this.infoPanel.add([this.panelBg, nameLabel, this.fullHpBar, this.hpText, this.statusDescCtn]);
    }

    // ── Fallback procédural ───────────────────────────────────────────────────

    private draw(): void {
        this.gfxBody.clear();
        const isElite   = this.enemy.definition.isElite;
        const isBoss    = this.enemy.definition.isBoss;
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
        const e    = this.enemy;
        const sh   = ENEMY_GIF[e.definition.id] ? GIF_HALF
                   : this.usingSprite            ? Math.round(80 * 3.6 / 2)
                   : ENEMY_H / 2;
        const ratio = Math.max(0, e.hp / e.maxHp);

        // Couleurs style Pokémon : rouge fixe, s'assombrit à très bas HP
        const HP_RED      = 0xc0392b;
        const HP_RED_HI   = 0xe74c3c;
        const HP_RED_DARK = 0x7b241c;
        const hpBarColor  = ratio < 0.15 ? HP_RED_DARK : HP_RED;
        const hpHiColor   = ratio < 0.15 ? HP_RED      : HP_RED_HI;

        // ── Barre HP fine ─────────────────────────────────────────────────────
        this.miniBarGfx.clear();
        const mx = -MINI_W / 2;
        const my = sh + HUD_PAD;
        const r  = MINI_H / 2;
        this.miniBarGfx.fillStyle(0x1a0808, 1);
        this.miniBarGfx.fillRoundedRect(mx - 2, my - 2, MINI_W + 4, MINI_H + 4, r + 1);
        this.miniBarGfx.fillStyle(0x2d1010, 1);
        this.miniBarGfx.fillRoundedRect(mx, my, MINI_W, MINI_H, r);
        if (ratio > 0) {
            this.miniBarGfx.fillStyle(hpBarColor, 1);
            this.miniBarGfx.fillRoundedRect(mx, my, MINI_W * ratio, MINI_H, r);
            this.miniBarGfx.fillStyle(hpHiColor, 0.45);
            this.miniBarGfx.fillRoundedRect(mx, my, MINI_W * ratio, MINI_H * 0.45, r);
        }
        this.miniHpText.setY(my + MINI_H / 2);
        this.miniHpText.setText(`${e.hp} / ${e.maxHp}`);

        // ── Rangée statuts + badges ───────────────────────────────────────────
        this.rebuildStatusRow(e.block, [...e.statuses.values()]);

        // ── Panneau info survol : barre HP complète + descriptions effets ─────
        // HP bar full
        this.fullHpBar.clear();
        const bx = -FULL_W / 2;
        const by = sc(24);   // décalé vers le bas pour laisser place au nom
        this.fullHpBar.fillStyle(0x1a0808, 0.95);
        this.fullHpBar.fillRoundedRect(bx - 3, by - 3, FULL_W + 6, FULL_H + 6, 7);
        this.fullHpBar.fillStyle(0x2d1010, 1);
        this.fullHpBar.fillRoundedRect(bx, by, FULL_W, FULL_H, 5);
        this.fullHpBar.fillStyle(hpBarColor, 1);
        this.fullHpBar.fillRoundedRect(bx, by, FULL_W * ratio, FULL_H, 5);
        this.fullHpBar.fillStyle(hpHiColor, 0.35);
        this.fullHpBar.fillRoundedRect(bx, by, FULL_W * ratio, FULL_H / 2, 4);
        this.hpText.setText(`${e.hp} / ${e.maxHp} PV`);

        // Descriptions des effets actifs
        this.statusDescCtn.removeAll(true);
        let dy = 0;

        if (e.block > 0) {
            const txt = this.scene.add.text(0, dy,
                `▣ Bouclier ${e.block} — Absorbe ${e.block} dégâts en priorité.`, {
                fontSize: fz(10), fontFamily: 'Georgia, serif',
                color: '#74b9ff', wordWrap: { width: FULL_W - sc(4) }, resolution: 2,
            });
            this.statusDescCtn.add(txt);
            dy += txt.height + sc(3);
        }

        for (const effect of e.statuses.values()) {
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

        // Redessine le fond du panneau selon la hauteur du contenu
        const panelContentH = Math.max(sc(62), sc(58) + dy + sc(8));
        this.panelBg.clear();
        this.panelBg.fillStyle(C.BG_PANEL, 0.94);
        this.panelBg.fillRoundedRect(-FULL_W / 2 - 10, 0, FULL_W + 20, panelContentH, 10);
        this.panelBg.lineStyle(1.5, C.GOLD_BORDER, 0.65);
        this.panelBg.strokeRoundedRect(-FULL_W / 2 - 10, 0, FULL_W + 20, panelContentH, 10);

        // ── Intent ────────────────────────────────────────────────────────────
        this.intentIcon.update(e.intent, e.intentDamage);

        this.setVisible(!e.isDead);
        this.setAlpha(e.isDead ? 0 : 1);
        if (this.gifIdleDom)   this.gifIdleDom.setVisible(!e.isDead);
        if (this.gifActionDom) this.gifActionDom.setVisible(!e.isDead && this.gifActionImg?.style.display === 'block');
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
            const cfg      = STATUS_CFG[effect.id];
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

            // Fond du badge
            const gfx = this.scene.add.graphics();
            gfx.fillStyle(b.bg, 0.95);
            gfx.fillRoundedRect(bx - b.w / 2, -BADGE_H / 2, b.w, BADGE_H, 5);
            gfx.lineStyle(1.5, b.border, 0.85);
            gfx.strokeRoundedRect(bx - b.w / 2, -BADGE_H / 2, b.w, BADGE_H, 5);
            this.statusRowCtn.add(gfx);

            // Texte du badge
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

    // ── Visibilité GIFs (pour le drag&drop) ──────────────────────────────────

    /**
     * Cache ou affiche les éléments DOM GIF de l'ennemi.
     * Utilisé pendant le drag de carte pour que la carte soit au premier plan.
     */
    setGifsVisible(v: boolean): void {
        if (this.gifIdleDom)   this.gifIdleDom.setVisible(v);
        if (this.gifActionDom) this.gifActionDom.setVisible(v && this.gifActionImg?.style.display === 'block');
    }

    // ── Animations ────────────────────────────────────────────────────────────

    playActionAnim(): void {
        if (this.gifActionImg && this.gifIdleImg) {
            const idle      = this.gifIdleImg;
            const idleDom   = this.gifIdleDom!;
            const action    = this.gifActionImg;
            const actionDom = this.gifActionDom!;
            const gifCfg    = ENEMY_GIF[this.enemy.definition.id];

            if (this.gifActionTimer !== null) clearTimeout(this.gifActionTimer);
            action.src = gifCfg.attackPath!;
            requestAnimationFrame(() => {
                idleDom.setVisible(false);
                idle.style.display   = 'none';
                action.style.display = 'block';
                actionDom.setVisible(true);
            });
            this.gifActionTimer = setTimeout(() => {
                action.style.display = 'none';
                actionDom.setVisible(false);
                action.src = '';
                idle.style.display = 'block';
                idleDom.setVisible(true);
                this.gifActionTimer = null;
            }, gifCfg.attackDurationMs);

        } else if (this.gifActionImg && !this.gifIdleImg) {
            const action = this.gifActionImg;
            const dom    = this.gifActionDom!;
            const gifCfg = ENEMY_GIF[this.enemy.definition.id];

            if (this.gifActionTimer !== null) clearTimeout(this.gifActionTimer);
            action.src = gifCfg.attackPath!;
            requestAnimationFrame(() => {
                action.style.display = 'block';
                dom.setVisible(true);
                this.gfxBody.setVisible(false);
            });
            this.gifActionTimer = setTimeout(() => {
                action.style.display = 'none';
                action.src = '';
                this.gfxBody.setVisible(true);
                this.gifActionTimer = null;
            }, gifCfg.attackDurationMs);

        } else {
            const domTargets = [...(this.gifIdleDom ? [this.gifIdleDom] : [])];
            const allTargets: object[] = [this, ...domTargets];
            const originX = this.x;
            this.scene.tweens.add({
                targets: allTargets,
                x: originX + 12,
                duration: 90, yoyo: true, repeat: 3,
                ease: 'Sine.easeInOut',
                onComplete: () => { allTargets.forEach((t: object) => { (t as { x: number }).x = originX; }); },
            });
        }
    }

    playHitAnimation(): void {
        const domTargets = [
            ...(this.gifIdleDom   ? [this.gifIdleDom]   : []),
            ...(this.gifActionDom ? [this.gifActionDom]  : []),
        ];
        const targets: object[] = [this, ...domTargets];
        this.scene.tweens.add({
            targets, x: this.x + 10,
            duration: 50, yoyo: true, repeat: 3, ease: 'Linear',
        });
        this.scene.cameras.main.shake(200, 0.005);
    }

    playDeathAnimation(onComplete: () => void): void {
        this.hideTooltip();
        if (this.tooltipCtn) { this.tooltipCtn.destroy(); this.tooltipCtn = null; }

        const domTargets = [
            ...(this.gifIdleDom   ? [this.gifIdleDom]   : []),
            ...(this.gifActionDom ? [this.gifActionDom]  : []),
        ];
        const targets: object[] = [this, ...domTargets];
        this.scene.tweens.add({
            targets,
            alpha: 0, scaleX: 1.4, scaleY: 0, y: this.y + 30,
            duration: 500, ease: 'Power3',
            onComplete: () => {
                if (this.gifActionTimer !== null) { clearTimeout(this.gifActionTimer); this.gifActionTimer = null; }
                if (this.gifIdleDom)   { this.gifIdleDom.destroy();   this.gifIdleDom   = null; }
                if (this.gifActionDom) { this.gifActionDom.destroy();  this.gifActionDom = null; }
                onComplete();
            },
        });
    }
}
