import { databaseFetch } from "./database.server";

export async function completeRecovery(accessToken: string, password: string) {
  const allowed = await databaseFetch(
    "/rest/v1/rpc/academy_is_staff",
    { method: "POST", body: "{}" },
    accessToken,
  );
  if (allowed !== true) throw new Error("الحساب ده مش ضمن فريق الأكاديمية.");
  await databaseFetch(
    "/auth/v1/user",
    { method: "PUT", body: JSON.stringify({ password }) },
    accessToken,
  );
  // Recovery never creates a staff cookie. Sign in with the new password afterward.
  try {
    await databaseFetch("/auth/v1/logout?scope=local", { method: "POST" }, accessToken);
  } catch {
    /* Password was saved; a logout failure must not imply otherwise. */
  }
  return { ok: true };
}
