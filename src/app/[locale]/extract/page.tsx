import type { Metadata } from "next";
import {
  extractor,
  extractorLimits,
  extractorSteps,
  extractorWrites,
} from "@/data/extractor";
import { latestRelease } from "@/data/release";
import { site } from "@/data/site";
import {
  alternateLanguages,
  locales,
  localePath,
  toLocale,
} from "@/i18n/config";
import { format, getDictionary } from "@/i18n";
import { BulletList, ButtonLink, Notice, SectionHeading } from "@/components/ui";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = getDictionary(locale);
  return {
    title: t.extract.heading,
    description: t.extract.noticeBody,
    alternates: {
      canonical: localePath(locale, "/extract"),
      languages: alternateLanguages("/extract"),
    },
  };
}

export default async function ExtractPage({ params }: PageProps) {
  const locale = toLocale((await params).locale);
  const t = getDictionary(locale);

  return (
    <div className="container-page py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
          {t.extract.eyebrow} · {extractor.binary}
        </p>
        <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl">
          {t.extract.heading}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-300">
          {format(t.extract.lead, { version: latestRelease.version })}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-400">
          {extractor.summary}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={localePath(locale, "/download")}>
            {t.download.download}
          </ButtonLink>
          <ButtonLink href={site.links.github} external variant="secondary">
            {t.home.trySource}
          </ButtonLink>
        </div>
      </header>

      <section className="mt-12 max-w-3xl">
        <Notice title={t.extract.noticeTitle}>{t.extract.noticeBody}</Notice>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow={t.extract.eyebrow}
          title={t.extract.usageHeading}
        />
        <ol className="mt-8 grid gap-4 lg:grid-cols-3">
          {extractorSteps.map((step, index) => (
            <li key={step.title} className="surface p-6">
              <span className="flex size-7 items-center justify-center rounded-full border border-ink-600 text-xs font-medium text-ink-300">
                {index + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink-100">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-6 font-mono text-xs text-ink-400" dir="ltr">
          {extractor.cli}
        </p>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div className="surface p-6">
          <h2 className="text-lg font-semibold text-ink-100">
            {t.extract.supportedHeading}
          </h2>
          <div className="mt-4">
            <BulletList items={extractorWrites} tone="good" />
          </div>
        </div>
        <div className="surface p-6">
          <h2 className="text-lg font-semibold text-ink-100">
            {t.extract.notSupportedHeading}
          </h2>
          <div className="mt-4">
            <BulletList items={extractorLimits} tone="bad" />
          </div>
        </div>
      </section>

      <section className="mt-16 max-w-3xl">
        <Notice tone="info" title={t.home.legalTitle}>
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
    </div>
  );
}
