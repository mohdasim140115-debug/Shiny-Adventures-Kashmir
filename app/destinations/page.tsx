import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/sections";
import { destinations, regions } from "@/data/destinations";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kashmir Destinations: Srinagar, Gulmarg, Pahalgam & More",
  description:
    "Kashmir places to visit by region: Srinagar, Gulmarg, Tangmarg, Pahalgam, Sonamarg, Gurez, Yusmarg, Verinag and more, with travel times and tour packages.",
  path: "/destinations",
});

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Kashmir destination guide"
        title="Kashmir destinations, from Dal Lake to Gurez Valley"
        intro="Thirteen places across central, north and south Kashmir – what to expect, how far each is from Srinagar, the best season and which packages include it."
        image={images.uThajiwas}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
        ]}
      />

      <nav aria-label="Regions" className="border-b border-line bg-white">
        <ul className="container-x flex gap-2 overflow-x-auto py-4 text-sm font-semibold">
          {regions.map((r) => (
            <li key={r.id} className="shrink-0">
              <a href={`#${r.id}`} className="block rounded-full border border-line px-4 py-2 text-ink hover:border-brand-200 hover:text-brand-700">
                {r.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {regions.map((r, ri) => (
        <section key={r.id} id={r.id} aria-labelledby={`${r.id}-title`} className={ri % 2 ? "bg-sand py-16 lg:py-24" : "py-16 lg:py-24"}>
          <div className="container-x">
            <p className="eyebrow">{destinations.filter((d) => d.region === r.id).length} places</p>
            <h2 id={`${r.id}-title`} className="mt-3 text-3xl font-medium text-brand-900 sm:text-4xl">
              {r.name}
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-ink-soft">{r.text}</p>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {destinations
                .filter((d) => d.region === r.id)
                .map((d) => {
                  const img = images[d.image];
                  return (
                    <article key={d.slug} className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-line bg-white transition-shadow hover:shadow-[0_28px_50px_-24px_rgb(11_34_56/0.45)]">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-brand-800">{d.bestFor[0]}</span>
                      </div>
                      <div className="flex flex-1 flex-col p-7">
                        <p className="text-sm font-semibold text-sunset-700">{d.tagline}</p>
                        <h3 className="mt-1 text-2xl font-medium text-brand-900">
                          <Link href={`/destinations/${d.slug}`} className="after:absolute after:inset-0 after:content-['']">
                            {d.name}
                          </Link>
                        </h3>
                        <p className="mb-6 mt-3 line-clamp-3 leading-relaxed text-ink-soft">{d.intro}</p>
                        <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
                          <div>
                            <dt className="text-xs font-bold uppercase tracking-wider text-ink-soft">From Srinagar</dt>
                            <dd className="mt-1 font-semibold text-ink">{d.fromSrinagar.split(",")[0]}</dd>
                          </div>
                          <div>
                            <dt className="text-xs font-bold uppercase tracking-wider text-ink-soft">Best time</dt>
                            <dd className="mt-1 font-semibold text-ink">{d.bestTime.split(";")[0].split(",")[0]}</dd>
                          </div>
                        </dl>
                        <span className="mt-6 inline-flex items-center gap-1.5 font-bold text-brand-700">
                          Explore {d.name} <ArrowIcon />
                        </span>
                      </div>
                    </article>
                  );
                })}
            </div>
          </div>
        </section>
      ))}

      <CtaBand source="destinations-cta" title="Not sure which places to combine?" text="Tell us how many days you have and the kind of trip you enjoy. We will suggest a route that avoids long, rushed drives." />
    </>
  );
}
