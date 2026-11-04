import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, MessageCircleHeart, ShieldCheck, ArrowLeft, ClipboardCheck, MonitorPlay, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { whatsappLink } from "@/lib/contact";

export const Route = createFileRoute("/trial")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "احجز حصة تجريبية مجانية | Native Kid Academy" },
      {
        name: "description",
        content:
          "احجز حصة إنجليزي تجريبية مجانية لطفلك أونلاين. املأ النموذج وسيتواصل معك فريق الأكاديمية لتحديد الموعد.",
      },
      { property: "og:title", content: "احجز حصة تجريبية مجانية | Native Kid Academy" },
      {
        property: "og:description",
        content: "خطوة واحدة تفصل طفلك عن أول حصة إنجليزي تفاعلية مجانية.",
      },
    ],
  }),
  component: TrialPage,
});

const schema = z.object({
  parent_name: z.string().trim().min(2, "من فضلك اكتب اسم ولي الأمر").max(100),
  phone: z
    .string()
    .trim()
    .min(8, "رقم الهاتف غير صحيح")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "رقم الهاتف غير صحيح"),
  child_age: z.coerce
    .number()
    .int()
    .min(4, "البرامج تبدأ من عمر 4 سنوات")
    .max(15, "البرامج حتى عمر 15 سنة"),
  current_level: z.string().trim().max(80).optional(),
  preferred_contact: z.enum(["whatsapp", "phone"]),
  note: z.string().trim().max(600).optional(),
  consent: z.literal(true, { message: "لازم توافق على سياسة الخصوصية" }),
});

function buildWhatsAppLink(data: z.infer<typeof schema>) {
  const message =
    `مرحبًا، أنا ${data.parent_name}. ` +
    `أرغب في حجز حصة تجريبية لطفلي عمر ${data.child_age} سنة في Native Kid Academy، وأريد تأكيد الموعد. ` +
    `رقمي: ${data.phone}` +
    (data.current_level ? `، المستوى الحالي: ${data.current_level}` : "") +
    (data.note ? `\nملاحظة: ${data.note}` : "");
  return whatsappLink(message);
}

function TrialPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [consent, setConsent] = useState(false);
  const [contact, setContact] = useState<"whatsapp" | "phone">("whatsapp");
  const [submitted, setSubmitted] = useState<z.infer<typeof schema> | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      parent_name: fd.get("parent_name"),
      phone: fd.get("phone"),
      child_age: fd.get("child_age"),
      current_level: fd.get("current_level") || undefined,
      preferred_contact: contact,
      note: fd.get("note") || undefined,
      consent,
    });

    if (!parsed.success) {
      const map: Record<string, string> = {};
      for (const issue of parsed.error.issues) map[String(issue.path[0])] = issue.message;
      setErrors(map);
      return;
    }

    setErrors({});
    setSubmitting(true);
    setSubmitting(false);
    setSubmitted(parsed.data);
    setDone(true);

    // Redirect to WhatsApp so the operations team gets the lead instantly
    window.location.assign(buildWhatsAppLink(parsed.data));
  }

  if (done && submitted) {
    const whatsappLink = buildWhatsAppLink(submitted);
    return (
      <SiteLayout>
        <div className="container-page flex min-h-[60vh] items-center justify-center py-16">
          <div className="surface-card max-w-lg p-10 text-center">
            <CheckCircle2 className="mx-auto size-12 text-success" />
            <h1 className="mt-4 text-2xl">طلبك جاهز للإرسال عبر واتساب</h1>
            <p className="mt-3 text-sm leading-8 text-muted-foreground">
              أرسل بيانات الحجز لفريق التشغيل عبر واتساب لتأكيد الموعد. لو لم يفتح تلقائيًا، اضغط
              الزر أدناه.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <a href={whatsappLink} target="_blank" rel="noreferrer">
                  تواصل عبر واتساب
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/trial">احجز حصة تجريبية</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/samples">شوف نماذج المحتوى</Link>
              </Button>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="تجربة مجانية"
        title="أول خطوة… حصة يجربها طفلك"
        description="حصة تجريبية مجانية وتحديد مستوى، من غير دفع أو التزام بالاشتراك. نعرف طفلك ونختار له البداية المناسبة."
      />
      <div className="container-page grid items-start gap-10 py-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:py-16">
        <form onSubmit={onSubmit} noValidate className="trial-form space-y-6">
          <div className="border-b border-border pb-5"><p className="text-xs font-bold text-primary">طلب الحصة التجريبية</p><h2 className="mt-2 text-2xl">نتعرّف عليك وعلى طفلك</h2></div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="parent_name">اسم ولي الأمر *</Label>
              <Input id="parent_name" name="parent_name" autoComplete="name" maxLength={100} aria-invalid={!!errors["parent_name"]} className="mt-2" />
              {errors["parent_name"] && (
                <p className="mt-1 text-xs text-destructive">{errors["parent_name"]}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">رقم الهاتف / واتساب *</Label>
              <Input id="phone" name="phone" type="tel" autoComplete="tel" dir="ltr" maxLength={20} aria-invalid={!!errors["phone"]} className="mt-2" />
              {errors["phone"] && (
                <p className="mt-1 text-xs text-destructive">{errors["phone"]}</p>
              )}
            </div>
            <div>
              <Label htmlFor="child_age">عمر الطفل *</Label>
              <Input
                id="child_age"
                name="child_age"
                type="number"
                min={4}
                max={15}
                className="mt-2"
              />
              {errors["child_age"] && (
                <p className="mt-1 text-xs text-destructive">{errors["child_age"]}</p>
              )}
            </div>
            <div>
              <Label htmlFor="current_level">المستوى الحالي (اختياري)</Label>
              <Input
                id="current_level"
                name="current_level"
                placeholder="مثال: مبتدئ / بيدرس في المدرسة"
                maxLength={80}
                className="mt-2"
              />
            </div>
          </div>

          <fieldset>
            <legend className="text-sm font-medium">طريقة التواصل المفضلة</legend>
            <div className="mt-2 flex gap-2">
              {(
                [
                  ["whatsapp", "واتساب"],
                  ["phone", "مكالمة هاتفية"],
                ] as const
              ).map(([v, l]) => (
                <Button
                  key={v}
                  type="button"
                  onClick={() => setContact(v)}
                  aria-pressed={contact === v}
                  variant="outline"
                  className={`${
                    contact === v
                      ? "border-primary bg-primary/10 font-bold text-primary"
                      : "border-border"
                  }`}
                >
                  {l}
                </Button>
              ))}
            </div>
          </fieldset>

          <div>
            <Label htmlFor="note">ملاحظات (اختياري)</Label>
            <Textarea id="note" name="note" rows={4} maxLength={600} className="mt-2" />
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(v) => setConsent(v === true)}
            />
            <Label htmlFor="consent" className="text-sm font-normal leading-6">
              أوافق على التواصل معي بخصوص الحصة التجريبية وعلى{" "}
              <Link to="/privacy" className="font-bold text-primary underline">
                سياسة الخصوصية
              </Link>
              .
            </Label>
          </div>
          {errors["consent"] && <p className="text-xs text-destructive">{errors["consent"]}</p>}

          <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
            {submitting ? "جارٍ الإرسال…" : "أرسل طلب الحجز عبر واتساب"}
            <ArrowLeft className="size-4" />
          </Button>
          <p className="text-xs leading-6 text-muted-foreground">طلبك هيفتح في واتساب، وتقدر تراجعه قبل إرساله لتأكيد الموعد مع الفريق.</p>
        </form>

        <aside className="space-y-6 lg:sticky lg:top-32">
          <div className="border-s-4 border-primary bg-accent p-6">
            <h2 className="text-xl">إيه اللي هيحصل بعد الحجز؟</h2>
            <ol className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
              {[
                { icon: MessageCircleHeart, text: "سنتواصل معك في أقرب وقت ممكن." },
                { icon: ClipboardCheck, text: "اختبار تحديد مستوى مجاني أونلاين." },
                { icon: MonitorPlay, text: "حصة تجريبية كاملة مع المعلم." },
                { icon: Users, text: "ترشيح المجموعة والمواعيد المناسبة." },
              ].map(({ icon: Icon, text }) => <li key={text} className="flex items-start gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-card text-primary"><Icon className="size-4" /></span><span>{text}</span></li>)}
            </ol>
          </div>
          <div className="border-t border-border pt-6">
            <ShieldCheck className="size-6 text-primary" />
            <h2 className="mt-3 text-lg">خصوصية بيانات طفلك</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              بنجمع الحد الأدنى من البيانات، ولا نشارك أي معلومات مع أطراف خارجية. البيانات محمية
              بصلاحيات وصول صارمة داخل النظام.
            </p>
          </div>
          <Button asChild variant="link" className="px-0"><Link to="/samples">شوف المنهج ومستويات التعلّم <ArrowLeft /></Link></Button>
        </aside>
      </div>
    </SiteLayout>
  );
}
