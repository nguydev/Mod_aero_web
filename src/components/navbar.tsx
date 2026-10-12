"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import logo from "@/src/assets/logo.svg";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Community", href: "#community" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : false;

  return (
    <>
      <header className="sticky top-0 z-50 border-t border-neutral-900 bg-black">
        <div className="custom-container relative mx-auto flex items-center justify-between px-4 py-3 xl:px-10">
          <Link href="/" className="relative z-10 shrink-0">
            <Image
              src={logo}
              alt="Velocity"
              width={88}
              height={52}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={`whitespace-nowrap text-sm transition-colors ${
                  isActive(href)
                    ? "text-white"
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="relative z-10 flex shrink-0 items-center gap-2.5">
            <div className="hidden items-center gap-2.5 lg:flex">
              <Link
                href="/auth/login"
                className="whitespace-nowrap rounded-md border border-neutral-700 px-4 py-2 text-sm text-white transition-colors hover:border-neutral-500"
              >
                Sign In
              </Link>
              <Link
                href="#"
                className="primary whitespace-nowrap rounded-md border border-current/50 px-4 py-2 text-sm transition-colors hover:border-current"
              >
                Become Event Creator
              </Link>
              <Link
                href="#"
                className="gradient whitespace-nowrap rounded-lg px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Download App
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="text-white lg:hidden cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-black/90 backdrop-blur-2xl transition-transform duration-300 lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-4">
          <Image
            src={logo}
            alt="Velocity"
            width={80}
            height={50}
            className="h-10 w-auto object-contain"
          />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="text-neutral-400 hover:text-white"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-5">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 px-5">
          <Link
            href="/auth/login"
            onClick={() => setMenuOpen(false)}
            className="rounded-md border border-neutral-700 py-2.5 text-center text-sm text-white"
          >
            Sign In
          </Link>
          <Link
            href="#"
            onClick={() => setMenuOpen(false)}
            className="primary rounded-md border border-current/50 py-2.5 text-center text-sm"
          >
            Become Event Creator
          </Link>
          <Link
            href="#"
            onClick={() => setMenuOpen(false)}
            className="gradient rounded-lg py-2.5 text-center text-sm font-semibold text-white"
          >
            Download App
          </Link>
        </div>
      </aside>
    </>
  );
}
