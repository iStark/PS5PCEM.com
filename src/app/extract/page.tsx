import type { Metadata } from "next";
import Link from "next/link";
import {
  extractor,
  extractorLimits,
  extractorSteps,
  extractorWrites,
} from "@/data/extractor";
import { site } from "@/data/site";
import { ButtonLink, Notice, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "PKG extractor",
  description:
    "How PS5PCEM's pkgextractor reads a PS5 debug package (FPKG / FIH), writes sce_sys metadata and eboot.bin, and what it will not unpack.",
};

export default function ExtractPage() {
  return (
    <div className="container-page py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
          {extractor.binary}
        </p>
        <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl">
          {extractor.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-300">
          {extractor.summary} The emulator itself still launches from a folder
          that contains <code className="text-ink-100">eboot.bin</code>, the same
          layout used for dumped titles.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/download">Download the build</ButtonLink>
          <ButtonLink href={site.links.github} external variant="secondary">
            Source on GitHub
          </ButtonLink>
        </div>
      </header>

      <section className="mt-14">
        <Notice title="Debug packages only">
          A PS5 debug FPKG starts with the FIH magic (<code>\x7FFIH</code>, signed
          byte 0x00). Retail images are recognised and refused. This is not a
          DRM circumvention tool.
        </Notice>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Usage"
          title="Launcher button or command line"
          description="pkgextractor.exe sits next to ps5pcem.exe. The Library tab calls it; you can also run it yourself."
        />
        <ol className="mt-10 space-y-4">
          {extractorSteps.map((step, index) => (
            <li key={step.title} className="surface p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                Step {index + 1}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-ink-100">
                {step.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
        <pre className="surface mt-8 overflow-x-auto p-5 font-mono text-sm text-ink-200">
          <code>{extractor.cli}</code>
        </pre>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Writes"
            title="What lands in the output folder"
          />
          <ul className="mt-8 space-y-3 text-sm leading-relaxed text-ink-300">
            {extractorWrites.map((item) => (
              <li key={item} className="border-l-2 border-ink-700 pl-4">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeading
            eyebrow="Limits"
            title="What this first version does not do"
          />
          <ul className="mt-8 space-y-3 text-sm leading-relaxed text-ink-300">
            {extractorLimits.map((item) => (
              <li key={item} className="border-l-2 border-ink-700 pl-4">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="mt-16 max-w-3xl text-sm leading-relaxed text-ink-400">
        Use only packages you are legally entitled to access. Game content is
        not included with the emulator. See the{" "}
        <Link
          href={site.links.legal}
          className="text-accent-400 underline underline-offset-2 hover:text-accent-300"
        >
          legal notes
        </Link>{" "}
        in the repository.
      </p>
    </div>
  );
}
