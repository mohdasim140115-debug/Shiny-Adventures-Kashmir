import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { Snowfall } from "@/components/snowfall";
import { destinations, getDestination, regions, type RegionId } from "@/data/destinations";
import { images, type ImageKey } from "@/data/images";
import { durationLabel, getPackage } from "@/data/packages";
import { trackAttrs } from "@/lib/analytics";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { business, whatsappLink } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = getDestination((await params).slug);
  if (!d) return {};
  return pageMetadata({
    title: `${d.name} Tour Packages & Travel Guide`,
    description: `${d.name}, Kashmir – ${d.tagline}. Things to do, best time to visit, distance from Srinagar and ${d.name} tour packages.`,
    path: `/destinations/${d.slug}`,
  });
}

/** A single, quiet accent per region – used only for the small region label. */
const regionDot: Record<RegionId, string> = {
  central: "bg-brand-500",
  north: "bg-lime-600",
  south: "bg-sunset-400",
};

export default async function CityGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const d = getDestination((await params).slug);
  if (!d) notFound();

  const region = regions.find((r) => r.id === d.region)!;
  const main = images[d.image];
  const allPhotos: ImageKey[] = [d.image, ...d.gallery.filter((g) => g !== d.image)];
  // Desktop grid: one 2×2 tile plus rows of three, so keep 1 + 2 + 3n photos to avoid gaps.
  const rest = allPhotos.length - 1;
  const fit = rest < 2 ? rest : rest - ((rest - 2) % 3);
  const photos = allPhotos.slice(0, 1 + fit);
  const pkgs = d.packages.map(getPackage).filter((p) => p !== undefined);
  const nearby = [
    ...destinations.filter((x) => x.slug !== d.slug && x.region === d.region),
    ...destinations.filter((x) => x.region !== d.region),
  ].slice(0, 4);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: d.name, path: `/destinations/${d.slug}` },
  ];
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "things-to-do", label: "Things to do" },
    { id: "gallery", label: "Gallery" },
    { id: "packages", label: "Packages" },
  ];
  const facts = [
    { label: "From Srinagar", value: d.fromSrinagar },
    { label: "Best time", value: d.bestTime },
    { label: "Region", value: region.name },
  ];
  const enquiry = `/contact?destination=${d.slug}#enquiry`;

  return (
    <>
      {/* Hero – clean title, one large photo, key facts */}
      <section className="bg-white">
        <div className="container-x pt-8 pb-14 lg:pb-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-ink">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.path} className="hover:text-brand-700">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
                <span className={`size-2 rounded-full ${regionDot[d.region]}`} aria-hidden />
                {region.name}
              </p>
              <h1 className="mt-3 font-display font-medium text-brand-900">
                <span className="block text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">{d.name}</span>
                <span className="mt-3 block text-xl font-normal text-ink-soft sm:text-2xl">{d.tagline}</span>
              </h1>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={enquiry} className="btn btn-primary" {...trackAttrs("package_enquiry_click", `city-hero-${d.slug}`)}>
                Plan my {d.name} trip <ArrowIcon />
              </Link>
              <a
                href={whatsappLink(`Hello, I would like to plan a trip to ${d.name}.`)}
                target="_blank"
                rel="noopener"
                className="btn border border-line text-ink hover:border-brand-200"
                {...trackAttrs("whatsapp_click", `city-hero-${d.slug}`)}
              >
                <WhatsAppIcon className="size-5 text-[#1f9d55]" /> WhatsApp
              </a>
            </div>
          </div>

          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image src={main.src} alt={main.alt} fill preload sizes="(min-width: 1280px) 1200px, 100vw" quality={85} className="object-cover" />
            <Snowfall density={0.9} />
          </div>

          <dl className="mt-8 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">{f.label}</dt>
                <dd className="mt-2 text-base leading-snug text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <JsonLd data={breadcrumbJsonLd(crumbs)} />
      </section>

      {/* In-page navigation */}
      <nav aria-label={`${d.name} guide sections`} className="sticky top-20 z-30 border-y border-line bg-white/95 backdrop-blur">
        <ul className="container-x flex gap-1 overflow-x-auto py-2 text-sm font-semibold">
          {tabs.map((t) => (
            <li key={t.id} className="shrink-0">
              <a href={`#${t.id}`} className="block rounded-full px-4 py-2 text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-800">
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Overview */}
      <section id="overview" aria-labelledby="overview-title" className="container-x scroll-mt-40 py-20 lg:py-24">
        <div className="reveal grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <h2 id="overview-title" className="text-3xl font-medium text-brand-900 sm:text-4xl">
            About {d.name}
          </h2>
          <div>
            <p className="text-lg leading-relaxed text-ink-soft">{d.intro}</p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Best for">
              {d.bestFor.map((b) => (
                <li key={b} className="rounded-full border border-line px-4 py-1.5 text-sm text-ink">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Things to do */}
      <section id="things-to-do" aria-labelledby="todo-title" className="scroll-mt-40 bg-sand/60 py-20 lg:py-24">
        <div className="container-x">
          <h2 id="todo-title" className="reveal text-3xl font-medium text-brand-900 sm:text-4xl">
            Things to do in {d.name}
          </h2>
          <ol className={`mt-12 grid gap-6 sm:grid-cols-2 ${d.experiences.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {d.experiences.map((e, i) => {
              const key = d.experienceImages[i];
              const p = key ? images[key] : null;
              return (
                <li key={e} className="reveal overflow-hidden rounded-2xl bg-white">
                  <div className="relative aspect-[4/3]">
                    {p ? (
                      <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                    ) : (
                      <span className="flex h-full items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100" aria-hidden>
                        <svg className="size-14 text-brand-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
                          <path d="m2 20 7-11 4 6 3-4 6 9z" />
                          <circle cx="17" cy="6" r="2" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-sm font-semibold text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 text-xl leading-snug font-medium text-brand-900">{e}</h3>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" aria-labelledby="gallery-title" className="container-x scroll-mt-40 py-20 lg:py-24">
        <div className="reveal flex items-end justify-between gap-4">
          <h2 id="gallery-title" className="text-3xl font-medium text-brand-900 sm:text-4xl">
            {d.name} in pictures
          </h2>
          <Link href="/about#photo-credits" className="shrink-0 text-sm text-ink-soft underline decoration-line underline-offset-4 hover:text-ink">
            Photo credits
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {photos.map((k, i) => {
            const p = images[k];
            return (
              <figure key={k} className={`reveal relative overflow-hidden rounded-2xl ${
                  i === 0
                    ? `col-span-2 aspect-[4/3] ${fit >= 2 ? "lg:row-span-2 lg:aspect-auto" : fit === 0 ? "lg:col-span-3 lg:aspect-[21/9]" : "lg:aspect-auto"}`
                     : fit % 2 === 1 && i === photos.length - 1 ? "col-span-2 aspect-[16/9] lg:col-span-1 lg:aspect-[4/3]" : "aspect-[4/3]"
                }`}>
                <Image src={p.src} alt={p.alt} fill sizes={i === 0 ? "(min-width: 1024px) 800px, 100vw" : "(min-width: 1024px) 400px, 50vw"} className="object-cover transition-transform duration-500 hover:scale-[1.03]" />
              </figure>
            );
          })}
        </div>
      </section>

      {/* Local tip */}
      <section aria-labelledby="tips-title" className="container-x pb-20 lg:pb-24">
        <div className="reveal rounded-3xl bg-brand-50 p-8 sm:p-12">
          <h2 id="tips-title" className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
            Local tip for {d.name}
          </h2>
          <p className="mt-4 max-w-3xl font-display text-2xl leading-snug text-brand-900 sm:text-3xl">{d.planningNote}</p>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" aria-labelledby="pk-title" className="scroll-mt-40 border-t border-line py-20 lg:py-24">
        <div className="container-x">
          <h2 id="pk-title" className="reveal text-3xl font-medium text-brand-900 sm:text-4xl">
            {d.name} tour packages
          </h2>
          {pkgs.length > 0 ? (
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {pkgs.map((p, i) => {
                const pi = images[p.image];
                // An odd final card spans the full row in a horizontal layout, so the grid never leaves a gap.
                const wide = pkgs.length % 2 === 1 && i === pkgs.length - 1 && pkgs.length > 1;
                return (
                  <li key={p.slug} className={`reveal ${wide ? "md:col-span-2" : ""}`}>
                    <Link
                      href={`/packages/${p.slug}`}
                      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-[0_20px_40px_-24px_rgb(11_34_56/0.4)] ${wide ? "md:flex-row" : ""}`}
                    >
                      <span className={`relative block aspect-[16/9] ${wide ? "md:aspect-auto md:w-1/2" : ""}`}>
                        <Image src={pi.src} alt={pi.alt} fill sizes={wide ? "(min-width: 768px) 600px, 100vw" : "(min-width: 768px) 560px, 100vw"} className="object-cover" />
                      </span>
                      <span className={`flex flex-1 flex-col p-6 ${wide ? "md:justify-center md:p-10" : ""}`}>
                        <span className="text-sm text-ink-soft">
                          {p.category} · {durationLabel(p)}
                        </span>
                        <span className="mt-1 font-display text-2xl text-brand-900">{p.name}</span>
                        <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{p.route.join(" → ")}</span>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:text-brand-800">
                          View itinerary <ArrowIcon />
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="reveal mt-8 max-w-2xl">
              <p className="text-lg leading-relaxed text-ink-soft">
                We plan {d.name} as part of customised Kashmir itineraries. Tell us your dates and the other places you want to see, and we will build a route that includes {d.name}.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={enquiry} className="btn btn-primary" {...trackAttrs("package_enquiry_click", `city-custom-${d.slug}`)}>
                  Build a custom trip <ArrowIcon />
                </Link>
                <Link href="/packages" className="btn border border-line text-ink hover:border-brand-200">
                  Browse packages
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Nearby */}
      <section aria-labelledby="nearby-title" className="bg-sand/60 py-20 lg:py-24">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <h2 id="nearby-title" className="text-3xl font-medium text-brand-900 sm:text-4xl">
              More places to explore
            </h2>
            <Link href="/destinations" className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800 sm:inline-flex">
              All destinations <ArrowIcon />
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {nearby.map((n) => {
              const ni = images[n.image];
              return (
                <li key={n.slug}>
                  <Link href={`/destinations/${n.slug}`} className="group block">
                    <span className="relative block aspect-[4/5] overflow-hidden rounded-2xl">
                      <Image src={ni.src} alt={ni.alt} fill sizes="(min-width: 1024px) 280px, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    </span>
                    <span className="mt-3 block font-display text-xl text-brand-900 group-hover:text-brand-700">{n.name}</span>
                    <span className="mt-0.5 block text-sm text-ink-soft">{n.tagline}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Call to action */}
      <section aria-labelledby="city-cta" className="container-x py-20 lg:py-24">
        <div className="reveal relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl bg-brand-900 p-8 text-white sm:p-12 lg:flex-row lg:items-center">
          <Snowfall />
          <div>
            <h2 id="city-cta" className="text-3xl font-medium sm:text-4xl">
              Planning a trip to {d.name}?
            </h2>
            <p className="mt-3 max-w-xl text-white/75">Share your dates and group size – we will reply with an itinerary and quotation.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={enquiry} className="btn btn-lime" {...trackAttrs("package_enquiry_click", `city-cta-${d.slug}`)}>
              Get a free quote
            </Link>
            <a href={`tel:${business.phones[0].e164}`} className="btn btn-outline text-white" {...trackAttrs("phone_click", `city-cta-${d.slug}`)}>
              <PhoneIcon /> {business.phones[0].display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
