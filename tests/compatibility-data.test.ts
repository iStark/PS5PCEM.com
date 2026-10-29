import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  compatibility,
  compatibilityMeta,
  countByTier,
  findBySlug,
  slugs,
  sortedCompatibility,
  tierOrder,
} from "@/data/compatibility";
import { allHistory, history, historyFor, historyIds } from "@/data/history";
import { releaseHistory } from "@/data/release";
import enContent from "@/i18n/content/en";

const publicDir = path.resolve(__dirname, "..", "public");

/**
 * These assertions pin the dataset to docs/project-status.md and the release
 * notes in the emulator repository. If the emulator's own documents change,
 * this suite is meant to fail until the site is brought back in line.
 */
describe("compatibility dataset", () => {
  it("covers every title listed in project-status.md", () => {
    expect(compatibility.map((entry) => entry.title).sort()).toEqual(
      [
        "ASTRO BOT",
        "Severed Steel",
        "Goat Simulator 3",
        "Minecraft Legends",
        "PAC-MAN WORLD Re-PAC",
        "Charon's Staircase",
        "Medieval Dynasty",
        "Oxide Room 104",
        "Monster Boy and the Cursed Kingdom",
        "Police Simulator: Patrol Officers",
        "Arcade Spirits: The New Challengers",
        "Arkanoid: Eternal Battle",
        "Asterix & Obelix: Slap Them All!",
        "Big Helmet Heroes",
        "Cat Quest III",
        "Dead Cells",
        "Dreaming Sarah",
        "Ghost of Yōtei",
        "Grand Theft Auto III: The Definitive Edition",
        "Jets 'n' Guns 2",
        "Jurassic Park Classic Games Collection",
        "KeyWe",
        "Little Nightmares Enhanced Edition",
        "Mighty Morphin Power Rangers: Rita's Rewind",
        "Pistol Whip",
        "Propagation: Paradise Hotel",
        "Quake II (2023)",
        "REANIMAL",
        "Raiden IV x Mikado Remix",
        "Subnautica: Below Zero",
        "Super Woden GP",
        "Terminator 2D: No Fate",
        "Tetris Effect: Connected",
        "The Precinct",
      ].sort(),
    );
  });

  it("reflects the ten titles graded playable by the maintainer", () => {
    expect(
      compatibility
        .filter((entry) => entry.tier === "playable")
        .map((entry) => entry.title)
        .sort(),
    ).toEqual(
      [
        "Asterix & Obelix: Slap Them All!",
        "Cat Quest III",
        "Dreaming Sarah",
        "Jets 'n' Guns 2",
        "Jurassic Park Classic Games Collection",
        "Mighty Morphin Power Rangers: Rita's Rewind",
        "Raiden IV x Mikado Remix",
        "Quake II (2023)",
        "Terminator 2D: No Fate",
        "Subnautica: Below Zero",
      ].sort(),
    );
    expect(countByTier().playable).toBe(10);
  });

  it("keeps in-game titles with severe defects short of playable", () => {
    for (const slug of ["astro-bot", "severed-steel", "goat-simulator-3", "minecraft-legends", "dead-cells", "ghost-of-yotei", "gta-iii-definitive-edition", "monster-boy-and-the-cursed-kingdom"]) {
      const game = findBySlug(slug);
      expect(game).toBeDefined();
      expect(game!.tier, slug).toBe("ingame");
    }
  });

  it("keeps titles with unverified gameplay short of playable", () => {
    for (const slug of [
      "pac-man-world-re-pac",
      "medieval-dynasty",
      "oxide-room-104",
      "police-simulator-patrol-officers",
      "arcade-spirits-the-new-challengers",
      "arkanoid-eternal-battle",
      "big-helmet-heroes",
      "keywe",
      "super-woden-gp",
      "tetris-effect-connected",
    ]) {
      expect(findBySlug(slug)!.tier, slug).toBe("intro");
    }
  });

  it("attributes every measurement to the documented test host", () => {
    expect(compatibilityMeta.host).toBe("NVIDIA GeForce RTX 3070 Ti");
    expect(compatibilityMeta.testedOnRelease).toBe("0.3.2");
    expect(compatibilityMeta.confirmedOn).toBe("2026-10-29");
  });

  it("gives every entry a unique slug and a known tier", () => {
    const list = slugs();
    expect(new Set(list).size).toBe(list.length);
    for (const entry of compatibility) {
      expect(tierOrder, entry.slug).toContain(entry.tier);
      expect(entry.title.trim().length).toBeGreaterThan(0);
      expect(entry.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("references lead captures that exist in public/", () => {
    const withImages = compatibility.filter((entry) => entry.image);
    expect(withImages.length).toBeGreaterThan(10);

    for (const entry of withImages) {
      const file = path.join(publicDir, entry.image!.replace(/^\//, ""));
      expect(existsSync(file), `${entry.image} is missing`).toBe(true);
    }
  });

  it("sorts best results first, then alphabetically", () => {
    const sorted = sortedCompatibility();
    expect(sorted[0].tier).toBe("playable");
    expect(sorted.at(-1)!.tier).toBe("boots");

    for (let i = 1; i < sorted.length; i += 1) {
      const previous = tierOrder.indexOf(sorted[i - 1].tier);
      const current = tierOrder.indexOf(sorted[i].tier);
      expect(current).toBeGreaterThanOrEqual(previous);
      if (current === previous) {
        expect(
          sorted[i - 1].title.localeCompare(sorted[i].title, "en"),
        ).toBeLessThanOrEqual(0);
      }
    }
  });

  it("does not mutate the source array when sorting", () => {
    const before = slugs();
    sortedCompatibility();
    expect(slugs()).toEqual(before);
  });

  it("counts every entry exactly once across the tiers", () => {
    const total = Object.values(countByTier()).reduce((sum, n) => sum + n, 0);
    expect(total).toBe(compatibility.length);
  });
});

describe("test history", () => {
  it("gives every entry a unique id", () => {
    const ids = historyIds();
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("attaches every run to a title on record", () => {
    const known = new Set(slugs());
    for (const run of history) {
      expect(known.has(run.slug), `${run.id} → ${run.slug}`).toBe(true);
    }
  });

  it("uses ISO dates no earlier than the first public prototype", () => {
    for (const run of history) {
      expect(run.date, run.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(run.date >= "2026-08-25", run.id).toBe(true);
    }
  });

  it("uses a known release tag or marks unreleased work as development", () => {
    const known = new Set(releaseHistory.map((release) => release.tag));
    for (const run of history) {
      if (run.release !== null) {
        expect(known.has(run.release), run.id).toBe(true);
      }
    }
  });

  it("attributes report changes to the release containing them", () => {
    for (const [id, release] of [
      ["bhh-startup", "v0.3.3"],
      ["yotei-cache-memory", "v0.3.3"],
      ["jurassic-font-atlas-startup", "v0.3.4"],
      ["jets-playable", "v0.3.1-beta.1"],
      ["quake-playable", "v0.3.2"],
      ["quake2-d3d12-indirect-bias-20261029", null],
      ["quake2-d3d12-mrt-20261029", null],
      ["quake2-d3d12-cubemaps-20261029", null],
      ["gta3-startup-reflections", null],
      ["bhh-menu-performance-20261010", null],
      ["dead-cells-ngs2-link", null],
      ["dead-cells-level-menu-audio", null],
      ["raiden-iv-startup-depth", null],
      ["raiden-iv-audio-rendering-20261017", null],
      ["severed-steel-exposure-20261021", null],
      ["severed-steel-gameplay-20261021", null],
      ["severed-steel-menu-20261020", null],
      ["arkanoid-fiber-startup", null],
      ["arcade-spirits-pthread-semaphores", null],
      ["super-woden-gp-pthread-cleanup", null],
      ["keywe-pthread-audio3d", null],
      ["goat-simulator-3-gameplay-20261013", null],
      ["yotei-renderer-followup-20261013", null],
      ["astro-bot-startup-20261013", null],
      ["astro-bot-lighting-20261013", null],
      ["astro-bot-native-layouts-20261014", null],
      ["astro-bot-full-stores-20261014", null],
      ["astro-bot-relative-moves-20261014", null],
      ["astro-bot-cpu-baselines-20261014", null],
      ["astro-bot-scalar-checkpoints-20261014", null],
      ["astro-bot-bounded-recording-20261014", null],
      ["astro-bot-scalar-merges-20261014", null],
      ["astro-bot-static-analysis-20261014", null],
      ["astro-bot-storage-layouts-20261014", null],
      ["astro-bot-draw-capture-20261014", null],
      ["astro-bot-descriptor-semantics-20261014", null],
      ["astro-bot-entry-scalars-20261015", null],
      ["astro-bot-uniform-scan-20261015", null],
      ["astro-bot-resource-costs-20261015", null],
      ["astro-bot-resource-walks-20261016", null],
      ["astro-bot-storage-readbacks-20261016", null],
      ["astro-bot-graphics-20261024", null],
      ["astro-bot-compute-loops-20261024", null],
      ["astro-bot-texture-min-lod-20261024", null],
      ["astro-bot-rgb-mask-performance-20261024", null],
      ["astro-bot-gds-publication-20261014", null],
      ["astro-bot-performance-20261014", null],
      ["minecraft-legends-gameplay-20261013", null],
      ["police-simulator-career-20261012", null],
      ["monster-boy-gameplay-20261012", null],
      ["oxide-room-104-startup-20261011", null],
      ["oxide-room-104-raster-startup-20261029", null],
      ["medieval-dynasty-startup-20261011", null],
      ["charons-staircase-startup-20261011", null],
      ["pac-man-world-re-pac-startup-20261011", null],
    ]) {
      expect(history.find((run) => run.id === id)?.release, id ?? "").toBe(release);
    }
    expect(history.filter((run) => run.release === null)).toHaveLength(57);
  });

  it("references captures that exist in public/", () => {
    const withImages = history.filter((run) => run.image);
    expect(withImages.length).toBeGreaterThan(20);

    for (const run of withImages) {
      const file = path.join(publicDir, run.image!.replace(/^\//, ""));
      expect(existsSync(file), `${run.image} (${run.id}) is missing`).toBe(true);
    }
  });

  it("points every source link at the emulator repository", () => {
    for (const run of history.filter((candidate) => candidate.source)) {
      expect(run.source, run.id).toMatch(
        /^https:\/\/github\.com\/iStark\/PS5PCEM\/blob\//,
      );
    }
  });

  it("documents the heavily investigated titles in depth", () => {
    // These three carry dated reports in docs/development; the others do not.
    expect(historyFor("ghost-of-yotei").length).toBeGreaterThanOrEqual(5);
    expect(historyFor("subnautica-below-zero").length).toBeGreaterThanOrEqual(5);
    expect(historyFor("big-helmet-heroes").length).toBeGreaterThanOrEqual(4);
  });

  it("gives every title on record at least one run", () => {
    for (const slug of slugs()) {
      expect(historyFor(slug).length, slug).toBeGreaterThan(0);
    }
  });

  it("orders runs newest first", () => {
    for (const slug of slugs()) {
      const runs = historyFor(slug);
      for (let i = 1; i < runs.length; i += 1) {
        expect(runs[i - 1].date >= runs[i].date, slug).toBe(true);
      }
    }

    const all = allHistory();
    for (let i = 1; i < all.length; i += 1) {
      expect(all[i - 1].date >= all[i].date).toBe(true);
    }
  });
});

describe("English source prose", () => {
  it("keeps the measured figures published in project-status.md", () => {
    const games = enContent.games;

    expect(games["terminator-2d-no-fate"].performance).toContain("22 and 65 ms");
    expect(games["asterix-obelix-slap-them-all"].performance).toContain("46.45 → 162.20 FPS");
    expect(games["asterix-obelix-slap-them-all"].performance).toContain("30-second UI-counter samples");
    expect(games["cat-quest-iii"].performance).toContain("124 ms");
    expect(games["dreaming-sarah"].performance).toContain("198.25 FPS");
    expect(games["dreaming-sarah"].performance).toContain("187.8–203.2 FPS");
    expect(games["dreaming-sarah"].performance).toContain("144.35 FPS");
    expect(games["jets-n-guns-2"].performance).toContain("70–92 ms");
    expect(games["quake-ii-2023"].performance).toContain("60–70 FPS");
    expect(games["the-precinct"].performance).toContain("2.1 s");
    expect(games["ritas-rewind"].performance).toContain("13–20 ms");
    expect(games["big-helmet-heroes"].performance).toContain("9.4 FPS");
    expect(games["tetris-effect-connected"].performance).toContain("235 ms");
    expect(games["ghost-of-yotei"].performance).toContain("1.27 FPS");
    expect(games["subnautica-below-zero"].performance).toContain("15.50 FPS");
    expect(games["subnautica-below-zero"].performance).toContain("12.70 and 8.50 FPS");
    expect(games["subnautica-below-zero"].performance).toContain("10.60 FPS combined");
    expect(enContent.history["subnautica-performance-repeat"].summary).toContain("9.998-second stall");
  });

  it("states plainly what is not claimed", () => {
    expect(enContent.games["ghost-of-yotei"].status).toMatch(/not playable/i);
    expect(enContent.games["ghost-of-yotei"].limits.join(" ")).toMatch(
      /remains unverified/i,
    );
    expect(enContent.games["subnautica-below-zero"].limits.join(" ")).toMatch(
      /full playthrough.*remain unverified/i,
    );
    expect(enContent.games["reanimal"].limits.join(" ")).toMatch(
      /no gameplay is claimed/i,
    );
    expect(enContent.games["big-helmet-heroes"].limits.join(" ")).toMatch(
      /unverified/i,
    );
  });

  it("records the 30 FPS target as unmet where the reports say so", () => {
    expect(enContent.games["subnautica-below-zero"].performance).toMatch(
      /30 FPS/,
    );
    expect(enContent.games["big-helmet-heroes"].limits.join(" ")).toMatch(
      /15 FPS.*not achieved/i,
    );
  });
});
