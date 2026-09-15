import Link from "next/link";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
        404
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink-100">
        That page does not exist
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-ink-300">
        The link may be out of date. The download, compatibility results and
        project status are all still where you expect them.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Back to the home page</ButtonLink>
        <ButtonLink href="/compatibility" variant="secondary">
          Compatibility
        </ButtonLink>
      </div>
      <p className="mt-8 text-sm text-ink-400">
        Looking for the source?{" "}
        <Link
          href="/download"
          className="underline underline-offset-2 hover:text-accent-400"
        >
          Downloads and build instructions
        </Link>
      </p>
    </div>
  );
}
