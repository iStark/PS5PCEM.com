import type { Metadata } from "next";
import "../globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/data/site";
import {
  alternateLanguages,
  type Locale,
  locales,
  localeMeta,
  localePath,
  toLocale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${t.meta.tagline}`,
      template: `%s · ${site.name}`,
    },
    description: t.meta.description,
    applicationName: site.name,
    authors: [{ name: site.author }],
    alternates: {
      canonical: localePath(locale),
      languages: alternateLanguages(),
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: localeMeta[locale].htmlLang,
      title: `${site.name} — ${t.meta.tagline}`,
      description: t.meta.description,
      url: localePath(locale),
      images: [
        { url: "/images/cat-quest-iii-world.png", width: 1920, height: 1080 },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${t.meta.tagline}`,
      description: t.meta.description,
      images: ["/images/cat-quest-iii-world.png"],
    },
    icons: {
      icon: "/ps5pcem-icon-256.png",
      apple: "/ps5pcem-icon-256.png",
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const locale: Locale = toLocale((await params).locale);
  const meta = localeMeta[locale];
  const t = getDictionary(locale);

  return (
    <html lang={meta.htmlLang} dir={meta.dir}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-950"
        >
          {t.common.skipToContent}
        </a>
        <SiteHeader locale={locale} />
        <main id="main">{children}</main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
