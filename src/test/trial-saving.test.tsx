import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ComponentType, ReactNode } from "react";
const mocks = vi.hoisted(() => ({ availability: vi.fn(), save: vi.fn() }));
vi.mock("@/lib/requests/functions", () => ({
  bookingAvailability: mocks.availability,
  saveTrialRequest: mocks.save,
}));
vi.mock("@/components/site/SiteLayout", () => ({
  SiteLayout: ({ children }: { children: ReactNode }) => <>{children}</>,
  PageHero: () => null,
}));
vi.mock("@tanstack/react-router", async (original) => ({
  ...(await original<typeof import("@tanstack/react-router")>()),
  Link: ({ children, to, ...rest }: { children: ReactNode; to: string }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));
import { Route } from "@/routes/trial";
const Page = Route.options.component as ComponentType;
async function fillForm() {
  await screen.findByRole("button", { name: "سجّل طلب التجربة وتحديد المستوى" });
  fireEvent.change(screen.getByLabelText("اسم ولي الأمر *"), { target: { value: "Test Parent" } });
  fireEvent.change(screen.getByLabelText("رقم الهاتف / واتساب *"), {
    target: { value: "01012345678" },
  });
  fireEvent.change(screen.getByLabelText("عمر الطفل *"), { target: { value: "7" } });
  fireEvent.click(screen.getByRole("checkbox"));
}
describe("Saving trial requests before WhatsApp", () => {
  beforeEach(() => {
    mocks.availability.mockResolvedValue({ enabled: true });
    mocks.save.mockReset();
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
    vi.stubGlobal("crypto", { randomUUID: () => "11111111-1111-4111-8111-111111111111" });
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });
  it("preserves a failed request and retries with the same ID", async () => {
    mocks.save
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce({ id: "11111111-1111-4111-8111-111111111111" });
    render(<Page />);
    await fillForm();
    fireEvent.click(screen.getByRole("button", { name: "سجّل طلب التجربة وتحديد المستوى" }));
    await screen.findByRole("alert");
    expect(screen.queryByText("طلبك اتسجل بنجاح")).not.toBeInTheDocument();
    expect(screen.getByLabelText("اسم ولي الأمر *")).toHaveValue("Test Parent");
    fireEvent.click(screen.getByRole("button", { name: "سجّل طلب التجربة وتحديد المستوى" }));
    await screen.findByText("طلبك اتسجل بنجاح");
    expect(mocks.save).toHaveBeenCalledTimes(2);
    expect(mocks.save.mock.calls[0]?.[0].data.submission_id).toBe(
      mocks.save.mock.calls[1]?.[0].data.submission_id,
    );
  });
  it("does not confirm success before the save finishes or submit twice", async () => {
    let resolve!: (value: { id: string }) => void;
    mocks.save.mockImplementation(
      () =>
        new Promise((r) => {
          resolve = r;
        }),
    );
    render(<Page />);
    await fillForm();
    const button = screen.getByRole("button", { name: "سجّل طلب التجربة وتحديد المستوى" });
    const form = button.closest("form")!;
    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(mocks.save).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("طلبك اتسجل بنجاح")).not.toBeInTheDocument();
    resolve({ id: "11111111-1111-4111-8111-111111111111" });
    await screen.findByText("طلبك اتسجل بنجاح");
  });
  it("does not claim saving when the database is unconfigured", async () => {
    mocks.availability.mockResolvedValue({ enabled: false });
    render(<Page />);
    await screen.findByRole("button", { name: "جهّز طلب الحجز على واتساب" });
    fireEvent.change(screen.getByLabelText("اسم ولي الأمر *"), {
      target: { value: "Test Parent" },
    });
    fireEvent.change(screen.getByLabelText("رقم الهاتف / واتساب *"), {
      target: { value: "01012345678" },
    });
    fireEvent.change(screen.getByLabelText("عمر الطفل *"), { target: { value: "7" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "جهّز طلب الحجز على واتساب" }));
    await screen.findByText("طلبك جاهز للإرسال عبر واتساب");
    expect(mocks.save).not.toHaveBeenCalled();
    expect(screen.queryByText("طلبك اتسجل بنجاح")).not.toBeInTheDocument();
  });
});
