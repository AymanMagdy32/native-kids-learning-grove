import { createFileRoute, Link } from "@tanstack/react-router";
import { Languages, LineChart, MessageCircleHeart, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";
import lessonAsset from "@/assets/native-lesson.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Native Kid Academy | إنجليزي أونلاين للأطفال والمراهقين" },
      { name: "description", content: "تعليم إنجليزي أونلاين للأطفال من 4 إلى 15 سنة بأسلوب الغمر والتفاعل، مع متابعة شهرية وحصة تجريبية مجانية." },
      { property: "og:title", content: "Native Kid Academy | إنجليزي أونلاين للأطفال" },
      { property: "og:description", content: "حصص تفاعلية، أساس قوي في الإنجليزية، ومتابعة واضحة لتقدّم طفلك." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const FEATURES = [
  { icon: Languages, tone: "academy-icon-teal", title: "الغمر باللغة الإنجليزية", body: "طفلك يكتسب اللغة بصورة طبيعية من خلال المواقف والصور والتفاعل، مش الحفظ والتلقين." },
  { icon: LineChart, tone: "academy-icon-blue", title: "متابعة واضحة لتقدّمه", body: "تقرير شهري يوضح الحضور والواجبات وتطوّر مهارات طفلك، خطوة بخطوة." },
  { icon: MessageCircleHeart, tone: "academy-icon-coral", title: "حصص حية وتفاعلية", body: "كلام وألعاب لغوية وقصص، مع اهتمام خاص بالصوتيات لبناء أساس قوي في النطق والقراءة." },
];
const STEPS = [
  { n: "01", title: "احجز التجربة المجانية", body: "معلومات بسيطة عن ولي الأمر وعمر الطفل." },
  { n: "02", title: "نحدد المستوى", body: "نختار نقطة البداية المناسبة لطفلك." },
  { n: "03", title: "جرّب الحصة", body: "طفلك يتعرّف على المعلم وطريقة التعليم." },
  { n: "04", title: "ابدأ الرحلة", body: "نرشّح المستوى والمجموعة المناسبين." },
];

function HomePage() {
  return (
    <SiteLayout>
      <section className="academy-home-hero">
        <img src={lessonAsset.url} alt="حصة إنجليزي أونلاين تفاعلية للأطفال مع معلمة ومجموعة صغيرة من الطلاب" width={1280} height={1024} fetchPriority="high" />
        <div className="container-page">
          <div className="academy-hero-copy">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-primary"><Sparkles className="size-4" /> حصة تجريبية مجانية</span>
            <h1 className="mt-4">Native Kid Academy</h1>
            <h2 className="mt-2 text-2xl text-primary md:text-3xl">إنجليزي أونلاين لأطفالك بأسلوب الغمر</h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-muted-foreground">للأعمار من 4 إلى 15 سنة. تحدث، استماع، قراءة وكتابة، مع اهتمام خاص بالصوتيات ومتابعة شهرية لولي الأمر.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/trial">احجز حصة تجريبية مجانية <ArrowLeft className="size-4" /></Link></Button>
              <Button asChild variant="outline" size="lg"><Link to="/samples">شوف نماذج التعليم</Link></Button>
            </div>
            <dl className="academy-facts">
              <div><dt><bdi>4–15</bdi></dt><dd>سنة</dd></div>
              <div><dt>55</dt><dd>دقيقة للحصة</dd></div>
              <div><dt>تقرير</dt><dd>شهري</dd></div>
            </dl>
          </div>
        </div>
      </section>
      <section className="py-14 md:py-20">
        <div className="container-page">
          <h2 className="text-2xl md:text-3xl">ليه أولياء الأمور بيختارونا؟</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {FEATURES.map(({ icon: Icon, tone, title, body }) => (
              <article key={title} className="surface-card p-6"><span className={`academy-benefit-icon ${tone}`}><Icon className="size-6" /></span><h3 className="mt-5 text-xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></article>
            ))}
          </div>
        </div>
      </section>
      <section className="academy-start py-14 md:py-16">
        <div className="container-page">
          <h2 className="text-2xl md:text-3xl">كيف نبدأ؟</h2>
          <ol className="mt-8 grid grid-cols-2 gap-7 md:grid-cols-4">
            {STEPS.map(({ n, title, body }) => (<li key={n}><span className="academy-step-number"><bdi>{n}</bdi></span><h3 className="mt-3 text-base">{title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{body}</p></li>))}
          </ol>
        </div>
      </section>
      <section className="academy-booking py-14 md:py-16">
        <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div><h2 className="text-2xl md:text-3xl">جرّب حصة مجانية قبل ما تقرر</h2><p className="mt-3 text-sm leading-7 text-brand-dark-foreground/80">فريقنا هيتواصل معك لتحديد الموعد المناسب.</p></div>
          <Button asChild size="lg"><Link to="/trial">احجز التجربة المجانية <ArrowLeft className="size-4" /></Link></Button>
        </div>
      </section>
    </SiteLayout>
  );
}
