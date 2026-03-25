import { MapData, MapNode, RunState } from './types';
import { generateMap } from './data/map.data';
import { getCharacterDefinition, DEFAULT_CHARACTER_ID } from './data/character.data';
import { CardInstance } from './cards/CardInstance';
import { Player } from './entities/Player';

/**
 * Singleton persistant pendant un run. Stocke l'état du joueur, la carte, l'acte.
 * Partagé entre toutes les scènes via le registre Phaser.
 */
export class RunManager {
    private static _instance: RunManager | null = null;

    characterId: string;
    playerMaxHp: number;
    playerHp: number;
    playerGold: number;
    deck: CardInstance[];
    map: MapData;
    act: number = 1;
    floor: number = 0;

    private constructor(characterId: string) {
        this.characterId = characterId;
        const charDef = getCharacterDefinition(characterId);
        this.playerMaxHp = charDef.maxHp;
        this.playerHp = charDef.maxHp;
        this.playerGold = charDef.startingGold;
        this.deck = charDef.buildStarterDeck();
        this.map = generateMap(1);
    }

    static startNewRun(characterId = DEFAULT_CHARACTER_ID): RunManager {
        this._instance = new RunManager(characterId);
        return this._instance;
    }

    static get instance(): RunManager {
        if (!this._instance) throw new Error('Aucun run actif. Appeler startNewRun() d\'abord.');
        return this._instance;
    }

    static get isActive(): boolean {
        return this._instance !== null;
    }

    /** Crée un Player Phaser à partir de l'état du run. */
    buildPlayer(): Player {
        const charDef = getCharacterDefinition(this.characterId);
        const player = new Player(
            charDef.name,
            this.playerMaxHp,
            this.deck.map(c => c.clone()),
            charDef.maxEnergy,
            this.playerGold
        );
        player.hp = this.playerHp;
        return player;
    }

    /** Synchronise l'état du joueur après un combat. */
    syncFromPlayer(player: Player): void {
        this.playerHp = player.hp;
        this.playerGold = player.gold;
        this.deck = [
            ...player.deck.drawPile,
            ...player.deck.hand,
            ...player.deck.discardPile,
        ].map(c => c.clone());
    }

    addCardToDeck(card: CardInstance): void {
        this.deck.push(card);
    }

    upgradeCardInDeck(instanceId: string): boolean {
        const card = this.deck.find(c => c.instanceId === instanceId);
        if (!card || card.upgraded) return false;
        card.upgrade();
        return true;
    }

    heal(amount: number): void {
        this.playerHp = Math.min(this.playerMaxHp, this.playerHp + amount);
    }

    get currentNode(): MapNode | undefined {
        return this.map.nodes.find(n => n.id === this.map.currentNodeId);
    }

    getAvailableNodes(): MapNode[] {
        const current = this.currentNode;
        if (!current) return [];
        return this.map.nodes.filter(n => current.connections.includes(n.id) && !n.completed);
    }

    markNodeCompleted(nodeId: string): void {
        const node = this.map.nodes.find(n => n.id === nodeId);
        if (node) {
            node.completed = true;
            this.map.currentNodeId = nodeId;
            this.floor++;
        }
    }

    toState(): RunState {
        return {
            player: {
                maxHp: this.playerMaxHp,
                hp: this.playerHp,
                gold: this.playerGold,
                deck: this.deck.map(c => c.toData()),
            },
            map: this.map,
            act: this.act,
            floor: this.floor,
        };
    }
}
