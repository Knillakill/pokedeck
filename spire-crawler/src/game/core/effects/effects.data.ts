import { StatusEffect } from './StatusEffect';
import { StatusEffectId } from '../types';

// ─── Weak : -25% dégâts infligés ─────────────────────────────────────────────
export class WeakEffect extends StatusEffect {
    readonly id = StatusEffectId.WEAK;
    readonly name = 'Faiblesse';
    readonly description = 'Inflige 25% de dégâts en moins. {n} tour(s) restant(s).';
    readonly stackType = 'duration' as const;
    readonly isDebuff = true;

    modifyDamageDealt(base: number): number {
        return Math.floor(base * 0.75);
    }
}

// ─── Vulnerable : +50% dégâts reçus ──────────────────────────────────────────
export class VulnerableEffect extends StatusEffect {
    readonly id = StatusEffectId.VULNERABLE;
    readonly name = 'Vulnérabilité';
    readonly description = 'Reçoit 50% de dégâts en plus. {n} tour(s) restant(s).';
    readonly stackType = 'duration' as const;
    readonly isDebuff = true;

    modifyDamageReceived(base: number): number {
        return Math.floor(base * 1.5);
    }
}

// ─── Strength : +X dégâts par attaque ────────────────────────────────────────
export class StrengthEffect extends StatusEffect {
    readonly id = StatusEffectId.STRENGTH;
    readonly name = 'Force';
    readonly description = 'Inflige {n} dégâts supplémentaires avec les attaques.';
    readonly stackType = 'intensity' as const;
    readonly isDebuff = false;

    modifyDamageDealt(base: number): number {
        return base + this.stacks;
    }
}

// ─── Dexterity : +X bloc par carte ───────────────────────────────────────────
export class DexterityEffect extends StatusEffect {
    readonly id = StatusEffectId.DEXTERITY;
    readonly name = 'Dextérité';
    readonly description = 'Gagne {n} Bloc supplémentaire avec les cartes.';
    readonly stackType = 'intensity' as const;
    readonly isDebuff = false;

    modifyBlockGained(base: number): number {
        return base + this.stacks;
    }
}

// ─── Poison : X PV perdus par tour (décrémente) ───────────────────────────────
export class PoisonEffect extends StatusEffect {
    readonly id = StatusEffectId.POISON;
    readonly name = 'Poison';
    readonly description = 'Perd {n} PV au début de son tour. Puis diminue de 1.';
    readonly stackType = 'intensity' as const;
    readonly isDebuff = true;

    onTurnStart(entityId: string, engine: unknown): void {
        const e = engine as { applyPoisonDamage: (id: string, n: number) => void };
        e.applyPoisonDamage(entityId, this.stacks);
        this.stacks = Math.max(0, this.stacks - 1);
    }
}

// ─── Regen : X PV récupérés par tour ─────────────────────────────────────────
export class RegenEffect extends StatusEffect {
    readonly id = StatusEffectId.REGEN;
    readonly name = 'Régénération';
    readonly description = 'Récupère {n} PV au début de son tour. Puis diminue de 1.';
    readonly stackType = 'intensity' as const;
    readonly isDebuff = false;

    onTurnStart(entityId: string, engine: unknown): void {
        const e = engine as { healEntity: (id: string, n: number) => void };
        e.healEntity(entityId, this.stacks);
        this.stacks = Math.max(0, this.stacks - 1);
    }
}

// ─── Thorns : X dégâts à l'attaquant ─────────────────────────────────────────
export class ThornsEffect extends StatusEffect {
    readonly id = StatusEffectId.THORNS;
    readonly name = 'Épines';
    readonly description = 'Inflige {n} dégâts à quiconque l\'attaque.';
    readonly stackType = 'intensity' as const;
    readonly isDebuff = false;

    onDamageDealt(_damage: number, attackerId: string, engine: unknown): void {
        const e = engine as { dealDamageToEntity: (id: string, n: number, ignorBlock?: boolean) => void };
        e.dealDamageToEntity(attackerId, this.stacks);
    }
}

// ─── Metallicize : X Bloc gagné en fin de tour ───────────────────────────────
export class MetallicizeEffect extends StatusEffect {
    readonly id = StatusEffectId.METALLICIZE;
    readonly name = 'Métallisation';
    readonly description = 'Gagne {n} Bloc à la fin de chaque tour.';
    readonly stackType = 'intensity' as const;
    readonly isDebuff = false;

    onTurnEnd(entityId: string, engine: unknown): void {
        const e = engine as { gainBlock: (id: string, n: number) => void };
        e.gainBlock(entityId, this.stacks);
    }
}

// ─── Sleep : l'entité saute son prochain tour ─────────────────────────────────
export class SleepEffect extends StatusEffect {
    readonly id = StatusEffectId.SLEEP;
    readonly name = 'Sommeil';
    readonly description = 'Dort et saute son prochain tour. {n} tour(s) restant(s).';
    readonly stackType = 'duration' as const;
    readonly isDebuff = true;
}

// ─── Registre des effets de statut ────────────────────────────────────────────

const effectRegistry = new Map<StatusEffectId, new (stacks: number) => StatusEffect>();

export function registerAllEffects(): void {
    effectRegistry.set(StatusEffectId.WEAK, WeakEffect);
    effectRegistry.set(StatusEffectId.VULNERABLE, VulnerableEffect);
    effectRegistry.set(StatusEffectId.STRENGTH, StrengthEffect);
    effectRegistry.set(StatusEffectId.DEXTERITY, DexterityEffect);
    effectRegistry.set(StatusEffectId.POISON, PoisonEffect);
    effectRegistry.set(StatusEffectId.REGEN, RegenEffect);
    effectRegistry.set(StatusEffectId.THORNS, ThornsEffect);
    effectRegistry.set(StatusEffectId.METALLICIZE, MetallicizeEffect);
    effectRegistry.set(StatusEffectId.SLEEP, SleepEffect);
}

export function createStatusEffect(id: StatusEffectId, stacks: number): StatusEffect {
    const Constructor = effectRegistry.get(id);
    if (!Constructor) throw new Error(`Effet de statut inconnu : ${id}`);
    return new Constructor(stacks);
}
