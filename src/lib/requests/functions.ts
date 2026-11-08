import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requestSchema, stages } from "./schema";
import type { Lead, LeadEvent, StaffMember } from "./schema";

export const bookingAvailability = createServerFn({ method: "GET" }).handler(async () => {
  const { databaseConfig } = await import("./database.server");
  return { enabled: !!databaseConfig() };
});
export const saveTrialRequest = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      request: requestSchema,
      submission_id: z.string().uuid(),
      website: z.string().max(200).default(""),
    }),
  )
  .handler(async ({ data }) => {
    if (data.website) throw new Error("تعذّر حفظ الطلب.");
    const { databaseFetch } = await import("./database.server");
    const id = await databaseFetch("/rest/v1/rpc/academy_submit_request", {
      method: "POST",
      body: JSON.stringify({ p_id: data.submission_id, p_request: data.request }),
    });
    if (id !== data.submission_id) throw new Error("تعذّر تأكيد حفظ الطلب.");
    return { id: String(id) };
  });
export const staffLogin = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({ email: z.string().email().max(254), password: z.string().min(1).max(200) }),
  )
  .handler(async ({ data }) => {
    const { databaseFetch, sessionCookie } = await import("./database.server");
    const { setCookie } = await import("@tanstack/react-start/server");
    const session = await databaseFetch("/auth/v1/token?grant_type=password", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const allowed = await databaseFetch(
      "/rest/v1/rpc/academy_is_staff",
      { method: "POST", body: "{}" },
      session.access_token,
    );
    if (allowed !== true) throw new Error("الحساب ده مش ضمن فريق الأكاديمية.");
    setCookie(sessionCookie, session.access_token, {
      httpOnly: true,
      secure: process.env["NODE_ENV"] === "production",
      sameSite: "strict",
      path: "/",
      maxAge: Math.min(session.expires_in, 3600),
    });
    return { ok: true };
  });
export const staffLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { deleteCookie, getCookie } = await import("@tanstack/react-start/server");
  const { databaseFetch, sessionCookie } = await import("./database.server");
  const token = getCookie(sessionCookie);
  deleteCookie(sessionCookie, { path: "/" });
  if (token) {
    try {
      await databaseFetch("/auth/v1/logout", { method: "POST" }, token);
    } catch {
      /* Cookie is already removed. */
    }
  }
  return { ok: true };
});
export const staffSession = createServerFn({ method: "GET" }).handler(async () => {
  const { databaseConfig, requireStaff } = await import("./database.server");
  if (!databaseConfig()) return { configured: false, authenticated: false };
  try {
    await requireStaff();
    return { configured: true, authenticated: true };
  } catch {
    return { configured: true, authenticated: false };
  }
});
export const listRequests = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      status: z.enum(stages).optional(),
      search: z.string().max(100).default(""),
      offset: z.number().int().min(0).default(0),
    }),
  )
  .handler(async ({ data }) => {
    const { requireStaff, databaseFetch } = await import("./database.server");
    const token = await requireStaff();
    const query = new URLSearchParams({
      select: "*",
      order: "created_at.desc,id.desc",
      limit: "50",
      offset: String(data.offset),
    });
    if (data.status) query.set("status", `eq.${data.status}`);
    const search = data.search.replace(/[^\p{L}\p{N} +]/gu, "").trim();
    if (search) query.set("or", `(parent_name.ilike.*${search}*,phone.ilike.*${search}*)`);
    return (await databaseFetch(`/rest/v1/academy_requests?${query}`, {}, token)) as Lead[];
  });
export const listStaff = createServerFn({ method: "GET" }).handler(async () => {
  const { requireStaff, databaseFetch } = await import("./database.server");
  return (await databaseFetch(
    "/rest/v1/academy_staff?select=user_id,display_name&order=display_name",
    {},
    await requireStaff(),
  )) as StaffMember[];
});
export const requestHistory = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { requireStaff, databaseFetch } = await import("./database.server");
    return (await databaseFetch(
      `/rest/v1/academy_request_events?request_id=eq.${data.id}&select=*&order=created_at.desc&limit=50`,
      {},
      await requireStaff(),
    )) as LeadEvent[];
  });
export const updateRequest = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string().uuid(),
      revision: z.number().int().min(1),
      status: z.enum(stages),
      assigned_to: z.string().uuid().nullable(),
      follow_up_at: z.string().datetime().nullable(),
      trial_at: z.string().datetime().nullable(),
      staff_note: z.string().trim().max(2000),
    }),
  )
  .handler(async ({ data }) => {
    if (data.status === "trial_scheduled" && !data.trial_at)
      throw new Error("حدّد ميعاد التجربة الأول.");
    const { requireStaff, databaseFetch } = await import("./database.server");
    return (await databaseFetch(
      "/rest/v1/rpc/academy_update_request",
      {
        method: "POST",
        body: JSON.stringify({
          p_id: data.id,
          p_revision: data.revision,
          p_changes: {
            status: data.status,
            assigned_to: data.assigned_to,
            follow_up_at: data.follow_up_at,
            trial_at: data.trial_at,
            staff_note: data.staff_note,
          },
        }),
      },
      await requireStaff(),
    )) as Lead;
  });
