"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { trackAttrs } from "@/lib/analytics";
import { destinations } from "@/data/destinations";
import { packages } from "@/data/packages";
import { business, navLinks, whatsappLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import { NavLink } from "./nav-link";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(120);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => {
          setTop(document.querySelector("header")?.getBoundingClientRect().bottom ?? 120);
          setOpen((v) => !v);
        }}
        className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      <div
        id="mobile-menu"
        hidden={!open}
        style={{ top }}
        className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto border-t border-line bg-white px-4 pb-10 pt-4"
      >
        <nav aria-label="Mobile">
          <ul className="divide-y divide-line">
            {navLinks.map((l) => (
              <li key={l.href}>
                <NavLink href={l.href} block onNavigate={() => setOpen(false)}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
          {[
            { title: "Packages", base: "/packages", items: packages.map((p) => ({ slug: p.slug, name: p.name })) },
            { title: "Destinations", base: "/destinations", items: destinations.map((d) => ({ slug: d.slug, name: d.name })) },
          ].map((g) => (
            <div key={g.title}>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-sunset-700">{g.title}</p>
              <ul className="mt-2 space-y-2">
                {g.items.map((i) => (
                  <li key={i.slug}>
                    <Link href={`${g.base}/${i.slug}`} onClick={() => setOpen(false)} className="text-ink-soft hover:text-brand-700">
                      {i.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-3">
          <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary" {...trackAttrs("package_enquiry_click", "mobile-menu")}>
            Get a free quote
          </Link>
          <a href={whatsappLink()} target="_blank" rel="noopener" className="btn btn-outline text-brand-800" {...trackAttrs("whatsapp_click", "mobile-menu")}>
            <WhatsAppIcon /> Chat on WhatsApp
          </a>
          <a href={`tel:${business.phones[0].e164}`} className="btn btn-outline text-ink" {...trackAttrs("phone_click", "mobile-menu")}>
            <PhoneIcon /> {business.phones[0].display}
          </a>
        </div>
      </div>
    </div>
  );
}
