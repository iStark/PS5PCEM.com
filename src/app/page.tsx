import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { latestRelease } from "@/data/release";
import {
  compatibility,
  compatibilityMeta,
  countByTier,
  sortedCompatibility,
  tiers,
} from "@/data/compatibility";
import { highlights } from "@/data/subsystems";
import { formatDate } from "@/lib/format";
import { ButtonLink, Notice, SectionHeading, Stat, TierBadge } from "@/components/ui";

export default function HomePage() {
  const counts = countByTier();
  const featured = sortedCompatibility().slice(0, 6);

  return (
    <>
      <Hero />

      <section className="container-page mt-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            value={String(compatibility.length)}
            label="Titles tested"
            hint={`On release ${compatibilityMeta.testedOnRelease}`}
          />
          <Stat
            value={String(counts.playable)}
            label="Playable and completable"
            hint="Played through by the maintainer"
          />
          <Stat
            value={String(counts.ingame)}
            label="Reach in-game scenes"
            hint="Rendering loaded gameplay"
          />
          <Stat
            value={String(counts.intro + counts.boots)}
            label="Boot, intro or menus"
            hint="Early milestones"
          />
        </div>
      </section>

      <section className="container-page mt-24">
        <SectionHeading
          eyebrow="What exists today"
          title="A prototype, not a product"
          description="PS5PCEM runs guest code natively, translates RDNA2 shaders to SPIR-V, and presents through Vulkan. A growing number of tested titles reach gameplay and several are already completable, but compatibility, performance, graphics, audio and stability still vary by title and by hardware."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {highlights.map((item) => (
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

      <section className="container-page mt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Test results"
            title="Compatibility at a glance"
            description={`Every result below was observed by the project maintainer on an ${compatibilityMeta.host} test host. Playability and completion reports were confirmed on ${formatDate(compatibilityMeta.confirmedOn)}.`}
          />
          <ButtonLink href="/compatibility" variant="secondary">
            All {compatibility.length} results
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((entry) => (
            <article key={entry.slug} className="surface flex flex-col overflow-hidden">
              {entry.image ? (
                <Image
                  src={entry.image.src}
                  alt={entry.image.alt}
                  width={640}
                  height={360}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="aspect-video w-full border-b border-ink-700 object-cover"
                />
              ) : (
                <div className="aspect-video w-full border-b border-ink-700 bg-ink-850" />
              )}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-ink-100">
                    {entry.title}
                  </h3>
                  <TierBadge tier={entry.tier} />
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-300">
                  {entry.headline}
                </p>
              </div>
            </article>
          ))}
        </div>

        <dl className="mt-10 grid gap-4 md:grid-cols-2">
          {tiers.map((tier) => (
            <div key={tier.id} className="flex gap-3.5 rounded-lg border border-ink-800 p-4">
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

      <section className="container-page mt-24">
        <div className="surface overflow-hidden">
          <div className="grid gap-8 p-8 lg:grid-cols-2 lg:items-center lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
                Watch it run
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink-100">
                Development captures on YouTube
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-300">
                The channel posts recorded runs of the titles listed on this
                site — intro playback, menus, and the scenes each build reaches.
                Video shows what a still screenshot cannot: how fast a frame
                actually arrives.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href={site.links.youtube} external>
                  Open the YouTube channel
                </ButtonLink>
                <ButtonLink href="/media" variant="secondary">
                  Browse screenshots
                </ButtonLink>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-ink-700">
              <Image
                src="/images/yotei-intro-video.png"
                alt="A Ghost of Yotei intro frame decoded and presented by PS5PCEM"
                width={1280}
                height={720}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-video w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page mt-24">
        <Notice title="Use only content you are legally entitled to use">
          PS5PCEM ships no games, console firmware, system libraries, keys or
          copyrighted material belonging to the hardware vendor. It exists for
          interoperability research and education. Read the full{" "}
          <a
            href={site.links.legal}
            className="underline underline-offset-2 hover:text-accent-400"
            rel="noreferrer noopener"
            target="_blank"
          >
            legal note
          </a>
          .
        </Notice>
      </section>

      <section className="container-page mt-16">
        <div className="surface flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-ink-100">
              Try {latestRelease.version} on Windows
            </h2>
            <p className="mt-2 text-sm text-ink-300">
              Published {formatDate(latestRelease.publishedAt)}. Portable ZIP or
              per-user installer, with SHA-256 checksums.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/download">Download</ButtonLink>
            <ButtonLink href={site.links.github} variant="secondary" external>
              Source on GitHub
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

function Hero() {
  const counts = countByTier();

  return (
    <section className="relative overflow-hidden border-b border-ink-800">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_32rem_at_50%_-10%,rgba(59,149,255,0.16),transparent)]"
      />
      <div className="container-page relative grid gap-12 py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900 px-3 py-1 text-xs text-ink-300">
            <span className="size-1.5 rounded-full bg-intro" />
            Early prototype · {latestRelease.version}
          </p>

          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl lg:text-6xl">
            PlayStation 5 emulation research, in the open
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
            PS5PCEM is an experimental emulator written in Zig: native guest
            execution, RDNA2 shader translation, Vulkan rendering, and a Windows
            launcher. {counts.playable} of the {compatibility.length} tested
            titles have been played through to the end.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/download">
              Download {latestRelease.version}
            </ButtonLink>
            <ButtonLink href="/compatibility" variant="secondary">
              See the test results
            </ButtonLink>
          </div>

          <p className="mt-6 text-sm text-ink-400">
            Windows 10 2004 or newer · x86-64 · Vulkan 1.2 driver ·{" "}
            <span className="text-ink-300">GPL-3.0-or-later</span>
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-ink-700 shadow-2xl shadow-black/50">
            <Image
              src="/images/cat-quest-iii-world.png"
              alt="Cat Quest III island gameplay with HUD, mountains and blue sea rendered by PS5PCEM"
              width={1920}
              height={1080}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full object-cover"
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink-400">
            Cat Quest III — opening island, rendered by PS5PCEM. Confirmed
            playable and completable.{" "}
            <Link
              href="/media"
              className="underline underline-offset-2 hover:text-accent-400"
            >
              More captures
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
