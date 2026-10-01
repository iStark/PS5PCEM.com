import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

/**
 * Every page lives under a locale prefix, so /compatibility becomes
 * /en/compatibility and /ru/compatibility. Requests without a prefix are
 * redirected to the visitor's best match from Accept-Language, falling back to
 * English, which also keeps the site's earlier unprefixed links alive.
 */
function preferredLocale(header: string | null): string {
  if (!header) {
    return defaultLocale;
  }

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="))
        ?.slice(2);
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((entry) => entry.tag.length > 0 && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    // zh-Hans, zh-CN and plain zh all resolve to our "zh" dictionary.
    const base = tag.split("-")[0];
    const match = locales.find((locale) => locale === tag || locale === base);
    if (match) {
      return match;
    }
  }

  return defaultLocale;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (isLocale(first)) {
    return NextResponse.next();
  }

  const locale = preferredLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except static assets and the metadata routes, which are served
  // from the site root and must not be prefixed.
  matcher: [
    "/((?!_next/|images/|favicon|robots\\.txt|sitemap\\.xml|ps5pcem-icon).*)",
  ],
};
