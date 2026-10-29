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
      "PS5PCEM is an experimental PlayStation 5 emulator for Windows and Linux. Follow per-title compatibility, measured performance, and download the current prototype.",
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
      title: "PS5PCEM — experimental PlayStation 5 emulator for Windows and Linux",
      description:
        "Download the PS5PCEM prototype and see which PlayStation 5 titles actually run — measured frame times, known limits and a dated test history for every game.",
    },
    download: {
      title: "Download PS5PCEM {version} for Windows and Linux x64",
      description:
        "PS5PCEM {version} for Windows and Linux: portable archive or per-user installer, published SHA-256 checksums, system requirements and every earlier build.",
    },
    compatibility: {
      title: "PlayStation 5 game compatibility list — PS5PCEM",
      description:
        "Which PS5 games run under PS5PCEM: {total} titles on record, {playable} played to the end, each with measured frame times, known limits and a dated test history.",
    },
    status: {
      title: "Project status — what PS5PCEM can do today",
      description: "PS5PCEM subsystem by subsystem: native guest execution, RDNA2 shader translation, Vulkan and experimental DirectX 12 rendering, audio, controllers, savedata and the Windows and Linux launcher.",
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
    tech: {
      title: "How PS5PCEM works — HLE, AMPR, MSAA, Vulkan and DirectX 12",
      description: "How PS5PCEM implements PlayStation 5 firmware and hardware: HLE, AMPR counters, ACM convolution, MSAA, AGC, RDNA2 shaders, Vulkan, DirectX 12, audio and savedata.",
    },
    launcher: {
      title: "PS5PCEM launcher — library, controls, saves and settings",
      description: "What the PS5PCEM launcher does on Windows and Linux: a 48-game library with search, controller and keyboard profiles, saves, resolution and preset settings, Vulkan or DirectX 12, update checks.",
    },
    languages: {
      title: "Supported languages — PS5PCEM launcher and website",
      description:
        "PS5PCEM speaks twelve languages in the launcher and on this site: English, Russian, German, French, Chinese, Spanish, Arabic, Portuguese, Turkish, Japanese, Hindi and Korean.",
    },
  },

  nav: {
    home: "Home",
    download: "Download",
    compatibility: "Compatibility",
    status: "Project status",
    media: "Media",
    extract: "PKG extractor",
    tech: "Technology",
    games: "Titles",
    launcher: "Launcher",
    languages: "Languages",
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
    lead: "PS5PCEM is an experimental emulator written in Zig: guest code runs natively, RDNA2 shaders are translated for Vulkan or the experimental DirectX 12 backend, and a Windows and Linux launcher ties it together. {playable} of the {total} titles on record have been finished end to end.",
    ctaDownload: "Download {version}",
    ctaResults: "See the test results",
    requirements:
      "Linux / Windows 10 2004 or newer · x86-64-v3 · Vulkan 1.2 driver · GPL-3.0-or-later",
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
    tryHeading: "Try {version} on Windows and Linux",
    tryLead:
      "Portable archive or per-user installer, both with published SHA-256 checksums. Linux: DEB, RPM, Pacman, AppImage.",
    tryDownload: "Download",
    trySource: "Source on GitHub",
    launcherEyebrow: "Launcher",
    launcherHeading: "One launcher, twelve languages",
    launcherLead:
      "The launcher keeps up to {capacity} games with their covers, controller and keyboard profiles, saves and display settings, and checks Vulkan and new releases. Its interface speaks {count} languages; Turkish, Japanese, Hindi and Korean arrived after {version}.",
    launcherCta: "About the launcher",
    languagesCta: "Supported languages",
    launcherImageAlt: "PS5PCEM launcher settings page with twelve language cards",
    graphicsEyebrow: "Graphics APIs",
    graphicsHeading: "Two renderers: Vulkan and DirectX 12",
    graphicsLead: "Both execute the same AGC command stream and start from the same RDNA2 shader translation. Pick one under Graphics API in the launcher settings; the choice applies on the next launch.",
    graphicsDefault: "Default",
    graphicsExperimental: "Experimental",
    graphicsPlatforms: "Platforms",
    vulkanBody: "Every game result and frame time on this site was measured with Vulkan. It keeps render targets, storage images and pipelines resident, detiles textures on the GPU, and handles depth, stencil and MSAA. It needs a Vulkan 1.2 driver.",
    d3d12Body: "A native Windows backend added after {version}, so far only in development builds. Shaders go from SPIR-V through SPIRV-Cross to HLSL and Shader Model 5.1, while execution and presentation use D3D12 and DXGI directly. Compute and simple draws pass hardware checks, but games do not run through it yet: play with Vulkan.",
    vulkanCta: "How the Vulkan renderer works",
    d3d12Cta: "How the DirectX 12 backend works",
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
      "Each entry names the release that includes the reported changes. Work not yet included in a published release is marked as a development build. Dates and FPS remain those of the original runs.",
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
    changesLauncher: "Native Linux packages and a GTK 3 launcher join the signed Windows builds. Both launchers offer a 48-game library, search, table view and update checks.",
    changesFeatures: "Includes 15 newly documented titles, Subnautica/Quake II/Jets audio fixes, shared graphics optimizations, Windows vibration and game-controlled LightBar.",
    changesLimits: "Screenshots and FPS retain their original dates and limits. Linux is experimental; Windows game results do not establish Linux performance. Windows EXEs use the previous timestamped certificate.",
    linuxNote: "Linux requires glibc 2.31+, Linux 5.11+, GTK 3, X11/XWayland, PulseAudio and a Vulkan 1.2 driver. These system libraries are also required for the AppImage. Controller feedback remains Windows-only.",
    linuxGuide: "Linux installation and limitations",
    eyebrow: "Windows / Linux x64 · {channel}",
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
    techCta: "How these pieces work",
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

  tech: {
    eyebrow: "Implementation",
    heading: "How PS5PCEM works",
    lead: "Each page is one mechanism the emulator actually runs: what the console does, what the Zig code does, and what is still missing.",
    scopeTitle: "What these pages are",
    scopeBody:
      "The text follows the architecture notes and the October 2026 reports in the PS5PCEM repository. A focused test passing is not a new frame rate and not a new playthrough.",
    categories: {
      firmware: "Firmware and HLE",
      graphics: "Graphics",
      audio: "Audio and video",
      platform: "CPU, loader and tools",
    },
    read: "How it works",
    works: "What is implemented",
    gaps: "What is still missing",
    related: "Related mechanisms",
    back: "All technologies",
    updated: "Repository notes through {date}",
  },

  launcher: {
    eyebrow: "Launcher · Windows and Linux",
    heading: "The PS5PCEM launcher",
    lead: "The launcher is where a session starts. It keeps your game library, checks the graphics driver, stores input and display preferences, extracts debug packages and starts game-run with those settings. Windows has a native Win32 interface; Linux has a GTK 3 version with the same pages.",
    settingsCaption: "Settings in the development build after {version}: twelve interface languages, output resolution, preset, three switches and the graphics API.",
    settingsAlt: "Launcher settings page with language cards, output resolution, preset, toggles and the Vulkan / DirectX 12 graphics API card",
    pagesEyebrow: "Four pages",
    pagesHeading: "What each page does",
    library: {
      title: "Library",
      body: "Holds up to {capacity} games. Each shows its name from sce_sys/param.json and its cover from sce_sys/icon0.png. Switch between grid and table, search by name, title ID or folder, and remove an entry without touching the game files or its saves. Below the covers sit the game folder, the graphics API and the FPS limit, then Choose folder, Extract PKG and Launch game.",
    },
    controls: {
      title: "Controls",
      body: "Pick Gamepad, Keyboard as DualSense, or both at once. On Windows a DualSense or DualShock 4 is read directly over USB or Bluetooth, and Xbox-compatible pads use XInput slots 1–4. Each DualSense button can be bound to a key; WASD drives the left stick and Alt + arrows the right one. Test runs a second of rumble and a light-bar colour sweep.",
    },
    saves: {
      title: "Saves",
      body: "Lists every local save slot, grouped by title ID, whichever game is selected, and opens the save folder. Saves live in savedata/<titleId>/<slot>/ in the emulator's home and are shared with direct command-line runs.",
    },
    settings: {
      title: "Settings",
      body: "Interface language, output resolution ({resolutions}, 1080p by default), the Speed or Graphics rendering preset, sound output, an FPS counter in the game window title, the game's performance mode when it offers one, and the graphics API: Vulkan or the experimental DirectX 12. Resolution, preset and API apply on the next launch.",
    },
    libraryCaption: "The English library in a development build after {version}: Vulkan / DirectX 12, FPS limits and separate Extract PKG / Extract ZAR buttons.",
    libraryAlt: "English launcher library with eight game covers, Vulkan / DirectX 12, FPS limits and separate PKG and ZAR extraction buttons",
    controlsCaption:
      "Controls in Hybrid mode with a DualSense connected and the default key bindings.",
    controlsAlt:
      "Launcher controls page with gamepad, keyboard and hybrid cards and the key binding list",
    startEyebrow: "Before the game",
    startHeading: "What happens when you press Launch",
    vulkanTitle: "Vulkan is checked, not assumed",
    vulkanBody:
      "At startup the launcher asks the Vulkan loader for an instance and a device. It shows the GPU name and API version, or says that the runtime is missing, that no device was found, or that the driver is below 1.2.",
    launchTitle: "Finding the game",
    launchBody:
      "It looks for eboot.bin in the chosen folder and in its decrypted subfolder, then starts game-run with the whole folder mounted as /app0.",
    failureTitle: "When Windows refuses",
    failureBody:
      "If Windows will not start game-run.exe, the launcher explains the likely cause — Smart App Control, security software, denied access or a damaged file — and keeps the Windows error number for bug reports.",
    updateTitle: "Update check",
    updateBody:
      "Check for updates asks GitHub Releases for the newest published version and links to it when it is newer. On Linux this uses curl.",
    envEyebrow: "Under the hood",
    envHeading: "What the launcher passes to game-run",
    envLead:
      "Preferences reach the runner as environment variables, so a direct command-line run behaves the same when you set them yourself.",
    envVariable: "Variable",
    envValues: "Values",
    envMeaning: "Meaning",
    env: {
      input: "Input source: controller, keyboard or both",
      controller: "XInput slot",
      keymap: "Keyboard binding for each DualSense button, as virtual-key codes",
      resolution: "Output resolution chosen in Settings",
      preset: "Speed or Graphics rendering preset",
      gamePreset: "Asks for the game's performance mode when the switch is on",
      fps: "Shows the measured frame rate in the window title",
      audio: "Turns host sound output off; AudioOut timing is kept",
      graphicsApi: "Renderer for this run: Vulkan by default, or the experimental Windows-only DirectX 12 backend (dx12 is also accepted).",
      fpsLimit: "Frame-rate cap for this run: 30, 60 or 120; 0 or unset leaves it uncapped.",
    },
    storageEyebrow: "Settings file",
    storageHeading: "Where preferences are stored",
    storageWindows:
      "Windows: ps5pcem.ini next to ps5pcem.exe, in both the portable archive and the per-user installation. Saves, logs and caches sit beside it.",
    storageLinux:
      "Linux packages and the AppImage: {settings} for preferences, and {data} for saves, logs and caches.",
    timelineEyebrow: "History",
    timelineHeading: "How the launcher grew",
    timelineLead:
      "Each line names the first published release that contained the change.",
    timeline: {
      alpha1:
        "First Windows launcher: an eight-game library with cover art, a saves browser, and controller, keyboard and hybrid input, in English, Russian, German and French.",
      alpha4:
        "Simplified Chinese, Spanish, Arabic and Portuguese join the interface; Arabic reads right to left.",
      beta1:
        "Output resolution and the Speed/Graphics preset; Vulkan is checked at startup instead of assumed.",
      v032: "Extract PKG, with pkgextractor shipped beside the launcher; the running release is shown.",
      v033: "Extraction progress and log inside the launcher; the switch for the game's performance mode.",
      v034: "Explanations for launch failures: Smart App Control, security software, denied access and damaged files.",
      v035: "A 48-game library with grid and table views, search and update checks; a native GTK 3 launcher for Linux.",
      development:
        "Turkish, Japanese, Hindi and Korean; the language picker becomes two rows of six.",
      graphicsApi: "A Graphics API choice in Settings: Vulkan by default or the experimental native DirectX 12 backend on Windows. Linux stays on Vulkan.",
      fpsLimit: "An FPS limit on the Library page: 30, 60, 120 or Unlimited, applied to every completed flip with either renderer.",
    },
    linuxEyebrow: "Linux",
    linuxHeading: "The Linux launcher",
    linuxBody:
      "Since 0.3.5 a GTK 3, Cairo and Pango launcher draws the same pages and phrases as the Windows one and keeps the same settings. Keyboard input works; Sony HID and XInput controllers, vibration and LightBar remain Windows features. Linux is experimental, and Windows game results are not Linux results.",
    linuxGuide: "Linux installation guide",
    languagesTitle: "Twelve interface languages",
    languagesBody:
      "Every page, status line and error explanation is translated. See which language arrived in which release and how to switch.",
    languagesCta: "Supported languages",
    docsCta: "Launcher notes in the repository",
    graphicsEyebrow: "Graphics API",
    graphicsHeading: "Vulkan or DirectX 12",
    graphicsBody: "Settings has a Graphics API card. The choice is saved as graphics_api=vulkan or graphics_api=d3d12 in ps5pcem.ini and reaches game-run as PS5_GRAPHICS_API on the next launch. Vulkan is the default. DirectX 12 is marked experimental in every language, and the sidebar shows it in place of the Vulkan status.",
    graphicsLinux: "The Linux launcher always starts Vulkan. The runner refuses DirectX 12 there, and refuses an unknown API name before it loads a title.",
    graphicsFailure: "If DirectX 12 cannot start, or a game sends GPU work the backend does not support yet, the run stops and prints the reason. It never switches to Vulkan behind your back.",
    graphicsAlt: "The Graphics API card in the launcher settings with DirectX 12 selected and the note that it is experimental",
    graphicsCaption: "The Graphics API card in the development build after {version}, with DirectX 12 selected.",
    fpsEyebrow: "FPS limit",
    fpsHeading: "Lock the frame rate at 30, 60 or 120",
    fpsBody: "Next to the graphics API, the Library page offers an FPS limit of 30, 60 or 120, or Unlimited, which is the default. The choice is saved as fps_limit in ps5pcem.ini and reaches game-run as PS5_FPS_LIMIT on the next launch.",
    fpsHow: "The limit holds every completed flip to its slot, whether the game flips from the CPU or from its GPU command stream, so the game itself slows down rather than only the window, with Vulkan or DirectX 12. A late frame is not delayed further and does not earn a catch-up burst. On Windows the wait uses a high-resolution timer, because the default 15.6 ms system tick cannot hold a 16.7 ms frame.",
    fpsMeasured: "On an RTX 3070 Ti, the Asterix & Obelix: Slap Them All! title screen runs at several hundred FPS without a limit. With it, one-second samples held 29.9–30.0, 59.9–60.0 and 119.8–120.0 FPS, including when the game was started from the launcher.",
    fpsAlt: "The bottom of the launcher library: the game folder, the graphics API and the FPS limit set to 60",
    fpsCaption: "The FPS limit in the development build after {version}, set to 60.",
  },

  languages: {
    eyebrow: "Localization",
    heading: "Supported languages",
    lead: "The launcher and this site speak the same twelve languages, in the same order. {released} of them are in release {version}; Turkish, Japanese, Hindi and Korean arrived in the development build that follows it.",
    imageAlt: "Launcher settings page in Japanese with all twelve language cards",
    imageCaption:
      "The language picker in the development build after {version}: twelve cards in two rows of six, here with Japanese selected.",
    tableHeading: "Languages at a glance",
    tableLead:
      "The launcher ID is the number saved as language=<ID> in ps5pcem.ini.",
    colLanguage: "Language",
    colName: "Name in {language}",
    colId: "Launcher ID",
    colSince: "In the launcher since",
    colDirection: "Direction",
    colSite: "This site",
    ltr: "Left to right",
    rtl: "Right to left",
    switchEyebrow: "Switching",
    switchHeading: "How to change the language",
    launcherTitle: "In the launcher",
    launcherBody:
      "Open Settings and choose a card under Language. The choice applies at once to every page, status line and error explanation and is saved as language=<ID> in ps5pcem.ini. New languages are added at the end, so an ID saved by an older version keeps its meaning.",
    siteTitle: "On this site",
    siteBody:
      "Use the language menu in the header. Every page exists in all twelve languages at its own address: English without a prefix, the others under {prefixes}.",
    detailsEyebrow: "Details",
    detailsHeading: "Worth knowing",
    rtlTitle: "Arabic reads right to left",
    rtlBody:
      "In the launcher, Arabic labels use right-to-left paragraph direction; centred buttons stay centred, and file paths and key names keep their own direction. This site mirrors its whole layout for Arabic.",
    fontsTitle: "Fonts",
    fontsBody:
      "On Windows the launcher draws with Segoe UI, and Windows supplies Chinese, Japanese, Korean and Devanagari glyphs through its font fallback. On Linux, Pango chooses fonts through fontconfig: if a script shows up as boxes, install Noto Sans CJK and Noto Sans Devanagari or equivalent fonts.",
    gamesTitle: "Games keep their own language",
    gamesBody:
      "The interface language does not change what a game sees. The emulator currently reports English (US) as the console's system language to every title, whatever the launcher shows.",
    scopeTitle: "What is translated",
    scopeBody:
      "Every launcher phrase: navigation, library, controls, saves, settings, status lines, extraction messages and launch-failure explanations. Game names, folder paths, controller button and key names, the GPU name and log output appear as they are.",
    reportTitle: "Spotted a wrong word?",
    reportBody:
      "The Turkish, Japanese, Hindi and Korean translations are new. Report wording problems through GitHub issues, with a screenshot and the phrase that reads wrong.",
    reportCta: "Open an issue",
    launcherCta: "About the launcher",
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
