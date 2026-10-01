import type { Dictionary } from "./en";

const pt: Dictionary = {
  meta: {
    tagline: "Pesquisa experimental de emulação de PlayStation 5, escrita em Zig",
    description:
      "PS5PCEM é um emulador experimental de PlayStation 5 para Windows. Acompanhe a compatibilidade jogo a jogo, o desempenho medido e baixe o protótipo atual.",
  },

  common: {
    skipToContent: "Ir para o conteúdo",
    menu: "Menu",
    close: "Fechar",
    language: "Idioma",
    chooseLanguage: "Escolher idioma",
    github: "GitHub",
    youtube: "YouTube",
    getVersion: "Obter {version}",
    published: "Publicado em {date}",
    latest: "Mais recente",
    recommended: "Recomendado",
    readReport: "Ler o relatório",
    developmentBuild: "Compilação de desenvolvimento",
    release: "Versão {version}",
    moreCaptures: "Mais capturas",
    backHome: "Voltar ao início",
  },

  nav: {
    home: "Início",
    download: "Download",
    compatibility: "Compatibilidade",
    status: "Estado do projeto",
    media: "Mídia",
    extract: "Extrator de PKG",
    games: "Jogos",
  },

  tiers: {
    playable: {
      label: "Jogável · Finalizável",
      short: "Jogável",
      description:
        "O mantenedor terminou o jogo. Imagem, som e controles se comportam corretamente nas sessões registradas, ainda que a taxa de quadros continue dependendo da cena e do hardware.",
    },
    ingame: {
      label: "Chega a cenas de jogo",
      short: "Em jogo",
      description:
        "Partidas carregadas ou cenas do motor aparecem na tela, mas não se afirma que seja possível terminar: taxa de quadros, tempos de carregamento ou controles não verificados atrapalham.",
    },
    intro: {
      label: "Desenha a introdução e os menus",
      short: "Introdução / menus",
      description:
        "O jogo desenha sua introdução, logotipos, arte ou menus pelo grafo de renderização convidado. A jogabilidade não foi alcançada ou não foi verificada.",
    },
    boots: {
      label: "Inicia e carrega recursos",
      short: "Inicia",
      description:
        "Os módulos se ligam e a inicialização do motor avança, mas nada se afirma sobre um quadro chegar à tela.",
    },
  },

  home: {
    badge: "Protótipo inicial · {version}",
    heading: "Pesquisa de emulação de PlayStation 5, à vista de todos",
    lead: "PS5PCEM é um emulador experimental escrito em Zig: o código convidado roda nativamente, os shaders RDNA2 são traduzidos para SPIR-V, o Vulkan apresenta o resultado e um lançador do Windows liga tudo. {playable} dos {total} jogos registrados foram terminados de ponta a ponta.",
    ctaDownload: "Baixar {version}",
    ctaResults: "Ver os resultados dos testes",
    requirements:
      "Windows 10 2004 ou mais recente · x86-64-v3 · driver Vulkan 1.2 · GPL-3.0-or-later",
    heroCaption:
      "Cat Quest III, desenhado pelo PS5PCEM na máquina de referência. Confirmado como jogável do começo ao fim.",
    statTested: "Jogos registrados",
    statTestedHint: "Testados na {release}",
    statPlayable: "Terminados por completo",
    statPlayableHint: "Confirmado pelo mantenedor",
    statIngame: "Chegam a cenas de jogo",
    statIngameHint: "Partida na tela",
    statEarly: "Início, introdução ou menus",
    statEarlyHint: "Etapas anteriores",
    featuresEyebrow: "Onde o projeto está",
    featuresHeading: "Um protótipo com medições abertas",
    featuresLead:
      "O código convidado roda nativamente, os shaders RDNA2 viram SPIR-V e o Vulkan coloca quadros na tela. Vários jogos podem ser terminados; outros param num menu ou numa tela de carregamento. Cada resultado abaixo diz qual é o caso, e em qual compilação.",
    resultsEyebrow: "Resultados dos testes",
    resultsHeading: "A compatibilidade em resumo",
    resultsLead:
      "Cada resultado foi observado pelo mantenedor em uma {host}. Os tempos descrevem aquela máquina e serão diferentes na sua. Abra um jogo para ver o histórico completo de testes.",
    resultsCta: "Todos os {total} resultados",
    youtubeEyebrow: "Veja rodando",
    youtubeHeading: "Sessões gravadas no canal do YouTube",
    youtubeLead:
      "Uma imagem parada não mostra a fluidez. O canal grava os jogos acompanhados aqui como eles realmente rodam — a forma honesta de julgar uma compilação que desenha certo, mas devagar.",
    youtubeCta: "Abrir o canal do YouTube",
    youtubeBrowse: "Ver as capturas",
    legalTitle: "Use apenas conteúdo a que você tem direito",
    legalBody:
      "Nenhum jogo, firmware de console, biblioteca de sistema, chave ou material do fabricante acompanha o PS5PCEM nem é oferecido aqui. O projeto existe para pesquisa de interoperabilidade e ensino. A",
    legalLink: "nota jurídica completa",
    tryHeading: "Experimente a {version} no Windows",
    tryLead:
      "Arquivo portátil ou instalação por usuário, ambos com somas SHA-256 publicadas.",
    tryDownload: "Baixar",
    trySource: "Código-fonte no GitHub",
  },

  compatibility: {
    eyebrow: "Resultados dos testes",
    heading: "Compatibilidade dos jogos",
    lead: "Até onde cada jogo observado chega, e o que o impede de ir além. Estes resultados seguem {source} no repositório do emulador.",
    sourceLabel: "o documento de estado",
    meta: "Os relatos de jogo terminado trazem a data em que o mantenedor os confirmou. Todos os tempos se referem à máquina de desenvolvimento {host} e serão diferentes em outro hardware. O conteúdo dos jogos é fornecido localmente e nunca é distribuído aqui.",
    gradingHeading: "Como os resultados são classificados",
    titlesHeading: "Jogos registrados",
    showing: "Exibindo {shown} de {total}.",
    filterAll: "Todos os jogos",
    searchLabel: "Pesquisar jogos",
    searchPlaceholder: "Pesquisar um jogo…",
    empty: "Nenhum jogo registrado corresponde a essa busca.",
    expand: "Resultado completo e limites conhecidos",
    collapse: "Ocultar o resultado completo",
    whatReached: "O que foi alcançado",
    knownLimits: "Limites conhecidos",
    performance: "Medido",
    confirmedOn: "Confirmado pelo mantenedor em {date}.",
    detailCta: "Histórico de testes e capturas",
    noticeTitle: "Um resultado pertence à compilação que o produziu",
    noticeBody:
      "Uma etapa alcançada numa compilação não promete nada sobre a seguinte, e vários registros dizem abertamente que precisam de uma nova sessão depois de mudanças no renderizador. Se o que você vê é diferente, relate pelas",
    noticeLink: "issues do GitHub",
  },

  game: {
    backToList: "Todos os jogos",
    overviewHeading: "Situação atual",
    strengthsHeading: "O que funciona",
    limitsHeading: "O que não funciona",
    performanceHeading: "Desempenho medido",
    historyHeading: "Histórico de testes",
    historyLead:
      "Todas as sessões registradas deste jogo, das mais recentes para as mais antigas. As marcadas como compilação de desenvolvimento nunca foram publicadas como versão.",
    historyEmpty: "Ainda não há sessões individuais documentadas para este jogo.",
    capturesHeading: "Capturas",
    capturesLead:
      "Quadros produzidos pelo próprio emulador durante as sessões acima.",
    statusLabel: "Resultado",
    confirmedLabel: "Confirmado",
    buildLabel: "Compilação",
    hostLabel: "Máquina de teste",
    runsLabel: "Sessões registradas",
    otherTitles: "Outros jogos",
    metaTitle: "Compatibilidade de {title}",
    metaDescription:
      "Como {title} se comporta no PS5PCEM: resultado atual, limites conhecidos, tempos de quadro medidos e o histórico completo de testes com datas.",
    notFound: "Nenhum jogo registrado tem esse nome.",
  },

  download: {
    eyebrow: "Windows x64 · {channel}",
    channelRelease: "Versão",
    channelPrerelease: "Versão prévia",
    heading: "Baixar PS5PCEM {version}",
    lead: "Publicado em {date}. Cada arquivo vem da {link}, o único lugar onde aparecem compilações oficiais.",
    leadLink: "publicação no GitHub",
    verifyEyebrow: "Verificar",
    verifyHeading: "Somas SHA-256",
    verifyLead:
      "No Windows, execute certutil -hashfile <arquivo> SHA256 e compare a saída com o valor indicado aqui.",
    tableFile: "Arquivo",
    tableHash: "SHA-256",
    tableVersion: "Versão",
    tablePublished: "Publicado",
    tableLink: "Link",
    viewOnGitHub: "Ver no GitHub",
    download: "Baixar",
    signingTitle: "Sobre a assinatura",
    signingBody:
      "Os executáveis e o instalador têm assinatura Authenticode SHA-256 de Artur Strazewicz / PS5PCEM, com marca de tempo. O certificado é autoassinado, então o Windows ou o SmartScreen ainda podem avisar. A verificação confiável é comparar o hash abaixo.",
    requirementsHeading: "Requisitos de sistema",
    quickStartHeading: "Como começar",
    noContentNote:
      "Jogos, firmware, chaves, bibliotecas de sistema e software de console não estão incluídos e não serão distribuídos aqui.",
    alsoEyebrow: "Também disponível",
    alsoHeading: "Notas da versão, código-fonte e compilações anteriores",
    releaseNotesCta: "Notas da versão {version}",
    buildFromSource: "Compilar a partir do código com Zig",
    allReleases: "Todas as publicações no GitHub",
  },

  status: {
    eyebrow: "Compilação {version} · {date}",
    heading: "Estado do projeto",
    lead: "O que o emulador consegue fazer, subsistema por subsistema. As etapas de cada jogo estão na {link}; esta página mostra a engenharia por trás delas.",
    leadLink: "página de compatibilidade",
    summaryBuild: "Compilação atual",
    summaryTitles: "Jogos registrados",
    summaryTitlesValue: "{playable} de {total} terminados",
    summaryTitlesHint: "Confirmação mais recente {date}",
    summaryHost: "Máquina de referência",
    summaryHostHint: "Todos os tempos deste site",
    subsystemsEyebrow: "Subsistemas",
    subsystemsHeading: "O estado de cada parte",
    subsystemsLead:
      "Condensado do documento sobre o estado da implementação, que traz a lista completa.",
    stateWorking: "Funciona",
    statePartial: "Parcial",
    stateDeferred: "Adiado",
    notClaimedTitle: "O que aqui não se afirma de propósito",
    notClaimedBody:
      "Um menu não é jogabilidade, e um quadro desenhado não é ser jogável. Alguns jogos desenham corretamente, mas muito devagar para serem jogados, e é assim que ficam registrados. Nada aqui afirma uma etapa que não tenha sido observada numa compilação.",
    deeperEyebrow: "Mais a fundo",
    deeperHeading: "A documentação do repositório",
    deeperLead:
      "O interior dos subsistemas — RDNA2, GPU, Vulkan, memória, carregador, HLE, CPU, diagnóstico e tempo de execução — está indexado na documentação de arquitetura.",
    implementationCta: "Estado da implementação",
    statusDocCta: "Estado e compatibilidade",
    docsCta: "Índice da documentação",
    issuesCta: "Problemas abertos",
    supportHeading: "Apoiar o desenvolvimento",
    supportBody:
      "O PS5PCEM é GPL-3.0-or-later e desenvolvido abertamente. Boosty e Patreon são as duas formas de apoiar o trabalho.",
  },

  media: {
    eyebrow: "Capturas",
    heading: "Veja em funcionamento",
    lead: "Cada imagem abaixo saiu do próprio emulador. A legenda diz o que ela realmente é, para que uma etapa de renderização nunca seja confundida com um jogo jogável.",
    youtubeCta: "Assistir no YouTube",
    compatibilityCta: "Resultados de compatibilidade",
    galleryEyebrow: "Galeria",
    galleryHeading: "Capturas de desenvolvimento",
    galleryLead:
      "Ordenadas pelo quanto cada jogo avança: primeiro os terminados, depois as cenas de jogo, os menus e as primeiras etapas de renderização.",
    timelineEyebrow: "Linha do tempo",
    timelineHeading: "Sessões recentes",
    timelineLead:
      "As sessões registradas mais recentes de todos os jogos, cada uma ligada ao seu histórico completo de testes.",
    youtubeHeading: "Sessões gravadas no YouTube",
    youtubeBody:
      "Imagens paradas não mostram o ritmo dos quadros. O canal publica sessões completas dos jogos acompanhados aqui, para que você julgue uma compilação por conta própria.",
  },

  extract: {
    eyebrow: "Ferramenta incluída",
    heading: "Extrator de PKG",
    lead: "Desde a {version}, o pkgextractor.exe acompanha o lançador, com um botão Extract PKG que o executa.",
    supportedHeading: "O que ele trata",
    notSupportedHeading: "O que ele não trata",
    usageHeading: "Como usar",
    noticeTitle: "Pacotes de varejo estão fora do escopo",
    noticeBody:
      "O extrator lê os formatos FPKG de depuração observados durante o desenvolvimento. Pacotes de varejo criptografados não são suportados, e nenhuma chave é incluída ou pressuposta.",
  },

  footer: {
    site: "Site",
    resources: "Recursos",
    community: "Comunidade",
    docs: "Documentação",
    buildFromSource: "Compilar a partir do código",
    statusDoc: "Documento de estado",
    implementationDoc: "Estado da implementação",
    reportIssue: "Relatar um problema",
    licensePre: "© 2026 {author}. O PS5PCEM é licenciado sob a",
    licenseLink: "GNU GPL, versão 3 ou posterior",
    notAffiliated:
      "Sem vínculo com a Sony Interactive Entertainment nem endosso dela. Nenhum jogo, firmware, chave ou biblioteca de sistema é distribuído aqui.",
  },

  notFound: {
    code: "404",
    heading: "Essa página não existe",
    body: "O link provavelmente está desatualizado. Downloads, resultados de compatibilidade e estado do projeto continuam onde você espera encontrá-los.",
    compatibilityCta: "Compatibilidade",
    sourceHint: "Procurando o código-fonte?",
    sourceLink: "Downloads e instruções de compilação",
  },
};

export default pt;
