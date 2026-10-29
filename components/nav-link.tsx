"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ href, children, onNavigate, block = false }: {
  href: string;
  children: React.ReactNode;
  onNavigate?: () => void;
  block?: boolean;
}) {
  const path = usePathname();
  const active = href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`${block ? "block px-2 py-3 text-lg" : "relative px-3.5 py-2 text-[0.95rem]"} rounded-full font-semibold transition-colors ${
        active ? "text-brand-700" : "text-ink hover:text-brand-700"
      }`}
    >
      {children}
      {active && !block && <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 w-4 rounded bg-sunset-400" aria-hidden />}
    </Link>
  );
}
