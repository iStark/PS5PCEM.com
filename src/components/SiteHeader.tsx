"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/data/site";
import { latestRelease } from "@/data/release";
import { type Locale, localePath, stripLocale } from "@/i18n/config";
import { format, getDictionary } from "@/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = getDictionary(locale);
  const here = stripLocale(pathname ?? "/");

  const navigation = [
    { href: "/", label: t.nav.home },
    { href: "/download", label: t.nav.download },
    { href: "/compatibility", label: t.nav.compatibility },
    { href: "/launcher", label: t.nav.launcher },
    { href: "/status", label: t.nav.status },
    { href: "/tech", label: t.nav.tech },
    { href: "/media", label: t.nav.media },
    { href: "/extract", label: t.nav.extract },
  ];

  function isActive(href: string) {
    if (href === "/") {
      return here === "/";
    }
    // /games/<slug> keeps the Compatibility tab lit.
    if (href === "/compatibility") {
      return here.startsWith("/compatibility") || here.startsWith("/games");
    }
    if (href === "/tech") {
      return here.startsWith("/tech");
    }
    return here.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink-800 bg-ink-950/85 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-4">
        <Link
          href={localePath(locale)}
          className="flex shrink-0 items-center gap-2.5 font-semibold text-ink-100"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/ps5pcem-icon-256.png"
            alt=""
            width={32}
            height={32}
            className="rounded-md"
            priority
          />
          <span className="tracking-tight">{site.name}</span>
        </Link>

        <nav
          aria-label={t.nav.home}
          className="ms-auto hidden items-center gap-0.5 xl:flex 2xl:gap-1"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={localePath(locale, item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`whitespace-nowrap rounded-md px-2.5 py-2 text-sm transition-colors 2xl:px-3 ${
                isActive(item.href)
                  ? "bg-ink-800 text-ink-100"
                  : "text-ink-300 hover:bg-ink-850 hover:text-ink-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {/* Twelve languages leave no room for the word here; the mark keeps
              the link visible and the label keeps it named. */}
          <a
            href={site.links.github}
            aria-label={t.common.github}
            title={t.common.github}
            className="rounded-md p-2 text-ink-300 transition-colors hover:bg-ink-850 hover:text-ink-100"
            rel="noreferrer noopener"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
          <LanguageSwitcher locale={locale} className="ms-1" />
          <Link
            href={localePath(locale, "/download")}
            className="ms-1 whitespace-nowrap rounded-md bg-accent-500 px-3.5 py-2 text-sm font-medium text-ink-950 transition-colors hover:bg-accent-400"
          >
            {format(t.common.getVersion, { version: latestRelease.version })}
          </Link>
        </nav>

        <div className="ms-auto flex items-center gap-2 xl:hidden">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            className="rounded-md border border-ink-700 px-3 py-2 text-sm text-ink-200"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? t.common.close : t.common.menu}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label={t.nav.home}
        hidden={!open}
        className="border-t border-ink-800 bg-ink-950 xl:hidden"
      >
        <ul className="container-page flex flex-col py-2">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={localePath(locale, item.href)}
                className="block rounded-md px-2 py-2.5 text-sm text-ink-200 hover:bg-ink-850"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={site.links.github}
              className="block rounded-md px-2 py-2.5 text-sm text-ink-200 hover:bg-ink-850"
              rel="noreferrer noopener"
              target="_blank"
            >
              {t.common.github}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
