import { ShieldCheck, FileCheck2 } from "lucide-react";

export function PolicyContent({ sections, kind }: {
  sections: { t: string; b: string }[];
  kind: "privacy" | "terms";
}) {
  const Icon = kind === "privacy" ? ShieldCheck : FileCheck2;
  return (
    <div className="container-page grid gap-10 py-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:py-16">
      <aside className="lg:sticky lg:top-32 lg:h-fit">
        <span className="academy-benefit-icon academy-icon-teal"><Icon className="size-6" /></span>
        <h2 className="mt-4 text-lg">{kind === "privacy" ? "خصوصية أسرتك تهمنا" : "اتفاق واضح من البداية"}</h2>
        <nav aria-label="أقسام الصفحة" className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:gap-0">
          {sections.map((s, i) => <a key={s.t} href={`#policy-${i}`} className="border-b border-border py-3 text-sm text-muted-foreground transition-colors hover:text-primary">{s.t}</a>)}
        </nav>
      </aside>
      <div className="min-w-0">
        {sections.map((s, i) => (
          <section id={`policy-${i}`} key={s.t} className="scroll-mt-32 border-b border-border py-6 first:pt-0 last:border-0">
            <div className="flex items-baseline gap-4"><span className="text-sm font-bold text-primary" aria-hidden="true">0{i + 1}</span><h2 className="text-xl">{s.t}</h2></div>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-muted-foreground md:text-base">{s.b}</p>
          </section>
        ))}
      </div>
    </div>
  );
}