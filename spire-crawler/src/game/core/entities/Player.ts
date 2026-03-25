import { Entity } from './Entity';
import { DeckManager } from '../deck/DeckManager';
import { CardInstance } from '../cards/CardInstance';

export class Player extends Entity {
    energy: number;
    maxEnergy: number;
    gold: number;
    deck: DeckManager;

    constructor(name: string, maxHp: number, deck: CardInstance[], maxEnergy = 3, gold = 0) {
        super('player', name, maxHp);
        this.energy = maxEnergy;
        this.maxEnergy = maxEnergy;
        this.gold = gold;
        this.deck = new DeckManager(deck);
    }

    resetEnergy(): void {
        this.energy = this.maxEnergy;
    }

    canPlayCard(cardCost: number): boolean {
        return this.energy >= cardCost;
    }

    spendEnergy(amount: number): void {
        this.energy = Math.max(0, this.energy - amount);
    }

    gainEnergy(amount: number): void {
        this.energy += amount;
    }

    drawCards(n: number): CardInstance[] {
        return this.deck.draw(n);
    }

    discardHand(): CardInstance[] {
        return this.deck.discardHand();
    }

    get hand(): CardInstance[] {
        return this.deck.hand;
    }

    get drawPileSize(): number {
        return this.deck.drawPile.length;
    }

    get discardPileSize(): number {
        return this.deck.discardPile.length;
    }
}
