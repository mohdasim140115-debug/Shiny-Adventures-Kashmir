import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { CtaBand, DestinationCard, EnquirySidebar, enquiryHref, PackageCard } from "@/components/sections";
import { getDestination } from "@/data/destinations";
import { images } from "@/data/images";
import { durationLabel, getPackage, packages } from "@/data/packages";
import { trackAttrs } from "@/lib/analytics";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

const withBrand = (t: string) => (t.length <= 40 ? `${t} | Shiny Adventures Kashmir` : t);

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPackage((await params).slug);
  if (!p) return {};
  return pageMetadata({
    title: withBrand(`${p.name} Package (${p.nights}N/${p.days}D)`),
    description: `${durationLabel(p)} ${p.category.toLowerCase()} itinerary covering ${[...new Set(p.route)].join(", ")}. See the day-by-day plan and request a free, customised quotation.`,
    path: `/packages/${p.slug}`,
  });
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPackage((await params).slug);
  if (!p) notFound();
  const related = packages.filter((x) => x.slug !== p.slug).slice(0, 3);
  const facts = [
    { label: "Duration", value: durationLabel(p) },
    { label: "Trip type", value: p.category },
    { label: "Best time", value: p.bestTime },
    { label: "Price", value: "On request" },
  ];

  return (
    <>
      <PageHero
        eyebrow={`${p.category} package`}
        title={p.name}
        intro={p.summary}
        image={images[p.image]}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Packages", path: "/packages" },
          { name: p.name, path: `/packages/${p.slug}` },
        ]}
      >
        <ul className="mt-8 flex flex-wrap items-center gap-2" aria-label="Route">
          {p.route.map((r, i) => (
            <li key={`${r}-${i}`} className="flex items-center gap-2">
              {i > 0 && <span className="text-lime-400" aria-hidden>→</span>}
              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm font-semibold backdrop-blur-sm">{r}</span>
            </li>
          ))}
        </ul>
      </PageHero>

      <div className="container-x relative z-10 -mt-10">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line shadow-[0_24px_50px_-30px_rgb(11_34_56/0.45)] lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="bg-white p-5 sm:p-6">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">{f.label}</dt>
              <dd className="mt-1 font-display text-lg text-brand-900 sm:text-xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1fr_22rem] lg:py-20">
        <div>
          <section aria-labelledby="overview">
            <h2 id="overview" className="text-3xl font-medium text-brand-900">Trip overview</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{p.summary}</p>
            <p className="mt-4 text-ink-soft">
              <strong className="text-ink">Ideal for:</strong> {p.idealFor}
            </p>
          </section>

          <section aria-labelledby="highlights" className="mt-12">
            <h2 id="highlights" className="text-3xl font-medium text-brand-900">Highlights</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 rounded-2xl border border-line bg-white p-4 text-ink">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-lime-400 text-brand-900">
                    <CheckIcon className="size-3.5" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="itinerary" className="mt-14">
            <h2 id="itinerary" className="text-3xl font-medium text-brand-900">Day-by-day itinerary</h2>
            <ol className="mt-8 space-y-0">
              {p.itinerary.map((d, n) => (
                <li key={d.title} className="relative flex gap-5 pb-8 last:pb-0">
                  {n < p.itinerary.length - 1 && <span className="absolute left-[1.6rem] top-14 bottom-0 w-0.5 bg-brand-100" aria-hidden />}
                  <span className="flex size-[3.25rem] shrink-0 flex-col items-center justify-center rounded-2xl bg-brand-700 text-white">
                    <span className="text-[0.6rem] font-bold uppercase tracking-wider text-white/70">Day</span>
                    <span className="font-display text-lg leading-none">{n + 1}</span>
                  </span>
                  <div className="flex-1 rounded-2xl border border-line bg-white p-5">
                    <h3 className="text-xl font-semibold text-brand-900">{d.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{d.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-2xl bg-brand-50 p-5 text-sm leading-relaxed text-brand-900">
              This is a sample plan. Nights, hotels, vehicle type and sightseeing can all be changed – your quotation will list exactly what is included.
            </p>
          </section>

          <section aria-labelledby="places" className="mt-14">
            <h2 id="places" className="text-3xl font-medium text-brand-900">Places on this tour</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {p.destinations.map((slug) => {
                const d = getDestination(slug);
                return d ? <DestinationCard key={slug} destination={d} className="aspect-[4/3]" /> : null;
              })}
            </div>
          </section>

          <div className="mt-12">
            <Link href={enquiryHref(p.slug)} className="btn btn-primary" {...trackAttrs("package_enquiry_click", p.slug)}>
              Enquire about this package <ArrowIcon />
            </Link>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <EnquirySidebar title={p.name} packageSlug={p.slug} source={`package-${p.slug}`} />
        </aside>
      </div>

      <section className="bg-sand py-20" aria-labelledby="related">
        <div className="container-x">
          <h2 id="related" className="text-3xl font-medium text-brand-900 sm:text-4xl">More Kashmir packages</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <PackageCard key={r.slug} pkg={r} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand source={`package-${p.slug}-cta`} title="Make this trip your own" text="Tell us your dates and group size and we will tailor this itinerary and send a quotation." />
    </>
  );
}
