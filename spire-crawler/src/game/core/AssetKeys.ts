/**
 * Toutes les clés d'assets utilisées dans le jeu.
 * Pour ajouter un vrai sprite : déposer le fichier dans public/assets/[dossier]/[key].png
 * et le BootScene le chargera automatiquement si la clé est listée ici.
 */
export const AssetKeys = {
    // Backgrounds
    BG_MENU: 'bg_menu',
    BG_BATTLE: 'bg_battle',
    BG_MAP: 'bg_map',

    // Cards — backs et frames
    CARD_BACK: 'card_back',
    CARD_FRAME_ATTACK: 'card_frame_attack',
    CARD_FRAME_SKILL: 'card_frame_skill',
    CARD_FRAME_POWER: 'card_frame_power',

    // Card artworks — nommés par l'ID de la définition
    CARD_ART_PREFIX: 'card_art_',

    // Enemies
    ENEMY_CULTIST: 'enemy_cultist',
    ENEMY_JAW_WORM: 'enemy_jaw_worm',
    ENEMY_RED_LOUSE: 'enemy_red_louse',
    ENEMY_BOSS_GUARDIAN: 'enemy_boss_guardian',

    // Player
    PLAYER_IRONCLAD: 'player_ironclad',

    // UI
    UI_ENERGY_ORB: 'ui_energy_orb',
    UI_HEART: 'ui_heart',
    UI_SWORD: 'ui_sword',
    UI_SHIELD: 'ui_shield',
    UI_DECK: 'ui_deck',
    UI_DISCARD: 'ui_discard',
    UI_EXHAUST: 'ui_exhaust',
    UI_END_TURN_BTN: 'ui_end_turn_btn',

    // Intent icons
    INTENT_ATTACK: 'intent_attack',
    INTENT_DEFEND: 'intent_defend',
    INTENT_BUFF: 'intent_buff',
    INTENT_DEBUFF: 'intent_debuff',
    INTENT_UNKNOWN: 'intent_unknown',

    // Map nodes
    MAP_NODE_MONSTER: 'map_node_monster',
    MAP_NODE_ELITE: 'map_node_elite',
    MAP_NODE_REST: 'map_node_rest',
    MAP_NODE_BOSS: 'map_node_boss',
    MAP_NODE_EVENT: 'map_node_event',

    // Status effect icons — préfixe + id de l'effet
    STATUS_ICON_PREFIX: 'status_',
} as const;

export type AssetKey = typeof AssetKeys[keyof typeof AssetKeys];
