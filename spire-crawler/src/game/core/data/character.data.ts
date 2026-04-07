import { STARTER_DECK_IDS } from '../cards/cards.data';
import { SALAMECHE_STARTER_DECK_IDS } from '../cards/salameche_cards.data';
import { CardInstance } from '../cards/CardInstance';

export interface CharacterDefinition {
    id: string;
    name: string;
    displayName: string;
    maxHp: number;
    maxEnergy: number;
    startingGold: number;
    description: string;
    spriteKey: string;
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
    spriteKey: 'bulbasaur_sprite',
    buildStarterDeck: () =>
        STARTER_DECK_IDS.map(id => new CardInstance(id)),
};

const salamèche: CharacterDefinition = {
    id: 'salamèche',
    name: 'Salamèche',
    displayName: 'Salamèche',
    maxHp: 80,
    maxEnergy: 3,
    startingGold: 99,
    description: 'Pokémon Lézard. Maîtrise le feu et la fureur. Plus il souffre, plus il est dangereux.',
    spriteKey: 'char_sprite_salamèche',
    buildStarterDeck: () =>
        SALAMECHE_STARTER_DECK_IDS.map(id => new CardInstance(id)),
};

const carapuce: CharacterDefinition = {
    id: 'carapuce',
    name: 'Carapuce',
    displayName: 'Carapuce',
    maxHp: 85,
    maxEnergy: 3,
    startingGold: 99,
    description: 'Pokémon Minuscule. Sa carapace est son arme. Tank impénétrable des combats.',
    spriteKey: 'char_sprite_carapuce',
    buildStarterDeck: () =>
        STARTER_DECK_IDS.map(id => new CardInstance(id)),
};

const characterRegistry = new Map<string, CharacterDefinition>();

export function registerAllCharacters(): void {
    characterRegistry.set(bulbizarre.id, bulbizarre);
    characterRegistry.set(salamèche.id, salamèche);
    characterRegistry.set(carapuce.id, carapuce);
}

export function getCharacterDefinition(id: string): CharacterDefinition {
    const def = characterRegistry.get(id);
    if (!def) throw new Error(`Personnage introuvable : ${id}`);
    return def;
}

export const DEFAULT_CHARACTER_ID = 'bulbizarre';
