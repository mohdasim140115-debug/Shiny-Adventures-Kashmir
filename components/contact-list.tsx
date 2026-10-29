import { trackAttrs } from "@/lib/analytics";
import { business, whatsappLink } from "@/lib/site";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

/** Name, address, phones and emails – rendered from one source so NAP stays identical everywhere. */
export function ContactList({ tone = "light", source, className = "" }: {
  tone?: "light" | "dark";
  source: string;
  className?: string;
}) {
  const icon = tone === "dark" ? "text-lime-400" : "text-brand-600";
  const link = tone === "dark" ? "hover:text-white" : "hover:text-brand-700";
  return (
    <address className={`not-italic text-sm leading-relaxed ${className}`}>
      <p className={`font-semibold ${tone === "dark" ? "text-white" : "text-ink"}`}>{business.name}</p>
      <p className="mt-1">Contact: {business.contactPerson}</p>
      <ul className="mt-4 space-y-3">
        <li className="flex gap-3">
          <PinIcon className={`mt-0.5 size-5 shrink-0 ${icon}`} />
          <span>{business.address.display}</span>
        </li>
        {business.phones.map((p) => (
          <li key={p.e164} className="flex gap-3">
            <PhoneIcon className={`mt-0.5 size-5 shrink-0 ${icon}`} />
            <a href={`tel:${p.e164}`} className={link} {...trackAttrs("phone_click", source)}>
              {p.display}
            </a>
          </li>
        ))}
        {business.emails.map((e) => (
          <li key={e} className="flex gap-3">
            <MailIcon className={`mt-0.5 size-5 shrink-0 ${icon}`} />
            <a href={`mailto:${e}`} className={`break-all ${link}`} {...trackAttrs("email_click", source)}>
              {e}
            </a>
          </li>
        ))}
        <li className="flex gap-3">
          <WhatsAppIcon className={`mt-0.5 size-5 shrink-0 ${icon}`} />
          <a href={whatsappLink()} target="_blank" rel="noopener" className={link} {...trackAttrs("whatsapp_click", source)}>
            Message us on WhatsApp
          </a>
        </li>
      </ul>
    </address>
  );
}
