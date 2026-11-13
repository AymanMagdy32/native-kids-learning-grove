import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Flag, MoveHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEVELS } from "./learning-data";
import type { Level } from "./learning-data";

const previewLevels = LEVELS.filter((level) => level.n <= 2);
function roadPath(level: Level) {
  const units = level.units ?? [];
  if (!units.length) return "";
  let d = level.n === 1 ? "M 1600 106 L 1520 106" : "M 1600 208 C 1560 208 1560 106 1520 106";
  for (let index = 1; index < units.length; index++) {
    const previous = 1520 - (index - 1) * 160;
    const x = 1520 - index * 160;
    const y = index % 2 === 0 ? 106 : 208;
    const oldY = index % 2 === 0 ? 208 : 106;
    const mid = (previous + x) / 2;
    d += ` C ${mid} ${oldY} ${mid} ${y} ${x} ${y}`;
  }
  return `${d} L 0 208`;
}
export function LearningJourney() {
  const viewport = useRef<HTMLDivElement>(null);
  const [canBack, setCanBack] = useState(false);
  const [canNext, setCanNext] = useState(true);
  function updateScroll() {
    const node = viewport.current;
    if (!node) return;
    const distance = Math.abs(node.scrollLeft);
    setCanBack(distance > 2);
    setCanNext(distance < node.scrollWidth - node.clientWidth - 2);
  }
  useEffect(() => {
    const node = viewport.current;
    if (!node) return;
    node.scrollLeft = 0;
    updateScroll();
    const observer = new ResizeObserver(updateScroll);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  function behavior(): ScrollBehavior {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  }
  function move(direction: number) {
    viewport.current?.scrollBy({
      left: direction * Math.min(viewport.current.clientWidth * 0.8, 640),
      behavior: behavior(),
    });
  }
  function jump(level: number) {
    const element = viewport.current?.querySelector<HTMLElement>(`[data-journey-level="${level}"]`);
    element?.scrollIntoView({ behavior: behavior(), block: "nearest", inline: "start" });
  }
  return (
    <section
      id="teaching"
      className="premium-section learning-journey"
      aria-labelledby="journey-title"
    >
      <div className="container-page">
        <div className="premium-section-heading">
          <div>
            <p className="premium-eyebrow">خطوة صغيرة… تفتح كلام كتير</p>
            <h2 id="journey-title" className="mt-3">
              أول مستويين في رحلته.
            </h2>
          </div>
          <p>
            من التعارف لحد الكلام عن يومه وعالمه. دي وحدات أول مستويين، والبداية دايمًا حسب مستوى
            طفلك.
          </p>
        </div>
        <div className="journey-toolbar">
          <div className="journey-level-shortcuts" aria-label="انتقل لمستوى">
            <button type="button" onClick={() => jump(1)}>
              <bdi dir="ltr">Level 1</bdi>
              <span>١٠ وحدات</span>
            </button>
            <button type="button" onClick={() => jump(2)}>
              <bdi dir="ltr">Level 2</bdi>
              <span>١٠ وحدات</span>
            </button>
          </div>
          <p id="journey-instructions" className="journey-hint">
            <MoveHorizontal aria-hidden="true" className="size-4" /> ابدأ من اليمين، واسحب عشان
            تكمّل
          </p>
        </div>
        <div
          ref={viewport}
          className="journey-viewport"
          dir="rtl"
          tabIndex={0}
          role="region"
          aria-label="مسار وحدات المستوى الأول والثاني"
          aria-describedby="journey-instructions"
          onScroll={updateScroll}
        >
          <div className="journey-track">
            {previewLevels.map((level) => (
              <section
                key={level.n}
                data-journey-level={level.n}
                className="journey-level"
                aria-labelledby={`journey-level-${level.n}`}
              >
                <div className="journey-level-heading">
                  <h3 id={`journey-level-${level.n}`}>
                    <bdi dir="ltr">LEVEL {level.n}</bdi>
                    <span>{level.titleAr}</span>
                  </h3>
                  <span>الوحدة ١ ← الوحدة ١٠</span>
                </div>
                <div className="journey-stage">
                  <svg
                    viewBox="0 0 1600 330"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="journey-road"
                  >
                    <path d={roadPath(level)} />
                  </svg>
                  <ol className="journey-unit-list" aria-label={`وحدات المستوى ${level.n}`}>
                    {level.units?.map((unit, index) => (
                      <li
                        className={`journey-unit journey-color-${index % 4} ${index % 2 === 0 ? "journey-unit-upper" : "journey-unit-lower"}`}
                        key={unit.n}
                        style={{ insetInlineStart: `${5 + index * 160}px` }}
                      >
                        <div className="journey-unit-content">
                          <span className="journey-unit-number" aria-hidden="true">
                            {unit.n}
                          </span>
                          <div className="journey-unit-label">
                            <span className="sr-only">الوحدة {unit.n}: </span>
                            <strong lang="en" dir="ltr">
                              {unit.en}
                            </strong>
                            <span>{unit.ar}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            ))}
            <aside className="journey-next-chapter" aria-label="باقي رحلة التعلّم">
              <div className="journey-blurred-path" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="journey-next-copy">
                <Flag className="size-6" aria-hidden="true" />
                <h3>والرحلة لسه مكملة…</h3>
                <p>اكتشف باقي المستويات خطوة بخطوة خلال الكورس.</p>
                <Button asChild variant="outline">
                  <Link to="/trial">
                    اعرف البداية المناسبة لطفلك <ArrowLeft className="size-4" />
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
        <div className="journey-footer">
          <p>لمحة من المنهج، مش كل الخطة. كل خطوة بتبني على اللي قبلها.</p>
          <div className="journey-scroll-controls">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => move(1)}
              disabled={!canBack}
              aria-label="ارجع لوحدات سابقة"
            >
              <ArrowRight />
            </Button>
            <Button type="button" variant="outline" onClick={() => move(-1)} disabled={!canNext}>
              كمّل الرحلة <ArrowLeft />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
