/**
 * The site speaks the same twelve languages as the emulator's own launcher.
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
  "tr",
  "ja",
  "hi",
  "ko",
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
  tr: {
    code: "tr",
    nativeName: "Türkçe",
    englishName: "Turkish",
    htmlLang: "tr",
    dir: "ltr",
  },
  ja: {
    code: "ja",
    nativeName: "日本語",
    englishName: "Japanese",
    htmlLang: "ja",
    dir: "ltr",
  },
  hi: {
    code: "hi",
    nativeName: "हिन्दी",
    englishName: "Hindi",
    htmlLang: "hi",
    dir: "ltr",
  },
  ko: {
    code: "ko",
    nativeName: "한국어",
    englishName: "Korean",
    htmlLang: "ko",
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

/**
 * Wraps left-to-right text such as "0.3.0-alpha.1" in Unicode isolates on a
 * right-to-left page; otherwise the bidi algorithm moves "alpha.1" in front
 * of "0.3.0". Left-to-right pages get the text back unchanged.
 */
const LEFT_TO_RIGHT_ISOLATE = String.fromCharCode(0x2066);
const POP_DIRECTIONAL_ISOLATE = String.fromCharCode(0x2069);

export function isolateLtr(locale: Locale, text: string): string {
  return dirOf(locale) === "rtl"
    ? `${LEFT_TO_RIGHT_ISOLATE}${text}${POP_DIRECTIONAL_ISOLATE}`
    : text;
}

export function isDefaultLocale(locale: Locale): boolean {
  return locale === defaultLocale;
}

/**
 * Builds the canonical path for a page in one language.
 *
 * English, the default, lives at the site root with no prefix: "/compatibility",
 * not "/en/compatibility". Every other language is prefixed:
 * localePath("ru", "/compatibility") === "/ru/compatibility".
 *
 * Keeping English unprefixed matters for search: those were the URLs the site
 * was originally indexed under, and a prefix would have made every one of them
 * a redirect. /en/* still resolves, but only as a permanent redirect here.
 */
export function localePath(locale: Locale, path = "/"): string {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (isDefaultLocale(locale)) {
    return normalized === "" ? "/" : normalized;
  }
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
