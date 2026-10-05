import { describe, expect, it } from "vitest";
import { buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  compatibilityListSchema,
  gameReportSchema,
  softwareSchema,
  webPageSchema,
  websiteSchema,
} from "@/lib/schema";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import proxy from "@/proxy";
import { compatibility, countByTier } from "@/data/compatibility";
import { latestRelease } from "@/data/release";
import { site } from "@/data/site";
import { locales, localeMeta } from "@/i18n/config";
import { format, getDictionary } from "@/i18n";

/**
 * The site lost its search rankings once already, when English moved from the
 * root to /en and every indexed URL became a redirect. These tests pin the
 * recovery: the original URLs resolve, /en only ever redirects, and no page
 * ships without a canonical, its hreflang set, or indexable robots directives.
 */

/** Minimal NextRequest stand-in: proxy() only touches nextUrl and headers. */
function request(pathname: string) {
  const url = new URL(pathname, "https://ps5pcem.com");
  return {
    nextUrl: Object.assign(url, { clone: () => new URL(url.toString()) }),
    headers: new Headers(),
     
  } as any;
}

describe("URL shape", () => {
  const originallyIndexed = [
    "/",
    "/compatibility",
    "/download",
    "/status",
    "/media",
    "/extract",
  ];

  it("serves every originally indexed URL without a redirect", () => {
    for (const path of originallyIndexed) {
      const response = proxy(request(path));
      // A rewrite keeps the address; only a redirect sets a Location header.
      expect(response.headers.get("location"), path).toBeNull();
      expect(response.status, path).toBe(200);
    }
  });

  it("rewrites an unprefixed path to the English route internally", () => {
    const response = proxy(request("/compatibility"));
    expect(response.headers.get("x-middleware-rewrite")).toContain(
      "/en/compatibility",
    );
  });

  it("redirects /en permanently onto the unprefixed URL", () => {
    for (const [from, to] of [
      ["/en", "/"],
      ["/en/compatibility", "/compatibility"],
      ["/en/games/cat-quest-iii", "/games/cat-quest-iii"],
    ]) {
      const response = proxy(request(from));
      // 301, not 307: a temporary redirect does not pass ranking signals on.
      expect(response.status, from).toBe(301);
      expect(new URL(response.headers.get("location")!).pathname, from).toBe(to);
    }
  });

  it("leaves the other languages alone", () => {
    for (const path of ["/ru/compatibility", "/ar", "/zh/download"]) {
      const response = proxy(request(path));
      expect(response.headers.get("location"), path).toBeNull();
      expect(response.headers.get("x-middleware-rewrite"), path).toBeNull();
    }
  });

  it("does not redirect on Accept-Language", () => {
    // Sending a crawler, or someone following a shared link, to a different
    // URL than the one requested is what broke indexing before.
    const req = request("/compatibility");
    req.headers.set("accept-language", "ru-RU,ru;q=0.9");
    const response = proxy(req);
    expect(response.headers.get("location")).toBeNull();
  });
});

describe("page metadata", () => {
  const pages = [
    { path: "/", key: "home" },
    { path: "/compatibility", key: "compatibility" },
    { path: "/download", key: "download" },
    { path: "/status", key: "status" },
    { path: "/media", key: "media" },
    { path: "/extract", key: "extract" },
  ] as const;

  it("gives every page in every language a canonical and a full hreflang set", () => {
    for (const locale of locales) {
      for (const page of pages) {
        const t = getDictionary(locale);
        const meta = buildMetadata({
          locale,
          path: page.path,
          title: t.seo[page.key].title,
          description: t.seo[page.key].description,
        });

        const canonical = meta.alternates?.canonical as string;
        expect(canonical, `${locale}${page.path} canonical`).toBeTruthy();
        expect(canonical.startsWith("/"), canonical).toBe(true);
        expect(canonical.startsWith("/en"), canonical).toBe(false);

        const languages = meta.alternates?.languages as Record<string, string>;
        expect(Object.keys(languages)).toHaveLength(locales.length + 1);
        expect(languages["x-default"]).toBeTruthy();
        for (const code of locales) {
          expect(
            languages[localeMeta[code].htmlLang],
            `${locale}${page.path} → ${code}`,
          ).toBeTruthy();
        }
      }
    }
  });

  it("marks every page indexable, with large image previews allowed", () => {
    const meta = buildMetadata({
      locale: "en",
      path: "/",
      title: "t",
      description: "d",
    });
    const robotsMeta = meta.robots as Record<string, unknown>;
    expect(robotsMeta.index).toBe(true);
    expect(robotsMeta.follow).toBe(true);
    expect(
      (robotsMeta.googleBot as Record<string, unknown>)["max-image-preview"],
    ).toBe("large");
  });

  it("sets an absolute title so the brand is never doubled", () => {
    const meta = buildMetadata({
      locale: "en",
      path: "/",
      title: "PS5PCEM — emulator",
      description: "d",
    });
    expect(meta.title).toEqual({ absolute: "PS5PCEM — emulator" });
  });

  it("gives every page a social image with real dimensions", () => {
    const meta = buildMetadata({
      locale: "en",
      path: "/compatibility",
      title: "t",
      description: "d",
    });
     
    const images = (meta.openGraph as any).images;
    expect(images[0].url).toMatch(/^https:\/\/ps5pcem\.com\/images\//);
    expect(images[0].width).toBe(1920);
    expect(images[0].height).toBe(1080);
    expect(images[0].alt.length).toBeGreaterThan(0);
  });

  it("keeps titles and descriptions unique per page, in every language", () => {
    for (const locale of locales) {
      const t = getDictionary(locale);
      const titles = pages.map((page) =>
        format(t.seo[page.key].title, { version: latestRelease.version }),
      );
      const descriptions = pages.map((page) =>
        format(t.seo[page.key].description, {
          version: latestRelease.version,
          total: compatibility.length,
          playable: countByTier().playable,
        }),
      );

      expect(new Set(titles).size, `${locale} titles`).toBe(titles.length);
      expect(
        new Set(descriptions).size,
        `${locale} descriptions`,
      ).toBe(descriptions.length);
    }
  });

  it("keeps descriptions long enough to be useful and short enough to show", () => {
    for (const locale of locales) {
      const t = getDictionary(locale);
      for (const page of pages) {
        const text = format(t.seo[page.key].description, {
          version: latestRelease.version,
          total: compatibility.length,
          playable: countByTier().playable,
        });
        // Chinese carries far more meaning per character, so the floor is
        // lower there; the ceiling is what a result snippet can show.
        const floor = locale === "zh" ? 40 : 60;
        expect(text.length, `${locale}.${page.key}`).toBeGreaterThan(floor);
        expect(text.length, `${locale}.${page.key}`).toBeLessThan(230);
      }
    }
  });

  it("names the product in every page title", () => {
    for (const locale of locales) {
      const t = getDictionary(locale);
      for (const page of pages) {
        expect(t.seo[page.key].title, `${locale}.${page.key}`).toContain(
          "PS5PCEM",
        );
      }
    }
  });
});

describe("structured data", () => {
  it("describes the site and the application", () => {
    const website = websiteSchema("en") as Record<string, unknown>;
    expect(website["@type"]).toBe("WebSite");
    expect(website.url).toBe("https://ps5pcem.com/");

    const software = softwareSchema("en") as Record<string, unknown>;
    expect(software["@type"]).toBe("SoftwareApplication");
    expect(software.softwareVersion).toBe(latestRelease.version);
    expect(String(software.operatingSystem)).toMatch(/Windows/);
    expect(String(software.downloadUrl)).toContain("github.com/iStark/PS5PCEM");
    expect(String(software.license)).toContain("gpl-3.0");
  });

  it("claims no rating, because the project has no review data", () => {
    const software = softwareSchema("en") as Record<string, unknown>;
    expect(software.aggregateRating).toBeUndefined();
    expect(software.review).toBeUndefined();
  });

  it("lists every title on the compatibility page", () => {
     
    const list = compatibilityListSchema("en") as any;
    expect(list["@type"]).toBe("ItemList");
    expect(list.numberOfItems).toBe(compatibility.length);
    expect(list.itemListElement).toHaveLength(compatibility.length);
    for (const item of list.itemListElement) {
      expect(item.url).toMatch(/^https:\/\/ps5pcem\.com\/games\//);
    }
  });

  it("builds a breadcrumb with absolute, locale-correct URLs", () => {
    const crumbs = breadcrumbSchema("ru", [
      { name: "Главная", path: "/" },
      { name: "Совместимость", path: "/compatibility" },
    ]) as any;

    expect(crumbs.itemListElement[0].item).toBe("https://ps5pcem.com/ru");
    expect(crumbs.itemListElement[1].item).toBe(
      "https://ps5pcem.com/ru/compatibility",
    );
    expect(crumbs.itemListElement[1].position).toBe(2);
  });

  it("describes every title page as an article about that game", () => {
    for (const entry of compatibility) {
       
      const report = gameReportSchema("en", entry.slug) as any;
      expect(report, entry.slug).not.toBeNull();
      expect(report["@type"]).toBe("TechArticle");
      expect(report.about.name).toBe(entry.title);
      expect(report.about.gamePlatform).toBe("PlayStation 5");
      expect(report.url).toBe(
        `https://ps5pcem.com/games/${entry.slug}`,
      );
      expect(report.dateModified, entry.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(report.inLanguage).toBe("en");
    }
  });

  it("returns nothing for a title that is not on record", () => {
    expect(gameReportSchema("en", "bloodborne")).toBeNull();
  });

  it("localizes schema language and URLs", () => {
     
    const report = gameReportSchema("zh", "cat-quest-iii") as any;
    expect(report.inLanguage).toBe("zh-Hans");
    expect(report.url).toBe("https://ps5pcem.com/zh/games/cat-quest-iii");

    const page = webPageSchema("ar", {
      path: "/status",
      name: "n",
      description: "d",
       
    }) as any;
    expect(page.inLanguage).toBe("ar");
    expect(page.url).toBe("https://ps5pcem.com/ar/status");
  });

  it("serializes to valid JSON with no undefined leaking in", () => {
    const schemas = [
      websiteSchema("en"),
      softwareSchema("en"),
      compatibilityListSchema("en"),
      gameReportSchema("en", "pistol-whip"),
    ];
    for (const schema of schemas) {
      const json = JSON.stringify(schema);
      expect(() => JSON.parse(json)).not.toThrow();
      expect(json).not.toContain("undefined");
      expect(json).not.toContain("null");
    }
  });
});

describe("sitemap", () => {
  const entries = sitemap();
  const pagesPerLocale = 6 + compatibility.length;

  it("covers every page in every language", () => {
    expect(entries).toHaveLength(pagesPerLocale * locales.length);
  });

  it("uses the unprefixed URL for English and never an /en path", () => {
    const urls = entries.map((entry) => entry.url);
    expect(urls).toContain("https://ps5pcem.com/");
    expect(urls).toContain("https://ps5pcem.com/compatibility");
    for (const url of urls) {
      expect(url.startsWith("https://ps5pcem.com/en/"), url).toBe(false);
      expect(url, url).not.toBe("https://ps5pcem.com/en");
    }
  });

  it("gives every entry hreflang alternates including x-default", () => {
    for (const entry of entries) {
      const languages = entry.alternates?.languages as Record<string, string>;
      expect(languages, entry.url).toBeTruthy();
      expect(Object.keys(languages), entry.url).toHaveLength(
        locales.length + 1,
      );
      expect(languages["x-default"], entry.url).toBeTruthy();
    }
  });

  it("dates entries from the content, not from the build clock", () => {
    // Everything predates or matches the newest recorded run; a sitemap that
    // stamps "now" on every page trains crawlers to ignore lastmod.
    const now = Date.now();
    for (const entry of entries) {
      const stamp = new Date(entry.lastModified as Date).getTime();
      expect(Number.isNaN(stamp), entry.url).toBe(false);
      expect(stamp, entry.url).toBeLessThanOrEqual(now);
    }
  });

  it("ranks the home and compatibility pages highest", () => {
    const home = entries.find(
      (entry) => entry.url === "https://ps5pcem.com/",
    );
    const compat = entries.find(
      (entry) => entry.url === "https://ps5pcem.com/compatibility",
    );
    expect(home?.priority).toBe(1);
    expect(compat?.priority).toBe(0.9);
  });
});

describe("robots.txt", () => {
  const rules = robots();

  it("allows crawling and points at the sitemap", () => {
    const rule = Array.isArray(rules.rules) ? rules.rules[0] : rules.rules;
    expect(rule.allow).toBe("/");
    expect(rules.sitemap).toBe(`${site.url}/sitemap.xml`);
  });

  it("blocks only the build output", () => {
    const rule = Array.isArray(rules.rules) ? rules.rules[0] : rules.rules;
    expect(rule.disallow).toEqual(["/_next/"]);
  });
});
