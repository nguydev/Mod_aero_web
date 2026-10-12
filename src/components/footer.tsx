import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "@/src/assets/logo.svg";

const socials = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaXTwitter, href: "#", label: "X" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-black text-neutral-400">
      <div className="custom-container mx-auto px-4 py-16 xl:px-0">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="mb-6">
            <Image
              src={logo}
              alt="Velocity"
              width={130}
              height={90}
              className="h-auto w-[130px] object-contain"
            />
          </Link>
          <p className="max-w-md text-sm leading-relaxed">
            The ultimate automotive platform for vehicle owners, car clubs,
            and event creators worldwide.
          </p>
          <div className="mt-8 flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-md border border-neutral-800 text-neutral-400 transition-colors hover:border-neutral-600 hover:text-white"
              >
                <Icon className="size-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-neutral-800 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Velocity. All rights reserved.</p>
          <p>Built for drivers. Driven by passion.</p>
        </div>
      </div>
    </footer>
  );
}
