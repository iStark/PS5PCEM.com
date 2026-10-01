import { type Locale, localeMeta } from "@/i18n/config";

/** Formatting helpers shared by the download, status and title pages. */

/** Renders a byte count as a short binary size, e.g. "27.9 MB". */
export function formatBytes(bytes: number, locale: Locale = "en"): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return "—";
  }
  const tag = localeMeta[locale].htmlLang;
  if (bytes < 1024) {
    return `${new Intl.NumberFormat(tag).format(bytes)} B`;
  }

  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }

  const digits = value >= 100 ? 0 : 1;
  const formatted = new Intl.NumberFormat(tag, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
  return `${formatted} ${units[unit]}`;
}

/** Renders an ISO date in the visitor's language, always in UTC. */
export function formatDate(iso: string, locale: Locale = "en"): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }
  return new Intl.DateTimeFormat(localeMeta[locale].htmlLang, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** Shortens a SHA-256 digest for display while keeping both ends verifiable. */
export function shortHash(hash: string, visible = 10): string {
  if (hash.length <= visible * 2 + 1) {
    return hash;
  }
  return `${hash.slice(0, visible)}…${hash.slice(-visible)}`;
}
