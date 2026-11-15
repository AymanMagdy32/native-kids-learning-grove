import { HeroParentVisual } from "@/components/home/HeroParentVisual";
import { LearningJourney } from "@/components/home/LearningJourney";
import { HomeMaterials } from "@/components/home/HomeMaterials";
/* Palette: logo royal blue, yellow, coral, and green. Fonts: Baloo Bhaijaan 2 / Readex Pro. */
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, AudioLines, BookOpen, Check, Clock3, Gift, ListChecks, LineChart, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Native Kid Academy | رحلة إنجليزي ممتعة لطفلك" },
    { name: "description", content: "إنجليزي أونلاين للأطفال من 4 إلى 15 سنة. اكتشف منهجنا التفاعلي من 6 مستويات، متابعة تقدّم طفلك، واحجز حصة تجريبية وتحديد مستوى." },
    { property: "og:title", content: "Native Kid Academy | رحلة إنجليزي ممتعة لطفلك" },
    { property: "og:description", content: "تعليم تفاعلي، مسار واضح، واهتمام بكل طفل. اكتشف مستويات الإنجليزي واحجز تجربة وحدّد مستوى طفلك." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HomePage,
});

const BENEFITS = [
  { icon: MessageCircle, title: "بيتكلّم… مش بس بيسمع", body: "قصص وألعاب وتمثيل أدوار تحوّل كل حصة لفرصة حقيقية لاستخدام الإنجليزي." },
  { icon: BookOpen, title: "كل خطوة لها هدف", body: "من الكلمات الأولى للمناقشات، منهج متدرّج يربط التحدث بالقراءة والكتابة." },
  { icon: LineChart, title: "تقدّمه واضح ليك", body: "متابعة شهرية للحضور والواجبات وتطوّر المهارات، عشان تكون جزء من رحلة طفلك." },
  { icon: ShieldCheck, title: "اهتمام يناسب طفلك", body: "مجموعات صغيرة أو حصص فردية، وبداية حسب المستوى مش العمر بس." },
  { icon: Gift, title: "دليل مجاني لولي الأمر مع كل كورس", body: "تفهم اللي بيتعلمه ابنك وتساعده في البيت حتى لو إنجليزيتك مش قوية." },
];
const PARENT_GUIDE_BENEFITS = [
  { icon: Clock3, title: "٣ دقائق في اليوم تكفي", body: "نشاط بسيط في آخر كل درس، من غير تحضير." },
  { icon: BookOpen, title: "اعرف ابنك اتعلم إيه بالظبط", body: "ملخص لكل درس بالعربي والإنجليزي." },
  { icon: AudioLines, title: "نطق صح بدون قلق", body: "الكلمات مكتوبة بحروف عربي تساعدك على النطق." },
  { icon: ListChecks, title: "تابع تقدمه بنفسك", body: "قايمة «هل يستطيع طفلك؟» تشوف بيها تقدمه." },
];
const STEPS = [
  { n: "01", title: "احجز تجربة وحدّد مستوى طفلك", body: "شاركنا عمر طفلك وهدفك من تعلّم الإنجليزي، وفريقنا يتواصل معك." },
  { n: "02", title: "نكتشف نقطة البداية", body: "نحدّد المستوى، وطفلك يجرّب طريقة التعلّم في حصة تفاعلية." },
  { n: "03", title: "نبدأ الرحلة سوا", body: "نختار المسار المناسب لطفلك ونواصل معك متابعة تقدّمه." },
];

function HomePage() {
  return (
    <SiteLayout>
      <div className="premium-home">
        <section className="premium-hero premium-hero-parent">
          <HeroParentVisual />
          <div className="container-page premium-hero-inner">
            <div className="premium-hero-copy">
              <p className="premium-eyebrow"><span /> حصص لطفلك. وخطوات ليكي في البيت.</p>
              <p className="mt-5 font-bold text-primary" dir="ltr">Native Kid Academy</p>
              <h1 className="mt-3">ابنك يتكلّم إنجليزي بثقة.<br /><span className="premium-underline">خطوة بخطوة، في الحصة والبيت.</span></h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground">حصص أونلاين من 4 لـ15 سنة، فيها طفلك يسمع ويتكلّم ويشارك، ببداية تناسب مستواه. ومع كل وحدة، دليل بالعربي والإنجليزي يساعدك تكمّلي معاه في البيت.</p>
              <a href="#parent-guide" className="premium-home-partner" aria-label="اكتشفي دليل البيت المضمّن مع كل كورس">
                <span className="premium-home-partner-top"><span className="premium-home-partner-label"><BookOpen className="size-4" /> دليل البيت · جزء من كل كورس</span><span className="premium-home-partner-free">من غير تكلفة إضافية</span></span>
                <strong>ابنك يتعلّم. وإنتي معاه خطوة بخطوة.</strong>
                <span className="premium-home-partner-copy">كلمات ونطق وأنشطة جاهزة بعد كل وحدة، تساعدك تتمرّني معاه وتراجعي إنجليزيتك إنتي كمان.</span>
                <span className="premium-home-partner-bottom"><span><Clock3 className="size-4" /> نشاط بسيط في ٣ دقايق</span><span>شوفي الدليل <ArrowLeft className="size-4" /></span></span>
              </a>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="sunshine" className="h-auto min-h-12 whitespace-normal text-center"><Link to="/trial">احجز تجربة وحدّد مستوى طفلك <ArrowLeft /></Link></Button>
                <Button asChild size="lg" variant="outline"><Link to="/samples" hash="materials">شوف نماذج من المحتوى <BookOpen /></Link></Button>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="flex items-center gap-2 text-xs text-muted-foreground"><Check className="size-4 text-primary" /> جرّب طريقة التعلّم قبل ما تقرر</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="رحلة طفلك بالأرقام" className="premium-trust">
          <div className="container-page grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4">
            {[{ value: "4–15", label: "سنة · أطفال ومراهقين" }, { value: "6", label: "مستويات بخطوات واضحة" }, { value: "4", label: "مهارات لغوية أساسية" }, { value: "شهريًا", label: "متابعة تقدّم لولي الأمر" }].map(({ value, label }) => <div key={label} className="premium-trust-item"><b dir="auto">{value}</b><span>{label}</span></div>)}
          </div>
        </section>

        <HomeMaterials />

        <LearningJourney />


        <section id="parent-guide" aria-labelledby="parent-guide-title" className="premium-section premium-guide-section guide-showcase">
          <div className="container-page">
            <div className="guide-showcase-top"><div className="premium-guide-heading premium-reveal">
              <p className="premium-guide-eyebrow"><BookOpen className="size-4" /> دليل البيت · معاكي طول الكورس</p>
              <h2 id="parent-guide-title" className="mt-4"><span className="guide-showcase-highlight">كورس مجاني للأهل</span>ساعد ابنك من البيت… حتى لو إنجليزيتك مش قوية</h2>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-muted-foreground">مع كل كورس بتستلم «دليل البيت»: دليل بالعربي والإنجليزي بعد كل وحدة، يخليك تفهم ابنك اتعلم إيه وتساعده بثقة، من غير ما تحتاج تكون متقن للإنجليزي.</p>
            </div>
            <div className="guide-mini-book" aria-label="نموذج من دليل البيت: التعارف">
              <span className="guide-free-seal">للأهل<strong>مجانًا</strong></span>
              <div className="guide-mini-page">
                <div className="guide-mini-tags"><span dir="ltr">Parent Guide · Unit 1</span><span>٣ دقائق</span></div>
                <h3 dir="ltr">Hello! My name is…</h3>
                <div className="guide-mini-line"><span>هالّو!</span><b dir="ltr">Hello!</b></div>
                <div className="guide-mini-line"><span>ماي نيم إز ____</span><b dir="ltr">My name is ____.</b></div>
                <p><Check className="size-4" /> هل يستطيع طفلك؟ ٢ من ٣</p>
              </div>
            </div></div>
            <div className="premium-guide-layout mt-10">
              <div className="premium-guide-benefits-column">
                <div className="guide-showcase-cards">
                {PARENT_GUIDE_BENEFITS.map(({ icon: Icon, title, body }) => (
                  <article key={title} className="premium-guide-benefit premium-reveal">
                    <span className="premium-icon"><Icon className="size-5" /></span>
                    <div><h3 className="text-base">{title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{body}</p></div>
                  </article>
                ))}
                </div>
              </div>

            </div>
            <aside className="premium-guide-reassurance mt-8 premium-reveal"><div><h3 className="text-base font-bold">ليه الحصص بالإنجليزي بس؟</h3><p className="mt-2 text-sm leading-7">لأن الطفل بيتعلم اللغة أسرع لما بيسمعها وبيستخدمها طول الحصة. الدليل بالعربي والإنجليزي ده ليك إنت في البيت، عشان تفهم وتساعد.</p></div></aside>
          </div>
        </section>

        <section id="about" className="premium-section home-benefits-compact">
          <div className="container-page">
            <div className="premium-section-heading"><div><p className="premium-eyebrow">تعليم يحبه طفلك. وتطمن له.</p><h2 className="mt-3">صغير في السن،<br />كبير في اللي يقدر يحققه.</h2></div><p>مش مجرد حفظ كلمات. بنساعد طفلك يفهم، يعبّر، ويستخدم اللغة في مواقف قريبة من عالمه.</p></div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {BENEFITS.map(({ icon: Icon, title, body }, i) => <article key={title} className="premium-benefit premium-reveal"><div className="flex items-center justify-between"><span className="premium-icon"><Icon className="size-6" /></span><span className="text-xs text-muted-foreground" dir="ltr">0{i + 1}</span></div><h3 className="mt-6 text-xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></article>)}
            </div>
          </div>
        </section>

        <section className="premium-section" id="start">
          <div className="container-page"><p className="premium-eyebrow">بداية سهلة، من غير حيرة</p><h2 className="mt-3">رحلته تبدأ بـ 3 خطوات.</h2><ol className="mt-12 grid gap-8 md:grid-cols-3">{STEPS.map(({ n, title, body }) => <li key={n} className="premium-step"><span dir="ltr">{n}</span><h3 className="mt-5 text-xl">{title}</h3><p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">{body}</p></li>)}</ol></div>
        </section>




        <section id="contact" className="premium-final">
          <div className="container-page flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center"><div><p className="text-sm text-brand-dark-foreground/75">أول خطوة صغيرة. بداية لحاجة كبيرة.</p><h2 className="mt-3">خلّي الإنجليزي جزء من عالمه.</h2><p className="mt-4 text-sm leading-7 text-brand-dark-foreground/75">احجز تجربة وحدّد مستوى طفلك، واتعرّف على البداية المناسبة لطفلك.</p><p className="mt-3 text-sm leading-7 text-brand-dark-foreground/75">احجز حصة تجريبية وتحديد مستوى، وابنك وإنت تبدأوا سوا.</p></div><Button asChild size="lg" variant="sunshine" className="h-auto min-h-12 whitespace-normal text-center"><Link to="/trial">احجز تجربة وحدّد مستوى طفلك <ArrowLeft /></Link></Button></div>
        </section>
      </div>
    </SiteLayout>
  );
}
