import { sortedCompatibility } from "@/data/compatibility";
import { historyFor } from "@/data/history";
import { type Locale, localePath } from "@/i18n/config";
import { getGameContent } from "@/i18n";
import type { CompatibilityRow } from "@/components/CompatibilityTable";

/**
 * Joins the locale-independent compatibility facts to the translated prose,
 * producing rows that carry no further translation work.
 */
export function buildRows(locale: Locale): CompatibilityRow[] {
  return sortedCompatibility().map((entry) => {
    const content = getGameContent(locale, entry.slug);

    return {
      slug: entry.slug,
      title: entry.title,
      tier: entry.tier,
      status: content.status,
      headline: content.headline,
      summary: content.summary,
      strengths: content.strengths,
      limits: content.limits,
      performance: content.performance,
      image: entry.image,
      imageAlt: content.imageAlt,
      confirmedOn: entry.confirmedOn,
      href: localePath(locale, `/games/${entry.slug}`),
      runs: historyFor(entry.slug).length,
    };
  });
}
