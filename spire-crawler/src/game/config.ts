/**
 * Facteur d'échelle global de l'interface.
 * Modifier S pour agrandir / réduire TOUTE l'interface uniformément.
 * Base : 1.0 = taille d'origine pour un canvas 1920×1080.
 */
export const S = 1.3;

/** Arrondit N * S à l'entier le plus proche */
export const sc = (n: number): number => Math.round(n * S);

/** Renvoie une string fontSize Phaser : sc(n) + 'px' */
export const fz = (n: number): string => `${sc(n)}px`;

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens — Dark RPG Premium
// ─────────────────────────────────────────────────────────────────────────────

/** Toutes les couleurs du jeu centralisées ici. */
export const C = {
    // Fonds
    BG_DEEP:    0x08070f,  // quasi-noir violacé
    BG_MAIN:    0x100e1c,  // fond principal
    BG_PANEL:   0x1a1530,  // panneaux / surfaces
    BG_SURFACE: 0x221d3d,  // surface élevée / hover

    // Or (accents principaux)
    GOLD:        0xf0c040,  // or vif (icônes, highlights)
    GOLD_DEEP:   0xd4a017,  // or profond (remplissage)
    GOLD_BORDER: 0xc8960c,  // bordure or (panneaux actifs)
    GOLD_DIM:    0x7a5a10,  // or atténué (bordures inactives)

    // Pourpre (accents secondaires)
    PURPLE:      0x7c3aed,  // pourpre royal
    PURPLE_DARK: 0x4c1d95,  // pourpre profond
    PURPLE_SOFT: 0x3d3060,  // bordure pourpre

    // HP / Énergie (inchangés)
    HP_RED:      0xc0392b,
    HP_RED_HI:   0xe74c3c,
    HP_RED_DARK: 0x7b241c,
    ENERGY_BLUE: 0x00aaff,
    ENERGY_DARK: 0x0055cc,

    // Statuts (inchangés)
    STATUS_GREEN: 0x27ae60,
    STATUS_TEAL:  0x16a085,

    // Strings pour Phaser.GameObjects.Text
    S_GOLD:    '#f0c040',
    S_GOLD_HI: '#ffd966',
    S_TEXT:    '#f5f0e8',
    S_MUTED:   '#c8b090',
    S_DIM:     '#7a6a55',
    S_PURPLE:  '#a855f7',
    S_BG:      '#08070f',
    S_RED:     '#e74c3c',
    S_GREEN:   '#27ae60',
    S_BLUE:    '#74b9ff',
} as const;
