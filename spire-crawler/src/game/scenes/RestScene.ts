import { Scene } from 'phaser';
import { RunManager } from '../core/RunManager';
import { CardView } from '../ui/CardView';

export interface RestSceneData {
    nodeId: string;
}

export class RestScene extends Scene {
    private cardViews: CardView[] = [];

    constructor() {
        super('RestScene');
    }

    create(data: RestSceneData): void {
        const run = RunManager.instance;
        const { width, height } = this.scale;

        run.markNodeCompleted(data.nodeId);
        this.drawBackground();

        this.add.text(width / 2, 60, 'Site de Repos', {
            fontSize: '32px', fontFamily: 'Georgia, serif',
            color: '#27ae60', stroke: '#000', strokeThickness: 4,
        }).setOrigin(0.5);

        this.add.text(width / 2, 100, `PV : ${run.playerHp} / ${run.playerMaxHp}`, {
            fontSize: '16px', fontFamily: 'Georgia, serif', color: '#ecf0f1',
        }).setOrigin(0.5);

        // Option 1 : Se reposer (+30% PV max)
        this.makeOptionButton(width / 2 - 140, height / 2, '❤ Se Reposer', 0x27ae60,
            `+${Math.floor(run.playerMaxHp * 0.3)} PV`, () => {
                run.heal(Math.floor(run.playerMaxHp * 0.3));
                this.goToMap();
            });

        // Option 2 : Améliorer une carte
        this.makeOptionButton(width / 2 + 140, height / 2, '⚒ Forger', 0xe67e22,
            'Améliorer 1 carte', () => {
                this.showUpgradeMode(run);
            });

        this.cameras.main.fadeIn(400);
    }

    private showUpgradeMode(run: RunManager): void {
        // Effacer les boutons d'option
        this.children.list
            .filter(c => (c as Phaser.GameObjects.Text).text === 'Choisissez une carte à améliorer')
            .forEach(c => c.destroy());

        this.add.text(this.scale.width / 2, 130, 'Choisissez une carte à améliorer :', {
            fontSize: '14px', fontFamily: 'Georgia, serif', color: '#bdc3c7',
        }).setOrigin(0.5);

        const upgradeable = run.deck.filter(c => !c.upgraded);
        const { width, height } = this.scale;
        const cardW = CardView.WIDTH + 12;
        const perRow = Math.min(8, upgradeable.length);
        const startX = width / 2 - (perRow - 1) * cardW / 2;

        upgradeable.forEach((card, i) => {
            const row = Math.floor(i / 8);
            const col = i % 8;
            const x = startX + col * cardW;
            const y = height / 2 - 20 + row * (CardView.HEIGHT + 12);
            const view = new CardView({ scene: this, card, x, y, scale: 0.9 });
            view.on('pointerup', () => {
                run.upgradeCardInDeck(card.instanceId);
                this.goToMap();
            });
            this.cardViews.push(view);
        });
    }

    private makeOptionButton(x: number, y: number, title: string, color: number, subtitle: string, onClick: () => void): void {
        const w = 200;
        const h = 100;
        const btn = this.add.graphics();
        btn.fillStyle(color, 0.2);
        btn.fillRoundedRect(x - w / 2, y - h / 2, w, h, 14);
        btn.lineStyle(2, color, 0.8);
        btn.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 14);

        this.add.text(x, y - 16, title, {
            fontSize: '18px', fontFamily: 'Georgia, serif', color: '#fff',
        }).setOrigin(0.5);

        this.add.text(x, y + 14, subtitle, {
            fontSize: '12px', fontFamily: 'Georgia, serif', color: '#bdc3c7',
        }).setOrigin(0.5);

        const zone = this.add.zone(x, y, w, h).setInteractive({ cursor: 'pointer' });
        zone.on('pointerover', () => { btn.clear(); btn.fillStyle(color, 0.5); btn.fillRoundedRect(x - w / 2, y - h / 2, w, h, 14); });
        zone.on('pointerout', () => { btn.clear(); btn.fillStyle(color, 0.2); btn.fillRoundedRect(x - w / 2, y - h / 2, w, h, 14); btn.lineStyle(2, color, 0.8); btn.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 14); });
        zone.on('pointerup', onClick);
    }

    private drawBackground(): void {
        const { width, height } = this.scale;

        if (this.textures.exists('rest_bg')) {
            const bg = this.add.image(width / 2, height / 2, 'rest_bg');
            bg.setDisplaySize(width, height);
            // Léger overlay sombre pour améliorer la lisibilité du texte
            const overlay = this.add.graphics();
            overlay.fillStyle(0x000000, 0.35);
            overlay.fillRect(0, 0, width, height);
        } else {
            // Fallback procédural
            const bg = this.add.graphics();
            bg.fillGradientStyle(0x0a1a0a, 0x0d1a0d, 0x0d1117, 0x0d1a0d, 1);
            bg.fillRect(0, 0, width, height);
        }
    }

    private goToMap(): void {
        this.cameras.main.fadeOut(400, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('MapScene');
        });
    }
}
