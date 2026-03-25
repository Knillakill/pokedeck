import { Scene } from 'phaser';
import { registerAllCards } from '../core/cards/cards.data';
import { registerAllEffects } from '../core/effects/effects.data';
import { registerAllEnemies } from '../core/data/enemies.data';
import { registerAllCharacters } from '../core/data/character.data';

/**
 * Boot : initialise tous les registres de données et lance le Preloader.
 * Aucun asset Phaser à charger ici — tout est en placeholders graphiques.
 */
export class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    preload(): void {
        // Charger les vrais assets s'ils existent dans public/assets/
        // Les assets manquants seront remplacés par des graphiques proceduraux.
        this.load.on('loaderror', () => { /* ignore les assets manquants */ });
    }

    create(): void {
        // Enregistrer tous les registres de données du jeu
        registerAllEffects();
        registerAllCards();
        registerAllEnemies();
        registerAllCharacters();

        this.scene.start('Preloader');
    }
}
