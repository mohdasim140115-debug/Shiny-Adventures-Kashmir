import Link from "next/link";
import { destinations } from "@/data/destinations";
import { packages } from "@/data/packages";
import { business, madeBy, navLinks } from "@/lib/site";
import { ContactList } from "./contact-list";
import { Snowfall } from "./snowfall";
import { Logo } from "./logo";
import { SocialLinks } from "./social-links";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-brand-900 text-white/80">
      <Snowfall density={0.6} />
      <div className="h-1 bg-[linear-gradient(90deg,var(--color-brand-500),var(--color-lime-400)_55%,var(--color-sunset-400))]" aria-hidden />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <Logo size={88} inverted />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            A Kashmir travel agency based in Tangmarg, near Gulmarg, planning customised tours across the valley.
          </p>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-lime-400">Follow us</p>
          <SocialLinks className="mt-3" />
        </div>

        <nav aria-label="Destinations">
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-lime-400">Destinations</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {destinations.map((d) => (
              <li key={d.slug}>
                <Link href={`/destinations/${d.slug}`} className="hover:text-white">
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Packages and pages">
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-lime-400">Packages</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {packages.map((p) => (
              <li key={p.slug}>
                <Link href={`/packages/${p.slug}`} className="hover:text-white">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-lime-400">Contact</h2>
          <ContactList tone="dark" source="footer" className="mt-4" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
            <span className="mx-2 text-white/30" aria-hidden>
              |
            </span>
            Prepared by{" "}
            <a href={madeBy.href} target="_blank" rel="noopener" className="font-semibold text-white/85 underline decoration-white/30 underline-offset-4 hover:text-lime-400">
              {madeBy.name}
            </a>
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/about#photo-credits" className="hover:text-white">
                Photo credits
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
