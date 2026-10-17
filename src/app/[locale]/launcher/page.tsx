import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  commitUrl,
  launcherEnvironment,
  launcherFacts,
  launcherImages,
  launcherLanguages,
  launcherTimeline,
} from "@/data/launcher";
import { latestRelease } from "@/data/release";
import { isolateLtr, locales, localePath, toLocale } from "@/i18n/config";
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
    path: "/launcher",
    title: t.seo.launcher.title,
    description: t.seo.launcher.description,
    image: launcherImages.settings.src,
    imageAlt: t.launcher.settingsAlt,
    keywords: [
      "PS5PCEM launcher",
      "PS5 emulator launcher",
      "PS5PCEM settings",
      "PS5PCEM controller",
      "PS5PCEM Linux launcher",
      "PS5PCEM DirectX 12",
    ],
  });
}

const releaseNotes = (version: string) =>
  `https://github.com/iStark/PS5PCEM/blob/main/docs/release-notes/v${version}.md`;

export default async function LauncherPage({ params }: PageProps) {
  const locale = toLocale((await params).locale);
  const t = getDictionary(locale);
  const l = t.launcher;

  const pages = [
    {
      title: l.library.title,
      body: format(l.library.body, { capacity: launcherFacts.libraryCapacity }),
    },
    { title: l.controls.title, body: l.controls.body },
    { title: l.saves.title, body: l.saves.body },
    {
      title: l.settings.title,
      body: format(l.settings.body, {
        resolutions: launcherFacts.outputResolutions.join(", "),
      }),
    },
  ];

  const startup = [
    { title: l.vulkanTitle, body: l.vulkanBody },
    { title: l.launchTitle, body: l.launchBody },
    { title: l.failureTitle, body: l.failureBody },
    { title: l.updateTitle, body: l.updateBody },
  ];

  return (
    <div className="container-page py-16">
      <JsonLd
        data={[
          webPageSchema(locale, {
            path: "/launcher",
            name: t.seo.launcher.title,
            description: t.seo.launcher.description,
          }),
          breadcrumbSchema(locale, [
            { name: t.nav.home, path: "/" },
            { name: t.nav.launcher, path: "/launcher" },
          ]),
        ]}
      />

      <header className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
            {l.eyebrow}
          </p>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl">
            {l.heading}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-300">{l.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={localePath(locale, "/download")}>
              {format(t.common.getVersion, { version: latestRelease.version })}
            </ButtonLink>
            <ButtonLink
              href={localePath(locale, "/languages")}
              variant="secondary"
            >
              {l.languagesCta}
            </ButtonLink>
          </div>
        </div>
        <figure>
          <div className="overflow-hidden rounded-2xl border border-ink-700 shadow-2xl shadow-black/50">
            <Image
              src={launcherImages.settings.src}
              alt={l.settingsAlt}
              width={launcherImages.settings.width}
              height={launcherImages.settings.height}
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="w-full"
            />
          </div>
          <figcaption className="mt-3 text-xs leading-relaxed text-ink-400">
            {format(l.settingsCaption, { version: latestRelease.version })}
          </figcaption>
        </figure>
      </header>

      <section className="mt-20">
        <SectionHeading eyebrow={l.pagesEyebrow} title={l.pagesHeading} />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {pages.map((page, index) => (
            <article key={page.title} className="surface p-6">
              <p className="font-mono text-xs text-ink-400">0{index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-ink-100">
                {page.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-300">
                {page.body}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {[
            { image: launcherImages.library, alt: l.libraryAlt, caption: l.libraryCaption },
            { image: launcherImages.controls, alt: l.controlsAlt, caption: l.controlsCaption },
          ].map((shot) => (
            <figure key={shot.image.src}>
              <div className="overflow-hidden rounded-xl border border-ink-700">
                <Image
                  src={shot.image.src}
                  alt={shot.alt}
                  width={shot.image.width}
                  height={shot.image.height}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-ink-400">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading eyebrow={l.startEyebrow} title={l.startHeading} />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {startup.map((item) => (
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

      <section className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <SectionHeading eyebrow={l.graphicsEyebrow} title={l.graphicsHeading} />
          <p className="mt-6 text-sm leading-relaxed text-ink-300">
            {l.graphicsBody}
          </p>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink-300">
            <li className="surface p-4">{l.graphicsLinux}</li>
            <li className="surface p-4">{l.graphicsFailure}</li>
          </ul>
          <Link
            href={localePath(locale, "/tech/d3d12")}
            className="mt-5 inline-block text-sm text-accent-400 underline underline-offset-2"
          >
            {t.home.d3d12Cta}
          </Link>
        </div>
        <figure className="lg:mt-10">
          <div className="overflow-hidden rounded-xl border border-ink-700">
            <Image
              src={launcherImages.graphicsApi.src}
              alt={l.graphicsAlt}
              width={launcherImages.graphicsApi.width}
              height={launcherImages.graphicsApi.height}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="w-full"
            />
          </div>
          <figcaption className="mt-3 text-xs leading-relaxed text-ink-400">
            {format(l.graphicsCaption, { version: latestRelease.version })}
          </figcaption>
        </figure>
      </section>

      <section className="mt-20">
        <SectionHeading
          eyebrow={l.envEyebrow}
          title={l.envHeading}
          description={l.envLead}
        />
        <div className="surface mt-8 overflow-x-auto">
          <table className="w-full min-w-[40rem] text-start text-sm">
            <thead>
              <tr className="border-b border-ink-700 text-xs uppercase tracking-wider text-ink-400">
                <th scope="col" className="px-5 py-3 text-start font-medium">
                  {l.envVariable}
                </th>
                <th scope="col" className="px-5 py-3 text-start font-medium">
                  {l.envValues}
                </th>
                <th scope="col" className="px-5 py-3 text-start font-medium">
                  {l.envMeaning}
                </th>
              </tr>
            </thead>
            <tbody>
              {launcherEnvironment.map((variable) => (
                <tr
                  key={variable.name}
                  className="border-b border-ink-800 last:border-b-0"
                >
                  <td className="px-5 py-3 font-mono text-xs text-ink-100" dir="ltr">
                    {variable.name}
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-ink-300" dir="ltr">
                    {variable.values}
                  </td>
                  <td className="px-5 py-3 text-ink-300">{l.env[variable.key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-20 grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow={l.storageEyebrow} title={l.storageHeading} />
          <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ink-300">
            <li className="surface p-5">{l.storageWindows}</li>
            <li className="surface p-5">
              {format(l.storageLinux, {
                settings: launcherFacts.linuxSettings,
                data: launcherFacts.linuxData,
              })}
            </li>
          </ul>
        </div>
        <div>
          <SectionHeading eyebrow={l.linuxEyebrow} title={l.linuxHeading} />
          <p className="mt-6 text-sm leading-relaxed text-ink-300">
            {l.linuxBody}
          </p>
          <a
            href={launcherFacts.linuxGuide}
            className="mt-4 inline-block text-sm text-accent-400 underline underline-offset-2"
            rel="noreferrer noopener"
            target="_blank"
          >
            {l.linuxGuide}
          </a>
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading
          eyebrow={l.timelineEyebrow}
          title={l.timelineHeading}
          description={l.timelineLead}
        />
        <ol className="mt-8 space-y-3">
          {launcherTimeline.map((entry) => (
            <li
              key={entry.key}
              className="surface flex flex-col gap-2 p-5 sm:flex-row sm:items-start sm:gap-6"
            >
              <a
                href={
                  entry.version !== null
                    ? releaseNotes(entry.version)
                    : commitUrl(entry.commit)
                }
                className="shrink-0 font-mono text-xs text-accent-400 underline underline-offset-2 sm:w-44"
                rel="noreferrer noopener"
                target="_blank"
              >
                {entry.version !== null
                  ? format(t.common.release, {
                      version: isolateLtr(locale, entry.version),
                    })
                  : `${t.common.developmentBuild} · ${entry.commit}`}
              </a>
              <p className="text-sm leading-relaxed text-ink-300">
                {l.timeline[entry.key]}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 max-w-3xl">
        <Notice tone="info" title={l.languagesTitle}>
          {l.languagesBody}{" "}
          <Link
            href={localePath(locale, "/languages")}
            className="underline underline-offset-2 hover:text-accent-400"
          >
            {l.languagesCta} ({launcherLanguages.length})
          </Link>
        </Notice>
        <a
          href={launcherFacts.source}
          className="mt-6 inline-block text-sm text-accent-400 underline underline-offset-2"
          rel="noreferrer noopener"
          target="_blank"
        >
          {l.docsCta}
        </a>
      </section>
    </div>
  );
}
