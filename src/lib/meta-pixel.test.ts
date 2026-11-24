import { afterEach, describe, expect, it, vi } from "vitest";
import { initializeMetaPixel, META_PIXEL_ID, trackMetaPageView, trackWhatsAppClick } from "./meta-pixel";
function productionWindow() { vi.stubGlobal("window", { location: new URL("https://nativekid.org/") }); }
afterEach(() => { document.querySelectorAll("script[data-academy-pixel]").forEach(script => script.remove()); vi.unstubAllGlobals(); });
describe("Meta website pixel", () => {
  it("does not load or report local/preview activity", () => {
    vi.stubGlobal("window", { location: new URL("http://localhost:3000/") });
    expect(initializeMetaPixel()).toBe(false);
    expect(document.querySelector("script[data-academy-pixel]")).toBeNull();
  });
  it("initializes once and queues pageviews while the async script loads", () => {
    productionWindow(); trackMetaPageView(); trackMetaPageView();
    expect(document.querySelectorAll("script[data-academy-pixel]")).toHaveLength(1);
    expect(window.fbq?.queue.filter(args => args[0] === "init")).toEqual([["init", META_PIXEL_ID]]);
    expect(window.fbq?.queue.filter(args => args[2] === "PageView")).toHaveLength(2);
  });
  it("reports the selected program without sending the destination message or phone", () => {
    productionWindow();
    const a = document.createElement("a");
    a.href = "https://api.whatsapp.com/send?phone=201133954793&text=private-message";
    a.dataset["whatsappProgram"] = "private";
    trackWhatsAppClick(a);
    const event = window.fbq?.queue.at(-1);
    expect(event).toEqual(["trackSingleCustom", META_PIXEL_ID, "WhatsAppClick", {contact_method: "whatsapp", program: "private", page_path: "/"}]);
    expect(JSON.stringify(event)).not.toContain("private-message");
    expect(JSON.stringify(event)).not.toContain("201133954793");
    expect(JSON.stringify(window.fbq?.queue)).not.toContain('"Lead"');
  });
  it("ignores unrelated external links", () => {
    productionWindow(); const a = document.createElement("a"); a.href = "https://example.com/";
    trackWhatsAppClick(a);
    expect(document.querySelector("script[data-academy-pixel]")).toBeNull();
  });
});
