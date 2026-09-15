"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  type CompatibilityEntry,
  type CompatibilityTier,
  tierOrder,
  tiers,
} from "@/data/compatibility";
import { TierBadge } from "@/components/ui";

type Filter = CompatibilityTier | "all";

export function CompatibilityTable({
  entries,
}: {
  entries: CompatibilityEntry[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const matchesTier = filter === "all" || entry.tier === filter;
      const matchesQuery =
        needle.length === 0 ||
        entry.title.toLowerCase().includes(needle) ||
        entry.status.toLowerCase().includes(needle);
      return matchesTier && matchesQuery;
    });
  }, [entries, filter, query]);

  const counts = useMemo(() => {
    const result = new Map<Filter, number>([["all", entries.length]]);
    for (const tier of tierOrder) {
      result.set(
        tier,
        entries.filter((entry) => entry.tier === tier).length,
      );
    }
    return result;
  }, [entries]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by result"
        >
          <FilterButton
            active={filter === "all"}
            count={counts.get("all") ?? 0}
            onClick={() => setFilter("all")}
          >
            All titles
          </FilterButton>
          {tierOrder.map((tier) => {
            const meta = tiers.find((candidate) => candidate.id === tier)!;
            return (
              <FilterButton
                key={tier}
                active={filter === tier}
                count={counts.get(tier) ?? 0}
                onClick={() => setFilter(tier)}
              >
                {meta.shortLabel}
              </FilterButton>
            );
          })}
        </div>

        <div className="lg:w-72">
          <label htmlFor="compat-search" className="sr-only">
            Search titles
          </label>
          <input
            id="compat-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a title…"
            className="w-full rounded-lg border border-ink-700 bg-ink-900 px-3.5 py-2.5 text-sm text-ink-100 placeholder:text-ink-400 focus:border-accent-500 focus:outline-none"
          />
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-400" aria-live="polite">
        Showing {visible.length} of {entries.length} tested titles.
      </p>

      {visible.length === 0 ? (
        <p className="surface mt-6 px-5 py-8 text-center text-sm text-ink-300">
          No tested title matches that search.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {visible.map((entry) => (
            <li key={entry.slug} className="surface overflow-hidden">
              <div className="flex flex-col gap-5 p-5 sm:flex-row">
                {entry.image ? (
                  <div className="shrink-0 overflow-hidden rounded-lg border border-ink-700 sm:w-56">
                    <Image
                      src={entry.image.src}
                      alt={entry.image.alt}
                      width={480}
                      height={270}
                      sizes="(max-width: 640px) 100vw, 224px"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-ink-100">
                      {entry.title}
                    </h3>
                    <TierBadge tier={entry.tier} />
                  </div>

                  <p className="mt-2 text-sm font-medium text-ink-200">
                    {entry.status}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">
                    {entry.headline}
                  </p>

                  {entry.performance ? (
                    <p className="mt-3 border-l-2 border-ink-600 pl-3 text-sm leading-relaxed text-ink-400">
                      {entry.performance}
                    </p>
                  ) : null}

                  <button
                    type="button"
                    aria-expanded={expanded === entry.slug}
                    aria-controls={`details-${entry.slug}`}
                    onClick={() =>
                      setExpanded((current) =>
                        current === entry.slug ? null : entry.slug,
                      )
                    }
                    className="mt-4 text-sm font-medium text-accent-400 hover:text-accent-300"
                  >
                    {expanded === entry.slug
                      ? "Hide full result"
                      : "Full result and known limits"}
                  </button>

                  <div
                    id={`details-${entry.slug}`}
                    hidden={expanded !== entry.slug}
                    className="mt-4 space-y-4 border-t border-ink-700 pt-4"
                  >
                    <DetailBlock label="What was reached">
                      {entry.milestone}
                    </DetailBlock>
                    <DetailBlock label="Known limits">
                      {entry.notes}
                    </DetailBlock>
                    {entry.confirmedOn ? (
                      <p className="text-xs text-ink-400">
                        Confirmed by the maintainer on{" "}
                        <time dateTime={entry.confirmedOn}>
                          {entry.confirmedOn}
                        </time>
                        .
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
      <span className="ml-2 text-xs text-ink-400">{count}</span>
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
