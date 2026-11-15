import { Check } from "lucide-react";

export function ParentGuideMockup() {
  return (
<span className="guide-mini-book" aria-label="نموذج من دليل البيت: التعارف">
              <span className="guide-free-seal">للأهل<strong>مجانًا</strong></span>
              <span className="guide-mini-page">
                <span className="guide-mini-tags"><span dir="ltr">Parent Guide · Unit 1</span><span>٣ دقائق</span></span>
                <span className="guide-mini-title" dir="ltr">Hello! My name is…</span>
                <span className="guide-mini-line"><span>هالّو!</span><b dir="ltr">Hello!</b></span>
                <span className="guide-mini-line"><span>ماي نيم إز ____</span><b dir="ltr">My name is ____.</b></span>
                <span className="guide-mini-progress"><Check className="size-4" /> هل يستطيع طفلك؟ ٢ من ٣</span>
              </span>
            </span>
  );
}
