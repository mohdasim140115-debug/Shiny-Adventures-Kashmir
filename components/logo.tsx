import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/site";

/**
 * The official logo artwork, used unaltered. It is a self-contained white badge with
 * transparent corners, so it reads on both light and dark backgrounds without a container.
 */
export function Logo({ size = 64, eager = false, withWordmark = true, inverted = false }: {
  size?: number;
  eager?: boolean;
  withWordmark?: boolean;
  inverted?: boolean;
}) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={`${business.name} – home`}>
      <Image
        src={business.logo.src}
        width={size}
        height={size}
        alt={business.logo.alt}
        loading={eager ? "eager" : "lazy"}
        quality={85}
        sizes={`${size}px`}
        className="shrink-0 rounded-full drop-shadow-sm"
        style={{ width: size, height: size }}
      />
      {withWordmark && (
        <span className="leading-tight">
          <span className={`block font-display text-[1.15rem] font-semibold ${inverted ? "text-white" : "text-brand-900"}`}>
            Shiny Adventures
          </span>
          <span className={`block text-[0.68rem] font-bold uppercase tracking-[0.22em] ${inverted ? "text-lime-400" : "text-brand-700"}`}>
            Kashmir
          </span>
        </span>
      )}
    </Link>
  );
}
