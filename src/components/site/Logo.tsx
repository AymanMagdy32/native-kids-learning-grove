import { Link } from "@tanstack/react-router";
import { BRAND_MARK } from "@/lib/brand";

export function Logo({ variant = "default" }: { variant?: "default" | "light" }) {
  return (
    <Link
      to="/"
      className={`brand-logo flex items-center gap-2.5 ${variant === "light" ? "brand-logo-light" : ""}`}
      dir="ltr"
      aria-label="Native Kid Academy — الرئيسية"
    >
      <span className="academy-logo academy-logo-lockup">
        <img src={BRAND_MARK} alt="" className="academy-logo-mark" width={256} height={256} loading="eager" />
        <span className="academy-logo-name"><strong>Native Kid</strong><span>Academy</span></span>
      </span>
    </Link>
  );
}
