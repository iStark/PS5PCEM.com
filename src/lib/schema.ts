import { compatibility, compatibilityMeta } from "@/data/compatibility";
import { historyFor } from "@/data/history";
import { latestRelease } from "@/data/release";
import { site } from "@/data/site";
import { type Locale, localeMeta, localePath } from "@/i18n/config";
import { getDictionary, getGameContent } from "@/i18n";

/**
 * JSON-LD builders. Every value here is already stated in the visible page —
 * structured data describes the page, it never adds claims the reader cannot
 * see, which is both the honest approach and what search engines require.
 */

function absolute(path: string): string {
  return new URL(path, site.url).toString();
}

const publisher = {
  "@type": "Person",
  name: site.author,
  url: site.links.github,
};

/** Identifies the site itself. Emitted once, on the home page. */
export function websiteSchema(locale: Locale) {
  const t = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    alternateName: "PS5PCEM emulator",
    url: absolute(localePath(locale)),
    description: t.meta.description,
    inLanguage: localeMeta[locale].htmlLang,
    publisher,
    author: publisher,
  };
}

/**
 * The emulator as a downloadable application. This is the entity people search
 * for, so it carries the version, platform, licence and real download URL.
 */
export function softwareSchema(locale: Locale) {
  const t = getDictionary(locale);
  const primary =
    latestRelease.assets.find((asset) => asset.primary) ?? latestRelease.assets[0];

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${site.url}/#software`,
    name: site.name,
    description: t.meta.description,
    url: absolute(localePath(locale)),
    applicationCategory: "GameApplication",
    applicationSubCategory: "Emulator",
    operatingSystem: "Windows 10 2004 or newer, x86-64-v3",
    processorRequirements: "x86-64-v3 (AVX2, BMI2, FMA)",
    memoryRequirements: "Vulkan 1.2 capable GPU",
    softwareVersion: latestRelease.version,
    datePublished: latestRelease.publishedAt,
    downloadUrl: primary.url,
    fileSize: `${Math.round(primary.size / 1024)}KB`,
    installUrl: absolute(localePath(locale, "/download")),
    softwareHelp: {
      "@type": "CreativeWork",
      url: site.links.docs,
    },
    license: "https://www.gnu.org/licenses/gpl-3.0.html",
    isAccessibleForFree: true,
    inLanguage: localeMeta[locale].htmlLang,
    author: publisher,
    maintainer: publisher,
    codeRepository: site.links.github,
    programmingLanguage: "Zig",
    // No aggregateRating: the project has no review data, and inventing one
    // would be both dishonest and a structured-data violation.
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: absolute(localePath(locale, "/download")),
    },
  };
}

/** The compatibility list, as an ordered list of links search engines can follow. */
export function compatibilityListSchema(locale: Locale) {
  const t = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.compatibility.heading,
    description: t.compatibility.lead.replace(
      "{source}",
      t.compatibility.sourceLabel,
    ),
    numberOfItems: compatibility.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: compatibility.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.title,
      url: absolute(localePath(locale, `/games/${entry.slug}`)),
    })),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(locale: Locale, crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(localePath(locale, crumb.path)),
    })),
  };
}

/**
 * One title's compatibility report. It is a technical article about a game, not
 * the game itself, so the page is the article and the game is its subject.
 */
export function gameReportSchema(locale: Locale, slug: string) {
  const entry = compatibility.find((candidate) => candidate.slug === slug);
  if (!entry) {
    return null;
  }

  const t = getDictionary(locale);
  const content = getGameContent(locale, slug);
  const runs = historyFor(slug);
  const url = absolute(localePath(locale, `/games/${slug}`));

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#report`,
    headline: `${entry.title} — ${content.status}`,
    description: content.headline,
    url,
    inLanguage: localeMeta[locale].htmlLang,
    datePublished: runs.at(-1)?.date ?? latestRelease.publishedAt,
    dateModified: entry.confirmedOn ?? runs[0]?.date ?? latestRelease.publishedAt,
    author: publisher,
    publisher,
    image: entry.image ? absolute(entry.image) : undefined,
    about: {
      "@type": "VideoGame",
      name: entry.title,
      gamePlatform: "PlayStation 5",
    },
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    proficiencyLevel: "Expert",
    keywords: [
      entry.title,
      `${entry.title} PS5PCEM`,
      t.tiers[entry.tier].label,
      compatibilityMeta.host,
    ].join(", "),
  };
}

/** A plain page, used where no richer type applies. */
export function webPageSchema(
  locale: Locale,
  { path, name, description }: { path: string; name: string; description: string },
) {
  const url = absolute(localePath(locale, path));
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name,
    description,
    inLanguage: localeMeta[locale].htmlLang,
    isPartOf: { "@id": `${site.url}/#website` },
  };
}
