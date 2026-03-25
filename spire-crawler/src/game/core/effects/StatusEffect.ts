import { StatusEffectId } from '../types';

export type StackType = 'duration' | 'intensity';

export abstract class StatusEffect {
    abstract readonly id: StatusEffectId;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly stackType: StackType;
    abstract readonly isDebuff: boolean;

    stacks: number;

    constructor(stacks = 1) {
        this.stacks = stacks;
    }

    /** Modificateur sur les dégâts infligés par l'entité portant cet effet. */
    modifyDamageDealt(base: number): number {
        return base;
    }

    /** Modificateur sur les dégâts reçus par l'entité portant cet effet. */
    modifyDamageReceived(base: number): number {
        return base;
    }

    /** Modificateur sur le bloc gagné par l'entité portant cet effet. */
    modifyBlockGained(base: number): number {
        return base;
    }

    /** Déclenché au début du tour de l'entité. */
    onTurnStart(_entityId: string, _engine: unknown): void { }

    /** Déclenché à la fin du tour de l'entité. */
    onTurnEnd(_entityId: string, _engine: unknown): void { }

    /** Déclenché après avoir infligé des dégâts à un ennemi. */
    onDamageDealt(_damage: number, _targetId: string, _engine: unknown): void { }

    /**
     * Appelé après résolution pour décrémenter les stacks si c'est un effet de durée.
     * Ne rien faire pour les effets d'intensité (Strength, Dex...).
     */
    tick(): void {
        if (this.stackType === 'duration') {
            this.stacks = Math.max(0, this.stacks - 1);
        }
    }

    isExpired(): boolean {
        return this.stacks <= 0;
    }

    addStacks(n: number): void {
        this.stacks += n;
    }

    clone(): StatusEffect {
        const Constructor = Object.getPrototypeOf(this).constructor as new (n: number) => StatusEffect;
        return new Constructor(this.stacks);
    }

    getDescription(): string {
        return this.description.replace('{n}', String(this.stacks));
    }
}
