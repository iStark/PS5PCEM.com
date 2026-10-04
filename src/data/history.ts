/**
 * Per-title test history: the dated runs behind each compatibility result.
 *
 * Only locale-independent facts live here — when a run happened, which build it
 * was, its capture and its report in the emulator repository. The prose for each
 * entry is translated, and lives under src/i18n/content keyed by `id`.
 *
 * Sources: docs/project-status.md, docs/release-notes/*.md and the dated
 * investigations under docs/development/ in the emulator repository.
 */

const DOC_BASE = "https://github.com/iStark/PS5PCEM/blob/main/docs";

function devReport(file: string): string {
  return `${DOC_BASE}/development/${file}`;
}

function releaseNotes(tag: string): string {
  return `${DOC_BASE}/release-notes/${tag}.md`;
}

export type HistoryEntry = {
  /** Translation key for this entry's title, summary and image alt text. */
  id: string;
  /** Compatibility entry this run belongs to. */
  slug: string;
  /** ISO date of the run or of the build that recorded it. */
  date: string;
  /**
   * The build the run was made on: a published release tag, or null for an
   * unreleased development build.
   */
  release: string | null;
  /** Capture under /public/images, when the report published one. */
  image?: string;
  /** The report or release notes backing the entry. */
  source?: string;
};

export const history: HistoryEntry[] = [
  {
    id: "yotei-runtime-image-tables",
    image: "/images/yotei-runtime-texture-tree-2026-10-05.png",
    date: "2026-10-05",
    slug: "ghost-of-yotei",
    release: null,
    source: devReport("yotei-runtime-image-tables-2026-10-05.md"),
  },
  {
    id: "yotei-selected-flat-reads",
    date: "2026-10-04",
    slug: "ghost-of-yotei",
    release: null,
    image: "/images/yotei-selected-flat-tree-2026-10-04.png",
    source: devReport("yotei-array-layers-2026-10-04.md"),
  },
  {
    id: "yotei-compiler-memory-audit",
    date: "2026-10-04",
    slug: "ghost-of-yotei",
    release: null,
    source: devReport("yotei-array-layers-2026-10-04.md"),
  },
  {
    id: "yotei-compact-shader-analysis",
    date: "2026-10-04",
    slug: "ghost-of-yotei",
    release: null,
    source: devReport("yotei-array-layers-2026-10-04.md"),
  },
  {
    id: "yotei-sparse-regions-repeat",
    date: "2026-10-04",
    slug: "ghost-of-yotei",
    release: null,
    image: "/images/yotei-sparse-post-tree-2026-10-04.png",
    source: devReport("yotei-array-layers-2026-10-04.md"),
  },
  {
    id: "yotei-sparse-material-regions",
    date: "2026-10-04",
    slug: "ghost-of-yotei",
    release: null,
    source: devReport("yotei-array-layers-2026-10-04.md"),
  },
  {
    id: "yotei-integer-material-flat-reads",
    date: "2026-10-04",
    slug: "ghost-of-yotei",
    release: null,
    source: devReport("yotei-array-layers-2026-10-04.md"),
  },
  {
    id: "yotei-checked-material-samplers",
    date: "2026-10-04",
    slug: "ghost-of-yotei",
    release: null,
    image: "/images/yotei-material-pointer-post-tree-2026-10-04.png",
    source: devReport("yotei-array-layers-2026-10-04.md"),
  },
  {
    id: "yotei-material-pointer-checks",
    slug: "ghost-of-yotei",
    date: "2026-10-04",
    release: null,
    image: "/images/yotei-color-epoch-post-tree-2026-10-04.png",
    source: devReport("yotei-array-layers-2026-10-04.md"),
  },
  {
    id: "yotei-color-content-generations",
    slug: "ghost-of-yotei",
    date: "2026-10-04",
    release: null,
    image: "/images/yotei-packed-post-tree-2026-10-04.png",
    source: devReport("yotei-array-layers-2026-10-04.md"),
  },
  {
    id: "yotei-color-transfer-memory",
    slug: "ghost-of-yotei",
    date: "2026-10-04",
    release: null,
    image: "/images/yotei-color-transfer-tree-2026-10-04.png",
    source: devReport("yotei-array-layers-2026-10-04.md"),
  },
  {
    id: "yotei-illustrated-movie-compilation",
    slug: "ghost-of-yotei",
    date: "2026-10-04",
    release: null,
    image: "/images/yotei-post-tree-movie-2026-10-04.png",
    source: devReport("yotei-array-layers-2026-10-04.md"),
  },
  {
    id: "yotei-post-tree-texture-reuse",
    slug: "ghost-of-yotei",
    date: "2026-10-04",
    release: null,
    image: "/images/yotei-post-tree-dark-2026-10-04.png",
    source: devReport("yotei-array-layers-2026-10-04.md"),
  },
  {
    id: "yotei-array-layer-coherence",
    slug: "ghost-of-yotei",
    date: "2026-10-04",
    release: null,
    image: "/images/yotei-array-layers-tree-2026-10-04.png",
    source: devReport("yotei-array-layers-2026-10-04.md"),
  },
  {
    id: "yotei-candidate-visual-check",
    slug: "ghost-of-yotei",
    date: "2026-10-03",
    release: null,
    image: "/images/yotei-post-tree-candidate-2026-10-03.png",
    source: devReport("yotei-post-tree-2026-10-03.md"),
  },
  {
    id: "yotei-post-tree-dynamic-state",
    slug: "ghost-of-yotei",
    date: "2026-10-03",
    release: null,
    image: "/images/yotei-post-tree-baseline-2026-10-03.png",
    source: devReport("yotei-post-tree-2026-10-03.md"),
  },
  {
    id: "little-nightmares-saves-performance",
    slug: "little-nightmares-enhanced-edition",
    date: "2026-10-03",
    release: null,
    image: "/images/little-nightmares-saves-performance-2026-10-03.png",
    source: devReport("little-nightmares-saves-performance-2026-10-03.md"),
  },
  {
    id: "little-nightmares-gameplay",
    slug: "little-nightmares-enhanced-edition",
    date: "2026-10-03",
    release: null,
    image: "/images/little-nightmares-gameplay.png",
    source: devReport("little-nightmares-gameplay-2026-10-03.md"),
  },
  {
    id: "little-nightmares-startup",
    slug: "little-nightmares-enhanced-edition",
    date: "2026-10-03",
    release: null,
    image: "/images/little-nightmares-title.png",
    source: devReport("little-nightmares-startup-2026-10-03.md"),
  },
  {
    id: "subnautica-performance-repeat-2",
    slug: "subnautica-below-zero",
    date: "2026-10-03",
    release: null,
    image: "/images/subnautica-below-zero-repeat2-2026-10-03.png",
    source: devReport("subnautica-performance-repeat-2026-10-03.md"),
  },
  {
    id: "subnautica-performance-repeat",
    slug: "subnautica-below-zero",
    date: "2026-10-03",
    release: null,
    image: "/images/subnautica-below-zero-repeat-2026-10-03.png",
    source: devReport("subnautica-performance-repeat-2026-10-03.md"),
  },
  {
    id: "gta3-renderer-performance",
    slug: "gta-iii-definitive-edition",
    date: "2026-10-03",
    release: null,
    image: "/images/gta3-renderer-performance.png",
    source: devReport("gta3-renderer-performance-2026-10-03.md"),
  },
  {
    id: "gta3-ngg-gameplay",
    slug: "gta-iii-definitive-edition",
    date: "2026-10-02",
    release: null,
    image: "/images/gta3-opening-gameplay.png",
    source: devReport("gta3-ngg-exports-2026-10-02.md"),
  },
  {
    id: "gta3-ampr-startup",
    slug: "gta-iii-definitive-edition",
    date: "2026-10-02",
    release: null,
    image: "/images/gta3-policies.png",
    source: devReport("gta3-ampr-startup-2026-10-02.md"),
  },
  {
    id: "gta3-pkg-extraction",
    slug: "gta-iii-definitive-edition",
    date: "2026-10-02",
    release: null,
    source: devReport("gta3-pkg-extraction-2026-10-02.md"),
  },
  // Subnautica: Below Zero — PPSA02457 v1.022.125
  {
    id: "subnautica-windows-stack",
    slug: "subnautica-below-zero",
    date: "2026-10-02",
    release: null,
    image: "/images/subnautica-below-zero-stack-world.png",
    source: devReport("subnautica-vector-walk-save-2026-10-02.md"),
  },
  {
    id: "subnautica-resource-scratch",
    slug: "subnautica-below-zero",
    date: "2026-10-02",
    release: null,
    image: "/images/subnautica-below-zero-resource-world.png",
    source: devReport("subnautica-vector-walk-save-2026-10-02.md"),
  },
  {
    id: "subnautica-descriptor-unmap",
    slug: "subnautica-below-zero",
    date: "2026-10-02",
    release: null,
    image: "/images/subnautica-below-zero-descriptor-world.png",
    source: devReport("subnautica-vector-walk-save-2026-10-02.md"),
  },
  {
    id: "subnautica-read-lease",
    slug: "subnautica-below-zero",
    date: "2026-10-02",
    release: null,
    image: "/images/subnautica-below-zero-read-lease-world.png",
    source: devReport("subnautica-vector-walk-save-2026-10-02.md"),
  },
  {
    id: "subnautica-overlap-world",
    slug: "subnautica-below-zero",
    date: "2026-10-02",
    release: null,
    image: "/images/subnautica-below-zero-overlap-world.png",
    source: devReport("subnautica-vector-walk-save-2026-10-02.md"),
  },
  {
    id: "subnautica-save-recovery",
    slug: "subnautica-below-zero",
    date: "2026-10-02",
    release: null,
    image: "/images/subnautica-below-zero-save-recovery.png",
    source: devReport("subnautica-vector-walk-save-2026-10-02.md"),
  },
  {
    id: "subnautica-save-metadata",
    slug: "subnautica-below-zero",
    date: "2026-10-02",
    release: null,
    source: devReport("subnautica-vector-walk-save-2026-10-02.md"),
  },
  {
    id: "subnautica-vector-walk",
    slug: "subnautica-below-zero",
    date: "2026-10-02",
    release: null,
    image: "/images/subnautica-below-zero-vector-walk.png",
    source: devReport("subnautica-vector-walk-save-2026-10-02.md"),
  },
  {
    id: "subnautica-srgb-spans",
    slug: "subnautica-below-zero",
    date: "2026-10-01",
    release: null,
    image: "/images/subnautica-below-zero-srgb.png",
    source: devReport("subnautica-backing-spans-2026-10-01.md"),
  },
  {
    id: "subnautica-mip-coherence",
    slug: "subnautica-below-zero",
    date: "2026-10-01",
    release: null,
    image: "/images/subnautica-below-zero-mip-coherence.png",
    source: devReport("subnautica-lighting-2026-10-01.md"),
  },
  {
    id: "subnautica-colour-mips",
    slug: "subnautica-below-zero",
    date: "2026-10-01",
    release: null,
    source: devReport("subnautica-lighting-2026-10-01.md"),
  },
  {
    id: "subnautica-lighting-baseline",
    slug: "subnautica-below-zero",
    date: "2026-10-01",
    release: null,
    source: devReport("subnautica-lighting-2026-10-01.md"),
  },
  {
    id: "subnautica-startup",
    slug: "subnautica-below-zero",
    date: "2026-09-26",
    release: null,
    source: devReport("subnautica-startup-2026-09-26.md"),
  },
  {
    id: "subnautica-menu-missing",
    slug: "subnautica-below-zero",
    date: "2026-09-26",
    release: null,
    image: "/images/subnautica-below-zero-menu-2026-09-26.png",
    source: devReport("subnautica-menu-2026-09-26.md"),
  },
  {
    id: "subnautica-native-1080p",
    slug: "subnautica-below-zero",
    date: "2026-09-27",
    release: null,
    image: "/images/subnautica-below-zero-menu-cpu.png",
    source: devReport("subnautica-cpu-costs-2026-09-27.md"),
  },
  {
    id: "subnautica-menu-performance",
    slug: "subnautica-below-zero",
    date: "2026-09-28",
    release: null,
    image: "/images/subnautica-below-zero-menu-staging.png",
    source: devReport("subnautica-scalar-scratch-2026-09-28.md"),
  },
  {
    id: "subnautica-new-game",
    slug: "subnautica-below-zero",
    date: "2026-10-01",
    release: null,
    image: "/images/subnautica-below-zero-new-game-world.png",
    source: devReport("subnautica-new-game-2026-10-01.md"),
  },

  // Ghost of Yōtei
  {
    id: "yotei-intro-video",
    slug: "ghost-of-yotei",
    date: "2026-09-04",
    release: "v0.3.0-alpha.3",
    image: "/images/yotei-intro-video.png",
    source: releaseNotes("v0.3.0-alpha.3"),
  },
  {
    id: "yotei-bonus-notices",
    slug: "ghost-of-yotei",
    date: "2026-09-08",
    release: "v0.3.0-alpha.4",
    image: "/images/yotei-warmup-priority-wolf.png",
    source: releaseNotes("v0.3.0-alpha.4"),
  },
  {
    id: "yotei-difficulty",
    slug: "ghost-of-yotei",
    date: "2026-09-15",
    release: "v0.3.1-beta.1",
    image: "/images/yotei-difficulty.png",
    source: releaseNotes("v0.3.1-beta.1"),
  },
  {
    id: "yotei-tree-scene",
    slug: "ghost-of-yotei",
    date: "2026-09-24",
    release: "v0.3.2",
    image: "/images/yotei-tree-scene.png",
    source: devReport("yotei-performance-2026-09-24.md"),
  },
  {
    id: "yotei-command-writes",
    slug: "ghost-of-yotei",
    date: "2026-09-30",
    release: null,
    image: "/images/yotei-command-writes-tree.png",
    source: devReport("yotei-command-buffer-writes-2026-09-30.md"),
  },
  {
    id: "yotei-null-images",
    slug: "ghost-of-yotei",
    date: "2026-10-01",
    release: null,
    image: "/images/yotei-null-images-bonus.png",
    source: devReport("yotei-null-images-2026-10-01.md"),
  },

  // Big Helmet Heroes
  {
    id: "bhh-startup",
    slug: "big-helmet-heroes",
    date: "2026-09-28",
    release: null,
    image: "/images/big-helmet-heroes-startup-menu.png",
    source: devReport("big-helmet-heroes-startup-2026-09-28.md"),
  },
  {
    id: "bhh-menu",
    slug: "big-helmet-heroes",
    date: "2026-09-28",
    release: null,
    image: "/images/big-helmet-heroes-menu.png",
    source: devReport("big-helmet-heroes-performance-2026-09-28.md"),
  },
  {
    id: "bhh-copies",
    slug: "big-helmet-heroes",
    date: "2026-09-29",
    release: null,
    image: "/images/big-helmet-heroes-wide-tiles-tutorial.png",
    source: devReport("big-helmet-heroes-wide-tiles-2026-09-29.md"),
  },
  {
    id: "bhh-scalar-history",
    slug: "big-helmet-heroes",
    date: "2026-09-29",
    release: null,
    image: "/images/big-helmet-heroes-scalar-history-tutorial.png",
    source: devReport("big-helmet-heroes-scalar-history-2026-09-29.md"),
  },

  // Quake II (2023)
  {
    id: "quake-playable",
    slug: "quake-ii-2023",
    date: "2026-09-16",
    release: null,
    image: "/images/quake-ii-title.png",
    source: releaseNotes("v0.3.2"),
  },
  {
    id: "quake-rendering",
    slug: "quake-ii-2023",
    date: "2026-09-25",
    release: null,
    image: "/images/quake-ii-gameplay.png",
    source: devReport("quake2-performance-2026-09-25.md"),
  },

  // Tetris Effect: Connected
  {
    id: "tetris-first-render",
    slug: "tetris-effect-connected",
    date: "2026-09-15",
    release: "v0.3.1-beta.1",
    image: "/images/tetris-effect-first-render.png",
    source: releaseNotes("v0.3.1-beta.1"),
  },
  {
    id: "tetris-license-journey",
    slug: "tetris-effect-connected",
    date: "2026-09-24",
    release: "v0.3.2",
    source: releaseNotes("v0.3.2"),
  },

  // Mighty Morphin Power Rangers: Rita's Rewind
  {
    id: "rita-intro-menu",
    slug: "ritas-rewind",
    date: "2026-09-15",
    release: "v0.3.1-beta.1",
    image: "/images/ritas-rewind-intro.png",
    source: releaseNotes("v0.3.1-beta.1"),
  },
  {
    id: "rita-playable",
    slug: "ritas-rewind",
    date: "2026-09-24",
    release: "v0.3.2",
    image: "/images/ritas-rewind-gameplay.png",
    source: releaseNotes("v0.3.2"),
  },

  // Jets 'n' Guns 2
  {
    id: "jets-tutorial",
    slug: "jets-n-guns-2",
    date: "2026-09-15",
    release: "v0.3.1-beta.1",
    image: "/images/jets-n-guns-2.png",
    source: releaseNotes("v0.3.1-beta.1"),
  },
  {
    id: "jets-playable",
    slug: "jets-n-guns-2",
    date: "2026-09-15",
    release: null,
    image: "/images/jets-n-guns-2-gameplay.png",
  },
  {
    id: "jets-audio",
    slug: "jets-n-guns-2",
    date: "2026-09-24",
    release: "v0.3.2",
    source: releaseNotes("v0.3.2"),
  },

  // Cat Quest III
  {
    id: "cat-quest-render-fixes",
    slug: "cat-quest-iii",
    date: "2026-09-08",
    release: "v0.3.0-alpha.4",
    image: "/images/cat-quest-iii-language.png",
    source: releaseNotes("v0.3.0-alpha.4"),
  },
  {
    id: "cat-quest-playable",
    slug: "cat-quest-iii",
    date: "2026-09-08",
    release: "v0.3.0-alpha.4",
    image: "/images/cat-quest-iii-world.png",
    source: releaseNotes("v0.3.0-alpha.4"),
  },

  // Single-run histories
  {
    id: "precinct-title-menu",
    slug: "the-precinct",
    date: "2026-09-15",
    release: "v0.3.1-beta.1",
    image: "/images/precinct-title-menu.png",
  },
  {
    id: "sarah-playable",
    slug: "dreaming-sarah",
    date: "2026-09-15",
    release: "v0.3.1-beta.1",
    image: "/images/dreaming-sarah-gameplay.png",
    source: releaseNotes("v0.3.1-beta.1"),
  },
  {
    id: "terminator-playable",
    slug: "terminator-2d-no-fate",
    date: "2026-09-08",
    release: "v0.3.0-alpha.4",
    image: "/images/live-gameplay.png",
    source: releaseNotes("v0.3.0-alpha.4"),
  },
  {
    id: "asterix-playable",
    slug: "asterix-obelix-slap-them-all",
    date: "2026-09-08",
    release: "v0.3.0-alpha.4",
    image: "/images/asterix-obelix-gameplay.png",
    source: releaseNotes("v0.3.0-alpha.4"),
  },
  {
    id: "jurassic-playable",
    slug: "jurassic-park-classic-games-collection",
    date: "2026-09-08",
    release: "v0.3.0-alpha.4",
    image: "/images/jurassic-park-menu.png",
    source: releaseNotes("v0.3.0-alpha.4"),
  },
  {
    id: "reanimal-title-menu",
    slug: "reanimal",
    date: "2026-09-15",
    release: "v0.3.1-beta.1",
    image: "/images/reanimal-menu-partial.png",
  },
  {
    id: "propagation-bootstrap",
    slug: "propagation-paradise-hotel",
    date: "2026-09-15",
    release: "v0.3.1-beta.1",
  },
  {
    id: "pistol-whip-modules",
    slug: "pistol-whip",
    date: "2026-09-15",
    release: "v0.3.1-beta.1",
  },
];

/** Every run recorded for one title, newest first. */
export function historyFor(slug: string): HistoryEntry[] {
  return history
    .filter((entry) => entry.slug === slug)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Every run recorded anywhere, newest first — used by the timeline on /media. */
export function allHistory(): HistoryEntry[] {
  return [...history].sort((a, b) => b.date.localeCompare(a.date));
}

export function historyIds(): string[] {
  return history.map((entry) => entry.id);
}
