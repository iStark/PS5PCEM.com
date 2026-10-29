"use client";

import { useState, type ReactNode } from "react";
import type { HistoryEntry } from "@/data/history";

type Filter = "all" | "vulkan" | "d3d12" | "unknown";
type Run = { id: string; api: HistoryEntry["graphicsApi"]; content: ReactNode };

/** Cards stay server-rendered; the client only selects which runs to show. */
export function RunHistoryFilter({ runs, labels }: {
  runs: Run[];
  labels: { filter: string; all: string; unknown: string; empty: string };
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const options: { key: Filter; label: string }[] = [
    { key: "all", label: labels.all },
    { key: "vulkan", label: "Vulkan" },
    { key: "d3d12", label: "DirectX 12" },
    ...(runs.some((run) => run.api === null) ? [{ key: "unknown" as const, label: labels.unknown }] : []),
  ];
  const matches = (run: Run, value: Filter) => value === "all" || (value === "unknown" ? run.api === null : run.api === value);
  const visible = runs.filter((run) => matches(run, filter));

  return (
    <div className="mt-8">
      <div role="group" aria-label={labels.filter} className="flex flex-wrap items-center gap-2">
        <span className="me-1 text-xs font-medium text-ink-300">{labels.filter}</span>
        {options.map(({ key, label }) => (
          <button key={key} type="button" aria-pressed={filter === key}
            onClick={() => setFilter(key)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 ${filter === key
              ? "border-accent-500 bg-accent-500/15 text-accent-300"
              : "border-ink-700 bg-ink-900 text-ink-300 hover:border-ink-500 hover:text-ink-100"}`}>
            {label} <span className="ms-1 text-xs opacity-70">({runs.filter((run) => matches(run, key)).length})</span>
          </button>
        ))}
      </div>
      <div aria-live="polite" aria-atomic="false">
        {visible.length ? <ol className="mt-8 space-y-6">{visible.map((run) => run.content)}</ol>
          : <p className="surface mt-8 px-5 py-8 text-sm text-ink-300">{labels.empty}</p>}
      </div>
    </div>
  );
}
