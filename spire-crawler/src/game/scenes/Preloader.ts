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

        // ── Artworks de cartes — Bulbizarre ─────────────────────────────────
        this.load.image('card_art_vine_whip', 'bulbi/deck/bulbiattack.jpg');
        this.load.image('card_art_growl',     'bulbi/deck/bulbidefense.jpg');
        this.load.image('battle_bg',          'background.jpg');
        this.load.image('rest_bg',            'campfire.jpg');

        // Dos de carte (pioche / défausse)
        this.load.image('card_back', 'card_back.png');

        // Wallpapers de sélection de personnage
        this.load.image('bg_bulbizarre', 'bulbi/bulbiwallpaper.jpg');
        this.load.image('bg_salamèche',  'salameche/salamechewallpaper.jpg');
        this.load.image('bg_carapuce',   'carapuce/carapucewallpaper.jpg');

        // Sprites joueurs — artwork officiel PokeAPI (CharacterSelect uniquement)
        this.load.image('bulbasaur_sprite',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png');
        this.load.image('char_sprite_salamèche',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png');
        this.load.image('char_sprite_carapuce',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png');

        // Spritesheets animés pour BattleScene
        // Bulbizarre et Salamèche utilisent des GIFs DOM, pas de spritesheet.
        // Carapuce : 464×75 px → 8 frames de 58×75
        this.load.spritesheet('ss_carapuce',
            'carapuce/sprite/carapuceidle.png',
            { frameWidth: 58, frameHeight: 75 });

        // Sprites ennemis — les GIFs animés sont chargés via DOM <img> dans EnemyView

        // ── Artworks de cartes — Salamèche ──────────────────────────────────
        const sd = 'salameche/deck/';
        this.load.image('card_art_salameche_griffe',          sd + 'griffe.jpg');
        this.load.image('card_art_salameche_esquive',         sd + 'esquive.jpg');
        this.load.image('card_art_salameche_feufollet',       sd + 'feufollet.jpg');
        this.load.image('card_art_salameche_rugissement',     sd + 'rugissement.jpg');
        this.load.image('card_art_salameche_braise',          sd + 'flammeche.jpg'); // Braise reuse flammeche art
        this.load.image('card_art_salameche_feufollet_c',     sd + 'feufollet.jpg');
        this.load.image('card_art_salameche_coupdefeu',       sd + 'coupdefeu.jpg');
        this.load.image('card_art_salameche_brouillard',      sd + 'brouillard.jpg');
        this.load.image('card_art_salameche_nitrocharge',     sd + 'nitrocharge.jpg');
        this.load.image('card_art_salameche_grosyeux',        sd + 'grosyeux.jpg');
        this.load.image('card_art_salameche_grimace',         sd + 'grimace.jpg');
        this.load.image('card_art_salameche_griffeacier',     sd + 'griffeacier.jpg');
        this.load.image('card_art_salameche_morsure',         sd + 'morsure.jpg');
        this.load.image('card_art_salameche_tranche',         sd + 'tranche.jpg');
        this.load.image('card_art_salameche_coupgriffe',      sd + 'coupgriffe.jpg');
        this.load.image('card_art_salameche_taillad',         sd + 'taillad.jpg');
        this.load.image('card_art_salameche_danselame',       sd + 'danselame.jpg');
        this.load.image('card_art_salameche_rugissementdragon', sd + 'rugissementdragon.jpg');
        this.load.image('card_art_salameche_griffedragon',    sd + 'griffedragon.jpg');
        this.load.image('card_art_salameche_recuperation',    sd + 'recuperation.jpg');
        this.load.image('card_art_salameche_viveattaque',     sd + 'viveattaque.jpg');
        this.load.image('card_art_salameche_lanceflamme',     sd + 'lanceflamme.jpg');
        this.load.image('card_art_salameche_intensification', sd + 'intensification.jpg');
        this.load.image('card_art_salameche_jetdeflamme',     sd + 'jetdeflamme.jpg');
        this.load.image('card_art_salameche_flammeche',       sd + 'flammeche.jpg');
        this.load.image('card_art_salameche_cendre',          sd + 'cendre.jpg');
        this.load.image('card_art_salameche_rage',            sd + 'rage.jpg');
        this.load.image('card_art_salameche_explosivite',     sd + 'explosivité.jpg');
        this.load.image('card_art_salameche_endurence',       sd + 'endurence.jpg');
        this.load.image('card_art_salameche_forcebrute',      sd + 'forcebrute.jpg');
        this.load.image('card_art_salameche_chargesauvage',   sd + 'chargesauvage.jpg');
        this.load.image('card_art_salameche_accuite',         sd + 'accuite.jpg');
        this.load.image('card_art_salameche_entaille',        sd + 'entaille.jpg');
        this.load.image('card_art_salameche_contreattaque',   sd + 'contreattaque.jpg');
        this.load.image('card_art_salameche_tranchecroiser',  sd + 'tranchecroiser.jpg');
        this.load.image('card_art_salameche_dracogriffe',     sd + 'dracogriffe.jpg');
        this.load.image('card_art_salameche_souffledragon',   sd + 'souffledragon.jpg');
        this.load.image('card_art_salameche_dansedragon',     sd + 'dansedragon.jpg');
        this.load.image('card_art_salameche_dentdragon',      sd + 'dentdragon.jpg');
        this.load.image('card_art_salameche_deflagration',    sd + 'deflagration.jpg');
        this.load.image('card_art_salameche_pyrobomb',        sd + 'pyrobomb.jpg');
        this.load.image('card_art_salameche_chaleurinfernal', sd + 'chaleur infernal.jpg');
        this.load.image('card_art_salameche_dechainer',       sd + 'dechainer.jpg');
        this.load.image('card_art_salameche_ultimfureur',     sd + 'ultimfureur.jpg');
        this.load.image('card_art_salameche_avatarefeu',      sd + 'avatarefeu.jpg');
        this.load.image('card_art_salameche_resistance',      sd + 'resistance.jpg');
        this.load.image('card_art_salameche_boudefeu',        sd + 'boudefeu.jpg');
        this.load.image('card_art_salameche_furytotal',       sd + 'furytotal.jpg');
        this.load.image('card_art_salameche_lancesoleil',     sd + 'lancesoleil.jpg');
        this.load.image('card_art_salameche_combotfatal',     sd + 'combotfatal.jpg');
        this.load.image('card_art_salameche_dracometeore',    sd + 'dracometeore.jpg');
        this.load.image('card_art_salameche_tempetdragon',    sd + 'tempetdragon.jpg');
        this.load.image('card_art_salameche_purgatoire',      sd + 'purgatoire.jpg');
    }

    create(): void {
        // Filtre bilinéaire sur toutes les textures de cartes pour éviter la pixelisation
        this.textures.list &&
            Object.keys(this.textures.list)
                .filter(key => key.startsWith('card_art_') || key.startsWith('enemy_sprite_') || key.startsWith('char_sprite_') || key.startsWith('bg_') || key.startsWith('ss_') || key === 'bulbasaur_sprite' || key === 'battle_bg' || key === 'rest_bg' || key === 'card_back')
                .forEach(key => {
                    this.textures.get(key).setFilter(Phaser.Textures.FilterMode.LINEAR);
                });

        this.scene.start('MainMenu');
    }
}
