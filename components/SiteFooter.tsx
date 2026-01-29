import Link from "next/link";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/media", label: "Media" },
];

const socials = [
  {
    href: "https://www.youtube.com/",
    label: "YouTube",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-white">
        <path d="M21.8 8.001a2.74 2.74 0 0 0-1.93-1.94C18.07 5.7 12 5.7 12 5.7s-6.07 0-7.87.36A2.74 2.74 0 0 0 2.2 8.001 28.6 28.6 0 0 0 1.8 12a28.6 28.6 0 0 0 .4 3.999 2.74 2.74 0 0 0 1.93 1.94C5.93 18.3 12 18.3 12 18.3s6.07 0 7.87-.36a2.74 2.74 0 0 0 1.93-1.94A28.6 28.6 0 0 0 22.2 12a28.6 28.6 0 0 0-.4-3.999ZM10 15V9l5 3-5 3Z" />
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/",
    label: "Facebook",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-white">
        <path d="M13.5 9H15V6.5h-1.5C11.57 6.5 11 7.57 11 9v1.5H9V13h2V19h2.5v-6h1.75L16.5 10.5H13.5V9Z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-white">
        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 2.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5ZM16.75 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
      </svg>
    ),
  },
  {
    href: "https://www.spotify.com/",
    label: "Spotify",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-white">
        <path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm4.41 14.6a.75.75 0 0 1-1.03.24 8.7 8.7 0 0 0-7.76-.46.75.75 0 1 1-.6-1.38 10.2 10.2 0 0 1 9.12.53.75.75 0 0 1 .27 1.07Zm.99-2.52a.9.9 0 0 1-1.22.3 10.9 10.9 0 0 0-9.6-.55.9.9 0 0 1-.64-1.68 12.8 12.8 0 0 1 11.27.65.9.9 0 0 1 .19 1.28Zm.12-2.64a1 1 0 0 1-1.37.32 12.7 12.7 0 0 0-10.4-.6 1 1 0 0 1-.66-1.9 14.7 14.7 0 0 1 12.06.7 1 1 0 0 1 .37 1.48Z" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/",
    label: "TikTok",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-white">
        <path d="M17.5 6.25a4 4 0 0 1-3.25-3.3V2h-3v13a2 2 0 1 1-2-2c.35 0 .69.07 1 .21V10.1a5 5 0 1 0 4 4.9V9.13a7 7 0 0 0 4.25 1.42v-3a4 4 0 0 1-1-.3Z" />
      </svg>
    ),
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/80 text-white/80">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 text-sm lg:grid-cols-[1fr_1.2fr] lg:px-6">
        <div className="flex flex-col gap-2 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Explore</p>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md border border-white/15 px-4 py-2 text-sm font-semibold transition hover:border-white/35 hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Follow</p>
          <div className="flex flex-wrap justify-start gap-2 lg:justify-end">
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition hover:border-white/40 hover:bg-white/10"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <p className="text-xs text-white/50 lg:text-right">
            © {new Date().getFullYear()} Quartet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
