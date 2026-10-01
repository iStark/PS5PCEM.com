/**
 * The site speaks the same eight languages as the emulator's own launcher.
 * The order and the native labels follow `Language` and `language_labels` in
 * src/launcher.zig, so a visitor sees the site in the language they already
 * picked in the application.
 */

export const locales = [
  "en",
  "ru",
  "de",
  "fr",
  "zh",
  "es",
  "ar",
  "pt",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export type LocaleMeta = {
  code: Locale;
  /** The language's own name, as the launcher spells it. */
  nativeName: string;
  /** English name, used in aria labels and tests. */
  englishName: string;
  /** BCP 47 tag for the html lang attribute and hreflang alternates. */
  htmlLang: string;
  dir: "ltr" | "rtl";
};

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: {
    code: "en",
    nativeName: "English",
    englishName: "English",
    htmlLang: "en",
    dir: "ltr",
  },
  ru: {
    code: "ru",
    nativeName: "Русский",
    englishName: "Russian",
    htmlLang: "ru",
    dir: "ltr",
  },
  de: {
    code: "de",
    nativeName: "Deutsch",
    englishName: "German",
    htmlLang: "de",
    dir: "ltr",
  },
  fr: {
    code: "fr",
    nativeName: "Français",
    englishName: "French",
    htmlLang: "fr",
    dir: "ltr",
  },
  zh: {
    code: "zh",
    nativeName: "简体中文",
    englishName: "Simplified Chinese",
    htmlLang: "zh-Hans",
    dir: "ltr",
  },
  es: {
    code: "es",
    nativeName: "Español",
    englishName: "Spanish",
    htmlLang: "es",
    dir: "ltr",
  },
  ar: {
    code: "ar",
    nativeName: "العربية",
    englishName: "Arabic",
    htmlLang: "ar",
    dir: "rtl",
  },
  pt: {
    code: "pt",
    nativeName: "Português",
    englishName: "Portuguese",
    htmlLang: "pt",
    dir: "ltr",
  },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Narrows an unknown route segment to a locale, falling back to English. */
export function toLocale(value: string | undefined): Locale {
  return value && isLocale(value) ? value : defaultLocale;
}

export function dirOf(locale: Locale): "ltr" | "rtl" {
  return localeMeta[locale].dir;
}

/** Builds a locale-prefixed path: localePath("ru", "/compatibility"). */
export function localePath(locale: Locale, path = "/"): string {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

/** The locale-independent part of a prefixed path, for language switching. */
export function stripLocale(pathname: string): string {
  const match = /^\/([^/]+)(\/.*)?$/.exec(pathname);
  if (!match || !isLocale(match[1])) {
    return pathname === "/" ? "/" : pathname;
  }
  return match[2] ?? "/";
}

/**
 * hreflang alternates for one page, in every language, plus the x-default that
 * crawlers use when they have no language preference. Keys are full BCP 47
 * tags so zh resolves as zh-Hans rather than bare zh.
 */
export function alternateLanguages(path = "/"): Record<string, string> {
  return {
    "x-default": localePath(defaultLocale, path),
    ...Object.fromEntries(
      locales.map((code) => [localeMeta[code].htmlLang, localePath(code, path)]),
    ),
  };
}
