export const META_PIXEL_ID = "1424431013210808";
const productionHosts = new Set(["nativekid.org", "www.nativekid.org", "native-kids-learning-grove.vercel.app"]);
type PixelFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push?: PixelFunction;
  loaded: boolean;
  version: string;
};
declare global {
  interface Window { fbq?: PixelFunction; _fbq?: PixelFunction; }
}
export function initializeMetaPixel() {
  if (typeof window === "undefined" || !productionHosts.has(window.location.hostname)) return false;
  if (document.querySelector("script[data-academy-pixel]")) return true;
  if (!window.fbq) {
    const fbq: PixelFunction = Object.assign((...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    }, { queue: [] as unknown[][], loaded: true, version: "2.0" });
    fbq.push = fbq;
    window.fbq = fbq;
    window._fbq ??= fbq;
  }
  window.fbq("init", META_PIXEL_ID);
  // This site has no customer form; do not enable automatic event scraping.
  window.fbq("set", "autoConfig", false, META_PIXEL_ID);
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  script.dataset["academyPixel"] = META_PIXEL_ID;
  document.head.appendChild(script);
  return true;
}
export function trackMetaPageView() {
  if (initializeMetaPixel()) window.fbq?.("trackSingle", META_PIXEL_ID, "PageView");
}
export function trackWhatsAppClick(anchor: HTMLAnchorElement) {
  const destination = new URL(anchor.href, window.location.href);
  if (destination.protocol !== "https:" || !["api.whatsapp.com", "wa.me", "web.whatsapp.com"].includes(destination.hostname)) return;
  if (!initializeMetaPixel()) return;
  const program = anchor.dataset["whatsappProgram"];
  window.fbq?.("trackSingleCustom", META_PIXEL_ID, "WhatsAppClick", {
    contact_method: "whatsapp",
    program: program === "group" || program === "private" ? program : "general",
    page_path: window.location.pathname,
  });
}
