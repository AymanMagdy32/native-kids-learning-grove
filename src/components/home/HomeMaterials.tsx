import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { REAL_SAMPLES } from "./sample-data";
import type { MaterialSample } from "./sample-data";

const homeCopy: Record<string, { title: string; english: string; desc: string }> = {
  worksheet: {
    title: "ورقة العمل",
    english: "Worksheet",
    desc: "تدريب بسيط يطبّق بيه طفلك اللي اتعلّمه.",
  },
  flashcards: {
    title: "بطاقات الكلمات",
    english: "Flashcards",
    desc: "صورة وكلمة، عشان يفتكرها ويستخدمها.",
  },
  "lesson-preview": {
    title: "شكل الحصة",
    english: "Interactive lesson",
    desc: "شوفي العرض اللي المعلم بيشرح ويتفاعل بيه.",
  },
  debating: {
    title: "تدريب على التعبير",
    english: "Debating worksheet",
    desc: "نموذج للطالب المستعد يناقش ويعبّر عن رأيه.",
  },
  "home-guide": {
    title: "دليل ولي الأمر",
    english: "Parent Guide",
    desc: "ملخص وممارسة في البيت بالعربي والإنجليزي.",
  },
};
const samples = ["worksheet", "flashcards", "lesson-preview", "debating", "home-guide"]
  .map((id) => REAL_SAMPLES.find((sample) => sample.id === id)!)
  .filter(Boolean);
function thumbnail(sample: MaterialSample) {
  if (sample.previewImage) return sample.previewImage;
  const driveId = sample.href.match(/drive\.google\.com\/file\/d\/([^/]+)/)?.[1];
  return driveId
    ? `https://drive.google.com/thumbnail?id=${encodeURIComponent(driveId)}&sz=w480`
    : null;
}
function MaterialThumbnail({ sample }: { sample: MaterialSample }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const image = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    if (image.current?.complete) {
      if (image.current.naturalWidth > 0) setLoaded(true);
      else setFailed(true);
    }
  }, []);
  const src = thumbnail(sample);
  const Icon = sample.icon;
  return (
    <span className="home-material-thumbnail">
      <span className="home-material-placeholder" aria-hidden="true">
        <Icon />
        <span dir="ltr">{homeCopy[sample.id]?.english}</span>
      </span>
      {src && !failed && (
        <img
          ref={image}
          src={src}
          data-loaded={loaded}
          onLoad={() => setLoaded(true)}
          alt={`معاينة ${homeCopy[sample.id]?.title}`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      )}
      <span className="home-material-preview-badge">
        <Eye className="size-3.5" /> معاينة
      </span>
    </span>
  );
}
export function HomeMaterials() {
  const lastTrigger = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<MaterialSample | null>(null);
  const [loading, setLoading] = useState(false);
  function open(sample: MaterialSample) {
    lastTrigger.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setActive(sample);
    setLoading(true);
  }
  return (
    <section
      id="home-materials"
      className="premium-section home-materials"
      aria-labelledby="home-materials-title"
    >
      <div className="container-page">
        <div className="premium-section-heading">
          <div>
            <p className="premium-eyebrow">شوفي بنفسك قبل ما تختاري</p>
            <h2 id="home-materials-title" className="mt-3">
              ده اللي طفلك هيتعلّم بيه.
            </h2>
          </div>
          <p>
            نماذج حقيقية من المحتوى، من الحصة للتدريب في البيت. افتحي أي كارت وشوفي النموذج هنا.
          </p>
        </div>
        <div className="home-material-grid mt-8">
          {samples.map((sample, index) => {
            const copy = homeCopy[sample.id]!;
            const Icon = sample.icon;
            return (
              <article className="home-material-card" key={sample.id}>
                <div className="home-material-top">
                  <span className="premium-icon">
                    <Icon className="size-5" />
                  </span>
                  <span dir="ltr">0{index + 1}</span>
                </div>
                <h3 className="mt-3">{copy.title}</h3>
                <p className="home-material-english" dir="ltr">
                  {copy.english}
                </p>
                <p className="home-material-description">{copy.desc}</p>
                <button
                  type="button"
                  className="home-material-preview-button"
                  onClick={() => open(sample)}
                  aria-label={`عايني ${copy.title}`}
                >
                  <MaterialThumbnail sample={sample} />
                </button>
                <Button
                  type="button"
                  variant="outline"
                  className="home-material-open"
                  onClick={() => open(sample)}
                >
                  شوفي النموذج <ArrowLeft className="size-4" />
                </Button>
              </article>
            );
          })}
        </div>
      </div>
      <Dialog
        open={!!active}
        onOpenChange={(value) => {
          if (!value) {
            setActive(null);
            setLoading(false);
          }
        }}
      >
        <DialogContent
          dir="rtl"
          className="home-material-dialog"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            lastTrigger.current?.focus();
          }}
        >
          <DialogHeader className="home-material-dialog-heading text-start sm:text-start">
            <DialogTitle>{active ? homeCopy[active.id]?.title : "نموذج من المحتوى"}</DialogTitle>
            <DialogDescription className="leading-7">{active?.desc}</DialogDescription>
          </DialogHeader>
          {active && (
            <>
              <div className="home-material-viewer">
                {loading && (
                  <p role="status" className="home-material-loading">
                    بنحمّل النموذج…
                  </p>
                )}
                <iframe
                  key={active.id}
                  src={active.embed ?? active.href}
                  title={`نموذج ${active.title}`}
                  allow="fullscreen"
                  onLoad={() => setLoading(false)}
                />
              </div>
              <p className="text-xs leading-6 text-muted-foreground">
                لو المعاينة مش ظاهرة، افتحي الملف من الزر اللي تحت.
              </p>
              <Button asChild variant="outline" className="min-h-12 h-auto whitespace-normal">
                <a href={active.href} target="_blank" rel="noopener noreferrer">
                  افتحي النموذج في صفحة جديدة <ExternalLink className="size-4" />
                </a>
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
