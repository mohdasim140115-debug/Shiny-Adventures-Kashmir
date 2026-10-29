import { business } from "@/lib/site";
import { FacebookIcon, GoogleIcon, InstagramIcon } from "./icons";

const icons = { Google: GoogleIcon, Instagram: InstagramIcon, Facebook: FacebookIcon } as const;

/** Official social profiles as icon buttons. */
export function SocialLinks({ size = "md", className = "" }: { size?: "sm" | "md"; className?: string }) {
  const box = size === "sm" ? "size-7" : "size-10";
  const icon = size === "sm" ? "size-3.5" : "size-[1.15rem]";
  return (
    <ul className={`flex items-center gap-2 ${className}`} aria-label="Social media">
      {business.social.map((s) => {
        const Icon = icons[s.name];
        return (
          <li key={s.name}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener"
              aria-label={s.label}
              title={s.label}
              className={`flex ${box} items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:border-lime-400 hover:bg-lime-400 hover:text-brand-900`}
            >
              <Icon className={icon} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
