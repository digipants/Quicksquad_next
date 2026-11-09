"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, PhoneCall, X } from "lucide-react";
import { useEffect, useState } from "react";

const navigation = [
  { href: "/services#categories", label: "Help Topics", pathname: "/services" },
  { href: "/dashprotection", label: "Device Care", pathname: "/dashprotection" },
  { href: "/pricing", label: "Pricing", pathname: "/pricing" },
  { href: "/about", label: "About", pathname: "/about" },
  { href: "/contact", label: "Contact", pathname: "/contact" },
] as const;

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 text-[#0B2540] shadow-sm shadow-slate-900/5 backdrop-blur">
      <div className="mx-auto flex min-h-[72px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 xl:px-8 2xl:px-10">
        <Link href="/" onClick={() => setOpen(false)} className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974] focus-visible:ring-offset-2" aria-label="ResolveUS home">
          <Image src="/images/resolve-us-logo.svg" alt="ResolveUS" width={280} height={56} priority className="h-auto w-[180px] sm:w-[210px] 2xl:w-[230px]" />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex 2xl:gap-6" aria-label="Primary navigation">
          {navigation.map((item) => {
            const active = pathname === item.pathname;
            return (
              <Link
                key={item.pathname}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={"border-b-2 py-2 text-sm font-semibold transition-colors hover:text-[#0C7974] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974] focus-visible:ring-offset-2 2xl:text-[15px] " + (active ? "border-[#0C7974] text-[#0C7974]" : "border-transparent text-[#091D35]")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <a href="tel:+18332162311" className="hidden items-center gap-2 rounded-full border border-[#0C7974] px-3 py-2 text-sm font-bold text-[#0B2540] transition hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974] 2xl:inline-flex">
            <PhoneCall size={17} aria-hidden="true" /> (833) 216-2311
          </a>
          <Link href="/contact#consultation-form" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0C7974] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#096761] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974] focus-visible:ring-offset-2">
            Get Consultation
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="rounded-lg p-2 text-[#0B2540] transition hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974] focus-visible:ring-offset-2 xl:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="border-t border-slate-200 bg-white px-4 py-3 shadow-lg xl:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.pathname}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === item.pathname ? "page" : undefined}
                className={"rounded-lg px-3 py-3.5 font-semibold transition-colors hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974] " + (pathname === item.pathname ? "bg-teal-50 text-[#0C7974]" : "text-[#0B2540]")}
              >
                {item.label}
              </Link>
            ))}
            <a href="tel:+18332162311" className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#0C7974] px-4 py-3 text-center font-semibold text-[#0B2540] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974]">
              <PhoneCall size={18} aria-hidden="true" /> (833) 216-2311
            </a>
            <Link href="/contact#consultation-form" onClick={() => setOpen(false)} className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-[#0C7974] px-4 py-3 text-center font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974] focus-visible:ring-offset-2">
              Get Consultation
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
