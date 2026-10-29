"use client";

import { useState } from "react";
import { categories, packages, type Category } from "@/data/packages";
import { PackageCard } from "./sections";

/** Category tabs over the package grid. All cards are server-rendered in the HTML. */
export function PackageFilter() {
  const [active, setActive] = useState<Category | "All">("All");
  const shown = active === "All" ? packages : packages.filter((p) => p.category === active);

  return (
    <>
      <div role="group" aria-label="Filter packages by trip type" className="flex flex-wrap gap-2">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
              active === c ? "bg-brand-700 text-white" : "border border-line bg-white text-ink hover:border-brand-200 hover:text-brand-700"
            }`}
          >
            {c === "All" ? "All packages" : c}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <PackageCard key={p.slug} pkg={p} />
        ))}
      </div>
    </>
  );
}
