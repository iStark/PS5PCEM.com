/**
 * Locale-independent compatibility facts, from docs/project-status.md and the
 * release notes in the emulator repository: which titles were observed, how far
 * each one got, its lead capture, and when the maintainer last confirmed it.
 *
 * All prose — the result line, the summary, what works, what does not, and the
 * measurements — is translated and lives under src/i18n/content, keyed by slug.
 * Tier labels and descriptions live in the UI dictionaries.
 *
 * Every measurement quoted anywhere on the site refers to the RTX 3070 Ti
 * development host. Title content is supplied locally by the user and is never
 * distributed with the emulator or from this site.
 */

export type CompatibilityTier = "playable" | "ingame" | "intro" | "boots";

export type CompatibilityEntry = {
  /** URL segment and translation key. */
  slug: string;
  /** Proper noun: the same in every language. */
  title: string;
  tier: CompatibilityTier;
  /** Lead capture under /public/images. Alt text is translated. */
  image?: string;
  /** ISO date the maintainer last confirmed this entry. */
  confirmedOn?: string;
};

export const compatibility: CompatibilityEntry[] = [
  {
    slug: "severed-steel",
    title: "Severed Steel",
    tier: "ingame",
    confirmedOn: "2026-10-21",
    image: "/images/severed-steel-gameplay-2026-10-21.jpg",
  },
  {
    slug: "astro-bot",
    title: "ASTRO BOT",
    tier: "intro",
    confirmedOn: "2026-10-16",
    image: "/images/astro-bot-wave64-lighting-2026-10-13.png",
  },
  {
    "slug": "goat-simulator-3",
    "title": "Goat Simulator 3",
    "tier": "ingame",
    "confirmedOn": "2026-10-13",
    "image": "/images/goat-simulator-3-gameplay-2026-10-13.jpg"
  },
  {
    "slug": "minecraft-legends",
    "title": "Minecraft Legends",
    "tier": "ingame",
    "confirmedOn": "2026-10-13",
    "image": "/images/minecraft-legends-gameplay-2026-10-13.jpg"
  },
  {
    "slug": "police-simulator-patrol-officers",
    "title": "Police Simulator: Patrol Officers",
    "tier": "intro",
    "confirmedOn": "2026-10-12",
    "image": "/images/police-simulator-menu-2026-10-12.jpg"
  },
  {
    "slug": "monster-boy-and-the-cursed-kingdom",
    "title": "Monster Boy and the Cursed Kingdom",
    "tier": "ingame",
    "confirmedOn": "2026-10-12",
    "image": "/images/monster-boy-gameplay-2026-10-12.jpg"
  },
  {
    "slug": "oxide-room-104",
    "title": "Oxide Room 104",
    "tier": "intro",
    "confirmedOn": "2026-10-11",
    "image": "/images/oxide-room-104-autosave-2026-10-11.jpg"
  },
  {
    "slug": "medieval-dynasty",
    "title": "Medieval Dynasty",
    "tier": "intro",
    "confirmedOn": "2026-10-11",
    "image": "/images/medieval-dynasty-menu-2026-10-11.jpg"
  },
  {
    "slug": "charons-staircase",
    "title": "Charon's Staircase",
    "tier": "ingame",
    "confirmedOn": "2026-10-11",
    "image": "/images/charons-staircase-scene-2026-10-11.jpg"
  },
  {
    "slug": "pac-man-world-re-pac",
    "title": "PAC-MAN WORLD Re-PAC",
    "tier": "intro",
    "confirmedOn": "2026-10-11",
    "image": "/images/pac-man-world-re-pac-title-2026-10-11.jpg"
  },
  {
    slug: "keywe",
    title: "KeyWe",
    tier: "intro",
    image: "/images/keywe-save-slots-2026-10-11.jpg",
    confirmedOn: "2026-10-11",
  },
  {
    slug: "super-woden-gp",
    title: "Super Woden GP",
    tier: "intro",
    image: "/images/super-woden-gp-menu-2026-10-11.jpg",
    confirmedOn: "2026-10-11",
  },
  {
    slug: "arcade-spirits-the-new-challengers",
    title: "Arcade Spirits: The New Challengers",
    tier: "intro",
    image: "/images/arcade-spirits-menu-2026-10-11.jpg",
    confirmedOn: "2026-10-11",
  },
  {
    slug: "arkanoid-eternal-battle",
    title: "Arkanoid: Eternal Battle",
    tier: "intro",
    image: "/images/arkanoid-menu-2026-10-11.png",
    confirmedOn: "2026-10-11",
  },
  {
    slug: "raiden-iv-mikado-remix",
    title: "Raiden IV x Mikado Remix",
    tier: "playable",
    image: "/images/raiden-iv-gameplay-2026-10-17.png",
    confirmedOn: "2026-10-17",
  },
  {
    slug: "dead-cells",
    title: "Dead Cells",
    tier: "ingame",
    image: "/images/dead-cells-gameplay-2026-10-11.png",
    confirmedOn: "2026-10-11",
  },
  {
    slug: "little-nightmares-enhanced-edition",
    title: "Little Nightmares Enhanced Edition",
    tier: "ingame",
    image: "/images/little-nightmares-saves-performance-2026-10-03.png",
    confirmedOn: "2026-10-03",
  },
  {
    slug: "gta-iii-definitive-edition",
    title: "Grand Theft Auto III: The Definitive Edition",
    tier: "ingame",
    image: "/images/gta3-startup-reflections-2026-10-10.png",
    confirmedOn: "2026-10-10",
  },
  {
    slug: "terminator-2d-no-fate",
    title: "Terminator 2D: No Fate",
    tier: "playable",
    image: "/images/live-gameplay.png",
    confirmedOn: "2026-09-08",
  },
  {
    slug: "asterix-obelix-slap-them-all",
    title: "Asterix & Obelix: Slap Them All!",
    tier: "playable",
    image: "/images/asterix-msaa-depth-fix-2026-10-09.png",
    confirmedOn: "2026-09-08",
  },
  {
    slug: "cat-quest-iii",
    title: "Cat Quest III",
    tier: "playable",
    image: "/images/cat-quest-iii-world.png",
    confirmedOn: "2026-09-08",
  },
  {
    slug: "dreaming-sarah",
    title: "Dreaming Sarah",
    tier: "playable",
    image: "/images/dreaming-sarah-vertex-uploads-2026-10-10.png",
    confirmedOn: "2026-10-10",
  },
  {
    slug: "jurassic-park-classic-games-collection",
    title: "Jurassic Park Classic Games Collection",
    tier: "playable",
    image: "/images/jurassic-park-font-fix-gameplay.png",
    confirmedOn: "2026-10-08",
  },
  {
    slug: "jets-n-guns-2",
    title: "Jets 'n' Guns 2",
    tier: "playable",
    image: "/images/jets-audio-combat-2026-10-09.png",
    confirmedOn: "2026-09-15",
  },
  {
    slug: "quake-ii-2023",
    title: "Quake II (2023)",
    tier: "playable",
    image: "/images/quake-ii-gameplay.png",
    confirmedOn: "2026-09-16",
  },
  {
    slug: "ritas-rewind",
    title: "Mighty Morphin Power Rangers: Rita's Rewind",
    tier: "playable",
    image: "/images/ritas-rewind-gameplay.png",
    confirmedOn: "2026-09-24",
  },
  {
    slug: "the-precinct",
    title: "The Precinct",
    tier: "ingame",
    image: "/images/precinct-title-menu.png",
  },
  {
    slug: "ghost-of-yotei",
    title: "Ghost of Yōtei",
    tier: "ingame",
    image: "/images/yotei-null-images-bonus.png",
    confirmedOn: "2026-10-13",
  },
  {
    slug: "subnautica-below-zero",
    title: "Subnautica: Below Zero",
    tier: "playable",
    image: "/images/subnautica-below-zero-repeat2-2026-10-03.png",
    confirmedOn: "2026-10-03",
  },
  {
    slug: "big-helmet-heroes",
    title: "Big Helmet Heroes",
    tier: "intro",
    image: "/images/big-helmet-heroes-menu-performance-2026-10-10.png",
    confirmedOn: "2026-10-10",
  },
  {
    slug: "tetris-effect-connected",
    title: "Tetris Effect: Connected",
    tier: "intro",
    image: "/images/tetris-effect-first-render.png",
    confirmedOn: "2026-09-24",
  },
  {
    slug: "reanimal",
    title: "REANIMAL",
    tier: "intro",
    image: "/images/reanimal-menu-partial.png",
  },
  {
    slug: "propagation-paradise-hotel",
    title: "Propagation: Paradise Hotel",
    tier: "boots",
  },
  {
    slug: "pistol-whip",
    title: "Pistol Whip",
    tier: "boots",
  },
];

export const compatibilityMeta = {
  /** Newest maintainer confirmation across the dataset. */
  confirmedOn: "2026-10-21",
  testedOnRelease: "0.3.2",
  host: "NVIDIA GeForce RTX 3070 Ti",
} as const;

/** Tier order used everywhere the list is rendered, best result first. */
export const tierOrder: CompatibilityTier[] = [
  "playable",
  "ingame",
  "intro",
  "boots",
];

export function countByTier(): Record<CompatibilityTier, number> {
  const counts: Record<CompatibilityTier, number> = {
    playable: 0,
    ingame: 0,
    intro: 0,
    boots: 0,
  };
  for (const entry of compatibility) {
    counts[entry.tier] += 1;
  }
  return counts;
}

export function sortedCompatibility(): CompatibilityEntry[] {
  return [...compatibility].sort((a, b) => {
    const byTier = tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier);
    return byTier !== 0 ? byTier : a.title.localeCompare(b.title, "en");
  });
}

export function findBySlug(slug: string): CompatibilityEntry | undefined {
  return compatibility.find((entry) => entry.slug === slug);
}

export function slugs(): string[] {
  return compatibility.map((entry) => entry.slug);
}
