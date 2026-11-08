import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetStaffPassword } from "@/lib/requests/functions";

export const Route = createFileRoute("/staff-reset-password")({
  head: () => ({
    meta: [
      { title: "تعيين كلمة سر الفريق | Native Kid Academy" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "referrer", content: "no-referrer" },
    ],
  }),
  component: RecoveryPage,
});
function RecoveryPage() {
  const token = useRef("");
  const initialized = useRef(false);
  const [state, setState] = useState<"loading" | "invalid" | "ready" | "done">("loading");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const params = new URLSearchParams(window.location.hash.slice(1));
    const access = params.get("access_token");
    // Remove fragment credentials before rendering the form. Keep tokens in memory only.
    window.history.replaceState(window.history.state, "", window.location.pathname);
    if (params.has("error") || !access || params.get("type") !== "recovery") {
      setState("invalid");
      return;
    }
    token.current = access;
    setState("ready");
  }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError("");
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") ?? "");
    if (password.length < 12 || password.length > 128) {
      setError("كلمة السر لازم تكون من ١٢ لـ١٢٨ حرف.");
      return;
    }
    if (password !== data.get("confirm_password")) {
      setError("كلمتا السر مش متطابقتين.");
      return;
    }
    setBusy(true);
    try {
      await resetStaffPassword({ data: { access_token: token.current, password } });
      token.current = "";
      setState("done");
    } catch {
      setError(
        "مقدرناش نغيّر كلمة السر. الرابط ممكن يكون انتهى أو الحساب مش معتمد. اطلب رابط استعادة جديد من مسؤول الأكاديمية، ولو المشكلة مستمرة راجع سجل Auth في Supabase.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <SiteLayout>
      <div className="container-page py-12">
        <section className="surface-card mx-auto max-w-lg space-y-5 p-6 sm:p-8">
          <p className="text-sm font-bold text-primary">فريق Native Kid Academy</p>
          <h1 className="text-2xl">تعيين كلمة سر جديدة</h1>
          {state === "loading" && <p role="status">بنجهّز صفحة الاستعادة…</p>}
          {state === "invalid" && (
            <>
              <p role="alert" className="text-sm leading-8">
                رابط الاستعادة مش موجود، أو غير صالح، أو انتهت صلاحيته. اطلب من مسؤول الأكاديمية
                رابط جديد، وافتح أحدث رسالة بس.
              </p>
              <p className="text-sm leading-8">
                للمسؤول: عنوان الرجوع في Supabase لازم يكون رابط الموقع متبوع بـ{" "}
                <span dir="ltr">/staff-reset-password</span>.
              </p>
            </>
          )}
          {state === "ready" && (
            <form onSubmit={submit} className="space-y-5">
              <p className="text-sm leading-8">
                اختار كلمة سر جديدة لنفس حساب الفريق. استخدم ١٢ حرف على الأقل، ومتشاركهاش مع حد.
              </p>
              <div>
                <Label htmlFor="new-password">كلمة السر الجديدة</Label>
                <Input
                  id="new-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  dir="ltr"
                  minLength={12}
                  maxLength={128}
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="confirm-password">اكتب كلمة السر تاني</Label>
                <Input
                  id="confirm-password"
                  name="confirm_password"
                  type="password"
                  autoComplete="new-password"
                  dir="ltr"
                  minLength={12}
                  maxLength={128}
                  required
                  className="mt-2"
                />
              </div>
              {error && (
                <p role="alert" className="text-sm leading-8 text-destructive">
                  {error}
                </p>
              )}
              <Button type="submit" disabled={busy} className="min-h-12 w-full">
                {busy ? "بنحفظ كلمة السر…" : "حفظ كلمة السر الجديدة"}
              </Button>
            </form>
          )}
          {state === "done" && (
            <p role="status" className="text-sm leading-8 text-primary">
              كلمة السر اتغيّرت بنجاح. سجّل الدخول بالإيميل وكلمة السر الجديدة.
            </p>
          )}
          <Button asChild variant="outline" className="min-h-12 w-full">
            <Link to="/staff">الرجوع لدخول الفريق</Link>
          </Button>
        </section>
      </div>
    </SiteLayout>
  );
}
