import { Scene } from 'phaser';
import { RunManager } from '../core/RunManager';
import { sc, fz, C } from '../config';

interface CharConfig {
    id: string;
    name: string;
    type: string;
    hp: number;
    energy: number;
    archetypes: string[];
    desc: string;
    spriteKey: string | null;
    bgKey: string | null;
    accentColor: number;
    darkColor: number;
    bgGrad1: number;
    bgGrad2: number;
}

const CHARACTERS: CharConfig[] = [
    {
        id: 'bulbizarre',
        name: 'Bulbizarre',
        type: '🌿 Plante / ☠ Poison',
        hp: 75,
        energy: 3,
        archetypes: ['Poison', 'Graine', 'Défense', 'Croissance'],
        desc: 'Maître du poison et du contrôle. Patient et méthodique — empoisonne, drains, et écrase.',
        spriteKey: 'bulbasaur_sprite',
        bgKey: 'bg_bulbizarre',
        accentColor: 0x2ecc71,
        darkColor: 0x1a8a45,
        bgGrad1: 0x0a2e14,
        bgGrad2: 0x1a5c2a,
    },
    {
        id: 'salamèche',
        name: 'Salamèche',
        type: '🔥 Feu',
        hp: 80,
        energy: 3,
        archetypes: ['Brûlure', 'Fureur', 'Critique', 'Dragon'],
        desc: 'Agressif et escaladant. Plus il souffre, plus il est dangereux. Un brasier incontrôlable.',
        spriteKey: 'char_sprite_salamèche',
        bgKey: 'bg_salamèche',
        accentColor: 0xe74c3c,
        darkColor: 0xc0392b,
        bgGrad1: 0x2e0a0a,
        bgGrad2: 0x5c1a0f,
    },
    {
        id: 'carapuce',
        name: 'Carapuce',
        type: '💧 Eau',
        hp: 85,
        energy: 3,
        archetypes: ['Carapace', 'Flux', 'Élan', 'Gel'],
        desc: 'Tank impénétrable. Sa carapace est une arme. Plus il encaisse, plus il frappe fort.',
        spriteKey: 'char_sprite_carapuce',
        bgKey: 'bg_carapuce',
        accentColor: 0x3498db,
        darkColor: 0x2980b9,
        bgGrad1: 0x0a1a2e,
        bgGrad2: 0x0f3352,
    },
];

export class CharacterSelect extends Scene {
    private bgGfx!: Phaser.GameObjects.Graphics;
    private bgImg!: Phaser.GameObjects.Image | null;
    private hoveredId: string | null = null;
    private selectedId: string = 'bulbizarre';
    private confirmBtn!: { gfx: Phaser.GameObjects.Graphics; text: Phaser.GameObjects.Text; zone: Phaser.GameObjects.Zone };
    private descText!: Phaser.GameObjects.Text;
    private archetypeTexts: Phaser.GameObjects.Text[] = [];
    private cards: { container: Phaser.GameObjects.Container; cfg: CharConfig }[] = [];

    constructor() {
        super('CharacterSelect');
    }

    create(): void {
        const { width, height } = this.scale;

        // ── Fond ──────────────────────────────────────────────────────────────
        this.bgGfx = this.add.graphics();
        this.bgImg = null;
        this.drawBackground(CHARACTERS[0]);

        // ── Titre ─────────────────────────────────────────────────────────────
        this.add.text(width / 2, sc(62), 'CHOISISSEZ VOTRE POKÉMON', {
            fontSize: fz(26), fontFamily: 'Georgia, serif', fontStyle: 'bold',
            color: C.S_GOLD, stroke: '#1a0d00', strokeThickness: sc(5), resolution: 2,
        }).setOrigin(0.5);

        // Séparateur titre
        const titSep = this.add.graphics();
        titSep.lineStyle(1, C.GOLD_BORDER, 0.5);
        titSep.lineBetween(width / 2 - sc(220), sc(82), width / 2 + sc(220), sc(82));
        titSep.fillStyle(C.GOLD, 0.8);
        titSep.fillCircle(width / 2, sc(82), sc(3));

        this.add.text(width / 2, sc(98), 'Chaque personnage possède un style de jeu unique', {
            fontSize: fz(13), fontFamily: 'Georgia, serif', fontStyle: 'italic',
            color: C.S_MUTED, stroke: '#000', strokeThickness: sc(1), resolution: 2,
        }).setOrigin(0.5);

        // ── Cartes Personnages ─────────────────────────────────────────────────
        const cardW = sc(340);
        const cardH = sc(480);
        const gap = sc(40);
        const totalW = cardW * 3 + gap * 2;
        const startX = (width - totalW) / 2 + cardW / 2;
        const cardY = sc(160) + cardH / 2;

        CHARACTERS.forEach((cfg, i) => {
            const x = startX + i * (cardW + gap);
            const container = this.makeCharCard(x, cardY, cardW, cardH, cfg, i === 0);
            this.cards.push({ container, cfg });
        });

        // ── Panneau description (bas) ─────────────────────────────────────────
        const panelY = sc(160) + cardH + sc(30);
        this.descText = this.add.text(width / 2, panelY, CHARACTERS[0].desc, {
            fontSize: fz(16),
            fontFamily: 'Georgia, serif',
            color: '#ecf0f1',
            stroke: '#000',
            strokeThickness: sc(2),
            align: 'center',
            wordWrap: { width: sc(700) },
        }).setOrigin(0.5, 0);

        // Archétypes
        const archY = panelY + sc(60);
        this.archetypeTexts = CHARACTERS[0].archetypes.map((a, i) => {
            const t = this.add.text(
                width / 2 + (i - 1.5) * sc(140),
                archY,
                `● ${a}`,
                {
                    fontSize: fz(13),
                    fontFamily: 'Georgia, serif',
                    color: `#${CHARACTERS[0].accentColor.toString(16).padStart(6, '0')}`,
                    stroke: '#000',
                    strokeThickness: sc(2),
                }
            ).setOrigin(0.5);
            return t;
        });

        // ── Bouton Confirmer ──────────────────────────────────────────────────
        this.confirmBtn = this.makeConfirmButton(width / 2, height - sc(60));

        // ── Back ───────────────────────────────────────────────────────────────
        const backZone = this.add.zone(sc(80), sc(40), sc(130), sc(36)).setInteractive({ cursor: 'pointer' });
        const backText = this.add.text(sc(80), sc(40), '← Retour', {
            fontSize: fz(14), fontFamily: 'Georgia, serif',
            color: C.S_MUTED, stroke: '#000', strokeThickness: sc(2), resolution: 2,
        }).setOrigin(0.5);
        backZone.on('pointerup', () => {
            this.cameras.main.fadeOut(300, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('MainMenu'));
        });
        backZone.on('pointerover', () => backText.setColor(C.S_GOLD));
        backZone.on('pointerout', () => backText.setColor(C.S_MUTED));

        this.cameras.main.fadeIn(500);

        // Sélection initiale
        this.selectCharacter(CHARACTERS[0]);
    }

    // ── Construction d'une carte personnage ──────────────────────────────────
    private makeCharCard(
        x: number, y: number,
        cardW: number, cardH: number,
        cfg: CharConfig,
        selected: boolean
    ): Phaser.GameObjects.Container {
        const container = this.add.container(x, y);

        // Fond de carte TCG premium
        const bg = this.add.graphics();
        const drawCard = (hovered: boolean, sel: boolean) => {
            bg.clear();
            const cr = sc(14);
            // Ombre
            bg.fillStyle(0x000000, 0.55);
            bg.fillRoundedRect(-cardW / 2 + sc(4), -cardH / 2 + sc(4), cardW, cardH, cr);
            // Corps
            bg.fillStyle(sel ? C.BG_SURFACE : (hovered ? C.BG_PANEL : C.BG_MAIN), sel ? 0.97 : 0.92);
            bg.fillRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, cr);
            // Bordure interne (couleur accent perso)
            const innerAlpha = sel ? 0.7 : hovered ? 0.5 : 0.2;
            bg.lineStyle(sel ? sc(2) : sc(1), cfg.accentColor, innerAlpha);
            bg.strokeRoundedRect(-cardW / 2 + sc(3), -cardH / 2 + sc(3), cardW - sc(6), cardH - sc(6), cr - 3);
            // Bordure externe dorée
            const goldAlpha = sel ? 1 : hovered ? 0.7 : 0.3;
            bg.lineStyle(sel ? sc(3) : sc(1.5), sel ? C.GOLD : C.GOLD_BORDER, goldAlpha);
            bg.strokeRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, cr);
        };
        drawCard(false, selected);
        container.add(bg);

        // Sprite ou fallback
        const spriteY = -cardH / 2 + sc(170);
        if (cfg.spriteKey && this.textures.exists(cfg.spriteKey)) {
            const sprite = this.add.image(0, spriteY, cfg.spriteKey);
            const maxSize = sc(180);
            const scale = Math.min(maxSize / sprite.width, maxSize / sprite.height);
            sprite.setScale(scale);
            // Bulbizarre est flipX
            if (cfg.id === 'bulbizarre') sprite.setFlipX(true);
            container.add(sprite);
        } else {
            // Pokéball stylisée comme fallback
            const fallback = this.add.graphics();
            fallback.fillStyle(cfg.accentColor, 0.9);
            fallback.fillCircle(0, spriteY, sc(70));
            fallback.fillStyle(0x000000, 0.3);
            fallback.fillRect(-sc(70), spriteY - sc(5), sc(140), sc(10));
            fallback.fillStyle(0xffffff, 0.3);
            fallback.fillCircle(0, spriteY + sc(36), sc(65));
            fallback.fillStyle(0x333333, 1);
            fallback.fillCircle(0, spriteY, sc(18));
            fallback.fillStyle(0xffffff, 0.7);
            fallback.fillCircle(0, spriteY, sc(12));
            container.add(fallback);

            // Initiale du Pokémon
            const initText = this.add.text(0, spriteY - sc(10), cfg.name[0], {
                fontSize: fz(42),
                fontFamily: 'Georgia, serif',
                color: '#ffffff',
                stroke: '#000',
                strokeThickness: sc(4),
            }).setOrigin(0.5);
            container.add(initText);
        }

        // Nom
        const nameText = this.add.text(0, -cardH / 2 + sc(290), cfg.name, {
            fontSize: fz(22),
            fontFamily: 'Georgia, serif',
            color: `#${cfg.accentColor.toString(16).padStart(6, '0')}`,
            stroke: '#000000',
            strokeThickness: sc(4),
        }).setOrigin(0.5);
        container.add(nameText);

        // Type
        container.add(this.add.text(0, -cardH / 2 + sc(322), cfg.type, {
            fontSize: fz(13),
            fontFamily: 'Georgia, serif',
            color: '#bdc3c7',
            stroke: '#000',
            strokeThickness: sc(2),
        }).setOrigin(0.5));

        // Stats
        const statsY = -cardH / 2 + sc(355);
        container.add(this.add.text(-sc(60), statsY, `❤ ${cfg.hp} PV`, {
            fontSize: fz(13),
            fontFamily: 'Georgia, serif',
            color: '#e74c3c',
            stroke: '#000',
            strokeThickness: sc(2),
        }).setOrigin(0.5));
        container.add(this.add.text(sc(60), statsY, `⚡ ${cfg.energy} Énergie`, {
            fontSize: fz(13),
            fontFamily: 'Georgia, serif',
            color: '#f39c12',
            stroke: '#000',
            strokeThickness: sc(2),
        }).setOrigin(0.5));

        // Tags archétypes (2 premiers)
        cfg.archetypes.slice(0, 2).forEach((arch, i) => {
            const tagX = (i === 0) ? -sc(70) : sc(70);
            const tagBg = this.add.graphics();
            const tw = sc(116);
            const th = sc(24);
            tagBg.fillStyle(cfg.accentColor, 0.25);
            tagBg.fillRoundedRect(tagX - tw / 2, -cardH / 2 + sc(390) - th / 2, tw, th, sc(6));
            tagBg.lineStyle(sc(1), cfg.accentColor, 0.6);
            tagBg.strokeRoundedRect(tagX - tw / 2, -cardH / 2 + sc(390) - th / 2, tw, th, sc(6));
            container.add(tagBg);

            container.add(this.add.text(tagX, -cardH / 2 + sc(390), arch, {
                fontSize: fz(11),
                fontFamily: 'Georgia, serif',
                color: `#${cfg.accentColor.toString(16).padStart(6, '0')}`,
            }).setOrigin(0.5));
        });

        // Séparateur bas
        const sepGfx = this.add.graphics();
        sepGfx.lineStyle(sc(1), cfg.accentColor, 0.4);
        sepGfx.lineBetween(-cardW / 2 + sc(20), -cardH / 2 + sc(416), cardW / 2 - sc(20), -cardH / 2 + sc(416));
        container.add(sepGfx);

        // "Sélectionné" badge
        if (selected) {
            const badge = this.add.text(0, cardH / 2 - sc(24), '✓ SÉLECTIONNÉ', {
                fontSize: fz(12),
                fontFamily: 'Georgia, serif',
                color: `#${cfg.accentColor.toString(16).padStart(6, '0')}`,
                stroke: '#000',
                strokeThickness: sc(2),
            }).setOrigin(0.5);
            badge.setName('selected_badge');
            container.add(badge);
        }

        // Interactivité
        const zone = this.add.zone(0, 0, cardW, cardH).setInteractive({ cursor: 'pointer' });
        container.add(zone);

        zone.on('pointerover', () => {
            if (this.selectedId !== cfg.id) {
                drawCard(true, false);
                this.tweens.add({ targets: container, scaleX: 1.03, scaleY: 1.03, duration: 120, ease: 'Quad.Out' });
            }
            this.updateInfoPanel(cfg);
            this.drawBackground(cfg);
        });

        zone.on('pointerout', () => {
            const isSel = this.selectedId === cfg.id;
            drawCard(false, isSel);
            if (!isSel) {
                this.tweens.add({ targets: container, scaleX: 1, scaleY: 1, duration: 120, ease: 'Quad.Out' });
            }
            const selCfg = CHARACTERS.find(c => c.id === this.selectedId)!;
            this.updateInfoPanel(selCfg);
            this.drawBackground(selCfg);
        });

        zone.on('pointerup', () => {
            this.selectCharacter(cfg);
        });

        // Garder référence pour mise à jour de l'état sélectionné
        (container as any)._cfg = cfg;
        (container as any)._drawCard = drawCard;

        return container;
    }

    // ── Sélection d'un personnage ─────────────────────────────────────────────
    private selectCharacter(cfg: CharConfig): void {
        this.selectedId = cfg.id;

        // Reset toutes les cartes
        this.cards.forEach(({ container, cfg: c }) => {
            const draw = (container as any)._drawCard;
            const isSel = c.id === cfg.id;
            draw(false, isSel);

            // Echelle
            this.tweens.add({
                targets: container,
                scaleX: isSel ? 1.05 : 1,
                scaleY: isSel ? 1.05 : 1,
                duration: 180,
                ease: 'Back.Out',
            });

            // Mise à jour du badge
            const existingBadge = container.getByName('selected_badge') as Phaser.GameObjects.Text | null;
            if (existingBadge) container.remove(existingBadge, true);

            if (isSel) {
                const badge = this.add.text(0, sc(220), '✓ SÉLECTIONNÉ', {
                    fontSize: fz(12),
                    fontFamily: 'Georgia, serif',
                    color: `#${c.accentColor.toString(16).padStart(6, '0')}`,
                    stroke: '#000',
                    strokeThickness: sc(2),
                }).setOrigin(0.5).setName('selected_badge');
                container.add(badge);
            }
        });

        this.updateInfoPanel(cfg);
        this.drawBackground(cfg);
        this.updateConfirmButton(cfg);
    }

    // ── Panneau d'info bas ────────────────────────────────────────────────────
    private updateInfoPanel(cfg: CharConfig): void {
        this.descText.setText(cfg.desc);

        // Supprimer anciens archétypes
        this.archetypeTexts.forEach(t => t.destroy());
        this.archetypeTexts = [];

        const { width } = this.scale;
        const panelY = sc(160) + sc(480) + sc(30);
        const archY = panelY + sc(60);

        this.archetypeTexts = cfg.archetypes.map((a, i) => {
            return this.add.text(
                width / 2 + (i - 1.5) * sc(140),
                archY,
                `● ${a}`,
                {
                    fontSize: fz(13),
                    fontFamily: 'Georgia, serif',
                    color: `#${cfg.accentColor.toString(16).padStart(6, '0')}`,
                    stroke: '#000',
                    strokeThickness: sc(2),
                }
            ).setOrigin(0.5);
        });
    }

    // ── Background dynamique ──────────────────────────────────────────────────
    private drawBackground(cfg: CharConfig): void {
        const { width, height } = this.scale;
        this.bgGfx.clear();

        if (cfg.bgKey && this.textures.exists(cfg.bgKey)) {
            // Image de fond
            if (!this.bgImg) {
                this.bgImg = this.add.image(width / 2, height / 2, cfg.bgKey);
                this.bgImg.setDisplaySize(width, height);
                this.bgImg.setDepth(-1);
            } else {
                this.bgImg.setTexture(cfg.bgKey);
                this.bgImg.setDisplaySize(width, height);
            }
            // Overlay premium (fond sombre + vignette basse)
            this.bgGfx.fillStyle(C.BG_DEEP, 0.68);
            this.bgGfx.fillRect(0, 0, width, height);
        } else {
            // Gradient procédural par personnage
            if (this.bgImg) { this.bgImg.destroy(); this.bgImg = null; }
            this.bgGfx.fillGradientStyle(cfg.bgGrad1, cfg.bgGrad1, cfg.bgGrad2, cfg.bgGrad2, 1);
            this.bgGfx.fillRect(0, 0, width, height);

            // Particules décoratives colorées
            for (let i = 0; i < 40; i++) {
                const px = Math.random() * width;
                const py = Math.random() * height;
                const pr = Math.random() * sc(3) + sc(0.5);
                const pa = Math.random() * 0.4 + 0.1;
                this.bgGfx.fillStyle(cfg.accentColor, pa);
                this.bgGfx.fillCircle(px, py, pr);
            }
        }
    }

    // ── Bouton Confirmer ──────────────────────────────────────────────────────
    private makeConfirmButton(x: number, y: number): { gfx: Phaser.GameObjects.Graphics; text: Phaser.GameObjects.Text; zone: Phaser.GameObjects.Zone } {
        const cfg = CHARACTERS.find(c => c.id === this.selectedId)!;
        const w = sc(300);
        const h = sc(54);

        const gfx = this.add.graphics();
        const text = this.add.text(x, y, `Jouer avec ${cfg.name}`, {
            fontSize: fz(16), fontFamily: 'Georgia, serif', fontStyle: 'bold',
            color: C.S_GOLD, stroke: '#000', strokeThickness: sc(2), resolution: 2,
        }).setOrigin(0.5).setDepth(1);

        const zone = this.add.zone(x, y, w, h).setInteractive({ cursor: 'pointer' }).setDepth(2);

        const draw = (hover: boolean) => {
            gfx.clear();
            // Ombre
            gfx.fillStyle(0x000000, 0.45);
            gfx.fillRoundedRect(x - w / 2 + sc(3), y - h / 2 + sc(3), w, h, sc(12));
            // Corps
            gfx.fillStyle(hover ? C.BG_SURFACE : C.BG_PANEL, 1);
            gfx.fillRoundedRect(x - w / 2, y - h / 2, w, h, sc(12));
            // Bordure or
            gfx.lineStyle(hover ? sc(2.5) : sc(1.5), hover ? C.GOLD : C.GOLD_BORDER, 1);
            gfx.strokeRoundedRect(x - w / 2, y - h / 2, w, h, sc(12));
        };
        draw(false);

        zone.on('pointerover', () => { draw(true); text.setColor(C.S_GOLD_HI); });
        zone.on('pointerout', () => { draw(false); text.setColor(C.S_GOLD); });
        zone.on('pointerup', () => this.startRun());

        return { gfx, text, zone };
    }

    private updateConfirmButton(cfg: CharConfig): void {
        this.confirmBtn.text.setText(`Jouer avec ${cfg.name}`);
        const { x, y } = this.confirmBtn.zone;
        const w = sc(300);
        const h = sc(54);
        this.confirmBtn.gfx.clear();
        this.confirmBtn.gfx.fillStyle(0x000000, 0.45);
        this.confirmBtn.gfx.fillRoundedRect(x - w / 2 + sc(3), y - h / 2 + sc(3), w, h, sc(12));
        this.confirmBtn.gfx.fillStyle(C.BG_PANEL, 1);
        this.confirmBtn.gfx.fillRoundedRect(x - w / 2, y - h / 2, w, h, sc(12));
        this.confirmBtn.gfx.lineStyle(sc(1.5), C.GOLD_BORDER, 1);
        this.confirmBtn.gfx.strokeRoundedRect(x - w / 2, y - h / 2, w, h, sc(12));
    }

    // ── Lancement du run ──────────────────────────────────────────────────────
    private startRun(): void {
        RunManager.startNewRun(this.selectedId);
        this.cameras.main.fadeOut(400, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('MapScene');
        });
    }
}
