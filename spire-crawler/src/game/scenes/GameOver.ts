import { Scene } from 'phaser';
import { RunManager } from '../core/RunManager';

export class GameOver extends Scene {
    constructor() {
        super('GameOver');
    }

    create(): void {
        const { width, height } = this.scale;
        const cx = width / 2;
        const cy = height / 2;

        const bg = this.add.graphics();
        bg.fillGradientStyle(0x1a0000, 0x000000, 0x1a0000, 0x000000, 1);
        bg.fillRect(0, 0, width, height);

        this.add.text(cx, cy - 100, 'DÉFAITE', {
            fontSize: '64px',
            fontFamily: 'Georgia, serif',
            color: '#e74c3c',
            stroke: '#000',
            strokeThickness: 6,
        }).setOrigin(0.5);

        this.add.text(cx, cy - 20, 'Votre aventure s\'arrête ici...', {
            fontSize: '18px', fontFamily: 'Georgia, serif', color: '#bdc3c7',
        }).setOrigin(0.5);

        if (RunManager.isActive) {
            const run = RunManager.instance;
            this.add.text(cx, cy + 30, `Étage atteint : ${run.floor}  |  Cartes dans le deck : ${run.deck.length}`, {
                fontSize: '14px', fontFamily: 'Georgia, serif', color: '#7f8c8d',
            }).setOrigin(0.5);
        }

        this.makeButton(cx, cy + 110, '↩ Rejouer', 0xe74c3c, () => {
            this.cameras.main.fadeOut(400, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('MainMenu');
            });
        });

        this.cameras.main.fadeIn(800);

        // Particules de sang
        for (let i = 0; i < 30; i++) {
            const particle = this.add.graphics();
            particle.fillStyle(0xe74c3c, Math.random() * 0.6 + 0.2);
            particle.fillCircle(0, 0, Math.random() * 4 + 1);
            particle.x = Math.random() * width;
            particle.y = Math.random() * height;
            this.tweens.add({
                targets: particle,
                y: particle.y + 20,
                alpha: 0,
                duration: 2000 + Math.random() * 3000,
                delay: Math.random() * 2000,
                onComplete: () => particle.destroy(),
            });
        }
    }

    private makeButton(x: number, y: number, label: string, color: number, onClick: () => void): void {
        const w = 200;
        const h = 52;
        const btn = this.add.graphics();
        btn.fillStyle(color, 0.8);
        btn.fillRoundedRect(x - w / 2, y - h / 2, w, h, 12);

        this.add.text(x, y, label, {
            fontSize: '20px', fontFamily: 'Georgia, serif', color: '#fff',
        }).setOrigin(0.5);

        this.add.zone(x, y, w, h).setInteractive({ cursor: 'pointer' }).on('pointerup', onClick);
    }
}
