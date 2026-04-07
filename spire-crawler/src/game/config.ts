/**
 * Facteur d'échelle global de l'interface.
 * Modifier S pour agrandir / réduire TOUTE l'interface uniformément.
 * Base : 1.0 = taille d'origine pour un canvas 1920×1080.
 * 1024×768  → S ≈ 0.70  (ratio 1024/1920 × 1.3)
 */
export const S = 0.7;

/** Arrondit N * S à l'entier le plus proche */
export const sc = (n: number): number => Math.round(n * S);

/** Renvoie une string fontSize Phaser : sc(n) + 'px' */
export const fz = (n: number): string => `${sc(n)}px`;
