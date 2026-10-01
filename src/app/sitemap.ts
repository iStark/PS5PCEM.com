import type { MetadataRoute } from "next";
import { compatibility } from "@/data/compatibility";
import { site } from "@/data/site";
import { locales, localeMeta, localePath } from "@/i18n/config";

const pages = [
  "/",
  "/download",
  "/compatibility",
  "/status",
  "/media",
  "/extract",
  ...compatibility.map((entry) => `/games/${entry.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: new URL(localePath(locale, page), site.url).toString(),
      lastModified,
      changeFrequency: page === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: page === "/" ? 1 : page === "/compatibility" ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((code) => [
            localeMeta[code].htmlLang,
            new URL(localePath(code, page), site.url).toString(),
          ]),
        ),
      },
    })),
  );
}
