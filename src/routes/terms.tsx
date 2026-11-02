import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "الشروط والأحكام | Native Kid Academy" },
      {
        name: "description",
        content:
          "شروط الاشتراك في أكاديمية Native Kid: الحضور، الإلغاء، الدفع، الملكية الفكرية، وقواعد السلوك.",
      },
      { property: "og:title", content: "الشروط والأحكام | Native Kid Academy" },
      { property: "og:description", content: "القواعد المنظمة للاشتراك والحصص داخل الأكاديمية." },
    ],
  }),
  component: TermsPage,
});

const SECTIONS = [
  {
    t: "الاشتراك والحصص",
    b: "يبدأ الاشتراك بعد تحديد المستوى وتخصيص المجموعة. تُقدَّم الحصص أونلاين وفق جدول أسبوعي متفق عليه مع ولي الأمر.",
  },
  {
    t: "الحضور والغياب",
    b: "يُسجَّل حضور كل حصة في النظام. في حالة غياب الطالب يحصل على ملخص الحصة والواجب، ولا تُحتسب الحصة كحصة تعويضية إلا وفق سياسة التعويض المعلنة.",
  },
  {
    t: "الدفع والاسترداد",
    b: "يتم سداد قيمة الاشتراك قبل بداية الفترة الدراسية. طلبات الاسترداد تُدرس حالة بحالة وفق عدد الحصص التي تم حضورها فعليًا.",
  },
  {
    t: "الملكية الفكرية",
    b: "جميع المناهج والواجبات والاختبارات من إنتاج Native Kid Academy، ويُمنع إعادة نشرها أو بيعها أو مشاركتها خارج نطاق الاستخدام الشخصي للطالب.",
  },
  {
    t: "قواعد السلوك",
    b: "نلتزم ببيئة تعليمية محترمة. يُمنع تسجيل الحصص أو مشاركة روابطها، وقد يتم إيقاف الاشتراك في حالة الإخلال المتكرر بالقواعد.",
  },
  {
    t: "تعديل الشروط",
    b: "قد نحدّث هذه الشروط عند تطوير الخدمة، وسيتم إخطار أولياء الأمور بأي تغيير جوهري قبل تطبيقه.",
  },
];

function TermsPage() {
  return (
    <SiteLayout>
      <PageHero title="الشروط والأحكام" description="آخر تحديث: 2026" />
      <div className="container-page max-w-3xl py-14">
        {SECTIONS.map((s) => (
          <section key={s.t} className="mb-8">
            <h2 className="text-lg">{s.t}</h2>
            <p className="mt-2 text-sm leading-8 text-muted-foreground">{s.b}</p>
          </section>
        ))}
      </div>
    </SiteLayout>
  );
}
