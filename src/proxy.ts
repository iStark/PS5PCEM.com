import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

/**
 * URL shape, and why it is this shape.
 *
 * English is served from the site root with no prefix — "/compatibility" —
 * because those are the URLs the site was first indexed under. Every other
 * language is prefixed: "/ru/compatibility".
 *
 * The pages themselves are prerendered under /[locale], so an unprefixed
 * request is *rewritten* to the English route internally. The visitor and the
 * crawler both see 200 at "/compatibility"; nothing redirects.
 *
 * "/en/..." is the one redirect: a permanent 301 to the unprefixed path, so the
 * prefixed and unprefixed forms never compete as duplicates.
 *
 * There is deliberately no Accept-Language redirect. Sending a crawler, or a
 * visitor who followed a shared link, to a different URL than the one they
 * asked for costs the destination its ranking signals and hides content behind
 * a redirect that search engines treat as temporary. Language is chosen with
 * the switcher in the header instead.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/");
  const first = segments[1] ?? "";

  // /en and /en/... collapse onto the canonical unprefixed URL, permanently.
  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    const rest = `/${segments.slice(2).join("/")}`;
    url.pathname = rest === "/" ? "/" : rest.replace(/\/$/, "");
    return NextResponse.redirect(url, 301);
  }

  // /ru/..., /de/... and the rest are already canonical.
  if (isLocale(first)) {
    return NextResponse.next();
  }

  // Anything else is English: serve the prerendered page without changing the
  // address bar, so the URL stays the one that is indexed.
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Static assets and the metadata routes are served from the root untouched.
  matcher: [
    "/((?!_next/|images/|favicon|robots\\.txt|sitemap\\.xml|ps5pcem-icon).*)",
  ],
};
