"use client";

import { useEffect, useRef, useState } from "react";
import { getDestination } from "@/data/destinations";
import { packages } from "@/data/packages";
import { track } from "@/lib/analytics";
import { business, whatsappLink } from "@/lib/site";
import { MailIcon, WhatsAppIcon } from "./icons";

/**
 * There is no backend: the form composes the enquiry and hands it to WhatsApp or the
 * visitor's email app. Nothing is stored by the website.
 */
export function EnquiryForm() {
  const [pkg, setPkg] = useState("custom");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Prefill from ?package=, ?destination=, ?month=, ?adults= without making the page dynamic.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const slug = q.get("package");
    if (slug && packages.some((p) => p.slug === slug)) setPkg(slug);
    const form = formRef.current;
    if (!form) return;
    const set = (name: string, value: string | null | undefined) => {
      const el = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
      if (el && value) el.value = value;
    };
    set("dates", q.get("month"));
    const adults = Number(q.get("adults"));
    if (adults >= 1 && adults <= 60) set("adults", String(adults));
    const dest = getDestination(q.get("destination") ?? "");
    if (dest) set("message", `I would like to include ${dest.name} in my trip.`);
  }, []);

  function compose(form: HTMLFormElement) {
    const f = new FormData(form);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const chosen = packages.find((p) => p.slug === v("package"));
    return [
      `Hello ${business.name}, I would like a quotation.`,
      `Name: ${v("name")}`,
      `Phone: ${v("phone")}`,
      v("email") && `Email: ${v("email")}`,
      `Package: ${chosen ? chosen.name : "Custom / not sure yet"}`,
      v("dates") && `Travel dates: ${v("dates")}`,
      v("nights") && `Nights: ${v("nights")}`,
      `Travellers: ${v("adults") || "?"} adults, ${v("children") || "0"} children`,
      v("message") && `Notes: ${v("message")}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  function submit(form: HTMLFormElement, method: "whatsapp" | "email") {
    if (!form.reportValidity()) {
      setError("Please fill in your name and phone number.");
      return;
    }
    setError("");
    const text = compose(form);
    track("contact_form_submit", { method, package: String(new FormData(form).get("package")) });
    if (method === "whatsapp") {
      window.open(whatsappLink(text), "_blank", "noopener");
    } else {
      window.location.href = `mailto:${business.emails[0]}?subject=${encodeURIComponent("Kashmir tour quotation request")}&body=${encodeURIComponent(text)}`;
    }
  }

  const field = "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
  const label = "text-sm font-semibold text-ink";

  return (
    <form
      ref={formRef}
      className="grid gap-5 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        submit(e.currentTarget, "whatsapp");
      }}
    >
      <div>
        <label htmlFor="name" className={label}>Your name *</label>
        <input id="name" name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="phone" className={label}>Phone / WhatsApp *</label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={field} />
      </div>
      <div>
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" name="email" type="email" autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="package" className={label}>Package of interest</label>
        <select id="package" name="package" value={pkg} onChange={(e) => setPkg(e.target.value)} className={field}>
          <option value="custom">Custom trip / not sure yet</option>
          {packages.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name} ({p.nights}N/{p.days}D)
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="dates" className={label}>Travel dates or month</label>
        <input id="dates" name="dates" placeholder="e.g. 10–15 May" className={field} />
      </div>
      <div>
        <label htmlFor="nights" className={label}>Number of nights</label>
        <input id="nights" name="nights" type="number" min={1} max={30} inputMode="numeric" className={field} />
      </div>
      <div>
        <label htmlFor="adults" className={label}>Adults</label>
        <input id="adults" name="adults" type="number" min={1} max={60} defaultValue={2} inputMode="numeric" className={field} />
      </div>
      <div>
        <label htmlFor="children" className={label}>Children</label>
        <input id="children" name="children" type="number" min={0} max={30} defaultValue={0} inputMode="numeric" className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>Anything else we should know?</label>
        <textarea id="message" name="message" rows={4} placeholder="Hotel category, places you'd like to include, special occasions…" className={field} />
      </div>
      {error && (
        <p role="alert" className="text-sm font-semibold text-sunset-700 sm:col-span-2">
          {error}
        </p>
      )}
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
        <button type="submit" className="btn btn-primary">
          <WhatsAppIcon /> Send via WhatsApp
        </button>
        <button type="button" className="btn btn-outline text-brand-800" onClick={(e) => submit(e.currentTarget.form!, "email")}>
          <MailIcon /> Send by email instead
        </button>
      </div>
      <p className="text-xs leading-relaxed text-ink-soft sm:col-span-2">
        Your details open in WhatsApp or your email app so you can review them before sending. This website does not store the information you enter.
      </p>
    </form>
  );
}
