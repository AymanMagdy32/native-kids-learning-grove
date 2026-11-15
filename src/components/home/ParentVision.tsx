import { ArrowLeft, Quote } from "lucide-react";

export function ParentVision() {
  return (
    <section id="parent-vision" className="parent-vision" aria-labelledby="parent-vision-title">
      <div className="container-page">
        <div className="parent-vision-card">
          <div className="parent-vision-copy">
            <p className="parent-vision-eyebrow">
              <span aria-hidden="true" /> حلمك ليه… هو نقطة البداية
            </p>
            <h2 id="parent-vision-title">
              نفسك يتكلّم…
              <br />
              <span>مش يردّد وخلاص؟</span>
            </h2>
            <div className="parent-vision-message">
              <Quote aria-hidden="true" className="parent-vision-quote" />
              <p className="parent-vision-wish">
                نفسي ابني يفهم الإنجليزي ويتكلّم بيه بثقة… يسأل، ويرد، ويحكي عن يومه، مش يحفظ كلمات
                وينساها.
              </p>
              <p className="parent-vision-message-label">
                طموح كل أم لابنها، وهدف بنشتغل عليه خطوة بخطوة.
              </p>
            </div>
            <p className="parent-vision-support">
              عشان كده بنركّز على المشاركة والكلام في الحصة، ومعاكي دليل يساعدك تكمّلي معاه في
              البيت.
            </p>
            <a className="parent-vision-link" href="#parent-guide">
              شوفي إزاي تساعديه في البيت <ArrowLeft className="size-4" aria-hidden="true" />
            </a>
          </div>
          <figure className="parent-vision-portrait">
            <span className="parent-vision-sun" aria-hidden="true" />
            <span className="parent-vision-leaf" aria-hidden="true" />
            <img
              src="/images/native-kid-parent-768.webp"
              srcSet="/images/native-kid-parent-480.webp 480w, /images/native-kid-parent-768.webp 768w"
              sizes="(max-width: 767px) 90vw, 440px"
              width={768}
              height={840}
              loading="lazy"
              decoding="async"
              alt="صورة توضيحية مولّدة بالذكاء الاصطناعي لأم محجبة مبتسمة"
            />
            <figcaption>صورة توضيحية بالذكاء الاصطناعي</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
