import Image from "next/image";
import Link from "next/link";
import { ContactList } from "@/components/contact-list";
import { CheckIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { CtaBand, SectionHeading } from "@/components/sections";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Us | Kashmir Tour Operator in Tangmarg, Gulmarg",
  description:
    "Shiny Adventures Kashmir is a tour operator in Wahipora, Tangmarg, near Gulmarg. Meet Tariq Ahmad Khan and see how we plan customised Kashmir trips.",
  path: "/about",
});

const services = [
  "Customised Kashmir tour packages",
  "Hotel and houseboat arrangements",
  "Private vehicle transfers and sightseeing",
  "Honeymoon and family itineraries",
  "Gulmarg snow and winter trips",
  "Offbeat trips to Doodhpathri and Gurez Valley",
];

const approach = [
  { title: "Your plan, not a template", text: "We start from your dates, group and interests, and use our sample packages only as a reference point." },
  { title: "Realistic routes", text: "Drive times in the mountains are longer than maps suggest. We plan sensible daily distances and fewer hotel changes where possible." },
  { title: "Clear quotations", text: "Your quotation states what is included and what is paid locally, so there are no surprises on the trip." },
  { title: "Season-aware planning", text: "Snow, road closures and local advisories affect some routes. We check conditions and suggest alternatives when needed." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A Kashmir tour operator based in Tangmarg, near Gulmarg"
        intro={`${business.name} plans customised holidays across the Kashmir valley from our base in Wahipora, Tangmarg.`}
        image={images.uKashmirRiver}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <section className="container-x grid gap-14 py-20 lg:grid-cols-[1.3fr_1fr] lg:py-28">
        <div>
          <SectionHeading eyebrow="Who we are" title="Local trip planning for Kashmir travellers" />
          <div className="prose-copy mt-6 text-lg leading-relaxed text-ink-soft">
            <p>
              {business.name} is a travel agency located in Wahipora, Tangmarg – the town on the road up to Gulmarg. Our contact person, {business.contactPerson}, handles enquiries and trip planning directly, so you speak with the person arranging your holiday.
            </p>
            <p>
              We plan trips to <Link href="/destinations/srinagar" className="font-semibold text-brand-700 hover:underline">Srinagar</Link>,{" "}
              <Link href="/destinations/gulmarg" className="font-semibold text-brand-700 hover:underline">Gulmarg</Link>,{" "}
              <Link href="/destinations/pahalgam" className="font-semibold text-brand-700 hover:underline">Pahalgam</Link>,{" "}
              <Link href="/destinations/sonamarg" className="font-semibold text-brand-700 hover:underline">Sonamarg</Link>,{" "}
              <Link href="/destinations/doodhpathri" className="font-semibold text-brand-700 hover:underline">Doodhpathri</Link> and{" "}
              <Link href="/destinations/gurez-valley" className="font-semibold text-brand-700 hover:underline">Gurez Valley</Link>, for couples, families and groups.
            </p>
          </div>

          <h2 className="mt-14 text-3xl font-medium text-brand-900">What we arrange</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s} className="flex gap-3 rounded-xl border border-line bg-white p-4 text-ink">
                <CheckIcon className="mt-0.5 size-5 shrink-0 text-lime-600" /> {s}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-ink-soft">
            See sample itineraries on our <Link href="/packages" className="font-semibold text-brand-700 hover:underline">Kashmir tour packages</Link> page.
          </p>
        </div>

        <aside className="h-fit rounded-3xl border border-line bg-white p-8">
          <Image src={business.logo.src} alt={business.logo.alt} width={160} height={160} sizes="160px" quality={85} className="rounded-full" />
          <h2 className="mt-6 text-2xl font-medium text-brand-900">Contact details</h2>
          <ContactList source="about" className="mt-4 text-ink-soft" />
        </aside>
      </section>

      <section className="bg-brand-50 py-20 lg:py-28" aria-labelledby="approach-heading">
        <div className="container-x">
          <SectionHeading id="approach-heading" eyebrow="Our approach" title="How we plan Kashmir trips" align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {approach.map((a) => (
              <div key={a.title} className="rounded-2xl border border-brand-100 bg-white p-6">
                <span className="block h-1 w-10 rounded bg-sunset-400" aria-hidden />
                <h3 className="mt-5 text-xl font-semibold text-brand-900">{a.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="photo-credits" className="container-x py-20" aria-labelledby="credits-heading">
        <h2 id="credits-heading" className="text-2xl font-medium text-brand-900">
          Photo credits
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-ink-soft">
          Destination photographs on this website are from Unsplash and Wikimedia Commons and are used under the licences listed below. Images were resized for the web.
        </p>
        <ul className="mt-6 grid gap-2 text-sm text-ink-soft md:grid-cols-2">
          {Object.values(images)
            .filter((img) => img.credit.licenseUrl)
            .map((img) => (
            <li key={img.src}>
              <a href={img.credit.source} rel="noopener" target="_blank" className="text-brand-700 hover:underline">
                {img.alt.split(",")[0].split(" with ")[0]}
              </a>{" "}
              – {img.credit.author},{" "}
              <a href={img.credit.licenseUrl} rel="license noopener" target="_blank" className="hover:underline">
                {img.credit.license}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        source="about-cta"
        title="Talk to us about your Kashmir trip"
        text={`Call or message ${business.contactPerson} with your travel dates and we will help you plan the route.`}
      />
    </>
  );
}
