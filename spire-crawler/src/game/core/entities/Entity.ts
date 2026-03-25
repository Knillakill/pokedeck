import { StatusEffect } from '../effects/StatusEffect';
import { StatusEffectId } from '../types';
import { createStatusEffect } from '../effects/effects.data';

export abstract class Entity {
    id: string;
    name: string;
    maxHp: number;
    hp: number;
    block: number;
    statuses: Map<StatusEffectId, StatusEffect> = new Map();

    constructor(id: string, name: string, maxHp: number) {
        this.id = id;
        this.name = name;
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.block = 0;
    }

    get isDead(): boolean {
        return this.hp <= 0;
    }

    takeDamage(rawDamage: number): number {
        let damage = rawDamage;

        // Applique Vulnérable
        const vuln = this.statuses.get(StatusEffectId.VULNERABLE);
        if (vuln) damage = vuln.modifyDamageReceived(damage);

        damage = Math.max(0, damage);

        // Le bloc absorbe les dégâts
        if (this.block >= damage) {
            this.block -= damage;
            return 0;
        }
        const hpDamage = damage - this.block;
        this.block = 0;
        this.hp = Math.max(0, this.hp - hpDamage);
        return hpDamage;
    }

    gainBlock(amount: number): void {
        const dex = this.statuses.get(StatusEffectId.DEXTERITY);
        const actual = dex ? dex.modifyBlockGained(amount) : amount;
        this.block += Math.max(0, actual);
    }

    heal(amount: number): void {
        this.hp = Math.min(this.maxHp, this.hp + amount);
    }

    removeBlockAtTurnStart(): void {
        this.block = 0;
    }

    applyStatus(id: StatusEffectId, stacks: number): void {
        const existing = this.statuses.get(id);
        if (existing) {
            existing.addStacks(stacks);
        } else {
            this.statuses.set(id, createStatusEffect(id, stacks));
        }
    }

    removeExpiredStatuses(): void {
        for (const [id, effect] of this.statuses) {
            if (effect.isExpired()) this.statuses.delete(id);
        }
    }

    tickDurationStatuses(): void {
        for (const effect of this.statuses.values()) {
            if (effect.stackType === 'duration') effect.tick();
        }
        this.removeExpiredStatuses();
    }

    /** Calcule les dégâts finaux infligés par cette entité (avant défense cible). */
    calcOutgoingDamage(base: number): number {
        let dmg = base;

        const strength = this.statuses.get(StatusEffectId.STRENGTH);
        if (strength) dmg = strength.modifyDamageDealt(dmg);

        const weak = this.statuses.get(StatusEffectId.WEAK);
        if (weak) dmg = weak.modifyDamageDealt(dmg);

        return Math.max(0, dmg);
    }
}
