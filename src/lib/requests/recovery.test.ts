import { beforeEach, describe, expect, it, vi } from "vitest";
const { fetch } = vi.hoisted(() => ({ fetch: vi.fn() }));
vi.mock("./database.server", () => ({ databaseFetch: fetch }));
import { completeRecovery } from "./recovery.server";
describe("Staff password recovery authorization", () => {
  beforeEach(() => fetch.mockReset());
  it("cannot change a password for an unapproved account", async () => {
    fetch.mockResolvedValueOnce(false);
    await expect(completeRecovery("test-token", "new-password-123")).rejects.toThrow("مش ضمن فريق");
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it("cannot change a password with an expired token", async () => {
    fetch.mockRejectedValueOnce(new Error("Expired"));
    await expect(completeRecovery("expired-token", "new-password-123")).rejects.toThrow();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it("checks membership before updating and then revokes the recovery session", async () => {
    fetch.mockResolvedValueOnce(true).mockResolvedValueOnce({}).mockResolvedValueOnce(null);
    await expect(completeRecovery("valid-token", "new-password-123")).resolves.toEqual({
      ok: true,
    });
    expect(fetch.mock.calls.map((call) => call[0])).toEqual([
      "/rest/v1/rpc/academy_is_staff",
      "/auth/v1/user",
      "/auth/v1/logout?scope=local",
    ]);
    expect(fetch.mock.calls[1]?.[1]).toEqual({
      method: "PUT",
      body: JSON.stringify({ password: "new-password-123" }),
    });
  });
  it("does not claim the password failed if only logout fails", async () => {
    fetch
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce({})
      .mockRejectedValueOnce(new Error("Logout unavailable"));
    await expect(completeRecovery("valid-token", "new-password-123")).resolves.toEqual({
      ok: true,
    });
  });
});
