"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, site } from "@/data/site";
import { latestRelease } from "@/data/release";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-800 bg-ink-950/85 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-4">
        <Link
          href="/"
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
          aria-label="Main"
          className="ml-auto hidden items-center gap-1 md:flex"
        >
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-ink-800 text-ink-100"
                    : "text-ink-300 hover:bg-ink-850 hover:text-ink-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={site.links.github}
            className="ml-2 rounded-md px-3 py-2 text-sm text-ink-300 transition-colors hover:bg-ink-850 hover:text-ink-100"
            rel="noreferrer noopener"
            target="_blank"
          >
            GitHub
          </a>
          <Link
            href="/download"
            className="ml-1 rounded-md bg-accent-500 px-3.5 py-2 text-sm font-medium text-ink-950 transition-colors hover:bg-accent-400"
          >
            Get {latestRelease.version}
          </Link>
        </nav>

        <button
          type="button"
          className="ml-auto rounded-md border border-ink-700 px-3 py-2 text-sm text-ink-200 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!open}
        className="border-t border-ink-800 bg-ink-950 md:hidden"
      >
        <ul className="container-page flex flex-col py-2">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
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
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
