import type { Metadata } from "next";
import Link from "next/link";
import {
  subsystemStateLabel,
  subsystems,
  type SubsystemState,
} from "@/data/subsystems";
import { compatibility, compatibilityMeta, countByTier } from "@/data/compatibility";
import { latestRelease } from "@/data/release";
import { site } from "@/data/site";
import { formatDate } from "@/lib/format";
import { ButtonLink, Notice, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Project status",
  description:
    "Where PS5PCEM stands subsystem by subsystem: guest execution, AGC command streams, RDNA2 shader translation, Vulkan rendering, audio, input, savedata and the launcher.",
};

const stateClasses: Record<SubsystemState, string> = {
  working: "border-playable/40 bg-playable/10 text-playable",
  partial: "border-intro/40 bg-intro/10 text-intro",
  deferred: "border-boots/40 bg-boots/10 text-boots",
};

export default function StatusPage() {
  const counts = countByTier();

  return (
    <div className="container-page py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
          Release {latestRelease.version} · {formatDate(latestRelease.publishedAt)}
        </p>
        <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl">
          Project status
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-300">
          What the emulator can do, subsystem by subsystem. The observed title
          milestones live on the{" "}
          <Link
            href="/compatibility"
            className="text-accent-400 underline underline-offset-2 hover:text-accent-300"
          >
            compatibility page
          </Link>
          ; this page is the detail behind them.
        </p>
      </header>

      <section className="mt-12">
        <div className="surface grid gap-6 p-7 sm:grid-cols-3">
          <SummaryItem
            label="Current build"
            value={latestRelease.version}
            hint={latestRelease.prerelease ? "Pre-release" : "Stable"}
          />
          <SummaryItem
            label="Titles tested"
            value={`${counts.playable} of ${compatibility.length} completable`}
            hint={`Confirmed ${formatDate(compatibilityMeta.confirmedOn)}`}
          />
          <SummaryItem
            label="Reference host"
            value={compatibilityMeta.host}
            hint="Every timing on this site"
          />
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Subsystems"
          title="Where each part of the emulator stands"
          description="Condensed from implementation-status.md in the repository, which carries the complete list."
        />

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
                  {subsystemStateLabel[subsystem.state]}
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
        <Notice title="What is deliberately not claimed">
          Reaching a menu is not gameplay, and rendering a frame is not
          playability. Several titles render correctly but far too slowly to
          play, and those are recorded as such. Nothing on this site claims a
          milestone that has not been observed on a build.
        </Notice>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Go deeper"
          title="Documentation in the repository"
          description="Subsystem internals — RDNA2, GPU, Vulkan, memory, loader, HLE, CPU, diagnostics and runtime — are indexed in the architecture documentation."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={site.links.implementationStatus} variant="secondary" external>
            Implementation status
          </ButtonLink>
          <ButtonLink href={site.links.projectStatus} variant="secondary" external>
            Project status and compatibility
          </ButtonLink>
          <ButtonLink href={site.links.docs} variant="secondary" external>
            Documentation index
          </ButtonLink>
          <ButtonLink href={site.links.issues} variant="secondary" external>
            Open issues
          </ButtonLink>
        </div>
      </section>

      <section className="mt-16">
        <div className="surface flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-ink-100">
              Support development
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-300">
              PS5PCEM is GPL-3.0-or-later and developed in the open. Development
              can be supported through Boosty or Patreon.
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
