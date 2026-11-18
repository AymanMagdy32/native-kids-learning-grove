import { ArrowLeft, BookOpen, Check, UserRound, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PROGRAMS = [
  {
    id: "group", title: "جروب", english: "Group", price: "١٢٠٠", before: "١٥٠٠", saving: "٣٠٠", icon: Users,
    tagline: "صحاب يتعلّموا ويشاركوا سوا",
    description: "مساحة لطفلك يتكلّم، يسمع غيره، ويستخدم الإنجليزي في تفاعل حقيقي.",
    benefits: ["جروب صغير لحد ٦ أطفال", "البداية حسب مستوى طفلك", "قصص وألعاب وأنشطة فيها مشاركة", "متابعة تقدّم طفلك مع ولي الأمر"],
    cta: "اختار الجروب لطفلك",
  },
  {
    id: "private", title: "برايفت", english: "Private", price: "٢٠٠٠", before: "٢٥٠٠", saving: "٥٠٠", icon: UserRound,
    tagline: "اهتمام فردي… على قد احتياجه",
    description: "طفلك والمعلم، مع مساحة أكبر للأسئلة والممارسة والتركيز على اللي محتاج يطوّره.",
    benefits: ["حصة فردية: طفل واحد مع المعلم", "التعلّم حسب مستوى طفلك واحتياجاته", "وتيرة تناسب استيعابه وتقدّمه", "متابعة تقدّم طفلك مع ولي الأمر"],
    cta: "اختار البرايفت لطفلك",
  },
] as const;

export function ProgramOptions() {
  return <section id="programs" className="premium-section program-options" aria-labelledby="programs-title">
    <div className="container-page">
      <div className="program-heading"><p className="premium-eyebrow">اختار شكل التعلّم المناسب لطفلك</p><h2 id="programs-title" className="mt-3">جروب يشارك فيه،<br />أو برايفت يركّز عليه.</h2><p className="mt-4 text-sm leading-8 text-muted-foreground">نفس الهدف: طفلك يفهم ويتكلّم بثقة. اختار البداية، وإحنا نساعدك تحدّد الأنسب لمستواه.</p></div>
      <div className="program-grid">
        {PROGRAMS.map(({ id, title, english, price, before, saving, icon: Icon, tagline, description, benefits, cta }) => <article key={id} className={`program-card program-${id}`} aria-labelledby={`program-${id}-title`}>
          <div className="program-card-top"><span className="program-icon"><Icon aria-hidden="true" /></span><span className="program-saving">وفّر {saving} جنيه</span></div>
          <div className="mt-5 flex items-center gap-3"><h3 id={`program-${id}-title`}>{title}</h3><span className="program-english" lang="en" dir="ltr">{english}</span></div>
          <p className="program-tagline">{tagline}</p><p className="mt-2 text-sm leading-7 text-muted-foreground">{description}</p>
          <div className="program-price"><span className="sr-only">السعر الحالي</span><strong>{price}</strong><span>جنيه</span><span className="program-before">بدل <del>{before}</del></span></div>
          <ul className="program-features">{benefits.map(text => <li key={text}><Check className="size-4" aria-hidden="true" /><span>{text}</span></li>)}</ul>
          <p className="program-guide"><BookOpen className="size-5" aria-hidden="true" /> ومعاه دليل البيت مجانًا بالعربي والإنجليزي</p>
          <Button asChild size="lg" variant={id === "group" ? "sunshine" : "default"} className="program-cta"><a href={`/trial?program=${id}#booking-form`}>{cta}<ArrowLeft className="size-4" /></a></Button>
        </article>)}
      </div>
      <p className="program-help">محتار بين الاتنين؟ سجّل طلبك وفريقنا يساعدك تختار حسب مستوى طفلك.</p>
    </div>
  </section>;
}
