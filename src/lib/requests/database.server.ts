import { getCookie, setResponseHeader } from "@tanstack/react-start/server";

export const sessionCookie = "academy_staff_session";
export function databaseConfig() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_ANON_KEY"];
  if (!url || !key) return null;
  const parsed = new URL(url);
  if (parsed.protocol !== "https:") throw new Error("Database must use HTTPS");
  return { url: parsed.origin, key };
}
export async function databaseFetch(path: string, options: RequestInit = {}, token?: string) {
  const config = databaseConfig();
  if (!config) throw new Error("الخدمة مش متوصلة بقاعدة البيانات دلوقتي.");
  const response = await fetch(`${config.url}${path}`, {
    ...options,
    signal: AbortSignal.timeout(15000),
    headers: {
      apikey: config.key,
      ...(token
        ? { Authorization: `Bearer ${token}` }
        : config.key.startsWith("eyJ")
          ? { Authorization: `Bearer ${config.key}` }
          : {}),
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!response.ok) {
    if (response.status === 401 || response.status === 403)
      throw new Error("سجّل الدخول بحساب فريق معتمد.");
    throw new Error("تعذّر إتمام العملية. جرّب تاني، ولو المشكلة مستمرة تواصل مع الفريق.");
  }
  if (response.status === 204) return null;
  return response.json();
}
export async function requireStaff() {
  setResponseHeader("Cache-Control", "no-store");
  const token = getCookie(sessionCookie);
  if (!token) throw new Error("سجّل الدخول بحساب فريق معتمد.");
  const allowed = await databaseFetch(
    "/rest/v1/rpc/academy_is_staff",
    { method: "POST", body: "{}" },
    token,
  );
  if (allowed !== true) throw new Error("الحساب ده مش ضمن فريق الأكاديمية.");
  return token;
}
