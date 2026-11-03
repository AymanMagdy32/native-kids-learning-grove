import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { PolicyContent } from "@/components/site/PolicyContent";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "سياسة الخصوصية | Native Kid Academy" },
      {
        name: "description",
        content:
          "كيف نجمع بيانات أولياء الأمور والطلاب في أكاديمية Native Kid، وكيف نحميها ومن يستطيع الوصول إليها.",
      },
      { property: "og:title", content: "سياسة الخصوصية | Native Kid Academy" },
      { property: "og:description", content: "التزامنا بحماية بيانات الأطفال وأولياء الأمور." },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  {
    t: "البيانات التي نجمعها",
    b: "اسم ولي الأمر ورقم التواصل، اسم الطفل وعمره ومستواه الدراسي، بيانات الحضور والواجبات وتقارير التقدّم، وأي ملفات يرفعها الطالب كجزء من الواجبات.",
  },
  {
    t: "الغرض من الاستخدام",
    b: "تقديم الخدمة التعليمية، تحديد المستوى المناسب، متابعة تقدّم الطالب، والتواصل مع ولي الأمر بخصوص المواعيد والتقارير فقط.",
  },
  {
    t: "من يمكنه الوصول للبيانات",
    b: "تستخدم الأكاديمية البيانات للتواصل والمتابعة التعليمية للأغراض التشغيلية فقط. لا نبيع أو نشارك البيانات مع أي طرف تسويقي خارجي.",
  },
  {
    t: "أمن المعلومات",
    b: "نطبّق سياسات صلاحيات على مستوى قاعدة البيانات، وتُحفظ الملفات في مساحات تخزين خاصة غير عامة، ولا يتم عرضها إلا لأصحاب الصلاحية.",
  },
  {
    t: "بيانات الأطفال",
    b: "لا يتطلب استخدام الموقع إنشاء حساب للأطفال، ولا ننشر صور أو أسماء الطلاب بشكل عام. آراء أولياء الأمور تُنشر فقط بعد موافقتهم وباسم مختصر.",
  },
  {
    t: "حقوقك",
    b: "يمكنك طلب الاطلاع على بيانات أسرتك أو تعديلها أو حذفها بالتواصل مع إدارة الأكاديمية، وسنستجيب خلال مدة معقولة.",
  },
];

function PrivacyPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="الثقة والخصوصية · آخر تحديث: 2026" title="سياسة الخصوصية" description="معلومات واضحة عن بيانات أسرتك، واستخدامها، وحقوقك." />
      <PolicyContent sections={SECTIONS} kind="privacy" />
    </SiteLayout>
  );
}
