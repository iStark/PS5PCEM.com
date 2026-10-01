import Link from "next/link";
import { site } from "@/data/site";
import { type Locale, localePath } from "@/i18n/config";
import { format, getDictionary } from "@/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const sitePages = [
    { href: "/", label: t.nav.home },
    { href: "/download", label: t.nav.download },
    { href: "/compatibility", label: t.nav.compatibility },
    { href: "/status", label: t.nav.status },
    { href: "/media", label: t.nav.media },
    { href: "/extract", label: t.nav.extract },
  ];

  const resources = [
    { href: site.links.docs, label: t.footer.docs },
    { href: site.links.gettingStarted, label: t.footer.buildFromSource },
    { href: site.links.projectStatus, label: t.footer.statusDoc },
    { href: site.links.implementationStatus, label: t.footer.implementationDoc },
    { href: site.links.issues, label: t.footer.reportIssue },
  ];

  const community = [
    { href: site.links.github, label: t.common.github },
    { href: site.links.youtube, label: t.common.youtube },
    { href: site.links.boosty, label: "Boosty" },
    { href: site.links.patreon, label: "Patreon" },
  ];

  return (
    <footer className="mt-24 border-t border-ink-800 bg-ink-900">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="text-base font-semibold text-ink-100">{site.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-400">
            {t.meta.tagline}
          </p>
        </div>

        <FooterColumn title={t.footer.site}>
          {sitePages.map((item) => (
            <li key={item.href}>
              <Link
                href={localePath(locale, item.href)}
                className="text-ink-300 transition-colors hover:text-accent-400"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={t.footer.resources}>
          {resources.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-ink-300 transition-colors hover:text-accent-400"
                rel="noreferrer noopener"
                target="_blank"
              >
                {item.label}
              </a>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={t.footer.community}>
          {community.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-ink-300 transition-colors hover:text-accent-400"
                rel="noreferrer noopener"
                target="_blank"
              >
                {item.label}
              </a>
            </li>
          ))}
        </FooterColumn>
      </div>

      <div className="border-t border-ink-800">
        <div className="container-page flex flex-col gap-3 py-6 text-xs leading-relaxed text-ink-400 md:flex-row md:items-center md:justify-between">
          <p>
            {format(t.footer.licensePre, { author: site.author })}{" "}
            <a
              href="https://github.com/iStark/PS5PCEM/blob/main/LICENSE"
              className="text-ink-300 underline underline-offset-2 hover:text-accent-400"
              rel="noreferrer noopener"
              target="_blank"
            >
              {t.footer.licenseLink}
            </a>
            .
          </p>
          <p className="max-w-xl md:text-end">{t.footer.notAffiliated}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}
