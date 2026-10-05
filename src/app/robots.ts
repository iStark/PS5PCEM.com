import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * Everything is crawlable. The one exclusion is Next's build output, which
 * holds no content and only wastes crawl budget.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/"],
      },
    ],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
    host: site.url,
  };
}
