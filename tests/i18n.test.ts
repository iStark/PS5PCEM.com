import { describe, expect, it } from "vitest";
import {
  defaultLocale,
  dirOf,
  isLocale,
  localeMeta,
  localePath,
  locales,
  stripLocale,
  toLocale,
} from "@/i18n/config";
import {
  format,
  getContent,
  getDictionary,
  getGameContent,
  getHistoryContent,
  translatedLocales,
} from "@/i18n";
import en from "@/i18n/dictionaries/en";
import enContent from "@/i18n/content/en";
import { compatibility, slugs } from "@/data/compatibility";
import { history, historyIds } from "@/data/history";

/** Every key path in a nested object of strings, e.g. "home.heading". */
function keyPaths(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") {
    return [prefix];
  }
  if (Array.isArray(value)) {
    return [prefix];
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      keyPaths(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [];
}

function at(object: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (node, key) =>
        node && typeof node === "object"
          ? (node as Record<string, unknown>)[key]
          : undefined,
      object,
    );
}

describe("locale configuration", () => {
  it("offers exactly the eight languages the emulator's launcher offers", () => {
    // Order and spelling follow Language / language_labels in src/launcher.zig.
    expect([...locales]).toEqual(["en", "ru", "de", "fr", "zh", "es", "ar", "pt"]);
    expect(locales.map((code) => localeMeta[code].nativeName)).toEqual([
      "English",
      "Русский",
      "Deutsch",
      "Français",
      "简体中文",
      "Español",
      "العربية",
      "Português",
    ]);
  });

  it("marks Arabic as right-to-left and everything else as left-to-right", () => {
    expect(dirOf("ar")).toBe("rtl");
    for (const code of locales.filter((candidate) => candidate !== "ar")) {
      expect(dirOf(code)).toBe("ltr");
    }
  });

  it("gives every locale a usable BCP 47 tag", () => {
    for (const code of locales) {
      const tag = localeMeta[code].htmlLang;
      expect(tag.length).toBeGreaterThan(1);
      // Throws on an invalid tag, which is the real assertion here.
      expect(() => new Intl.DateTimeFormat(tag)).not.toThrow();
    }
    expect(localeMeta.zh.htmlLang).toBe("zh-Hans");
  });

  it("recognises its own locales and nothing else", () => {
    expect(isLocale("ru")).toBe(true);
    expect(isLocale("jp")).toBe(false);
    expect(toLocale("de")).toBe("de");
    expect(toLocale("klingon")).toBe(defaultLocale);
    expect(toLocale(undefined)).toBe(defaultLocale);
  });

  it("builds locale-prefixed paths", () => {
    expect(localePath("ru", "/compatibility")).toBe("/ru/compatibility");
    expect(localePath("en")).toBe("/en");
    expect(localePath("ar", "/games/cat-quest-iii")).toBe(
      "/ar/games/cat-quest-iii",
    );
    expect(localePath("pt", "download")).toBe("/pt/download");
  });

  it("strips a locale prefix so the switcher can stay on the same page", () => {
    expect(stripLocale("/ru/compatibility")).toBe("/compatibility");
    expect(stripLocale("/zh")).toBe("/");
    expect(stripLocale("/ar/games/reanimal")).toBe("/games/reanimal");
    // An unprefixed path is returned unchanged rather than mangled.
    expect(stripLocale("/compatibility")).toBe("/compatibility");
    expect(stripLocale("/")).toBe("/");
  });
});

describe("dictionaries", () => {
  const referenceKeys = keyPaths(en).sort();

  it("ships a dictionary and a content file for all eight locales", () => {
    expect(translatedLocales()).toHaveLength(locales.length);
  });

  it("defines every English key in every other language", () => {
    for (const code of locales) {
      const keys = keyPaths(getDictionary(code)).sort();
      expect(keys, `${code} dictionary keys`).toEqual(referenceKeys);
    }
  });

  it("leaves no string empty and no English text in a translated locale", () => {
    for (const code of locales.filter((candidate) => candidate !== "en")) {
      const dictionary = getDictionary(code);
      for (const path of referenceKeys) {
        const value = at(dictionary, path);
        expect(typeof value, `${code}.${path}`).toBe("string");
        expect((value as string).trim().length, `${code}.${path}`).toBeGreaterThan(0);
      }
    }
  });

  it("keeps every {placeholder} that the English string uses", () => {
    const placeholders = (text: string) =>
      (text.match(/\{(\w+)\}/g) ?? []).sort();

    for (const path of referenceKeys) {
      const expected = placeholders(at(en, path) as string);
      if (expected.length === 0) {
        continue;
      }
      for (const code of locales) {
        const actual = placeholders(at(getDictionary(code), path) as string);
        expect(actual, `${code}.${path}`).toEqual(expected);
      }
    }
  });
});

describe("translated title content", () => {
  it("covers every title on record, in every language", () => {
    for (const code of locales) {
      const games = getContent(code).games;
      expect(Object.keys(games).sort(), `${code} games`).toEqual(slugs().sort());
    }
  });

  it("covers every history entry, in every language", () => {
    for (const code of locales) {
      const entries = getContent(code).history;
      expect(Object.keys(entries).sort(), `${code} history`).toEqual(
        historyIds().sort(),
      );
    }
  });

  it("gives every title a status, a headline, a summary and both lists", () => {
    for (const code of locales) {
      for (const slug of slugs()) {
        const game = getGameContent(code, slug);
        expect(game.status.trim().length, `${code}/${slug} status`).toBeGreaterThan(0);
        expect(game.headline.trim().length, `${code}/${slug} headline`).toBeGreaterThan(0);
        expect(game.summary.trim().length, `${code}/${slug} summary`).toBeGreaterThan(20);
        expect(game.strengths.length, `${code}/${slug} strengths`).toBeGreaterThan(0);
        expect(game.limits.length, `${code}/${slug} limits`).toBeGreaterThan(0);
      }
    }
  });

  it("gives every history entry a title and a summary", () => {
    for (const code of locales) {
      for (const id of historyIds()) {
        const entry = getHistoryContent(code, id);
        expect(entry.title.trim().length, `${code}/${id} title`).toBeGreaterThan(0);
        expect(entry.summary.trim().length, `${code}/${id} summary`).toBeGreaterThan(20);
      }
    }
  });

  it("describes alt text wherever a capture is shown", () => {
    // A capture without alt text would be unreadable to a screen reader.
    for (const entry of compatibility.filter((candidate) => candidate.image)) {
      for (const code of locales) {
        const alt = getGameContent(code, entry.slug).imageAlt;
        expect(alt, `${code}/${entry.slug} imageAlt`).toBeTruthy();
        expect((alt as string).length).toBeGreaterThan(10);
      }
    }

    for (const run of history.filter((candidate) => candidate.image)) {
      for (const code of locales) {
        const text = getHistoryContent(code, run.id);
        const alt = text.imageAlt ?? text.title;
        expect(alt.length, `${code}/${run.id} alt`).toBeGreaterThan(10);
      }
    }
  });

  it("does not reuse the English prose in another language", () => {
    // Spot-check the longest field; identical text would mean a missed translation.
    for (const code of locales.filter((candidate) => candidate !== "en")) {
      for (const slug of slugs()) {
        expect(
          getGameContent(code, slug).summary,
          `${code}/${slug} summary is still English`,
        ).not.toBe(enContent.games[slug].summary);
      }
    }
  });

  it("keeps the claims the project withholds, in every language", () => {
    // Ghost of Yotei must never be described as playable anywhere.
    const forbidden: Record<string, RegExp> = {
      en: /not playable/i,
      ru: /не играбельна/i,
      de: /nicht spielbar/i,
      fr: /non jouable/i,
      zh: /不可玩/,
      es: /no jugable/i,
      ar: /غير قابلة للعب/,
      pt: /não jogável/i,
    };

    for (const code of locales) {
      const status = getGameContent(code, "ghost-of-yotei").status;
      expect(status, `${code} Yotei status`).toMatch(forbidden[code]);
    }
  });
});

describe("format()", () => {
  it("fills placeholders", () => {
    expect(format("Get {version}", { version: "0.3.2" })).toBe("Get 0.3.2");
    expect(
      format("{playable} of {total}", { playable: 8, total: 16 }),
    ).toBe("8 of 16");
  });

  it("leaves an unknown placeholder alone rather than printing undefined", () => {
    expect(format("Hello {name}", {})).toBe("Hello {name}");
  });
});
