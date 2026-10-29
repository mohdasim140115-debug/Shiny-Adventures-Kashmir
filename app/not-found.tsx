import type { Metadata } from "next";
import Link from "next/link";
import { navLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found | Shiny Adventures Kashmir",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container-x py-28 text-center">
      <p className="eyebrow justify-center">Error 404</p>
      <h1 className="mt-4 text-4xl font-medium text-brand-900 sm:text-5xl">This page could not be found</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
        The link may be out of date. Try one of these pages instead.
      </p>
      <ul className="mt-10 flex flex-wrap justify-center gap-3">
        {navLinks.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="btn btn-outline text-brand-800">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
