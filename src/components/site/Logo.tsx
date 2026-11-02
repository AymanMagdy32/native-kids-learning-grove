import { Link } from "@tanstack/react-router";

export function Logo({ variant = "default" }: { variant?: "default" | "light" }) {
  return (
    <Link
      to="/"
      className={`brand-logo flex items-center gap-2.5 ${variant === "light" ? "brand-logo-light" : ""}`}
      dir="ltr"
      aria-label="Native Kid Academy — الرئيسية"
    >
      <span className="leading-tight">
        <span
          className={`block font-display text-base font-extrabold ${
            variant === "light" ? "text-brand-dark-foreground" : "text-foreground"
          }`}
        >
          Native Kid
        </span>
        <span
          className={`block text-[11px] font-medium ${
            variant === "light" ? "text-brand-dark-foreground/70" : "text-muted-foreground"
          }`}
        >
          Speak it naturally
        </span>
      </span>
      <img
        src="/brand/native-kid-logo.png"
        alt="شعار أكاديمية نيتف كيد"
        className="brand-logo-mark brand-logo-original object-contain"
        loading="eager"
        width={58}
        height={72}
      />
    </Link>
  );
}
