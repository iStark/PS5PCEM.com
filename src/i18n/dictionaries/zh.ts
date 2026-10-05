import type { Dictionary } from "./en";

const zh: Dictionary = {
  meta: {
    tagline: "用 Zig 编写的 PlayStation 5 实验性模拟研究",
    description:
      "PS5PCEM 是面向 Windows 的 PlayStation 5 实验性模拟器。查看逐款游戏的兼容性、实测性能，并下载当前原型版本。",
  },

  common: {
    skipToContent: "跳到正文",
    menu: "菜单",
    close: "关闭",
    language: "语言",
    chooseLanguage: "选择语言",
    github: "GitHub",
    youtube: "YouTube",
    getVersion: "获取 {version}",
    published: "发布于 {date}",
    latest: "最新",
    recommended: "推荐",
    readReport: "阅读报告",
    developmentBuild: "开发版本",
    release: "版本 {version}",
    moreCaptures: "更多截图",
    backHome: "返回首页",
  },

  seo: {
    home: {
      title: "PS5PCEM — 面向 Windows 的 PlayStation 5 实验性模拟器",
      description:
        "下载 PS5PCEM 原型版本，查看哪些 PlayStation 5 游戏真的能跑起来：实测帧时间、已知限制，以及每款游戏按日期排列的测试历史。",
    },
    download: {
      title: "下载 PS5PCEM {version}（Windows x64）",
      description:
        "面向 Windows 的 PS5PCEM {version}：便携压缩包或单用户安装程序，公开的 SHA-256 校验值、系统要求，以及此前的全部版本。",
    },
    compatibility: {
      title: "PlayStation 5 游戏兼容性列表 — PS5PCEM",
      description:
        "哪些 PS5 游戏能在 PS5PCEM 上运行：已记录 {total} 款，其中 {playable} 款完整通关，每款都附有实测帧时间、已知限制和按日期排列的测试历史。",
    },
    status: {
      title: "项目进展 — PS5PCEM 目前的能力",
      description:
        "按子系统逐一说明 PS5PCEM：客户机代码原生执行、RDNA2 着色器翻译为 SPIR-V、Vulkan 呈现、音频、手柄、存档以及 Windows 启动器。",
    },
    media: {
      title: "截图与运行实录 — PS5PCEM",
      description:
        "由 PS5PCEM 自身产生的开发截图，每张都注明它究竟是什么，另有发布完整运行录像的 YouTube 频道。",
    },
    extract: {
      title: "用于 PS5 调试包的 PKG 解包器 — PS5PCEM",
      description:
        "pkgextractor 随 PS5PCEM {version} 一同提供：解包已观察到的 PS5 调试 FPKG 结构、内部 PFS、NAPS 映射与 Kraken 数据块。不支持加密的零售包。",
    },
  },

  nav: {
    home: "首页",
    download: "下载",
    compatibility: "兼容性",
    status: "项目进展",
    media: "影像",
    extract: "PKG 解包器",
    games: "游戏",
  },

  tiers: {
    playable: {
      label: "可玩 · 可通关",
      short: "可玩",
      description:
        "维护者已将游戏玩到结束。在记录下来的运行中，画面、声音和输入都表现正确，但帧率仍取决于场景和硬件。",
    },
    ingame: {
      label: "能进入游戏场景",
      short: "进入游戏",
      description:
        "已载入的游戏画面或引擎场景能够显示出来，但并未声称可以通关：帧率、载入时间或未验证的输入仍是障碍。",
    },
    intro: {
      label: "能绘制片头与菜单",
      short: "片头 / 菜单",
      description:
        "游戏通过客户机渲染流程绘制出片头、厂商标志、画面或菜单。尚未进入游戏，或者进入后未经验证。",
    },
    boots: {
      label: "能启动并加载资源",
      short: "可启动",
      description:
        "模块完成链接，引擎初始化有所推进，但尚未声称有画面送到屏幕上。",
    },
  },

  home: {
    badge: "早期原型 · {version}",
    heading: "公开进行的 PlayStation 5 模拟研究",
    lead: "PS5PCEM 是一个用 Zig 编写的实验性模拟器：客户机代码原生执行，RDNA2 着色器被翻译为 SPIR-V，由 Vulkan 呈现结果，再由 Windows 启动器把这一切串联起来。已记录的 {total} 款游戏中，有 {playable} 款被完整通关。",
    ctaDownload: "下载 {version}",
    ctaResults: "查看测试结果",
    requirements:
      "Windows 10 2004 或更新 · x86-64-v3 · Vulkan 1.2 驱动 · GPL-3.0-or-later",
    heroCaption:
      "《Cat Quest III》，由 PS5PCEM 在基准机器上绘制。已确认可从头玩到尾。",
    statTested: "已记录游戏",
    statTestedHint: "在 {release} 上测试",
    statPlayable: "完整通关",
    statPlayableHint: "由维护者确认",
    statIngame: "能进入游戏场景",
    statIngameHint: "画面中已有游戏内容",
    statEarly: "启动、片头或菜单",
    statEarlyHint: "更早的阶段",
    featuresEyebrow: "目前的进展",
    featuresHeading: "一个把测量公开的原型",
    featuresLead:
      "客户机代码原生执行，RDNA2 着色器转为 SPIR-V，Vulkan 把画面送上屏幕。有几款游戏可以通关，另一些停在菜单或载入画面。下面每一条结果都会说明属于哪种，以及出自哪个版本。",
    resultsEyebrow: "测试结果",
    resultsHeading: "兼容性概览",
    resultsLead:
      "每条结果都由维护者在 {host} 上观察得到。时间数据描述的是那台机器，在您的机器上会不同。点开某款游戏可查看完整测试历史。",
    resultsCta: "全部 {total} 条结果",
    youtubeEyebrow: "看它运行",
    youtubeHeading: "YouTube 频道上的实录",
    youtubeLead:
      "静态截图无法体现流畅度。频道会把这里追踪的游戏按实际运行的样子录下来——要评价一个画面正确但速度缓慢的版本，这是诚实的办法。",
    youtubeCta: "打开 YouTube 频道",
    youtubeBrowse: "浏览截图",
    legalTitle: "只使用您有权使用的内容",
    legalBody:
      "PS5PCEM 不附带、本站也不提供任何游戏、主机固件、系统库、密钥或厂商资料。本项目用于互操作性研究与教育。完整的",
    legalLink: "法律说明",
    tryHeading: "在 Windows 上试用 {version}",
    tryLead: "便携压缩包或单用户安装程序，两者都附有公开的 SHA-256 校验值。",
    tryDownload: "下载",
    trySource: "GitHub 上的源码",
  },

  compatibility: {
    eyebrow: "测试结果",
    heading: "游戏兼容性",
    lead: "每款被观察的游戏能走到哪一步，以及是什么拦住了它。这些结果与模拟器仓库中的{source}保持一致。",
    sourceLabel: "进展文档",
    meta: "通关报告都带有维护者确认的日期。所有时间数据都基于 {host} 开发机器，在其他硬件上会有差异。游戏内容由用户自行提供，本站从不分发。",
    gradingHeading: "结果如何分级",
    titlesHeading: "已记录的游戏",
    showing: "共 {total} 款，显示 {shown} 款。",
    filterAll: "全部游戏",
    searchLabel: "搜索游戏",
    searchPlaceholder: "搜索游戏…",
    empty: "没有已记录的游戏符合这个搜索。",
    expand: "完整结果与已知限制",
    collapse: "收起完整结果",
    whatReached: "已达成的部分",
    knownLimits: "已知限制",
    performance: "实测",
    confirmedOn: "由维护者于 {date} 确认。",
    detailCta: "测试历史与截图",
    noticeTitle: "结果属于产生它的那个版本",
    noticeBody:
      "在某个版本上达成的阶段，并不是对下一个版本的承诺；有几条记录明确写着，在渲染器改动之后需要重新跑一遍。如果您看到的情况不同，请通过",
    noticeLink: "GitHub issues",
  },

  game: {
    backToList: "全部游戏",
    overviewHeading: "当前状态",
    strengthsHeading: "可以工作的部分",
    limitsHeading: "还不能工作的部分",
    performanceHeading: "实测性能",
    historyHeading: "测试历史",
    historyLead:
      "这款游戏的所有记录运行，从最新开始。标为开发版本的条目从未作为正式版发布。",
    historyEmpty: "这款游戏还没有单独记录的运行。",
    capturesHeading: "截图",
    capturesLead: "上述运行过程中由模拟器自身产生的画面。",
    statusLabel: "结果",
    confirmedLabel: "已确认",
    buildLabel: "版本",
    hostLabel: "测试机器",
    runsLabel: "记录的运行",
    otherTitles: "其他游戏",
    metaTitle: "{title} 兼容性",
    metaDescription:
      "{title} 在 PS5PCEM 下的表现：当前结果、已知限制、实测帧时间，以及按日期排列的完整测试历史。",
    notFound: "记录中没有这个名字的游戏。",
  },

  download: {
    eyebrow: "Windows x64 · {channel}",
    channelRelease: "正式版",
    channelPrerelease: "预发布版",
    heading: "下载 PS5PCEM {version}",
    lead: "发布于 {date}。所有文件都来自{link}，那是官方版本唯一出现的地方。",
    leadLink: "GitHub 发布页",
    verifyEyebrow: "校验",
    verifyHeading: "SHA-256 校验值",
    verifyLead:
      "在 Windows 上运行 certutil -hashfile <文件> SHA256，并把输出与这里的数值对照。",
    tableFile: "文件",
    tableHash: "SHA-256",
    tableVersion: "版本",
    tablePublished: "发布时间",
    tableLink: "链接",
    viewOnGitHub: "在 GitHub 上查看",
    download: "下载",
    signingTitle: "关于数字签名",
    signingBody:
      "可执行文件和安装程序带有 Artur Strazewicz / PS5PCEM 的 SHA-256 Authenticode 签名及时间戳。证书为自签名，因此 Windows 或 SmartScreen 仍可能发出警告。可靠的检查方式是比对下面的哈希值。",
    requirementsHeading: "系统要求",
    quickStartHeading: "如何开始",
    noContentNote:
      "游戏、固件、密钥、系统库和主机软件均不包含在内，也不会在此分发。",
    alsoEyebrow: "其他内容",
    alsoHeading: "更新说明、源码与早期版本",
    releaseNotesCta: "{version} 的更新说明",
    buildFromSource: "用 Zig 从源码构建",
    allReleases: "GitHub 上的全部发布",
  },

  status: {
    eyebrow: "版本 {version} · {date}",
    heading: "项目进展",
    lead: "模拟器目前的能力，按子系统逐一说明。单款游戏的阶段记录在{link}；本页讲的是其背后的工程。",
    leadLink: "兼容性页面",
    summaryBuild: "当前版本",
    summaryTitles: "已记录游戏",
    summaryTitlesValue: "{total} 款中 {playable} 款已通关",
    summaryTitlesHint: "最近一次确认 {date}",
    summaryHost: "基准机器",
    summaryHostHint: "本站所有时间数据",
    subsystemsEyebrow: "子系统",
    subsystemsHeading: "各部分的状态",
    subsystemsLead: "摘自实现进展文档，完整清单见该文档。",
    stateWorking: "可用",
    statePartial: "部分可用",
    stateDeferred: "已推迟",
    notClaimedTitle: "这里刻意不作的声明",
    notClaimedBody:
      "菜单不等于游戏过程，画出一帧也不等于可玩。有些游戏画得正确，却慢到无法游玩，记录中就如实这样写。本站不会声称任何未曾在某个版本上观察到的阶段。",
    deeperEyebrow: "深入了解",
    deeperHeading: "仓库中的文档",
    deeperLead:
      "各子系统的内部细节——RDNA2、GPU、Vulkan、内存、加载器、HLE、CPU、诊断与运行时——都在架构文档中编入索引。",
    implementationCta: "实现进展",
    statusDocCta: "进展与兼容性",
    docsCta: "文档索引",
    issuesCta: "待解决问题",
    supportHeading: "支持开发",
    supportBody:
      "PS5PCEM 采用 GPL-3.0-or-later 并公开开发。可以通过 Boosty 和 Patreon 支持这项工作。",
  },

  media: {
    eyebrow: "截图",
    heading: "看它跑起来",
    lead: "下面每一帧都来自模拟器本身。每条说明都写明它究竟是什么，以免把渲染阶段误认为可玩的游戏。",
    youtubeCta: "在 YouTube 观看",
    compatibilityCta: "兼容性结果",
    galleryEyebrow: "图库",
    galleryHeading: "开发过程截图",
    galleryLead:
      "按各游戏走到的程度排列：先是已通关的，然后是游戏场景、菜单和早期渲染阶段。",
    timelineEyebrow: "时间线",
    timelineHeading: "近期运行",
    timelineLead: "所有游戏中最新的记录运行，每条都链接到完整测试历史。",
    youtubeHeading: "YouTube 上的实录",
    youtubeBody:
      "截图无法体现帧的节奏。频道会发布这里追踪游戏的完整运行录像，让您自己判断一个版本的实际表现。",
  },

  extract: {
    checkTitle: "GTA III：完整解包",
    checkBody: "10 月 2 日的开发版解包工具修复了 GTA III: The Definitive Edition（PPSA03527 v1.007）的 InvalidPfs 错误。全部 48 个文件均已解包，包括 eboot.bin、六个模块和两个 PAK 文件；两个 PAK 索引的校验和均匹配。全部 21 项测试通过。此次未启动游戏。修复已纳入开发源码和本地工具，已发布的下载包未更新。",
    checkLink: "查看解包报告",
    eyebrow: "随附工具",
    heading: "PKG 解包器",
    lead: "从 {version} 起，启动器旁会一同提供 pkgextractor.exe，并带有调用它的 Extract PKG 按钮。",
    supportedHeading: "能处理什么",
    notSupportedHeading: "不能处理什么",
    usageHeading: "如何使用",
    noticeTitle: "零售包不在范围内",
    noticeBody:
      "解包器读取的是开发过程中观察到的调试 FPKG 结构。加密的零售包不受支持，也不包含、不暗示任何密钥。",
  },

  footer: {
    site: "站点",
    resources: "资料",
    community: "社区",
    docs: "文档",
    buildFromSource: "从源码构建",
    statusDoc: "进展文档",
    implementationDoc: "实现进展",
    reportIssue: "报告问题",
    licensePre: "© 2026 {author}。PS5PCEM 采用",
    licenseLink: "GNU GPL 第 3 版或更新版本",
    notAffiliated:
      "本项目与索尼互动娱乐无关，也未获其认可。本站不分发任何游戏、固件、密钥或系统库。",
  },

  notFound: {
    code: "404",
    heading: "该页面不存在",
    body: "链接很可能已经过期。下载、兼容性结果和项目进展都还在您预期的位置。",
    compatibilityCta: "兼容性",
    sourceHint: "在找源码？",
    sourceLink: "下载与构建说明",
  },
};

export default zh;
