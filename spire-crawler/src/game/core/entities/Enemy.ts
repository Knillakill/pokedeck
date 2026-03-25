import { Entity } from './Entity';
import { EnemyMoveData, IntentType } from '../types';
import { EnemyDefinition } from '../data/enemies.data';

export class Enemy extends Entity {
    definition: EnemyDefinition;
    currentMoveIndex: number = 0;
    lastMoveId: string | null = null;
    nextMove: EnemyMoveData;

    constructor(definition: EnemyDefinition, instanceId?: string) {
        const hp = definition.maxHp + Math.floor(Math.random() * (definition.hpVariance ?? 0));
        super(instanceId ?? `enemy_${definition.id}_${Date.now()}`, definition.name, hp);
        this.definition = definition;
        this.nextMove = this.definition.movePattern[0];
    }

    advanceMove(): void {
        const pattern = this.definition.movePattern;
        let nextIndex: number;

        if (this.definition.isSequential) {
            nextIndex = (this.currentMoveIndex + 1) % pattern.length;
        } else {
            nextIndex = this.pickWeightedMove();
        }

        const move = pattern[nextIndex];

        // Évite la répétition du même move si cantRepeatTwice
        if (move.cantRepeatTwice && move.id === this.lastMoveId) {
            nextIndex = (nextIndex + 1) % pattern.length;
        }

        this.lastMoveId = this.nextMove.id;
        this.currentMoveIndex = nextIndex;
        this.nextMove = pattern[nextIndex];
    }

    private pickWeightedMove(): number {
        const pattern = this.definition.movePattern;
        const totalWeight = pattern.reduce((sum, m) => sum + (m.weight ?? 1), 0);
        let rand = Math.random() * totalWeight;
        for (let i = 0; i < pattern.length; i++) {
            rand -= (pattern[i].weight ?? 1);
            if (rand <= 0) return i;
        }
        return 0;
    }

    get intent(): IntentType {
        return this.nextMove.intent;
    }

    get intentDamage(): number {
        const dmgEffects = this.nextMove.effects.filter(e => e.type === 'DEAL_DAMAGE');
        if (dmgEffects.length === 0) return 0;
        return dmgEffects.reduce((sum, e) => sum + (e.value ?? 0), 0);
    }
}
