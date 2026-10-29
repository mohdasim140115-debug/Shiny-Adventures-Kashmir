import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { PackageFilter } from "@/components/package-filter";
import { PageHero } from "@/components/page-hero";
import { CtaBand, enquiryHref, SectionHeading } from "@/components/sections";
import { images } from "@/data/images";
import { trackAttrs } from "@/lib/analytics";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kashmir Tour Packages: Honeymoon, Family & Snow Trips",
  description:
    "Kashmir tour packages with day-by-day itineraries: 5 nights 6 days classic, honeymoon, family, Gulmarg snow and offbeat Gurez trips. Get a free quotation.",
  path: "/packages",
});

const faqs = [
  {
    q: "Can I change a package itinerary?",
    a: "Yes. These itineraries are starting points. You can add or remove nights, swap destinations, choose a houseboat or hotel category, and set the pace that suits your group.",
  },
  {
    q: "Why are prices not shown?",
    a: "The cost depends on travel dates, hotel category, number of travellers and vehicle type, and it changes with the season. We send a written quotation for your exact plan instead of a figure that may not apply.",
  },
  {
    q: "What does a quotation usually cover?",
    a: "Your quotation lists exactly what is included – typically accommodation, private vehicle transfers and sightseeing as per the itinerary, and the meal plan you choose. Items such as flights, gondola tickets, pony rides and local union taxis are usually separate, and we state them clearly.",
  },
  {
    q: "How many days do I need for Kashmir?",
    a: "Five nights and six days covers Srinagar, Gulmarg, Sonamarg and Pahalgam at a comfortable pace. Four nights suits a shorter family trip, and remote areas such as Gurez Valley need at least six nights.",
  },
];

const included = ["Itinerary planned around your dates", "Hotel or houseboat options in your budget", "Private vehicle for transfers and sightseeing", "Clear list of inclusions and exclusions", "Direct phone & WhatsApp contact"];

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Kashmir holiday packages"
        title="Kashmir tour packages you can shape around your trip"
        intro="Sample itineraries for first-time visitors, honeymoon couples, families, snow lovers and offbeat explorers. Pick one as a starting point and we will tailor it to your dates and budget."
        image={images.uGulmargView}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Packages", path: "/packages" },
        ]}
      />

      <section className="container-x py-16 lg:py-20" aria-labelledby="all-packages">
        <h2 id="all-packages" className="sr-only">
          All Kashmir packages
        </h2>
        <PackageFilter />
      </section>

      <section className="container-x pb-20" aria-labelledby="custom-heading">
        <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_50px_-30px_rgb(11_34_56/0.4)] lg:grid-cols-2">
          <div className="relative min-h-72">
            <Image src={images.uDoodhpathriHut.src} alt={images.uDoodhpathriHut.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </div>
          <div className="p-8 sm:p-12">
            <p className="eyebrow">Customised Kashmir tours</p>
            <h2 id="custom-heading" className="mt-3 text-3xl leading-tight font-medium text-brand-900 sm:text-4xl">
              Every package is tailor-made
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">Tell us what matters to you and we will build the trip around it.</p>
            <ul className="mt-6 space-y-3">
              {included.map((i) => (
                <li key={i} className="flex items-center gap-3 text-ink">
                  <span className="flex size-6 items-center justify-center rounded-full bg-lime-400 text-brand-900">
                    <CheckIcon className="size-3.5" />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
            <Link href={enquiryHref()} className="btn btn-primary mt-8" {...trackAttrs("package_enquiry_click", "packages-custom")}>
              Build my custom trip <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-sand py-20 lg:py-28" aria-labelledby="faq-heading">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <SectionHeading id="faq-heading" eyebrow="Before you enquire" title="Common questions about Kashmir packages" intro="Anything else? Ask us on the contact page or by WhatsApp." />
          <div className="divide-y divide-line rounded-3xl border border-line bg-white">
            {faqs.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-brand-900">
                  <h3>{f.q}</h3>
                  <span className="text-2xl text-brand-600 transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand source="packages-cta" title="Don't see the exact trip you want?" text="Tell us your number of nights and the places on your list. We will build a customised Kashmir tour package and send a quotation." />
    </>
  );
}
