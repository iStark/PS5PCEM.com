/**
 * English is the reference dictionary: its shape is the `Dictionary` type that
 * every other locale must satisfy, so a missing key is a compile error rather
 * than a blank space on a page.
 *
 * {placeholders} are filled by format() in src/i18n/index.ts.
 */
const en = {
  meta: {
    tagline: "Experimental PlayStation 5 emulation research, written in Zig",
    description:
      "PS5PCEM is an experimental PlayStation 5 emulator for Windows. Follow per-title compatibility, measured performance, and download the current prototype.",
  },

  common: {
    skipToContent: "Skip to content",
    menu: "Menu",
    close: "Close",
    language: "Language",
    chooseLanguage: "Choose a language",
    github: "GitHub",
    youtube: "YouTube",
    getVersion: "Get {version}",
    published: "Published {date}",
    latest: "Latest",
    recommended: "Recommended",
    readReport: "Read the report",
    developmentBuild: "Development build",
    release: "Release {version}",
    moreCaptures: "More captures",
    backHome: "Back to the home page",
  },

  seo: {
    home: {
      title: "PS5PCEM — experimental PlayStation 5 emulator for Windows",
      description:
        "Download the PS5PCEM prototype and see which PlayStation 5 titles actually run — measured frame times, known limits and a dated test history for every game.",
    },
    download: {
      title: "Download PS5PCEM {version} for Windows x64",
      description:
        "PS5PCEM {version} for Windows: portable archive or per-user installer, published SHA-256 checksums, system requirements and every earlier build.",
    },
    compatibility: {
      title: "PlayStation 5 game compatibility list — PS5PCEM",
      description:
        "Which PS5 games run under PS5PCEM: {total} titles on record, {playable} played to the end, each with measured frame times, known limits and a dated test history.",
    },
    status: {
      title: "Project status — what PS5PCEM can do today",
      description:
        "PS5PCEM subsystem by subsystem: native guest execution, RDNA2 shader translation to SPIR-V, Vulkan rendering, audio, controllers, savedata and the Windows launcher.",
    },
    media: {
      title: "Screenshots and recorded runs — PS5PCEM",
      description:
        "Development captures produced by PS5PCEM itself, each captioned with exactly what it shows, plus the YouTube channel of full recorded runs.",
    },
    extract: {
      title: "PKG extractor for PS5 debug packages — PS5PCEM",
      description:
        "pkgextractor ships with PS5PCEM {version}: unpack observed PS5 debug FPKG layouts, inner PFS, NAPS mappings and Kraken blocks. Encrypted retail packages are not supported.",
    },
  },

  nav: {
    home: "Home",
    download: "Download",
    compatibility: "Compatibility",
    status: "Project status",
    media: "Media",
    extract: "PKG extractor",
    games: "Titles",
  },

  tiers: {
    playable: {
      label: "Playable · Completable",
      short: "Playable",
      description:
        "The maintainer finished the title. Picture, sound and input behave correctly in the runs that were recorded, although frame rate still depends on the scene and the hardware.",
    },
    ingame: {
      label: "Reaches in-game scenes",
      short: "In-game",
      description:
        "Loaded gameplay or in-engine scenes appear on screen, but no playthrough is claimed — frame rate, loading times or untested input stand in the way.",
    },
    intro: {
      label: "Intro and menus render",
      short: "Intro / menus",
      description:
        "The title draws its intro, logos, artwork or menus through the guest render graph. Gameplay has either not been reached or not been verified.",
    },
    boots: {
      label: "Boots and loads assets",
      short: "Boots",
      description:
        "Modules link and the engine bootstrap makes progress, but nothing is claimed about a frame reaching the screen.",
    },
  },

  home: {
    badge: "Early prototype · {version}",
    heading: "PlayStation 5 emulation research, in the open",
    lead: "PS5PCEM is an experimental emulator written in Zig: guest code runs natively, RDNA2 shaders are translated to SPIR-V, Vulkan presents the result, and a Windows launcher ties it together. {playable} of the {total} titles on record have been finished end to end.",
    ctaDownload: "Download {version}",
    ctaResults: "See the test results",
    requirements:
      "Windows 10 2004 or newer · x86-64-v3 · Vulkan 1.2 driver · GPL-3.0-or-later",
    heroCaption:
      "Cat Quest III, drawn by PS5PCEM on the reference host. Confirmed playable from start to finish.",
    statTested: "Titles on record",
    statTestedHint: "Tested on {release}",
    statPlayable: "Finished end to end",
    statPlayableHint: "Confirmed by the maintainer",
    statIngame: "Reach in-game scenes",
    statIngameHint: "Gameplay on screen",
    statEarly: "Boot, intro or menus",
    statEarlyHint: "Earlier milestones",
    featuresEyebrow: "Where it stands",
    featuresHeading: "A prototype, openly measured",
    featuresLead:
      "Guest code executes natively, RDNA2 shaders become SPIR-V, and Vulkan puts frames on screen. Several titles can be played to the end; others stop at a menu or a loading screen. Each result below says which, and on what build.",
    resultsEyebrow: "Test results",
    resultsHeading: "Compatibility at a glance",
    resultsLead:
      "Each result was observed by the maintainer on an {host}. Timings describe that machine and will differ on yours. Open a title for its full test history.",
    resultsCta: "All {total} results",
    youtubeEyebrow: "Watch it run",
    youtubeHeading: "Recorded runs on the YouTube channel",
    youtubeLead:
      "A still frame cannot show pacing. The channel records the titles tracked here as they actually run, which is the honest way to judge a build that renders correctly but slowly.",
    youtubeCta: "Open the YouTube channel",
    youtubeBrowse: "Browse the captures",
    legalTitle: "Use only content you are entitled to use",
    legalBody:
      "No games, console firmware, system libraries, keys or vendor material are shipped with PS5PCEM or offered here. The project exists for interoperability research and education. The full",
    legalLink: "legal note",
    tryHeading: "Try {version} on Windows",
    tryLead:
      "Portable archive or per-user installer, both with published SHA-256 checksums.",
    tryDownload: "Download",
    trySource: "Source on GitHub",
  },

  compatibility: {
    eyebrow: "Test results",
    heading: "Title compatibility",
    lead: "How far each observed title gets, and what stops it going further. These results follow {source} in the emulator repository.",
    sourceLabel: "the status document",
    meta: "Playthrough reports carry the date the maintainer confirmed them. Every timing refers to the {host} development machine and will differ on other hardware. Game content is supplied locally and is never distributed here.",
    gradingHeading: "How results are graded",
    titlesHeading: "Titles on record",
    showing: "Showing {shown} of {total} titles.",
    filterAll: "All titles",
    searchLabel: "Search titles",
    searchPlaceholder: "Search a title…",
    empty: "No title on record matches that search.",
    expand: "Full result and known limits",
    collapse: "Hide full result",
    whatReached: "What was reached",
    knownLimits: "Known limits",
    performance: "Measured",
    confirmedOn: "Confirmed by the maintainer on {date}.",
    detailCta: "Test history and captures",
    noticeTitle: "Results belong to the build that produced them",
    noticeBody:
      "A milestone recorded on one build is not a promise about the next, and several entries say outright that they need a fresh run after renderer changes. If what you see differs, report it through",
    noticeLink: "GitHub issues",
  },

  game: {
    backToList: "All titles",
    overviewHeading: "Where it stands",
    strengthsHeading: "What works",
    limitsHeading: "What does not",
    performanceHeading: "Measured performance",
    historyHeading: "Test history",
    historyLead:
      "Every recorded run for this title, newest first. Entries marked as a development build were never published as a release.",
    historyEmpty: "No individual runs have been written up for this title yet.",
    capturesHeading: "Captures",
    capturesLead:
      "Frames produced by the emulator itself during the runs above.",
    statusLabel: "Result",
    confirmedLabel: "Confirmed",
    buildLabel: "Build",
    hostLabel: "Test host",
    runsLabel: "Recorded runs",
    otherTitles: "Other titles",
    metaTitle: "{title} compatibility",
    metaDescription:
      "How {title} behaves under PS5PCEM: current result, known limits, measured frame timings and the full dated test history.",
    notFound: "No title on record has that name.",
  },

  download: {
    changesHeading: "Changes in {version}",
    changesLauncher: "Important fix: games start from packaged launchers again. The working-directory error is corrected; launch failures now display the Windows message and error code.",
    changesFeatures: "New: FreeType fonts and the Jurassic Park startup fix, MemoryPool, PNG encoding, RTC functions, AMPR counters, packed-color blending, horizontal gathers and bounded shader calls.",
    changesLimits: "Executables use the same signing certificate as the previous release. Captures are dated development results; instruction tests do not establish new game FPS or completed playthroughs.",
    eyebrow: "Windows x64 · {channel}",
    channelRelease: "Release",
    channelPrerelease: "Pre-release",
    heading: "Download PS5PCEM {version}",
    lead: "Published {date}. Every file comes from the {link}, which is the only place official builds appear.",
    leadLink: "GitHub release",
    verifyEyebrow: "Verify",
    verifyHeading: "SHA-256 checksums",
    verifyLead:
      "On Windows, run certutil -hashfile <file> SHA256 and compare the output with the value here.",
    tableFile: "File",
    tableHash: "SHA-256",
    tableVersion: "Version",
    tablePublished: "Published",
    tableLink: "Link",
    viewOnGitHub: "View on GitHub",
    download: "Download",
    signingTitle: "About the signature",
    signingBody:
      "The executables and the installer carry a SHA-256 Authenticode signature from Artur Strazewicz / PS5PCEM, timestamped. The certificate is self-signed, so Windows or SmartScreen can still warn you. Checking the hash below is the reliable test.",
    requirementsHeading: "System requirements",
    quickStartHeading: "Getting started",
    noContentNote:
      "Games, firmware, keys, system libraries and console software are not included, and will not be distributed here.",
    alsoEyebrow: "Also available",
    alsoHeading: "Release notes, source and earlier builds",
    releaseNotesCta: "Release notes for {version}",
    buildFromSource: "Build from source with Zig",
    allReleases: "Every GitHub release",
  },

  status: {
    eyebrow: "Build {version} · {date}",
    heading: "Project status",
    lead: "What the emulator can do, subsystem by subsystem. Per-title milestones live on the {link}; this page is the engineering behind them.",
    leadLink: "compatibility page",
    summaryBuild: "Current build",
    summaryTitles: "Titles on record",
    summaryTitlesValue: "{playable} of {total} finished",
    summaryTitlesHint: "Newest confirmation {date}",
    summaryHost: "Reference host",
    summaryHostHint: "Every timing on this site",
    subsystemsEyebrow: "Subsystems",
    subsystemsHeading: "Where each part stands",
    subsystemsLead:
      "Condensed from the implementation status document, which carries the complete list.",
    stateWorking: "Working",
    statePartial: "Partial",
    stateDeferred: "Deferred",
    notClaimedTitle: "What is deliberately not claimed",
    notClaimedBody:
      "A menu is not gameplay, and a rendered frame is not playability. Some titles draw correctly but far too slowly to play, and they are recorded that way. Nothing here claims a milestone that was not observed on a build.",
    deeperEyebrow: "Go deeper",
    deeperHeading: "Documentation in the repository",
    deeperLead:
      "Subsystem internals — RDNA2, GPU, Vulkan, memory, loader, HLE, CPU, diagnostics and runtime — are indexed in the architecture documentation.",
    implementationCta: "Implementation status",
    statusDocCta: "Status and compatibility",
    docsCta: "Documentation index",
    issuesCta: "Open issues",
    supportHeading: "Support development",
    supportBody:
      "PS5PCEM is GPL-3.0-or-later and developed in the open. Boosty and Patreon are the two ways to back the work.",
  },

  media: {
    eyebrow: "Captures",
    heading: "See it running",
    lead: "Every frame below came out of the emulator. Each caption says what it actually is, so a rendering milestone is never mistaken for a playable game.",
    youtubeCta: "Watch on YouTube",
    compatibilityCta: "Compatibility results",
    galleryEyebrow: "Gallery",
    galleryHeading: "Development captures",
    galleryLead:
      "Ordered by how far each title reaches: finished titles first, then in-game scenes, menus and early rendering milestones.",
    timelineEyebrow: "Timeline",
    timelineHeading: "Recent runs",
    timelineLead:
      "The newest recorded runs across every title, each linked to its full test history.",
    youtubeHeading: "Recorded runs on YouTube",
    youtubeBody:
      "Stills cannot show frame pacing. The channel posts complete runs of the titles tracked here, so you can judge a build for yourself.",
  },

  extract: {
    checkTitle: "GTA III: complete package extraction",
    checkBody: "The October 2 development extractor fixes InvalidPfs for GTA III: The Definitive Edition (PPSA03527 v1.007). All 48 files extract, including eboot.bin, six modules and both PAK archives; both PAK index checksums match. All 21 package tests pass. The game was not launched. This fix is in the development source and local tool; published release downloads are unchanged.",
    checkLink: "Read the extraction report",
    eyebrow: "Bundled tool",
    heading: "PKG extractor",
    lead: "Since {version} the launcher ships pkgextractor.exe beside it, and an Extract PKG button that drives it.",
    supportedHeading: "What it handles",
    notSupportedHeading: "What it does not",
    usageHeading: "How to use it",
    noticeTitle: "Retail packages are out of scope",
    noticeBody:
      "The extractor reads the debug FPKG layouts that were observed during development. Encrypted retail packages are not supported, and no keys are included or implied.",
  },

  footer: {
    site: "Site",
    resources: "Resources",
    community: "Community",
    docs: "Documentation",
    buildFromSource: "Building from source",
    statusDoc: "Status document",
    implementationDoc: "Implementation status",
    reportIssue: "Report an issue",
    licensePre: "© 2026 {author}. PS5PCEM is licensed under the",
    licenseLink: "GNU GPL, version 3 or later",
    notAffiliated:
      "Not affiliated with, or endorsed by, Sony Interactive Entertainment. No games, firmware, keys or system libraries are distributed here.",
  },

  notFound: {
    code: "404",
    heading: "That page does not exist",
    body: "The link is probably out of date. Downloads, compatibility results and project status are all still where you would expect them.",
    compatibilityCta: "Compatibility",
    sourceHint: "Looking for the source?",
    sourceLink: "Downloads and build instructions",
  },
};

/**
 * The reference shape. Values widen to `string` deliberately: every other
 * locale must supply the same keys, not the same text.
 */
export type Dictionary = typeof en;

export default en;
