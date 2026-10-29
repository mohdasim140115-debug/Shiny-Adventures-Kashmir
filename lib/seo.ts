import type { Metadata } from "next";
import { absoluteUrl, business, siteUrl } from "./site";

export const ogImage = {
  url: "/images/og/shiny-adventures-kashmir-og.jpg",
  width: 1200,
  height: 630,
  alt: "Shiny Adventures Kashmir logo over a view of Dal Lake and snow-covered mountains",
};

type PageSeo = {
  /** Full title tag text – written per page, not templated, so each reads naturally. */
  title: string;
  description: string;
  path: string;
};

export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: business.name,
      url: path,
      title,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}

const orgId = `${siteUrl}/#organization`;

/** Site-wide graph, rendered once in the root layout. Only verified business facts. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": orgId,
        name: business.name,
        alternateName: business.logoWording,
        url: absoluteUrl("/"),
        logo: absoluteUrl(business.logo.src),
        image: absoluteUrl(ogImage.url),
        telephone: business.phones[0].e164,
        email: business.emails[0],
        address: {
          "@type": "PostalAddress",
          streetAddress: business.address.street,
          addressLocality: business.address.locality,
          addressRegion: business.address.region,
          postalCode: business.address.postalCode,
          addressCountry: business.address.country,
        },
        contactPoint: business.phones.map((p) => ({
          "@type": "ContactPoint",
          telephone: p.e164,
          contactType: "customer service",
        })),
        // Instagram and Facebook profiles; the Google link is a share redirect, so it is left out.
        sameAs: business.social.filter((s) => s.name !== "Google").map((s) => s.href),
        areaServed: business.areaServed.map((name) => ({ "@type": "Place", name: `${name}, Kashmir` })),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: absoluteUrl("/"),
        name: business.name,
        inLanguage: "en-IN",
        publisher: { "@id": orgId },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
