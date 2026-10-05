import type { Dictionary } from "./en";

const de: Dictionary = {
  meta: {
    tagline: "Experimentelle PlayStation-5-Emulationsforschung, in Zig geschrieben",
    description:
      "PS5PCEM ist ein experimenteller PlayStation-5-Emulator für Windows. Verfolgen Sie die Kompatibilität einzelner Titel, gemessene Leistungswerte und laden Sie den aktuellen Prototyp herunter.",
  },

  common: {
    skipToContent: "Zum Inhalt springen",
    menu: "Menü",
    close: "Schließen",
    language: "Sprache",
    chooseLanguage: "Sprache wählen",
    github: "GitHub",
    youtube: "YouTube",
    getVersion: "{version} holen",
    published: "Veröffentlicht am {date}",
    latest: "Aktuell",
    recommended: "Empfohlen",
    readReport: "Bericht lesen",
    developmentBuild: "Entwicklungsbuild",
    release: "Version {version}",
    moreCaptures: "Weitere Aufnahmen",
    backHome: "Zurück zur Startseite",
  },

  seo: {
    home: {
      title: "PS5PCEM — experimenteller PlayStation-5-Emulator für Windows",
      description:
        "Laden Sie den PS5PCEM-Prototyp herunter und sehen Sie, welche PlayStation-5-Titel wirklich laufen: gemessene Bildzeiten, bekannte Grenzen und eine datierte Testhistorie je Spiel.",
    },
    download: {
      title: "PS5PCEM {version} für Windows x64 herunterladen",
      description:
        "PS5PCEM {version} für Windows: portables Archiv oder Installation je Benutzer, veröffentlichte SHA-256-Prüfsummen, Systemanforderungen und alle früheren Builds.",
    },
    compatibility: {
      title: "Kompatibilitätsliste für PlayStation-5-Spiele — PS5PCEM",
      description:
        "Welche PS5-Spiele unter PS5PCEM laufen: {total} erfasste Titel, {playable} durchgespielt, jeweils mit gemessenen Bildzeiten, bekannten Grenzen und datierter Testhistorie.",
    },
    status: {
      title: "Projektstand — was PS5PCEM heute kann",
      description:
        "PS5PCEM Teilsystem für Teilsystem: native Gastausführung, RDNA2-Shaderübersetzung nach SPIR-V, Vulkan-Darstellung, Ton, Controller, Spielstände und der Windows-Launcher.",
    },
    media: {
      title: "Screenshots und aufgezeichnete Läufe — PS5PCEM",
      description:
        "Aufnahmen, die PS5PCEM selbst erzeugt hat, jede mit einer Beschriftung, was sie wirklich zeigt, dazu der YouTube-Kanal mit vollständigen Läufen.",
    },
    extract: {
      title: "PKG-Entpacker für PS5-Debug-Pakete — PS5PCEM",
      description:
        "pkgextractor liegt PS5PCEM {version} bei: entpackt beobachtete PS5-Debug-FPKG-Layouts, inneres PFS, NAPS-Zuordnungen und Kraken-Blöcke. Verschlüsselte Handelspakete werden nicht unterstützt.",
    },
  },

  nav: {
    home: "Start",
    download: "Download",
    compatibility: "Kompatibilität",
    status: "Projektstand",
    media: "Medien",
    extract: "PKG-Entpacker",
    games: "Titel",
  },

  tiers: {
    playable: {
      label: "Spielbar · Durchspielbar",
      short: "Spielbar",
      description:
        "Der Entwickler hat den Titel beendet. Bild, Ton und Eingabe verhalten sich in den aufgezeichneten Läufen korrekt, auch wenn die Bildrate weiterhin von Szene und Hardware abhängt.",
    },
    ingame: {
      label: "Erreicht Spielszenen",
      short: "Im Spiel",
      description:
        "Geladenes Spielgeschehen oder Engine-Szenen erscheinen auf dem Bildschirm, ein Durchspielen wird aber nicht behauptet: Bildrate, Ladezeiten oder ungeprüfte Eingabe stehen im Weg.",
    },
    intro: {
      label: "Intro und Menüs werden gezeichnet",
      short: "Intro / Menüs",
      description:
        "Der Titel zeichnet Intro, Logos, Artwork oder Menüs über den Gast-Renderpfad. Das Spielgeschehen wurde entweder nicht erreicht oder nicht überprüft.",
    },
    boots: {
      label: "Startet und lädt Daten",
      short: "Startet",
      description:
        "Module werden gebunden und der Engine-Start kommt voran, über ein Bild auf dem Schirm wird aber nichts behauptet.",
    },
  },

  home: {
    badge: "Früher Prototyp · {version}",
    heading: "PlayStation-5-Emulationsforschung, offen einsehbar",
    lead: "PS5PCEM ist ein experimenteller Emulator in Zig: Gastcode läuft nativ, RDNA2-Shader werden nach SPIR-V übersetzt, Vulkan zeigt das Ergebnis, und ein Windows-Launcher hält alles zusammen. {playable} von {total} erfassten Titeln wurden vollständig durchgespielt.",
    ctaDownload: "{version} herunterladen",
    ctaResults: "Testergebnisse ansehen",
    requirements:
      "Windows 10 2004 oder neuer · x86-64-v3 · Vulkan-1.2-Treiber · GPL-3.0-or-later",
    heroCaption:
      "Cat Quest III, von PS5PCEM auf dem Referenzrechner gezeichnet. Von Anfang bis Ende bestätigt spielbar.",
    statTested: "Erfasste Titel",
    statTestedHint: "Getestet auf {release}",
    statPlayable: "Vollständig beendet",
    statPlayableHint: "Vom Entwickler bestätigt",
    statIngame: "Erreichen Spielszenen",
    statIngameHint: "Spielgeschehen auf dem Schirm",
    statEarly: "Start, Intro oder Menüs",
    statEarlyHint: "Frühere Etappen",
    featuresEyebrow: "Wo es steht",
    featuresHeading: "Ein Prototyp mit offenen Messwerten",
    featuresLead:
      "Gastcode läuft nativ, RDNA2-Shader werden zu SPIR-V, Vulkan bringt Bilder auf den Schirm. Mehrere Titel lassen sich durchspielen, andere bleiben an einem Menü oder Ladebildschirm hängen. Jedes Ergebnis unten sagt, was zutrifft, und auf welchem Build.",
    resultsEyebrow: "Testergebnisse",
    resultsHeading: "Kompatibilität im Überblick",
    resultsLead:
      "Jedes Ergebnis wurde vom Entwickler auf einem {host} beobachtet. Die Zeiten beschreiben diesen Rechner und werden auf Ihrem abweichen. Öffnen Sie einen Titel für seine vollständige Testhistorie.",
    resultsCta: "Alle {total} Ergebnisse",
    youtubeEyebrow: "In Bewegung sehen",
    youtubeHeading: "Aufgezeichnete Läufe auf dem YouTube-Kanal",
    youtubeLead:
      "Ein Einzelbild zeigt kein Bildtempo. Der Kanal zeigt die hier erfassten Titel so, wie sie wirklich laufen — der ehrliche Weg, einen Build zu beurteilen, der korrekt aber langsam zeichnet.",
    youtubeCta: "YouTube-Kanal öffnen",
    youtubeBrowse: "Aufnahmen durchsehen",
    legalTitle: "Nutzen Sie nur Inhalte, zu denen Sie berechtigt sind",
    legalBody:
      "Weder Spiele noch Konsolen-Firmware, Systembibliotheken, Schlüssel oder Herstellermaterial werden mit PS5PCEM ausgeliefert oder hier angeboten. Das Projekt dient der Interoperabilitätsforschung und der Bildung. Der vollständige",
    legalLink: "Rechtshinweis",
    tryHeading: "{version} unter Windows ausprobieren",
    tryLead:
      "Portables Archiv oder Installation für den aktuellen Benutzer, beide mit veröffentlichten SHA-256-Prüfsummen.",
    tryDownload: "Herunterladen",
    trySource: "Quellcode auf GitHub",
  },

  compatibility: {
    eyebrow: "Testergebnisse",
    heading: "Titelkompatibilität",
    lead: "Wie weit jeder beobachtete Titel kommt und was ihn aufhält. Diese Ergebnisse folgen {source} im Repository des Emulators.",
    sourceLabel: "dem Statusdokument",
    meta: "Berichte über Durchspielen tragen das Datum ihrer Bestätigung durch den Entwickler. Alle Zeiten beziehen sich auf den Entwicklungsrechner {host} und fallen auf anderer Hardware anders aus. Spielinhalte werden lokal bereitgestellt und hier niemals verteilt.",
    gradingHeading: "Wie Ergebnisse eingeordnet werden",
    titlesHeading: "Erfasste Titel",
    showing: "{shown} von {total} Titeln angezeigt.",
    filterAll: "Alle Titel",
    searchLabel: "Titel suchen",
    searchPlaceholder: "Titel suchen…",
    empty: "Kein erfasster Titel passt zu dieser Suche.",
    expand: "Vollständiges Ergebnis und bekannte Grenzen",
    collapse: "Vollständiges Ergebnis ausblenden",
    whatReached: "Was erreicht wurde",
    knownLimits: "Bekannte Grenzen",
    performance: "Gemessen",
    confirmedOn: "Vom Entwickler am {date} bestätigt.",
    detailCta: "Testhistorie und Aufnahmen",
    noticeTitle: "Ein Ergebnis gehört zu dem Build, der es erzeugt hat",
    noticeBody:
      "Eine auf einem Build erreichte Etappe ist kein Versprechen für den nächsten, und mehrere Einträge sagen ausdrücklich, dass sie nach Änderungen am Renderer einen neuen Lauf brauchen. Wenn es bei Ihnen abweicht, melden Sie es über",
    noticeLink: "GitHub-Issues",
  },

  game: {
    backToList: "Alle Titel",
    overviewHeading: "Aktueller Stand",
    strengthsHeading: "Was funktioniert",
    limitsHeading: "Was nicht funktioniert",
    performanceHeading: "Gemessene Leistung",
    historyHeading: "Testhistorie",
    historyLead:
      "Alle erfassten Läufe zu diesem Titel, die neuesten zuerst. Als Entwicklungsbuild markierte Einträge wurden nie als Version veröffentlicht.",
    historyEmpty: "Zu diesem Titel sind noch keine einzelnen Läufe dokumentiert.",
    capturesHeading: "Aufnahmen",
    capturesLead:
      "Bilder, die der Emulator während der oben genannten Läufe selbst erzeugt hat.",
    statusLabel: "Ergebnis",
    confirmedLabel: "Bestätigt",
    buildLabel: "Build",
    hostLabel: "Testrechner",
    runsLabel: "Erfasste Läufe",
    otherTitles: "Weitere Titel",
    metaTitle: "Kompatibilität von {title}",
    metaDescription:
      "Wie sich {title} unter PS5PCEM verhält: aktuelles Ergebnis, bekannte Grenzen, gemessene Bildzeiten und die vollständige datierte Testhistorie.",
    notFound: "Kein erfasster Titel trägt diesen Namen.",
  },

  download: {
    eyebrow: "Windows x64 · {channel}",
    channelRelease: "Version",
    channelPrerelease: "Vorabversion",
    heading: "PS5PCEM {version} herunterladen",
    lead: "Veröffentlicht am {date}. Jede Datei stammt aus der {link} — dem einzigen Ort, an dem offizielle Builds erscheinen.",
    leadLink: "GitHub-Veröffentlichung",
    verifyEyebrow: "Prüfen",
    verifyHeading: "SHA-256-Prüfsummen",
    verifyLead:
      "Führen Sie unter Windows certutil -hashfile <Datei> SHA256 aus und vergleichen Sie die Ausgabe mit dem Wert hier.",
    tableFile: "Datei",
    tableHash: "SHA-256",
    tableVersion: "Version",
    tablePublished: "Veröffentlicht",
    tableLink: "Link",
    viewOnGitHub: "Auf GitHub ansehen",
    download: "Herunterladen",
    signingTitle: "Zur Signatur",
    signingBody:
      "Die ausführbaren Dateien und der Installer tragen eine Authenticode-Signatur mit SHA-256 von Artur Strazewicz / PS5PCEM, mit Zeitstempel. Das Zertifikat ist selbst signiert, daher können Windows oder SmartScreen dennoch warnen. Verlässlich ist der Abgleich des Hashwerts unten.",
    requirementsHeading: "Systemanforderungen",
    quickStartHeading: "Erste Schritte",
    noContentNote:
      "Spiele, Firmware, Schlüssel, Systembibliotheken und Konsolensoftware sind nicht enthalten und werden hier nicht verteilt.",
    alsoEyebrow: "Ebenfalls verfügbar",
    alsoHeading: "Versionshinweise, Quellcode und frühere Builds",
    releaseNotesCta: "Versionshinweise zu {version}",
    buildFromSource: "Mit Zig aus dem Quellcode bauen",
    allReleases: "Alle GitHub-Veröffentlichungen",
  },

  status: {
    eyebrow: "Build {version} · {date}",
    heading: "Projektstand",
    lead: "Was der Emulator kann, Teilsystem für Teilsystem. Die Etappen einzelner Titel stehen auf der {link}; diese Seite zeigt die Technik dahinter.",
    leadLink: "Kompatibilitätsseite",
    summaryBuild: "Aktueller Build",
    summaryTitles: "Erfasste Titel",
    summaryTitlesValue: "{playable} von {total} beendet",
    summaryTitlesHint: "Neueste Bestätigung {date}",
    summaryHost: "Referenzrechner",
    summaryHostHint: "Alle Zeiten auf dieser Seite",
    subsystemsEyebrow: "Teilsysteme",
    subsystemsHeading: "Stand der einzelnen Teile",
    subsystemsLead:
      "Verdichtet aus dem Dokument zum Umsetzungsstand, das die vollständige Liste enthält.",
    stateWorking: "Funktioniert",
    statePartial: "Teilweise",
    stateDeferred: "Zurückgestellt",
    notClaimedTitle: "Was hier bewusst nicht behauptet wird",
    notClaimedBody:
      "Ein Menü ist kein Spielgeschehen, und ein gezeichnetes Bild ist keine Spielbarkeit. Manche Titel zeichnen korrekt, aber viel zu langsam zum Spielen, und genau so steht es da. Nichts hier behauptet eine Etappe, die nicht auf einem Build beobachtet wurde.",
    deeperEyebrow: "Mehr Tiefe",
    deeperHeading: "Dokumentation im Repository",
    deeperLead:
      "Das Innere der Teilsysteme — RDNA2, GPU, Vulkan, Speicher, Loader, HLE, CPU, Diagnose und Laufzeit — ist in der Architekturdokumentation erschlossen.",
    implementationCta: "Umsetzungsstand",
    statusDocCta: "Status und Kompatibilität",
    docsCta: "Dokumentationsübersicht",
    issuesCta: "Offene Issues",
    supportHeading: "Entwicklung unterstützen",
    supportBody:
      "PS5PCEM steht unter GPL-3.0-or-later und wird offen entwickelt. Über Boosty und Patreon lässt sich die Arbeit unterstützen.",
  },

  media: {
    eyebrow: "Aufnahmen",
    heading: "Sehen, wie es läuft",
    lead: "Jedes Bild unten kam aus dem Emulator selbst. Die Beschriftung sagt, was es wirklich ist, damit eine Rendering-Etappe nicht für ein spielbares Spiel gehalten wird.",
    youtubeCta: "Auf YouTube ansehen",
    compatibilityCta: "Kompatibilitätsergebnisse",
    galleryEyebrow: "Galerie",
    galleryHeading: "Aufnahmen aus der Entwicklung",
    galleryLead:
      "Geordnet danach, wie weit jeder Titel kommt: beendete Titel zuerst, dann Spielszenen, Menüs und frühe Rendering-Etappen.",
    timelineEyebrow: "Zeitachse",
    timelineHeading: "Neueste Läufe",
    timelineLead:
      "Die neuesten erfassten Läufe über alle Titel, jeweils verlinkt mit der vollständigen Testhistorie.",
    youtubeHeading: "Aufgezeichnete Läufe auf YouTube",
    youtubeBody:
      "Einzelbilder zeigen kein Bildtempo. Der Kanal veröffentlicht vollständige Läufe der hier erfassten Titel, damit Sie einen Build selbst beurteilen können.",
  },

  extract: {
    checkTitle: "GTA III: Paket vollständig entpackt",
    checkBody: "Die Entwicklungsversion des Extraktors vom 2. Oktober behebt InvalidPfs bei GTA III: The Definitive Edition (PPSA03527 v1.007). Alle 48 Dateien werden entpackt, darunter eboot.bin, sechs Module und beide PAK-Archive; die Prüfsummen beider PAK-Indizes stimmen überein. Alle 21 Pakettests bestehen. Das Spiel wurde nicht gestartet. Die Korrektur ist im Quellcode und lokalen Werkzeug enthalten; veröffentlichte Downloads bleiben unverändert.",
    checkLink: "Extraktionsbericht lesen",
    eyebrow: "Mitgeliefertes Werkzeug",
    heading: "PKG-Entpacker",
    lead: "Seit {version} liegt pkgextractor.exe neben dem Launcher, samt einer Schaltfläche Extract PKG, die es aufruft.",
    supportedHeading: "Was unterstützt wird",
    notSupportedHeading: "Was nicht unterstützt wird",
    usageHeading: "Verwendung",
    noticeTitle: "Handelsversionen sind außerhalb des Umfangs",
    noticeBody:
      "Der Entpacker liest die Debug-FPKG-Layouts, die während der Entwicklung beobachtet wurden. Verschlüsselte Handelspakete werden nicht unterstützt, und es sind keine Schlüssel enthalten oder vorausgesetzt.",
  },

  footer: {
    site: "Seite",
    resources: "Material",
    community: "Community",
    docs: "Dokumentation",
    buildFromSource: "Aus dem Quellcode bauen",
    statusDoc: "Statusdokument",
    implementationDoc: "Umsetzungsstand",
    reportIssue: "Problem melden",
    licensePre: "© 2026 {author}. PS5PCEM steht unter der",
    licenseLink: "GNU GPL, Version 3 oder neuer",
    notAffiliated:
      "Nicht mit Sony Interactive Entertainment verbunden und nicht von ihr unterstützt. Spiele, Firmware, Schlüssel und Systembibliotheken werden hier nicht verteilt.",
  },

  notFound: {
    code: "404",
    heading: "Diese Seite gibt es nicht",
    body: "Der Link ist wahrscheinlich veraltet. Downloads, Kompatibilitätsergebnisse und Projektstand liegen alle noch dort, wo Sie sie erwarten.",
    compatibilityCta: "Kompatibilität",
    sourceHint: "Suchen Sie den Quellcode?",
    sourceLink: "Downloads und Bauanleitung",
  },
};

export default de;
