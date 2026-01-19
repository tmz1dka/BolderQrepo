import Link from "next/link";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/media", label: "Media" },
];

const socials = [
  { href: "https://www.youtube.com/", label: "YouTube" },
  { href: "https://www.facebook.com/", label: "Facebook" },
  { href: "https://www.instagram.com/", label: "Instagram" },
  { href: "https://www.spotify.com/", label: "Spotify" },
  { href: "https://www.tiktok.com/", label: "TikTok" },
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
          <div className="flex flex-wrap justify-start gap-3 text-white lg:justify-end">
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold transition hover:border-white/40 hover:bg-white/5"
              >
                {s.label}
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
