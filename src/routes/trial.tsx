import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, ArrowLeft, Check } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { bookingWhatsAppLink } from "@/lib/contact";

export const Route = createFileRoute("/trial")({
  head: () => ({ meta: [{ title: "تواصل معانا واحجز لطفلك | Native Kid Academy" }, { name: "description", content: "تواصل مع فريق Native Kid Academy على واتساب لمعرفة المواعيد واختيار الجروب أو البرايفت المناسب لطفلك." }] }),
  component: ContactPage,
});
function ContactPage() {
  return <SiteLayout>
    <PageHero eyebrow="نبدأ بكلام بسيط" title="خلّينا نختار البداية المناسبة لطفلك" description="التواصل والحجز مع فريقنا على واتساب مباشرة. اسألنا عن المستوى، المواعيد، والجروب أو البرايفت المناسب لطفلك." />
    <div className="container-page py-12">
      <section className="surface-card mx-auto max-w-2xl p-6 sm:p-10" aria-labelledby="contact-team-title">
        <MessageCircle className="size-12 text-primary" aria-hidden="true" />
        <h2 id="contact-team-title" className="mt-5 text-2xl">كلّمنا… ونرتّبها سوا</h2>
        <ul className="my-6 space-y-4 text-sm leading-7">{["احكيلنا سن طفلك وخبرته مع الإنجليزي.", "نساعدك تختار الجروب أو البرايفت حسب احتياجه.", "نعرفك التفاصيل والمواعيد ونرتّب معاك الخطوة الجاية."].map(text => <li key={text} className="flex gap-3"><Check className="mt-1 size-5 shrink-0 text-primary" /><span>{text}</span></li>)}</ul>
        <Button asChild size="lg" variant="sunshine" className="h-auto min-h-12 w-full whitespace-normal"><a href={bookingWhatsAppLink()} target="_blank" rel="noopener noreferrer">تواصل معانا على واتساب <MessageCircle className="size-5" /></a></Button>
        <Button asChild variant="link" className="mt-4"><Link to="/samples">شوف نماذج المحتوى <ArrowLeft className="size-4" /></Link></Button>
      </section>
    </div>
  </SiteLayout>;
}
