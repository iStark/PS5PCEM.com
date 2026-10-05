import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  compatibility,
  compatibilityMeta,
  findBySlug,
  sortedCompatibility,
} from "@/data/compatibility";
import { historyFor } from "@/data/history";
import { latestRelease } from "@/data/release";
import { site } from "@/data/site";
import {
  alternateLanguages,
  locales,
  localePath,
  toLocale,
} from "@/i18n/config";
import { format, getDictionary, getGameContent, getHistoryContent } from "@/i18n";
import { formatDate } from "@/lib/format";
import {
  BulletList,
  ButtonLink,
  SectionHeading,
  Stat,
  TierBadge,
} from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, gameReportSchema } from "@/lib/schema";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    compatibility.map((entry) => ({ locale, slug: entry.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  const entry = findBySlug(slug);

  if (!entry) {
    // An unknown slug renders notFound(); leaving the metadata empty keeps the
    // 404 out of the index rather than publishing a half-built page.
    return { robots: { index: false, follow: false } };
  }

  const t = getDictionary(locale);
  const content = getGameContent(locale, slug);
  const runs = historyFor(slug);

  return buildMetadata({
    locale,
    path: `/games/${slug}`,
    title: format(t.game.metaTitle, { title: entry.title }),
    // The result line is the part a searcher is looking for, so it leads.
    description: `${content.status}. ${content.headline}`,
    image: entry.image,
    imageAlt: content.imageAlt,
    type: "article",
    publishedTime: runs.at(-1)?.date,
    modifiedTime: entry.confirmedOn ?? runs[0]?.date,
    keywords: [
      entry.title,
      `${entry.title} PS5PCEM`,
      `${entry.title} PS5 emulator`,
      `${entry.title} PC`,
      t.tiers[entry.tier].label,
    ],
  });
}

export default async function GamePage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  const entry = findBySlug(slug);

  if (!entry) {
    notFound();
  }

  const t = getDictionary(locale);
  const content = getGameContent(locale, slug);
  const runs = historyFor(slug);
  const captures = runs.filter((run) => run.image);
  const others = sortedCompatibility()
    .filter((candidate) => candidate.slug !== slug)
    .slice(0, 4);

  return (
    <div className="container-page py-12">
      <JsonLd
        data={[
          gameReportSchema(locale, slug),
          breadcrumbSchema(locale, [
            { name: t.nav.home, path: "/" },
            { name: t.nav.compatibility, path: "/compatibility" },
            { name: entry.title, path: `/games/${slug}` },
          ]),
        ]}
      />

      {/* A real breadcrumb trail, which search results can show in place of
          the bare URL, and which tells a visitor where this page sits. */}
      <nav aria-label={t.nav.compatibility} className="text-sm">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-400">
          <li>
            <Link
              href={localePath(locale)}
              className="transition-colors hover:text-accent-400"
            >
              {t.nav.home}
            </Link>
          </li>
          <li aria-hidden className="text-ink-600">
            /
          </li>
          <li>
            <Link
              href={localePath(locale, "/compatibility")}
              className="transition-colors hover:text-accent-400"
            >
              {t.nav.compatibility}
            </Link>
          </li>
          <li aria-hidden className="text-ink-600">
            /
          </li>
          <li aria-current="page" className="text-ink-200">
            {entry.title}
          </li>
        </ol>
      </nav>

      <header className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <TierBadge tier={entry.tier} locale={locale} />
            <span className="text-xs uppercase tracking-widest text-ink-400">
              {t.tiers[entry.tier].label}
            </span>
          </div>

          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl">
            {entry.title}
          </h1>

          <p className="mt-4 text-lg font-medium text-ink-200">
            {content.status}
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-300">
            {content.summary}
          </p>

          <dl className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            <MetaItem label={t.game.hostLabel} value={compatibilityMeta.host} />
            <MetaItem
              label={t.game.buildLabel}
              value={compatibilityMeta.testedOnRelease}
            />
            <MetaItem
              label={t.game.runsLabel}
              value={String(runs.length)}
            />
            {entry.confirmedOn ? (
              <MetaItem
                label={t.game.confirmedLabel}
                value={formatDate(entry.confirmedOn, locale)}
              />
            ) : null}
          </dl>
        </div>

        {entry.image ? (
          <figure>
            <div className="overflow-hidden rounded-2xl border border-ink-700 shadow-2xl shadow-black/50">
              <Image
                src={entry.image}
                alt={content.imageAlt ?? entry.title}
                width={1920}
                height={1080}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-ink-400">
              {content.imageAlt ?? entry.title}
            </figcaption>
          </figure>
        ) : null}
      </header>

      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div className="surface p-6">
          <h2 className="text-lg font-semibold text-ink-100">
            {t.game.strengthsHeading}
          </h2>
          <div className="mt-4">
            <BulletList items={content.strengths} tone="good" />
          </div>
        </div>
        <div className="surface p-6">
          <h2 className="text-lg font-semibold text-ink-100">
            {t.game.limitsHeading}
          </h2>
          <div className="mt-4">
            <BulletList items={content.limits} tone="bad" />
          </div>
        </div>
      </section>

      {content.performance ? (
        <section className="mt-10">
          <div className="surface p-6">
            <h2 className="text-lg font-semibold text-ink-100">
              {t.game.performanceHeading}
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-ink-300">
              {content.performance}
            </p>
            <p className="mt-4 text-xs text-ink-400">
              {compatibilityMeta.host}
            </p>
          </div>
        </section>
      ) : null}

      <section className="mt-20">
        <SectionHeading
          eyebrow={t.game.statusLabel}
          title={t.game.historyHeading}
          description={t.game.historyLead}
        />

        {runs.length === 0 ? (
          <p className="surface mt-8 px-5 py-8 text-sm text-ink-300">
            {t.game.historyEmpty}
          </p>
        ) : (
          <ol className="mt-10 space-y-6">
            {runs.map((run) => {
              const text = getHistoryContent(locale, run.id);
              return (
                <li key={run.id} className="relative ps-6">
                  <span
                    aria-hidden
                    className="absolute start-0 top-2 size-2.5 rounded-full border-2 border-accent-500 bg-ink-950"
                  />
                  <span
                    aria-hidden
                    className="absolute start-[4px] top-6 h-[calc(100%-0.5rem)] w-px bg-ink-700"
                  />
                  <article className="surface overflow-hidden">
                    <div className="flex flex-col gap-5 p-5 sm:flex-row">
                      {run.image ? (
                        <div className="shrink-0 overflow-hidden rounded-lg border border-ink-700 sm:w-64">
                          <Image
                            src={run.image}
                            alt={text?.imageAlt ?? text?.title ?? entry.title}
                            width={640}
                            height={360}
                            sizes="(max-width: 640px) 100vw, 256px"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : null}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
                          <time
                            dateTime={run.date}
                            className="font-medium text-ink-200"
                          >
                            {formatDate(run.date, locale)}
                          </time>
                          <span
                            className={`rounded-full border px-2 py-0.5 ${
                              run.release
                                ? "border-accent-500/40 bg-accent-500/10 text-accent-400"
                                : "border-ink-600 bg-ink-850 text-ink-400"
                            }`}
                          >
                            {run.release
                              ? format(t.common.release, {
                                  version: run.release.replace(/^v/, ""),
                                })
                              : t.common.developmentBuild}
                          </span>
                        </div>

                        <h3 className="mt-2.5 text-base font-semibold text-ink-100">
                          {text?.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-300">
                          {text?.summary}
                        </p>

                        {run.source ? (
                          <a
                            href={run.source}
                            className="mt-3 inline-block text-sm font-medium text-accent-400 hover:text-accent-300"
                            rel="noreferrer noopener"
                            target="_blank"
                          >
                            {t.common.readReport} →
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        )}
      </section>

      {captures.length > 0 ? (
        <section className="mt-20">
          <SectionHeading
            eyebrow={t.media.eyebrow}
            title={t.game.capturesHeading}
            description={t.game.capturesLead}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {captures.map((run) => {
              const text = getHistoryContent(locale, run.id);
              return (
                <figure key={run.id} className="surface overflow-hidden">
                  <Image
                    src={run.image!}
                    alt={text?.imageAlt ?? text?.title ?? entry.title}
                    width={1280}
                    height={720}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="aspect-video w-full border-b border-ink-700 object-cover"
                  />
                  <figcaption className="p-5">
                    <p className="text-sm font-semibold text-ink-100">
                      {text?.title}
                    </p>
                    <p className="mt-1.5 text-xs text-ink-400">
                      {formatDate(run.date, locale)}
                      {run.release ? ` · ${run.release}` : ""}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="mt-20">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat
            value={String(runs.length)}
            label={t.game.runsLabel}
            hint={compatibilityMeta.host}
          />
          <Stat
            value={latestRelease.version}
            label={t.status.summaryBuild}
            hint={formatDate(latestRelease.publishedAt, locale)}
          />
          <Stat
            value={t.tiers[entry.tier].short}
            label={t.game.statusLabel}
            hint={t.tiers[entry.tier].label}
          />
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-lg font-semibold text-ink-100">
          {t.game.otherTitles}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((other) => {
            const otherContent = getGameContent(locale, other.slug);
            return (
              <li key={other.slug}>
                <Link
                  href={localePath(locale, `/games/${other.slug}`)}
                  className="surface flex h-full flex-col overflow-hidden transition-colors hover:border-ink-600"
                >
                  {other.image ? (
                    <Image
                      src={other.image}
                      alt={otherContent.imageAlt ?? other.title}
                      width={480}
                      height={270}
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="aspect-video w-full border-b border-ink-700 object-cover"
                    />
                  ) : (
                    <div className="aspect-video w-full border-b border-ink-700 bg-ink-850" />
                  )}
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <TierBadge
                      tier={other.tier}
                      locale={locale}
                      className="self-start"
                    />
                    <p className="text-sm font-medium text-ink-100">
                      {other.title}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-16">
        <div className="surface flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-ink-300">
            {t.compatibility.meta.replace("{host}", compatibilityMeta.host)}
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={site.links.projectStatus} variant="secondary" external>
              {t.status.statusDocCta}
            </ButtonLink>
            <ButtonLink href={site.links.issues} variant="secondary" external>
              {t.footer.reportIssue}
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-widest text-ink-400">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-ink-200">{value}</dd>
    </div>
  );
}
