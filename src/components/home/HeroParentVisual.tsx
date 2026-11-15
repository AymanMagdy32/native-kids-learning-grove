import { Quote } from "lucide-react";

export function HeroParentVisual() {
  return (
    <div id="parent-vision" className="hero-parent-visual" aria-label="حلمك لطفلك">
      <div className="hero-parent-story">
        <div className="hero-parent-eyebrow" aria-hidden="true">
          <Quote className="size-5" />
        </div>
        <p className="hero-parent-wish">
          نفسي ابني يفهم الإنجليزي ويتكلّم بيه بثقة… يسأل، ويرد، ويحكي عن يومه، مش يحفظ كلمات
          وينساها.
        </p>
      </div>
      <figure className="hero-parent-figure">
        <span className="hero-parent-sun" aria-hidden="true" />
        <span className="hero-parent-leaf" aria-hidden="true" />
        <img
          src="/images/native-kid-thinking-mother-768.webp"
          srcSet="/images/native-kid-thinking-mother-480.webp 480w, /images/native-kid-thinking-mother-768.webp 768w"
          sizes="(max-width: 767px) 55vw, 44vw"
          width={768}
          height={754}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          alt="أم محجبة بتفكّر بابتسامة في تعلّم ابنها"
        />
      </figure>
    </div>
  );
}
