export type CurriculumUnit = { n: number; en: string; ar: string };

const LEVEL_ONE_UNITS: CurriculumUnit[] = [
  { n: 1, en: "Introductions", ar: "التعارف" },
  { n: 2, en: "Art", ar: "الفن" },
  { n: 3, en: "Fruits", ar: "الفواكه" },
  { n: 4, en: "Weather", ar: "الطقس" },
  { n: 5, en: "Toys", ar: "الألعاب" },
  { n: 6, en: "My body", ar: "جسمي" },
  { n: 7, en: "My family", ar: "عائلتي" },
  { n: 8, en: "My school", ar: "مدرستي" },
  { n: 9, en: "My week", ar: "أسبوعي" },
  { n: 10, en: "Time", ar: "الوقت" },
];
const LEVEL_TWO_UNITS: CurriculumUnit[] = [
  { n: 1, en: "My Friends", ar: "أصحابي" },
  { n: 2, en: "Pets", ar: "الحيوانات الأليفة" },
  { n: 3, en: "Sports", ar: "الرياضة" },
  { n: 4, en: "Animals", ar: "الحيوانات" },
  { n: 5, en: "Eating Out", ar: "الأكل برّه" },
  { n: 6, en: "My Home", ar: "بيتي" },
  { n: 7, en: "School", ar: "المدرسة" },
  { n: 8, en: "Hobbies", ar: "الهوايات" },
  { n: 9, en: "Clothes", ar: "الملابس" },
  { n: 10, en: "Out and About", ar: "الخروجات" },
];

export type Level = {
  n: number;
  cefr: string;
  titleEn: string;
  titleAr: string;
  desc: string;
  topics: string[];
  units?: CurriculumUnit[];
  skills: string[];
  outcome: string;
};

export const LEVELS: Level[] = [
  {
    n: 1,
    cefr: "Pre-A1",
    titleEn: "English Foundations",
    titleAr: "أساسيات الإنجليزي",
    desc: "الطفل يبني أساس اللغة من خلال موضوعات قريبة منه وجُمل بسيطة يقدر يستخدمها فورًا.",
    topics: LEVEL_ONE_UNITS.map((unit) => unit.ar),
    units: LEVEL_ONE_UNITS,
    skills: [
      "مفردات أساسية يستخدمها كل يوم",
      "تكوين جُمل قصيرة صحيحة",
      "استماع وفهم التعليمات البسيطة",
      "نطق سليم من البداية",
    ],
    outcome: "الطفل يبدأ يفهم ويستخدم إنجليزي بسيط في مواقف يومية.",
  },
  {
    n: 2,
    cefr: "Pre-A1 → A1",
    titleEn: "Building Communication",
    titleAr: "بداية التواصل",
    desc: "ننتقل من الكلمات المفردة إلى جُمل وحوارات حقيقية بين الطلاب.",
    topics: LEVEL_TWO_UNITS.map((unit) => unit.ar),
    units: LEVEL_TWO_UNITS,
    skills: [
      "تكوين الأسئلة والرد عليها",
      "وصف الأشخاص والأشياء",
      "حوارات يومية قصيرة",
      "استماع وبناء الجملة",
    ],
    outcome: "الطفل ينتقل من الكلمة المفردة إلى محادثة لها معنى.",
  },
  {
    n: 3,
    cefr: "A1",
    titleEn: "Confident Beginner",
    titleAr: "مبتدئ واثق",
    desc: "الطالب يبدأ يعبّر عن أفكاره هو، مش بس يردد جُمل جاهزة.",
    topics: [
      "المدينة",
      "الاتجاهات",
      "مساعدة الآخرين",
      "المهام المنزلية",
      "الطقس",
      "أنشطة المدرسة",
      "الهوايات",
      "الموسيقى",
      "المطاعم",
      "الوظائف",
      "السفر",
    ],
    skills: [
      "Present Simple — الكلام عن العادات والروتين",
      "Present Continuous — وصف اللي بيحصل دلوقتي",
      "لغة المستقبل والخطط",
      "الاتجاهات وحروف الجر",
      "have to / don't have to — الكلام عن الواجبات",
      "فترات كلام أطول",
    ],
    outcome: "الطالب يعبّر عن رأيه ويتواصل باستقلالية أكبر.",
  },
  {
    n: 4,
    cefr: "A1+",
    titleEn: "Stronger Communication",
    titleAr: "تواصل أقوى",
    desc: "القراءة والكتابة تبقى أعمق، والطالب يحكي عن تجاربه السابقة بثقة.",
    topics: [
      "الحياة اليومية",
      "تجارب سابقة",
      "الطفولة",
      "السفر",
      "المسابقات",
      "الرياضة",
      "الصحة",
      "الملابس",
      "العائلة",
      "الطبيعة",
    ],
    skills: [
      "Past Simple — الحكي عن أحداث حصلت في الماضي",
      "الأفعال الشاذة (Irregular verbs)",
      "المقارنة والتفضيل (Comparatives & Superlatives)",
      "الأحوال (Adverbs) لوصف الطريقة",
      "الأفعال الناقصة (Modals) للقدرة والاحتمال",
    ],
    outcome: "الطالب يحكي عن تجاربه ويبدأ يكتب فقرات منظمة.",
  },
  {
    n: 5,
    cefr: "A2",
    titleEn: "Independent English",
    titleAr: "إنجليزي مستقل",
    desc: "استخدام مستقل للغة في مواقف حياتية متنوعة، مع كلام وكتابة أطول.",
    topics: [
      "الطبخ",
      "المطاعم",
      "المدن",
      "المهن",
      "الدراسة بالخارج",
      "خطط المستقبل",
      "المناسبات",
      "الحيوانات",
      "البيئة",
      "التسوق",
      "السفر",
    ],
    skills: [
      "لغة المستقبل والتخطيط",
      "الجمل الشرطية (Conditionals) — النتائج والاحتمالات",
      "إبداء الرأي وتبريره",
      "كلام ممتد وكتابة أطول",
    ],
    outcome: "الطالب يستخدم الإنجليزي بمفرده في مواقف حياتية كتير.",
  },
  {
    n: 6,
    cefr: "A2+",
    titleEn: "Advanced Young Learner",
    titleAr: "متعلّم صغير متقدم",
    desc: "موضوعات أعمق ومناقشات حقيقية تطوّر التفكير واللغة معًا.",
    topics: [
      "أنشطة المدرسة",
      "الطبيعة",
      "الاستكشاف",
      "السفر",
      "التاريخ",
      "المتاحف",
      "الألغاز",
      "العلوم",
      "الفضاء",
    ],
    skills: [
      "Past Continuous — وصف مشهد كان مستمر في الماضي",
      "Present Perfect — الربط بين الماضي والحاضر",
      "الجمل الشرطية المتقدمة",
      "الأفعال الناقصة والمبني للمجهول (Passive)",
      "المناقشة وإبداء الحجة",
      "كتابة منظمة وكلام ممتد",
    ],
    outcome: "الطالب يشرح ويناقش ويبرر رأيه في موضوعات أعقد بثقة.",
  },
];

export const SKILL_CARDS = [
  {
    icon: "Mic",
    title: "Speaking",
    titleAr: "التحدث",
    body: "تمثيل مواقف، محادثات، مناقشات وعروض قصيرة — الطالب بيتكلم فعلاً مش بيسمع بس.",
  },
  {
    icon: "Headphones",
    title: "Listening",
    titleAr: "الاستماع",
    body: "فهم الحوارات والقصص والإنجليزي المنطوق بسرعة طبيعية.",
  },
  {
    icon: "BookOpen",
    title: "Reading",
    titleAr: "القراءة",
    body: "قصص ونصوص معلوماتية مع استراتيجيات فهم المقروء.",
  },
  {
    icon: "PenLine",
    title: "Writing",
    titleAr: "الكتابة",
    body: "من الجملة إلى الفقرة إلى القصة والوصف والكتابة المنظمة.",
  },
  {
    icon: "Layers",
    title: "Vocabulary",
    titleAr: "المفردات",
    body: "مفردات مفيدة تُدرّس من خلال السياق والصور والتواصل.",
  },
  {
    icon: "Ruler",
    title: "Grammar",
    titleAr: "القواعد",
    body: "قواعد تُشرح بالمواقف والأمثلة وتُستخدم في كلام حقيقي.",
  },
  {
    icon: "AudioLines",
    title: "Pronunciation",
    titleAr: "النطق",
    body: "أصوات ونبر وإيقاع طبيعي لكلام واضح ومفهوم.",
  },
  {
    icon: "Brain",
    title: "Critical Thinking",
    titleAr: "التفكير الناقد",
    body: "التوقّع والمقارنة وحل المشكلات وشرح الرأي وتبريره.",
  },
] as const;

export const LESSON_STEPS = [
  {
    n: "01",
    t: "Engage",
    ar: "جذب الانتباه",
    d: "ألعاب وصور وأسئلة وتحديات تفتح شهية الطفل للحصة.",
  },
  {
    n: "02",
    t: "Discover",
    ar: "الاكتشاف",
    d: "الطالب يكتشف المفردات والتركيب الجديد من خلال سياق له معنى.",
  },
  { n: "03", t: "Understand", ar: "الفهم", d: "المعلم يوضّح المعنى والقاعدة والنطق بشكل بسيط." },
  {
    n: "04",
    t: "Practice",
    ar: "التدريب",
    d: "أنشطة تفاعلية وألعاب وتدريب موجّه على اللغة الجديدة.",
  },
  {
    n: "05",
    t: "Communicate",
    ar: "التواصل",
    d: "استخدام حقيقي: كلام، تمثيل أدوار، حل مشكلة أو نقاش.",
  },
  { n: "06", t: "Reflect", ar: "المراجعة", d: "المعلم يتأكد من الفهم ويعطي ملاحظات واضحة." },
] as const;

export const INTERACTIVE_ITEMS = [
  { icon: "MonitorPlay", label: "عروض تفاعلية" },
  { icon: "Gamepad2", label: "ألعاب Baamboozle" },
  { icon: "Grid2x2", label: "أنشطة Wordwall" },
  { icon: "ListChecks", label: "اختبارات قصيرة" },
  { icon: "Layers", label: "بطاقات مفردات" },
  { icon: "BookOpen", label: "قصص" },
  { icon: "Drama", label: "تمثيل أدوار" },
  { icon: "Mic", label: "تحديات تحدث" },
  { icon: "Trophy", label: "مسابقات" },
  { icon: "FolderKanban", label: "مشاريع صغيرة" },
  { icon: "Video", label: "فيديوهات" },
  { icon: "NotebookPen", label: "أنشطة منزلية" },
] as const;

export const COMPARISON: { feature: string; group: string; private: string }[] = [
  { feature: "منهج منظم", group: "✓", private: "✓" },
  { feature: "حصص تفاعلية", group: "✓", private: "✓" },
  { feature: "تواصل مع مجموعة", group: "✓", private: "—" },
  { feature: "اهتمام فردي كامل", group: "—", private: "✓" },
  { feature: "خطة تعلّم مخصصة", group: "محدودة", private: "✓" },
  { feature: "سرعة التعلّم", group: "منظمة", private: "مخصصة" },
  { feature: "ألعاب وأنشطة", group: "✓", private: "✓" },
  { feature: "ملاحظات مستمرة", group: "✓", private: "✓" },
  { feature: "تكييف المنهج", group: "متوسط", private: "عالٍ" },
];
