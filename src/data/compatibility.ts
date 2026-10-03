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
    slug: "gta-iii-definitive-edition",
    title: "Grand Theft Auto III: The Definitive Edition",
    tier: "ingame",
    image: "/images/gta3-renderer-performance.png",
    confirmedOn: "2026-10-03",
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
    image: "/images/asterix-obelix-gameplay.png",
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
    image: "/images/dreaming-sarah-gameplay.png",
    confirmedOn: "2026-09-15",
  },
  {
    slug: "jurassic-park-classic-games-collection",
    title: "Jurassic Park Classic Games Collection",
    tier: "playable",
    image: "/images/jurassic-park-menu.png",
    confirmedOn: "2026-09-08",
  },
  {
    slug: "jets-n-guns-2",
    title: "Jets 'n' Guns 2",
    tier: "playable",
    image: "/images/jets-n-guns-2-gameplay.png",
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
    confirmedOn: "2026-10-01",
  },
  {
    slug: "subnautica-below-zero",
    title: "Subnautica: Below Zero",
    tier: "playable",
    image: "/images/subnautica-below-zero-new-game-world.png",
    confirmedOn: "2026-10-01",
  },
  {
    slug: "big-helmet-heroes",
    title: "Big Helmet Heroes",
    tier: "intro",
    image: "/images/big-helmet-heroes-scalar-history-tutorial.png",
    confirmedOn: "2026-09-29",
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
  confirmedOn: "2026-10-02",
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
