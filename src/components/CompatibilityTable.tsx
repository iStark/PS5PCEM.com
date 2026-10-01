"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { type CompatibilityTier, tierOrder } from "@/data/compatibility";
import type { Locale } from "@/i18n/config";
import { format, getDictionary } from "@/i18n";
import { TierBadge } from "@/components/ui";

/** One row, with every string already resolved in the visitor's language. */
export type CompatibilityRow = {
  slug: string;
  title: string;
  tier: CompatibilityTier;
  status: string;
  headline: string;
  summary: string;
  strengths: readonly string[];
  limits: readonly string[];
  performance?: string;
  image?: string;
  imageAlt?: string;
  confirmedOn?: string;
  href: string;
  runs: number;
};

type Filter = CompatibilityTier | "all";

export function CompatibilityTable({
  locale,
  rows,
}: {
  locale: Locale;
  rows: CompatibilityRow[];
}) {
  const t = getDictionary(locale);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(locale);
    return rows.filter((row) => {
      const matchesTier = filter === "all" || row.tier === filter;
      const matchesQuery =
        needle.length === 0 ||
        row.title.toLocaleLowerCase(locale).includes(needle) ||
        row.status.toLocaleLowerCase(locale).includes(needle);
      return matchesTier && matchesQuery;
    });
  }, [rows, filter, query, locale]);

  const counts = useMemo(() => {
    const result = new Map<Filter, number>([["all", rows.length]]);
    for (const tier of tierOrder) {
      result.set(tier, rows.filter((row) => row.tier === tier).length);
    }
    return result;
  }, [rows]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label={t.compatibility.gradingHeading}
        >
          <FilterButton
            active={filter === "all"}
            count={counts.get("all") ?? 0}
            onClick={() => setFilter("all")}
          >
            {t.compatibility.filterAll}
          </FilterButton>
          {tierOrder.map((tier) => (
            <FilterButton
              key={tier}
              active={filter === tier}
              count={counts.get(tier) ?? 0}
              onClick={() => setFilter(tier)}
            >
              {t.tiers[tier].short}
            </FilterButton>
          ))}
        </div>

        <div className="lg:w-72">
          <label htmlFor="compat-search" className="sr-only">
            {t.compatibility.searchLabel}
          </label>
          <input
            id="compat-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.compatibility.searchPlaceholder}
            className="w-full rounded-lg border border-ink-700 bg-ink-900 px-3.5 py-2.5 text-sm text-ink-100 placeholder:text-ink-400 focus:border-accent-500 focus:outline-none"
          />
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-400" aria-live="polite">
        {format(t.compatibility.showing, {
          shown: visible.length,
          total: rows.length,
        })}
      </p>

      {visible.length === 0 ? (
        <p className="surface mt-6 px-5 py-8 text-center text-sm text-ink-300">
          {t.compatibility.empty}
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {visible.map((row) => (
            <li key={row.slug} className="surface overflow-hidden">
              <div className="flex flex-col gap-5 p-5 sm:flex-row">
                {row.image ? (
                  <Link
                    href={row.href}
                    className="shrink-0 overflow-hidden rounded-lg border border-ink-700 sm:w-56"
                  >
                    <Image
                      src={row.image}
                      alt={row.imageAlt ?? row.title}
                      width={480}
                      height={270}
                      sizes="(max-width: 640px) 100vw, 224px"
                      className="h-full w-full object-cover"
                    />
                  </Link>
                ) : null}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-ink-100">
                      <Link href={row.href} className="hover:text-accent-400">
                        {row.title}
                      </Link>
                    </h3>
                    <TierBadge tier={row.tier} locale={locale} />
                  </div>

                  <p className="mt-2 text-sm font-medium text-ink-200">
                    {row.status}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">
                    {row.headline}
                  </p>

                  {row.performance ? (
                    <p className="mt-3 border-s-2 border-ink-600 ps-3 text-sm leading-relaxed text-ink-400">
                      {row.performance}
                    </p>
                  ) : null}

                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <button
                      type="button"
                      aria-expanded={expanded === row.slug}
                      aria-controls={`details-${row.slug}`}
                      onClick={() =>
                        setExpanded((current) =>
                          current === row.slug ? null : row.slug,
                        )
                      }
                      className="text-sm font-medium text-accent-400 hover:text-accent-300"
                    >
                      {expanded === row.slug
                        ? t.compatibility.collapse
                        : t.compatibility.expand}
                    </button>
                    <Link
                      href={row.href}
                      className="text-sm font-medium text-ink-300 hover:text-accent-400"
                    >
                      {t.compatibility.detailCta}
                      <span className="ms-1 text-xs text-ink-400">
                        ({row.runs})
                      </span>
                    </Link>
                  </div>

                  <div
                    id={`details-${row.slug}`}
                    hidden={expanded !== row.slug}
                    className="mt-4 space-y-4 border-t border-ink-700 pt-4"
                  >
                    <DetailBlock label={t.compatibility.whatReached}>
                      {row.summary}
                    </DetailBlock>
                    {row.limits.length > 0 ? (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                          {t.compatibility.knownLimits}
                        </p>
                        <ul className="mt-1.5 space-y-1.5">
                          {row.limits.map((limit) => (
                            <li
                              key={limit}
                              className="flex gap-2.5 text-sm leading-relaxed text-ink-300"
                            >
                              <span
                                aria-hidden
                                className="mt-2 size-1.5 shrink-0 rounded-full bg-intro"
                              />
                              {limit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {row.confirmedOn ? (
                      <p className="text-xs text-ink-400">
                        {format(t.compatibility.confirmedOn, {
                          date: row.confirmedOn,
                        })}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterButton({
  active,
  count,
  onClick,
  children,
}: {
  active: boolean;
  count: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-lg border px-3.5 py-2 text-sm transition-colors ${
        active
          ? "border-accent-500 bg-accent-500/12 text-ink-100"
          : "border-ink-700 bg-ink-900 text-ink-300 hover:border-ink-600 hover:text-ink-100"
      }`}
    >
      {children}
      <span className="ms-2 text-xs text-ink-400">{count}</span>
    </button>
  );
}

function DetailBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">
        {label}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-300">{children}</p>
    </div>
  );
}
