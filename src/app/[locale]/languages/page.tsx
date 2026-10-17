import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  launcherImages,
  launcherLanguages,
  releasedLauncherLanguages,
} from "@/data/launcher";
import { latestRelease } from "@/data/release";
import { site } from "@/data/site";
import {
  defaultLocale,
  isolateLtr,
  type Locale,
  localeMeta,
  locales,
  localePath,
  toLocale,
} from "@/i18n/config";
import { format, getDictionary } from "@/i18n";
import { ButtonLink, Notice, SectionHeading } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = getDictionary(locale);

  return buildMetadata({
    locale,
    path: "/languages",
    title: t.seo.languages.title,
    description: t.seo.languages.description,
    image: launcherImages.settings.src,
    imageAlt: t.home.launcherImageAlt,
    keywords: [
      "PS5PCEM languages",
      "PS5 emulator Turkish",
      "PS5 emulator Japanese",
      "PS5 emulator Hindi",
      "PS5 emulator Korean",
    ],
  });
}

/** A language's name in the reader's language, e.g. "Japanese" or "japonés". */
function displayName(reader: Locale, language: Locale): string {
  try {
    const names = new Intl.DisplayNames([localeMeta[reader].htmlLang], {
      type: "language",
    });
    return names.of(localeMeta[language].htmlLang) ?? localeMeta[language].englishName;
  } catch {
    return localeMeta[language].englishName;
  }
}

export default async function LanguagesPage({ params }: PageProps) {
  const locale = toLocale((await params).locale);
  const t = getDictionary(locale);
  const l = t.languages;
  const prefixes = locales
    .filter((code) => code !== defaultLocale)
    .map((code) => `/${code}`)
    .join(", ");

  const details = [
    { title: l.rtlTitle, body: l.rtlBody },
    { title: l.fontsTitle, body: l.fontsBody },
    { title: l.gamesTitle, body: l.gamesBody },
    { title: l.scopeTitle, body: l.scopeBody },
  ];

  return (
    <div className="container-page py-16">
      <JsonLd
        data={[
          webPageSchema(locale, {
            path: "/languages",
            name: t.seo.languages.title,
            description: t.seo.languages.description,
          }),
          breadcrumbSchema(locale, [
            { name: t.nav.home, path: "/" },
            { name: t.nav.languages, path: "/languages" },
          ]),
        ]}
      />

      <header className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
            {l.eyebrow} · {launcherLanguages.length}
          </p>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl">
            {l.heading}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-300">
            {format(l.lead, {
              released: releasedLauncherLanguages.length,
              version: latestRelease.version,
            })}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={localePath(locale, "/launcher")}>
              {l.launcherCta}
            </ButtonLink>
            <ButtonLink href={site.links.issues} external variant="secondary">
              {l.reportCta}
            </ButtonLink>
          </div>
        </div>
        <figure>
          <div className="overflow-hidden rounded-2xl border border-ink-700 shadow-2xl shadow-black/50">
            <Image
              src={launcherImages.languages.src}
              alt={l.imageAlt}
              width={launcherImages.languages.width}
              height={launcherImages.languages.height}
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="w-full"
            />
          </div>
          <figcaption className="mt-3 text-xs leading-relaxed text-ink-400">
            {format(l.imageCaption, { version: latestRelease.version })}
          </figcaption>
        </figure>
      </header>

      <section className="mt-20">
        <SectionHeading title={l.tableHeading} description={l.tableLead} />
        <div className="surface mt-8 overflow-x-auto">
          <table className="w-full min-w-[46rem] text-sm">
            <thead>
              <tr className="border-b border-ink-700 text-xs uppercase tracking-wider text-ink-400">
                <th scope="col" className="px-5 py-3 text-start font-medium">
                  {l.colLanguage}
                </th>
                <th scope="col" className="px-5 py-3 text-start font-medium">
                  {format(l.colName, { language: localeMeta[locale].nativeName })}
                </th>
                <th scope="col" className="px-5 py-3 text-start font-medium">
                  {l.colId}
                </th>
                <th scope="col" className="px-5 py-3 text-start font-medium">
                  {l.colSince}
                </th>
                <th scope="col" className="px-5 py-3 text-start font-medium">
                  {l.colDirection}
                </th>
                <th scope="col" className="px-5 py-3 text-start font-medium">
                  {l.colSite}
                </th>
              </tr>
            </thead>
            <tbody>
              {launcherLanguages.map((language) => {
                const meta = localeMeta[language.locale];
                return (
                  <tr
                    key={language.locale}
                    className="border-b border-ink-800 last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="px-5 py-3 text-start text-base font-medium text-ink-100"
                    >
                      {/* The name keeps its own script and direction, but the
                          cell stays aligned with the rest of the column. */}
                      <span lang={meta.htmlLang} dir={meta.dir}>
                        {meta.nativeName}
                      </span>
                    </th>
                    <td className="px-5 py-3 text-ink-300">
                      {displayName(locale, language.locale)}
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-ink-300">
                      {language.launcherId}
                    </td>
                    <td className="px-5 py-3 text-ink-300">
                      {language.since
                        ? format(t.common.release, {
                            version: isolateLtr(locale, language.since),
                          })
                        : t.common.developmentBuild}
                    </td>
                    <td className="px-5 py-3 text-ink-300">
                      {meta.dir === "rtl" ? l.rtl : l.ltr}
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        href={localePath(language.locale, "/languages")}
                        hrefLang={meta.htmlLang}
                        className="font-mono text-xs text-accent-400 underline underline-offset-2"
                        dir="ltr"
                      >
                        {localePath(language.locale)}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading eyebrow={l.switchEyebrow} title={l.switchHeading} />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="surface p-6">
            <h3 className="text-base font-semibold text-ink-100">
              {l.launcherTitle}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-300">
              {l.launcherBody}
            </p>
          </div>
          <div className="surface p-6">
            <h3 className="text-base font-semibold text-ink-100">{l.siteTitle}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-300">
              {format(l.siteBody, { prefixes })}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading eyebrow={l.detailsEyebrow} title={l.detailsHeading} />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {details.map((item) => (
            <div key={item.title} className="surface p-6">
              <h3 className="text-base font-semibold text-ink-100">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-300">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 max-w-3xl">
        <Notice tone="info" title={l.reportTitle}>
          {l.reportBody}{" "}
          <a
            href={site.links.issues}
            className="underline underline-offset-2 hover:text-accent-400"
            rel="noreferrer noopener"
            target="_blank"
          >
            {l.reportCta}
          </a>
        </Notice>
      </section>
    </div>
  );
}
