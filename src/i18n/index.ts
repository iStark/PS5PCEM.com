import { type Locale, defaultLocale, locales } from "./config";
import en, { type Dictionary } from "./dictionaries/en";
import ru from "./dictionaries/ru";
import de from "./dictionaries/de";
import fr from "./dictionaries/fr";
import zh from "./dictionaries/zh";
import es from "./dictionaries/es";
import ar from "./dictionaries/ar";
import pt from "./dictionaries/pt";

import enContent, { type Content } from "./content/en";
import ruContent from "./content/ru";
import deContent from "./content/de";
import frContent from "./content/fr";
import zhContent from "./content/zh";
import esContent from "./content/es";
import arContent from "./content/ar";
import ptContent from "./content/pt";

import enTech, { type TechArticle, type TechCopy } from "./tech/en";
import ruTech from "./tech/ru";
import deTech from "./tech/de";
import frTech from "./tech/fr";
import zhTech from "./tech/zh";
import esTech from "./tech/es";
import arTech from "./tech/ar";
import ptTech from "./tech/pt";

export type { Dictionary, Content, TechArticle, TechCopy };

/**
 * Every locale is imported statically: all pages are prerendered at build time,
 * so there is nothing to gain from dynamic loading and a missing key becomes a
 * type error instead of a blank page.
 */
const dictionaries: Record<Locale, Dictionary> = {
  en,
  ru,
  de,
  fr,
  zh,
  es,
  ar,
  pt,
};

const contents: Record<Locale, Content> = {
  en: enContent,
  ru: ruContent,
  de: deContent,
  fr: frContent,
  zh: zhContent,
  es: esContent,
  ar: arContent,
  pt: ptContent,
};

const techCopies: Record<Locale, TechCopy> = {
  en: enTech,
  ru: ruTech,
  de: deTech,
  fr: frTech,
  zh: zhTech,
  es: esTech,
  ar: arTech,
  pt: ptTech,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function getContent(locale: Locale): Content {
  return contents[locale] ?? contents[defaultLocale];
}

export function getTechCopy(locale: Locale): TechCopy {
  return techCopies[locale] ?? techCopies[defaultLocale];
}

/** One technology article. Unknown slugs return undefined. */
export function getTechArticle(
  locale: Locale,
  slug: string,
): TechArticle | undefined {
  const copy = getTechCopy(locale);
  if (Object.prototype.hasOwnProperty.call(copy, slug)) {
    return copy[slug as keyof TechCopy];
  }
  return undefined;
}

/** Content for one title, falling back to English if a locale lacks the entry. */
export function getGameContent(locale: Locale, slug: string) {
  return getContent(locale).games[slug] ?? contents[defaultLocale].games[slug];
}

/** Text for one history entry, falling back to English if a locale lacks it. */
export function getHistoryContent(locale: Locale, id: string) {
  return getContent(locale).history[id] ?? contents[defaultLocale].history[id];
}

/**
 * Fills {placeholders} in a dictionary string.
 * format("Get {version}", { version: "0.3.2" }) === "Get 0.3.2"
 */
export function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/** Every locale that has its own dictionary and content, for tests and builds. */
export function translatedLocales(): Locale[] {
  return locales.filter(
    (locale) => dictionaries[locale] !== undefined && contents[locale] !== undefined,
  );
}
