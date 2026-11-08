import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ComponentType, ReactNode } from "react";
const mocks = vi.hoisted(() => ({
  session: vi.fn(),
  list: vi.fn(),
  team: vi.fn(),
  history: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  login: vi.fn(),
  logout: vi.fn(),
}));
vi.mock("@/lib/requests/functions", () => ({
  staffSession: mocks.session,
  listRequests: mocks.list,
  listStaff: mocks.team,
  requestHistory: mocks.history,
  updateRequest: mocks.update,
  deleteRequest: mocks.delete,
  staffLogin: mocks.login,
  staffLogout: mocks.logout,
}));
vi.mock("@/components/site/SiteLayout", () => ({
  SiteLayout: ({ children }: { children: ReactNode }) => <>{children}</>,
}));
vi.mock("@tanstack/react-router", async (original) => ({
  ...(await original<typeof import("@tanstack/react-router")>()),
  Link: ({ children, to }: { children: ReactNode; to: string }) => <a href={to}>{children}</a>,
}));
import { Route } from "@/routes/staff";
const Page = Route.options.component as ComponentType;
const lead = {
  id: "11111111-1111-4111-8111-111111111111",
  parent_name: "Test Parent",
  phone: "01012345678",
  child_age: 7,
  current_level: "Beginner",
  preferred_contact: "phone",
  consent: true,
  note: "Parent note",
  status: "new",
  assigned_to: null,
  follow_up_at: null,
  trial_at: null,
  staff_note: "",
  revision: 1,
  created_at: "2026-11-08T10:00:00Z",
  updated_at: "2026-11-08T10:00:00Z",
};
function renderPage() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  render(
    <QueryClientProvider client={client}>
      <Page />
    </QueryClientProvider>,
  );
}
describe("Staff pipeline", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.session.mockResolvedValue({ configured: true, authenticated: true });
    mocks.list.mockResolvedValue([lead]);
    mocks.team.mockResolvedValue([
      { user_id: "22222222-2222-4222-8222-222222222222", display_name: "Staff One" },
    ]);
    mocks.history.mockResolvedValue([]);
    mocks.update.mockResolvedValue({ ...lead, status: "contacted", revision: 2 });
    Element.prototype.scrollIntoView = vi.fn();
  });
  afterEach(cleanup);
  it("does not delete until confirmed, and cancel keeps the request", async () => {
    renderPage();
    fireEvent.click(await screen.findByRole("button", { name: "احذف طلب Test Parent" }));
    await screen.findByRole("alertdialog");
    expect(mocks.delete).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "إلغاء" }));
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    expect(mocks.delete).not.toHaveBeenCalled();
    expect(screen.getByText("Test Parent")).toBeInTheDocument();
  });
  it("deletes the selected request and refreshes the pipeline after confirmation", async () => {
    mocks.delete.mockResolvedValueOnce({ id: lead.id });
    renderPage();
    fireEvent.click(await screen.findByRole("button", { name: "احذف طلب Test Parent" }));
    mocks.list.mockResolvedValue([]);
    fireEvent.click(screen.getByRole("button", { name: "احذف نهائيًا" }));
    await screen.findByText("الطلب اتحذف نهائيًا.");
    expect(mocks.delete).toHaveBeenCalledWith({ data: { id: lead.id, revision: 1 } });
    await screen.findByText("مفيش طلبات بالاختيارات دي.");
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });
  it("keeps the request visible when deletion fails", async () => {
    mocks.delete.mockRejectedValueOnce(new Error("Conflict"));
    renderPage();
    fireEvent.click(await screen.findByRole("button", { name: "احذف طلب Test Parent" }));
    fireEvent.click(screen.getByRole("button", { name: "احذف نهائيًا" }));
    await screen.findByRole("alert");
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.queryByText("الطلب اتحذف نهائيًا.")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "احذف طلب Test Parent", hidden: true }),
    ).toBeInTheDocument();
  });
  it("does not request lead data before staff authentication", async () => {
    mocks.session.mockResolvedValue({ configured: true, authenticated: false });
    renderPage();
    await screen.findByRole("button", { name: "دخول الفريق" });
    expect(mocks.list).not.toHaveBeenCalled();
    expect(mocks.team).not.toHaveBeenCalled();
  });
  it("loads the pipeline and submits a revision-protected update with assignment and notes", async () => {
    renderPage();
    fireEvent.click(await screen.findByRole("button", { name: "تفاصيل وتحديث الطلب" }));
    await screen.findByText("Parent note");
    fireEvent.change(screen.getByLabelText("المرحلة"), { target: { value: "contacted" } });
    fireEvent.change(screen.getByLabelText("المسؤول"), {
      target: { value: "22222222-2222-4222-8222-222222222222" },
    });
    fireEvent.change(screen.getByLabelText("ملاحظات الفريق"), {
      target: { value: "Called parent" },
    });
    fireEvent.click(screen.getByRole("button", { name: "حفظ التحديث" }));
    await waitFor(() =>
      expect(mocks.update).toHaveBeenCalledWith({
        data: expect.objectContaining({
          id: lead.id,
          revision: 1,
          status: "contacted",
          assigned_to: "22222222-2222-4222-8222-222222222222",
          staff_note: "Called parent",
        }),
      }),
    );
    await screen.findByText("التحديث اتحفظ.");
  });
  it("keeps unsaved notes and shows an error when an update fails", async () => {
    mocks.update.mockRejectedValue(new Error("Conflict"));
    renderPage();
    fireEvent.click(await screen.findByRole("button", { name: "تفاصيل وتحديث الطلب" }));
    fireEvent.change(screen.getByLabelText("ملاحظات الفريق"), {
      target: { value: "Keep these notes" },
    });
    fireEvent.click(screen.getByRole("button", { name: "حفظ التحديث" }));
    await screen.findByRole("alert");
    expect(screen.getByLabelText("ملاحظات الفريق")).toHaveValue("Keep these notes");
    expect(screen.queryByText("التحديث اتحفظ.")).not.toBeInTheDocument();
  });
});
