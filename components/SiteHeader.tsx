 "use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/media", label: "Media" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 lg:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/LogotypeWhite.png"
            alt="Bålder Quartet"
            width={150}
            height={40}
            className="h-7 w-auto sm:h-8"
            priority
          />
        </Link>
        {/* Desktop nav */}
        <nav className="hidden md:flex flex-wrap items-center gap-2 sm:gap-4 text-sm font-medium text-white/80">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={toggle}
          className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-sm font-semibold text-white transition hover:border-white/40 md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          ☰ 
        </button>
      </div>
      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-sm font-medium text-white/90">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="rounded-md px-3 py-2 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
