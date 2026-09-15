import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  compatibility,
  compatibilityMeta,
  countByTier,
  sortedCompatibility,
  tierOf,
  tierOrder,
  tiers,
} from "@/data/compatibility";

const publicDir = path.resolve(__dirname, "..", "public");

/**
 * These assertions pin the site's compatibility data to the numbers and claims
 * published in docs/project-status.md. If the emulator's own status document
 * changes, this suite is meant to fail until the site is updated to match.
 */
describe("compatibility dataset", () => {
  it("covers every title listed in project-status.md", () => {
    const titles = compatibility.map((entry) => entry.title).sort();
    expect(titles).toEqual(
      [
        "Asterix & Obelix: Slap Them All!",
        "Cat Quest III",
        "Dreaming Sarah",
        "Ghost of Yōtei",
        "Jets 'n' Guns 2",
        "Jurassic Park Classic Games Collection",
        "Mighty Morphin Power Rangers: Rita's Rewind",
        "Pistol Whip",
        "Propagation: Paradise Hotel",
        "REANIMAL",
        "Terminator 2D: No Fate",
        "Tetris Effect: Connected",
        "The Precinct",
      ].sort(),
    );
  });

  it("marks exactly the five titles the maintainer completed", () => {
    const playable = compatibility
      .filter((entry) => entry.tier === "playable")
      .map((entry) => entry.title)
      .sort();

    expect(playable).toEqual(
      [
        "Asterix & Obelix: Slap Them All!",
        "Cat Quest III",
        "Dreaming Sarah",
        "Jurassic Park Classic Games Collection",
        "Terminator 2D: No Fate",
      ].sort(),
    );
    expect(countByTier().playable).toBe(5);
  });

  it("does not claim playability for Ghost of Yotei", () => {
    const yotei = compatibility.find(
      (entry) => entry.slug === "ghost-of-yotei",
    );
    expect(yotei).toBeDefined();
    expect(yotei!.tier).not.toBe("playable");
    expect(yotei!.status.toLowerCase()).toContain("not playable");
    expect(yotei!.performance).toContain("0.6 FPS");
  });

  it("does not claim a menu or gameplay for Tetris Effect", () => {
    const tetris = compatibility.find(
      (entry) => entry.slug === "tetris-effect-connected",
    );
    expect(tetris).toBeDefined();
    expect(tetris!.tier).toBe("intro");
    expect(tetris!.notes).toContain("Neither a menu nor gameplay is claimed");
  });

  it("records REANIMAL's incomplete menu labels as a known limit", () => {
    const reanimal = compatibility.find((entry) => entry.slug === "reanimal");
    expect(reanimal!.notes).toContain("central menu-option labels");
    expect(reanimal!.notes).toContain("gameplay is not claimed");
  });

  it("keeps the measured figures from project-status.md", () => {
    const byslug = new Map(
      compatibility.map((entry) => [entry.slug, entry] as const),
    );

    expect(byslug.get("terminator-2d-no-fate")!.performance).toContain(
      "22–65 ms",
    );
    expect(byslug.get("asterix-obelix-slap-them-all")!.performance).toContain(
      "28–31 ms",
    );
    expect(byslug.get("cat-quest-iii")!.performance).toContain("124 ms");
    expect(byslug.get("dreaming-sarah")!.performance).toContain("5,280 flips");
    expect(byslug.get("jets-n-guns-2")!.performance).toContain("30–40 seconds");
    expect(byslug.get("the-precinct")!.performance).toContain("2.1 s");
    expect(byslug.get("ritas-rewind")!.performance).toContain("13–20 ms");
    expect(byslug.get("tetris-effect-connected")!.performance).toContain(
      "3.3–3.8 seconds",
    );
  });

  it("attributes every timing to the documented test host", () => {
    expect(compatibilityMeta.host).toBe("NVIDIA GeForce RTX 3070 Ti");
    expect(compatibilityMeta.confirmedOn).toBe("2026-09-08");
    expect(compatibilityMeta.testedOnRelease).toBe("0.3.1-beta.1");
  });

  it("gives every entry a unique slug", () => {
    const slugs = compatibility.map((entry) => entry.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("gives every entry a known tier, status, headline and notes", () => {
    for (const entry of compatibility) {
      expect(tierOrder).toContain(entry.tier);
      expect(entry.status.length).toBeGreaterThan(0);
      expect(entry.headline.length).toBeGreaterThan(0);
      expect(entry.milestone.length).toBeGreaterThan(0);
      expect(entry.notes.length).toBeGreaterThan(0);
    }
  });

  it("references screenshots that exist in public/", () => {
    const withImages = compatibility.filter((entry) => entry.image);
    expect(withImages.length).toBeGreaterThan(0);

    for (const entry of withImages) {
      const file = path.join(publicDir, entry.image!.src.replace(/^\//, ""));
      expect(existsSync(file), `${entry.image!.src} is missing`).toBe(true);
      expect(entry.image!.alt.length).toBeGreaterThan(10);
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
          sorted[i - 1].title.localeCompare(sorted[i].title),
        ).toBeLessThanOrEqual(0);
      }
    }
  });

  it("does not mutate the source array when sorting", () => {
    const before = compatibility.map((entry) => entry.slug);
    sortedCompatibility();
    expect(compatibility.map((entry) => entry.slug)).toEqual(before);
  });

  it("counts every entry exactly once across the tiers", () => {
    const counts = countByTier();
    const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
    expect(total).toBe(compatibility.length);
  });

  it("describes each tier", () => {
    expect(tiers).toHaveLength(tierOrder.length);
    for (const tier of tierOrder) {
      const meta = tierOf(tier);
      expect(meta.label.length).toBeGreaterThan(0);
      expect(meta.shortLabel.length).toBeGreaterThan(0);
      expect(meta.description.length).toBeGreaterThan(20);
    }
  });

  it("rejects an unknown tier", () => {
    // @ts-expect-error deliberately invalid input
    expect(() => tierOf("perfect")).toThrow(/Unknown compatibility tier/);
  });
});
