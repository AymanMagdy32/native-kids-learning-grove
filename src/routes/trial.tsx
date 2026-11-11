import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { requestSchema as schema } from "@/lib/requests/schema";
import { bookingAvailability, saveTrialRequest } from "@/lib/requests/functions";
import {
  CheckCircle2,
  MessageCircleHeart,
  ShieldCheck,
  ArrowLeft,
  ClipboardCheck,
  MonitorPlay,
  Users,
} from "lucide-react";
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
      { title: "احجز حصة تجريبية وتحديد مستوى | Native Kid Academy" },
      {
        name: "description",
        content:
          "احجز حصة إنجليزي تجريبية لطفلك أونلاين. املأ النموذج وسيتواصل معك فريق الأكاديمية لتحديد الموعد.",
      },
      { property: "og:title", content: "احجز حصة تجريبية وتحديد مستوى | Native Kid Academy" },
      {
        property: "og:description",
        content: "خطوة واحدة تفصل طفلك عن أول حصة إنجليزي تفاعلية.",
      },
    ],
  }),
  component: TrialPage,
});

function buildWhatsAppLink(data: z.infer<typeof schema>) {
  const message =
    `مرحبًا، أنا ${data.parent_name}. ` +
    `أرغب في حجز حصة تجريبية لطفلي عمر ${data.child_age} سنة في Native Kid Academy، وأريد تأكيد الموعد. ` +
    `رقمي: ${data.phone}، التواصل المفضّل: ${data.preferred_contact === "phone" ? "مكالمة هاتفية" : "واتساب"}` +
    (data.current_level ? `، المستوى الحالي: ${data.current_level}` : "") +
    (data.note ? `\nملاحظة: ${data.note}` : "");
  return whatsappLink(message);
}

function TrialPage() {
  const [savingEnabled, setSavingEnabled] = useState(false);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [requestId, setRequestId] = useState<string | null>(null);
  const submission = useRef<{ id: string; payload: string } | null>(null);
  const inFlight = useRef(false);
  useEffect(() => {
    bookingAvailability()
      .then((result) => {
        setSavingEnabled(result.enabled);
        setAvailabilityChecked(true);
      })
      .catch(() => {
        setSaveError("تعذّر التحقق من خدمة الحجز. حدّث الصفحة وجرب تاني.");
      });
  }, []);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [consent, setConsent] = useState(false);
  const [contact, setContact] = useState<"whatsapp" | "phone">("whatsapp");
  const [submitted, setSubmitted] = useState<z.infer<typeof schema> | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current || !availabilityChecked) return;
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
      const first = Object.keys(map)[0];
      if (first) document.getElementById(first)?.focus();
      return;
    }

    setErrors({});
    setSaveError("");
    inFlight.current = true;
    setSubmitting(true);
    try {
      if (savingEnabled) {
        const payload = JSON.stringify(parsed.data);
        if (!submission.current || submission.current.payload !== payload)
          submission.current = { id: crypto.randomUUID(), payload };
        const saved = await saveTrialRequest({
          data: {
            request: parsed.data,
            submission_id: submission.current.id,
            website: String(fd.get("website") ?? ""),
          },
        });
        setRequestId(saved.id);
      }
    } catch {
      setSaveError(
        "مقدرناش نأكد حفظ الطلب. بياناتك لسه موجودة؛ اضغط تاني للمحاولة أو تواصل معانا من زر واتساب.",
      );
      return;
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
    setSubmitted(parsed.data);
    setDone(true);
  }

  if (done && submitted) {
    const whatsappLink = buildWhatsAppLink(submitted);
    return (
      <SiteLayout>
        <div className="container-page flex min-h-[60vh] items-center justify-center py-16">
          <div className="surface-card max-w-lg p-10 text-center">
            <CheckCircle2 className="mx-auto size-12 text-success" />
            <h1 className="mt-4 text-2xl">
              {requestId ? "طلبك اتسجل بنجاح" : "طلبك جاهز للإرسال عبر واتساب"}
            </h1>
            <p className="mt-3 text-sm leading-8 text-muted-foreground">
              {requestId
                ? "فريقنا هيتواصل معاك لتحديد ميعاد التجربة. حفظ الطلب مش تأكيد للميعاد. تقدر كمان تبعتلنا على واتساب من الزر اللي تحت."
                : "اضغط الزر اللي تحت وابعت الرسالة على واتساب عشان الفريق يستلم طلبك ويحدد معاك الميعاد."}
            </p>
            {requestId && (
              <p className="mt-3 break-all text-xs text-muted-foreground">
                رقم الطلب: <span dir="ltr">{requestId}</span>
              </p>
            )}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <a href={whatsappLink} target="_blank" rel="noreferrer">
                  تواصل عبر واتساب
                </a>
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
        eyebrow="تجربة وتحديد مستوى"
        title="أول خطوة… حصة يجربها طفلك"
        description="حصة تجريبية وتحديد مستوى عشان نعرف طفلك ونختار له البداية المناسبة. فريقنا هيوضح لك التفاصيل قبل تأكيد الحجز."
      />
      <div className="container-page grid items-start gap-10 py-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:py-16">
        <form id="booking-form" onSubmit={onSubmit} noValidate className="trial-form space-y-6">
          <div className="border-b border-border pb-5">
            <p className="text-xs font-bold text-primary">طلب الحصة التجريبية</p>
            <h2 className="mt-2 text-2xl">نتعرّف عليك وعلى طفلك</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="parent_name">اسم ولي الأمر *</Label>
              <Input
                id="parent_name"
                name="parent_name"
                autoComplete="name"
                maxLength={100}
                aria-invalid={!!errors["parent_name"]}
                className="mt-2"
              />
              {errors["parent_name"] && (
                <p className="mt-1 text-xs text-destructive">{errors["parent_name"]}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">رقم الهاتف / واتساب *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                dir="ltr"
                maxLength={20}
                aria-invalid={!!errors["phone"]}
                className="mt-2"
              />
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

          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          {saveError && (
            <p role="alert" className="text-sm leading-7 text-destructive">
              {saveError}
            </p>
          )}
          <Button
            type="submit"
            size="lg"
            disabled={submitting || !availabilityChecked}
            className="w-full sm:w-auto"
          >
            {submitting
              ? "بنحفظ طلبك…"
              : !availabilityChecked
                ? "لحظة واحدة…"
                : savingEnabled
                  ? "سجّل طلب التجربة وتحديد المستوى"
                  : "جهّز طلب الحجز على واتساب"}
            <ArrowLeft className="size-4" />
          </Button>
          <p className="text-xs leading-6 text-muted-foreground">
            {savingEnabled
              ? "طلبك بيتحفظ الأول، وبعدها فريقنا بيتواصل معاك لتأكيد الميعاد."
              : "بعد مراجعة بياناتك، اضغط زر واتساب وابعت الرسالة عشان الفريق يستلم طلبك."}
          </p>
        </form>

        <aside className="space-y-6 lg:sticky lg:top-32">
          <div className="border-s-4 border-primary bg-accent p-6">
            <h2 className="text-xl">إيه اللي هيحصل بعد الحجز؟</h2>
            <ol className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
              {[
                { icon: MessageCircleHeart, text: "سنتواصل معك في أقرب وقت ممكن." },
                { icon: ClipboardCheck, text: "تحديد مستوى أونلاين." },
                { icon: MonitorPlay, text: "حصة تجريبية كاملة مع المعلم." },
                { icon: Users, text: "ترشيح المجموعة والمواعيد المناسبة." },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-card text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="border-t border-border pt-6">
            <ShieldCheck className="size-6 text-primary" />
            <h2 className="mt-3 text-lg">خصوصية بيانات طفلك</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              بنجمع الحد الأدنى من البيانات، وبنستخدمها للتواصل بخصوص الحصة. تقدري تراجعي سياسة
              الخصوصية قبل إرسال طلبك.
            </p>
          </div>
          <Button asChild variant="link" className="px-0">
            <Link to="/samples">
              شوف المنهج ومستويات التعلّم <ArrowLeft />
            </Link>
          </Button>
        </aside>
      </div>
    </SiteLayout>
  );
}
