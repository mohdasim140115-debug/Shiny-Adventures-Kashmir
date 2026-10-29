"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { SiteImage } from "@/data/images";

/**
 * Cross-fading background slideshow. The first slide is preloaded for LCP; the rest load
 * lazily. Pauses for visitors who prefer reduced motion.
 */
export function HeroSlider({ slides, captions, interval = 6000 }: { slides: SiteImage[]; captions: string[]; interval?: number }) {
  const [active, setActive] = useState(0);

  // Restarts whenever the slide changes, so a manual pick gets the full interval on screen.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % slides.length), interval);
    return () => window.clearTimeout(id);
  }, [active, slides.length, interval]);

  return (
    <>
      {slides.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          alt={i === 0 ? s.alt : ""}
          aria-hidden={i === 0 ? undefined : true}
          fill
          preload={i === 0}
          loading={i === 0 ? undefined : "lazy"}
          quality={75}
          sizes="100vw"
          className={`-z-20 object-cover transition-opacity duration-[1600ms] ease-out ${i === active ? "opacity-100" : "opacity-0"} ${
            i === active ? "animate-[kenburns_9s_ease-out_both]" : ""
          }`}
        />
      ))}
      <div className="absolute bottom-6 right-4 z-10 hidden items-center gap-3 sm:right-8 lg:flex lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:flex-col">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}: ${captions[i]}`}
            aria-pressed={i === active}
            className={`rounded-full transition-all ${i === active ? "h-2.5 w-8 bg-lime-400 lg:h-8 lg:w-2.5" : "size-2.5 bg-white/60 hover:bg-white"}`}
          />
        ))}
      </div>
      <p className="absolute bottom-36 right-8 z-10 hidden text-xs font-semibold uppercase tracking-[0.2em] text-white/70 sm:left-8 lg:block" aria-live="polite">
        {captions[active]}
      </p>
    </>
  );
}
