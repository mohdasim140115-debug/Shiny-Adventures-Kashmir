import Image from "next/image";
import Link from "next/link";
import type { SiteImage } from "@/data/images";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "./json-ld";
import { Snowfall } from "./snowfall";

/** Inner-page hero with visible breadcrumbs and matching BreadcrumbList JSON-LD. */
export function PageHero({ title, intro, image, crumbs, eyebrow, children }: {
  children?: React.ReactNode;
  title: string;
  intro: string;
  image: SiteImage;
  eyebrow: string;
  crumbs: { name: string; path: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-900 text-white">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        preload
        sizes="100vw"
        quality={70}
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(11_34_56/0.92)_10%,rgb(11_34_56/0.55)_60%,rgb(11_34_56/0.25))]" />
      <Snowfall />
      <div className="container-x py-20 sm:py-28 lg:py-32">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-white/75">
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-white">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="hover:text-white">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-lime-400">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl leading-[1.08] font-medium sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{intro}</p>
        {children}
      </div>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </section>
  );
}
