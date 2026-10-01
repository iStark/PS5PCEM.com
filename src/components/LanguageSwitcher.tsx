"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  type Locale,
  localeMeta,
  locales,
  localePath,
  stripLocale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n";

/**
 * Switches language while staying on the same page: /ru/compatibility from
 * /en/compatibility. Each option is a real link, so it works without
 * JavaScript and crawlers can follow it.
 */
export function LanguageSwitcher({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const t = getDictionary(locale);
  const rest = stripLocale(pathname ?? "/");

  useEffect(() => {
    if (!open) {
      return;
    }

    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (!container.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={container} className={`relative ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t.common.chooseLanguage}
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-1.5 rounded-md border border-ink-700 px-2.5 py-2 text-sm text-ink-200 transition-colors hover:border-ink-600 hover:text-ink-100"
      >
        <span aria-hidden>🌐</span>
        <span>{localeMeta[locale].nativeName}</span>
      </button>

      <div
        role="menu"
        aria-label={t.common.language}
        hidden={!open}
        className="absolute end-0 z-50 mt-2 w-44 overflow-hidden rounded-lg border border-ink-700 bg-ink-900 py-1 shadow-xl shadow-black/50"
      >
        {locales.map((code) => {
          const active = code === locale;
          return (
            <Link
              key={code}
              role="menuitem"
              href={localePath(code, rest)}
              hrefLang={localeMeta[code].htmlLang}
              lang={localeMeta[code].htmlLang}
              aria-current={active ? "true" : undefined}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2 text-sm transition-colors ${
                active
                  ? "bg-ink-800 text-ink-100"
                  : "text-ink-300 hover:bg-ink-850 hover:text-ink-100"
              }`}
            >
              <span>{localeMeta[code].nativeName}</span>
              <span className="text-xs uppercase text-ink-400">{code}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
