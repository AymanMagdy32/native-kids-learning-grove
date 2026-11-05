import { whatsappLink } from "@/lib/contact";

export function WhatsAppContact() {
  return (
    <a
      href={whatsappLink("تواصل مع فريق Native Kid")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب على +20 102 298 6424"
      className="fixed right-4 z-40 inline-flex items-center gap-2.5 rounded-full bg-contact px-5 py-3.5 font-bold text-contact-foreground shadow-lg shadow-foreground/15 transition duration-200 hover:bg-contact-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-contact motion-safe:hover:-translate-y-1 sm:right-6"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 shrink-0" aria-hidden="true">
        <path d="M20.52 3.48A11.91 11.91 0 0 0 12.05 0C5.47 0 .12 5.35.12 11.93c0 2.1.55 4.16 1.59 5.97L0 24l6.25-1.64a11.94 11.94 0 0 0 5.8 1.48h.01c6.58 0 11.93-5.35 11.94-11.93a11.86 11.86 0 0 0-3.48-8.43ZM12.06 21.82a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.87 9.87 0 0 1-1.52-5.28c0-5.47 4.45-9.92 9.92-9.92a9.85 9.85 0 0 1 7.01 2.91 9.85 9.85 0 0 1 2.9 7.01c0 5.47-4.45 9.92-9.95 9.89Zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.09 4.49.71.3 1.26.48 1.7.61.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
      <span>تواصل معنا</span>
    </a>
  );
}
