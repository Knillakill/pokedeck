import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init(): void {
        // Fond de chargement
        const { width, height } = this.scale;
        const cx = width / 2;
        const cy = height / 2;

        const bg = this.add.graphics();
        bg.fillGradientStyle(0x1a1a2e, 0x1a1a2e, 0x16213e, 0x16213e, 1);
        bg.fillRect(0, 0, width, height);

        // Titre
        this.add.text(cx, cy - 80, 'POKÉMON SPIRE', {
            fontSize: '42px',
            fontFamily: 'Georgia, serif',
            color: '#2ecc71',
            stroke: '#000',
            strokeThickness: 4,
        }).setOrigin(0.5);

        this.add.text(cx, cy - 40, 'Un deckbuilder roguelike dans l\'univers Pokémon', {
            fontSize: '14px',
            fontFamily: 'Georgia, serif',
            color: '#bdc3c7',
        }).setOrigin(0.5);

        // Barre de progression
        const barW = 400;
        const outline = this.add.graphics();
        outline.lineStyle(2, 0xffffff, 0.5);
        outline.strokeRoundedRect(cx - barW / 2, cy + 20, barW, 20, 10);

        const bar = this.add.graphics();
        this.load.on('progress', (p: number) => {
            bar.clear();
            bar.fillStyle(0xf39c12, 1);
            bar.fillRoundedRect(cx - barW / 2 + 2, cy + 22, (barW - 4) * p, 16, 8);
        });

        this.add.text(cx, cy + 50, 'Chargement...', {
            fontSize: '12px', fontFamily: 'Georgia, serif', color: '#7f8c8d',
        }).setOrigin(0.5);
    }

    preload(): void {
        this.load.setPath('assets');

        // ── Artworks de cartes ──────────────────────────────────────────────
        // Convention : clé = 'card_art_<definitionId>'
        // Déposer le fichier dans public/assets/ avec le bon nom,
        // puis l'ajouter ici pour remplacer le placeholder procédural.
        this.load.image('card_art_vine_whip', 'bulbiattack.jpg');
        this.load.image('card_art_growl',     'bulbidefense.jpg');
        this.load.image('battle_bg',          'background.jpg');
        this.load.image('rest_bg',            'campfire.jpg');

        // Dos de carte (pioche / défausse)
        this.load.image('card_back', 'card_back.png');

        // Sprite du joueur pour le champ de bataille
        this.load.image('bulbasaur_sprite', 'bulbasaur.gif');

        // Sprites ennemis — clé = 'enemy_sprite_<enemyId>'
        this.load.image('enemy_sprite_pidgey', 'pidgey.png');
    }

    create(): void {
        // Filtre bilinéaire sur toutes les textures de cartes pour éviter la pixelisation
        this.textures.list &&
            Object.keys(this.textures.list)
                .filter(key => key.startsWith('card_art_') || key.startsWith('enemy_sprite_') || key === 'bulbasaur_sprite' || key === 'battle_bg' || key === 'rest_bg' || key === 'card_back')
                .forEach(key => {
                    this.textures.get(key).setFilter(Phaser.Textures.FilterMode.LINEAR);
                });

        this.scene.start('MainMenu');
    }
}
