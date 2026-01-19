import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/media", label: "Media" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/LogotypeWhite.png"
            alt="Bålder Quartet"
            width={150}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-white/80">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/shop"
            className="rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-black transition hover:bg-amber-400"
          >
            Buy Scores
          </Link>
        </nav>
      </div>
    </header>
  );
}
