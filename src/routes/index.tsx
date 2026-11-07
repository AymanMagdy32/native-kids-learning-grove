/* Palette: deep teal, sunny yellow, soft white. Fonts: Baloo Bhaijaan 2 / Readex Pro. */
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, AudioLines, BookOpen, Check, Gift, Headphones, House, LineChart, MessageCircle, Mic, PenLine, Play, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LEVELS } from "@/components/home/learning-data";
import learningPhoto from "@/assets/native-kid-learning.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Native Kid Academy | رحلة إنجليزي ممتعة لطفلك" },
    { name: "description", content: "إنجليزي أونلاين للأطفال من 4 إلى 15 سنة. اكتشف منهجنا التفاعلي من 6 مستويات، متابعة تقدّم طفلك، واحجز حصة تجريبية مجانية." },
    { property: "og:title", content: "Native Kid Academy | رحلة إنجليزي ممتعة لطفلك" },
    { property: "og:description", content: "تعليم تفاعلي، مسار واضح، واهتمام بكل طفل. اكتشف مستويات الإنجليزي واحجز التجربة المجانية." },
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
  { icon: BookOpen, title: "ملخص بسيط بعد كل وحدة", body: "تعرف ابنك اتعلم إيه بالظبط، بالعربي والإنجليزي، من غير ما تخمّن." },
  { icon: AudioLines, title: "نطق صحيح بالصوت", body: "تسجيلات قصيرة تسمع منها النطق الصح وتعيده مع ابنك." },
  { icon: House, title: "أنشطة سهلة في البيت", body: "ألعاب بسيطة بتاخد دقايق قليلة، من غير تحضير." },
];
const STEPS = [
  { n: "01", title: "احجز الحصة المجانية", body: "شاركنا عمر طفلك وهدفك من تعلّم الإنجليزي، وفريقنا يتواصل معك." },
  { n: "02", title: "نكتشف نقطة البداية", body: "نحدّد المستوى، وطفلك يجرّب طريقة التعلّم في حصة تفاعلية." },
  { n: "03", title: "نبدأ الرحلة سوا", body: "نختار المسار المناسب لطفلك ونواصل معك متابعة تقدّمه." },
];

function HomePage() {
  return (
    <SiteLayout>
      <div className="premium-home">
        <section className="premium-hero">
          <img src={learningPhoto} alt="طفلان يستمتعان بالتعلّم معًا على اللابتوب" width={1920} height={1024} fetchPriority="high" className="premium-hero-photo" />
          <div className="container-page premium-hero-inner">
            <div className="premium-hero-copy">
              <p className="premium-eyebrow"><span /> لغة جديدة. فرص أكبر.</p>
              <p className="mt-5 font-bold text-primary" dir="ltr">Native Kid Academy</p>
              <h1 className="mt-3">إنجليزي لطفلك.<br /><span className="premium-underline">ثقة تكبر معاه.</span></h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground">تعلّم حقيقي، ضحكات كتير، وخطوات واضحة. حصص إنجليزي أونلاين للأطفال والمراهقين من 4 إلى 15 سنة، يكون فيها طفلك بطل الحصة.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="sunshine"><Link to="/trial">احجز حصة مجانية <ArrowLeft /></Link></Button>
                <Button asChild size="lg" variant="outline"><Link to="/samples">شوف نماذج من المحتوى <BookOpen /></Link></Button>
              </div>
              <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><Check className="size-4 text-primary" /> جرّب طريقة التعلّم قبل ما تقرر</p>
              <span className="premium-guide-chip"><Gift className="size-4" /> + دليل مجاني لولي الأمر</span>
            </div>
          </div>
          <div className="premium-photo-label"><span className="premium-live-dot" /><span>تفاعل حقيقي. من راحة البيت.</span></div>
        </section>

        <section aria-label="رحلة طفلك بالأرقام" className="premium-trust">
          <div className="container-page grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4">
            {[{ value: "4–15", label: "سنة · أطفال ومراهقين" }, { value: "6", label: "مستويات بخطوات واضحة" }, { value: "4", label: "مهارات لغوية أساسية" }, { value: "شهريًا", label: "متابعة تقدّم لولي الأمر" }].map(({ value, label }) => <div key={label} className="premium-trust-item"><b dir="auto">{value}</b><span>{label}</span></div>)}
          </div>
        </section>

        <section id="about" className="premium-section">
          <div className="container-page">
            <div className="premium-section-heading"><div><p className="premium-eyebrow">تعليم يحبه طفلك. وتطمن له.</p><h2 className="mt-3">صغير في السن،<br />كبير في اللي يقدر يحققه.</h2></div><p>مش مجرد حفظ كلمات. بنساعد طفلك يفهم، يعبّر، ويستخدم اللغة في مواقف قريبة من عالمه.</p></div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map(({ icon: Icon, title, body }, i) => <article key={title} className="premium-benefit premium-reveal"><div className="flex items-center justify-between"><span className="premium-icon"><Icon className="size-6" /></span><span className="text-xs text-muted-foreground" dir="ltr">0{i + 1}</span></div><h3 className="mt-6 text-xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></article>)}
            </div>
          </div>
        </section>

        <section aria-labelledby="parent-guide-title" className="premium-section premium-guide-section">
          <div className="container-page">
            <div className="premium-section-heading">
              <div>
                <p className="premium-guide-eyebrow"><Gift className="size-4" /> هدية مجانية مع كل كورس</p>
                <h2 id="parent-guide-title" className="mt-3">ساعد ابنك من البيت…<br />حتى لو إنجليزيتك مش قوية</h2>
              </div>
              <p>بعد كل وحدة بتستلم دليل مبسّط بالعربي والإنجليزي، يخليك فاهم ابنك اتعلم إيه وتساعده بثقة.</p>
            </div>
            <div className="premium-guide-layout mt-10">
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {PARENT_GUIDE_BENEFITS.map(({ icon: Icon, title, body }) => (
                  <article key={title} className="premium-guide-benefit">
                    <span className="premium-icon"><Icon className="size-5" /></span>
                    <div><h3 className="text-base">{title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{body}</p></div>
                  </article>
                ))}
              </div>
              <article className="premium-guide-sheet" aria-label="نموذج توضيحي لدليل الأهل">
                <div className="premium-guide-sheet-top"><span className="premium-guide-sheet-tag">نموذج توضيحي</span><span className="text-xs text-muted-foreground">دليلك بعد الوحدة</span></div>
                <div className="premium-guide-sheet-title"><span className="premium-guide-sheet-icon"><BookOpen className="size-5" /></span><div><p className="text-xs font-bold text-primary">Unit · الوحدة</p><h3 className="mt-1 text-xl">الألوان <span className="font-sans text-sm font-medium text-muted-foreground" dir="ltr">/ Colors</span></h3></div></div>
                <p className="mt-7 text-sm font-bold">كلمات اتعلمناها</p>
                <ul className="premium-guide-word-list mt-3">
                  <li><span dir="ltr">Red</span><span>أحمر</span><span className="premium-guide-play" aria-hidden="true"><Play className="size-3" fill="currentColor" /></span></li>
                  <li><span dir="ltr">Blue</span><span>أزرق</span><span className="premium-guide-play" aria-hidden="true"><Play className="size-3" fill="currentColor" /></span></li>
                </ul>
                <div className="premium-guide-tip mt-5"><span className="text-xs font-bold text-primary">Try at home · جرّبوا في البيت</span><p className="mt-2 text-sm leading-7">اختاروا حاجة حمرا وحاجة زرقا في البيت، وسمّوا لونها مع بعض.</p></div>
              </article>
            </div>
            <p className="premium-guide-reassurance mt-7"><Check className="size-4 text-primary" /> الحصص مع ابنك بالإنجليزي بس عشان يتعلم أسرع، أما الدليل بالعربي والإنجليزي فده ليك إنت في البيت.</p>
            <div className="premium-guide-close mt-8"><div><h3 className="text-lg">وإنت كمان بتتعلم</h3><p className="mt-1 text-sm leading-7 text-muted-foreground">كل ورقة بتقوّي إنجليزيتك خطوة خطوة.</p></div><Button asChild size="lg" variant="sunshine"><Link to="/trial">احجز حصة مجانية <ArrowLeft /></Link></Button></div>
          </div>
        </section>

        <section id="courses" className="premium-section premium-soft-band">
          <div className="container-page">
            <div className="premium-section-heading"><div><p className="premium-eyebrow">المنهج · من أول كلمة لأفكار أكبر</p><h2 className="mt-3">بداية تناسبه.<br />ومسار يكمل معاه.</h2></div><p>بنستخدم منهج Abridge Academy التفاعلي كأحد مساراتنا الأساسية، بتدرّج CEFR من المبتدئ تمامًا إلى ما قبل المتوسط. البداية حسب مستوى طفلك.</p></div>
            <div className="mt-10 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {LEVELS.map((level) => <article className="premium-course premium-reveal" key={level.n}>
                <div className="flex items-center justify-between"><span className="premium-level-number" dir="ltr">0{level.n}</span><span className="premium-cefr" dir="ltr">{level.cefr}</span></div>
                <h3 className="mt-5 text-xl">{level.titleAr}</h3><p className="mt-1 text-xs text-muted-foreground" dir="ltr">{level.titleEn}</p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{level.outcome}</p>
                <details className="premium-course-details"><summary>تفاصيل المستوى <ArrowLeft className="size-4" /></summary><p className="mt-4 text-sm leading-7 text-muted-foreground">{level.desc}</p><h4 className="mt-5 text-sm">موضوعات المستوى</h4><p className="mt-2 text-sm leading-7 text-muted-foreground">{level.topics.join(" · ")}</p><h4 className="mt-5 text-sm">مهارات بنتمرّن عليها</h4><ul className="mt-3 space-y-3">{level.skills.map(skill => <li key={skill} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground"><Check className="mt-1 size-4 text-primary" /><span dir="auto">{skill}</span></li>)}</ul></details>
              </article>)}
            </div>
            <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"><p className="text-sm text-muted-foreground">مش متأكد طفلك يبدأ منين؟ بنحدد المستوى معك في التجربة.</p><Button asChild variant="link"><Link to="/samples">شوف المنهج وطريقة الحصة <ArrowLeft /></Link></Button></div>
          </div>
        </section>

        <section className="premium-section" id="start">
          <div className="container-page"><p className="premium-eyebrow">بداية سهلة، من غير حيرة</p><h2 className="mt-3">رحلته تبدأ بـ 3 خطوات.</h2><ol className="mt-12 grid gap-8 md:grid-cols-3">{STEPS.map(({ n, title, body }) => <li key={n} className="premium-step"><span dir="ltr">{n}</span><h3 className="mt-5 text-xl">{title}</h3><p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">{body}</p></li>)}</ol></div>
        </section>

        <section id="teaching" className="premium-section premium-teaching-band">
          <div className="container-page grid items-start gap-10 md:grid-cols-2">
            <div><p className="premium-eyebrow">داخل الحصة</p><h2 className="mt-3">المعلم يوجّه.<br />وطفلك يشارك.</h2><p className="mt-5 max-w-lg text-sm leading-8 text-muted-foreground">من نشاط يجذب انتباهه لموقف يستخدم فيه اللي اتعلّمه. صوت طفلك له مساحة في كل حصة، مع ملاحظات تساعده ياخد الخطوة اللي بعدها.</p><Button asChild variant="link" className="mt-5 px-0"><Link to="/samples">اكتشف شكل الحصة <ArrowLeft /></Link></Button></div>
            <div><div className="grid grid-cols-2 gap-4">{[{ icon: Mic, ar: "يتكلم بثقة", en: "Speaking" }, { icon: Headphones, ar: "يسمع ويفهم", en: "Listening" }, { icon: BookOpen, ar: "يقرأ ويكتشف", en: "Reading" }, { icon: PenLine, ar: "يكتب ويعبّر", en: "Writing" }].map(({ icon: Icon, ar, en }) => <div key={en} className="premium-skill"><Icon className="size-6 text-primary" /><h3 className="mt-4 text-base">{ar}</h3><p dir="ltr" className="mt-1 text-xs text-muted-foreground">{en}</p></div>)}</div><p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><Users className="size-4 text-primary" /> حصص مجموعات أو فردية حسب احتياج طفلك</p></div>
          </div>
        </section>

        <section className="premium-section">
          <div className="container-page premium-parent-note"><div className="premium-parent-heading"><ShieldCheck className="size-8 text-primary" /><p className="premium-eyebrow mt-4">لأن قرارك مهم</p><h2 className="mt-3">خليك مطمّن.<br />وخليك جزء من الرحلة.</h2></div><div className="space-y-7">{[{ title: "تجربة قبل الاشتراك", body: "طفلك يتعرّف على طريقة التعلّم، وأنت تشوف هل هي مناسبة له." }, { title: "متابعة مش مجرد حضور", body: "تعرف اللي اتعلّمه طفلك، والمهارات اللي بنشتغل عليها، من خلال متابعة شهرية." }, { title: "إجابات واضحة لأسئلتك", body: "فريقنا يساعدك تختار المستوى وشكل الحصص المناسب قبل البداية." }].map(item => <div key={item.title} className="flex gap-4"><Check className="mt-1 size-5 text-primary" /><div><h3 className="text-lg">{item.title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{item.body}</p></div></div>)}<Button asChild variant="link" className="px-0"><Link to="/faq">أسئلة أولياء الأمور <ArrowLeft /></Link></Button></div></div>
        </section>

        <section id="contact" className="premium-final">
          <div className="container-page flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center"><div><p className="text-sm text-brand-dark-foreground/75">أول خطوة صغيرة. بداية لحاجة كبيرة.</p><h2 className="mt-3">خلّي الإنجليزي جزء من عالمه.</h2><p className="mt-4 text-sm leading-7 text-brand-dark-foreground/75">احجز حصة مجانية، واتعرّف على البداية المناسبة لطفلك.</p><p className="mt-3 text-sm leading-7 text-brand-dark-foreground/75">احجز حصة تجريبية مجانية، وابنك وإنت تبدأوا سوا.</p></div><Button asChild size="lg" variant="sunshine"><Link to="/trial">احجز التجربة المجانية <ArrowLeft /></Link></Button></div>
        </section>
      </div>
    </SiteLayout>
  );
}
