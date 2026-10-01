import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { findBySlug } from "@/data/compatibility";
import { allHistory } from "@/data/history";
import { site } from "@/data/site";
import {
  alternateLanguages,
  locales,
  localePath,
  toLocale,
} from "@/i18n/config";
import { format, getDictionary, getHistoryContent } from "@/i18n";
import { formatDate } from "@/lib/format";
import { buildRows } from "@/lib/rows";
import { ButtonLink, SectionHeading, TierBadge } from "@/components/ui";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = getDictionary(locale);
  return {
    title: t.media.heading,
    description: t.media.lead,
    alternates: {
      canonical: localePath(locale, "/media"),
      languages: alternateLanguages("/media"),
    },
  };
}

export default async function MediaPage({ params }: PageProps) {
  const locale = toLocale((await params).locale);
  const t = getDictionary(locale);
  const rows = buildRows(locale);

  // Every capture the project has published, newest run first.
  const captures = allHistory().filter((run) => run.image);
  const [hero, ...rest] = captures;
  const heroText = getHistoryContent(locale, hero.id);
  const heroEntry = findBySlug(hero.slug);

  return (
    <div className="container-page py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
          {t.media.eyebrow}
        </p>
        <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl">
          {t.media.heading}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-300">
          {t.media.lead}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={site.links.youtube} external>
            {t.media.youtubeCta}
          </ButtonLink>
          <ButtonLink
            href={localePath(locale, "/compatibility")}
            variant="secondary"
          >
            {t.media.compatibilityCta}
          </ButtonLink>
        </div>
      </header>

      <section className="mt-14">
        <figure className="surface overflow-hidden">
          <Image
            src={hero.image!}
            alt={heroText?.imageAlt ?? heroText?.title ?? ""}
            width={1920}
            height={1080}
            priority
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="w-full border-b border-ink-700 object-cover"
          />
          <figcaption className="p-6">
            <p className="text-xs text-ink-400">
              {formatDate(hero.date, locale)}
              {heroEntry ? ` · ${heroEntry.title}` : ""}
            </p>
            <p className="mt-1.5 text-base font-semibold text-ink-100">
              {heroText?.title}
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-300">
              {heroText?.summary}
            </p>
            {heroEntry ? (
              <Link
                href={localePath(locale, `/games/${hero.slug}`)}
                className="mt-3 inline-block text-sm font-medium text-accent-400 hover:text-accent-300"
              >
                {t.compatibility.detailCta} →
              </Link>
            ) : null}
          </figcaption>
        </figure>
      </section>

      <section className="mt-20">
        <SectionHeading
          eyebrow={t.media.timelineEyebrow}
          title={t.media.timelineHeading}
          description={t.media.timelineLead}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {rest.map((run) => {
            const text = getHistoryContent(locale, run.id);
            const entry = findBySlug(run.slug);
            return (
              <figure key={run.id} className="surface overflow-hidden">
                <Image
                  src={run.image!}
                  alt={text?.imageAlt ?? text?.title ?? ""}
                  width={1280}
                  height={720}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="aspect-video w-full border-b border-ink-700 object-cover"
                />
                <figcaption className="p-5">
                  <p className="text-xs text-ink-400">
                    {formatDate(run.date, locale)}
                    {run.release
                      ? ` · ${format(t.common.release, {
                          version: run.release.replace(/^v/, ""),
                        })}`
                      : ` · ${t.common.developmentBuild}`}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-ink-100">
                    {text?.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">
                    {text?.summary}
                  </p>
                  {entry ? (
                    <Link
                      href={localePath(locale, `/games/${run.slug}`)}
                      className="mt-3 inline-block text-xs font-medium text-accent-400 hover:text-accent-300"
                    >
                      {entry.title} →
                    </Link>
                  ) : null}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading
          eyebrow={t.media.galleryEyebrow}
          title={t.media.galleryHeading}
          description={t.media.galleryLead}
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rows
            .filter((row) => row.image)
            .map((row) => (
              <li key={row.slug}>
                <Link
                  href={row.href}
                  className="surface flex h-full flex-col overflow-hidden transition-colors hover:border-ink-600"
                >
                  <Image
                    src={row.image!}
                    alt={row.imageAlt ?? row.title}
                    width={480}
                    height={270}
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="aspect-video w-full border-b border-ink-700 object-cover"
                  />
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <TierBadge
                      tier={row.tier}
                      locale={locale}
                      className="self-start"
                    />
                    <p className="text-sm font-medium text-ink-100">
                      {row.title}
                    </p>
                    <p className="text-xs leading-relaxed text-ink-400">
                      {row.status}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </section>

      <section className="mt-20">
        <div className="surface flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-ink-100">
              {t.media.youtubeHeading}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-300">
              {t.media.youtubeBody}
            </p>
          </div>
          <ButtonLink href={site.links.youtube} external>
            @PS5PCEM
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
