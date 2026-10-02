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
        "Asterix & Obelix: Slap Them All!",
        "Big Helmet Heroes",
        "Cat Quest III",
        "Dreaming Sarah",
        "Ghost of Yōtei",
        "Grand Theft Auto III: The Definitive Edition",
        "Jets 'n' Guns 2",
        "Jurassic Park Classic Games Collection",
        "Mighty Morphin Power Rangers: Rita's Rewind",
        "Pistol Whip",
        "Propagation: Paradise Hotel",
        "Quake II (2023)",
        "REANIMAL",
        "Subnautica: Below Zero",
        "Terminator 2D: No Fate",
        "Tetris Effect: Connected",
        "The Precinct",
      ].sort(),
    );
  });

  it("reflects the nine titles graded playable by the maintainer", () => {
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
        "Quake II (2023)",
        "Terminator 2D: No Fate",
        "Subnautica: Below Zero",
      ].sort(),
    );
    expect(countByTier().playable).toBe(9);
  });

  it("does not grade Ghost of Yotei as playable", () => {
    const yotei = findBySlug("ghost-of-yotei");
    expect(yotei).toBeDefined();
    expect(yotei!.tier).toBe("ingame");
  });

  it("keeps titles with unverified gameplay short of playable", () => {
    for (const slug of [
      "big-helmet-heroes",
      "tetris-effect-connected",
      "gta-iii-definitive-edition",
    ]) {
      expect(findBySlug(slug)!.tier, slug).toBe("intro");
    }
  });

  it("attributes every measurement to the documented test host", () => {
    expect(compatibilityMeta.host).toBe("NVIDIA GeForce RTX 3070 Ti");
    expect(compatibilityMeta.testedOnRelease).toBe("0.3.2");
    expect(compatibilityMeta.confirmedOn).toBe("2026-10-02");
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

  it("labels a release build with a real tag, or marks it as development", () => {
    for (const run of history) {
      if (run.release !== null) {
        expect(run.release, run.id).toMatch(/^v0\.3\.\d/);
      }
    }
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
    expect(games["asterix-obelix-slap-them-all"].performance).toContain("28–31 ms");
    expect(games["cat-quest-iii"].performance).toContain("124 ms");
    expect(games["dreaming-sarah"].performance).toContain("5,280 flips");
    expect(games["jets-n-guns-2"].performance).toContain("70–92 ms");
    expect(games["quake-ii-2023"].performance).toContain("60–70 FPS");
    expect(games["the-precinct"].performance).toContain("2.1 s");
    expect(games["ritas-rewind"].performance).toContain("13–20 ms");
    expect(games["big-helmet-heroes"].performance).toContain("157 ms");
    expect(games["tetris-effect-connected"].performance).toContain("235 ms");
    expect(games["ghost-of-yotei"].performance).toContain("0.73 FPS");
    expect(games["subnautica-below-zero"].performance).toContain("10.43 FPS");
  });

  it("states plainly what is not claimed", () => {
    expect(enContent.games["ghost-of-yotei"].status).toMatch(/not playable/i);
    expect(enContent.games["ghost-of-yotei"].limits.join(" ")).toMatch(
      /remains unverified/i,
    );
    expect(enContent.games["subnautica-below-zero"].limits.join(" ")).toMatch(
      /did not include a full playthrough/i,
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
      /30 FPS has not been reached/i,
    );
  });
});
