import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { HomeMaterials } from "./HomeMaterials";
import { REAL_SAMPLES } from "./sample-data";
afterEach(cleanup);
describe("Homepage material previews", () => {
  it("shows all five real materials including Parent Guide without loading embedded viewers initially", () => {
    const { container } = render(<HomeMaterials />);
    expect(container.querySelectorAll(".home-material-card")).toHaveLength(5);
    expect(screen.getByRole("heading", { name: "دليل ولي الأمر" })).toBeInTheDocument();
    expect(container.querySelector("iframe")).toBeNull();
  });
  it("opens the chosen real sample in the page and keeps a safe external fallback", async () => {
    const { container } = render(<HomeMaterials />);
    const trigger = screen.getByRole("button", { name: "عايني ورقة العمل" });
    trigger.focus();
    fireEvent.click(trigger);
    const dialog = await screen.findByRole("dialog");
    expect(dialog.querySelector("iframe")?.getAttribute("src")).toBe(
      REAL_SAMPLES.find((s) => s.id === "worksheet")?.embed,
    );
    const external = screen.getByRole("link", { name: "افتحي النموذج في صفحة جديدة" });
    expect(external).toHaveAttribute("target", "_blank");
    expect(external).toHaveAttribute("rel", "noopener noreferrer");
    fireEvent.click(screen.getByRole("button", { name: "إغلاق" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(container.querySelector("iframe")).toBeNull();
    await waitFor(() => expect(trigger).toHaveFocus());
  });
  it("replaces an unavailable thumbnail with its category fallback", () => {
    render(<HomeMaterials />);
    const img = screen.getByRole("img", { name: "معاينة ورقة العمل" });
    fireEvent.error(img);
    expect(screen.queryByRole("img", { name: "معاينة ورقة العمل" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "عايني ورقة العمل" })).toBeInTheDocument();
  });
});
