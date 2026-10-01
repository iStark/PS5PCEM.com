import type { Metadata } from "next";
import { compatibility, compatibilityMeta, countByTier, tierOrder } from "@/data/compatibility";
import { site } from "@/data/site";
import {
  alternateLanguages,
  locales,
  localePath,
  toLocale,
} from "@/i18n/config";
import { format, getDictionary } from "@/i18n";
import { buildRows } from "@/lib/rows";
import { CompatibilityTable } from "@/components/CompatibilityTable";
import { Notice, Stat, TierBadge } from "@/components/ui";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = getDictionary(locale);
  return {
    title: t.compatibility.heading,
    description: t.compatibility.lead.replace(
      "{source}",
      t.compatibility.sourceLabel,
    ),
    alternates: {
      canonical: localePath(locale, "/compatibility"),
      languages: alternateLanguages("/compatibility"),
    },
  };
}

export default async function CompatibilityPage({ params }: PageProps) {
  const locale = toLocale((await params).locale);
  const t = getDictionary(locale);
  const counts = countByTier();
  const rows = buildRows(locale);

  // The lead sentence carries a link in the middle of the translated string.
  const [leadBefore, leadAfter] = t.compatibility.lead.split("{source}");

  return (
    <div className="container-page py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
          {t.compatibility.eyebrow}
        </p>
        <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl">
          {t.compatibility.heading}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-300">
          {leadBefore}
          <a
            href={site.links.projectStatus}
            className="text-accent-400 underline underline-offset-2 hover:text-accent-300"
            rel="noreferrer noopener"
            target="_blank"
          >
            {t.compatibility.sourceLabel}
          </a>
          {leadAfter}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-400">
          {format(t.compatibility.meta, { host: compatibilityMeta.host })}
        </p>
      </header>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          value={String(compatibility.length)}
          label={t.home.statTested}
          hint={format(t.home.statTestedHint, {
            release: compatibilityMeta.testedOnRelease,
          })}
        />
        <Stat value={String(counts.playable)} label={t.tiers.playable.label} />
        <Stat value={String(counts.ingame)} label={t.tiers.ingame.label} />
        <Stat
          value={String(counts.intro + counts.boots)}
          label={t.home.statEarly}
        />
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-ink-100">
          {t.compatibility.gradingHeading}
        </h2>
        <dl className="mt-5 grid gap-4 md:grid-cols-2">
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

      <section className="mt-14">
        <h2 className="sr-only">{t.compatibility.titlesHeading}</h2>
        <CompatibilityTable locale={locale} rows={rows} />
      </section>

      <div className="mt-14 max-w-3xl">
        <Notice tone="info" title={t.compatibility.noticeTitle}>
          {t.compatibility.noticeBody}{" "}
          <a
            href={site.links.issues}
            className="underline underline-offset-2 hover:text-accent-400"
            rel="noreferrer noopener"
            target="_blank"
          >
            {t.compatibility.noticeLink}
          </a>
          .
        </Notice>
      </div>
    </div>
  );
}
