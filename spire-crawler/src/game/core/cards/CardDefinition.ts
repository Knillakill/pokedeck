import { CardDefinitionData } from '../types';

export class CardDefinition {
    readonly data: CardDefinitionData;

    constructor(data: CardDefinitionData) {
        this.data = data;
    }

    get id() { return this.data.id; }
    get name() { return this.data.name; }
    get type() { return this.data.type; }
    get rarity() { return this.data.rarity; }
    get cost() { return this.data.cost; }
    get description() { return this.data.description; }
    get effects() { return this.data.effects; }

    getUpgradedCost(): number {
        return this.data.upgradedCost ?? this.data.cost;
    }

    getUpgradedDescription(): string {
        return this.data.upgradedDescription ?? this.data.description;
    }

    getUpgradedEffects() {
        return this.data.upgradedEffects ?? this.data.effects;
    }

    /** Registre global des définitions de cartes */
    private static registry = new Map<string, CardDefinition>();

    static register(def: CardDefinition): void {
        this.registry.set(def.id, def);
    }

    static get(id: string): CardDefinition {
        const def = this.registry.get(id);
        if (!def) throw new Error(`CardDefinition introuvable : ${id}`);
        return def;
    }

    static getAll(): CardDefinition[] {
        return Array.from(this.registry.values());
    }
}
