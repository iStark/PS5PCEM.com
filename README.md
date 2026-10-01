# PS5PCEM.com

Official hub for [PS5PCEM](https://github.com/iStark/PS5PCEM), an experimental
PlayStation 5 emulator written in Zig. The site tracks game compatibility,
publishes measured performance results, and links the latest downloads.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.
Every route is statically prerendered.

## Languages

The site speaks the same eight languages as the emulator's launcher, in the same
order (`Language` / `language_labels` in `src/launcher.zig`):

| | | | |
|---|---|---|---|
| `en` English | `ru` Русский | `de` Deutsch | `fr` Français |
| `zh` 简体中文 | `es` Español | `ar` العربية (RTL) | `pt` Português |

Every page lives under a locale prefix — `/ru/compatibility`,
`/ar/games/ghost-of-yotei`. An unprefixed request is redirected by
[src/proxy.ts](src/proxy.ts), which picks the visitor's best match from
`Accept-Language` and falls back to English, so older unprefixed links still
work. Arabic gets `dir="rtl"` on `<html>`, and the layout uses logical CSS
properties (`ms-`, `ps-`, `start-`) so it mirrors correctly.

## Pages

Each route exists once per locale: 6 pages + 16 title pages × 8 languages = 180
prerendered pages.

| Route | Contents |
|---|---|
| `/[locale]` | Overview, current release, compatibility summary, YouTube channel |
| `/[locale]/download` | Latest build, SHA-256 checksums, requirements, quick start, release history |
| `/[locale]/compatibility` | Every title on record with its result, known limits and measured timings |
| `/[locale]/games/[slug]` | Per-title detail: result, what works, what does not, measured performance, the full dated test history, and every capture from those runs |
| `/[locale]/status` | Subsystem-by-subsystem state of the emulator |
| `/[locale]/media` | Recent runs and development captures, each captioned with what it actually shows |
| `/[locale]/extract` | PKG extractor: debug packages, launcher button, what is and is not unpacked |

## Where the content comes from

The site does not invent claims. Its data files mirror the emulator
repository's own documentation, and the test suite pins them to it:

| Site data | Source in the emulator repo |
|---|---|
| `src/data/compatibility.ts` | `docs/project-status.md` — slugs, tiers, captures, confirmation dates |
| `src/data/history.ts` | `docs/development/*.md` and `docs/release-notes/*.md` — one entry per dated run |
| `src/data/subsystems.ts` | `docs/implementation-status.md` |
| `src/data/release.ts` | GitHub release `v0.3.2`, its release notes, and `SHA256SUMS.txt` |
| `src/data/extractor.ts` | `zig-out/bin/pkgextractor.exe` behaviour |
| `public/images/` | `docs/images/` |

The split is deliberate: `src/data/` holds only locale-independent **facts**
(slugs, tiers, dates, file names, image paths, hashes). All **prose** lives in
`src/i18n/`:

| Translations | Contents |
|---|---|
| `src/i18n/config.ts` | Locale list, native names, BCP 47 tags, text direction, path helpers |
| `src/i18n/dictionaries/<locale>.ts` | UI strings; English is the reference shape, so a missing key is a type error |
| `src/i18n/content/<locale>.ts` | Per-title prose and test-history text, keyed by slug and by history id |

The content is written for the site rather than copied from the repository, and
is kept exactly as narrow as the source: a rendered menu is never described as a
playable game, and claims the project withholds stay withheld in all eight
languages (the test suite enforces this for Ghost of Yōtei).

When the emulator publishes a new build or updates `project-status.md`, update
the matching data file and run the tests — several assertions are written to
fail on stale figures.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm test           # Vitest: data integrity + component and page rendering
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run build      # production build
```

## Tests

`npm test` runs five suites, 98 tests:

- **`tests/i18n.test.ts`** — the locale list matches the launcher's eight
  languages in order; Arabic is RTL and everything else LTR; every BCP 47 tag is
  valid; every English key exists in all eight dictionaries with the same
  `{placeholders}`; every title and history entry is translated in every
  language; no translated summary is still the English text; and the
  "not playable" wording survives in all eight languages.
- **`tests/compatibility-data.test.ts`** — pins the dataset to
  `project-status.md`: the exact set of titles, which eight are confirmed
  completable, Ghost of Yōtei graded `ingame` and never `playable`, every
  measured figure in the English source prose, and every referenced capture
  present in `public/`. Also checks the history: unique ids, real slugs, ISO
  dates, release tags, newest-first ordering, and source links that point into
  the emulator repository.
- **`tests/release-data.test.ts`** — every download URL resolves to the matching
  release tag, both binaries carry their published SHA-256 digest, the release
  history is newest first, and the formatting helpers are correct.
- **`tests/compatibility-table.test.tsx`** — filtering, search, expand/collapse,
  alt text on every capture, and that Russian rows link to Russian detail pages.
- **`tests/pages.test.tsx`** — every page renders its data in English and in a
  second language, title pages list each recorded run with its build label and
  report link, an unknown slug calls `notFound()`, the language switcher offers
  all eight languages pointing at the same page, and external links open with
  `rel="noopener"`.

## Updating for a new release

1. Update `latestRelease` and prepend to `releaseHistory` in
   `src/data/release.ts`, with sizes and SHA-256 digests from the release's
   `SHA256SUMS.txt`.
2. Update `src/data/compatibility.ts` from the new `project-status.md`, and copy
   any new captures into `public/images/`.
3. Add an entry to `src/data/history.ts` for each new dated run.
4. Write the prose for anything new in `src/i18n/content/en.ts`, then in the
   other seven content files. TypeScript will not let a locale fall behind.
5. Run `npm test` and fix whatever the pinned assertions report.

### Adding a language

Only if the emulator's launcher adds one. Append it to `locales` in
`src/i18n/config.ts` with its native name, BCP 47 tag and direction, then add
`src/i18n/dictionaries/<code>.ts` and `src/i18n/content/<code>.ts` and register
both in `src/i18n/index.ts`. The routes, sitemap and hreflang alternates follow
automatically.

## License and scope

The site is not affiliated with or endorsed by Sony Interactive Entertainment.
No games, console firmware, system libraries or keys are distributed here. The
emulator itself is licensed under the GNU GPL, version 3 or later.
