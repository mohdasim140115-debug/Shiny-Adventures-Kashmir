"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { destinations } from "@/data/destinations";
import { images } from "@/data/images";
import { track } from "@/lib/analytics";
import { business, whatsappLink } from "@/lib/site";
import { CheckIcon, MailIcon, WhatsAppIcon } from "./icons";

const STORAGE_KEY = "sak-enquiry-popup-dismissed";
const HIDE_FOR_MS = 24 * 60 * 60 * 1000; // once closed, stay hidden for a day
const DELAY_MS = 1500;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function wasDismissedRecently() {
  try {
    const at = Number(localStorage.getItem(STORAGE_KEY));
    return Boolean(at) && Date.now() - at < HIDE_FOR_MS;
  } catch {
    return false;
  }
}

function rememberDismissal() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* storage unavailable – popup simply may show again */
  }
}

/** Enquiry form shown shortly after the site opens. No data is stored by the website. */
export function EnquiryPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pathname === "/contact" || wasDismissedRecently()) return;
    const id = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    firstFieldRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && dialogRef.current) {
        // keep keyboard focus inside the dialog
        const items = dialogRef.current.querySelectorAll<HTMLElement>("a, button, input, select, textarea");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [open]);

  function close() {
    rememberDismissal();
    setOpen(false);
  }

  function submit(form: HTMLFormElement, method: "whatsapp" | "email") {
    if (!form.reportValidity()) {
      setError("Please enter your name and phone number.");
      return;
    }
    setError("");
    const f = new FormData(form);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const place = destinations.find((d) => d.slug === v("destination"));
    const text = [
      `Hello ${business.name}, I would like a quotation.`,
      `Name: ${v("name")}`,
      `Phone: ${v("phone")}`,
      `Destination: ${place ? place.name : "All of Kashmir / not sure yet"}`,
      v("month") && `Travel month: ${v("month")}`,
      `Travellers: ${v("adults") || "2"}`,
    ]
      .filter(Boolean)
      .join("\n");
    track("contact_form_submit", { method, label: "popup" });
    if (method === "whatsapp") {
      window.open(whatsappLink(text), "_blank", "noopener");
    } else {
      window.location.href = `mailto:${business.emails[0]}?subject=${encodeURIComponent("Kashmir tour quotation request")}&body=${encodeURIComponent(text)}`;
    }
    close();
  }

  if (!open) return null;

  const field =
    "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[0.95rem] text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
  const label = "mb-1 block text-xs font-semibold text-ink";
  const photo = images.heroShikaraSunset;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-brand-900/60 p-0 backdrop-blur-sm animate-[rise_0.4s_ease-out] sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        className="relative grid max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl md:grid-cols-[0.9fr_1.1fr]"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close enquiry form"
          className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 text-ink shadow hover:bg-white"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="relative hidden min-h-full overflow-hidden md:block">
          <Image src={photo.src} alt="" fill sizes="320px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/30 to-transparent" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="font-display text-2xl leading-tight">Your Kashmir trip, planned locally</p>
            <ul className="mt-4 space-y-2 text-sm text-white/90">
              {["Free, no-obligation quote", "Customised itinerary", "Reply on WhatsApp"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="flex size-5 items-center justify-center rounded-full bg-lime-400 text-brand-900">
                    <CheckIcon className="size-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="eyebrow">Free quotation</p>
          <h2 id="popup-title" className="mt-2 text-2xl font-semibold tracking-tight text-brand-900 sm:text-[1.75rem]">
            Plan your Kashmir holiday
          </h2>
          <p className="mt-1.5 text-sm text-ink-soft">Share a few details and we will send you an itinerary and price.</p>

          <form
            className="mt-5 grid grid-cols-2 gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              submit(e.currentTarget, "whatsapp");
            }}
          >
            <div className="col-span-2">
              <label htmlFor="pp-name" className={label}>Your name *</label>
              <input ref={firstFieldRef} id="pp-name" name="name" required autoComplete="name" className={field} />
            </div>
            <div className="col-span-2">
              <label htmlFor="pp-phone" className={label}>Phone / WhatsApp *</label>
              <input id="pp-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={field} />
            </div>
            <div>
              <label htmlFor="pp-month" className={label}>Travel month</label>
              <select id="pp-month" name="month" defaultValue="" className={field}>
                <option value="">Not sure</option>
                {months.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pp-adults" className={label}>Travellers</label>
              <select id="pp-adults" name="adults" defaultValue="2" className={field}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "person" : "people"}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label htmlFor="pp-destination" className={label}>Where would you like to go?</label>
              <select id="pp-destination" name="destination" defaultValue="" className={field}>
                <option value="">All of Kashmir / not sure yet</option>
                {destinations.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            {error && (
              <p role="alert" className="col-span-2 text-sm font-semibold text-sunset-700">
                {error}
              </p>
            )}
            <button type="submit" className="btn col-span-2 mt-1 bg-[#1f9d55] text-white hover:bg-[#198447]">
              <WhatsAppIcon /> Get my free quote
            </button>
            <button type="button" onClick={(e) => submit(e.currentTarget.form!, "email")} className="col-span-2 inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800">
              <MailIcon className="size-4" /> Send by email instead
            </button>
          </form>
          <p className="mt-4 text-center text-[0.7rem] text-ink-soft">Your details open in WhatsApp or email for you to review. This website does not store them.</p>
        </div>
      </div>
    </div>
  );
}
