import type { Dictionary } from "./en";

const fr: Dictionary = {
  meta: {
    tagline: "Recherche expérimentale sur l'émulation PlayStation 5, écrite en Zig",
    description:
      "PS5PCEM est un émulateur PlayStation 5 expérimental pour Windows. Suivez la compatibilité titre par titre, les performances mesurées et téléchargez le prototype actuel.",
  },

  common: {
    skipToContent: "Aller au contenu",
    menu: "Menu",
    close: "Fermer",
    language: "Langue",
    chooseLanguage: "Choisir une langue",
    github: "GitHub",
    youtube: "YouTube",
    getVersion: "Obtenir {version}",
    published: "Publié le {date}",
    latest: "Dernière",
    recommended: "Recommandé",
    readReport: "Lire le rapport",
    developmentBuild: "Build de développement",
    release: "Version {version}",
    moreCaptures: "Plus de captures",
    backHome: "Retour à l'accueil",
  },

  seo: {
    home: {
      title: "PS5PCEM — émulateur PlayStation 5 expérimental pour Windows",
      description:
        "Téléchargez le prototype PS5PCEM et voyez quels jeux PlayStation 5 tournent vraiment : temps par image mesurés, limites connues et historique de tests daté pour chaque jeu.",
    },
    download: {
      title: "Télécharger PS5PCEM {version} pour Windows x64",
      description:
        "PS5PCEM {version} pour Windows : archive portable ou installation par utilisateur, sommes SHA-256 publiées, configuration requise et tous les builds antérieurs.",
    },
    compatibility: {
      title: "Liste de compatibilité des jeux PlayStation 5 — PS5PCEM",
      description:
        "Quels jeux PS5 tournent sous PS5PCEM : {total} jeux recensés, {playable} terminés, chacun avec ses temps par image mesurés, ses limites connues et son historique de tests daté.",
    },
    status: {
      title: "État du projet — ce que PS5PCEM sait faire aujourd’hui",
      description:
        "PS5PCEM sous-système par sous-système : exécution native du code invité, traduction des shaders RDNA2 en SPIR-V, rendu Vulkan, son, manettes, sauvegardes et lanceur Windows.",
    },
    media: {
      title: "Captures et sessions enregistrées — PS5PCEM",
      description:
        "Des captures produites par PS5PCEM lui-même, chacune légendée pour dire ce qu’elle est vraiment, et la chaîne YouTube des sessions complètes.",
    },
    extract: {
      title: "Extracteur PKG pour paquets de débogage PS5 — PS5PCEM",
      description:
        "pkgextractor accompagne PS5PCEM {version} : extraction des agencements FPKG de débogage observés, du PFS interne, des mappages NAPS et des blocs Kraken. Les paquets commerciaux chiffrés ne sont pas pris en charge.",
    },
    tech: {
      title: "Comment PS5PCEM fonctionne — HLE, AMPR, ACM, MSAA et Vulkan",
      description:
        "Comment PS5PCEM réalise le firmware et le matériel PlayStation 5 : HLE, compteurs AMPR, convolution ACM, MSAA, AGC, shaders RDNA2, Vulkan, audio et sauvegardes.",
    },
  },

  nav: {
    home: "Accueil",
    download: "Téléchargement",
    compatibility: "Compatibilité",
    status: "État du projet",
    media: "Médias",
    extract: "Extracteur PKG",
    tech: "Technologie",
    games: "Jeux",
  },

  tiers: {
    playable: {
      label: "Jouable · Terminable",
      short: "Jouable",
      description:
        "Le mainteneur a terminé le jeu. Image, son et commandes se comportent correctement dans les sessions enregistrées, même si la fluidité dépend encore de la scène et du matériel.",
    },
    ingame: {
      label: "Atteint des scènes de jeu",
      short: "En jeu",
      description:
        "Une partie chargée ou des scènes du moteur s'affichent, mais aucune partie complète n'est revendiquée : fluidité, temps de chargement ou commandes non vérifiées font obstacle.",
    },
    intro: {
      label: "Affiche l'intro et les menus",
      short: "Intro / menus",
      description:
        "Le jeu dessine son intro, ses logos, ses illustrations ou ses menus via le graphe de rendu invité. La partie n'a pas été atteinte ou n'a pas été vérifiée.",
    },
    boots: {
      label: "Démarre et charge ses données",
      short: "Démarre",
      description:
        "Les modules se lient et l'amorçage du moteur progresse, mais rien n'est affirmé quant à une image affichée.",
    },
  },

  home: {
    badge: "Prototype précoce · {version}",
    heading: "La recherche sur l'émulation PlayStation 5, à découvert",
    lead: "PS5PCEM est un émulateur expérimental écrit en Zig : le code invité s'exécute nativement, les shaders RDNA2 sont traduits en SPIR-V, Vulkan affiche le résultat et un lanceur Windows relie le tout. {playable} des {total} jeux recensés ont été terminés de bout en bout.",
    ctaDownload: "Télécharger {version}",
    ctaResults: "Voir les résultats des tests",
    requirements:
      "Windows 10 2004 ou plus récent · x86-64-v3 · pilote Vulkan 1.2 · GPL-3.0-or-later",
    heroCaption:
      "Cat Quest III, dessiné par PS5PCEM sur la machine de référence. Jouable du début à la fin, confirmé.",
    statTested: "Jeux recensés",
    statTestedHint: "Testés sur {release}",
    statPlayable: "Terminés de bout en bout",
    statPlayableHint: "Confirmé par le mainteneur",
    statIngame: "Atteignent des scènes de jeu",
    statIngameHint: "Partie affichée",
    statEarly: "Démarrage, intro ou menus",
    statEarlyHint: "Étapes antérieures",
    featuresEyebrow: "Où en est le projet",
    featuresHeading: "Un prototype aux mesures publiques",
    featuresLead:
      "Le code invité s'exécute nativement, les shaders RDNA2 deviennent du SPIR-V, Vulkan affiche les images. Plusieurs jeux se terminent ; d'autres s'arrêtent à un menu ou un écran de chargement. Chaque résultat ci-dessous précise lequel, et sur quel build.",
    resultsEyebrow: "Résultats des tests",
    resultsHeading: "La compatibilité en bref",
    resultsLead:
      "Chaque résultat a été observé par le mainteneur sur une {host}. Les temps décrivent cette machine et différeront sur la vôtre. Ouvrez un jeu pour son historique de tests complet.",
    resultsCta: "Les {total} résultats",
    youtubeEyebrow: "Le voir tourner",
    youtubeHeading: "Sessions enregistrées sur la chaîne YouTube",
    youtubeLead:
      "Une image fixe ne montre pas la fluidité. La chaîne montre les jeux suivis ici tels qu'ils tournent vraiment : la façon honnête de juger un build qui dessine juste mais lentement.",
    youtubeCta: "Ouvrir la chaîne YouTube",
    youtubeBrowse: "Parcourir les captures",
    legalTitle: "N'utilisez que du contenu auquel vous avez droit",
    legalBody:
      "Aucun jeu, micrologiciel de console, bibliothèque système, clé ou matériel du fabricant n'est fourni avec PS5PCEM ni proposé ici. Le projet existe pour la recherche sur l'interopérabilité et l'enseignement. La",
    legalLink: "note juridique complète",
    tryHeading: "Essayer {version} sous Windows",
    tryLead:
      "Archive portable ou installation par utilisateur, les deux avec des sommes SHA-256 publiées.",
    tryDownload: "Télécharger",
    trySource: "Code source sur GitHub",
  },

  compatibility: {
    eyebrow: "Résultats des tests",
    heading: "Compatibilité des jeux",
    lead: "Jusqu'où va chaque jeu observé, et ce qui l'empêche d'aller plus loin. Ces résultats suivent {source} dans le dépôt de l'émulateur.",
    sourceLabel: "le document d'état",
    meta: "Les rapports de partie terminée portent la date de leur confirmation par le mainteneur. Tous les temps se rapportent à la machine de développement {host} et différeront sur un autre matériel. Le contenu des jeux est fourni localement et n'est jamais distribué ici.",
    gradingHeading: "Comment les résultats sont classés",
    titlesHeading: "Jeux recensés",
    showing: "{shown} jeux affichés sur {total}.",
    filterAll: "Tous les jeux",
    searchLabel: "Rechercher un jeu",
    searchPlaceholder: "Rechercher un jeu…",
    empty: "Aucun jeu recensé ne correspond à cette recherche.",
    expand: "Résultat complet et limites connues",
    collapse: "Masquer le résultat complet",
    whatReached: "Ce qui a été atteint",
    knownLimits: "Limites connues",
    performance: "Mesuré",
    confirmedOn: "Confirmé par le mainteneur le {date}.",
    detailCta: "Historique des tests et captures",
    noticeTitle: "Un résultat appartient au build qui l'a produit",
    noticeBody:
      "Une étape atteinte sur un build ne promet rien pour le suivant, et plusieurs entrées disent clairement qu'elles exigent une nouvelle session après des changements du moteur de rendu. Si votre résultat diffère, signalez-le via les",
    noticeLink: "issues GitHub",
  },

  game: {
    backToList: "Tous les jeux",
    overviewHeading: "État actuel",
    strengthsHeading: "Ce qui fonctionne",
    limitsHeading: "Ce qui ne fonctionne pas",
    performanceHeading: "Performances mesurées",
    historyHeading: "Historique des tests",
    historyLead:
      "Toutes les sessions enregistrées pour ce jeu, la plus récente d'abord. Les entrées marquées build de développement n'ont jamais été publiées comme version.",
    historyEmpty: "Aucune session individuelle n'a encore été documentée pour ce jeu.",
    capturesHeading: "Captures",
    capturesLead:
      "Images produites par l'émulateur lui-même pendant les sessions ci-dessus.",
    statusLabel: "Résultat",
    confirmedLabel: "Confirmé",
    buildLabel: "Build",
    hostLabel: "Machine de test",
    runsLabel: "Sessions enregistrées",
    otherTitles: "Autres jeux",
    metaTitle: "Compatibilité de {title}",
    metaDescription:
      "Le comportement de {title} sous PS5PCEM : résultat actuel, limites connues, temps par image mesurés et historique de tests complet et daté.",
    notFound: "Aucun jeu recensé ne porte ce nom.",
  },

  download: {
    changesHeading: "Nouveautés de {version}",
    changesLauncher: "Correction importante : les jeux démarrent de nouveau depuis le lanceur distribué. Le dossier de travail est corrigé ; les échecs affichent désormais le message Windows et son code.",
    changesFeatures: "Nouveautés : polices FreeType et correction du démarrage de Jurassic Park, MemoryPool, encodage PNG, fonctions RTC, compteurs AMPR, mélange des couleurs compactées, gathers horizontaux et appels bornés de sous-programmes de shaders.",
    changesLimits: "Les exécutables utilisent le même certificat que la version précédente. Les captures de développement sont datées ; les tests d’instructions ne prouvent ni de nouveaux FPS en jeu ni des parcours complets.",
    eyebrow: "Windows x64 · {channel}",
    channelRelease: "Version",
    channelPrerelease: "Préversion",
    heading: "Télécharger PS5PCEM {version}",
    lead: "Publié le {date}. Chaque fichier provient de la {link}, le seul endroit où paraissent les builds officiels.",
    leadLink: "publication GitHub",
    verifyEyebrow: "Vérifier",
    verifyHeading: "Sommes de contrôle SHA-256",
    verifyLead:
      "Sous Windows, lancez certutil -hashfile <fichier> SHA256 et comparez la sortie avec la valeur indiquée ici.",
    tableFile: "Fichier",
    tableHash: "SHA-256",
    tableVersion: "Version",
    tablePublished: "Publié",
    tableLink: "Lien",
    viewOnGitHub: "Voir sur GitHub",
    download: "Télécharger",
    signingTitle: "À propos de la signature",
    signingBody:
      "Les exécutables et l'installeur portent une signature Authenticode SHA-256 d'Artur Strazewicz / PS5PCEM, horodatée. Le certificat est auto-signé, donc Windows ou SmartScreen peuvent tout de même avertir. Le contrôle fiable est la comparaison du hachage ci-dessous.",
    requirementsHeading: "Configuration requise",
    quickStartHeading: "Pour commencer",
    noContentNote:
      "Jeux, micrologiciel, clés, bibliothèques système et logiciels de console ne sont pas inclus et ne seront pas distribués ici.",
    alsoEyebrow: "Également disponible",
    alsoHeading: "Notes de version, code source et builds antérieurs",
    releaseNotesCta: "Notes de version de {version}",
    buildFromSource: "Compiler depuis les sources avec Zig",
    allReleases: "Toutes les publications GitHub",
  },

  status: {
    eyebrow: "Build {version} · {date}",
    heading: "État du projet",
    lead: "Ce que l'émulateur sait faire, sous-système par sous-système. Les étapes par jeu sont sur la {link} ; cette page montre la technique qui les sous-tend.",
    leadLink: "page de compatibilité",
    summaryBuild: "Build actuel",
    summaryTitles: "Jeux recensés",
    summaryTitlesValue: "{playable} terminés sur {total}",
    summaryTitlesHint: "Dernière confirmation {date}",
    summaryHost: "Machine de référence",
    summaryHostHint: "Tous les temps de ce site",
    subsystemsEyebrow: "Sous-systèmes",
    subsystemsHeading: "L'état de chaque partie",
    subsystemsLead:
      "Condensé du document sur l'état de l'implémentation, qui contient la liste complète.",
    stateWorking: "Fonctionne",
    statePartial: "Partiel",
    stateDeferred: "Différé",
    notClaimedTitle: "Ce qui n'est délibérément pas affirmé",
    notClaimedBody:
      "Un menu n'est pas une partie, et une image dessinée n'est pas de la jouabilité. Certains jeux dessinent correctement mais beaucoup trop lentement pour être joués, et c'est écrit ainsi. Rien ici ne revendique une étape qui n'a pas été observée sur un build.",
    deeperEyebrow: "Aller plus loin",
    deeperHeading: "La documentation du dépôt",
    deeperLead:
      "Le fonctionnement interne des sous-systèmes — RDNA2, GPU, Vulkan, mémoire, chargeur, HLE, CPU, diagnostics et exécution — est indexé dans la documentation d'architecture.",
    implementationCta: "État de l'implémentation",
    statusDocCta: "État et compatibilité",
    docsCta: "Index de la documentation",
    issuesCta: "Tickets ouverts",
    techCta: "Comment ces pièces marchent",
    supportHeading: "Soutenir le développement",
    supportBody:
      "PS5PCEM est sous GPL-3.0-or-later et développé au grand jour. Boosty et Patreon sont les deux façons de soutenir le travail.",
  },

  media: {
    eyebrow: "Captures",
    heading: "Le voir tourner",
    lead: "Chaque image ci-dessous est sortie de l'émulateur. Sa légende dit ce qu'elle est vraiment, pour qu'une étape de rendu ne soit jamais prise pour un jeu jouable.",
    youtubeCta: "Regarder sur YouTube",
    compatibilityCta: "Résultats de compatibilité",
    galleryEyebrow: "Galerie",
    galleryHeading: "Captures de développement",
    galleryLead:
      "Classées selon la distance parcourue par chaque jeu : les jeux terminés d'abord, puis les scènes de jeu, les menus et les premières étapes de rendu.",
    timelineEyebrow: "Chronologie",
    timelineHeading: "Sessions récentes",
    timelineLead:
      "Les sessions enregistrées les plus récentes, tous jeux confondus, chacune reliée à son historique de tests complet.",
    youtubeHeading: "Sessions enregistrées sur YouTube",
    youtubeBody:
      "Les images fixes ne montrent pas la fluidité. La chaîne publie des sessions complètes des jeux suivis ici, pour que vous jugiez un build par vous-même.",
  },

  extract: {
    checkTitle: "GTA III : extraction complète du paquet",
    checkBody: "La version de développement du 2 octobre corrige InvalidPfs pour GTA III: The Definitive Edition (PPSA03527 v1.007). Les 48 fichiers sont extraits, dont eboot.bin, six modules et les deux archives PAK ; les sommes de contrôle des deux index PAK correspondent. Les 21 tests réussissent. Le jeu n’a pas été lancé. Le correctif est dans les sources et l’outil local ; les archives publiées restent inchangées.",
    checkLink: "Lire le rapport d’extraction",
    eyebrow: "Outil fourni",
    heading: "Extracteur PKG",
    lead: "Depuis {version}, pkgextractor.exe accompagne le lanceur, avec un bouton Extract PKG qui le pilote.",
    supportedHeading: "Ce qu'il gère",
    notSupportedHeading: "Ce qu'il ne gère pas",
    usageHeading: "Comment l'utiliser",
    noticeTitle: "Les paquets commerciaux sont hors périmètre",
    noticeBody:
      "L'extracteur lit les agencements FPKG de débogage observés pendant le développement. Les paquets commerciaux chiffrés ne sont pas pris en charge, et aucune clé n'est incluse ni supposée.",
  },

  tech: {
    eyebrow: "Mise en œuvre",
    heading: "Comment PS5PCEM fonctionne",
    lead: "Chaque page décrit un mécanisme que l’émulateur exécute vraiment : ce que fait la console, ce que fait le code Zig, et ce qui manque encore.",
    scopeTitle: "Ce que ces pages décrivent",
    scopeBody:
      "Le texte suit les notes d’architecture et les rapports d’octobre 2026 du dépôt PS5PCEM. Un test ciblé qui passe n’est ni une nouvelle cadence d’images ni une nouvelle partie terminée.",
    categories: {
      firmware: "Firmware et HLE",
      graphics: "Graphisme",
      audio: "Audio et vidéo",
      platform: "Processeur, chargeur et outils",
    },
    read: "Comment ça marche",
    works: "Ce qui est en place",
    gaps: "Ce qui manque encore",
    related: "Mécanismes liés",
    back: "Toutes les technologies",
    updated: "Notes du dépôt jusqu’au {date}",
  },

  footer: {
    site: "Site",
    resources: "Ressources",
    community: "Communauté",
    docs: "Documentation",
    buildFromSource: "Compiler depuis les sources",
    statusDoc: "Document d'état",
    implementationDoc: "État de l'implémentation",
    reportIssue: "Signaler un problème",
    licensePre: "© 2026 {author}. PS5PCEM est publié sous la",
    licenseLink: "GNU GPL, version 3 ou ultérieure",
    notAffiliated:
      "Sans lien avec Sony Interactive Entertainment, ni approuvé par elle. Aucun jeu, micrologiciel, clé ni bibliothèque système n'est distribué ici.",
  },

  notFound: {
    code: "404",
    heading: "Cette page n'existe pas",
    body: "Le lien est probablement obsolète. Les téléchargements, les résultats de compatibilité et l'état du projet sont tous encore là où vous les attendez.",
    compatibilityCta: "Compatibilité",
    sourceHint: "Vous cherchez le code source ?",
    sourceLink: "Téléchargements et instructions de compilation",
  },
};

export default fr;
