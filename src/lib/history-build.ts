import type { HistoryEntry } from "@/data/history";
import { format, getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

/** Keep release attribution identical in title metadata, timelines and captures. */
export function formatHistoryBuild(run: HistoryEntry, locale: Locale): string {
  const t = getDictionary(locale);
  return run.release === null
    ? t.common.developmentBuild
    : format(t.common.release, { version: run.release.replace(/^v/, "") });
}
