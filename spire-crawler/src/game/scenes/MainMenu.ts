import { Scene } from 'phaser';
import { RunManager } from '../core/RunManager';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create(): void {
        const { width, height } = this.scale;
        const cx = width / 2;
        const cy = height / 2;

        this.drawBackground();

        // Titre
        const title = this.add.text(cx, cy - 160, 'POKÉDECK', {
            fontSize: '56px',
            fontFamily: 'Georgia, serif',
            color: '#2ecc71',
            stroke: '#000000',
            strokeThickness: 6,
        }).setOrigin(0.5);
        this.tweens.add({
            targets: title,
            y: cy - 155,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
        });

        this.add.text(cx, cy - 100, 'Un deckbuilder roguelike dans l\'univers Pokémon', {
            fontSize: '16px',
            fontFamily: 'Georgia, serif',
            color: '#a9dfbf',
            stroke: '#000',
            strokeThickness: 2,
        }).setOrigin(0.5);

        // Bouton Jouer
        this.makeButton(cx, cy - 20, 'Nouvelle Partie', 0x27ae60, 0x2ecc71, () => {
            RunManager.startNewRun('bulbizarre');
            this.cameras.main.fadeOut(400, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('MapScene');
            });
        });

        // Deck Viewer
        this.makeButton(cx, cy + 50, 'Voir les Cartes', 0x2980b9, 0x3498db, () => {
            this.scene.start('DeckViewer');
        });

        // Footer
        this.add.text(cx, height - 24, 'v0.1.0 — Sprites à venir', {
            fontSize: '11px',
            fontFamily: 'Georgia, serif',
            color: '#636e72',
        }).setOrigin(0.5);

        this.cameras.main.fadeIn(600);
    }

    private drawBackground(): void {
        const { width, height } = this.scale;
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x0d1117, 0x0d1117, 0x1a1a2e, 0x1a1a2e, 1);
        bg.fillRect(0, 0, width, height);

        // Particules décoratives
        for (let i = 0; i < 60; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = Math.random() * 2 + 0.5;
            const a = Math.random() * 0.6 + 0.2;
            const star = this.add.graphics();
            star.fillStyle(0xf39c12, a);
            star.fillCircle(x, y, r);
            this.tweens.add({
                targets: star,
                alpha: 0.1,
                duration: 1000 + Math.random() * 2000,
                yoyo: true,
                repeat: -1,
                delay: Math.random() * 2000,
            });
        }
    }

    private makeButton(
        x: number, y: number, text: string,
        colorFrom: number, colorTo: number,
        onClick: () => void
    ): void {
        const btn = this.add.graphics();
        const w = 240;
        const h = 50;

        const draw = (hover: boolean) => {
            btn.clear();
            btn.fillStyle(hover ? colorTo : colorFrom, 1);
            btn.fillRoundedRect(x - w / 2, y - h / 2, w, h, 12);
            btn.lineStyle(2, 0xffffff, hover ? 0.5 : 0.2);
            btn.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 12);
        };

        draw(false);

        this.add.text(x, y, text, {
            fontSize: '18px',
            fontFamily: 'Georgia, serif',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 2,
        }).setOrigin(0.5);

        const zone = this.add.zone(x, y, w, h).setInteractive({ cursor: 'pointer' });
        zone.on('pointerover', () => draw(true));
        zone.on('pointerout', () => draw(false));
        zone.on('pointerup', onClick);
    }
}
