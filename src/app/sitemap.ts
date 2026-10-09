import type { MetadataRoute } from "next";
import { compatibility } from "@/data/compatibility";
import { allHistory, historyFor } from "@/data/history";
import { latestRelease } from "@/data/release";
import { site } from "@/data/site";
import {
  defaultLocale,
  locales,
  localeMeta,
  localePath,
} from "@/i18n/config";

/**
 * One entry per page per language, with hreflang alternates on each so search
 * engines can see the set as one page in eight languages rather than eight
 * competing pages.
 *
 * lastModified comes from the content itself, not from the build clock: a
 * sitemap that claims every page changed on every deploy teaches crawlers to
 * ignore the field.
 */

const latestRun = allHistory()[0];
const newestRun = latestRun?.recordedAt ?? latestRun?.date ?? latestRelease.publishedAt;

type Page = { path: string; lastModified: string; priority: number };

const staticPages: Page[] = [
  { path: "/", lastModified: newestRun, priority: 1 },
  { path: "/compatibility", lastModified: newestRun, priority: 0.9 },
  {
    path: "/download",
    lastModified: latestRelease.publishedAt,
    priority: 0.9,
  },
  { path: "/status", lastModified: newestRun, priority: 0.7 },
  { path: "/media", lastModified: newestRun, priority: 0.6 },
  {
    path: "/extract",
    lastModified: latestRelease.publishedAt,
    priority: 0.5,
  },
];

const gamePages: Page[] = compatibility.map((entry) => {
  const runs = historyFor(entry.slug);
  return {
    path: `/games/${entry.slug}`,
    lastModified: runs[0]?.recordedAt ?? entry.confirmedOn ?? runs[0]?.date ?? newestRun,
    // Titles that were played to the end are the ones people search for.
    priority: entry.tier === "playable" ? 0.8 : 0.6,
  };
});

const pages = [...staticPages, ...gamePages];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: new URL(localePath(locale, page.path), site.url).toString(),
      lastModified: new Date(page.lastModified),
      changeFrequency: page.path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: page.priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((code) => [
              localeMeta[code].htmlLang,
              new URL(localePath(code, page.path), site.url).toString(),
            ]),
          ),
          // Mirrors the HTML head: the unprefixed English URL is the fallback
          // for a crawler with no language preference.
          "x-default": new URL(
            localePath(defaultLocale, page.path),
            site.url,
          ).toString(),
        },
      },
    })),
  );
}
