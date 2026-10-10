import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  findTechnology,
  technologies,
  technologyUpdated,
  type TechSlug,
  type TechState,
} from "@/data/technologies";
import { locales, localePath, toLocale } from "@/i18n/config";
import { format, getDictionary, getTechArticle, getTechCopy } from "@/i18n";
import { formatDate } from "@/lib/format";
import { Notice } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, techArticleSchema } from "@/lib/schema";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    technologies.map((entry) => ({ locale, slug: entry.slug })),
  );
}

export const dynamicParams = false;

const stateClasses: Record<TechState, string> = {
  working: "border-playable/40 bg-playable/10 text-playable",
  partial: "border-intro/40 bg-intro/10 text-intro",
  deferred: "border-boots/40 bg-boots/10 text-boots",
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  const entry = findTechnology(slug);
  if (!entry) {
    return { robots: { index: false, follow: false } };
  }
  const t = getDictionary(locale);
  const article = getTechArticle(locale, slug);
  if (!article) {
    return { robots: { index: false, follow: false } };
  }

  return buildMetadata({
    locale,
    path: `/tech/${entry.slug}`,
    title: `${article.title} — PS5PCEM`,
    description: article.summary,
    type: "article",
    publishedTime: technologyUpdated,
    modifiedTime: technologyUpdated,
    keywords: [article.title, "PS5PCEM", t.tech.categories[entry.category]],
  });
}

export default async function TechArticlePage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  const entry = findTechnology(slug);
  const article = entry ? getTechArticle(locale, entry.slug) : undefined;
  if (!entry || !article) {
    notFound();
  }

  const t = getDictionary(locale);
  const copy = getTechCopy(locale);
  const stateLabel: Record<TechState, string> = {
    working: t.status.stateWorking,
    partial: t.status.statePartial,
    deferred: t.status.stateDeferred,
  };
  const related = entry.related
    .map((relatedSlug) => findTechnology(relatedSlug))
    .filter((candidate) => candidate !== undefined);

  return (
    <div className="container-page py-12">
      <JsonLd
        data={[
          techArticleSchema(locale, entry.slug),
          breadcrumbSchema(locale, [
            { name: t.nav.home, path: "/" },
            { name: t.nav.tech, path: "/tech" },
            { name: article.title, path: `/tech/${entry.slug}` },
          ]),
        ]}
      />

      <nav aria-label={t.nav.tech} className="text-sm">
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
              href={localePath(locale, "/tech")}
              className="transition-colors hover:text-accent-400"
            >
              {t.nav.tech}
            </Link>
          </li>
          <li aria-hidden className="text-ink-600">
            /
          </li>
          <li aria-current="page" className="text-ink-200">
            {article.title}
          </li>
        </ol>
      </nav>

      <header className="mt-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${stateClasses[entry.state]}`}
          >
            {stateLabel[entry.state]}
          </span>
          <span className="text-xs uppercase tracking-widest text-ink-400">
            {t.tech.categories[entry.category]}
          </span>
        </div>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-300">
          {article.summary}
        </p>
        <p className="mt-3 text-sm text-ink-400">
          {format(t.tech.updated, {
            date: formatDate(technologyUpdated, locale),
          })}
        </p>
      </header>

      <div className="mt-12 max-w-3xl space-y-12">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-base leading-relaxed text-ink-300"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        <section className="surface p-6">
          <h2 className="text-lg font-semibold text-ink-100">{t.tech.works}</h2>
          <ul className="mt-4 space-y-2.5">
            {article.works.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-ink-300"
              >
                <span
                  aria-hidden
                  className="mt-2 size-1 shrink-0 rounded-full bg-playable"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="surface p-6">
          <h2 className="text-lg font-semibold text-ink-100">{t.tech.gaps}</h2>
          <ul className="mt-4 space-y-2.5">
            {article.gaps.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-ink-300"
              >
                <span
                  aria-hidden
                  className="mt-2 size-1 shrink-0 rounded-full bg-ink-600"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-lg font-semibold text-ink-100">{t.tech.related}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={localePath(locale, `/tech/${item.slug}`)}
                  className="surface block p-4 text-sm font-medium text-ink-100 transition-colors hover:text-accent-400"
                >
                  {copy[item.slug as TechSlug].title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-14 max-w-3xl">
        <Notice title={t.tech.scopeTitle}>{t.tech.scopeBody}</Notice>
        <p className="mt-6">
          <Link
            href={localePath(locale, "/tech")}
            className="text-sm font-medium text-accent-400 hover:text-accent-300"
          >
            {t.tech.back}
          </Link>
        </p>
      </section>
    </div>
  );
}
