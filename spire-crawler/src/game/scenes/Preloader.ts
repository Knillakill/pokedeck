import { Scene } from 'phaser';
import { C, sc, fz } from '../config';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init(): void {
        const { width, height } = this.scale;
        const cx = width / 2;
        const cy = height / 2;

        // ── Fond premium ─────────────────────────────────────────────────────
        const bg = this.add.graphics();
        bg.fillGradientStyle(C.BG_DEEP, C.BG_DEEP, C.BG_MAIN, C.BG_PANEL, 1);
        bg.fillRect(0, 0, width, height);

        // Quelques particules dorées subtiles
        for (let i = 0; i < 30; i++) {
            const px = Math.random() * width;
            const py = Math.random() * height;
            const star = this.add.graphics();
            star.fillStyle(C.GOLD, 0.12 + Math.random() * 0.18);
            star.fillCircle(px, py, sc(0.8) + Math.random() * sc(1.2));
        }

        // ── Emblème / Logo ────────────────────────────────────────────────────
        this.add.text(cx, cy - sc(90), '⬡', {
            fontSize: fz(40), color: C.S_GOLD, stroke: '#000', strokeThickness: 2, resolution: 2,
        }).setOrigin(0.5).setAlpha(0.18);

        this.add.text(cx, cy - sc(80), 'POKÉMON SPIRE', {
            fontSize: fz(38), fontFamily: 'Georgia, serif', fontStyle: 'bold',
            color: C.S_GOLD, stroke: '#1a0d00', strokeThickness: sc(5), resolution: 2,
        }).setOrigin(0.5);

        // Ligne décorative sous le titre
        const deco = this.add.graphics();
        deco.lineStyle(1, C.GOLD_BORDER, 0.55);
        deco.lineBetween(cx - sc(180), cy - sc(50), cx + sc(180), cy - sc(50));
        deco.fillStyle(C.GOLD, 0.7);
        deco.fillCircle(cx, cy - sc(50), sc(3));

        this.add.text(cx, cy - sc(36), 'Un deckbuilder roguelike dans l\'univers Pokémon', {
            fontSize: fz(13), fontFamily: 'Georgia, serif', fontStyle: 'italic',
            color: C.S_MUTED, resolution: 2,
        }).setOrigin(0.5);

        // ── Barre de progression premium ──────────────────────────────────────
        const barW = sc(420);
        const barH = sc(14);
        const barX = cx - barW / 2;
        const barY = cy + sc(18);

        const outline = this.add.graphics();
        outline.fillStyle(C.BG_SURFACE, 1);
        outline.fillRoundedRect(barX - sc(2), barY - sc(2), barW + sc(4), barH + sc(4), sc(9));
        outline.lineStyle(1.5, C.GOLD_BORDER, 0.75);
        outline.strokeRoundedRect(barX - sc(2), barY - sc(2), barW + sc(4), barH + sc(4), sc(9));

        const bar = this.add.graphics();
        this.load.on('progress', (p: number) => {
            bar.clear();
            bar.fillStyle(C.GOLD_DEEP, 1);
            bar.fillRoundedRect(barX, barY, (barW) * p, barH, sc(7));
            // Reflet or vif sur la moitié haute
            bar.fillStyle(C.GOLD, 0.5);
            bar.fillRoundedRect(barX, barY, (barW) * p, barH * 0.45, sc(7));
        });

        this.add.text(cx, barY + sc(22), 'Chargement des ressources…', {
            fontSize: fz(11), fontFamily: 'Georgia, serif', fontStyle: 'italic',
            color: C.S_DIM, resolution: 2,
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
