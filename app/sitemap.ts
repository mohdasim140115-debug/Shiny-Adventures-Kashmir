import type { MetadataRoute } from "next";
import { destinations } from "@/data/destinations";
import { packages } from "@/data/packages";
import { absoluteUrl, navLinks } from "@/lib/site";

/** Bump when page content changes meaningfully, so lastmod stays truthful. */
const CONTENT_UPDATED = "2026-10-27";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...navLinks.map((l) => l.href),
    ...packages.map((p) => `/packages/${p.slug}`),
    ...destinations.map((d) => `/destinations/${d.slug}`),
  ];
  return paths.map((path) => ({ url: absoluteUrl(path), lastModified: CONTENT_UPDATED }));
}
