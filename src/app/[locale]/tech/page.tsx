import type { Metadata } from "next";
import Link from "next/link";
import {
  techCategories,
  technologiesIn,
  technologyUpdated,
  type TechSlug,
  type TechState,
} from "@/data/technologies";
import {
  locales,
  localePath,
  toLocale,
} from "@/i18n/config";
import { format, getDictionary, getTechCopy } from "@/i18n";
import { formatDate } from "@/lib/format";
import { Notice, SectionHeading } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, techIndexSchema, webPageSchema } from "@/lib/schema";

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
    path: "/tech",
    title: t.seo.tech.title,
    description: t.seo.tech.description,
    keywords: [
      "PS5PCEM HLE",
      "PS5PCEM AMPR",
      "PS5PCEM ACM",
      "PS5PCEM MSAA",
      "RDNA2 SPIR-V",
      "PS5 emulator architecture",
    ],
  });
}

const stateClasses: Record<TechState, string> = {
  working: "border-playable/40 bg-playable/10 text-playable",
  partial: "border-intro/40 bg-intro/10 text-intro",
  deferred: "border-boots/40 bg-boots/10 text-boots",
};

export default async function TechIndexPage({ params }: PageProps) {
  const locale = toLocale((await params).locale);
  const t = getDictionary(locale);
  const copy = getTechCopy(locale);
  const stateLabel: Record<TechState, string> = {
    working: t.status.stateWorking,
    partial: t.status.statePartial,
    deferred: t.status.stateDeferred,
  };

  return (
    <div className="container-page py-16">
      <JsonLd
        data={[
          webPageSchema(locale, {
            path: "/tech",
            name: t.seo.tech.title,
            description: t.seo.tech.description,
          }),
          techIndexSchema(locale),
          breadcrumbSchema(locale, [
            { name: t.nav.home, path: "/" },
            { name: t.nav.tech, path: "/tech" },
          ]),
        ]}
      />
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
          {t.tech.eyebrow}
        </p>
        <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl">
          {t.tech.heading}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-300">{t.tech.lead}</p>
        <p className="mt-3 text-sm text-ink-400">
          {format(t.tech.updated, {
            date: formatDate(technologyUpdated, locale),
          })}
        </p>
      </header>

      {techCategories.map((category) => (
        <section key={category} className="mt-16">
          <SectionHeading title={t.tech.categories[category]} />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {technologiesIn(category).map((entry) => {
              const article = copy[entry.slug as TechSlug];
              return (
                <article key={entry.slug} className="surface flex flex-col p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-ink-100">
                      <Link
                        href={localePath(locale, `/tech/${entry.slug}`)}
                        className="hover:text-accent-400"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <span
                      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-xs font-medium ${stateClasses[entry.state]}`}
                    >
                      {stateLabel[entry.state]}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-300">
                    {article.summary}
                  </p>
                  <Link
                    href={localePath(locale, `/tech/${entry.slug}`)}
                    className="mt-4 text-sm font-medium text-accent-400 hover:text-accent-300"
                  >
                    {t.tech.read}
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <section className="mt-16 max-w-3xl">
        <Notice title={t.tech.scopeTitle}>{t.tech.scopeBody}</Notice>
      </section>
    </div>
  );
}
