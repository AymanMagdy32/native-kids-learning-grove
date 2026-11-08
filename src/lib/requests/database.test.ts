import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const { cookie } = vi.hoisted(() => ({ cookie: vi.fn() }));
vi.mock("@tanstack/react-start/server", () => ({ getCookie: cookie, setResponseHeader: vi.fn() }));
import { databaseConfig, databaseFetch, requireStaff } from "./database.server";
describe("Database access boundary", () => {
  beforeEach(() => {
    vi.stubEnv("SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("SUPABASE_ANON_KEY", "test-public-key");
    vi.stubEnv("ACADEMY_DATABASE_URL", "");
    vi.stubEnv("ACADEMY_DATABASE_KEY", "");
    cookie.mockReset();
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });
  it("fails closed when no database is configured", () => {
    vi.stubEnv("SUPABASE_URL", "");
    expect(databaseConfig()).toBeNull();
  });
  it("uses the hosting-safe pair ahead of legacy settings", () => {
    vi.stubEnv("ACADEMY_DATABASE_URL", "https://academy.supabase.co");
    vi.stubEnv("ACADEMY_DATABASE_KEY", "sb_publishable_test");
    expect(databaseConfig()).toEqual({
      url: "https://academy.supabase.co",
      key: "sb_publishable_test",
    });
  });
  it("does not mix credentials from different configuration pairs", () => {
    vi.stubEnv("ACADEMY_DATABASE_URL", "https://academy.supabase.co");
    expect(databaseConfig()).toBeNull();
  });
  it("rejects an insecure database destination", () => {
    vi.stubEnv("SUPABASE_URL", "http://example.supabase.co");
    expect(() => databaseConfig()).toThrow();
  });
  it("never queries staff data without a session", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    await expect(requireStaff()).rejects.toThrow("سجّل الدخول");
    expect(fetch).not.toHaveBeenCalled();
  });
  it("checks membership rather than trusting the existence of a cookie", async () => {
    cookie.mockReturnValue("unapproved-token");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("false")));
    await expect(requireStaff()).rejects.toThrow("مش ضمن فريق");
  });
  it("accepts only membership verified by the database", async () => {
    cookie.mockReturnValue("approved-token");
    const fetch = vi.fn().mockResolvedValue(new Response("true"));
    vi.stubGlobal("fetch", fetch);
    await expect(requireStaff()).resolves.toBe("approved-token");
    expect(fetch.mock.calls[0]?.[1].headers.Authorization).toBe("Bearer approved-token");
  });
  it("does not expose database response bodies containing private information", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("PRIVATE DATABASE DETAILS", { status: 500 })),
    );
    await expect(databaseFetch("/rest/v1/rpc/test")).rejects.not.toThrow(
      "PRIVATE DATABASE DETAILS",
    );
  });
});
