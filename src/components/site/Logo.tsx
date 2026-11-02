import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/native-kid-original-logo.jpg.asset.json";

export function Logo({ variant = "default" }: { variant?: "default" | "light" }) {
  return (
    <Link
      to="/"
      className={`brand-logo flex items-center gap-2.5 ${variant === "light" ? "brand-logo-light" : ""}`}
      dir="ltr"
      aria-label="Native Kid Academy — الرئيسية"
    >
      <img
        src={logoAsset.url}
        alt="شعار أكاديمية نيتف كيد"
        className="academy-logo object-contain"
        loading="eager"
        width={1145}
        height={768}
      />
    </Link>
  );
}
