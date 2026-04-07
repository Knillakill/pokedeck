import { Scene } from 'phaser';
import { RunManager } from '../core/RunManager';
import { CardInstance } from '../core/cards/CardInstance';
import { CardView } from '../ui/CardView';
import { RARE_REWARD_IDS } from '../core/cards/cards.data';
import { getRandomRelic, RELIC_ICONS, RELIC_COLORS } from '../core/relics/relics.data';
import { RelicRarity } from '../core/types';

const PANEL_W = 460;
const PANEL_H = 560;
const PANEL_R = 18;

export class StartChoiceScene extends Scene {
    private selectedToRemove: string[] = [];
    private cardViews: CardView[] = [];
    private confirmBtn?: Phaser.GameObjects.Container;

    constructor() {
        super('StartChoiceScene');
    }

    create(): void {
        const { width, height } = this.scale;
        const cx = width / 2;
        const cy = height / 2 + 20;

        this.drawBackground();

        this.add.text(cx, 48, 'Choisissez votre avantage de départ', {
            fontSize: '36px', fontFamily: 'Georgia, serif',
            color: '#f39c12', stroke: '#000', strokeThickness: 4,
        }).setOrigin(0.5);

        this.add.text(cx, 96, 'Une seule option. Votre destin commence ici.', {
            fontSize: '16px', fontFamily: 'Georgia, serif', color: '#7f8c8d',
        }).setOrigin(0.5);

        const gap  = PANEL_W + 40;
        const panX = [cx - gap, cx, cx + gap];

        this.buildRelicPanel(panX[0], cy);
        this.buildRareCardPanel(panX[1], cy);
        this.buildRemovePanel(panX[2], cy);

        this.cameras.main.fadeIn(500);
    }

    // ── Panel générique ───────────────────────────────────────────────────────

    private makePanel(x: number, y: number, color: number): Phaser.GameObjects.Graphics {
        const g = this.add.graphics();
        g.fillStyle(0x0d1117, 0.92);
        g.fillRoundedRect(x - PANEL_W / 2, y - PANEL_H / 2, PANEL_W, PANEL_H, PANEL_R);
        g.lineStyle(2, color, 0.8);
        g.strokeRoundedRect(x - PANEL_W / 2, y - PANEL_H / 2, PANEL_W, PANEL_H, PANEL_R);
        return g;
    }

    private makeTitle(x: number, y: number, text: string, color: string): void {
        this.add.text(x, y, text, {
            fontSize: '24px', fontFamily: 'Georgia, serif',
            color, stroke: '#000', strokeThickness: 3,
        }).setOrigin(0.5);
    }

    private makeChooseBtn(x: number, y: number, color: number, onClick: () => void, disabled = false): Phaser.GameObjects.Container {
        const w = 200; const h = 48;
        const btn = this.add.container(x, y);
        const bg  = this.add.graphics();

        const draw = (hover: boolean) => {
            bg.clear();
            bg.fillStyle(color, hover ? 1 : 0.85);
            bg.fillRoundedRect(-w / 2, -h / 2, w, h, 10);
            bg.lineStyle(2, 0xffffff, hover ? 0.7 : 0.25);
            bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 10);
        };
        draw(false);

        const label = this.add.text(0, 0, 'Choisir', {
            fontSize: '20px', fontFamily: 'Georgia, serif',
            color: '#fff', stroke: '#000', strokeThickness: 2,
        }).setOrigin(0.5);

        const zone = this.add.zone(0, 0, w, h).setInteractive({ cursor: 'pointer' });
        zone.on('pointerover', () => draw(true));
        zone.on('pointerout',  () => draw(false));
        zone.on('pointerup',   onClick);

        btn.add([bg, label, zone]);
        if (disabled) btn.setAlpha(0.35);
        return btn;
    }

    // ── Option 1 : Relique ────────────────────────────────────────────────────

    private buildRelicPanel(x: number, y: number): void {
        const run   = RunManager.instance;
        const relic = getRandomRelic(run.relics.map(r => r.id));
        const color = RELIC_COLORS[relic.rarity as RelicRarity] ?? 0x95a5a6;
        const icon  = RELIC_ICONS[relic.id] ?? '✦';

        this.makePanel(x, y, color);
        this.makeTitle(x, y - PANEL_H / 2 + 36, '✦  Relique', '#f1c40f');

        // Cercle icône
        const dot = this.add.graphics();
        dot.fillStyle(color, 1);
        dot.fillCircle(x, y - 100, 52);
        dot.lineStyle(3, 0xffffff, 0.6);
        dot.strokeCircle(x, y - 100, 52);
        this.add.text(x, y - 102, icon, { fontSize: '40px' }).setOrigin(0.5);

        // Rareté
        const rarityLabel: Record<RelicRarity, string> = {
            [RelicRarity.COMMON]:   'Commune',
            [RelicRarity.UNCOMMON]: 'Peu commune',
            [RelicRarity.RARE]:     'Rare',
            [RelicRarity.BOSS]:     'Boss',
        };
        this.add.text(x, y - 36, rarityLabel[relic.rarity as RelicRarity] ?? '', {
            fontSize: '13px', fontFamily: 'Georgia, serif',
            color: `#${color.toString(16).padStart(6, '0')}`,
            fontStyle: 'italic',
        }).setOrigin(0.5);

        this.add.text(x, y + 8, relic.name, {
            fontSize: '22px', fontFamily: 'Georgia, serif',
            color: '#ecf0f1', stroke: '#000', strokeThickness: 2,
        }).setOrigin(0.5);

        this.add.text(x, y + 60, relic.description, {
            fontSize: '15px', fontFamily: 'Georgia, serif',
            color: '#bdc3c7', wordWrap: { width: PANEL_W - 50 }, align: 'center',
        }).setOrigin(0.5);

        if (relic.flavorText) {
            this.add.text(x, y + 130, `"${relic.flavorText}"`, {
                fontSize: '12px', fontFamily: 'Georgia, serif',
                color: '#636e72', wordWrap: { width: PANEL_W - 60 },
                align: 'center', fontStyle: 'italic',
            }).setOrigin(0.5);
        }

        this.makeChooseBtn(x, y + PANEL_H / 2 - 44, color, () => {
            run.addRelic(relic.id);
            this.goToMap();
        });
    }

    // ── Option 2 : Carte rare ─────────────────────────────────────────────────

    private buildRareCardPanel(x: number, y: number): void {
        const ids  = [...RARE_REWARD_IDS];
        const id   = ids[Math.floor(Math.random() * ids.length)];
        const card = new CardInstance(id);

        this.makePanel(x, y, 0x3498db);
        this.makeTitle(x, y - PANEL_H / 2 + 36, '★  Carte Rare', '#3498db');

        new CardView({ scene: this, card, x, y: y - 30, scale: 1.15, interactive: false });

        this.add.text(x, y + 195, 'Carte ajoutée à votre deck.', {
            fontSize: '13px', fontFamily: 'Georgia, serif', color: '#7f8c8d',
        }).setOrigin(0.5);

        this.makeChooseBtn(x, y + PANEL_H / 2 - 44, 0x3498db, () => {
            RunManager.instance.addCardToDeck(card);
            this.goToMap();
        });
    }

    // ── Option 3 : Purge du deck ──────────────────────────────────────────────

    private buildRemovePanel(x: number, y: number): void {
        const run = RunManager.instance;

        this.makePanel(x, y, 0x8e44ad);
        this.makeTitle(x, y - PANEL_H / 2 + 36, '✂  Purge du Deck', '#9b59b6');

        this.add.text(x, y - 190, '-10 PV', {
            fontSize: '32px', fontFamily: 'Georgia, serif',
            color: '#e74c3c', stroke: '#000', strokeThickness: 4,
        }).setOrigin(0.5);

        this.add.text(x, y - 140, 'Retirez 2 cartes de votre deck.\nVotre deck sera plus efficace,\nmais vous perdez 10 PV.', {
            fontSize: '15px', fontFamily: 'Georgia, serif',
            color: '#bdc3c7', align: 'center', lineSpacing: 4,
        }).setOrigin(0.5);

        // Cartes cliquables en grille 3×2
        const deckCards = run.deck.slice(0, Math.min(6, run.deck.length));
        this.cardViews  = [];
        const cols      = 3;
        const cw        = 110;
        const ch        = 130;
        const gridW     = cols * cw;

        deckCards.forEach((card, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const cx2 = x - gridW / 2 + col * cw + cw / 2;
            const cy2 = y + 20 + row * ch;
            const cv  = new CardView({ scene: this, card, x: cx2, y: cy2, scale: 0.47, interactive: false });
            cv.setSize(CardView.WIDTH * 0.47, CardView.HEIGHT * 0.47);
            cv.setInteractive({ cursor: 'pointer' });
            cv.on('pointerup', () => this.toggleRemove(card.instanceId, cv));
            this.cardViews.push(cv);
        });

        this.add.text(x, y + 185, 'Cliquez sur 2 cartes pour les retirer', {
            fontSize: '12px', fontFamily: 'Georgia, serif', color: '#95a5a6',
        }).setOrigin(0.5);

        this.confirmBtn = this.makeChooseBtn(x, y + PANEL_H / 2 - 44, 0x8e44ad, () => {
            if (this.selectedToRemove.length < 2) return;
            run.playerHp = Math.max(1, run.playerHp - 10);
            run.removeCardsFromDeck(this.selectedToRemove);
            this.goToMap();
        }, true);
    }

    private toggleRemove(instanceId: string, view: CardView): void {
        const idx = this.selectedToRemove.indexOf(instanceId);
        if (idx === -1) {
            if (this.selectedToRemove.length >= 2) return;
            this.selectedToRemove.push(instanceId);
            view.setAlpha(0.35);
        } else {
            this.selectedToRemove.splice(idx, 1);
            view.setAlpha(1);
        }
        if (this.confirmBtn) {
            this.confirmBtn.setAlpha(this.selectedToRemove.length === 2 ? 1 : 0.35);
        }
    }

    // ── Fond ──────────────────────────────────────────────────────────────────

    private drawBackground(): void {
        const { width, height } = this.scale;
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x060a10, 0x060a10, 0x0d1a2e, 0x0d1a2e, 1);
        bg.fillRect(0, 0, width, height);
        for (let i = 0; i < 100; i++) {
            const g = this.add.graphics();
            g.fillStyle(0xffffff, Math.random() * 0.35 + 0.05);
            g.fillCircle(Math.random() * width, Math.random() * height, Math.random() * 1.3 + 0.2);
        }
    }

    private goToMap(): void {
        this.cameras.main.fadeOut(400, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('MapScene');
        });
    }
}
