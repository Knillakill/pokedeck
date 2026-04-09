import { AUTO, Game } from 'phaser';
import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { MainMenu } from './scenes/MainMenu';
import { CharacterSelect } from './scenes/CharacterSelect';
import { MapScene } from './scenes/MapScene';
import { BattleScene } from './scenes/BattleScene';
import { RewardScene } from './scenes/RewardScene';
import { RestScene } from './scenes/RestScene';
import { GameOver } from './scenes/GameOver';
import { DeckViewer } from './scenes/DeckViewer';

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#0d1117',
    render: {
        antialias: true,
        antialiasGL: true,
        pixelArt: false,
        roundPixels: false,
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        CharacterSelect,
        MapScene,
        BattleScene,
        RewardScene,
        RestScene,
        GameOver,
        DeckViewer,
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    dom: {
        createContainer: true,
    },
};

const StartGame = (parent: string) => {
    const game = new Game({ ...config, parent });
    // Bloquer le menu contextuel du navigateur sur le canvas du jeu
    game.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    return game;
};

export default StartGame;
