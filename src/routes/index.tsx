import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Languages, LineChart, MessageCircleHeart, ArrowLeft, Sparkles, Mic, Headphones, BookOpen,
  PenLine, Users, User, Clock, ShieldCheck, Star, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LEVELS } from "@/components/home/learning-data";
import lessonAsset from "@/assets/native-lesson.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Native Kid Academy | إنجليزي أونلاين للأطفال والمراهقين" },
      { name: "description", content: "تعليم إنجليزي أونلاين للأطفال من 4 إلى 15 سنة بأسلوب الغمر والتفاعل، 6 مستويات، متابعة شهرية وحصة تجريبية مجانية." },
      { property: "og:title", content: "Native Kid Academy | إنجليزي أونلاين للأطفال" },
      { property: "og:description", content: "حصص تفاعلية، 6 مستويات واضحة، ومتابعة شهرية لتقدّم طفلك." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const SKILLS = [
  { icon: Mic, t: "Speaking", ar: "التحدث", c: "nk-teal" },
  { icon: Headphones, t: "Listening", ar: "الاستماع", c: "nk-blue" },
  { icon: BookOpen, t: "Reading", ar: "القراءة", c: "nk-yellow" },
  { icon: PenLine, t: "Writing", ar: "الكتابة", c: "nk-coral" },
];
const WHY = [
  { icon: Languages, t: "الغمر باللغة", d: "الحصة كلها بالإنجليزي بالصور والمواقف، فالطفل يكتسب اللغة بشكل طبيعي." },
  { icon: MessageCircleHeart, t: "تفاعل حقيقي", d: "ألعاب وقصص وتمثيل أدوار، والطفل بيتكلم أغلب وقت الحصة." },
  { icon: LineChart, t: "تقرير شهري", d: "الحضور والواجبات وتطوّر كل مهارة، مكتوب بوضوح لولي الأمر." },
  { icon: ShieldCheck, t: "بيئة آمنة", d: "مجموعات صغيرة ومعلمين مدرّبين على التعامل مع الأطفال." },
];
const STEPS = [
  { n: "1", t: "احجز التجربة", d: "بيانات بسيطة عن الطفل." },
  { n: "2", t: "تحديد المستوى", d: "نعرف نقطة البداية." },
  { n: "3", t: "الحصة التجريبية", d: "طفلك يجرّب بنفسه." },
  { n: "4", t: "ابدأ الرحلة", d: "مجموعة ومستوى مناسبين." },
];
const TONES = ["nk-teal", "nk-blue", "nk-yellow", "nk-coral", "nk-green", "nk-blue"];

function HomePage() {
  return (
    <SiteLayout>
      {/* Hero: centered with floating image card */}
      <section className="nk-hero">
        <div className="container-page grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          <div>
            <span className="nk-pill"><Sparkles className="size-4" /> الحصة الأولى مجانية</span>
            <h1 className="mt-5 text-4xl leading-tight md:text-5xl">
              طفلك يتكلم إنجليزي <span className="nk-highlight">بثقة</span> من أول شهر
            </h1>
            <p className="mt-5 max-w-lg text-base leading-8 text-muted-foreground">
              Native Kid Academy — حصص أونلاين حية للأعمار من 4 إلى 15 سنة، بمنهج من 6 مستويات واهتمام خاص بالصوتيات والنطق.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/trial">احجز حصة مجانية <ArrowLeft className="size-4" /></Link></Button>
              <Button asChild variant="outline" size="lg"><Link to="/samples">شوف طريقة التعليم</Link></Button>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-4 fill-current text-yellow-accent" />)}
              <span className="ms-1">أولياء أمور راضيين عن تقدّم أولادهم</span>
            </div>
          </div>
          <div className="nk-hero-media">
            <img src={lessonAsset.url} alt="حصة إنجليزي أونلاين تفاعلية للأطفال" width={1280} height={1024} fetchPriority="high" />
            <div className="nk-float nk-float-a"><Clock className="size-5" /><div><b>55 دقيقة</b><small>لكل حصة</small></div></div>
            <div className="nk-float nk-float-b"><Users className="size-5" /><div><b>مجموعات صغيرة</b><small>أو حصص فردية</small></div></div>
          </div>
        </div>
      </section>

      {/* Skills strip */}
      <section className="container-page -mt-4 pb-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {SKILLS.map(({ icon: Icon, t, ar, c }) => (
            <div key={t} className={`nk-skill ${c}`}><Icon className="size-6" /><div><b>{ar}</b><small>{t}</small></div></div>
          ))}
        </div>
      </section>

      {/* Why: bento */}
      <section className="py-14 md:py-20">
        <div className="container-page">
          <p className="nk-eyebrow">ليه Native Kid؟</p>
          <h2 className="mt-2 text-2xl md:text-4xl">تعليم ممتع… ونتيجة تقدر تشوفها</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {WHY.map(({ icon: Icon, t, d }, i) => (
              <article key={t} className={`nk-card ${i === 0 ? "md:col-span-2 nk-card-feature" : ""}`}>
                <span className="nk-icon"><Icon className="size-6" /></span>
                <h3 className="mt-5 text-xl">{t}</h3>
                <p className="mt-2 text-sm leading-7 opacity-80">{d}</p>
              </article>
            ))}
            <article className="nk-card nk-card-stat md:col-span-2">
              <div><b>6</b><small>مستويات</small></div>
              <div><b><bdi>4–15</bdi></b><small>سنة</small></div>
              <div><b>2</b><small>حصة أسبوعيًا</small></div>
            </article>
          </div>
        </div>
      </section>

      {/* Levels timeline */}
      <section className="nk-levels py-14 md:py-20">
        <div className="container-page">
          <p className="nk-eyebrow">رحلة التعلّم</p>
          <h2 className="mt-2 text-2xl md:text-4xl">6 مستويات من أول كلمة لحد النقاش</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LEVELS.map((l, i) => (
              <article key={l.n} className={`nk-level ${TONES[i]}`}>
                <div className="flex items-center justify-between">
                  <span className="nk-level-n">{l.n}</span>
                  <span className="text-xs font-bold" dir="ltr">{l.cefr}</span>
                </div>
                <h3 className="mt-4 text-lg">{l.titleAr}</h3>
                <p className="text-xs opacity-70" dir="ltr">{l.titleEn}</p>
                <p className="mt-3 text-sm leading-7 opacity-85">{l.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="py-14 md:py-20">
        <div className="container-page grid gap-5 md:grid-cols-2">
          {[
            { icon: Users, t: "حصص المجموعات", d: "تواصل وتفاعل مع أطفال من نفس السن والمستوى.", pts: ["منهج منظم", "ألعاب جماعية", "تكلفة أقل"] },
            { icon: User, t: "حصص فردية", d: "اهتمام كامل وخطة مخصصة لسرعة طفلك.", pts: ["خطة مخصصة", "مواعيد مرنة", "تقدّم أسرع"] },
          ].map(({ icon: Icon, t, d, pts }) => (
            <article key={t} className="nk-card">
              <span className="nk-icon"><Icon className="size-6" /></span>
              <h3 className="mt-5 text-2xl">{t}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{d}</p>
              <ul className="mt-5 space-y-2">
                {pts.map((p) => <li key={p} className="flex items-center gap-2 text-sm"><CheckCircle2 className="size-4 text-primary" />{p}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Steps + CTA combined */}
      <section className="academy-booking py-14 md:py-20">
        <div className="container-page">
          <h2 className="text-2xl md:text-4xl">ابدأ في 4 خطوات بسيطة</h2>
          <ol className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {STEPS.map(({ n, t, d }) => (
              <li key={n} className="nk-step"><span>{n}</span><h3 className="mt-3 text-base">{t}</h3><p className="mt-1 text-sm opacity-75">{d}</p></li>
            ))}
          </ol>
          <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-brand-dark-foreground/20 pt-8 md:flex-row md:items-center">
            <p className="text-lg">جرّب حصة مجانية قبل ما تقرر — فريقنا هيتواصل معك.</p>
            <Button asChild size="lg"><Link to="/trial">احجز التجربة المجانية <ArrowLeft className="size-4" /></Link></Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
