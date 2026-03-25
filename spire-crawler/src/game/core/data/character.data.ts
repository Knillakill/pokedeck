import { STARTER_DECK_IDS } from '../cards/cards.data';
import { CardInstance } from '../cards/CardInstance';

export interface CharacterDefinition {
    id: string;
    name: string;
    displayName: string;
    maxHp: number;
    maxEnergy: number;
    startingGold: number;
    description: string;
    buildStarterDeck: () => CardInstance[];
}

const bulbizarre: CharacterDefinition = {
    id: 'bulbizarre',
    name: 'Bulbizarre',
    displayName: 'Bulbizarre',
    maxHp: 75,
    maxEnergy: 3,
    startingGold: 99,
    description: 'Pokémon Graine. Maîtrise les attaques de plantes et le poison.',
    buildStarterDeck: () =>
        STARTER_DECK_IDS.map(id => new CardInstance(id)),
};

const characterRegistry = new Map<string, CharacterDefinition>();

export function registerAllCharacters(): void {
    characterRegistry.set(bulbizarre.id, bulbizarre);
}

export function getCharacterDefinition(id: string): CharacterDefinition {
    const def = characterRegistry.get(id);
    if (!def) throw new Error(`Personnage introuvable : ${id}`);
    return def;
}

export const DEFAULT_CHARACTER_ID = 'bulbizarre';
