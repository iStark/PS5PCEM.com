import type { Metadata } from "next";
import { site } from "@/data/site";
import {
  alternateLanguages,
  type Locale,
  localeMeta,
  localePath,
} from "@/i18n/config";

/**
 * One place that builds page metadata, so no page can quietly ship without a
 * canonical URL, its hreflang set, or an Open Graph image.
 *
 * `path` is the locale-independent route ("/compatibility"); the canonical and
 * the alternates are derived from it, which keeps English unprefixed and every
 * other language prefixed without each page repeating the rule.
 */
export type SeoInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  /** Overrides the default social image. Must live under /public. */
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  /** Set for pages that are articles rather than plain pages. */
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

const DEFAULT_IMAGE = "/images/cat-quest-iii-world.png";

export function buildMetadata({
  locale,
  path,
  title,
  description,
  image = DEFAULT_IMAGE,
  imageAlt,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
}: SeoInput): Metadata {
  const canonical = localePath(locale, path);
  const imageUrl = new URL(image, site.url).toString();

  return {
    // Absolute, so each page owns its full <title> and the layout's
    // "%s · PS5PCEM" template cannot append the brand a second time.
    title: { absolute: title },
    description,
    keywords: keywords?.length ? keywords : undefined,
    alternates: {
      canonical,
      languages: alternateLanguages(path),
    },
    // Explicit, so a stray default can never leave a page out of the index,
    // and so Google is allowed to show the large image previews these pages
    // are built around.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type,
      siteName: site.name,
      locale: localeMeta[locale].htmlLang,
      title,
      description,
      url: canonical,
      images: [
        {
          url: imageUrl,
          width: 1920,
          height: 1080,
          alt: imageAlt ?? title,
        },
      ],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: imageUrl, alt: imageAlt ?? title }],
    },
  };
}
