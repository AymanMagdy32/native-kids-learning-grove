import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  staffSession,
  staffLogin,
  staffLogout,
  listRequests,
  listStaff,
  updateRequest,
  requestHistory,
} from "@/lib/requests/functions";
import { stages, stageLabels } from "@/lib/requests/schema";
import type { Lead, StaffMember } from "@/lib/requests/schema";

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [
      { title: "متابعة طلبات الحجز | Native Kid Academy" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: StaffPage,
});
const dateLabel = (value: string | null) =>
  value
    ? new Intl.DateTimeFormat("ar-EG", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Africa/Cairo",
      }).format(new Date(value))
    : "مش متحدد";
function localInput(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}
const fieldClass =
  "min-h-12 w-full rounded-xl border border-border bg-background px-3 py-2 text-base";
const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "حصلت مشكلة. حاول تاني.";

function StaffPage() {
  const cache = useQueryClient();
  const [session, setSession] = useState<{ configured: boolean; authenticated: boolean } | null>(
    null,
  );
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [draftSearch, setDraftSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    staffSession()
      .then(setSession)
      .catch(() => setError("تعذّر الاتصال. حدّث الصفحة وحاول تاني."));
  }, []);
  const leads = useQuery({
    queryKey: ["staff-requests", status, search, offset],
    queryFn: () =>
      listRequests({
        data: { ...(status ? { status: status as Lead["status"] } : {}), search, offset },
      }),
    enabled: session?.authenticated === true,
    retry: false,
    staleTime: 15000,
  });
  const team = useQuery({
    queryKey: ["staff-team"],
    queryFn: () => listStaff(),
    enabled: session?.authenticated === true,
    retry: false,
  });
  const active = leads.data?.find((lead) => lead.id === selected);
  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      await staffLogin({
        data: { email: String(data.get("email")), password: String(data.get("password")) },
      });
      setSession({ configured: true, authenticated: true });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    setBusy(true);
    try {
      await staffLogout();
    } finally {
      cache.removeQueries({ queryKey: ["staff-requests"] });
      cache.removeQueries({ queryKey: ["staff-team"] });
      cache.removeQueries({ queryKey: ["staff-history"] });
      setSelected(null);
      setSession({ configured: true, authenticated: false });
      setBusy(false);
    }
  }
  return (
    <SiteLayout>
      <div className="container-page py-10 md:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-primary">فريق Native Kid Academy</p>
            <h1 className="mt-2 text-3xl">متابعة طلبات الحجز</h1>
          </div>
          {session?.authenticated && (
            <Button variant="outline" onClick={logout} disabled={busy}>
              تسجيل الخروج
            </Button>
          )}
        </div>
        {error && (
          <p role="alert" className="mt-5 text-destructive">
            {error}
          </p>
        )}
        {!session && !error && (
          <p className="mt-8" role="status">
            بنتحقق من تسجيل الدخول…
          </p>
        )}
        {session && !session.configured && (
          <div className="surface-card mt-8 p-6">
            <h2 className="text-xl">لوحة المتابعة لسه مش مفعّلة</h2>
            <p className="mt-3 leading-8">
              تواصل مع مسؤول الموقع لتوصيل قاعدة البيانات وتفعيل حسابات الفريق.
            </p>
          </div>
        )}
        {session?.configured && !session.authenticated && (
          <form onSubmit={login} className="surface-card mt-8 max-w-md space-y-5 p-6">
            <p className="text-sm leading-7">
              الدخول متاح لحسابات الفريق المعتمدة بس. لو نسيت كلمة السر، تواصل مع مسؤول الأكاديمية.
            </p>
            <div>
              <Label htmlFor="staff-email">الإيميل</Label>
              <Input
                className="mt-2"
                id="staff-email"
                name="email"
                type="email"
                autoComplete="username"
                dir="ltr"
                required
                maxLength={254}
              />
            </div>
            <div>
              <Label htmlFor="staff-password">كلمة السر</Label>
              <Input
                className="mt-2"
                id="staff-password"
                name="password"
                type="password"
                autoComplete="current-password"
                dir="ltr"
                required
                maxLength={200}
              />
            </div>
            <Button type="submit" disabled={busy} className="w-full">
              {busy ? "بنسجّل الدخول…" : "دخول الفريق"}
            </Button>
          </form>
        )}
        {session?.authenticated && (
          <>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              كل طلب بيتحفظ قبل التواصل. حدّث الحالة وحدّد المسؤول وميعاد المتابعة. عرض المواعيد
              بتوقيت القاهرة؛ إدخال المواعيد بتوقيت جهازك.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearch(draftSearch);
                setOffset(0);
                setSelected(null);
              }}
              className="mt-6 grid items-end gap-3 sm:grid-cols-[1fr_1fr_auto_auto]"
            >
              <div>
                <Label htmlFor="lead-search">اسم ولي الأمر أو رقم الهاتف</Label>
                <Input
                  className="mt-2"
                  id="lead-search"
                  value={draftSearch}
                  maxLength={100}
                  onChange={(e) => setDraftSearch(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lead-filter">مرحلة الطلب</Label>
                <select
                  id="lead-filter"
                  className={`${fieldClass} mt-2`}
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setOffset(0);
                    setSelected(null);
                  }}
                >
                  <option value="">كل المراحل</option>
                  {stages.map((stage) => (
                    <option value={stage} key={stage}>
                      {stageLabels[stage]}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit">بحث</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setNotice("");
                  void leads.refetch();
                }}
              >
                تحديث
              </Button>
            </form>
            {notice && (
              <p role="status" className="mt-4 text-primary">
                {notice}
              </p>
            )}
            {leads.isPending && (
              <p className="mt-6" role="status">
                بنحمّل الطلبات…
              </p>
            )}
            {(leads.error || team.error) && (
              <div role="alert" className="mt-6 text-destructive">
                <p>{errorMessage(leads.error || team.error)}</p>
                <p className="mt-2">
                  لو الجلسة انتهت، سجّل الخروج وادخل تاني. مفيش بيانات بتظهر من غير صلاحية الفريق.
                </p>
              </div>
            )}
            {!leads.isPending && !leads.error && leads.data?.length === 0 && (
              <p className="surface-card mt-6 p-6">مفيش طلبات بالاختيارات دي.</p>
            )}
            <div className="mt-6 grid items-start gap-5 lg:grid-cols-2">
              <div className="space-y-3">
                {leads.data?.map((lead) => (
                  <article
                    key={lead.id}
                    className={`surface-card p-5 ${selected === lead.id ? "ring-2 ring-primary" : ""}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2 className="text-lg">{lead.parent_name}</h2>
                      <span className="rounded-full bg-accent px-3 py-1 text-sm font-bold text-primary">
                        {stageLabels[lead.status]}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-7">
                      عمر الطفل: {lead.child_age} سنة · التواصل:{" "}
                      {lead.preferred_contact === "phone" ? "مكالمة" : "واتساب"}
                    </p>
                    <a
                      href={`tel:${lead.phone}`}
                      className="mt-2 inline-block py-2 font-bold text-primary"
                      dir="ltr"
                    >
                      {lead.phone}
                    </a>
                    <p className="text-xs leading-6 text-muted-foreground">
                      وصل: {dateLabel(lead.created_at)}
                    </p>
                    <p className="mt-2 text-sm">
                      المسؤول:{" "}
                      {team.data?.find((member) => member.user_id === lead.assigned_to)
                        ?.display_name ?? "لسه متعيّنش"}
                    </p>
                    {lead.follow_up_at && (
                      <p
                        className={`mt-2 text-sm ${new Date(lead.follow_up_at) < new Date() && !["enrolled", "lost"].includes(lead.status) ? "font-bold text-destructive" : ""}`}
                      >
                        المتابعة: {dateLabel(lead.follow_up_at)}
                      </p>
                    )}
                    <Button
                      className="mt-4 w-full"
                      variant="outline"
                      onClick={() => {
                        setSelected(lead.id);
                        setNotice("");
                      }}
                    >
                      تفاصيل وتحديث الطلب
                    </Button>
                  </article>
                ))}
              </div>
              {active && (
                <LeadEditor
                  key={`${active.id}-${active.revision}`}
                  lead={active}
                  team={team.data ?? []}
                  onSaved={async () => {
                    setNotice("التحديث اتحفظ.");
                    await cache.invalidateQueries({ queryKey: ["staff-requests"] });
                    await cache.invalidateQueries({ queryKey: ["staff-history", active.id] });
                  }}
                />
              )}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                disabled={offset === 0 || leads.isFetching}
                onClick={() => {
                  setOffset((value) => Math.max(0, value - 50));
                  setSelected(null);
                }}
              >
                السابق
              </Button>
              <span className="text-sm">صفحة {offset / 50 + 1}</span>
              <Button
                variant="outline"
                disabled={(leads.data?.length ?? 0) < 50 || leads.isFetching}
                onClick={() => {
                  setOffset((value) => value + 50);
                  setSelected(null);
                }}
              >
                التالي
              </Button>
            </div>
          </>
        )}
      </div>
    </SiteLayout>
  );
}

function LeadEditor({
  lead,
  team,
  onSaved,
}: {
  lead: Lead;
  team: StaffMember[];
  onSaved: () => Promise<void>;
}) {
  useEffect(() => {
    document.getElementById("lead-editor")?.scrollIntoView({ block: "start" });
  }, [lead.id]);
  const [status, setStatus] = useState(lead.status);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const history = useQuery({
    queryKey: ["staff-history", lead.id, lead.revision],
    queryFn: () => requestHistory({ data: { id: lead.id } }),
    retry: false,
  });
  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      await updateRequest({
        data: {
          id: lead.id,
          revision: lead.revision,
          status,
          assigned_to: String(data.get("assigned_to") ?? "") || null,
          follow_up_at: data.get("follow_up_at")
            ? new Date(String(data.get("follow_up_at"))).toISOString()
            : null,
          trial_at: data.get("trial_at")
            ? new Date(String(data.get("trial_at"))).toISOString()
            : null,
          staff_note: String(data.get("staff_note") ?? ""),
        },
      });
      await onSaved();
    } catch (err) {
      setError(`${errorMessage(err)} لو زميل حدّث الطلب، اضغط تحديث قبل المحاولة تاني.`);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section
      id="lead-editor"
      aria-label={`تفاصيل طلب ${lead.parent_name}`}
      className="surface-card order-first min-w-0 scroll-mt-28 p-5 lg:sticky lg:top-28 lg:order-none"
    >
      <h2 className="text-xl">{lead.parent_name}</h2>
      <p className="mt-2 break-all text-xs text-muted-foreground" dir="ltr">
        {lead.id}
      </p>
      <dl className="mt-4 space-y-3 text-sm leading-7">
        <div>
          <dt className="font-bold">المستوى الحالي</dt>
          <dd>{lead.current_level || "مش مذكور"}</dd>
        </div>
        <div>
          <dt className="font-bold">ملاحظة ولي الأمر</dt>
          <dd className="whitespace-pre-wrap break-words">{lead.note || "مفيش ملاحظة"}</dd>
        </div>
      </dl>
      <form onSubmit={save} className="mt-5 space-y-4">
        <div>
          <Label htmlFor="edit-status">المرحلة</Label>
          <select
            id="edit-status"
            name="status"
            className={`${fieldClass} mt-2`}
            value={status}
            onChange={(e) => setStatus(e.target.value as Lead["status"])}
          >
            {stages.map((stage) => (
              <option key={stage} value={stage}>
                {stageLabels[stage]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="assigned-to">المسؤول</Label>
          <select
            id="assigned-to"
            name="assigned_to"
            className={`${fieldClass} mt-2`}
            defaultValue={lead.assigned_to ?? ""}
          >
            <option value="">بدون تعيين</option>
            {team.map((member) => (
              <option key={member.user_id} value={member.user_id}>
                {member.display_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="follow-up">ميعاد المتابعة (بتوقيت جهازك)</Label>
          <Input
            id="follow-up"
            name="follow_up_at"
            type="datetime-local"
            className="mt-2 min-w-0"
            defaultValue={localInput(lead.follow_up_at)}
          />
        </div>
        <div>
          <Label htmlFor="trial-at">ميعاد التجربة (بتوقيت جهازك)</Label>
          <Input
            id="trial-at"
            name="trial_at"
            type="datetime-local"
            className="mt-2 min-w-0"
            defaultValue={localInput(lead.trial_at)}
            required={status === "trial_scheduled"}
          />
        </div>
        <div>
          <Label htmlFor="staff-note">ملاحظات الفريق</Label>
          <Textarea
            id="staff-note"
            name="staff_note"
            className="mt-2"
            rows={4}
            maxLength={2000}
            defaultValue={lead.staff_note}
          />
        </div>
        {error && (
          <p role="alert" className="text-sm leading-7 text-destructive">
            {error}
          </p>
        )}
        <Button type="submit" disabled={busy} className="w-full">
          {busy ? "بنحفظ…" : "حفظ التحديث"}
        </Button>
      </form>
      <h3 className="mt-7 text-lg">سجل المتابعة</h3>
      {history.isPending && (
        <p role="status" className="mt-3 text-sm">
          بنحمّل السجل…
        </p>
      )}
      {history.error && (
        <p role="alert" className="mt-3 text-sm text-destructive">
          تعذّر تحميل السجل.
        </p>
      )}
      <ol className="mt-3 space-y-4">
        {history.data?.map((event) => (
          <li key={event.id} className="border-t border-border pt-3 text-sm leading-7">
            <p className="font-bold">
              {event.actor_id
                ? (team.find((member) => member.user_id === event.actor_id)?.display_name ??
                  "عضو فريق")
                : "طلب جديد"}{" "}
              · {dateLabel(event.created_at)}
            </p>
            {Object.entries(event.changes).map(([field, change]) => (
              <p className="break-words" key={field}>
                {(
                  {
                    status: "المرحلة",
                    assigned_to: "المسؤول",
                    follow_up_at: "المتابعة",
                    trial_at: "التجربة",
                    staff_note: "ملاحظات الفريق",
                  } as Record<string, string>
                )[field] ?? field}
                : {formatChange(field, change.from, team)} ← {formatChange(field, change.to, team)}
              </p>
            ))}
          </li>
        ))}
      </ol>
    </section>
  );
}
function formatChange(field: string, value: unknown, team: StaffMember[]) {
  if (value === null || value === undefined || value === "") return "—";
  if (field === "status") return stageLabels[value as Lead["status"]] ?? String(value);
  if (field === "assigned_to")
    return team.find((member) => member.user_id === value)?.display_name ?? "عضو فريق";
  if (field === "follow_up_at" || field === "trial_at") return dateLabel(String(value));
  return String(value);
}
