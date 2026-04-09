import { Scene } from 'phaser';
import { C, sc, fz } from '../config';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create(): void {
        const { width, height } = this.scale;
        const cx = width / 2;
        const cy = height / 2;

        this.drawBackground();

        // ── Sous-titre décoratif au-dessus ───────────────────────────────────
        this.add.text(cx, cy - sc(175), '— POKÉMON SPIRE —', {
            fontSize: fz(12), fontFamily: 'Georgia, serif', fontStyle: 'italic',
            color: C.S_GOLD, stroke: '#000', strokeThickness: 1,
            resolution: 2,
        }).setOrigin(0.5).setAlpha(0.75);

        // ── Titre principal ───────────────────────────────────────────────────
        const title = this.add.text(cx, cy - sc(140), 'POKÉDECK', {
            fontSize: fz(52), fontFamily: 'Georgia, serif', fontStyle: 'bold',
            color: C.S_GOLD, stroke: '#1a0d00', strokeThickness: sc(6),
            resolution: 2,
        }).setOrigin(0.5);
        this.tweens.add({
            targets: title,
            y: cy - sc(136),
            duration: 2200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
        });

        // Halo or derrière le titre
        const glow = this.add.graphics().setAlpha(0.12);
        glow.fillStyle(C.GOLD, 1);
        glow.fillEllipse(cx, cy - sc(140), sc(480), sc(70));
        glow.setDepth(-1);

        // ── Sous-titre ────────────────────────────────────────────────────────
        this.add.text(cx, cy - sc(90), 'Un deckbuilder roguelike dans l\'univers Pokémon', {
            fontSize: fz(14), fontFamily: 'Georgia, serif',
            color: C.S_MUTED, stroke: '#000', strokeThickness: 2, resolution: 2,
        }).setOrigin(0.5);

        // ── Séparateur ornemental ────────────────────────────────────────────
        const sep = this.add.graphics();
        sep.lineStyle(1, C.GOLD_BORDER, 0.5);
        sep.lineBetween(cx - sc(140), cy - sc(68), cx + sc(140), cy - sc(68));
        sep.fillStyle(C.GOLD, 0.7);
        sep.fillCircle(cx - sc(140), cy - sc(68), sc(3));
        sep.fillCircle(cx + sc(140), cy - sc(68), sc(3));
        sep.fillCircle(cx, cy - sc(68), sc(4));

        // ── Boutons ───────────────────────────────────────────────────────────
        this.makeButton(cx, cy - sc(28), 'Nouvelle Partie', () => {
            this.cameras.main.fadeOut(400, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('CharacterSelect');
            });
        });

        this.makeButton(cx, cy + sc(46), 'Voir les Cartes', () => {
            this.scene.start('DeckViewer');
        }, false);

        // ── Footer ────────────────────────────────────────────────────────────
        this.add.text(cx, height - sc(24), 'v0.1.0  ·  PokéDeck Roguelike', {
            fontSize: fz(10), fontFamily: 'Georgia, serif',
            color: C.S_DIM, resolution: 2,
        }).setOrigin(0.5);

        this.cameras.main.fadeIn(700);
    }

    private drawBackground(): void {
        const { width, height } = this.scale;
        const bg = this.add.graphics();
        bg.fillGradientStyle(C.BG_DEEP, C.BG_DEEP, C.BG_MAIN, C.BG_PANEL, 1);
        bg.fillRect(0, 0, width, height);

        // Vignette centrale (radial sombre)
        const vig = this.add.graphics();
        vig.fillStyle(0x000000, 0.35);
        vig.fillCircle(width / 2, height * 0.62, height * 0.72);

        // Particules dorées
        for (let i = 0; i < 55; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = Math.random() * sc(2) + sc(0.5);
            const a = Math.random() * 0.55 + 0.15;
            const star = this.add.graphics();
            star.fillStyle(C.GOLD, a);
            star.fillCircle(x, y, r);
            this.tweens.add({
                targets: star,
                alpha: 0.05,
                duration: 1200 + Math.random() * 2200,
                yoyo: true, repeat: -1,
                delay: Math.random() * 2000,
            });
        }

        // Quelques étoiles pourpres
        for (let i = 0; i < 18; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const star = this.add.graphics();
            star.fillStyle(C.PURPLE, 0.20 + Math.random() * 0.25);
            star.fillCircle(x, y, sc(1.5) + Math.random() * sc(1));
            this.tweens.add({
                targets: star,
                alpha: 0.02,
                duration: 1800 + Math.random() * 3000,
                yoyo: true, repeat: -1,
                delay: Math.random() * 3000,
            });
        }
    }

    private makeButton(
        x: number, y: number, text: string,
        onClick: () => void,
        primary = true,
    ): void {
        const bw = sc(250), bh = sc(54), br = sc(10);
        const bg = this.add.graphics();

        const draw = (hover: boolean) => {
            bg.clear();
            // Ombre
            bg.fillStyle(0x000000, 0.45);
            bg.fillRoundedRect(x - bw / 2 + sc(3), y - bh / 2 + sc(3), bw, bh, br);
            // Fond
            bg.fillStyle(hover ? C.BG_SURFACE : C.BG_PANEL, 1);
            bg.fillRoundedRect(x - bw / 2, y - bh / 2, bw, bh, br);
            // Bordure
            const borderColor = primary
                ? (hover ? C.GOLD : C.GOLD_BORDER)
                : (hover ? C.GOLD_DIM : C.PURPLE_SOFT);
            bg.lineStyle(hover ? 2.5 : 1.5, borderColor, 1);
            bg.strokeRoundedRect(x - bw / 2, y - bh / 2, bw, bh, br);
            // Reflet interne or sur hover
            if (hover) {
                bg.lineStyle(1, primary ? C.GOLD : C.PURPLE, 0.18);
                bg.strokeRoundedRect(x - bw / 2 + sc(2), y - bh / 2 + sc(2), bw - sc(4), bh - sc(4), br - 2);
            }
        };

        draw(false);

        const label = this.add.text(x, y, text, {
            fontSize: fz(16), fontFamily: 'Georgia, serif', fontStyle: 'bold',
            color: primary ? C.S_GOLD : C.S_MUTED,
            stroke: '#000', strokeThickness: 2, resolution: 2,
        }).setOrigin(0.5);

        const zone = this.add.zone(x, y, bw, bh).setInteractive({ cursor: 'pointer' });
        zone.on('pointerover', () => { draw(true); label.setColor(C.S_GOLD_HI); });
        zone.on('pointerout',  () => { draw(false); label.setColor(primary ? C.S_GOLD : C.S_MUTED); });
        zone.on('pointerup', onClick);
    }
}
