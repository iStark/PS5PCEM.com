import type { Metadata } from "next";
import Link from "next/link";
import {
  subsystems,
  type SubsystemState,
} from "@/data/subsystems";
import { compatibility, compatibilityMeta, countByTier } from "@/data/compatibility";
import { latestRelease } from "@/data/release";
import { site } from "@/data/site";
import {
  alternateLanguages,
  locales,
  localePath,
  toLocale,
} from "@/i18n/config";
import { format, getDictionary } from "@/i18n";
import { formatDate } from "@/lib/format";
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
    path: "/status",
    title: t.seo.status.title,
    description: t.seo.status.description,
    image: "/images/yotei-tree-scene.png",
    keywords: [
      "PS5PCEM project status",
      "PS5 emulator progress",
      "RDNA2 shader translation",
      "Vulkan VideoOut",
    ],
  });
}

const stateClasses: Record<SubsystemState, string> = {
  working: "border-playable/40 bg-playable/10 text-playable",
  partial: "border-intro/40 bg-intro/10 text-intro",
  deferred: "border-boots/40 bg-boots/10 text-boots",
};

export default async function StatusPage({ params }: PageProps) {
  const locale = toLocale((await params).locale);
  const t = getDictionary(locale);
  const counts = countByTier();
  const stateLabel: Record<SubsystemState, string> = {
    working: t.status.stateWorking,
    partial: t.status.statePartial,
    deferred: t.status.stateDeferred,
  };
  const [leadBefore, leadAfter] = t.status.lead.split("{link}");

  return (
    <div className="container-page py-16">
      <JsonLd
        data={[
          webPageSchema(locale, {
            path: "/status",
            name: t.seo.status.title,
            description: t.seo.status.description,
          }),
          breadcrumbSchema(locale, [
            { name: t.nav.home, path: "/" },
            { name: t.nav.status, path: "/status" },
          ]),
        ]}
      />
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
          {format(t.status.eyebrow, {
            version: latestRelease.version,
            date: formatDate(latestRelease.publishedAt, locale),
          })}
        </p>
        <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl">
          {t.status.heading}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-300">
          {leadBefore}
          <Link
            href={localePath(locale, "/compatibility")}
            className="text-accent-400 underline underline-offset-2 hover:text-accent-300"
          >
            {t.status.leadLink}
          </Link>
          {leadAfter}
        </p>
      </header>

      <section className="mt-12">
        <div className="surface grid gap-6 p-7 sm:grid-cols-3">
          <SummaryItem
            label={t.status.summaryBuild}
            value={latestRelease.version}
            hint={
              latestRelease.prerelease
                ? t.download.channelPrerelease
                : t.download.channelRelease
            }
          />
          <SummaryItem
            label={t.status.summaryTitles}
            value={format(t.status.summaryTitlesValue, {
              playable: counts.playable,
              total: compatibility.length,
            })}
            hint={format(t.status.summaryTitlesHint, {
              date: formatDate(compatibilityMeta.confirmedOn, locale),
            })}
          />
          <SummaryItem
            label={t.status.summaryHost}
            value={compatibilityMeta.host}
            hint={t.status.summaryHostHint}
          />
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow={t.status.subsystemsEyebrow}
          title={t.status.subsystemsHeading}
          description={t.status.subsystemsLead}
        />
        <div className="mt-6">
          <ButtonLink href={localePath(locale, "/tech")}>
            {t.status.techCta}
          </ButtonLink>
        </div>

        <div className="mt-10 space-y-4">
          {subsystems.map((subsystem) => (
            <article key={subsystem.id} className="surface p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-ink-100">
                  {subsystem.name}
                </h3>
                <span
                  className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-xs font-medium ${stateClasses[subsystem.state]}`}
                >
                  {stateLabel[subsystem.state]}
                </span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-300">
                {subsystem.summary}
              </p>
              <ul className="mt-4 space-y-2">
                {subsystem.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex gap-3 text-sm leading-relaxed text-ink-400"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1 shrink-0 rounded-full bg-ink-600"
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 max-w-3xl">
        <Notice title={t.status.notClaimedTitle}>
          {t.status.notClaimedBody}
        </Notice>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow={t.status.deeperEyebrow}
          title={t.status.deeperHeading}
          description={t.status.deeperLead}
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink
            href={site.links.implementationStatus}
            variant="secondary"
            external
          >
            {t.status.implementationCta}
          </ButtonLink>
          <ButtonLink href={site.links.projectStatus} variant="secondary" external>
            {t.status.statusDocCta}
          </ButtonLink>
          <ButtonLink href={site.links.docs} variant="secondary" external>
            {t.status.docsCta}
          </ButtonLink>
          <ButtonLink href={site.links.issues} variant="secondary" external>
            {t.status.issuesCta}
          </ButtonLink>
        </div>
      </section>

      <section className="mt-16">
        <div className="surface flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-ink-100">
              {t.status.supportHeading}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-300">
              {t.status.supportBody}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={site.links.boosty} variant="secondary" external>
              Boosty
            </ButtonLink>
            <ButtonLink href={site.links.patreon} variant="secondary" external>
              Patreon
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-ink-100">{value}</p>
      <p className="mt-1 text-xs text-ink-400">{hint}</p>
    </div>
  );
}
