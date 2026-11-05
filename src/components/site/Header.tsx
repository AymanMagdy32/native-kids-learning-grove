import { useState } from "react";
import type React from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", hash: "courses", label: "المستويات" },
  { to: "/", hash: "about", label: "عن الأكاديمية" },
  { to: "/samples", hash: "", label: "شوف نماذج من المحتوى" },
  { to: "/faq", hash: "", label: "أسئلة الأهالي" },
  { to: "/", hash: "contact", label: "تواصل معنا" },
] as const;

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8.5h2.85l.43-3.32H13.5V8.06c0-.96.27-1.62 1.64-1.62h1.75V3.48a23 23 0 0 0-2.55-.13c-2.52 0-4.25 1.54-4.25 4.37v2.46H7.24v3.32h2.85V22h3.41Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.35" cy="6.65" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIAL_LINKS: { href: string; label: string; icon: () => React.ReactElement }[] = [];

function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`} aria-label="حسابات الأكاديمية">
      {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="inline-flex size-9 items-center justify-center rounded-xl text-primary transition-colors hover:bg-accent hover:text-primary"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="التنقل الرئيسي">
          {NAV.map((item) => (
            <Link
              key={`${item.to}#${item.hash}`}
              to={item.to}
              hash={item.hash}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <SocialLinks className="border-e border-border pe-2" />
          <Button asChild variant="sunshine">
            <Link to="/trial">احجز تجربة مجانية</Link>
          </Button>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-xl border border-brown text-primary lg:hidden"
          aria-expanded={open}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="قائمة الجوال">
            {NAV.map((item) => (
              <Link
                key={`${item.to}#${item.hash}`}
                to={item.to}
                hash={item.hash}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-accent hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <SocialLinks className="my-2 justify-center" />
            <div className="mt-2 flex flex-col gap-2">
              <Button asChild variant="sunshine" size="lg" onClick={() => setOpen(false)}>
                <Link to="/trial">احجز تجربة مجانية</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
