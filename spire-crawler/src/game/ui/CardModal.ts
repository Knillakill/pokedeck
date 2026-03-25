import Phaser from 'phaser';
import { CardInstance } from '../core/cards/CardInstance';
import { CardView } from './CardView';

const MODAL_SCALE = 2.2;

/**
 * Modale zoom sur une carte — ouverte par clic droit.
 * Affiche la carte agrandie avec un toggle "Voir version améliorée".
 */
export class CardModal {
    private scene: Phaser.Scene;
    private card: CardInstance;
    private showUpgraded = false;

    /** Tous les objets créés par la modale (pour nettoyage). */
    private objects: Phaser.GameObjects.GameObject[] = [];
    private cardView: CardView | null = null;
    private escKey: Phaser.Input.Keyboard.Key | null = null;

    constructor(scene: Phaser.Scene, card: CardInstance) {
        this.scene = scene;
        this.card  = card;
        this.build();
    }

    // ─── Construction ─────────────────────────────────────────────────────────

    private build(): void {
        const { width, height } = this.scene.scale;
        const cx = width  / 2;
        const cy = height / 2 - 30;

        // ── Overlay sombre cliquable ───────────────────────────────────────────
        const overlay = this.scene.add.graphics().setDepth(200);
        overlay.fillStyle(0x000000, 0.78);
        overlay.fillRect(0, 0, width, height);
        overlay.setInteractive(
            new Phaser.Geom.Rectangle(0, 0, width, height),
            Phaser.Geom.Rectangle.Contains
        );
        overlay.on('pointerup', () => this.close());
        this.objects.push(overlay);

        // ── Zone de blocage sur la carte (empêche l'overlay de se fermer) ─────
        const cardW = CardView.WIDTH * MODAL_SCALE;
        const cardH = CardView.HEIGHT * MODAL_SCALE;
        const blockZone = this.scene.add.zone(cx, cy, cardW, cardH)
            .setInteractive()
            .setDepth(202);
        blockZone.on('pointerup', (ptr: Phaser.Input.Pointer) => {
            ptr.event.stopPropagation();
        });
        this.objects.push(blockZone);

        // ── Carte agrandie ────────────────────────────────────────────────────
        const displayCard = this.card.clone();
        if (this.showUpgraded) displayCard.upgraded = true;

        this.cardView = new CardView({
            scene: this.scene,
            card:  displayCard,
            x:     cx,
            y:     cy,
            interactive: false,
            scale: MODAL_SCALE,
        });
        this.cardView.setDepth(201);
        this.objects.push(this.cardView);

        // ── Badge "upgradée" si la carte est déjà améliorée ───────────────────
        if (this.card.upgraded) {
            const badge = this.scene.add.text(
                cx + (CardView.WIDTH * MODAL_SCALE) / 2 - 4,
                cy - (CardView.HEIGHT * MODAL_SCALE) / 2 + 4,
                '★ Améliorée', {
                    fontSize: '13px', fontFamily: 'Georgia, serif',
                    color: '#f1c40f', stroke: '#000', strokeThickness: 2,
                }
            ).setOrigin(1, 0).setDepth(202);
            this.objects.push(badge);
        }

        // ── Toggle "Voir version améliorée" ───────────────────────────────────
        const toggleY = cy + (CardView.HEIGHT * MODAL_SCALE) / 2 + 28;
        this.buildToggle(cx, toggleY);

        // ── Hint fermeture ────────────────────────────────────────────────────
        const hint = this.scene.add.text(cx, toggleY + 36, 'Clic ou [Échap] pour fermer', {
            fontSize: '11px', fontFamily: 'Georgia, serif',
            color: '#7f8c8d',
        }).setOrigin(0.5).setDepth(202);
        this.objects.push(hint);

        // ── Touche Échap ──────────────────────────────────────────────────────
        this.escKey = this.scene.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.ESC
        ) ?? null;
        if (this.escKey) {
            this.escKey.once('down', () => this.close());
        }
    }

    private buildToggle(cx: number, y: number): void {
        const canUpgrade = !this.card.upgraded;
        const checked    = this.showUpgraded;

        // Fond du toggle
        const bg = this.scene.add.graphics().setDepth(202);
        bg.fillStyle(0x0d1117, 0.92);
        bg.fillRoundedRect(cx - 130, y - 20, 260, 40, 10);
        bg.lineStyle(1, checked ? 0x27ae60 : 0x4a4a6a, 1);
        bg.strokeRoundedRect(cx - 130, y - 20, 260, 40, 10);
        this.objects.push(bg);

        if (!canUpgrade) {
            // Carte déjà améliorée : pas de toggle
            const lbl = this.scene.add.text(cx, y, 'Cette carte est déjà améliorée', {
                fontSize: '13px', fontFamily: 'Georgia, serif', color: '#7f8c8d',
            }).setOrigin(0.5).setDepth(203);
            this.objects.push(lbl);
            return;
        }

        // Case à cocher
        const box = this.scene.add.graphics().setDepth(203);
        const bx  = cx - 110;
        box.lineStyle(2, checked ? 0x27ae60 : 0x95a5a6, 1);
        box.strokeRect(bx, y - 9, 18, 18);
        if (checked) {
            box.fillStyle(0x27ae60, 1);
            box.fillRect(bx + 2, y - 7, 14, 14);
            // Coche
            box.lineStyle(2, 0xffffff, 1);
            box.beginPath();
            box.moveTo(bx + 3,  y + 2);
            box.lineTo(bx + 7,  y + 6);
            box.lineTo(bx + 15, y - 4);
            box.strokePath();
        }
        this.objects.push(box);

        const lbl = this.scene.add.text(bx + 26, y, 'Voir version améliorée', {
            fontSize: '14px', fontFamily: 'Georgia, serif',
            color: checked ? '#2ecc71' : '#bdc3c7',
        }).setOrigin(0, 0.5).setDepth(203);
        this.objects.push(lbl);

        // Zone cliquable
        const zone = this.scene.add.zone(cx, y, 260, 40)
            .setInteractive({ cursor: 'pointer' })
            .setDepth(204);
        zone.on('pointerup', (ptr: Phaser.Input.Pointer) => {
            ptr.event.stopPropagation();
            this.showUpgraded = !this.showUpgraded;
            this.rebuild();
        });
        zone.on('pointerover', () => lbl.setColor('#ecf0f1'));
        zone.on('pointerout',  () => lbl.setColor(checked ? '#2ecc71' : '#bdc3c7'));
        this.objects.push(zone);
    }

    // ─── Rebuild après toggle ─────────────────────────────────────────────────

    private rebuild(): void {
        this.destroyObjects();
        this.build();
    }

    // ─── Fermeture ────────────────────────────────────────────────────────────

    close(): void {
        if (this.escKey) {
            this.scene.input.keyboard?.removeKey(this.escKey);
        }
        this.destroyObjects();
    }

    private destroyObjects(): void {
        for (const obj of this.objects) {
            if (obj && obj.active) obj.destroy();
        }
        this.objects  = [];
        this.cardView = null;
    }
}
