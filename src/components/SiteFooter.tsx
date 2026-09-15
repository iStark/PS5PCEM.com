import Link from "next/link";
import { navigation, site } from "@/data/site";

const resources = [
  { href: site.links.docs, label: "Documentation" },
  { href: site.links.gettingStarted, label: "Building from source" },
  { href: site.links.projectStatus, label: "project-status.md" },
  { href: site.links.implementationStatus, label: "implementation-status.md" },
  { href: site.links.issues, label: "Report an issue" },
];

const community = [
  { href: site.links.github, label: "GitHub" },
  { href: site.links.youtube, label: "YouTube" },
  { href: site.links.boosty, label: "Boosty" },
  { href: site.links.patreon, label: "Patreon" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink-800 bg-ink-900">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="text-base font-semibold text-ink-100">{site.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-400">
            {site.tagline}
          </p>
        </div>

        <FooterColumn title="Site">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-ink-300 transition-colors hover:text-accent-400"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Resources">
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

        <FooterColumn title="Community">
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
            © 2026 {site.author}. {site.name} is licensed under the{" "}
            <a
              href="https://github.com/iStark/PS5PCEM/blob/main/LICENSE"
              className="text-ink-300 underline underline-offset-2 hover:text-accent-400"
              rel="noreferrer noopener"
              target="_blank"
            >
              GNU GPL, version 3 or later
            </a>
            .
          </p>
          <p className="max-w-xl md:text-right">
            Not affiliated with or endorsed by Sony Interactive Entertainment.
            No games, firmware, keys or system libraries are distributed here.
          </p>
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
