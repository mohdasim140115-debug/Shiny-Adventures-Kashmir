import Link from "next/link";
import { destinations, regions } from "@/data/destinations";
import { durationLabel, packages } from "@/data/packages";
import { trackAttrs } from "@/lib/analytics";
import { business, whatsappLink } from "@/lib/site";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";

function TopBar() {
  return (
    <div className="bg-brand-900 text-[0.8rem] text-white/80">
      <div className="container-x flex h-10 items-center justify-between gap-4">
        <p className="flex min-w-0 items-center gap-2">
          <PinIcon className="size-4 shrink-0 text-lime-400" />
          <span className="truncate">{business.address.display}</span>
        </p>
        <ul className="hidden items-center gap-5 md:flex">
          {business.phones.map((p) => (
            <li key={p.e164}>
              <a href={`tel:${p.e164}`} className="flex items-center gap-1.5 hover:text-white" {...trackAttrs("phone_click", "topbar")}>
                <PhoneIcon className="size-3.5 text-lime-400" /> {p.display}
              </a>
            </li>
          ))}
          <li className="hidden xl:block">
            <a href={`mailto:${business.emails[0]}`} className="flex items-center gap-1.5 hover:text-white" {...trackAttrs("email_click", "topbar")}>
              <MailIcon className="size-3.5 text-lime-400" /> {business.emails[0]}
            </a>
          </li>
          <li>
            <a href={whatsappLink()} target="_blank" rel="noopener" className="flex items-center gap-1.5 font-semibold text-lime-400 hover:text-lime-300" {...trackAttrs("whatsapp_click", "topbar")}>
              <WhatsAppIcon className="size-4" /> WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

const chevron = (
  <svg className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/** CSS-only dropdown (hover + keyboard focus) – no client JavaScript needed. */
function Dropdown({ href, label, children, width = "w-72" }: { href: string; label: string; children: React.ReactNode; width?: string }) {
  return (
    <li className="group relative">
      <div className="flex items-center">
        <NavLink href={href}>{label}</NavLink>
        <span className="-ml-2.5 text-ink-soft">{chevron}</span>
      </div>
      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className={`rounded-2xl border border-line bg-white p-3 shadow-[0_24px_60px_-20px_rgb(11_34_56/0.35)] ${width}`}>{children}</div>
      </div>
    </li>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky -top-10 z-40">
      <TopBar />
      <div className="border-b border-line/80 bg-white">
        <div className="container-x flex h-20 items-center justify-between gap-4">
          <Logo size={60} eager />
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li>
                <NavLink href="/">Home</NavLink>
              </li>
              <Dropdown href="/packages" label="Packages" width="w-[34rem]">
                <ul className="grid grid-cols-2 gap-1">
                  {packages.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/packages/${p.slug}`} className="block rounded-xl p-3 hover:bg-brand-50">
                        <span className="block text-[0.7rem] font-bold uppercase tracking-wider text-sunset-700">{p.category}</span>
                        <span className="mt-0.5 block font-semibold text-ink">{p.name}</span>
                        <span className="block text-xs text-ink-soft">{durationLabel(p)}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/packages" className="flex h-full items-center justify-center rounded-xl bg-brand-50 p-3 text-sm font-bold text-brand-700 hover:bg-brand-100">
                      View all packages →
                    </Link>
                  </li>
                </ul>
              </Dropdown>
              <Dropdown href="/destinations" label="Destinations" width="w-[46rem]">
                <div className="grid grid-cols-3 gap-2">
                  {regions.map((r) => (
                    <div key={r.id} className="p-2">
                      <p className="px-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-sunset-700">{r.name}</p>
                      <ul className="mt-2">
                        {destinations
                          .filter((d) => d.region === r.id)
                          .map((d) => (
                            <li key={d.slug}>
                              <Link href={`/destinations/${d.slug}`} className="block rounded-xl px-2 py-2 hover:bg-brand-50">
                                <span className="block font-semibold text-ink">{d.name}</span>
                                <span className="block text-xs leading-snug text-ink-soft">{d.tagline}</span>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <Link href="/destinations" className="mt-2 block rounded-xl bg-brand-50 p-3 text-center text-sm font-bold text-brand-700 hover:bg-brand-100">
                  View all Kashmir destinations →
                </Link>
              </Dropdown>
              <li>
                <NavLink href="/about">About</NavLink>
              </li>
              <li>
                <NavLink href="/contact">Contact</NavLink>
              </li>
            </ul>
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/contact#enquiry" className="btn btn-primary" {...trackAttrs("package_enquiry_click", "header")}>
              Get a free quote
            </Link>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
