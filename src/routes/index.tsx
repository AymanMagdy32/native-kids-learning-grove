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
import heroImage from "@/assets/hero-lesson.jpg";

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

function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="hero-gradient reference-hero">
        <div className="container-page grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-background/75 px-3 py-1.5 text-xs font-bold text-primary">
              <Leaf className="size-4" />
              حصة تجريبية مجانية
            </span>
            <h1 className="mt-5 text-3xl leading-[1.25] md:text-5xl md:leading-[1.2]">
              إنجليزي أونلاين تفاعلي
              <br className="hidden lg:block" /> لأطفالك{" "}
              <span className="text-primary">بأسلوب الغمر</span>
            </h1>
            <ul className="hero-intro mt-5 max-w-xl list-disc space-y-2 ps-5 text-sm leading-7 text-muted-foreground">
              <li>
                إنجليزي أونلاين للأعمار من 4 إلى 15 سنة، بأسلوب الغمر والتفاعل. مجموعات صغيرة أو حصص
                شبه خاصة وخاصة، مع متابعة شهرية لولي الأمر.
              </li>
              <li>
                بنركّز على المهارات الأربع: التحدث، الاستماع، القراءة والكتابة، مع اهتمام خاص بـ{" "}
                <Link
                  to="/samples"
                  hash="phonics"
                  className="inline-flex items-center gap-1 rounded-md font-bold text-primary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  الصوتيات <bdi lang="en">(Phonics)</bdi>
                  <span className="text-xs font-medium">· اعرف أكتر</span>
                </Link>{" "}
                لبناء أساس قوي في النطق والقراءة.
              </li>
            </ul>
            <div className="hero-actions mt-8 flex flex-wrap gap-3">
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
            <dl className="hero-facts">
              {[
                ["4–15", "سنة"],
                ["حصص", "مسجّلة"],
                ["تقرير", "شهري"],
              ].map(([v, l]) => (
                <div key={l} className="text-center">
                  <dt className="font-display font-bold text-foreground">
                    <bdi>{v}</bdi>
                  </dt>
                  <dd className="text-xs text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <img
                src={heroImage}
                width={1280}
                height={1024}
                alt="حصة إنجليزي أونلاين تفاعلية للأطفال مع معلمة ومجموعة صغيرة من الطلاب"
                className="w-full rounded-3xl shadow-[var(--shadow-lift)]"
              />
          </div>
        </div>
      </section>

      <TwoWaysToLearn />

      {/* Features */}
      <section className="container-page py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl">ليه أولياء الأمور بيختارونا؟</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          مش مجرد حصص أونلاين؛ دي تجربة تعليم تفاعلي كاملة تعتمد أسلوب الغمر، من تحديد المستوى لحد
          تقرير آخر الشهر.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="surface-card p-6 transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-primary">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg">{f.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="container-page py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl">كيف نبدأ؟</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="surface-card p-6">
              <span className="flex size-10 items-center justify-center rounded-full brand-gradient font-display text-sm font-extrabold text-brand-dark-foreground">
                {s.n}
              </span>
              <h3 className="mt-4 text-base">{s.t}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <HowLearningWorks />
      <CurriculumRoadmap />
      <WhatStudentsLearn />
      <LessonTimeline />
      <InteractiveLearning />
      <ProgressSection />

      <FinalParentCta />

      {/* CTA */}
      <section className="container-page py-16 md:py-24">
        <div className="relative overflow-hidden rounded-3xl brand-gradient px-6 py-14 text-center text-brand-dark-foreground md:px-16">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 -z-0 glow-brand" />

          <h2 className="relative z-10 text-2xl text-brand-dark-foreground md:text-4xl">
            جرّب حصة مجانية قبل ما تقرر
          </h2>
          <p className="relative z-10 mx-auto mt-4 max-w-xl text-sm leading-8 text-brand-dark-foreground/80 md:text-base">
            احجز الآن، وفريقنا هيتواصل معك لتحديد الموعد المناسب واختبار تحديد المستوى.
          </p>

          <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/trial">احجز التجربة المجانية</Link>
            </Button>

            {/* Neon electric pulse samples CTA */}
            <div className="group relative">
              <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-primary via-pistachio to-brown opacity-40 blur transition duration-500 group-hover:opacity-75" />
              <Button
                asChild
                size="lg"
                className="relative border-b-4 border-brown bg-linear-to-br from-primary-action to-success px-6 text-primary-foreground shadow-lg transition-all active:translate-y-[2px] active:border-b-0 hover:from-primary-action/90 hover:to-success/90"
              >
                <Link to="/samples">
                  شوف نماذج من المحتوى
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
