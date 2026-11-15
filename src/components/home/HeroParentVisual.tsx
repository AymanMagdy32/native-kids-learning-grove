import { Quote } from "lucide-react";

export function HeroParentVisual() {
  return (
    <div id="parent-vision" className="hero-parent-visual" aria-label="حلمك لطفلك">
      <div className="hero-parent-story">
        <p className="hero-parent-eyebrow">
          حلمك ليه… هو نقطة البداية <Quote aria-hidden="true" className="size-5" />
        </p>
        <p className="hero-parent-wish">
          نفسي ابني يفهم الإنجليزي ويتكلّم بيه بثقة… يسأل، ويرد، ويحكي عن يومه، مش يحفظ كلمات
          وينساها.
        </p>
      </div>
      <figure className="hero-parent-figure">
        <span className="hero-parent-sun" aria-hidden="true" />
        <span className="hero-parent-leaf" aria-hidden="true" />
        <img
          src="/images/native-kid-parent-768.webp"
          srcSet="/images/native-kid-parent-480.webp 480w, /images/native-kid-parent-768.webp 768w"
          sizes="(max-width: 767px) 55vw, 44vw"
          width={768}
          height={840}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          alt="صورة توضيحية لأم محجبة مبتسمة"
        />
        <figcaption>صورة توضيحية</figcaption>
      </figure>
    </div>
  );
}
