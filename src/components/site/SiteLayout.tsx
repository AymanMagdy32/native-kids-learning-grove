import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppContact } from "./WhatsAppContact";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="academy-site flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppContact />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="academy-page-heading">
      <div className="container-page py-10 md:py-14">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary">الرئيسية <ArrowLeft className="size-3" /> Native Kid Academy</Link>
        {eyebrow && (
          <span className="block text-xs font-bold text-primary">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 max-w-3xl text-3xl leading-tight text-foreground md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-8 text-muted-foreground md:text-base">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
