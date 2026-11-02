import logoAsset from "@/assets/native-kid-original-logo.jpg.asset.json";

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
  logo: `${SITE_URL}${logoAsset.url}`,
  description:
    "تعليم إنجليزي أونلاين للأطفال والمراهقين من 4 إلى 15 سنة، مع التركيز على الصوتيات والتحدث والاستماع والقراءة والكتابة.",
  telephone: "+201503350223",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+201503350223",
    contactType: "customer support",
    availableLanguage: ["Arabic", "English"],
  },
};
