import type { Metadata } from "next";
import Image from "next/image";
import { captures } from "@/data/gallery";
import { site } from "@/data/site";
import { ButtonLink, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Development captures from PS5PCEM, each captioned with exactly what it shows, plus the project's YouTube channel of recorded runs.",
};

export default function MediaPage() {
  const [hero, ...rest] = captures;

  return (
    <div className="container-page py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
          Captures
        </p>
        <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl">
          See it running
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-300">
          Every capture below was produced by the emulator itself. Each caption
          states exactly what the frame is, so a render milestone is never read
          as a gameplay claim.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={site.links.youtube} external>
            Watch on YouTube
          </ButtonLink>
          <ButtonLink href="/compatibility" variant="secondary">
            Compatibility results
          </ButtonLink>
        </div>
      </header>

      <section className="mt-14">
        <figure className="surface overflow-hidden">
          <Image
            src={hero.src}
            alt={hero.alt}
            width={1920}
            height={1080}
            priority
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="w-full border-b border-ink-700 object-cover"
          />
          <figcaption className="p-6">
            <p className="text-base font-semibold text-ink-100">{hero.title}</p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-300">
              {hero.caption}
            </p>
          </figcaption>
        </figure>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Gallery"
          title="Development captures"
          description="Ordered roughly by how far each title gets — playable titles first, then in-game scenes, menus and early render milestones."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {rest.map((capture) => (
            <figure key={capture.src} className="surface overflow-hidden">
              <Image
                src={capture.src}
                alt={capture.alt}
                width={1280}
                height={720}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="aspect-video w-full border-b border-ink-700 object-cover"
              />
              <figcaption className="p-5">
                <p className="text-sm font-semibold text-ink-100">
                  {capture.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">
                  {capture.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="surface flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-ink-100">
              Recorded runs on YouTube
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-300">
              Stills cannot show frame pacing. The channel posts full runs of
              the titles tracked on this site, so you can judge for yourself how
              fast each build actually is.
            </p>
          </div>
          <ButtonLink href={site.links.youtube} external>
            @PS5PCEM
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
