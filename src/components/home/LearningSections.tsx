import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AudioLines,
  CalendarDays,
  Brain,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Drama,
  FolderKanban,
  Gamepad2,
  Grid2x2,
  Headphones,
  Layers,
  LineChart,
  ListChecks,
  Mic,
  MonitorPlay,
  NotebookPen,
  PenLine,
  Repeat2,
  Ruler,
  Sparkles,
  Target,
  Trophy,
  Users,
  UserRound,
  Video,
  ArrowLeft,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPARISON, INTERACTIVE_ITEMS, LESSON_STEPS, LEVELS, SKILL_CARDS } from "./learning-data";

const ICONS: Record<string, typeof Mic> = {
  Mic,
  Headphones,
  BookOpen,
  PenLine,
  Layers,
  Ruler,
  AudioLines,
  Brain,
  MonitorPlay,
  Gamepad2,
  Grid2x2,
  ListChecks,
  Drama,
  Trophy,
  FolderKanban,
  Video,
  NotebookPen,
};

function SectionHeading({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-2xl md:text-3xl">{title}</h2>
      {sub && <p className="mt-3 text-sm leading-8 text-muted-foreground md:text-base">{sub}</p>}
      {children}
    </div>
  );
}

/* ---------------- SECTION 1 — How learning works ---------------- */

const JOURNEY = [
  { icon: ClipboardCheck, t: "تحديد المستوى", d: "اختبار قصير يحدد نقطة البداية." },
  { icon: Target, t: "المستوى المناسب", d: "الطالب يبدأ من المكان الصح." },
  { icon: Sparkles, t: "غمر تفاعلي", d: "إنجليزية فقط داخل حصص حية مليانة كلام وأنشطة." },
  { icon: Repeat2, t: "تدريب وممارسة", d: "واجبات وأنشطة تثبّت اللغة." },
  { icon: ClipboardCheck, t: "تقييم", d: "مراجعة وتقييم في نهاية كل وحدة." },
  { icon: LineChart, t: "تقدّم واضح", d: "ولي الأمر يشوف التطور خطوة بخطوة." },
];

const CORE_SKILLS = [
  "التحدث",
  "الاستماع",
  "القراءة",
  "الكتابة",
  "المفردات",
  "القواعد",
  "النطق",
  "التواصل",
  "التفكير الناقد",
  "الثقة بالنفس",
];

export function HowLearningWorks() {
  return (
    <section className="container-page py-16 md:py-24">
      <SectionHeading
        eyebrow="A Clear Learning Journey"
        title="رحلة تعلّم واضحة لكل طالب"
        sub="في Native Kid Academy الطفل بيمشي في رحلة منظمة تعتمد الغمر والتعليم التفاعلي، وهدفها إنه يكتسب الإنجليزية ويستخدمها بثقة فعلاً."
      />

      <ul className="mt-6 flex flex-wrap gap-2">
        {CORE_SKILLS.map((s) => (
          <li
            key={s}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground/80"
          >
            {s}
          </li>
        ))}
      </ul>

      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {JOURNEY.map((s, i) => (
          <li
            key={s.t}
            className="surface-card group relative p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
          >
            <span className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <s.icon className="size-5" />
            </span>
            <p className="mt-3 text-xs font-bold text-muted-foreground">0{i + 1}</p>
            <h3 className="mt-1 text-base">{s.t}</h3>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------- SECTION 2 — Curriculum roadmap ---------------- */

export function CurriculumRoadmap() {
  const [open, setOpen] = useState<number | null>(1);
  const active = LEVELS.find((l) => l.n === open) ?? null;

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our Curriculum"
          title="منهج إنجليزي دولي منظم"
          sub="بنستخدم منهج Abridge Academy التفاعلي لتعليم الإنجليزي كأحد مساراتنا الأساسية. المنهج مبني على تدرّج CEFR، والطالب يمشي فيه عبر 6 مستويات من المبتدئ تمامًا حتى التواصل بثقة في مستوى ما قبل المتوسط."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LEVELS.map((l) => {
            const isOpen = open === l.n;
            return (
              <button
                key={l.n}
                type="button"
                onClick={() => setOpen(isOpen ? null : l.n)}
                aria-expanded={isOpen}
                className={`surface-card group p-5 text-right transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${
                  isOpen ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex size-10 items-center justify-center rounded-2xl brand-gradient font-display text-sm font-extrabold text-brand-dark-foreground">
                    {l.n}
                  </span>
                  <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-primary">
                    CEFR {l.cefr}
                  </span>
                </div>
                <h3 className="mt-4 text-base">{l.titleAr}</h3>
                <p className="text-xs font-medium text-muted-foreground">{l.titleEn}</p>
                <p className="mt-3 line-clamp-2 text-xs leading-6 text-muted-foreground">
                  {l.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">
                  {isOpen ? "إخفاء التفاصيل" : "استكشف المستوى"}
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                </span>
              </button>
            );
          })}
        </div>

        {active && (
          <div className="surface-card mt-6 grid gap-8 p-6 md:grid-cols-3 md:p-8">
            <div>
              <h3 className="text-lg">
                المستوى {active.n} — {active.titleAr}
              </h3>
              <p className="text-xs font-medium text-muted-foreground">{active.titleEn}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{active.desc}</p>
              <div className="mt-4 rounded-2xl bg-secondary p-4">
                <p className="text-xs font-bold text-primary">النتيجة المتوقعة</p>
                <p className="mt-1 text-sm leading-7 text-secondary-foreground">{active.outcome}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold">موضوعات المستوى</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {active.topics.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold">اللغة والمهارات</h4>
              <ul className="mt-3 space-y-2">
                {active.skills.map((s) => (
                  <li key={s} className="flex gap-2 text-sm leading-7 text-muted-foreground">
                    <CheckCircle2 className="mt-1.5 size-4 shrink-0 text-success" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <p className="mt-6 text-xs text-muted-foreground">
          قد يتم تكييف محتوى المنهج حسب مستوى الطالب وعمره واحتياجاته التعليمية.
        </p>
      </div>
    </section>
  );
}

/* ---------------- SECTION 3 — What students learn ---------------- */

export function WhatStudentsLearn() {
  return (
    <section className="container-page py-16 md:py-24">
      <SectionHeading
        eyebrow="More Than Vocabulary & Grammar"
        title="أكتر من مفردات وقواعد"
        sub="كل حصة بتشتغل على مهارات حقيقية الطفل هيستخدمها في الكلام والمدرسة والحياة."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_CARDS.map((c) => {
          const Icon = ICONS[c.icon] ?? Sparkles;
          return (
            <article
              key={c.title}
              className="surface-card group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base">{c.titleAr}</h3>
              <p className="text-xs font-medium text-muted-foreground">{c.title}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{c.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- SECTION 4 — Three ways to learn ---------------- */

export function TwoWaysToLearn() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Small Group · Semi Private · Private"
          title="اختار طريقة التعلّم المناسبة لطفلك"
          sub="مجموعة صغيرة يتعلّم فيها مع زملائه، أو حصص شبه خاصة باهتمام أقرب، أو برنامج خاص مبني على احتياجه هو بالتحديد."
        />

        <div className="surface-card mt-10 p-5 sm:p-7">
          <h3 className="text-xl">قارن طرق التعلّم واختار الأنسب لطفلك</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            الاختيار يعتمد على مستوى طفلك، وطريقة مشاركته، واحتياجه للاهتمام الفردي.
          </p>
          <div
            className="learning-visual-grid mt-7 grid gap-5 md:grid-cols-3"
            aria-label="مقارنة سريعة لطرق التعلّم"
          >
            {[
              {
                name: "Small Group",
                arabic: "مجموعات صغيرة",
                icon: Users,
                tone: "group",
                headline: "نتعلّم معًا",
                features: ["حتى 6 طلاب", "مسار مشترك", "تدريب مع الزملاء"],
                bestFor: "بيحب يشارك ويتعلّم مع مجموعة",
              },
              {
                name: "Semi Private",
                arabic: "شبه خاصة",
                icon: Users,
                tone: "semi",
                headline: "تفاعل + اهتمام أقرب",
                features: [
                  "من طالبين إلى 3 طلاب",
                  "أهداف مشتركة باهتمام أقرب",
                  "مساحة أكبر للمشاركة",
                ],
                bestFor: "محتاج زملاء واهتمام أقرب",
              },
              {
                name: "Private",
                arabic: "خاصة",
                icon: UserRound,
                tone: "private",
                headline: "الحصة كلها لطفلك",
                features: ["طالب واحد مع المعلم", "خطة شخصية", "وقت كلام فردي"],
                bestFor: "محتاج دعم فردي أو هدف محدد",
              },
            ].map(({ name, arabic, icon: Icon, tone, headline, features, bestFor }) => (
              <article
                key={name}
                className={`learning-visual-card learning-visual-${tone} rounded-3xl border border-border p-6`}
              >
                <div className="learning-visual-scene" aria-hidden="true">
                  <span className="learning-visual-halo" />
                  <Icon className="learning-visual-symbol" />
                  <span className="learning-visual-leaf">
                    <BookOpen className="size-5" />
                  </span>
                  <span className="learning-visual-voice">
                    <Mic className="size-5" />
                  </span>
                </div>
                <h4 className="mt-4 text-center text-xl" lang="en" dir="ltr">
                  {name}
                </h4>
                <p className="mt-1 text-center text-xs font-medium text-muted-foreground">
                  {arabic}
                </p>
                <p className="mt-4 text-center font-bold text-primary">{headline}</p>
                <dl className="mt-5 space-y-3">
                  {[Users, BookOpen, Mic].map((FeatureIcon, index) => (
                    <div
                      key={features[index]}
                      className="flex items-center gap-3 rounded-xl bg-card/80 p-3"
                    >
                      <FeatureIcon className="size-5 text-primary" aria-hidden="true" />
                      <dt className="sr-only">{["شكل الحصة", "خطة التعلّم", "المشاركة"][index]}</dt>
                      <dd className="text-sm font-medium text-foreground">{features[index]}</dd>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 rounded-xl bg-card/80 p-3">
                    <CalendarDays className="size-5 shrink-0 text-primary" aria-hidden="true" />
                    <dt className="sr-only">عدد الحصص ومدتها</dt>
                    <dd className="text-sm font-medium text-foreground">
                      حصتين أسبوعيًا، مدة كل حصة 55 دقيقة
                    </dd>
                  </div>
                </dl>
                <div className="mt-5 border-t border-border pt-4 text-center">
                  <p className="text-xs font-bold text-primary">مناسب لطفلك لو…</p>
                  <p className="mt-1 text-sm leading-7 text-muted-foreground">{bestFor}</p>
                </div>
              </article>
            ))}
          </div>
          <details className="learning-comparison-details mt-6 rounded-2xl border border-border p-4">
            <summary className="cursor-pointer py-1 text-sm font-bold text-primary">
              عرض المقارنة التفصيلية
            </summary>
            <div
              className="mt-5 overflow-x-auto rounded-2xl border border-border"
              role="region"
              aria-label="مقارنة طرق التعلّم"
              tabIndex={0}
            >
              <table className="w-full min-w-[620px] border-collapse text-start text-sm">
                <caption className="sr-only">
                  مقارنة المجموعات الصغيرة والحصص شبه الخاصة والحصص الخاصة
                </caption>
                <thead className="bg-secondary">
                  <tr>
                    {[
                      "وجه المقارنة",
                      "Small Group — مجموعات صغيرة",
                      "Semi Private — شبه خاصة",
                      "Private — خاصة",
                    ].map((title) => (
                      <th key={title} scope="col" className="p-4 text-start font-bold text-brown">
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "شكل الحصة",
                      "حتى 6 طلاب من نفس المستوى",
                      "من طالبين إلى 3 طلاب",
                      "طالب واحد مع المعلم",
                    ],
                    [
                      "خطة التعلّم",
                      "مسار مشترك ومنظم",
                      "أهداف مشتركة مع اهتمام أقرب",
                      "خطة شخصية حسب الاحتياج",
                    ],
                    [
                      "المشاركة",
                      "تدريب وأنشطة جماعية",
                      "مساحة أكبر للمشاركة مع الزملاء",
                      "وقت الحصة موجّه للطالب",
                    ],
                    [
                      "التخصيص",
                      "حسب مستوى المجموعة",
                      "موازنة بين المجموعة واحتياج الطفل",
                      "حسب نقاط القوة والضعف والأهداف",
                    ],
                    [
                      "مناسب لطفلك لو",
                      "بيحب يتعلّم ويتفاعل مع مجموعة",
                      "محتاج تفاعل مع اهتمام أقرب",
                      "محتاج دعم فردي أو هدف محدد",
                    ],
                  ].map(([label, ...values]) => (
                    <tr key={label} className="border-t border-border">
                      <th scope="row" className="p-4 text-start font-bold text-brown">
                        {label}
                      </th>
                      {values.map((value) => (
                        <td key={value} className="p-4 leading-7 text-muted-foreground">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 5 — Lesson timeline ---------------- */

export function LessonTimeline() {
  return (
    <section className="container-page py-16 md:py-24">
      <SectionHeading
        eyebrow="What Happens In A Lesson?"
        title="حصة Native Kid بتبقى شكلها إزاي؟"
        sub="كل حصة مبنية على الطالب نفسه — بيشارك ويتكلم ويجرب، مش بيسمع بس."
      />
      <ol className="relative mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <span className="pointer-events-none absolute inset-x-0 top-9 hidden h-px bg-border lg:block" />
        {LESSON_STEPS.map((s) => (
          <li
            key={s.n}
            className="surface-card relative p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
          >
            <span className="font-display text-2xl font-extrabold text-primary/25">{s.n}</span>
            <h3 className="mt-1 text-base">{s.ar}</h3>
            <p className="text-xs font-medium text-muted-foreground">{s.t}</p>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------- SECTION 6 — Interactive learning ---------------- */

export function InteractiveLearning() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Interactive Learning"
          title="التعلّم مالوش لازمة لو ممل"
          sub="الأطفال بيتعلموا أسرع لما يشاركوا فعلاً. معلمينا بيمزجوا التعلّم المنظم بأنشطة تفاعلية تحافظ على الحماس والمشاركة."
        />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {INTERACTIVE_ITEMS.map((it) => {
            const Icon = ICONS[it.icon] ?? Sparkles;
            return (
              <div
                key={it.label}
                className="surface-card flex flex-col items-center gap-3 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <Icon className="size-5" />
                </span>
                <p className="text-xs font-bold leading-6 text-foreground/85">{it.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 7 — Progress ---------------- */

const PROGRESS_AREAS = [
  { icon: ClipboardCheck, t: "تقييم مستمر", d: "المعلم بيتأكد من الفهم أثناء الحصة نفسها." },
  { icon: NotebookPen, t: "واجبات وتدريب", d: "الطالب يثبّت اللي اتعلمه خارج الحصة." },
  { icon: Repeat2, t: "مراجعات الوحدات", d: "مراجعة منتظمة للمفردات والقواعد والتواصل." },
  { icon: LineChart, t: "ملاحظات التقدّم", d: "ولي الأمر يفهم مستوى ابنه وإيه المطلوب تحسينه." },
];

export function ProgressSection() {
  return (
    <section className="container-page py-16 md:py-24">
      <SectionHeading
        eyebrow="Student Progress"
        title="ولي الأمر لازم يشوف التقدّم… مش يخمّنه"
        sub="متابعة مستمرة لمستوى الطالب، وتقارير مبسطة توضح التطور وأماكن التحسين."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROGRESS_AREAS.map((a) => (
          <article
            key={a.t}
            className="surface-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
          >
            <span className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-primary">
              <a.icon className="size-5" />
            </span>
            <h3 className="mt-4 text-base">{a.t}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{a.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- SECTION 8 — Comparison ---------------- */

function Cell({ value }: { value: string }) {
  if (value === "✓")
    return <CheckCircle2 className="mx-auto size-5 text-success" aria-label="متاح" />;
  if (value === "—")
    return <Minus className="mx-auto size-5 text-muted-foreground" aria-label="غير متاح" />;
  return <span className="text-xs font-bold text-muted-foreground">{value}</span>;
}

export function ProgramComparison() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Group Or Private?"
          title="مجموعة ولا حصص خاصة؟"
          sub="مقارنة سريعة تساعدك تختار الأنسب لطفلك."
        />

        <div className="surface-card mt-10 overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 text-right font-bold">الميزة</th>
                <th className="p-4 text-center font-bold">مجموعات</th>
                <th className="p-4 text-center font-bold text-primary">خاص</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.feature} className="border-b border-border/60 last:border-0">
                  <td className="p-4 text-muted-foreground">{row.feature}</td>
                  <td className="p-4 text-center">
                    <Cell value={row.group} />
                  </td>
                  <td className="bg-secondary/40 p-4 text-center">
                    <Cell value={row.private} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="surface-card mt-6 flex flex-wrap items-center justify-between gap-5 p-6">
          <div>
            <h3 className="text-lg">مش متأكد أنهي برنامج مناسب لطفلك؟</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              هنساعدك تحدد مستوى ابنك الحالي ونرشّح المسار الأنسب ليه.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/trial">احجز حصة تجريبية</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/trial">احجز حصة تجريبية</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 9 — Final CTA ---------------- */

export function FinalParentCta() {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="relative overflow-hidden rounded-3xl brand-gradient px-6 py-14 text-center md:px-16">
        <div className="pointer-events-none absolute inset-0 glow-blue-center" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-dark-foreground/10 px-3 py-1.5 text-xs font-bold text-pistachio">
            <Compass className="size-3.5" />
            الخطوة الجاية
          </span>
          <h2 className="mt-5 text-2xl text-brand-dark-foreground md:text-4xl">
            ادّي طفلك أكتر من حصص إنجليزي.
          </h2>
          <p className="mt-2 font-display text-xl font-extrabold text-pistachio md:text-2xl">
            ادّيله الثقة إنه يستخدم الإنجليزي.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-brand-dark-foreground/80 md:text-base">
            سواء اتعلّم في مجموعة أو ببرنامج خاص مخصص، هدفنا واحد: إنه يفهم الإنجليزي، يستخدمه بثقة،
            ويستمتع بالرحلة.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/trial">احجز حصة تجريبية</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/faq">تواصل معنا</Link>
            </Button>
          </div>
          <p className="mt-5 text-xs text-brand-dark-foreground/70">
            مش متأكد من مستوى طفلك؟ هنساعدك تلاقي نقطة البداية الصح.
          </p>
        </div>
      </div>
    </section>
  );
}
