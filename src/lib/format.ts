/** Formatting helpers shared by the download and status pages. */

/** Renders a byte count as a short binary size, e.g. "19.3 MB". */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return "—";
  }
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 100 ? 0 : 1)} ${units[unit]}`;
}

/** Renders an ISO timestamp as "September 15, 2026" in UTC. */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }
  return new Intl.DateTimeFormat("en-US", {
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
