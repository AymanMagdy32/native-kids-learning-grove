import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ComponentType, ReactNode } from "react";
const { reset } = vi.hoisted(() => ({ reset: vi.fn() }));
vi.mock("@/lib/requests/functions", () => ({ resetStaffPassword: reset }));
vi.mock("@/components/site/SiteLayout", () => ({
  SiteLayout: ({ children }: { children: ReactNode }) => <>{children}</>,
}));
vi.mock("@tanstack/react-router", async (original) => ({
  ...(await original<typeof import("@tanstack/react-router")>()),
  Link: ({ children, to }: { children: ReactNode; to: string }) => <a href={to}>{children}</a>,
}));
import { Route } from "@/routes/staff-reset-password";
const Page = Route.options.component as ComponentType;
describe("Recovery page", () => {
  beforeEach(() => {
    reset.mockReset();
    window.history.replaceState({}, "", "/staff-reset-password");
  });
  afterEach(cleanup);
  it("rejects expired links without calling the backend", async () => {
    window.history.replaceState(
      {},
      "",
      "/staff-reset-password#error=access_denied&error_code=otp_expired",
    );
    render(<Page />);
    await screen.findByRole("alert");
    expect(reset).not.toHaveBeenCalled();
    expect(window.location.hash).toBe("");
  });
  it("clears fragment credentials and submits only after passwords match", async () => {
    window.history.replaceState(
      {},
      "",
      "/staff-reset-password#access_token=test-recovery-token-long-enough&type=recovery&refresh_token=test-refresh",
    );
    reset.mockResolvedValue({ ok: true });
    render(<Page />);
    await screen.findByLabelText("كلمة السر الجديدة");
    expect(window.location.hash).toBe("");
    fireEvent.change(screen.getByLabelText("كلمة السر الجديدة"), {
      target: { value: "new-password-123" },
    });
    fireEvent.change(screen.getByLabelText("اكتب كلمة السر تاني"), {
      target: { value: "different-password" },
    });
    fireEvent.click(screen.getByRole("button", { name: "حفظ كلمة السر الجديدة" }));
    await screen.findByRole("alert");
    expect(reset).not.toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText("اكتب كلمة السر تاني"), {
      target: { value: "new-password-123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "حفظ كلمة السر الجديدة" }));
    await screen.findByRole("status");
    expect(reset).toHaveBeenCalledWith({
      data: { access_token: "test-recovery-token-long-enough", password: "new-password-123" },
    });
  });
  it("keeps an unsuccessful reset out of the success state", async () => {
    window.history.replaceState(
      {},
      "",
      "/staff-reset-password#access_token=test-recovery-token-long-enough&type=recovery",
    );
    reset.mockRejectedValue(new Error("Expired"));
    render(<Page />);
    await screen.findByLabelText("كلمة السر الجديدة");
    for (const label of ["كلمة السر الجديدة", "اكتب كلمة السر تاني"])
      fireEvent.change(screen.getByLabelText(label), { target: { value: "new-password-123" } });
    fireEvent.click(screen.getByRole("button", { name: "حفظ كلمة السر الجديدة" }));
    await screen.findByRole("alert");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
