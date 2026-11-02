import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppContact } from "./WhatsAppContact";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="woodland-site flex min-h-screen flex-col">
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
    <section className="hero-gradient border-b border-border/60">
      <div className="container-page py-14 md:py-20">
        {eyebrow && (
          <span className="inline-flex rounded-full bg-background/70 px-3 py-1 text-xs font-bold text-primary">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-3xl text-3xl leading-tight text-foreground md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
