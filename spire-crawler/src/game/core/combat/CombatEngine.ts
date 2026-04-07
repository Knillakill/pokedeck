import { Player } from '../entities/Player';
import { Enemy } from '../entities/Enemy';
import { CardInstance } from '../cards/CardInstance';
import { CombatPhase, CardEffectType, CardTarget, StatusEffectId, CombatEvent, CombatEventType } from '../types';
import { getEnemyDefinition } from '../data/enemies.data';

type EventListener = (event: CombatEvent) => void;

export class CombatEngine {
    player: Player;
    enemies: Enemy[];
    phase: CombatPhase = CombatPhase.START_OF_COMBAT;
    turn: number = 0;
    log: string[] = [];

    private listeners: Map<CombatEventType, EventListener[]> = new Map();

    constructor(player: Player, enemyIds: string[]) {
        this.player = player;
        this.enemies = enemyIds.map(id => new Enemy(getEnemyDefinition(id)));
    }

    // ─── Event System ──────────────────────────────────────────────────────────

    on(type: CombatEventType, cb: EventListener): void {
        if (!this.listeners.has(type)) this.listeners.set(type, []);
        this.listeners.get(type)!.push(cb);
    }

    off(type: CombatEventType, cb: EventListener): void {
        const list = this.listeners.get(type);
        if (list) {
            const idx = list.indexOf(cb);
            if (idx !== -1) list.splice(idx, 1);
        }
    }

    private emit(type: CombatEventType, payload?: Record<string, unknown>): void {
        const event: CombatEvent = { type, payload };
        this.listeners.get(type)?.forEach(cb => cb(event));
    }

    // ─── Lifecycle ─────────────────────────────────────────────────────────────

    startCombat(): void {
        this.addLog('--- Combat commencé ---');
        this.startPlayerTurn();
    }

    private setPhase(phase: CombatPhase): void {
        this.phase = phase;
        this.emit('phase_changed', { phase });
    }

    // ─── Tours ─────────────────────────────────────────────────────────────────

    startPlayerTurn(): void {
        this.turn++;
        this.setPhase(CombatPhase.DRAW_PHASE);

        // Retirer le bloc du joueur
        this.player.removeBlockAtTurnStart();

        // Effets de statut au début du tour
        for (const effect of this.player.statuses.values()) {
            effect.onTurnStart(this.player.id, this);
        }
        this.player.removeExpiredStatuses();

        // Reset énergie et piocher
        this.player.resetEnergy();
        const drawn = this.player.drawCards(5);
        drawn.forEach(c => this.emit('card_drawn', { cardInstanceId: c.instanceId }));

        this.setPhase(CombatPhase.PLAYER_TURN);
        this.addLog(`Tour ${this.turn} — À votre tour. Énergie: ${this.player.energy}`);
    }

    /** Joue une carte depuis la main du joueur sur une cible (enemyId ou null). */
    playCard(instanceId: string, targetEnemyId?: string): boolean {
        if (this.phase !== CombatPhase.PLAYER_TURN) return false;

        const card = this.player.hand.find(c => c.instanceId === instanceId);
        if (!card) return false;
        if (!this.player.canPlayCard(card.cost)) {
            this.addLog(`Pas assez d'énergie pour ${card.name}`);
            return false;
        }

        this.player.spendEnergy(card.cost);

        const target = targetEnemyId
            ? this.enemies.find(e => e.id === targetEnemyId)
            : this.enemies[0];

        this.resolveCardEffects(card, target ?? null);

        this.player.deck.discard(instanceId);
        this.emit('card_played', { cardInstanceId: instanceId, targetId: targetEnemyId });

        this.addLog(`Joue: ${card.name} (coût ${card.cost})`);

        this.checkVictory();
        return true;
    }

    private resolveCardEffects(card: CardInstance, target: Enemy | null): void {
        for (const effect of card.effects) {
            const resolvedTarget = effect.target === CardTarget.SELF ? null : target;

            switch (effect.type) {
                case CardEffectType.DEAL_DAMAGE:
                    this.resolveDamageEffect(effect.value ?? 0, effect.target!, resolvedTarget);
                    break;

                case CardEffectType.GAIN_BLOCK:
                    this.gainBlock(this.player.id, effect.value ?? 0);
                    break;

                case CardEffectType.DRAW_CARDS:
                    const drawn = this.player.drawCards(effect.value ?? 1);
                    drawn.forEach(c => this.emit('card_drawn', { cardInstanceId: c.instanceId }));
                    break;

                case CardEffectType.GAIN_ENERGY:
                    this.player.gainEnergy(effect.value ?? 1);
                    break;

                case CardEffectType.APPLY_STATUS:
                    if (effect.statusId) {
                        if (effect.target === CardTarget.SELF) {
                            this.player.applyStatus(effect.statusId, effect.statusStacks ?? 1);
                        } else if (resolvedTarget) {
                            resolvedTarget.applyStatus(effect.statusId, effect.statusStacks ?? 1);
                        }
                        this.emit('status_applied', { entityId: effect.target === CardTarget.SELF ? this.player.id : resolvedTarget?.id, statusId: effect.statusId, stacks: effect.statusStacks ?? 1 });
                    }
                    break;

                case CardEffectType.DOUBLE_BLOCK:
                    this.player.block *= 2;
                    this.emit('block_gained', { entityId: this.player.id, amount: this.player.block });
                    break;

                case CardEffectType.HEAL:
                    this.player.heal(effect.value ?? 0);
                    break;
            }
        }
    }

    private resolveDamageEffect(baseValue: number, targetType: CardTarget, primaryTarget: Enemy | null): void {
        if (targetType === CardTarget.ALL_ENEMIES) {
            for (const enemy of this.enemies) {
                this.dealDamageToEnemy(baseValue, enemy);
            }
        } else if (primaryTarget) {
            this.dealDamageToEnemy(baseValue, primaryTarget);
        }
    }

    private dealDamageToEnemy(base: number, enemy: Enemy): void {
        const finalDmg = this.player.calcOutgoingDamage(base);
        const hpDmg = enemy.takeDamage(finalDmg);
        this.emit('damage_dealt', { targetId: enemy.id, amount: finalDmg, hpDamage: hpDmg });
        this.addLog(`${enemy.name} reçoit ${finalDmg} dégâts (${hpDmg} PV perdus)`);

        // Épines
        const thorns = enemy.statuses.get(StatusEffectId.THORNS);
        if (thorns) thorns.onDamageDealt(finalDmg, this.player.id, this);
    }

    /** Fin du tour du joueur → début tour ennemi. */
    endPlayerTurn(): void {
        if (this.phase !== CombatPhase.PLAYER_TURN) return;
        this.setPhase(CombatPhase.END_TURN);

        // Défausser la main
        const discarded = this.player.discardHand();
        discarded.forEach(c => this.emit('card_discarded', { cardInstanceId: c.instanceId }));

        // Tick des durées des statuts du joueur en fin de tour
        this.player.tickDurationStatuses();

        // Effets de fin de tour (Metallicize, etc.)
        for (const effect of this.player.statuses.values()) {
            effect.onTurnEnd(this.player.id, this);
        }

        this.startEnemyTurn();
    }

    // File d'ennemis à traiter ce tour — BattleScene les dépile un par un.
    private enemyTurnQueue: Enemy[] = [];

    private startEnemyTurn(): void {
        this.setPhase(CombatPhase.ENEMY_TURN);

        // Préparer tous les ennemis : reset blocs + ticks de statuts
        // (les dégâts de poison/regen sont appliqués ici immédiatement)
        this.enemyTurnQueue = [];
        for (const enemy of this.enemies) {
            if (enemy.isDead) continue;

            enemy.removeBlockAtTurnStart();

            const sleepEffect = enemy.statuses.get(StatusEffectId.SLEEP);
            if (sleepEffect && sleepEffect.stacks > 0) {
                this.addLog(`${enemy.name} dort et ne peut pas agir !`);
                sleepEffect.tick();
                enemy.removeExpiredStatuses();
                this.emit('status_applied', { entityId: enemy.id, statusId: StatusEffectId.SLEEP, stacks: sleepEffect.stacks });
                continue;
            }

            for (const effect of enemy.statuses.values()) {
                effect.onTurnStart(enemy.id, this);
            }
            enemy.removeExpiredStatuses();

            if (!enemy.isDead) this.enemyTurnQueue.push(enemy);
        }
        // BattleScene commence le traitement séquentiel via resolveNextEnemy()
    }

    /**
     * Traite le prochain ennemi dans la file.
     * Appelé par BattleScene après chaque animation (une fois par ennemi).
     * Renvoie true s'il reste des ennemis à traiter.
     */
    resolveNextEnemy(): boolean {
        if (this.phase !== CombatPhase.ENEMY_TURN) return false;

        if (this.enemyTurnQueue.length === 0) {
            this.checkDefeat();
            if (this.phase === CombatPhase.ENEMY_TURN) {
                this.startPlayerTurn();
            }
            return false;
        }

        const enemy = this.enemyTurnQueue.shift()!;
        this.resolveEnemyMove(enemy);
        enemy.advanceMove();
        this.checkDefeat();

        return this.phase === CombatPhase.ENEMY_TURN && this.enemyTurnQueue.length > 0;
    }

    private resolveEnemyMove(enemy: Enemy): void {
        const move = enemy.nextMove;
        this.addLog(`${enemy.name} utilise ${move.name}`);
        this.emit('enemy_action', { enemyId: enemy.id });

        for (const effect of move.effects) {
            switch (effect.type) {
                case CardEffectType.DEAL_DAMAGE:
                    const dmg = enemy.calcOutgoingDamage(effect.value ?? 0);
                    const hpDmg = this.player.takeDamage(dmg);
                    this.emit('damage_dealt', { targetId: this.player.id, amount: dmg, hpDamage: hpDmg });
                    this.addLog(`Vous recevez ${dmg} dégâts (${hpDmg} PV perdus)`);
                    break;

                case CardEffectType.GAIN_BLOCK:
                    this.gainBlock(enemy.id, effect.value ?? 0);
                    break;

                case CardEffectType.APPLY_STATUS:
                    if (effect.statusId) {
                        if (effect.target === CardTarget.SELF) {
                            enemy.applyStatus(effect.statusId, effect.statusStacks ?? 1);
                        } else {
                            this.player.applyStatus(effect.statusId, effect.statusStacks ?? 1);
                        }
                        this.emit('status_applied', { statusId: effect.statusId });
                    }
                    break;
            }
        }
    }

    // ─── Helpers publics (appelés par les StatusEffects) ──────────────────────

    gainBlock(entityId: string, amount: number): void {
        if (entityId === this.player.id) {
            this.player.gainBlock(amount);
            this.emit('block_gained', { entityId, amount });
        } else {
            const enemy = this.enemies.find(e => e.id === entityId);
            if (enemy) {
                enemy.gainBlock(amount);
                this.emit('block_gained', { entityId, amount });
            }
        }
    }

    healEntity(entityId: string, amount: number): void {
        if (entityId === this.player.id) this.player.heal(amount);
    }

    applyPoisonDamage(entityId: string, amount: number): void {
        if (entityId === this.player.id) {
            const hpDmg = this.player.takeDamage(amount);
            this.emit('damage_dealt', { targetId: entityId, amount, hpDamage: hpDmg, source: 'poison' });
        } else {
            const enemy = this.enemies.find(e => e.id === entityId);
            if (enemy) {
                const hpDmg = enemy.takeDamage(amount);
                this.emit('damage_dealt', { targetId: entityId, amount, hpDamage: hpDmg, source: 'poison' });
            }
        }
    }

    dealDamageToEntity(entityId: string, amount: number): void {
        if (entityId === this.player.id) {
            const hpDmg = this.player.takeDamage(amount);
            this.emit('damage_dealt', { targetId: entityId, amount, hpDamage: hpDmg });
        }
    }

    // ─── Vérifications fin de combat ──────────────────────────────────────────

    private checkVictory(): void {
        const allDead = this.enemies.every(e => e.isDead);
        if (allDead) {
            this.setPhase(CombatPhase.VICTORY);
            this.addLog('🏆 Victoire !');
            this.emit('combat_victory', {});
        }
    }

    private checkDefeat(): void {
        if (this.player.isDead) {
            this.setPhase(CombatPhase.DEFEAT);
            this.addLog('💀 Défaite...');
            this.emit('combat_defeat', {});
        }
    }

    private addLog(msg: string): void {
        this.log.push(msg);
        this.emit('log_entry', { message: msg });
    }

    get isOver(): boolean {
        return this.phase === CombatPhase.VICTORY || this.phase === CombatPhase.DEFEAT;
    }

    get livingEnemies(): Enemy[] {
        return this.enemies.filter(e => !e.isDead);
    }
}
