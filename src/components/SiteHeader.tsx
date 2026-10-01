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
    { href: "/status", label: t.nav.status },
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
    return here.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink-800 bg-ink-950/85 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-4">
        <Link
          href={localePath(locale)}
          className="flex items-center gap-2.5 font-semibold text-ink-100"
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
          className="ms-auto hidden items-center gap-1 lg:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={localePath(locale, item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                isActive(item.href)
                  ? "bg-ink-800 text-ink-100"
                  : "text-ink-300 hover:bg-ink-850 hover:text-ink-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.links.github}
            className="rounded-md px-3 py-2 text-sm text-ink-300 transition-colors hover:bg-ink-850 hover:text-ink-100"
            rel="noreferrer noopener"
            target="_blank"
          >
            {t.common.github}
          </a>
          <LanguageSwitcher locale={locale} className="ms-1" />
          <Link
            href={localePath(locale, "/download")}
            className="ms-1 rounded-md bg-accent-500 px-3.5 py-2 text-sm font-medium text-ink-950 transition-colors hover:bg-accent-400"
          >
            {format(t.common.getVersion, { version: latestRelease.version })}
          </Link>
        </nav>

        <div className="ms-auto flex items-center gap-2 lg:hidden">
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
        className="border-t border-ink-800 bg-ink-950 lg:hidden"
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
