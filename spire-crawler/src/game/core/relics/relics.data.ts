import { RelicDefinition, RelicRarity } from '../types';

// ─── Reliques Communes ────────────────────────────────────────────────────────

const baieSitrus: RelicDefinition = {
    id: 'baie_sitrus',
    name: 'Baie Sitrus',
    description: 'Récupère 12 PV au début de chaque combat.',
    rarity: RelicRarity.COMMON,
    flavorText: 'Une baie à l\'odeur douce qui restaure les forces.',
};

const pierreTonnerre: RelicDefinition = {
    id: 'pierre_tonnerre',
    name: 'Pierre Tonnerre',
    description: 'Gagnez 1 Énergie supplémentaire au premier tour de chaque combat.',
    rarity: RelicRarity.COMMON,
    flavorText: 'Elle vibre d\'une énergie électrique contenue.',
};

const ecailleAzur: RelicDefinition = {
    id: 'ecaille_azur',
    name: 'Écaille d\'Azur',
    description: 'Gagnez 4 Bloc au début de chaque tour.',
    rarity: RelicRarity.COMMON,
    flavorText: 'Une écaille d\'une dureté incomparable.',
};

const poudreEtoile: RelicDefinition = {
    id: 'poudre_etoile',
    name: 'Poudre Étoile',
    description: 'Piochez 1 carte supplémentaire au début de chaque tour.',
    rarity: RelicRarity.COMMON,
    flavorText: 'La poussière des comètes stimule l\'esprit.',
};

// ─── Reliques Peu Communes ────────────────────────────────────────────────────

const orbeDraconique: RelicDefinition = {
    id: 'orbe_draconique',
    name: 'Orbe Draconique',
    description: 'Toutes vos attaques infligent 2 dégâts supplémentaires.',
    rarity: RelicRarity.UNCOMMON,
    flavorText: 'L\'essence d\'un dragon cristallisée dans une sphère.',
};

const ceintureDojo: RelicDefinition = {
    id: 'ceinture_dojo',
    name: 'Ceinture de Dojo',
    description: 'Gagnez 2 Force permanente au début de chaque combat.',
    rarity: RelicRarity.UNCOMMON,
    flavorText: 'Portée par des champions qui n\'ont jamais renoncé.',
};

const lunettesFiltre: RelicDefinition = {
    id: 'lunettes_filtre',
    name: 'Lunettes Filtre',
    description: 'Gagnez 1 Énergie au début de chaque tour.',
    rarity: RelicRarity.UNCOMMON,
    flavorText: 'Elles filtrent les distractions pour se concentrer sur l\'essentiel.',
};

const medailleArena: RelicDefinition = {
    id: 'medaille_arena',
    name: 'Médaille de l\'Arène',
    description: 'Au début du combat, piochez 2 cartes supplémentaires.',
    rarity: RelicRarity.UNCOMMON,
    flavorText: 'La récompense des guerriers qui ont prouvé leur valeur.',
};

// ─── Reliques Rares ───────────────────────────────────────────────────────────

const coeurMagmar: RelicDefinition = {
    id: 'coeur_magmar',
    name: 'Cœur de Magmar',
    description: '+15 PV maximum. Récupère 15 PV immédiatement.',
    rarity: RelicRarity.RARE,
    flavorText: 'Bat encore au rythme d\'une lave brûlante.',
};

const bouclierLapis: RelicDefinition = {
    id: 'bouclier_lapis',
    name: 'Bouclier de Lapis',
    description: 'Commencez chaque combat avec 10 Bloc.',
    rarity: RelicRarity.RARE,
    flavorText: 'Forgé dans les profondeurs de la grotte bleue.',
};

const fossileOmbre: RelicDefinition = {
    id: 'fossile_ombre',
    name: 'Fossile Ombre',
    description: 'La première attaque que vous subissez chaque combat est réduite à 1 dégât.',
    rarity: RelicRarity.RARE,
    flavorText: 'Les fantômes du passé vous protègent.',
};

// ─── Relique Boss ──────────────────────────────────────────────────────────────

const medailleArcEnCiel: RelicDefinition = {
    id: 'medaille_arc_en_ciel',
    name: 'Médaille Arc-en-ciel',
    description: 'Gagnez 1 Énergie et piochez 1 carte en tuant un ennemi.',
    rarity: RelicRarity.BOSS,
    flavorText: 'La récompense ultime, convoitée par tous les Dresseurs.',
};

// ─── Registre ─────────────────────────────────────────────────────────────────

const relicRegistry = new Map<string, RelicDefinition>();

export function registerAllRelics(): void {
    [
        baieSitrus, pierreTonnerre, ecailleAzur, poudreEtoile,
        orbeDraconique, ceintureDojo, lunettesFiltre, medailleArena,
        coeurMagmar, bouclierLapis, fossileOmbre,
        medailleArcEnCiel,
    ].forEach(r => relicRegistry.set(r.id, r));
}

export function getRelicDefinition(id: string): RelicDefinition | undefined {
    return relicRegistry.get(id);
}

export function getRelicsByRarity(rarity: RelicRarity): RelicDefinition[] {
    return [...relicRegistry.values()].filter(r => r.rarity === rarity);
}

export function getRandomRelic(excludeIds: string[] = []): RelicDefinition {
    const pool = [...relicRegistry.values()].filter(r => !excludeIds.includes(r.id) && r.rarity !== RelicRarity.BOSS);
    if (pool.length === 0) return baieSitrus;
    return pool[Math.floor(Math.random() * pool.length)];
}

export function getRandomEliteRelic(excludeIds: string[] = []): RelicDefinition {
    const uncommon = getRelicsByRarity(RelicRarity.UNCOMMON).filter(r => !excludeIds.includes(r.id));
    const rare     = getRelicsByRarity(RelicRarity.RARE).filter(r => !excludeIds.includes(r.id));
    const pool = [...uncommon, ...uncommon, ...rare]; // uncommon 2x plus probable
    if (pool.length === 0) return baieSitrus;
    return pool[Math.floor(Math.random() * pool.length)];
}

export const RELIC_COLORS: Record<RelicRarity, number> = {
    [RelicRarity.COMMON]:   0x95a5a6,
    [RelicRarity.UNCOMMON]: 0x27ae60,
    [RelicRarity.RARE]:     0x3498db,
    [RelicRarity.BOSS]:     0xf39c12,
};

export const RELIC_ICONS: Record<string, string> = {
    baie_sitrus:           '🍇',
    pierre_tonnerre:       '⚡',
    ecaille_azur:          '🛡',
    poudre_etoile:         '✨',
    orbe_draconique:       '🔮',
    ceinture_dojo:         '🥋',
    lunettes_filtre:       '🔭',
    medaille_arena:        '🏅',
    coeur_magmar:          '❤️',
    bouclier_lapis:        '💙',
    fossile_ombre:         '💀',
    medaille_arc_en_ciel:  '🌈',
};
