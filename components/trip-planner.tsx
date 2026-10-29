"use client";

import { useRouter } from "next/navigation";
import { destinations } from "@/data/destinations";
import { track } from "@/lib/analytics";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** Quick trip search that hands its answers to the enquiry form on /contact. */
export function TripPlanner() {
  const router = useRouter();
  const field = "w-full rounded-xl border border-line bg-white px-3.5 py-3 text-[0.95rem] text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
  const label = "mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-soft";

  return (
    <form
      className="grid gap-4 rounded-3xl bg-white p-5 shadow-[0_30px_70px_-30px_rgb(11_34_56/0.55)] sm:grid-cols-2 sm:p-6 lg:grid-cols-[1.2fr_1fr_1fr_auto] lg:items-end"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const q = new URLSearchParams();
        for (const k of ["destination", "month", "adults"]) {
          const v = String(f.get(k) ?? "");
          if (v) q.set(k, v);
        }
        track("package_enquiry_click", { label: "trip-planner" });
        router.push(`/contact?${q.toString()}#enquiry`);
      }}
    >
      <div>
        <label htmlFor="tp-destination" className={label}>Where to?</label>
        <select id="tp-destination" name="destination" className={field} defaultValue="">
          <option value="">All of Kashmir</option>
          {destinations.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="tp-month" className={label}>When?</label>
        <select id="tp-month" name="month" className={field} defaultValue="">
          <option value="">Any month</option>
          {months.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="tp-adults" className={label}>Travellers</label>
        <select id="tp-adults" name="adults" className={field} defaultValue="2">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "adult" : "adults"}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary h-[3.1rem] sm:col-span-2 lg:col-span-1">
        Plan my trip
      </button>
    </form>
  );
}
