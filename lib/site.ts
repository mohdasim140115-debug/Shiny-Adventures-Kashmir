/**
 * Single source of truth for business details (NAP) and site configuration.
 * Every page, the footer and the JSON-LD read from here so details stay consistent.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

if (!rawSiteUrl && process.env.NODE_ENV === "production") {
  console.warn(
    "[site] NEXT_PUBLIC_SITE_URL is not set. Canonical URLs, the sitemap and structured data will point to http://localhost:3000. Set it to the production domain before deploying.",
  );
}

export const siteUrl = (rawSiteUrl || "http://localhost:3000").replace(/\/+$/, "");

export const business = {
  name: "Shiny Adventures Kashmir",
  /** Wording that appears on the official logo artwork. */
  logoWording: "Shiny Adventure Tour & Travels",
  contactPerson: "Tariq Ahmad Khan",
  address: {
    street: "Wahipora, Tangmarg",
    locality: "Gulmarg",
    region: "Jammu and Kashmir",
    postalCode: "193402",
    country: "IN",
    /** Display format, kept identical everywhere on the site. */
    display: "Wahipora, Tangmarg, Gulmarg, Kashmir – 193402, India",
  },
  phones: [
    { display: "+91 6005399813", e164: "+916005399813" },
    { display: "+91 9596566858", e164: "+919596566858" },
  ],
  emails: ["shinyadventureskashmir@gmail.com", "shinyadventures49@gmail.com"],
  /**
   * WhatsApp number in international format without "+".
   * ASSUMPTION: the first phone number is the WhatsApp line. Confirm with the owner.
   */
  whatsapp: "916005399813",
  logo: {
    src: "/images/shiny-adventures-logo.png",
    width: 1447,
    height: 1447,
    alt: "Shiny Adventure Tour & Travels logo – crossed lime-green skis over a mountain sketch",
  },
  /** Official profiles supplied by the owner. */
  social: [
    { name: "Google", label: "Find us on Google", href: "https://share.google/GELqtMUuTEI4Rbdrg" },
    { name: "Instagram", label: "Follow us on Instagram", href: "https://www.instagram.com/shinyadventureskashmir_/" },
    { name: "Facebook", label: "Like us on Facebook", href: "https://www.facebook.com/share/1DvVEAKfny/" },
  ],
  areaServed: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg", "Doodhpathri", "Gurez Valley"],
} as const;

export const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim() || "";
export const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || "";

export function absoluteUrl(path = "/") {
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${business.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Website credit shown in the footer. */
export const madeBy = { name: "DeenX Consultancy", href: "https://deenxconsultancy.com/" };

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
