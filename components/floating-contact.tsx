import { trackAttrs } from "@/lib/analytics";
import { business, whatsappLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./icons";

/** Always-visible WhatsApp and call shortcuts. */
export function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-4 z-30 flex flex-col items-end gap-3 sm:right-6">
      <a
        href={`tel:${business.phones[0].e164}`}
        aria-label={`Call ${business.phones[0].display}`}
        className="flex size-12 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg shadow-brand-900/30 transition-transform hover:scale-105"
        {...trackAttrs("phone_click", "floating")}
      >
        <PhoneIcon className="size-5" />
      </a>
      <a
        href={whatsappLink("Hello Shiny Adventures Kashmir, I would like to plan a Kashmir trip.")}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="flex size-12 items-center justify-center gap-2 rounded-full bg-[#1f9d55] font-bold text-white shadow-lg shadow-black/25 transition-transform hover:scale-105 sm:size-auto sm:py-3 sm:pl-3.5 sm:pr-5"
        {...trackAttrs("whatsapp_click", "floating")}
      >
        <WhatsAppIcon className="size-6" />
        <span className="hidden text-sm sm:inline" aria-hidden>
          WhatsApp
        </span>
      </a>
    </div>
  );
}
