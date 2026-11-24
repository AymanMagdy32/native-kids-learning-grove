import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { trackMetaPageView, trackWhatsAppClick } from "@/lib/meta-pixel";

export function MetaPixel() {
  const pathname = useRouterState({ select: state => state.location.pathname });
  const lastPath = useRef<string | null>(null);
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    trackMetaPageView();
  }, [pathname]);
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.type === "auxclick" && event.button !== 1) return;
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      // Analytics must never block the actual WhatsApp navigation.
      try { trackWhatsAppClick(anchor); } catch { /* Tracking is optional. */ }
    }
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);
  return null;
}
