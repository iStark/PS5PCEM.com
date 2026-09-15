import type { Metadata } from "next";
import {
  compatibility,
  compatibilityMeta,
  countByTier,
  sortedCompatibility,
  tiers,
} from "@/data/compatibility";
import { site } from "@/data/site";
import { formatDate } from "@/lib/format";
import { CompatibilityTable } from "@/components/CompatibilityTable";
import { Notice, Stat, TierBadge } from "@/components/ui";

export const metadata: Metadata = {
  title: "Game compatibility",
  description:
    "Measured PS5PCEM compatibility results for every tested title: what each one reaches, its known limits, and observed frame timings on the reference test host.",
};

export default function CompatibilityPage() {
  const counts = countByTier();
  const entries = sortedCompatibility();

  return (
    <div className="container-page py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
          Test results
        </p>
        <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl">
          Game compatibility
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-300">
          The furthest repeatable point reached in each observed title, together
          with the limits that stop it going further. Results mirror{" "}
          <a
            href={site.links.projectStatus}
            className="text-accent-400 underline underline-offset-2 hover:text-accent-300"
            rel="noreferrer noopener"
            target="_blank"
          >
            project-status.md
          </a>{" "}
          in the repository.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-400">
          Playability and completion reports were confirmed by the project
          maintainer on {formatDate(compatibilityMeta.confirmedOn)}. Every timing
          refers to the current {compatibilityMeta.host} test host and will
          differ on other hardware. Title content is supplied locally and is not
          distributed with the emulator.
        </p>
      </header>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={String(compatibility.length)} label="Titles tested" />
        <Stat value={String(counts.playable)} label="Playable · Completable" />
        <Stat value={String(counts.ingame)} label="Reach in-game scenes" />
        <Stat
          value={String(counts.intro + counts.boots)}
          label="Boot, intro or menus"
        />
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-ink-100">
          How the results are graded
        </h2>
        <dl className="mt-5 grid gap-4 md:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="flex gap-3.5 rounded-lg border border-ink-800 p-4"
            >
              <TierBadge tier={tier.id} className="mt-0.5" />
              <div>
                <dt className="text-sm font-medium text-ink-100">
                  {tier.label}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-400">
                  {tier.description}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14">
        <h2 className="sr-only">Tested titles</h2>
        <CompatibilityTable entries={entries} />
      </section>

      <div className="mt-14 max-w-3xl">
        <Notice tone="info" title="Results change between builds">
          A milestone recorded on one build is not a guarantee on the next.
          Several entries explicitly need a fresh end-to-end run after renderer
          changes, and those caveats are listed with each title. Report what you
          observe through{" "}
          <a
            href={site.links.issues}
            className="underline underline-offset-2 hover:text-accent-400"
            rel="noreferrer noopener"
            target="_blank"
          >
            GitHub issues
          </a>
          .
        </Notice>
      </div>
    </div>
  );
}
