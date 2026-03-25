import { Scene } from 'phaser';
import { CardInstance } from '../core/cards/CardInstance';
import { CardView } from '../ui/CardView';
import { ALL_CARD_IDS } from '../core/cards/cards.data';

/**
 * Visionneuse de toutes les cartes disponibles dans le jeu.
 * Accessible depuis le menu principal pour voir le pool de cartes.
 */
export class DeckViewer extends Scene {
    constructor() {
        super('DeckViewer');
    }

    create(): void {
        const { width, height } = this.scale;

        const bg = this.add.graphics();
        bg.fillGradientStyle(0x0d1117, 0x1a1a2e, 0x0d1117, 0x16213e, 1);
        bg.fillRect(0, 0, width, height);

        this.add.text(width / 2, 36, 'Toutes les Cartes', {
            fontSize: '28px', fontFamily: 'Georgia, serif',
            color: '#f39c12', stroke: '#000', strokeThickness: 3,
        }).setOrigin(0.5);

        // Afficher toutes les cartes (normal + upgradé côte à côte)
        const cardW = CardView.WIDTH + 10;
        const cardsPerRow = 8;
        const startX = width / 2 - (cardsPerRow - 1) * cardW / 2;
        const startY = 100;

        ALL_CARD_IDS.forEach((id, i) => {
            const row = Math.floor(i / cardsPerRow);
            const col = i % cardsPerRow;
            const x = startX + col * cardW;
            const y = startY + row * (CardView.HEIGHT + 10) + CardView.HEIGHT / 2;

            // Version normale
            new CardView({ scene: this, card: new CardInstance(id, false), x, y, interactive: false, scale: 0.85 });
        });

        // Bouton retour
        const backBtn = this.add.text(40, 24, '← Retour', {
            fontSize: '14px', fontFamily: 'Georgia, serif', color: '#bdc3c7',
        }).setInteractive({ cursor: 'pointer' });
        backBtn.on('pointerup', () => this.scene.start('MainMenu'));
        backBtn.on('pointerover', () => backBtn.setColor('#fff'));
        backBtn.on('pointerout', () => backBtn.setColor('#bdc3c7'));

        this.cameras.main.fadeIn(400);
    }
}
