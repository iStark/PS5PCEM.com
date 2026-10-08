import type { Metadata } from "next";
import {
  latestRelease,
  quickStart,
  releaseHistory,
  systemRequirements,
} from "@/data/release";
import { site } from "@/data/site";
import {
  alternateLanguages,
  locales,
  localePath,
  toLocale,
} from "@/i18n/config";
import { format, getDictionary } from "@/i18n";
import { formatBytes, formatDate } from "@/lib/format";
import { ButtonLink, Notice, SectionHeading } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, softwareSchema } from "@/lib/schema";

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
    path: "/download",
    title: format(t.seo.download.title, { version: latestRelease.version }),
    description: format(t.seo.download.description, {
      version: latestRelease.version,
    }),
    image: "/images/launcher-library.png",
    keywords: [
      "download PS5 emulator",
      `PS5PCEM ${latestRelease.version}`,
      "PS5 emulator Windows download",
      "PS5PCEM SHA-256",
    ],
  });
}

export default async function DownloadPage({ params }: PageProps) {
  const locale = toLocale((await params).locale);
  const t = getDictionary(locale);
  const [leadBefore, leadAfter] = t.download.lead.split("{link}");

  return (
    <div className="container-page py-16">
      <JsonLd
        data={[
          softwareSchema(locale),
          breadcrumbSchema(locale, [
            { name: t.nav.home, path: "/" },
            { name: t.nav.download, path: "/download" },
          ]),
        ]}
      />
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
          {format(t.download.eyebrow, {
            channel: latestRelease.prerelease
              ? t.download.channelPrerelease
              : t.download.channelRelease,
          })}
        </p>
        <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl">
          {format(t.download.heading, { version: latestRelease.version })}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-300">
          {format(leadBefore, {
            date: formatDate(latestRelease.publishedAt, locale),
          })}
          <a
            href={latestRelease.releaseUrl}
            className="text-accent-400 underline underline-offset-2 hover:text-accent-300"
            rel="noreferrer noopener"
            target="_blank"
          >
            {t.download.leadLink}
          </a>
          {leadAfter}
        </p>
      </header>

      <section className="surface mt-8 border-accent-500/40 p-6">
        <h2 className="text-xl font-semibold text-ink-100">
          {format(t.download.changesHeading, { version: latestRelease.version })}
        </h2>
        <p className="mt-3 font-medium leading-relaxed text-ink-100">
          {t.download.changesLauncher}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-300">
          {t.download.changesFeatures}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-400">
          {t.download.changesLimits}
        </p>
        <div className="mt-5">
          <ButtonLink href={latestRelease.notesUrl} variant="secondary" external>
            {format(t.download.releaseNotesCta, { version: latestRelease.version })}
          </ButtonLink>
        </div>
      </section>

      <section className="mt-12 grid gap-4 lg:grid-cols-3">
        {latestRelease.assets.map((asset) => (
          <article
            key={asset.fileName}
            className={`surface flex flex-col p-6 ${
              asset.primary ? "border-accent-500/50" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold text-ink-100">
                {asset.label}
              </h2>
              {asset.primary ? (
                <span className="rounded-full border border-accent-500/40 bg-accent-500/10 px-2.5 py-1 text-xs font-medium text-accent-400">
                  {t.common.recommended}
                </span>
              ) : null}
            </div>
            <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-300">
              {asset.description}
            </p>
            <p className="mt-4 font-mono text-xs break-all text-ink-400">
              {asset.fileName}
            </p>
            <p className="mt-1 text-xs text-ink-400">
              {formatBytes(asset.size, locale)}
            </p>
            <ButtonLink
              href={asset.url}
              external
              variant={asset.primary ? "primary" : "secondary"}
              className="mt-5 w-full"
            >
              {t.download.download}
            </ButtonLink>
          </article>
        ))}
      </section>

      <section className="mt-10 max-w-3xl">
        <Notice tone="info" title={t.download.signingTitle}>
          {t.download.signingBody}
        </Notice>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow={t.download.verifyEyebrow}
          title={t.download.verifyHeading}
          description={t.download.verifyLead}
        />
        <div className="surface mt-8 overflow-x-auto">
          <table className="w-full min-w-[40rem] text-start text-sm">
            <thead className="border-b border-ink-700 text-xs uppercase tracking-widest text-ink-400">
              <tr>
                <th scope="col" className="px-5 py-3.5 text-start font-semibold">
                  {t.download.tableFile}
                </th>
                <th scope="col" className="px-5 py-3.5 text-start font-semibold">
                  {t.download.tableHash}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-800">
              {latestRelease.assets
                .filter((asset) => asset.sha256)
                .map((asset) => (
                  <tr key={asset.fileName}>
                    <td className="px-5 py-4 align-top font-mono text-xs break-all text-ink-200">
                      {asset.fileName}
                    </td>
                    <td
                      className="px-5 py-4 align-top font-mono text-xs break-all text-ink-400"
                      dir="ltr"
                    >
                      {asset.sha256}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-ink-100">
            {t.download.requirementsHeading}
          </h2>
          <dl className="mt-5 space-y-4">
            {systemRequirements.map((item) => (
              <div key={item.label} className="border-s-2 border-ink-700 ps-4">
                <dt className="text-sm font-medium text-ink-100">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-300">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink-100">
            {t.download.quickStartHeading}
          </h2>
          <ol className="mt-5 space-y-4">
            {quickStart.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-ink-600 text-xs font-medium text-ink-300">
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed text-ink-300">
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm leading-relaxed text-ink-400">
            {t.download.noContentNote}
          </p>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow={t.download.alsoEyebrow}
          title={t.download.alsoHeading}
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={latestRelease.notesUrl} variant="secondary" external>
            {format(t.download.releaseNotesCta, {
              version: latestRelease.version,
            })}
          </ButtonLink>
          <ButtonLink
            href={site.links.gettingStarted}
            variant="secondary"
            external
          >
            {t.download.buildFromSource}
          </ButtonLink>
          <ButtonLink href={site.links.releases} variant="secondary" external>
            {t.download.allReleases}
          </ButtonLink>
        </div>

        <div className="surface mt-8 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-start text-sm">
            <thead className="border-b border-ink-700 text-xs uppercase tracking-widest text-ink-400">
              <tr>
                <th scope="col" className="px-5 py-3.5 text-start font-semibold">
                  {t.download.tableVersion}
                </th>
                <th scope="col" className="px-5 py-3.5 text-start font-semibold">
                  {t.download.tablePublished}
                </th>
                <th scope="col" className="px-5 py-3.5 text-start font-semibold">
                  {t.download.tableLink}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-800">
              {releaseHistory.map((release) => (
                <tr key={release.tag}>
                  <td className="px-5 py-4 font-medium text-ink-100">
                    {release.version}
                    {release.version === latestRelease.version ? (
                      <span className="ms-2 rounded-full border border-accent-500/40 bg-accent-500/10 px-2 py-0.5 text-xs font-normal text-accent-400">
                        {t.common.latest}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-5 py-4 text-ink-300">
                    {formatDate(release.publishedAt, locale)}
                  </td>
                  <td className="px-5 py-4">
                    <a
                      href={release.url}
                      className="text-accent-400 underline underline-offset-2 hover:text-accent-300"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      {t.download.viewOnGitHub}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
