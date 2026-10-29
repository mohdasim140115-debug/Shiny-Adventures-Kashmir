import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/data/destinations";
import { images } from "@/data/images";
import type { TourPackage } from "@/data/packages";
import { trackAttrs } from "@/lib/analytics";
import { business, whatsappLink } from "@/lib/site";
import { ArrowIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "./icons";
import { Snowfall } from "./snowfall";

export function SectionHeading({ eyebrow, title, intro, align = "left", id, tone = "light" }: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  id?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-5xl text-center" : "max-w-2xl"}>
      <p className={`eyebrow ${align === "center" ? "justify-center" : ""} ${tone === "dark" ? "!text-lime-400" : ""}`}>{eyebrow}</p>
      <h2 id={id} className={`mt-2 text-[1.85rem] leading-[1.15] font-semibold tracking-tight sm:text-[2.2rem] lg:text-[2.5rem] ${tone === "dark" ? "text-white" : "text-brand-900"}`}>
        {title}
      </h2>
      {intro && <p className={`mt-3 text-base leading-7 sm:text-[1.0625rem] ${align === "center" ? "mx-auto max-w-2xl" : ""} ${tone === "dark" ? "text-white/75" : "text-ink-soft"}`}>{intro}</p>}
    </div>
  );
}

export function enquiryHref(packageSlug?: string) {
  return packageSlug ? `/contact?package=${packageSlug}#enquiry` : "/contact#enquiry";
}

export function PackageCard({ pkg }: { pkg: TourPackage }) {
  const img = images[pkg.image];
  const href = `/packages/${pkg.slug}`;
  return (
    <article className="group relative flex min-w-0 flex-col rounded-[1.75rem] border border-line bg-white p-3 shadow-[0_2px_4px_rgb(19_32_46/0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-100 hover:shadow-[0_24px_48px_-24px_rgb(11_34_56/0.4)]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem]">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-brand-900/55 via-transparent to-transparent" aria-hidden />
        <span className="absolute left-3 top-3 rounded-full bg-lime-400 px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-brand-900">
          {pkg.category}
        </span>
        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
          {pkg.nights}N / {pkg.days}D
        </span>
      </div>
      <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
        <h3 className="truncate font-display text-xl leading-snug text-brand-900" title={pkg.name}>
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] group-hover:text-brand-700">
            {pkg.name}
          </Link>
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 truncate text-xs font-semibold text-sunset-700" aria-label={`Route: ${pkg.route.join(", ")}`}>
          <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <span className="truncate">{[...new Set(pkg.route)].join(" · ")}</span>
        </p>
        <div className="mt-3 flex-1">
          <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">{pkg.summary}</p>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
          <span className="text-xs text-ink-soft">
            Price <span className="font-bold text-ink">on request</span>
          </span>
          <span className="flex items-center gap-2 text-sm font-bold text-brand-700">
            Details
            <span className="flex size-9 items-center justify-center rounded-full bg-brand-700 text-white transition-all duration-300 group-hover:-rotate-45 group-hover:bg-brand-800">
              <ArrowIcon />
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

export function DestinationCard({ destination, className = "aspect-[4/5]" }: { destination: Destination; className?: string }) {
  const img = images[destination.image];
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={`group relative isolate flex flex-col justify-end overflow-hidden rounded-3xl p-6 text-white ${className}`}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
        className="-z-10 object-cover transition-transform duration-700 group-hover:scale-[1.07]"
      />
      <span className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-900/90 via-brand-900/20 to-transparent" aria-hidden />
      <h3 className="text-2xl font-medium sm:text-[1.7rem]">{destination.name}</h3>
      <p className="mt-1 text-sm text-white/85">{destination.tagline}</p>
      <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/40 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-sm transition-colors group-hover:border-lime-400 group-hover:bg-lime-400 group-hover:text-brand-900">
        Explore <ArrowIcon />
      </span>
    </Link>
  );
}

/** Sticky enquiry box used on package and destination detail pages. */
export function EnquirySidebar({ title, packageSlug, source }: { title: string; packageSlug?: string; source: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_24px_50px_-30px_rgb(11_34_56/0.45)]">
      <div className="bg-brand-900 px-6 py-5 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime-400">Free quotation</p>
        <p className="mt-1 font-display text-xl">{title}</p>
      </div>
      <div className="space-y-3 p-6">
        <Link href={enquiryHref(packageSlug)} className="btn btn-primary w-full" {...trackAttrs("package_enquiry_click", source)}>
          Request a quote <ArrowIcon />
        </Link>
        <a
          href={whatsappLink(`Hello Shiny Adventures Kashmir, I am interested in: ${title}`)}
          target="_blank"
          rel="noopener"
          className="btn w-full bg-[#1f9d55] text-white hover:bg-[#198447]"
          {...trackAttrs("whatsapp_click", source)}
        >
          <WhatsAppIcon /> WhatsApp us
        </a>
        <ul className="space-y-2 border-t border-line pt-4 text-sm">
          {business.phones.map((p) => (
            <li key={p.e164}>
              <a href={`tel:${p.e164}`} className="flex items-center gap-2 font-semibold text-ink hover:text-brand-700" {...trackAttrs("phone_click", source)}>
                <PhoneIcon className="size-4 text-brand-600" /> {p.display}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${business.emails[0]}`} className="flex items-center gap-2 break-all text-ink-soft hover:text-brand-700" {...trackAttrs("email_click", source)}>
              <MailIcon className="size-4 shrink-0 text-brand-600" /> {business.emails[0]}
            </a>
          </li>
        </ul>
        <p className="text-xs text-ink-soft">Ask for {business.contactPerson} – every itinerary can be customised.</p>
      </div>
    </div>
  );
}

export function CtaBand({ title, text, source }: { title: string; text: string; source: string }) {
  return (
    <section className="container-x py-20" aria-labelledby={`cta-${source}`}>
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-900 px-6 py-14 text-white sm:px-14 sm:py-16">
        <Image src={images.uKashmirPeaks.src} alt="" fill sizes="(min-width: 1280px) 1200px, 100vw" className="-z-10 object-cover opacity-25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-900 via-brand-900/90 to-brand-900/40" aria-hidden />
        <Snowfall />
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h2 id={`cta-${source}`} className="text-3xl leading-tight font-medium sm:text-[2.6rem]">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-white/80">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <Link href={enquiryHref()} className="btn btn-lime" {...trackAttrs("package_enquiry_click", source)}>
              Request a free quotation <ArrowIcon />
            </Link>
            <a href={whatsappLink("Hello Shiny Adventures Kashmir, I would like to plan a Kashmir trip.")} target="_blank" rel="noopener" className="btn btn-outline text-white" {...trackAttrs("whatsapp_click", source)}>
              <WhatsAppIcon /> WhatsApp us
            </a>
            <a href={`tel:${business.phones[0].e164}`} className="btn text-white/90 hover:text-white" {...trackAttrs("phone_click", source)}>
              <PhoneIcon /> {business.phones[0].display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
