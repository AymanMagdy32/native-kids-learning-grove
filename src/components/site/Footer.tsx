import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 text-brand-dark-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div className="md:col-span-2">
          <Logo variant="light" />
          <p className="mt-4 max-w-sm text-sm leading-7 text-brand-dark-foreground/75">
            أكاديمية إنجليزي أونلاين للأطفال والمراهقين من 4 إلى 15 سنة. تعلم تفاعلي، متابعة واضحة
            لولي الأمر، وبيئة تعليمية آمنة.
          </p>
        </div>

        <nav aria-label="روابط الموقع">
          <h2 className="text-sm font-bold text-brand-dark-foreground">الموقع</h2>
          <ul className="mt-4 space-y-2 text-sm text-brand-dark-foreground/75">
            <li>
              <Link to="/samples" className="hover:text-brand-dark-foreground">
                نماذج التعليم
              </Link>
            </li>
            <li>
              <Link to="/trial" className="hover:text-brand-dark-foreground">
                حصة تجريبية مجانية
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-brand-dark-foreground">
                الأسئلة الشائعة
              </Link>
            </li>
          </ul>
        </nav>

      </div>
      <div className="border-t border-brand-dark-foreground/15">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-brand-dark-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Native Kid Academy. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
