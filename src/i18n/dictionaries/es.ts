import type { Dictionary } from "./en";

const es: Dictionary = {
  meta: {
    tagline: "Investigación experimental de emulación de PlayStation 5, escrita en Zig",
    description:
      "PS5PCEM es un emulador experimental de PlayStation 5 para Windows. Consulta la compatibilidad juego por juego, el rendimiento medido y descarga el prototipo actual.",
  },

  common: {
    skipToContent: "Saltar al contenido",
    menu: "Menú",
    close: "Cerrar",
    language: "Idioma",
    chooseLanguage: "Elegir idioma",
    github: "GitHub",
    youtube: "YouTube",
    getVersion: "Obtener {version}",
    published: "Publicado el {date}",
    latest: "Última",
    recommended: "Recomendado",
    readReport: "Leer el informe",
    developmentBuild: "Compilación de desarrollo",
    release: "Versión {version}",
    moreCaptures: "Más capturas",
    backHome: "Volver al inicio",
  },

  nav: {
    home: "Inicio",
    download: "Descargar",
    compatibility: "Compatibilidad",
    status: "Estado del proyecto",
    media: "Medios",
    extract: "Extractor de PKG",
    games: "Juegos",
  },

  tiers: {
    playable: {
      label: "Jugable · Completable",
      short: "Jugable",
      description:
        "El responsable del proyecto terminó el juego. Imagen, sonido y control se comportan correctamente en las sesiones registradas, aunque la tasa de fotogramas sigue dependiendo de la escena y del equipo.",
    },
    ingame: {
      label: "Llega a escenas de juego",
      short: "En juego",
      description:
        "Aparecen partidas cargadas o escenas del motor, pero no se afirma que pueda completarse: la fluidez, los tiempos de carga o un control sin verificar lo impiden.",
    },
    intro: {
      label: "Dibuja la intro y los menús",
      short: "Intro / menús",
      description:
        "El juego dibuja su intro, logotipos, arte o menús a través del grafo de render invitado. No se ha llegado a la partida o no se ha verificado.",
    },
    boots: {
      label: "Arranca y carga recursos",
      short: "Arranca",
      description:
        "Los módulos se enlazan y el arranque del motor avanza, pero no se afirma nada sobre un fotograma en pantalla.",
    },
  },

  home: {
    badge: "Prototipo temprano · {version}",
    heading: "Investigación de emulación de PlayStation 5, a la vista de todos",
    lead: "PS5PCEM es un emulador experimental escrito en Zig: el código invitado se ejecuta de forma nativa, los shaders RDNA2 se traducen a SPIR-V, Vulkan presenta el resultado y un lanzador de Windows lo une todo. {playable} de los {total} juegos registrados se han terminado de principio a fin.",
    ctaDownload: "Descargar {version}",
    ctaResults: "Ver los resultados de las pruebas",
    requirements:
      "Windows 10 2004 o posterior · x86-64-v3 · controlador Vulkan 1.2 · GPL-3.0-or-later",
    heroCaption:
      "Cat Quest III, dibujado por PS5PCEM en el equipo de referencia. Jugable de principio a fin, confirmado.",
    statTested: "Juegos registrados",
    statTestedHint: "Probados en {release}",
    statPlayable: "Terminados por completo",
    statPlayableHint: "Confirmado por el responsable",
    statIngame: "Llegan a escenas de juego",
    statIngameHint: "Partida en pantalla",
    statEarly: "Arranque, intro o menús",
    statEarlyHint: "Etapas anteriores",
    featuresEyebrow: "Dónde está",
    featuresHeading: "Un prototipo con mediciones abiertas",
    featuresLead:
      "El código invitado se ejecuta de forma nativa, los shaders RDNA2 pasan a SPIR-V y Vulkan pone fotogramas en pantalla. Varios juegos pueden terminarse; otros se detienen en un menú o una pantalla de carga. Cada resultado indica cuál es el caso y en qué compilación.",
    resultsEyebrow: "Resultados de las pruebas",
    resultsHeading: "La compatibilidad de un vistazo",
    resultsLead:
      "Cada resultado fue observado por el responsable en una {host}. Los tiempos describen ese equipo y serán distintos en el tuyo. Abre un juego para ver su historial completo de pruebas.",
    resultsCta: "Los {total} resultados",
    youtubeEyebrow: "Verlo funcionar",
    youtubeHeading: "Sesiones grabadas en el canal de YouTube",
    youtubeLead:
      "Una imagen fija no muestra la fluidez. El canal graba los juegos que aquí se siguen tal como se mueven de verdad: la forma honesta de juzgar una compilación que dibuja bien pero despacio.",
    youtubeCta: "Abrir el canal de YouTube",
    youtubeBrowse: "Ver las capturas",
    legalTitle: "Usa solo contenido al que tengas derecho",
    legalBody:
      "Con PS5PCEM no se distribuyen juegos, firmware de consola, bibliotecas del sistema, claves ni material del fabricante, y aquí tampoco se ofrecen. El proyecto existe para la investigación de interoperabilidad y la enseñanza. La",
    legalLink: "nota legal completa",
    tryHeading: "Prueba {version} en Windows",
    tryLead:
      "Archivo portátil o instalación por usuario, ambos con sumas SHA-256 publicadas.",
    tryDownload: "Descargar",
    trySource: "Código fuente en GitHub",
  },

  compatibility: {
    eyebrow: "Resultados de las pruebas",
    heading: "Compatibilidad de juegos",
    lead: "Hasta dónde llega cada juego observado y qué le impide avanzar. Estos resultados siguen {source} en el repositorio del emulador.",
    sourceLabel: "el documento de estado",
    meta: "Los informes de partida terminada llevan la fecha en que el responsable los confirmó. Todos los tiempos se refieren al equipo de desarrollo {host} y serán distintos en otro hardware. El contenido de los juegos lo aporta el usuario y nunca se distribuye aquí.",
    gradingHeading: "Cómo se clasifican los resultados",
    titlesHeading: "Juegos registrados",
    showing: "Mostrando {shown} de {total}.",
    filterAll: "Todos los juegos",
    searchLabel: "Buscar juegos",
    searchPlaceholder: "Buscar un juego…",
    empty: "Ningún juego registrado coincide con esa búsqueda.",
    expand: "Resultado completo y límites conocidos",
    collapse: "Ocultar el resultado completo",
    whatReached: "Lo que se alcanzó",
    knownLimits: "Límites conocidos",
    performance: "Medido",
    confirmedOn: "Confirmado por el responsable el {date}.",
    detailCta: "Historial de pruebas y capturas",
    noticeTitle: "Un resultado pertenece a la compilación que lo produjo",
    noticeBody:
      "Una etapa alcanzada en una compilación no promete nada sobre la siguiente, y varias entradas dicen abiertamente que necesitan una sesión nueva tras cambios en el renderizador. Si lo que ves difiere, cuéntalo en los",
    noticeLink: "issues de GitHub",
  },

  game: {
    backToList: "Todos los juegos",
    overviewHeading: "Situación actual",
    strengthsHeading: "Lo que funciona",
    limitsHeading: "Lo que no funciona",
    performanceHeading: "Rendimiento medido",
    historyHeading: "Historial de pruebas",
    historyLead:
      "Todas las sesiones registradas de este juego, las más recientes primero. Las marcadas como compilación de desarrollo nunca se publicaron como versión.",
    historyEmpty: "Aún no se han documentado sesiones concretas de este juego.",
    capturesHeading: "Capturas",
    capturesLead:
      "Fotogramas producidos por el propio emulador durante las sesiones anteriores.",
    statusLabel: "Resultado",
    confirmedLabel: "Confirmado",
    buildLabel: "Compilación",
    hostLabel: "Equipo de prueba",
    runsLabel: "Sesiones registradas",
    otherTitles: "Otros juegos",
    metaTitle: "Compatibilidad de {title}",
    metaDescription:
      "Cómo se comporta {title} en PS5PCEM: resultado actual, límites conocidos, tiempos de fotograma medidos y el historial completo de pruebas con fechas.",
    notFound: "Ningún juego registrado tiene ese nombre.",
  },

  download: {
    eyebrow: "Windows x64 · {channel}",
    channelRelease: "Versión",
    channelPrerelease: "Versión preliminar",
    heading: "Descargar PS5PCEM {version}",
    lead: "Publicado el {date}. Cada archivo proviene de la {link}, el único lugar donde aparecen las compilaciones oficiales.",
    leadLink: "publicación de GitHub",
    verifyEyebrow: "Verificar",
    verifyHeading: "Sumas SHA-256",
    verifyLead:
      "En Windows, ejecuta certutil -hashfile <archivo> SHA256 y compara la salida con el valor indicado aquí.",
    tableFile: "Archivo",
    tableHash: "SHA-256",
    tableVersion: "Versión",
    tablePublished: "Publicado",
    tableLink: "Enlace",
    viewOnGitHub: "Ver en GitHub",
    download: "Descargar",
    signingTitle: "Sobre la firma",
    signingBody:
      "Los ejecutables y el instalador llevan firma Authenticode SHA-256 de Artur Strazewicz / PS5PCEM, con sello de tiempo. El certificado es autofirmado, así que Windows o SmartScreen pueden avisar de todos modos. La comprobación fiable es comparar el hash de abajo.",
    requirementsHeading: "Requisitos del sistema",
    quickStartHeading: "Cómo empezar",
    noContentNote:
      "Juegos, firmware, claves, bibliotecas del sistema y software de consola no están incluidos ni se distribuirán aquí.",
    alsoEyebrow: "También disponible",
    alsoHeading: "Notas de la versión, código fuente y compilaciones anteriores",
    releaseNotesCta: "Notas de la versión {version}",
    buildFromSource: "Compilar desde el código con Zig",
    allReleases: "Todas las publicaciones de GitHub",
  },

  status: {
    eyebrow: "Compilación {version} · {date}",
    heading: "Estado del proyecto",
    lead: "Lo que el emulador sabe hacer, subsistema por subsistema. Las etapas de cada juego están en la {link}; esta página muestra la ingeniería que las sostiene.",
    leadLink: "página de compatibilidad",
    summaryBuild: "Compilación actual",
    summaryTitles: "Juegos registrados",
    summaryTitlesValue: "{playable} de {total} terminados",
    summaryTitlesHint: "Última confirmación {date}",
    summaryHost: "Equipo de referencia",
    summaryHostHint: "Todos los tiempos de este sitio",
    subsystemsEyebrow: "Subsistemas",
    subsystemsHeading: "El estado de cada parte",
    subsystemsLead:
      "Resumido del documento sobre el estado de la implementación, que contiene la lista completa.",
    stateWorking: "Funciona",
    statePartial: "Parcial",
    stateDeferred: "Aplazado",
    notClaimedTitle: "Lo que aquí no se afirma a propósito",
    notClaimedBody:
      "Un menú no es una partida, y un fotograma dibujado no es jugabilidad. Algunos juegos dibujan bien pero demasiado despacio para jugarlos, y así queda escrito. Nada de lo que aparece aquí afirma una etapa que no se haya observado en una compilación.",
    deeperEyebrow: "Más a fondo",
    deeperHeading: "La documentación del repositorio",
    deeperLead:
      "El interior de los subsistemas — RDNA2, GPU, Vulkan, memoria, cargador, HLE, CPU, diagnóstico y entorno de ejecución — está indexado en la documentación de arquitectura.",
    implementationCta: "Estado de la implementación",
    statusDocCta: "Estado y compatibilidad",
    docsCta: "Índice de documentación",
    issuesCta: "Problemas abiertos",
    supportHeading: "Apoyar el desarrollo",
    supportBody:
      "PS5PCEM se publica bajo GPL-3.0-or-later y se desarrolla abiertamente. Boosty y Patreon son las dos formas de apoyar el trabajo.",
  },

  media: {
    eyebrow: "Capturas",
    heading: "Verlo en marcha",
    lead: "Cada imagen de abajo salió del propio emulador. El pie de foto dice qué es realmente, para que una etapa de render no se confunda con un juego jugable.",
    youtubeCta: "Ver en YouTube",
    compatibilityCta: "Resultados de compatibilidad",
    galleryEyebrow: "Galería",
    galleryHeading: "Capturas de desarrollo",
    galleryLead:
      "Ordenadas por lo lejos que llega cada juego: primero los terminados, luego las escenas de juego, los menús y las primeras etapas de render.",
    timelineEyebrow: "Cronología",
    timelineHeading: "Sesiones recientes",
    timelineLead:
      "Las sesiones registradas más recientes de todos los juegos, cada una enlazada con su historial completo de pruebas.",
    youtubeHeading: "Sesiones grabadas en YouTube",
    youtubeBody:
      "Las imágenes fijas no muestran el ritmo de los fotogramas. El canal publica sesiones completas de los juegos que aquí se siguen, para que juzgues una compilación por ti mismo.",
  },

  extract: {
    eyebrow: "Herramienta incluida",
    heading: "Extractor de PKG",
    lead: "Desde {version}, pkgextractor.exe acompaña al lanzador, con un botón Extract PKG que lo ejecuta.",
    supportedHeading: "Qué admite",
    notSupportedHeading: "Qué no admite",
    usageHeading: "Cómo usarlo",
    noticeTitle: "Los paquetes comerciales quedan fuera",
    noticeBody:
      "El extractor lee los diseños FPKG de depuración observados durante el desarrollo. Los paquetes comerciales cifrados no están admitidos, y no se incluye ni se da por supuesta ninguna clave.",
  },

  footer: {
    site: "Sitio",
    resources: "Recursos",
    community: "Comunidad",
    docs: "Documentación",
    buildFromSource: "Compilar desde el código",
    statusDoc: "Documento de estado",
    implementationDoc: "Estado de la implementación",
    reportIssue: "Informar de un problema",
    licensePre: "© 2026 {author}. PS5PCEM se publica bajo la",
    licenseLink: "GNU GPL, versión 3 o posterior",
    notAffiliated:
      "Sin vinculación con Sony Interactive Entertainment ni respaldo por su parte. Aquí no se distribuyen juegos, firmware, claves ni bibliotecas del sistema.",
  },

  notFound: {
    code: "404",
    heading: "Esa página no existe",
    body: "Lo más probable es que el enlace esté desactualizado. Las descargas, los resultados de compatibilidad y el estado del proyecto siguen donde esperas encontrarlos.",
    compatibilityCta: "Compatibilidad",
    sourceHint: "¿Buscas el código fuente?",
    sourceLink: "Descargas e instrucciones de compilación",
  },
};

export default es;
