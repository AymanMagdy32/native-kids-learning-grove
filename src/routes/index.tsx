import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Leaf,
  Sparkles,
  Languages,
  Users,
  LineChart,
  ShieldCheck,
  CalendarCheck,
  MessageCircleHeart,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  HowLearningWorks,
  CurriculumRoadmap,
  WhatStudentsLearn,
  TwoWaysToLearn,
  LessonTimeline,
  InteractiveLearning,
  ProgressSection,
  FinalParentCta,
} from "@/components/home/LearningSections";
import heroImage from "@/assets/hero-pop.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Native Kid Academy | إنجليزي أونلاين للأطفال والمراهقين" },
      {
        name: "description",
        content:
          "تعليم إنجليزي أونلاين للأطفال من 4 إلى 15 سنة، صوتيات وقراءة وتحدث واستماع وكتابة. حصتان أسبوعيًا، 55 دقيقة لكل حصة، مع متابعة شهرية وحصة تجريبية مجانية.",
      },
      { property: "og:title", content: "Native Kid Academy | إنجليزي أونلاين للأطفال" },
      {
        property: "og:description",
        content: "تعليم أونلاين تفاعلي بأسلوب الغمر، محتوى من خبراء، ومتابعة واضحة لتقدّم طفلك.",
      },
    ],
  }),
  component: HomePage,
});

const FEATURES = [
  {
    icon: Languages,
    title: "الغمر باللغة الإنجليزية",
    body: "الحصة بتُقدَّم باللغة الإنجليزية فقط من خلال المواقف والصور والتفاعل؛ عشان الطفل يكتسب اللغة بصورة طبيعية قريبة من طريقة تعلّم لغته الأم.",
  },
  {
    icon: LineChart,
    title: "تقرير شهري",
    body: "ولي الأمر يشوف الحضور والواجبات ومستوى المهارات الأربعة بشكل واضح ومبسّط.",
  },
  {
    icon: CalendarCheck,
    title: "مواعيد مرنة",
    body: "جدول أسبوعي ثابت مع إمكانية اختيار التوقيت الأنسب لأسرتك.",
  },
  {
    icon: MessageCircleHeart,
    title: "تعليم أونلاين تفاعلي",
    body: "حصص حية فيها كلام وألعاب لغوية وبطاقات وقصص، والطفل بيشارك ويستخدم اللغة بدل الحفظ والتلقين.",
  },
  {
    icon: ShieldCheck,
    title: "بيئة آمنة",
    body: "نحافظ على خصوصية بيانات الأطفال وأولياء الأمور، ونستخدمها للتواصل والمتابعة التعليمية.",
  },
  {
    icon: Sparkles,
    title: "محتوى من إعداد خبراء",
    body: "كل المواد والأمثلة صممها متخصصون في تعليم الإنجليزية كلغة ثانية، ومهيأة خصيصًا للحصص الأونلاين التفاعلية.",
  },
];

const STEPS = [
  { n: "1", t: "احجز التجربة المجانية", d: "املأ نموذج بسيط بمعلومات ولي الأمر وعمر الطفل." },
  { n: "2", t: "اختبار تحديد المستوى", d: "اختبار قصير أونلاين يحدد نقطة البداية المناسبة." },
  { n: "3", t: "حصة تجريبية", d: "الطفل يحضر حصة كاملة مع المعلم ويجرب أسلوب الشرح." },
  { n: "4", t: "ابدأ الاشتراك", d: "نرشّح المجموعة والمستوى المناسب وتبدأ الرحلة." },
];

const TILES = ["tile-coral", "tile-teal", "tile-sun", "tile-ink", "tile-teal", "tile-coral"];

function HomePage() {
  return (
    <SiteLayout>
      {/* Hero: image first, centered stack */}
      <section className="pop-hero overflow-hidden">
        <div className="container-page grid items-center gap-12 py-12 md:py-20 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative order-2 lg:order-1">
            <div className="pop-blob absolute -inset-4 bg-primary/15" aria-hidden="true" />
            <img
              src={heroImage}
              width={1280}
              height={1024}
              alt="أطفال سعداء يتعلمون الإنجليزية أونلاين مع معلمة"
              className="relative w-full rounded-[2.5rem] border-2 border-foreground shadow-[10px_10px_0_var(--brand-brown)] animate-float"
            />
            <span className="pop-sticker absolute -bottom-5 start-6 bg-secondary px-4 py-2 font-display text-sm font-extrabold">
              4–15 سنة ✦
            </span>
            <span className="pop-sticker pop-tilt absolute -top-4 end-6 bg-yellow-accent px-4 py-2 font-display text-sm font-extrabold">
              Speak English!
            </span>
          </div>
          <div className="order-1 lg:order-2">
            <span className="pop-sticker inline-flex items-center gap-2 bg-card px-4 py-1.5 text-xs font-bold text-primary">
              <Sparkles className="size-4" />
              حصة تجريبية مجانية
            </span>
            <h1 className="mt-6 font-display text-4xl leading-[1.15] md:text-6xl">
              طفلك يتكلم إنجليزي
              <br />
              <span className="text-pop">زي أهلها بالظبط</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
              حصص أونلاين حية بأسلوب الغمر للأعمار من 4 إلى 15 سنة: تحدث، استماع، قراءة وكتابة،
              مع اهتمام خاص بالـ{" "}
              <Link to="/samples" hash="phonics" className="font-bold text-primary underline-offset-4 hover:underline">
                <bdi lang="en">Phonics</bdi>
              </Link>{" "}
              ومتابعة شهرية لولي الأمر.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/trial">
                  احجز حصة تجريبية مجانية
                  <ArrowLeft className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/samples">شوف نماذج من المحتوى</Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-3">
              {[
                ["55", "دقيقة للحصة", "tile-coral"],
                ["2×", "حصص أسبوعيًا", "tile-teal"],
                ["📊", "تقرير شهري", "tile-sun"],
              ].map(([v, l, t]) => (
                <div key={l} className={`rounded-2xl p-3 text-center ${t}`}>
                  <dt className="font-display text-2xl font-extrabold">
                    <bdi>{v}</bdi>
                  </dt>
                  <dd className="text-xs font-medium text-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Features: bento */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl md:text-5xl">
              ليه <span className="text-pop">Native Kid</span>؟
            </h2>
            <p className="mt-4 text-muted-foreground">
              مش مجرد حصص أونلاين؛ تجربة تعليم كاملة من أول حصة لحد تقرير آخر الشهر.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-6">
            {FEATURES.map((f, i) => (
              <article
                key={f.title}
                className={`surface-card p-7 ${i === 0 || i === 3 ? "md:col-span-4" : "md:col-span-2"}`}
              >
                <span className={`flex size-14 items-center justify-center pop-blob ${TILES[i]}`}>
                  <f.icon className="size-7" />
                </span>
                <h3 className="mt-5 font-display text-xl">{f.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HowLearningWorks />

      {/* Steps: zigzag path */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <h2 className="text-center font-display text-3xl md:text-5xl">٤ خطوات وتبدأ الرحلة 🚀</h2>
          <ol className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {STEPS.map((s, i) => (
              <li key={s.n} className={`surface-card flex gap-5 p-6 ${i % 2 ? "md:translate-y-10" : ""}`}>
                <span className={`flex size-14 shrink-0 items-center justify-center pop-blob font-display text-2xl font-extrabold ${TILES[i]}`}>
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-lg">{s.t}</h3>
                  <p className="mt-1 text-sm leading-7 text-muted-foreground">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <TwoWaysToLearn />
      <WhatStudentsLearn />
      <InteractiveLearning />
      <CurriculumRoadmap />
      <LessonTimeline />
      <ProgressSection />

      {/* CTA */}
      <section className="container-page py-16 md:py-24">
        <div className="relative overflow-hidden rounded-[3rem] border-2 border-foreground bg-primary px-6 py-16 text-center text-primary-foreground shadow-[10px_10px_0_var(--brand-brown)] md:px-16">
          <div className="pop-blob absolute -start-16 -top-16 size-56 bg-yellow-accent/60" aria-hidden="true" />
          <div className="pop-blob absolute -bottom-20 -end-10 size-64 bg-secondary/40" aria-hidden="true" />
          <h2 className="relative font-display text-3xl md:text-5xl">جرّب حصة مجانية قبل ما تقرر ✨</h2>
          <p className="relative mx-auto mt-4 max-w-xl leading-8 opacity-90">
            احجز الآن، وفريقنا هيتواصل معك لتحديد الموعد المناسب.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="outline">
              <Link to="/trial">احجز التجربة المجانية</Link>
            </Button>
          </div>
        </div>
      </section>

      <FinalParentCta />
    </SiteLayout>
  );
}
