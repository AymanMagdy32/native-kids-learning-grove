import { useState } from "react";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { LEVELS } from "@/components/home/learning-data";
import { Button } from "@/components/ui/button";

export function CurriculumGuide() {
  const [selected, setSelected] = useState(1);
  const level = LEVELS.find((item) => item.n === selected) ?? LEVELS[0];
  if (!level) return null;
  return (
    <section id="curriculum" className="scroll-mt-28 bg-secondary/50 py-12 md:py-16" aria-labelledby="curriculum-title">
      <div className="container-page">
        <p className="nk-eyebrow">المنهج · Our Curriculum</p>
        <h2 id="curriculum-title" className="mt-2 text-2xl md:text-3xl">كل مستوى خطوة جديدة لطفلك</h2>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-muted-foreground">بنستخدم منهج Abridge Academy التفاعلي لتعليم الإنجليزي كأحد مساراتنا الأساسية. المنهج مبني على تدرّج CEFR، والطالب يمشي فيه عبر 6 مستويات من المبتدئ تمامًا حتى التواصل بثقة في مستوى ما قبل المتوسط.</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1" aria-label="مستويات المنهج">
            {LEVELS.map((item) => <Button key={item.n} variant="outline" aria-pressed={selected === item.n} aria-controls="curriculum-detail" onClick={() => setSelected(item.n)} className={`curriculum-choice ${selected === item.n ? "curriculum-choice-active" : ""}`}><span className="curriculum-number">{item.n}</span><span className="text-start"><span className="block text-sm font-bold">{item.titleAr}</span><span className="mt-1 block text-xs opacity-75" dir="ltr">{item.cefr}</span></span></Button>)}
          </div>
          <article id="curriculum-detail" className="curriculum-detail min-w-0" aria-live="polite" aria-atomic="true">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5"><div><p className="text-xs font-bold text-primary">المستوى {level.n} من 6</p><h3 className="mt-2 text-2xl">{level.titleAr}</h3><p className="mt-1 text-sm text-muted-foreground" dir="ltr">{level.titleEn}</p></div><BookOpen className="size-8 text-primary" aria-hidden="true" /></div>
            <p className="mt-5 text-sm leading-8">{level.desc}</p>
            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              <div><h4 className="text-base">موضوعات بنتعلّمها</h4><ul className="mt-3 flex flex-wrap gap-2">{level.topics.map((topic) => <li key={topic} className="rounded-md bg-muted px-3 py-2 text-xs leading-5">{topic}</li>)}</ul></div>
              <div><h4 className="text-base">إيه اللي بنعمله في المستوى؟</h4><ul className="mt-3 space-y-3">{level.skills.map((skill) => <li key={skill} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground"><CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" /><span dir="auto">{skill}</span></li>)}</ul></div>
            </div>
            <div className="mt-6 border-s-4 border-primary bg-accent p-4"><h4 className="text-sm text-primary">في نهاية المستوى</h4><p className="mt-1 text-sm leading-7">{level.outcome}</p></div>
          </article>
        </div>
      </div>
    </section>
  );
}