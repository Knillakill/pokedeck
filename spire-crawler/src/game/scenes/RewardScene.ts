import { Scene } from 'phaser';
import { RunManager } from '../core/RunManager';
import { CardInstance } from '../core/cards/CardInstance';
import { CardView } from '../ui/CardView';
import { ALL_CARD_IDS } from '../core/cards/cards.data';

export interface RewardSceneData {
    nodeId: string;
    isElite?: boolean;
    isBoss?: boolean;
}

export class RewardScene extends Scene {
    constructor() {
        super('RewardScene');
    }

    create(data: RewardSceneData): void {
        const { width, height } = this.scale;
        const run = RunManager.instance;

        this.drawBackground();

        // Titre
        this.add.text(width / 2, 60, 'Récompense de Combat', {
            fontSize: '32px', fontFamily: 'Georgia, serif',
            color: '#f39c12', stroke: '#000', strokeThickness: 4,
        }).setOrigin(0.5);

        this.add.text(width / 2, 100, 'Choisissez une carte à ajouter à votre deck', {
            fontSize: '14px', fontFamily: 'Georgia, serif', color: '#bdc3c7',
        }).setOrigin(0.5);

        // Générer 3 cartes au choix
        const offered = this.generateRewardCards(data.isElite, data.isBoss);
        const cardY = height / 2;
        const spacing = CardView.WIDTH + 40;
        const startX = width / 2 - spacing;

        offered.forEach((card, i) => {
            const x = startX + i * spacing;
            const view = new CardView({ scene: this, card, x, y: cardY, scale: 1.3 });
            view.on('pointerup', () => this.pickCard(card));
        });

        // Bouton "Ignorer"
        this.makeButton(width / 2, height - 80, 'Ignorer', 0x7f8c8d, () => {
            this.goToMap();
        });

        // PV gagnés
        const goldReward = data.isBoss ? 100 : data.isElite ? 50 : 25;
        run.playerGold += goldReward;
        this.add.text(width / 2, height - 140, `+${goldReward} pièces d'or`, {
            fontSize: '18px', fontFamily: 'Georgia, serif',
            color: '#f1c40f', stroke: '#000', strokeThickness: 2,
        }).setOrigin(0.5);

        this.cameras.main.fadeIn(400);
    }

    private generateRewardCards(_isElite = false, _isBoss = false): CardInstance[] {
        const allIds = [...ALL_CARD_IDS];
        const shuffled = allIds.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3).map(id => new CardInstance(id));
    }

    private pickCard(card: CardInstance): void {
        RunManager.instance.addCardToDeck(card);
        this.goToMap();
    }

    private goToMap(): void {
        this.cameras.main.fadeOut(400, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('MapScene');
        });
    }

    private drawBackground(): void {
        const { width, height } = this.scale;
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x0d1117, 0x1a1a2e, 0x0d1117, 0x16213e, 1);
        bg.fillRect(0, 0, width, height);

        // Lueur centrale dorée
        const glow = this.add.graphics();
        glow.fillStyle(0xf39c12, 0.04);
        glow.fillCircle(width / 2, height / 2, 300);
    }

    private makeButton(x: number, y: number, label: string, color: number, onClick: () => void): void {
        const w = 160;
        const h = 44;
        const btn = this.add.graphics();
        btn.fillStyle(color, 0.9);
        btn.fillRoundedRect(x - w / 2, y - h / 2, w, h, 10);

        this.add.text(x, y, label, {
            fontSize: '16px', fontFamily: 'Georgia, serif', color: '#fff',
        }).setOrigin(0.5);

        this.add.zone(x, y, w, h).setInteractive({ cursor: 'pointer' })
            .on('pointerup', onClick);
    }
}
