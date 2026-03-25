import { CardInstance } from '../cards/CardInstance';

/**
 * Gère les 4 zones de cartes : pioche, main, défausse, exhaust.
 * La pioche est toujours mélangée. Quand elle est vide et qu'on pioche,
 * la défausse est mélangée dans la pioche.
 */
export class DeckManager {
    drawPile: CardInstance[] = [];
    hand: CardInstance[] = [];
    discardPile: CardInstance[] = [];
    exhaustPile: CardInstance[] = [];

    constructor(deck: CardInstance[]) {
        this.drawPile = [...deck];
        this.shuffle(this.drawPile);
    }

    private shuffle(arr: CardInstance[]): void {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    /** Pioche n cartes dans la main. Retourne les cartes piochées. */
    draw(n: number): CardInstance[] {
        const drawn: CardInstance[] = [];
        for (let i = 0; i < n; i++) {
            if (this.drawPile.length === 0) {
                if (this.discardPile.length === 0) break;
                this.recycleDiscard();
            }
            const card = this.drawPile.pop()!;
            this.hand.push(card);
            drawn.push(card);
        }
        return drawn;
    }

    /** Remet la défausse dans la pioche et la mélange. */
    private recycleDiscard(): void {
        this.drawPile.push(...this.discardPile);
        this.discardPile = [];
        this.shuffle(this.drawPile);
    }

    /** Défausse une carte de la main. */
    discard(instanceId: string): CardInstance | null {
        const idx = this.hand.findIndex(c => c.instanceId === instanceId);
        if (idx === -1) return null;
        const [card] = this.hand.splice(idx, 1);
        this.discardPile.push(card);
        return card;
    }

    /** Défausse toute la main. */
    discardHand(): CardInstance[] {
        const discarded = [...this.hand];
        this.discardPile.push(...this.hand);
        this.hand = [];
        return discarded;
    }

    /** Exhaust une carte de la main (retirée jusqu'à la fin du combat). */
    exhaust(instanceId: string): CardInstance | null {
        const idx = this.hand.findIndex(c => c.instanceId === instanceId);
        if (idx === -1) return null;
        const [card] = this.hand.splice(idx, 1);
        this.exhaustPile.push(card);
        return card;
    }

    /** Ajoute une carte dans la défausse (ex : récompense choisie en combat). */
    addToDiscard(card: CardInstance): void {
        this.discardPile.push(card);
    }

    /** Ajoute une carte en haut de la pioche. */
    addToTopOfDraw(card: CardInstance): void {
        this.drawPile.push(card);
    }

    /** Trouve une carte dans la main par instanceId. */
    findInHand(instanceId: string): CardInstance | undefined {
        return this.hand.find(c => c.instanceId === instanceId);
    }

    get totalCards(): number {
        return this.drawPile.length + this.hand.length + this.discardPile.length;
    }
}
