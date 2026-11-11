import { BRAND_MARK } from "@/lib/brand";

export const SITE_URL = "https://www.nativekidacademy.com";

export function canonicalUrl(pathname: string) {
  return `${SITE_URL}${pathname.replace(/\/+$/, "") || "/"}`;
}

export const ACADEMY_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#academy`,
  name: "Native Kid Academy",
  alternateName: "أكاديمية نيتف كيد",
  url: SITE_URL,
  logo: `${SITE_URL}${BRAND_MARK}`,
  description:
    "تعليم إنجليزي أونلاين للأطفال والمراهقين من 4 إلى 15 سنة، مع التركيز على الصوتيات والتحدث والاستماع والقراءة والكتابة.",
  telephone: "+201022986424",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+201022986424",
    contactType: "customer support",
    availableLanguage: ["Arabic", "English"],
  },
};
