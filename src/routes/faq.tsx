import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { MessageCircleHeart, BookOpen, ArrowLeft } from "lucide-react";

const FAQS = [
  {
    q: "ما هي الأعمار المناسبة للأكاديمية؟",
    a: "نستقبل الأطفال والمراهقين من 4 إلى 15 سنة، وكل فئة عمرية لها برنامج ومحتوى مختلف تمامًا.",
  },
  {
    q: "كم عدد الطلاب في المجموعة الواحدة؟",
    a: "المجموعات الصغيرة حتى 6 طلاب، والحصص شبه الخاصة من طالبين إلى 3 طلاب، والحصص الخاصة لطالب واحد مع المعلم.",
  },
  {
    q: "هل الحصة التجريبية مجانية فعلًا؟",
    a: "نعم، الحصة التجريبية واختبار تحديد المستوى مجانيان تمامًا وبدون أي التزام بالاشتراك.",
  },
  {
    q: "ما هي مدة الحصة وعددها أسبوعيًا؟",
    a: "مدة الحصة 55 دقيقة في الخطط الثلاث، بواقع حصتين أسبوعيًا في الجدول الأساسي.",
  },
  {
    q: "كيف أتابع تقدّم ابني؟",
    a: "تتواصل الأكاديمية مع ولي الأمر لمتابعة الحضور والواجبات وملاحظات المعلم وتقارير التقدّم.",
  },
  {
    q: "ماذا لو غاب الطفل عن حصة؟",
    a: "يتواصل ولي الأمر مع الأكاديمية بشأن الغياب، ويرسل المعلم ملخص الحصة والواجب حتى لا يتأخر الطالب.",
  },
  {
    q: "كيف تتم حماية بيانات الأطفال؟",
    a: "البيانات مخزنة بصلاحيات وصول صارمة: ولي الأمر يرى أبناءه فقط، والمعلم يرى مجموعاته فقط، والملفات محفوظة في تخزين خاص غير عام.",
  },
  {
    q: "لازم أكون بعرف إنجليزي عشان أساعد ابني؟",
    a: "لأ خالص. الدليل مكتوب بالعربي والإنجليزي بشكل مبسّط، وفيه النطق بالصوت، فتقدر تساعد ابنك بسهولة.",
  },
  {
    q: "الدليل بفلوس؟",
    a: "لأ، الدليل مجاني ومضمّن مع الكورس.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "الأسئلة الشائعة | Native Kid Academy" },
      {
        name: "description",
        content:
          "إجابات عن الأعمار، عدد الطلاب، مدة الحصص، متابعة ولي الأمر، وحماية بيانات الأطفال في أكاديمية Native Kid.",
      },
      { property: "og:title", content: "الأسئلة الشائعة | Native Kid Academy" },
      {
        property: "og:description",
        content: "كل ما يحتاج ولي الأمر معرفته قبل تسجيل طفله في الأكاديمية.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="الأسئلة الشائعة"
        title="خلّينا نطمنك قبل أول حصة"
        description="من اختيار المستوى لمتابعة التقدّم — إجابات على الأسئلة اللي بتهم كل ولي أمر."
      />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:py-16">
        <div><p className="mb-5 text-xs font-bold text-primary">الأعمار · الحصص · المتابعة</p><Accordion type="single" collapsible defaultValue="item-0" className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="gap-4 py-6 text-start text-base"><span className="flex items-start gap-3"><span className="mt-1 text-xs text-primary" aria-hidden="true">0{i + 1}</span><span>{f.q}</span></span></AccordionTrigger>
              <AccordionContent className="text-sm leading-8 text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion></div>

        <aside className="h-fit border-s-4 border-primary bg-accent p-6 lg:sticky lg:top-32">
          <MessageCircleHeart className="size-8 text-primary" />
          <h2 className="mt-4 text-xl">إحنا معاك في القرار</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            احجز التجربة المجانية وفريقنا هيتواصل معك ويجاوب على كل أسئلتك.
          </p>
          <Button asChild size="lg" className="mt-5 w-full">
            <Link to="/trial">احجز حصة مجانية <ArrowLeft /></Link>
          </Button>
          <div className="mt-6 border-t border-border pt-5"><BookOpen className="size-5 text-primary" /><h3 className="mt-2 text-base">حابب تعرف المنهج؟</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">شوف موضوعات ومهارات كل مستوى، ونماذج من مواد الحصص.</p><Button asChild variant="link" className="mt-2 px-0"><Link to="/samples">استكشف المنهج <ArrowLeft /></Link></Button></div>
        </aside>
      </div>
    </SiteLayout>
  );
}
