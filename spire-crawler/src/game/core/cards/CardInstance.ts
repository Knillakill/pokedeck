import { CardInstanceData, CardEffectData } from '../types';
import { CardDefinition } from './CardDefinition';

let instanceCounter = 0;

export class CardInstance {
    readonly instanceId: string;
    readonly definitionId: string;
    upgraded: boolean;

    constructor(definitionId: string, upgraded = false, instanceId?: string) {
        this.definitionId = definitionId;
        this.upgraded = upgraded;
        this.instanceId = instanceId ?? `card_${++instanceCounter}`;
    }

    get definition(): CardDefinition {
        return CardDefinition.get(this.definitionId);
    }

    get name(): string {
        return this.upgraded
            ? `${this.definition.name}+`
            : this.definition.name;
    }

    get cost(): number {
        return this.upgraded
            ? this.definition.getUpgradedCost()
            : this.definition.data.cost;
    }

    get description(): string {
        return this.upgraded
            ? this.definition.getUpgradedDescription()
            : this.definition.description;
    }

    get effects(): CardEffectData[] {
        return this.upgraded
            ? this.definition.getUpgradedEffects()
            : this.definition.effects;
    }

    get type() { return this.definition.type; }
    get rarity() { return this.definition.rarity; }

    upgrade(): void {
        this.upgraded = true;
    }

    clone(): CardInstance {
        return new CardInstance(this.definitionId, this.upgraded);
    }

    toData(): CardInstanceData {
        return {
            instanceId: this.instanceId,
            definitionId: this.definitionId,
            upgraded: this.upgraded,
        };
    }

    static fromData(data: CardInstanceData): CardInstance {
        return new CardInstance(data.definitionId, data.upgraded, data.instanceId);
    }
}
