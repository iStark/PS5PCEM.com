import type { Dictionary } from "./en";

const ar: Dictionary = {
  meta: {
    tagline: "بحث تجريبي في محاكاة PlayStation 5، مكتوب بلغة Zig",
    description:
      "PS5PCEM محاكي تجريبي لجهاز PlayStation 5 يعمل على Windows. تابع توافق كل لعبة على حدة، والأداء المقيس، وحمّل النموذج الحالي.",
  },

  common: {
    skipToContent: "تخطَّ إلى المحتوى",
    menu: "القائمة",
    close: "إغلاق",
    language: "اللغة",
    chooseLanguage: "اختر لغة",
    github: "GitHub",
    youtube: "YouTube",
    getVersion: "احصل على {version}",
    published: "نُشر في {date}",
    latest: "الأحدث",
    recommended: "موصى به",
    readReport: "اقرأ التقرير",
    developmentBuild: "نسخة تطوير",
    release: "الإصدار {version}",
    moreCaptures: "صور أخرى",
    backHome: "العودة إلى الصفحة الرئيسية",
  },

  seo: {
    home: {
      title: "PS5PCEM — محاكي PlayStation 5 تجريبي لنظام Windows",
      description:
        "حمّل نموذج PS5PCEM وشاهد أي ألعاب PlayStation 5 تعمل فعلًا: أزمنة إطارات مقيسة، وحدود معروفة، وتاريخ اختبارات بالتواريخ لكل لعبة.",
    },
    download: {
      title: "تنزيل PS5PCEM {version} لنظام Windows x64",
      description:
        "PS5PCEM {version} لنظام Windows: أرشيف محمول أو مثبِّت للمستخدم، بصمات SHA-256 منشورة، ومتطلبات النظام، وكل النسخ الأسبق.",
    },
    compatibility: {
      title: "قائمة توافق ألعاب PlayStation 5 — PS5PCEM",
      description:
        "أي ألعاب PS5 تعمل على PS5PCEM: {total} لعبة مسجَّلة، أُكملت منها {playable}، ولكل منها أزمنة إطارات مقيسة وحدود معروفة وتاريخ اختبارات بالتواريخ.",
    },
    status: {
      title: "حالة المشروع — ما يقدر عليه PS5PCEM اليوم",
      description:
        "PS5PCEM نظامًا فرعيًا بعد آخر: تنفيذ أصلي للشيفرة الضيفة، وترجمة مظلِّلات RDNA2 إلى SPIR-V، وعرض عبر Vulkan، والصوت، ويد التحكم، وملفات الحفظ، ومشغّل Windows.",
    },
    media: {
      title: "صور ولقطات مسجَّلة — PS5PCEM",
      description:
        "صور أنتجها محاكي PS5PCEM نفسه، ولكل منها شرح يقول ما هي بالضبط، إلى جانب قناة YouTube التي تنشر الجلسات الكاملة.",
    },
    extract: {
      title: "أداة فك حزم PKG التشخيصية لـ PS5 — PS5PCEM",
      description:
        "تُرفَق pkgextractor مع PS5PCEM {version}: فك تخطيطات FPKG التشخيصية المرصودة، وPFS الداخلي، وتعيينات NAPS، وكتل Kraken. والحزم التجارية المشفَّرة غير مدعومة.",
    },
  },

  nav: {
    home: "الرئيسية",
    download: "التنزيل",
    compatibility: "التوافق",
    status: "حالة المشروع",
    media: "الصور والفيديو",
    extract: "أداة فك حزم PKG",
    games: "الألعاب",
  },

  tiers: {
    playable: {
      label: "قابلة للعب · وللإكمال",
      short: "قابلة للعب",
      description:
        "أكمل القائم على المشروع اللعبة حتى نهايتها. الصورة والصوت والتحكم تعمل بشكل صحيح في الجلسات المسجَّلة، مع أن معدل الإطارات ما زال يتبع المشهد والعتاد.",
    },
    ingame: {
      label: "تصل إلى مشاهد داخل اللعبة",
      short: "داخل اللعبة",
      description:
        "تظهر على الشاشة لقطات لعب محمّلة أو مشاهد من المحرك، لكن لا يُدَّعى إمكان الإكمال: معدل الإطارات أو زمن التحميل أو تحكم غير مُختبر يقف في الطريق.",
    },
    intro: {
      label: "ترسم المقدمة والقوائم",
      short: "المقدمة / القوائم",
      description:
        "ترسم اللعبة مقدمتها وشعاراتها وتصميمها أو قوائمها عبر مسار الرسم الضيف. أما طور اللعب فلم يُبلَغ أو لم يُتحقق منه.",
    },
    boots: {
      label: "تبدأ وتحمّل ملفاتها",
      short: "تبدأ",
      description:
        "ترتبط الوحدات ويتقدم تهيئة المحرك، لكن لا يُدَّعى شيء عن إطار يظهر على الشاشة.",
    },
  },

  home: {
    badge: "نموذج مبكر · {version}",
    heading: "بحث في محاكاة PlayStation 5، على المكشوف",
    lead: "PS5PCEM محاكي تجريبي مكتوب بلغة Zig: الشيفرة الضيفة تُنفَّذ أصليًا، وتُترجم مظلِّلات RDNA2 إلى SPIR-V، ويعرض Vulkan النتيجة، ويربط كل ذلك مشغّل لنظام Windows. من بين {total} لعبة مسجَّلة، أُكملت {playable} من البداية إلى النهاية.",
    ctaDownload: "تنزيل {version}",
    ctaResults: "اطّلع على نتائج الاختبارات",
    requirements:
      "Windows 10 2004 أو أحدث · x86-64-v3 · برنامج تشغيل Vulkan 1.2 · GPL-3.0-or-later",
    heroCaption:
      "لعبة Cat Quest III كما رسمها PS5PCEM على جهاز القياس المرجعي. مؤكَّد أنها قابلة للعب من البداية إلى النهاية.",
    statTested: "ألعاب مسجَّلة",
    statTestedHint: "اختُبرت على {release}",
    statPlayable: "أُكملت بالكامل",
    statPlayableHint: "بتأكيد القائم على المشروع",
    statIngame: "تصل إلى مشاهد داخل اللعبة",
    statIngameHint: "لقطات لعب على الشاشة",
    statEarly: "البدء أو المقدمة أو القوائم",
    statEarlyHint: "مراحل أسبق",
    featuresEyebrow: "أين وصل المشروع",
    featuresHeading: "نموذج بقياسات معلنة",
    featuresLead:
      "تُنفَّذ الشيفرة الضيفة أصليًا، وتتحول مظلِّلات RDNA2 إلى SPIR-V، ويضع Vulkan الإطارات على الشاشة. بعض الألعاب تُكمَل حتى النهاية، وأخرى تتوقف عند قائمة أو شاشة تحميل. وكل نتيجة أدناه تبيّن أيّ الحالتين، وعلى أي نسخة.",
    resultsEyebrow: "نتائج الاختبارات",
    resultsHeading: "التوافق بلمحة",
    resultsLead:
      "رصد القائم على المشروع كل نتيجة على جهاز {host}. والأزمنة تصف ذلك الجهاز وستختلف على جهازك. افتح أي لعبة لترى تاريخ اختبارها الكامل.",
    resultsCta: "كل النتائج: {total}",
    youtubeEyebrow: "شاهده يعمل",
    youtubeHeading: "تسجيلات الجلسات على قناة YouTube",
    youtubeLead:
      "الصورة الثابتة لا تُظهر سلاسة الحركة. تعرض القناة الألعاب المتابَعة هنا كما تعمل فعلًا، وهي الطريقة الصادقة للحكم على نسخة ترسم بشكل صحيح لكن ببطء.",
    youtubeCta: "افتح قناة YouTube",
    youtubeBrowse: "تصفَّح الصور",
    legalTitle: "استخدم ما تملك حق استخدامه فقط",
    legalBody:
      "لا تُرفَق مع PS5PCEM ولا تُقدَّم هنا أي ألعاب أو برامج ثابتة للجهاز أو مكتبات نظام أو مفاتيح أو مواد تابعة للمُصنِّع. المشروع قائم لأجل بحث التشغيل البيني والتعليم. وتجد",
    legalLink: "الملاحظة القانونية الكاملة",
    tryHeading: "جرّب {version} على Windows",
    tryLead:
      "أرشيف محمول أو مثبِّت للمستخدم الحالي، وكلاهما مع بصمات SHA-256 منشورة.",
    tryDownload: "تنزيل",
    trySource: "الشيفرة المصدرية على GitHub",
  },

  compatibility: {
    eyebrow: "نتائج الاختبارات",
    heading: "توافق الألعاب",
    lead: "إلى أي مدى تصل كل لعبة مرصودة، وما يمنعها من التقدم أكثر. تتبع هذه النتائج {source} في مستودع المحاكي.",
    sourceLabel: "مستند الحالة",
    meta: "تقارير الإكمال تحمل تاريخ تأكيد القائم على المشروع لها. وكل الأزمنة تعود إلى جهاز التطوير {host} وستختلف على عتاد آخر. محتوى الألعاب يوفّره المستخدم محليًا ولا يُوزَّع هنا أبدًا.",
    gradingHeading: "كيف تُصنَّف النتائج",
    titlesHeading: "الألعاب المسجَّلة",
    showing: "تُعرض {shown} من {total}.",
    filterAll: "كل الألعاب",
    searchLabel: "ابحث في الألعاب",
    searchPlaceholder: "ابحث عن لعبة…",
    empty: "لا توجد لعبة مسجَّلة تطابق هذا البحث.",
    expand: "النتيجة الكاملة والحدود المعروفة",
    collapse: "إخفاء النتيجة الكاملة",
    whatReached: "ما تم الوصول إليه",
    knownLimits: "الحدود المعروفة",
    performance: "المقيس",
    confirmedOn: "أكّده القائم على المشروع في {date}.",
    detailCta: "تاريخ الاختبارات والصور",
    noticeTitle: "كل نتيجة تنتمي إلى النسخة التي أنتجتها",
    noticeBody:
      "المرحلة التي تُسجَّل على نسخة ليست وعدًا بشأن النسخة التالية، وعدة مدخلات تقول صراحةً إنها تحتاج جلسة جديدة بعد تغييرات محرك الرسم. وإن اختلف ما تراه، فأبلغ عنه عبر",
    noticeLink: "صفحة المشكلات على GitHub",
  },

  game: {
    backToList: "كل الألعاب",
    overviewHeading: "الحالة الراهنة",
    strengthsHeading: "ما يعمل",
    limitsHeading: "ما لا يعمل",
    performanceHeading: "الأداء المقيس",
    historyHeading: "تاريخ الاختبارات",
    historyLead:
      "كل الجلسات المسجَّلة لهذه اللعبة، الأحدث أولًا. والمدخلات الموسومة بأنها نسخة تطوير لم تُنشر قط كإصدار.",
    historyEmpty: "لم تُوثَّق بعد جلسات منفردة لهذه اللعبة.",
    capturesHeading: "الصور",
    capturesLead: "إطارات أنتجها المحاكي نفسه خلال الجلسات المذكورة أعلاه.",
    statusLabel: "النتيجة",
    confirmedLabel: "مؤكَّد",
    buildLabel: "النسخة",
    hostLabel: "جهاز الاختبار",
    runsLabel: "الجلسات المسجَّلة",
    otherTitles: "ألعاب أخرى",
    metaTitle: "توافق {title}",
    metaDescription:
      "كيف تتصرف {title} في PS5PCEM: النتيجة الحالية، والحدود المعروفة، وأزمنة الإطارات المقيسة، وتاريخ الاختبارات الكامل بالتواريخ.",
    notFound: "لا توجد لعبة مسجَّلة بهذا الاسم.",
  },

  download: {
    changesHeading: "التغييرات في {version}",
    changesLauncher: "إصلاح مهم: يمكن تشغيل الألعاب مجددًا من واجهة التشغيل في الحزم المنشورة. تم تصحيح مسار مجلد العمل؛ تعرض حالات الفشل الآن رسالة Windows ورمز الخطأ.",
    changesFeatures: "الجديد: خطوط FreeType وإصلاح بدء Jurassic Park، وMemoryPool وترميز PNG ووظائف RTC وعدادات AMPR ومزج الألوان المضغوطة والجمع الأفقي واستدعاءات برامج التظليل الفرعية المقيدة.",
    changesLimits: "تستخدم الملفات التنفيذية شهادة التوقيع نفسها المستخدمة في الإصدار السابق. لقطات التطوير مؤرخة؛ اختبارات التعليمات لا تثبت معدل إطارات جديدًا أو إكمال الألعاب.",
    eyebrow: "Windows x64 · {channel}",
    channelRelease: "إصدار",
    channelPrerelease: "إصدار أولي",
    heading: "تنزيل PS5PCEM {version}",
    lead: "نُشر في {date}. كل ملف يأتي من {link}، وهو الموضع الوحيد الذي تظهر فيه النسخ الرسمية.",
    leadLink: "صفحة الإصدار على GitHub",
    verifyEyebrow: "التحقق",
    verifyHeading: "بصمات SHA-256",
    verifyLead:
      "على Windows، نفّذ certutil -hashfile <الملف> SHA256 وقارن الناتج بالقيمة المذكورة هنا.",
    tableFile: "الملف",
    tableHash: "SHA-256",
    tableVersion: "الإصدار",
    tablePublished: "تاريخ النشر",
    tableLink: "الرابط",
    viewOnGitHub: "اعرضه على GitHub",
    download: "تنزيل",
    signingTitle: "عن التوقيع الرقمي",
    signingBody:
      "الملفات التنفيذية والمثبِّت تحمل توقيع Authenticode بخوارزمية SHA-256 باسم Artur Strazewicz / PS5PCEM مع طابع زمني. والشهادة موقَّعة ذاتيًا، لذا قد يحذّر Windows أو SmartScreen على أي حال. والفحص الموثوق هو مطابقة البصمة أدناه.",
    requirementsHeading: "متطلبات النظام",
    quickStartHeading: "كيف تبدأ",
    noContentNote:
      "الألعاب والبرامج الثابتة والمفاتيح ومكتبات النظام وبرامج الجهاز غير مُرفقة ولن تُوزَّع هنا.",
    alsoEyebrow: "متاح كذلك",
    alsoHeading: "ملاحظات الإصدار والشيفرة والنسخ الأسبق",
    releaseNotesCta: "ملاحظات الإصدار {version}",
    buildFromSource: "البناء من الشيفرة باستخدام Zig",
    allReleases: "كل الإصدارات على GitHub",
  },

  status: {
    eyebrow: "النسخة {version} · {date}",
    heading: "حالة المشروع",
    lead: "ما يقدر عليه المحاكي، نظامًا فرعيًا بعد آخر. أما مراحل كل لعبة فهي في {link}؛ وهذه الصفحة تعرض الهندسة التي تقف خلفها.",
    leadLink: "صفحة التوافق",
    summaryBuild: "النسخة الحالية",
    summaryTitles: "ألعاب مسجَّلة",
    summaryTitlesValue: "{playable} من {total} أُكملت",
    summaryTitlesHint: "أحدث تأكيد {date}",
    summaryHost: "الجهاز المرجعي",
    summaryHostHint: "كل الأزمنة في هذا الموقع",
    subsystemsEyebrow: "الأنظمة الفرعية",
    subsystemsHeading: "حالة كل جزء",
    subsystemsLead:
      "ملخَّص من مستند حالة التنفيذ، وفيه القائمة الكاملة.",
    stateWorking: "يعمل",
    statePartial: "جزئي",
    stateDeferred: "مؤجَّل",
    notClaimedTitle: "ما لا يُدَّعى هنا عن قصد",
    notClaimedBody:
      "القائمة ليست طور لعب، والإطار المرسوم ليس قابلية للعب. بعض الألعاب ترسم بشكل صحيح لكن أبطأ بكثير من أن تُلعب، وهكذا سُجِّلت. ولا شيء هنا يدّعي مرحلة لم تُرصد على نسخة فعلية.",
    deeperEyebrow: "تفصيل أعمق",
    deeperHeading: "التوثيق في المستودع",
    deeperLead:
      "تفاصيل الأنظمة الفرعية — RDNA2 وGPU وVulkan والذاكرة والمحمِّل وHLE والمعالج والتشخيص وبيئة التشغيل — مفهرسة في توثيق البنية.",
    implementationCta: "حالة التنفيذ",
    statusDocCta: "الحالة والتوافق",
    docsCta: "فهرس التوثيق",
    issuesCta: "المشكلات المفتوحة",
    supportHeading: "ادعم التطوير",
    supportBody:
      "PS5PCEM مرخَّص بـ GPL-3.0-or-later ويُطوَّر على المكشوف. ويمكن دعم العمل عبر Boosty وPatreon.",
  },

  media: {
    eyebrow: "الصور",
    heading: "شاهده وهو يعمل",
    lead: "كل إطار أدناه خرج من المحاكي نفسه. ويقول الشرح ما هو بالضبط، حتى لا تُحسَب مرحلة رسم لعبةً قابلة للعب.",
    youtubeCta: "شاهد على YouTube",
    compatibilityCta: "نتائج التوافق",
    galleryEyebrow: "المعرض",
    galleryHeading: "صور من التطوير",
    galleryLead:
      "مرتَّبة حسب ما تبلغه كل لعبة: المكتملة أولًا، ثم مشاهد اللعب، فالقوائم، فمراحل الرسم المبكرة.",
    timelineEyebrow: "التسلسل الزمني",
    timelineHeading: "جلسات حديثة",
    timelineLead:
      "أحدث الجلسات المسجَّلة عبر كل الألعاب، وكل منها موصول بتاريخ اختبارها الكامل.",
    youtubeHeading: "تسجيلات الجلسات على YouTube",
    youtubeBody:
      "الصور الثابتة لا تُظهر إيقاع الإطارات. تنشر القناة جلسات كاملة للألعاب المتابَعة هنا، لتحكم على أي نسخة بنفسك.",
  },

  extract: {
    checkTitle: "GTA III: استخراج الحزمة بالكامل",
    checkBody: "يصلح إصدار التطوير لأداة الاستخراج بتاريخ 2 أكتوبر خطأ InvalidPfs في GTA III: The Definitive Edition ‏(PPSA03527 v1.007). استُخرجت الملفات الـ48، بما فيها eboot.bin وست وحدات وأرشيفا PAK، وتطابقت قيم التحقق لفهرسي PAK. نجحت الاختبارات الـ21. لم تُشغّل اللعبة. الإصلاح موجود في الشفرة المصدرية والأداة المحلية؛ حزم التنزيل المنشورة لم تتغير.",
    checkLink: "قراءة تقرير الاستخراج",
    eyebrow: "أداة مرفقة",
    heading: "أداة فك حزم PKG",
    lead: "منذ {version} يُرفَق pkgextractor.exe إلى جانب المشغّل، مع زر Extract PKG الذي يشغّله.",
    supportedHeading: "ما تتعامل معه",
    notSupportedHeading: "ما لا تتعامل معه",
    usageHeading: "طريقة الاستخدام",
    noticeTitle: "الحزم التجارية خارج النطاق",
    noticeBody:
      "تقرأ الأداة تخطيطات FPKG التشخيصية التي رُصدت خلال التطوير. والحزم التجارية المشفَّرة غير مدعومة، ولا تُرفَق أي مفاتيح ولا يُفترض وجودها.",
  },

  footer: {
    site: "الموقع",
    resources: "المصادر",
    community: "المجتمع",
    docs: "التوثيق",
    buildFromSource: "البناء من الشيفرة",
    statusDoc: "مستند الحالة",
    implementationDoc: "حالة التنفيذ",
    reportIssue: "أبلغ عن مشكلة",
    licensePre: "© 2026 {author}. PS5PCEM مرخَّص بموجب",
    licenseLink: "رخصة GNU GPL، الإصدار 3 أو أحدث",
    notAffiliated:
      "لا صلة للمشروع بشركة Sony Interactive Entertainment ولا تزكية منها. ولا تُوزَّع هنا أي ألعاب أو برامج ثابتة أو مفاتيح أو مكتبات نظام.",
  },

  notFound: {
    code: "404",
    heading: "هذه الصفحة غير موجودة",
    body: "الرابط قديم على الأرجح. أما التنزيلات ونتائج التوافق وحالة المشروع فما زالت كلها في مواضعها المتوقعة.",
    compatibilityCta: "التوافق",
    sourceHint: "تبحث عن الشيفرة المصدرية؟",
    sourceLink: "التنزيلات وتعليمات البناء",
  },
};

export default ar;
