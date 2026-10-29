import Image from "next/image";
import Link from "next/link";
import { HeroSlider } from "@/components/hero-slider";
import { Snowfall } from "@/components/snowfall";
import { ArrowIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { CtaBand, DestinationCard, enquiryHref, PackageCard, SectionHeading } from "@/components/sections";
import { TripPlanner } from "@/components/trip-planner";
import { destinations, regions } from "@/data/destinations";
import { images, type SiteImage } from "@/data/images";
import { packages, type Category } from "@/data/packages";
import { trackAttrs } from "@/lib/analytics";
import { pageMetadata } from "@/lib/seo";
import { business, whatsappLink } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Kashmir Tour Packages & Travel Agency | Shiny Adventures Kashmir",
  description:
    "Customised Kashmir tour packages from a travel agency based in Tangmarg, near Gulmarg. Trips to Srinagar, Gulmarg, Pahalgam, Sonamarg and offbeat valleys.",
  path: "/",
});

const slides: { image: SiteImage; caption: string }[] = [
  { image: images.heroShikaraSunset, caption: "Shikara ride at sunset" },
  { image: images.heroSnowyValley, caption: "Winter in the valley" },
  { image: images.heroSpringMeadow, caption: "Spring in the meadows" },
  { image: images.heroGondolaSunrise, caption: "Gondola above the clouds" },
];

const tripIcons = {
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  family: (
    <>
      <circle cx="8" cy="7" r="2.5" />
      <circle cx="16.5" cy="8.5" r="2" />
      <path d="M3.5 20v-2.5A4.5 4.5 0 0 1 8 13a4.5 4.5 0 0 1 4.5 4.5V20M13.5 20v-2a3 3 0 0 1 6 0v2" />
    </>
  ),
  snow: <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
};

const tripTypes: { category: Category; title: string; text: string; image: SiteImage; icon: keyof typeof tripIcons }[] = [
  { category: "Honeymoon", title: "Honeymoon", text: "Houseboat nights, shikara rides and quiet valleys for two", image: images.uDalShikaras, icon: "heart" },
  { category: "Family", title: "Family holidays", text: "One comfortable base with easy day trips for all ages", image: images.uTulipGarden, icon: "family" },
  { category: "Winter", title: "Snow & skiing", text: "Gulmarg gondola, snow play and skiing on request", image: images.uGulmargGondola, icon: "snow" },
  { category: "Offbeat", title: "Offbeat Kashmir", text: "Remote valleys of Gurez, Doodhpathri and beyond", image: images.uGurezLake, icon: "compass" },
];

const reasons = [
  { title: "Based in Tangmarg", text: "Our office is in Wahipora, Tangmarg – on the road up to Gulmarg, inside the valley you are visiting." },
  { title: "Fully customised", text: "Every itinerary is built around your dates, group and budget. Packages are a starting point, not a fixed menu." },
  { title: "Clear quotations", text: "You receive a written quotation that states what is included and what is paid locally." },
  { title: "Direct contact", text: `Speak directly with ${business.contactPerson} by phone or WhatsApp before and during your trip.` },
];

const steps = [
  { title: "Share your plan", text: "Dates, number of travellers, budget range and places you would like to see." },
  { title: "Get an itinerary", text: "A day-by-day route with stays, transport and sightseeing, plus a clear quotation." },
  { title: "Fine-tune it", text: "Change nights, swap destinations or upgrade a stay until the plan suits you." },
  { title: "Travel Kashmir", text: "Once confirmed, reach us directly by phone or WhatsApp while you travel." },
];

const seasons = [
  { name: "Spring", months: "Mar – May", text: "Blossoms, tulips in Srinagar and fresh green meadows.", image: images.uTulipGarden },
  { name: "Summer", months: "Jun – Aug", text: "Pahalgam, Sonamarg and the open season for Gurez.", image: images.uSonamargMeadow },
  { name: "Autumn", months: "Sep – Nov", text: "Clear skies, golden chinars and quieter roads.", image: images.uAutumnChinar },
  { name: "Winter", months: "Dec – Feb", text: "Snow season in Gulmarg for skiing and sledging.", image: images.uGulmargSnowCabin },
];

const gallery = [images.uDalHouseboats, images.uGulmargView, images.uTulips, images.uFloatingMarket, images.uSonamargMeadow];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-brand-900 text-white">
        <HeroSlider slides={slides.map((s) => s.image)} captions={slides.map((s) => s.caption)} />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(11_34_56/0.45)_0%,rgb(11_34_56/0.25)_40%,rgb(11_34_56/0.85)_100%)]" />
        <Snowfall />
        <div className="container-x flex min-h-[min(88svh,860px)] flex-col justify-center pb-28 pt-20 lg:pb-36">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-lime-400 backdrop-blur-sm">
            Kashmir travel agency · Tangmarg, Gulmarg
          </p>
          <h1 className="mt-6 max-w-4xl text-[2.7rem] leading-[1.03] font-medium sm:text-6xl lg:text-[5.2rem]">
            Discover Kashmir with <span className="italic text-lime-400">Shiny Adventures</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
            Customised Kashmir tour packages – houseboats on Dal Lake, snow in Gulmarg, riverside days in Pahalgam and quiet valleys off the usual route.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/packages" className="btn btn-lime">
              Explore packages <ArrowIcon />
            </Link>
            <a href={whatsappLink("Hello, I would like a Kashmir tour quotation.")} target="_blank" rel="noopener" className="btn btn-outline text-white" {...trackAttrs("whatsapp_click", "home-hero")}>
              <WhatsAppIcon /> Talk to us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* TRIP PLANNER (overlaps hero) */}
      <section aria-label="Plan your trip" className="container-x relative z-10 -mt-20 lg:-mt-24">
        <TripPlanner />
      </section>

      {/* TRIP TYPES */}
      <section className="container-x pt-20 lg:pt-28" aria-labelledby="types-heading">
        <SectionHeading
          id="types-heading"
          eyebrow="Choose your trip"
          title="Kashmir holidays for every kind of traveller"
          intro="Pick the style that suits you – every trip is tailored to your dates and budget."
          align="center"
        />
        <ul className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-6">
          {tripTypes.map((t) => {
            const pkg = packages.find((p) => p.category === t.category);
            return (
              <li key={t.title} className="w-[78%] shrink-0 snap-start sm:w-auto">
                <Link
                  href={pkg ? `/packages/${pkg.slug}` : "/packages"}
                  className="group relative isolate flex aspect-[4/5] flex-col overflow-hidden rounded-[1.75rem] p-6 text-white shadow-[0_20px_40px_-24px_rgb(11_34_56/0.6)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_60px_-28px_rgb(11_34_56/0.7)] lg:aspect-[3/4]"
                >
                  <Image src={t.image.src} alt={t.image.alt} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" className="-z-10 object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(11_34_56/0.15)_0%,rgb(11_34_56/0)_35%,rgb(11_34_56/0.92)_100%)]" aria-hidden />

                  <span className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md">
                      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        {tripIcons[t.icon]}
                      </svg>
                    </span>
                    {pkg && (
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-900">
                        {pkg.nights}N / {pkg.days}D
                      </span>
                    )}
                  </span>

                  <span className="mt-auto">
                    <span className="block font-display text-[1.7rem] leading-tight">{t.title}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-white/80">{t.text}</span>
                    <span className="mt-5 flex items-center justify-between border-t border-white/20 pt-4 text-sm font-bold">
                      <span>Explore trips</span>
                      <span className="flex size-9 items-center justify-center rounded-full bg-lime-400 text-brand-900 transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowIcon />
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ABOUT */}
      <section className="container-x grid gap-14 pb-10 pt-20 lg:grid-cols-2 lg:items-center lg:pb-12 lg:pt-28">
        <div className="relative pb-10 pr-10">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image src={images.uGulmargGondola.src} alt={images.gulmargSnow.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 w-1/2 overflow-hidden rounded-3xl border-[6px] border-paper">
            <Image src={images.uDalHouseboats.src} alt={images.dalLakeSunset.alt} width={480} height={317} sizes="(min-width: 1024px) 260px, 50vw" className="h-auto w-full" />
          </div>
          <div className="absolute left-5 top-5 flex items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-lg">
            <Image src={business.logo.src} alt="" width={52} height={52} sizes="52px" quality={85} className="rounded-full" />
            <span className="text-sm leading-tight">
              <span className="block font-bold text-brand-900">Local team</span>
              <span className="text-ink-soft">Wahipora, Tangmarg</span>
            </span>
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="About Shiny Adventures"
            title="A Kashmir travel agency rooted near Gulmarg"
            intro="Shiny Adventures Kashmir is based in Wahipora, Tangmarg – on the road up to Gulmarg. We plan trips across the valley for families, couples and groups."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Hotels & houseboats", "Private cabs & sightseeing", "Honeymoon & family trips", "Gulmarg snow trips", "Offbeat valleys", "Custom itineraries"].map((s) => (
              <li key={s} className="flex items-center gap-2.5 font-semibold text-ink">
                <span className="flex size-6 items-center justify-center rounded-full bg-lime-400 text-brand-900">
                  <CheckIcon className="size-3.5" />
                </span>
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/about" className="btn btn-primary">
              More about us <ArrowIcon />
            </Link>
            <a href={`tel:${business.phones[0].e164}`} className="flex items-center gap-3" {...trackAttrs("phone_click", "home-about")}>
              <span className="flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <PhoneIcon />
              </span>
              <span className="leading-tight">
                <span className="block text-xs text-ink-soft">Call {business.contactPerson}</span>
                <span className="font-bold text-brand-900">{business.phones[0].display}</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* CITIES – sliding cards linking to every city guide */}
      <section className="overflow-hidden bg-[linear-gradient(180deg,var(--color-paper)_0%,var(--color-brand-50)_45%,var(--color-paper)_100%)] pb-20 pt-8 lg:pb-24 lg:pt-8" aria-labelledby="cities-heading">
        <div className="container-x flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="cities-heading"
            eyebrow="Explore by city"
            title="Places to visit in Kashmir"
            intro={`${destinations.length} handpicked places across central, north and south Kashmir – tap any city for its full travel guide.`}
          />
          <Link href="/destinations" className="btn btn-outline shrink-0 self-start md:self-auto text-brand-800">
            All destinations <ArrowIcon />
          </Link>
        </div>

        <div className="group/marquee relative mt-10 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex w-max animate-[marquee_70s_linear_infinite] py-3 group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex gap-5 pr-5" aria-hidden={copy === 1 ? true : undefined}>
                {destinations.map((d) => {
                  const img = images[d.image];
                  const region = regions.find((r) => r.id === d.region)!;
                  const dot = d.region === "central" ? "bg-brand-500" : d.region === "north" ? "bg-lime-400" : "bg-sunset-400";
                  return (
                    <li key={d.slug} className="w-56 shrink-0 sm:w-60">
                      <Link
                        href={`/destinations/${d.slug}`}
                        tabIndex={copy === 1 ? -1 : undefined}
                        className="group block rounded-[1.75rem] bg-white p-2.5 shadow-[0_18px_40px_-28px_rgb(11_34_56/0.55)] ring-1 ring-line transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-28px_rgb(11_34_56/0.6)]"
                      >
                        <span className="relative block aspect-[4/3] overflow-hidden rounded-[1.25rem]">
                          <Image src={img.src} alt={copy === 1 ? "" : img.alt} fill sizes="240px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                          <span className="absolute inset-0 bg-gradient-to-t from-brand-900/35 via-transparent to-transparent" aria-hidden />
                          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-brand-900 backdrop-blur">
                            <span className={`size-1.5 rounded-full ${dot}`} aria-hidden />
                            {region.name}
                          </span>
                        </span>
                        <span className="flex items-center justify-between gap-3 px-2 pb-1 pt-3">
                          <span className="min-w-0">
                            <span className="block truncate font-display text-xl leading-tight text-brand-900">{d.name}</span>
                            <span className="mt-1 block truncate text-xs text-ink-soft">{d.tagline}</span>
                          </span>
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white">
                            <ArrowIcon />
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="bg-sand py-20 lg:py-28" aria-labelledby="packages-heading">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              id="packages-heading"
              eyebrow="Popular packages"
              title="Kashmir tour packages"
              intro="Sample itineraries you can change to fit your dates. Prices are quoted on request for your exact plan."
            />
            <Link href="/packages" className="btn btn-outline shrink-0 text-brand-800">
              View all packages
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((p) => (
              <PackageCard key={p.slug} pkg={p} />
            ))}
            <Link
              href={enquiryHref()}
              className="flex flex-col justify-between rounded-3xl bg-brand-700 p-8 text-white transition-colors hover:bg-brand-800"
              {...trackAttrs("package_enquiry_click", "home-custom-card")}
            >
              <span className="font-display text-3xl leading-tight">Want something different?</span>
              <span className="mt-4 text-white/80">Tell us your dates and wishlist and we will build a customised Kashmir tour package for you.</span>
              <span className="mt-8 inline-flex items-center gap-2 font-bold text-lime-400">
                Build my custom trip <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* DESTINATIONS – bento grid */}
      <section className="container-x py-20 lg:py-28" aria-labelledby="destinations-heading">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="destinations-heading"
            eyebrow="Top destinations"
            title="Where to go in Kashmir"
            intro="From the lakes of Srinagar to the log villages of Gurez – each place has its own season and pace."
          />
          <Link href="/destinations" className="btn btn-outline shrink-0 text-brand-800">
            All destinations
          </Link>
        </div>
        <div className="mt-12 grid auto-rows-[15rem] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[17rem]">
          {destinations.slice(0, 6).map((d, i) => (
            <DestinationCard
              key={d.slug}
              destination={d}
              className={i === 0 ? "sm:col-span-2 lg:row-span-2" : i === 3 || i === 4 ? "lg:col-span-2" : i === 5 ? "sm:col-span-2" : ""}
            />
          ))}
        </div>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {regions.map((r) => {
            const places = destinations.filter((d) => d.region === r.id);
            return (
              <li key={r.id}>
                <Link href={`/destinations#${r.id}`} className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition-colors hover:border-brand-200">
                  <span className="flex items-center justify-between">
                    <span className="font-display text-xl text-brand-900">{r.name}</span>
                    <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">{places.length} places</span>
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-ink-soft">{places.map((p) => p.name).join(" · ")}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 group-hover:text-brand-800">
                    Explore {r.name} <ArrowIcon />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* WHY US */}
      <section className="relative isolate overflow-hidden bg-brand-900 py-20 text-white lg:py-28" aria-labelledby="why-heading">
        <Image src={images.uKashmirPeaks.src} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-20" />
        <Snowfall />
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <SectionHeading
            id="why-heading"
            tone="dark"
            eyebrow="Why travel with us"
            title="Kashmir trip planning, done locally"
            intro="We plan from inside the valley, keep routes realistic and stay reachable."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <div key={r.title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
                <span className="font-display text-4xl text-lime-400">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-white/75">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container-x py-20 lg:py-28" aria-labelledby="process-heading">
        <SectionHeading id="process-heading" eyebrow="How it works" title="Plan your Kashmir trip in 4 easy steps" align="center" intro="Requesting a quotation is free and there is no obligation to book." />
        <ol className="relative mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <span className="absolute left-[12%] right-[12%] top-8 hidden border-t-2 border-dashed border-brand-200 lg:block" aria-hidden />
          {steps.map((s, i) => (
            <li key={s.title} className="relative text-center">
              <span className="relative mx-auto flex size-16 items-center justify-center rounded-full border-4 border-paper bg-brand-700 font-display text-2xl text-white shadow-lg">
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-brand-900">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs leading-relaxed text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* SEASONS */}
      <section className="bg-brand-50 py-20 lg:py-28" aria-labelledby="seasons-heading">
        <div className="container-x">
          <SectionHeading id="seasons-heading" eyebrow="Best time to visit" title="Kashmir through the seasons" intro="No single best month – it depends on whether you want snow, flowers or green meadows." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {seasons.map((s) => (
              <article key={s.name} className="overflow-hidden rounded-3xl bg-white">
                <div className="relative aspect-[16/10]">
                  <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-sunset-700">{s.months}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-2xl font-medium text-brand-900">{s.name}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="container-x py-20 lg:py-28" aria-labelledby="gallery-heading">
        <SectionHeading id="gallery-heading" eyebrow="Gallery" title="Glimpses of Kashmir" align="center" />
        <div className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] lg:grid-cols-4">
          {gallery.map((g, i) => (
            <figure key={g.src} className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
              <Image src={g.src} alt={g.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </figure>
          ))}
        </div>
      </section>

      <CtaBand
        source="home-cta"
        title="Ready to plan your Kashmir trip?"
        text="Share your travel month, number of travellers and the places you have in mind. We will reply with an itinerary and quotation."
      />
    </>
  );
}
