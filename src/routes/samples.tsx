import { REAL_SAMPLES } from "@/components/home/sample-data";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Ear,
  ALargeSmall,
  Link2,
  Layers,
  Shuffle,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { CurriculumGuide } from "@/components/site/CurriculumGuide";

export const Route = createFileRoute("/samples")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "نماذج تعليم الإنجليزية والصوتيات للأطفال | Native Kid Academy" },
      {
        name: "description",
        content:
          "شاهد نماذج تعليم الإنجليزية للأطفال واستكشف الصوتيات في ستة مستويات: تمييز الأصوات، دمج الكلمات، التهجئات البديلة، قراءة القصص، الطلاقة وقواعد التهجئة.",
      },
      {
        property: "og:title",
        content: "نماذج تعليم الإنجليزية والصوتيات للأطفال | Native Kid Academy",
      },
      {
        property: "og:description",
        content: "أمثلة حقيقية من دروسنا وواجباتنا وتقارير التقدّم قبل ما تحجز التجربة وتحديد المستوى.",
      },
    ],
  }),
  component: SamplesPage,
});



const PHONICS_STEPS = [
  {
    title: "الاستماع وتمييز الأصوات",
    label: "التهيئة",
    description:
      "قبل قراءة الحروف، بنبني الوعي بالأصوات من خلال اللعب والاستماع والكلام. المرحلة دي بتستمر مع باقي المستويات حسب احتياج الطفل.",
    skills: [
      "تمييز أصوات البيئة والآلات والجسم، وتقليد الإيقاع.",
      "اكتشاف القافية والكلمات اللي بتبدأ بنفس الصوت، واللعب بالصوت والنطق.",
      "دمج أصوات كلمة مسموعة وتقسيمها شفهيًا، قبل الاعتماد على الحروف المكتوبة.",
    ],
    examples: [
      { label: "قافية", text: "cat · hat · mat" },
      { label: "دمج شفهي", text: "/s/ + /a/ + /t/ → sat" },
    ],
    practice: "ألعاب استماع وقافية: المعلم يقول الأصوات والطفل يجمعها ويقول الكلمة.",
    outcome: "يميّز الأصوات ويبدأ يدمجها شفهيًا، ويكون مستعد يربطها بالحروف.",
  },
  {
    title: "الحروف والكلمات الأولى",
    label: "التأسيس",
    description:
      "بنربط الأصوات بأشكال الحروف، ونبدأ القراءة والتهجئة من كلمات قصيرة بالأصوات اللي اتعلّمها الطفل بالفعل.",
    skills: [
      "تعلّم مجموعة أولى من علاقات الحروف بالأصوات، زي s وa وt وp وi وn.",
      "دمج الأصوات لقراءة كلمات قصيرة، وتقسيم الكلمة لأصوات لاختيار حروفها وكتابتها.",
      "قراءة عبارات وجمل قصيرة مناسبة لما تم تعلّمه، مع تقديم كلمات شائعة تحتاج انتباهًا خاصًا.",
    ],
    examples: [
      { label: "قراءة كلمة", text: "s + a + t → sat" },
      { label: "تهجئة", text: "pin → p · i · n" },
    ],
    practice: "بطاقات حروف، تكوين كلمات، وقراءة جملة قصيرة مع المعلم.",
    outcome: "يقرأ ويكتب كلمات بسيطة باستخدام الأصوات اللي يعرفها، بدل تخمين شكل الكلمة.",
  },
  {
    title: "صوت واحد بأكتر من حرف",
    label: "Digraphs & Trigraphs",
    description:
      "بنتوسّع في العلاقات بين الحروف والأصوات: حرفين ممكن يمثّلوا صوت واحد (digraph)، أو تلات حروف يمثّلوا صوت واحد (trigraph).",
    skills: [
      "تعلّم تراكيب زي ch وsh وth وng، وأصوات حروف متحركة زي ai وee وoa.",
      "التعرّف على trigraphs زي igh، وقراءتها كصوت واحد مش كتلات أصوات منفصلة.",
      "قراءة وتهجئة كلمات أطول وجمل كاملة بسيطة، مع مراجعة الكلمات الشائعة وفهم المعنى.",
    ],
    examples: [
      { label: "حرفان، صوت واحد", text: "sh → ship · ch → chin" },
      { label: "ثلاثة حروف، صوت واحد", text: "igh → night" },
      { label: "جملة بسيطة", text: "The ship is on the sea." },
    ],
    practice: "نحدّد الجزء اللي بيمثّل صوت واحد، ونستخدمه في كلمات وجمل مناسبة للأصوات المتعلّمة.",
    outcome: "يميّز الوحدات الصوتية المكتوبة ويستخدمها في القراءة والتهجئة بثقة أكبر.",
  },
  {
    title: "الحروف الساكنة المتجاورة",
    label: "Blending & Segmenting",
    description:
      "تركيز المستوى على تثبيت الدمج والتقسيم في كلمات فيها حروف ساكنة متجاورة، باستخدام علاقات الحروف والأصوات اللي اتعلّمناها. مش الهدف تقديم أصوات جديدة.",
    skills: [
      "دمج وتقسيم كلمات فيها consonant clusters في أول الكلمة أو آخرها، زي trip وstop وmilk.",
      "الحفاظ على كل صوت من غير حذف: st في stop صوتان منفصلان، بعكس sh اللي بيمثّل صوت واحد.",
      "زيادة دقة فكّ الكلمات والثقة في القراءة، مع ممارسة كلمات شائعة زي said وhave وlike وsome، وشرح الجزء غير المتوقع حسب ما تم تعلّمه.",
    ],
    examples: [
      { label: "ساكنان في البداية", text: "stop → s · t · o · p" },
      { label: "ساكنان في النهاية", text: "milk → m · i · l · k" },
      { label: "كلمات للتدريب", text: "trip · stop · milk" },
    ],
    practice: "نحرّك عدّاد لكل صوت، ونركّب الكلمات ونقرأها داخل جمل قصيرة.",
    outcome: "يقرأ الكلمات ذات الحروف الساكنة المتجاورة بدقة أكبر ومن غير إسقاط الأصوات.",
  },
  {
    title: "نفس الصوت بأشكال مختلفة",
    label: "Alternative Spellings",
    description:
      "بنوسّع مرونة القراءة والتهجئة: نفس الصوت ممكن يتكتب بأكتر من طريقة، ونفس الحرف أو التركيب ممكن يتنطق بأكتر من صوت.",
    skills: [
      "تهجئات بديلة للصوت /aɪ/: زي igh في night، وie في pie، وy في fly، وi-e في time.",
      "فهم split digraphs أو Magic E: حرفا الصوت المتحرك بيفصل بينهم حرف، زي u-e في cube وo-e في hope؛ بنلاحظ فرق النطق والمعنى.",
      "نطق بديل لنفس الحرف، زي c في cat بصوت /k/ وفي city بصوت /s/، مع تجربة النطق المناسب للكلمة والسياق.",
      "مراجعة الكلمات الشائعة والتهجئات غير المتوقعة، والتدريب على الاختيار بين طرق كتابة نفس الصوت.",
    ],
    examples: [
      { label: "صوت واحد، تهجئات مختلفة", text: "night · pie · fly · time → /aɪ/" },
      { label: "Split digraphs", text: "cub → cube · hop → hope" },
      { label: "حرف واحد، نطق مختلف", text: "cat /k/ · city /s/" },
    ],
    practice: "نصنّف الكلمات حسب الصوت والتهجئة، ونقارن أزواج كلمات، ونطبّق في جمل وقصص مناسبة.",
    outcome: "يتعامل مع كلمات جديدة بمرونة، ويميّز بين أكثر من تهجئة أو نطق محتمل.",
  },
  {
    title: "الطلاقة والتهجئة وبناء الكلمات",
    label: "Fluency & Morphology",
    description:
      "بنثبّت الدقة ونبني التلقائية في قراءة الكلمات المألوفة، مع استخدام استراتيجيات فكّ الكلمات غير المألوفة. وبنوسّع الكتابة وفهم تركيب الكلمة.",
    skills: [
      "قراءة كلمات ونصوص بطلاقة وفهم، مع تقليل التهجئة المجهدة تدريجيًا من خلال الممارسة.",
      "قواعد التهجئة وإضافة النهايات زي -s و-es و-ing و-ed، وتغييرات الكتابة المصاحبة عند الحاجة.",
      "استكشاف البوادئ واللواحق (prefixes & suffixes) زي un- وre- و-ful و-less، وربطها بمعنى الكلمة وبنائها.",
      "تطبيق المهارات في قراءة قصص مناسبة وكتابة جمل ونصوص قصيرة، مع مراجعة النطق والتهجئة وعلامات الترقيم.",
    ],
    examples: [
      { label: "نهايات الكلمات", text: "jump → jumping · jumped" },
      { label: "بوادئ ولواحق", text: "happy → unhappy · care → careful" },
      { label: "تغيير التهجئة", text: "run → running · hope → hoping" },
    ],
    practice: "قراءة موجهة، إملاء قصير، وبناء كلمات جديدة ثم استخدامها في جمل وقصص.",
    outcome:
      "قراءة أكثر طلاقة ووعي أقوى بالتهجئة وبناء الكلمات؛ والتقدّم مستمر بعد المستوى السادس.",
  },
] as const;

const PHONICS_OVERVIEW = [
  {
    title: "نسمع",
    icon: Ear,
    goal: "نميّز الأصوات ونجهّز الطفل للقراءة.",
    example: "cat · hat · mat",
    tags: ["استماع", "قافية", "دمج شفهي"],
  },
  {
    title: "نركّب كلمات",
    icon: ALargeSmall,
    goal: "نربط الحروف بأصواتها ونقرأ أول كلمة.",
    example: "s + a + t → sat",
    tags: ["أصوات الحروف", "دمج", "تهجئة"],
  },
  {
    title: "نكتشف أصوات جديدة",
    icon: Link2,
    goal: "حرفين أو تلاتة ممكن يمثّلوا صوت واحد.",
    example: "sh → ship · igh → night",
    tags: ["Digraphs", "Trigraphs", "جمل بسيطة"],
  },
  {
    title: "نقرأ بثقة",
    icon: Layers,
    goal: "نجمع الحروف الساكنة من غير ما ننسى أي صوت.",
    example: "stop → s · t · o · p",
    tags: ["trip · stop · milk", "دمج وتقسيم", "Tricky Words"],
  },
  {
    title: "نوسّع الاختيارات",
    icon: Shuffle,
    goal: "نفس الصوت بأكتر من تهجئة، ونطق مختلف لنفس الحرف.",
    example: "night · pie · fly · time",
    tags: ["تهجئات بديلة", "Magic E", "نطق بديل"],
  },
  {
    title: "ننطلق في القراءة",
    icon: BookOpen,
    goal: "قراءة أيسر، وتهجئة أقوى، وفهم لبناء الكلمات.",
    example: "jump → jumping · jumped",
    tags: ["طلاقة", "قواعد التهجئة", "Prefixes & Suffixes"],
  },
] as const;

function PhonicsJourney() {
  const [active, setActive] = useState(0);
  const step = PHONICS_STEPS[active] ?? PHONICS_STEPS[0];
  const overview = PHONICS_OVERVIEW[active] ?? PHONICS_OVERVIEW[0];
  const Icon = overview.icon;
  return (
    <section id="phonics" className="mb-10 scroll-mt-24" aria-labelledby="phonics-title">
      <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">
        الصوتيات · Phonics
      </span>
      <h2 id="phonics-title" className="mt-3 text-2xl md:text-3xl">
        من أول صوت لقراءة القصص
      </h2>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">
        6 مستويات، خطوة بخطوة. اضغط على أي مستوى وشوف الفكرة في ثواني.
      </p>
      <div
        className="mt-5 grid grid-cols-3 gap-2 md:grid-cols-6"
        aria-label="مستويات تعلّم الصوتيات"
      >
        {PHONICS_OVERVIEW.map((item, i) => (
          <Button
            key={item.title}
            type="button"
            aria-pressed={active === i}
            aria-controls="phonics-detail"
            onClick={() => setActive(i)}
            variant="outline"
            className={`h-auto min-h-24 flex-col gap-2 p-2 text-center ${active === i ? "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "border-border bg-card text-foreground hover:bg-accent"}`}
          >
            <item.icon className="size-5" aria-hidden="true" />
            <span className="text-[11px] font-medium" dir="ltr">
              Level {i + 1}
            </span>
            <span className="text-xs font-bold">{item.title}</span>
          </Button>
        ))}
      </div>
      <div
        id="phonics-detail"
        className="mt-4 overflow-hidden border-y border-border py-6 md:py-8"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-bold text-primary">المستوى {active + 1} من 6</p>
            <h3 className="mt-1 text-lg">{step.title}</h3>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-foreground">{overview.goal}</p>
        <div className="mt-4 rounded-2xl bg-accent/60 px-4 py-5 text-center">
          <p className="text-[11px] text-muted-foreground">مثال سريع</p>
          <p
            className="mt-2 break-words text-xl font-bold text-primary md:text-2xl"
            dir="ltr"
            lang="en"
          >
            {overview.example}
          </p>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="أهم المهارات">
          {overview.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs font-medium"
              dir="auto"
            >
              {tag}
            </li>
          ))}
        </ul>
        <details key={active} className="mt-5 border-t border-border pt-3">
          <summary className="cursor-pointer rounded-lg py-2 text-sm font-bold text-primary focus-visible:outline-2 focus-visible:outline-ring">
            اعرف التفاصيل
          </summary>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p>
          <ul className="mt-3 list-disc space-y-2 ps-5 text-sm leading-7 text-muted-foreground">
            {step.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {step.examples.map((example) => (
              <div key={example.label} className="rounded-xl bg-accent/40 p-3">
                <p className="text-xs text-muted-foreground">{example.label}</p>
                <p className="mt-1 break-words text-sm font-bold text-primary" dir="ltr" lang="en">
                  {example.text}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            <strong>التطبيق: </strong>
            {step.practice}
          </p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            <strong>الهدف: </strong>
            {step.outcome}
          </p>
        </details>
        <div className="mt-4 flex items-center justify-between gap-3">
          <Button
            type="button"
            disabled={active === 0}
            onClick={() => setActive((n) => Math.max(0, n - 1))}
            variant="outline"
          >
            المستوى السابق
          </Button>
          <Button
            type="button"
            disabled={active === 5}
            onClick={() => setActive((n) => Math.min(5, n + 1))}
          >
            المستوى التالي
          </Button>
        </div>
      </div>
      <p className="mt-3 text-xs leading-6 text-muted-foreground">
        البداية والسرعة حسب مستوى طفلك، مع مراجعة النطق والفهم في كل مرحلة.
      </p>
    </section>
  );
}

function SamplesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="نماذج تعليمية"
        title="رحلة طفلك في تعلّم الإنجليزي"
        description="كل النماذج دي صممها متخصصون لتعليم الإنجليزية كلغة ثانية، ومهيأة خصيصًا للتعليم الأونلاين التفاعلي."
      />
      <nav aria-label="أقسام التعليم" className="border-b border-border bg-background">
        <div className="container-page flex flex-wrap gap-x-8 gap-y-2 py-4 text-sm font-bold text-primary">
          <a href="#by-age" className="sample-shortcut">حسب سن طفلك</a>
          <a href="#worksheet" className="sample-shortcut">ورقة عمل</a>
          <a href="#home-guide" className="sample-shortcut">دليل البيت</a>
          <a href="#lesson-preview" className="sample-shortcut">شكل الحصة</a>
          <a href="#curriculum" className="sample-shortcut">المنهج والمستويات</a>
          <a href="#phonics" className="sample-shortcut">الصوتيات والقراءة</a>
        </div>
      </nav>
      <section id="by-age" className="container-page scroll-mt-28 py-10" aria-labelledby="age-title">
        <p className="nk-eyebrow">اختاري البداية الأقرب لطفلك</p>
        <h2 id="age-title" className="mt-2 text-2xl">نفس الهدف… وطريقة تناسب سنّه</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">دي أمثلة لطريقة التعلّم حسب السن، مش تحديد للمستوى. بنختار البداية بعد التجربة وتحديد المستوى، وبنراعي سن الطفل كمان.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            { age: "٤–٦ سنين", title: "نسمع ونلعب ونتكلّم", text: "صور وكلمات ومشاركة قصيرة. البطاقات بتوضح طريقة ربط الكلمة بمعناها.", href: "#flashcards", cta: "شوفي البطاقات" },
            { age: "٧–١٠ سنين", title: "نستخدم اللي اتعلّمناه", text: "أسئلة وتدريب على اللغة في مواقف قريبة من الطفل. ورقة العمل بتوضح شكل التطبيق.", href: "#worksheet", cta: "شوفي ورقة العمل" },
            { age: "١١–١٥ سنة", title: "نعبّر عن رأينا", text: "حوارات وأفكار حسب المستوى. ورقة المناظرة مثال للطالب المستعد يناقش ويكتب حججه.", href: "#debating", cta: "شوفي نموذج المناظرة" },
          ].map(item => <article key={item.age} className="surface-card p-5"><p className="text-sm font-bold text-primary">{item.age}</p><h3 className="mt-2 text-lg">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p><Button asChild variant="link" className="mt-3 px-0"><a href={item.href}>{item.cta} <ArrowLeft /></a></Button></article>)}
        </div>
      </section>
      <CurriculumGuide />
      <div className="container-page py-12 md:py-16">
        <section id="materials" className="mb-14 scroll-mt-28">
          <p className="nk-eyebrow">من داخل الحصة</p>
          <h2 className="text-2xl">نماذج حقيقية من موادنا</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            أوراق عمل، مهارات مناظرة، بطاقات تعليمية، وعروض تفاعلية صممها خبراء — اتفرّج عليها
            مباشرة من هنا.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {REAL_SAMPLES.map((s) => (
              <article id={s.id} key={s.id} className="surface-card sample-material scroll-mt-28 flex flex-col overflow-hidden p-0">
                <div className="flex flex-col gap-3 p-5">
                  <div className="flex items-center gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary"><s.icon className="size-5" /></span><h3 className="text-base">{s.title}</h3></div>
                  <p className="text-sm leading-7 text-muted-foreground">{s.desc}</p>
                </div>
                <div className="sample-material-preview">
                  {s.previewImage ? <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`افتحي ${s.title} كامل في صفحة جديدة`}><img src={s.previewImage} alt="معاينة الصفحة الأولى: Should Cars Be Banned? تدريب على الحجج المؤيدة والمعارضة والحجة المضادة" loading="lazy" className="size-full bg-card object-contain object-top" /></a> : <iframe src={s.embed} title={`معاينة ${s.title}`} loading="lazy" allow="fullscreen" className="size-full border-0" />}
                </div>
                <div className="mt-auto p-5"><Button asChild variant="outline" className="sample-external-button w-full"><a href={s.href} target="_blank" rel="noopener noreferrer">{s.cta} <ArrowLeft /></a></Button><p className="mt-2 text-xs leading-6 text-muted-foreground">لو المعاينة مش ظاهرة، افتحي النموذج في صفحة جديدة.</p></div>
              </article>
            ))}
          </div>
        </section>

        <PhonicsJourney />

      </div>
      <section className="bg-accent py-10"><div className="container-page flex flex-wrap items-center justify-between gap-5"><div><h2 className="text-2xl">خلي طفلك يجرّب بنفسه</h2><p className="mt-2 text-sm leading-7 text-muted-foreground">حصة تجريبية وتحديد مستوى تساعدك تشوف الطريقة قبل ما تقرر.</p></div><Button asChild size="lg" className="h-auto min-h-12 whitespace-normal text-center"><Link to="/trial">احجز تجربة وحدّد مستوى طفلك <ArrowLeft /></Link></Button></div></section>
    </SiteLayout>
  );
}
