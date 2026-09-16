import type { Metadata } from "next";
import {
  latestRelease,
  quickStart,
  releaseHistory,
  systemRequirements,
} from "@/data/release";
import { site } from "@/data/site";
import { formatBytes, formatDate } from "@/lib/format";
import { ButtonLink, Notice, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Download",
  description: `Download PS5PCEM ${latestRelease.version} for Windows x64 — portable ZIP or per-user installer, with SHA-256 checksums and system requirements.`,
};

export default function DownloadPage() {
  return (
    <div className="container-page py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
          Windows x64 · {latestRelease.prerelease ? "Pre-release" : "Release"}
        </p>
        <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl">
          Download PS5PCEM {latestRelease.version}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-300">
          Published {formatDate(latestRelease.publishedAt)}. Every file is served
          from the{" "}
          <a
            href={latestRelease.releaseUrl}
            className="text-accent-400 underline underline-offset-2 hover:text-accent-300"
            rel="noreferrer noopener"
            target="_blank"
          >
            GitHub release
          </a>
          , which is the only place official builds are published.
        </p>
      </header>

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
                  Recommended
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
              {formatBytes(asset.size)}
            </p>
            <ButtonLink
              href={asset.url}
              external
              variant={asset.primary ? "primary" : "secondary"}
              className="mt-5 w-full"
            >
              Download
            </ButtonLink>
          </article>
        ))}
      </section>

      <section className="mt-10 max-w-3xl">
        <Notice title="The binaries are unsigned">
          Windows may show an Unknown Publisher prompt or a Microsoft Defender
          SmartScreen warning. Verify the SHA-256 hash of what you downloaded
          against the table below before running it.
        </Notice>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Verify"
          title="SHA-256 checksums"
          description="On Windows, run certutil -hashfile <file> SHA256 and compare the result with the value here."
        />
        <div className="surface mt-8 overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="border-b border-ink-700 text-xs uppercase tracking-widest text-ink-400">
              <tr>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  File
                </th>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  SHA-256
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
                    <td className="px-5 py-4 align-top font-mono text-xs break-all text-ink-400">
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
            System requirements
          </h2>
          <dl className="mt-5 space-y-4">
            {systemRequirements.map((item) => (
              <div key={item.label} className="border-l-2 border-ink-700 pl-4">
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
          <h2 className="text-xl font-semibold text-ink-100">Quick start</h2>
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
            Games, firmware, keys, system libraries and console software are not
            included, and will never be distributed here.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Also available"
          title="Release notes, source, and older builds"
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={latestRelease.notesUrl} variant="secondary" external>
            Release notes for {latestRelease.version}
          </ButtonLink>
          <ButtonLink href="/extract" variant="secondary">
            PKG extractor
          </ButtonLink>
          <ButtonLink href={site.links.gettingStarted} variant="secondary" external>
            Build from source with Zig
          </ButtonLink>
          <ButtonLink href={site.links.releases} variant="secondary" external>
            All GitHub releases
          </ButtonLink>
        </div>

        <div className="surface mt-8 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="border-b border-ink-700 text-xs uppercase tracking-widest text-ink-400">
              <tr>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Version
                </th>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Published
                </th>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Link
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-800">
              {releaseHistory.map((release) => (
                <tr key={release.tag}>
                  <td className="px-5 py-4 font-medium text-ink-100">
                    {release.version}
                    {release.version === latestRelease.version ? (
                      <span className="ml-2 rounded-full border border-accent-500/40 bg-accent-500/10 px-2 py-0.5 text-xs font-normal text-accent-400">
                        Latest
                      </span>
                    ) : null}
                  </td>
                  <td className="px-5 py-4 text-ink-300">
                    {formatDate(release.publishedAt)}
                  </td>
                  <td className="px-5 py-4">
                    <a
                      href={release.url}
                      className="text-accent-400 underline underline-offset-2 hover:text-accent-300"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      View on GitHub
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
