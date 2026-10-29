import { ContactList } from "@/components/contact-list";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/page-hero";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Shiny Adventures Kashmir | Request a Tour Quotation",
  description:
    "Contact Shiny Adventures Kashmir in Tangmarg, Gulmarg. Call +91 6005399813 or +91 9596566858, email, or request a Kashmir tour quotation on WhatsApp.",
  path: "/contact",
});

const steps = [
  "Fill in the form with your dates, group size and the package or places you are interested in.",
  "Send it by WhatsApp or email – you can review the message before it goes.",
  "We reply with a suggested itinerary and a written quotation.",
  "Adjust anything you like, then confirm when the plan is right.",
];

export default function ContactPage() {
  const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address.display)}`;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact us for a Kashmir tour quotation"
        intro={`Speak with ${business.contactPerson} by phone or WhatsApp, send an email, or use the enquiry form below.`}
        image={images.uDalBlue}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <div className="container-x grid gap-12 py-20 lg:grid-cols-[1fr_1.6fr] lg:py-24">
        <aside className="space-y-8">
          <section className="rounded-3xl border border-line bg-white p-8" aria-labelledby="details-heading">
            <h2 id="details-heading" className="text-2xl font-medium text-brand-900">
              Contact details
            </h2>
            <ContactList source="contact-page" className="mt-5 text-ink-soft" />
            <a href={mapsSearch} target="_blank" rel="noopener" className="mt-6 inline-block text-sm font-semibold text-brand-700 hover:underline">
              Search this address on Google Maps
            </a>
          </section>
          <section aria-labelledby="quote-steps-heading">
            <h2 id="quote-steps-heading" className="text-2xl font-medium text-brand-900">
              How to request a quotation
            </h2>
            <ol className="mt-5 space-y-4">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-4 text-ink-soft">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">{i + 1}</span>
                  <span className="pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
          </section>
        </aside>

        <section id="enquiry" aria-labelledby="enquiry-heading" className="rounded-3xl border border-line bg-white p-6 sm:p-10">
          <p className="eyebrow">Free, no-obligation quote</p>
          <h2 id="enquiry-heading" className="mt-3 text-3xl font-medium text-brand-900">
            Send a trip enquiry
          </h2>
          <p className="mt-3 mb-8 text-ink-soft">The more you tell us, the more accurate the itinerary and quotation will be.</p>
          <EnquiryForm />
        </section>
      </div>
    </>
  );
}
