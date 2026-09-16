# PS5PCEM.com

Official hub for [PS5PCEM](https://github.com/iStark/PS5PCEM), an experimental
PlayStation 5 emulator written in Zig. The site tracks game compatibility,
publishes measured performance results, and links the latest downloads.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.
Every route is statically prerendered.

## Pages

| Route | Contents |
|---|---|
| `/` | Overview, current release, compatibility summary, YouTube channel |
| `/download` | Latest build, SHA-256 checksums, requirements, quick start, release history |
| `/extract` | PKG extractor: FIH debug packages, launcher button, what is and is not unpacked |
| `/compatibility` | Every tested title with its result, known limits and measured timings |
| `/status` | Subsystem-by-subsystem state of the emulator |
| `/media` | Development captures, each captioned with what it actually shows |

## Where the content comes from

The site does not invent claims. Its data files mirror the emulator
repository's own documentation, and the test suite pins them to it:

| Site data | Source in the emulator repo |
|---|---|
| `src/data/compatibility.ts` | `docs/project-status.md` |
| `src/data/subsystems.ts` | `docs/implementation-status.md` |
| `src/data/release.ts` | GitHub release `v0.3.1-beta.1` and `SHA256SUMS.txt` |
| `src/data/gallery.ts` | `docs/project-status.md` screenshots |
| `public/images/` | `docs/images/` |

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

`npm test` runs four suites:

- **`tests/compatibility-data.test.ts`** — pins the compatibility dataset to
  `project-status.md`: the exact set of tested titles, which five are confirmed
  completable, the measured frame timings, and the claims the project
  deliberately does *not* make (Ghost of Yōtei is not playable, Tetris Effect
  claims neither a menu nor gameplay). Also verifies every referenced
  screenshot exists in `public/`.
- **`tests/release-data.test.ts`** — checks that every download URL resolves to
  the matching GitHub release tag, that both binaries carry their published
  SHA-256 digest, that the release history is ordered newest first, and that
  the formatting helpers are correct.
- **`tests/compatibility-table.test.tsx`** — filtering, search, the
  expand/collapse behaviour of each result, and alt text on every screenshot.
- **`tests/pages.test.tsx`** — each page renders its data: download links open
  externally with `rel="noopener"`, the legal and unsigned-binary notices are
  present, and the footer carries the license and non-affiliation notice.

## Updating for a new release

1. Update `latestRelease` and prepend to `releaseHistory` in
   `src/data/release.ts`, including sizes and SHA-256 digests from the
   release's `SHA256SUMS.txt`.
2. Update `src/data/compatibility.ts` from the new `project-status.md`, and
   copy any new screenshots into `public/images/`.
3. Run `npm test` and fix whatever the pinned assertions report.

## License and scope

The site is not affiliated with or endorsed by Sony Interactive Entertainment.
No games, console firmware, system libraries or keys are distributed here. The
emulator itself is licensed under the GNU GPL, version 3 or later.
