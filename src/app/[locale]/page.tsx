import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { compatibility, compatibilityMeta, countByTier, tierOrder } from "@/data/compatibility";
import { latestRelease } from "@/data/release";
import { site } from "@/data/site";
import { highlights } from "@/data/subsystems";
import { locales, localePath, toLocale } from "@/i18n/config";
import { format, getDictionary } from "@/i18n";
import { buildRows } from "@/lib/rows";
import { formatDate } from "@/lib/format";
import { ButtonLink, Notice, SectionHeading, Stat, TierBadge } from "@/components/ui";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = getDictionary(locale);
  return {
    title: `${site.name} — ${t.meta.tagline}`,
    description: t.meta.description,
  };
}

export default async function HomePage({ params }: PageProps) {
  const locale = toLocale((await params).locale);
  const t = getDictionary(locale);
  const counts = countByTier();
  const rows = buildRows(locale);
  const featured = rows.slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-800">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_32rem_at_50%_-10%,rgba(59,149,255,0.16),transparent)]"
        />
        <div className="container-page relative grid gap-12 py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900 px-3 py-1 text-xs text-ink-300">
              <span className="size-1.5 rounded-full bg-intro" />
              {format(t.home.badge, { version: latestRelease.version })}
            </p>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl lg:text-6xl">
              {t.home.heading}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
              {format(t.home.lead, {
                playable: counts.playable,
                total: compatibility.length,
              })}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={localePath(locale, "/download")}>
                {format(t.home.ctaDownload, { version: latestRelease.version })}
              </ButtonLink>
              <ButtonLink
                href={localePath(locale, "/compatibility")}
                variant="secondary"
              >
                {t.home.ctaResults}
              </ButtonLink>
            </div>

            <p className="mt-6 text-sm text-ink-400">{t.home.requirements}</p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-ink-700 shadow-2xl shadow-black/50">
              <Image
                src="/images/cat-quest-iii-world.png"
                alt={
                  rows.find((row) => row.slug === "cat-quest-iii")?.imageAlt ??
                  "Cat Quest III"
                }
                width={1920}
                height={1080}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full object-cover"
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink-400">
              {t.home.heroCaption}{" "}
              <Link
                href={localePath(locale, "/media")}
                className="underline underline-offset-2 hover:text-accent-400"
              >
                {t.common.moreCaptures}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="container-page mt-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            value={String(compatibility.length)}
            label={t.home.statTested}
            hint={format(t.home.statTestedHint, {
              release: compatibilityMeta.testedOnRelease,
            })}
          />
          <Stat
            value={String(counts.playable)}
            label={t.home.statPlayable}
            hint={t.home.statPlayableHint}
          />
          <Stat
            value={String(counts.ingame)}
            label={t.home.statIngame}
            hint={t.home.statIngameHint}
          />
          <Stat
            value={String(counts.intro + counts.boots)}
            label={t.home.statEarly}
            hint={t.home.statEarlyHint}
          />
        </div>
      </section>

      <section className="container-page mt-24">
        <SectionHeading
          eyebrow={t.home.featuresEyebrow}
          title={t.home.featuresHeading}
          description={t.home.featuresLead}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {highlights.map((item) => (
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

      <section className="container-page mt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t.home.resultsEyebrow}
            title={t.home.resultsHeading}
            description={format(t.home.resultsLead, {
              host: compatibilityMeta.host,
            })}
          />
          <ButtonLink
            href={localePath(locale, "/compatibility")}
            variant="secondary"
          >
            {format(t.home.resultsCta, { total: compatibility.length })}
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((row) => (
            <Link
              key={row.slug}
              href={row.href}
              className="surface flex flex-col overflow-hidden transition-colors hover:border-ink-600"
            >
              {row.image ? (
                <Image
                  src={row.image}
                  alt={row.imageAlt ?? row.title}
                  width={640}
                  height={360}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="aspect-video w-full border-b border-ink-700 object-cover"
                />
              ) : (
                <div className="aspect-video w-full border-b border-ink-700 bg-ink-850" />
              )}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-ink-100">
                    {row.title}
                  </h3>
                  <TierBadge tier={row.tier} locale={locale} />
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-300">
                  {row.headline}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <dl className="mt-10 grid gap-4 md:grid-cols-2">
          {tierOrder.map((tier) => (
            <div
              key={tier}
              className="flex gap-3.5 rounded-lg border border-ink-800 p-4"
            >
              <TierBadge tier={tier} locale={locale} className="mt-0.5" />
              <div>
                <dt className="text-sm font-medium text-ink-100">
                  {t.tiers[tier].label}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-400">
                  {t.tiers[tier].description}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-page mt-24">
        <div className="surface overflow-hidden">
          <div className="grid gap-8 p-8 lg:grid-cols-2 lg:items-center lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
                {t.home.youtubeEyebrow}
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink-100">
                {t.home.youtubeHeading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-300">
                {t.home.youtubeLead}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href={site.links.youtube} external>
                  {t.home.youtubeCta}
                </ButtonLink>
                <ButtonLink
                  href={localePath(locale, "/media")}
                  variant="secondary"
                >
                  {t.home.youtubeBrowse}
                </ButtonLink>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-ink-700">
              <Image
                src="/images/yotei-intro-video.png"
                alt="Ghost of Yōtei"
                width={1280}
                height={720}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-video w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page mt-24">
        <Notice title={t.home.legalTitle}>
          {t.home.legalBody}{" "}
          <a
            href={site.links.legal}
            className="underline underline-offset-2 hover:text-accent-400"
            rel="noreferrer noopener"
            target="_blank"
          >
            {t.home.legalLink}
          </a>
          .
        </Notice>
      </section>

      <section className="container-page mt-16">
        <div className="surface flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-ink-100">
              {format(t.home.tryHeading, { version: latestRelease.version })}
            </h2>
            <p className="mt-2 text-sm text-ink-300">
              {format(t.common.published, {
                date: formatDate(latestRelease.publishedAt, locale),
              })}
              . {t.home.tryLead}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={localePath(locale, "/download")}>
              {t.home.tryDownload}
            </ButtonLink>
            <ButtonLink href={site.links.github} variant="secondary" external>
              {t.home.trySource}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
