import Link from "next/link";
import { defaultLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { ButtonLink } from "@/components/ui";

/**
 * Rendered for any unmatched path under a locale. notFound() carries no params,
 * so this page speaks the default language; the header's switcher still works.
 */
export default function NotFound() {
  const locale = defaultLocale;
  const t = getDictionary(locale);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
        {t.notFound.code}
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink-100">
        {t.notFound.heading}
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-ink-300">
        {t.notFound.body}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href={localePath(locale)}>{t.common.backHome}</ButtonLink>
        <ButtonLink href={localePath(locale, "/compatibility")} variant="secondary">
          {t.notFound.compatibilityCta}
        </ButtonLink>
      </div>
      <p className="mt-8 text-sm text-ink-400">
        {t.notFound.sourceHint}{" "}
        <Link
          href={localePath(locale, "/download")}
          className="underline underline-offset-2 hover:text-accent-400"
        >
          {t.notFound.sourceLink}
        </Link>
      </p>
    </div>
  );
}
