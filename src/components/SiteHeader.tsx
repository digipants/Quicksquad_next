"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, PhoneCall, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/dashprotection", label: "DashProtection" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const categories = [
  "Banking", "Technology", "Finance", "Government", "Shopping",
  "Travel", "Healthcare", "Career", "Digital Accounts",
];
const categoryAnchor = (category: string) => category.toLowerCase().replaceAll(" ", "-");

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 text-[#0B2540] shadow-sm shadow-slate-900/5 backdrop-blur">
      <div className="mx-auto flex min-h-[72px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 xl:px-10">
        <Link href="/" className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974]" aria-label="ResolveUS home">
          <Image src="/images/resolve-us-logo.svg" alt="ResolveUS" width={280} height={56} priority className="h-auto w-[194px] sm:w-[230px]" />
        </Link>

        <nav className="hidden items-center gap-3 min-[1366px]:flex" aria-label="Primary navigation">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={`border-b-2 py-2 text-[15px] font-semibold transition-colors hover:text-[#0C7974] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974] ${pathname === "/" ? "border-[#0C7974] text-[#0C7974]" : "border-transparent text-[#091D35]"}`}>Home</Link>
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 rounded-md py-2 text-[15px] font-semibold text-[#091D35] transition-colors hover:text-[#0C7974] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974]">
              Consultation Categories <ChevronDown size={16} className="transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="absolute left-0 top-full z-20 mt-2 grid w-[390px] grid-cols-2 gap-1 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
              {categories.map((category) => (
                <Link key={category} href={`/services#${categoryAnchor(category)}`} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-[#0C7974] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974]">
                  {category}
                </Link>
              ))}
              <Link href="/services#categories" className="col-span-2 rounded-lg px-3 py-2.5 text-sm font-bold text-[#0C7974] hover:bg-teal-50">Explore all categories →</Link>
            </div>
          </details>
          {navigation.slice(1).map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={`rounded-sm border-b-2 py-2 text-[15px] font-semibold transition-colors hover:text-[#0C7974] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974] ${pathname === item.href ? "border-[#0C7974] text-[#0C7974]" : "border-transparent text-[#091D35]"}`}>{item.label}</Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <a href="tel:+18443693312" className="hidden 2xl:inline-flex items-center gap-2 rounded-full border border-[#0C7974] px-4 py-2 text-sm font-bold text-[#0B2540] transition hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974]">
            <PhoneCall size={17} aria-hidden="true" /> (844) 369-3312
          </a>
          <Link href="/contact#consultation-form" className="rounded-full bg-[#0C7974] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#096761] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974] focus-visible:ring-offset-2">Get Consultation</Link>
        </div>

        <button type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation" className="rounded-lg p-2 text-[#0B2540] transition hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974] min-[1366px]:hidden" onClick={() => setOpen((current) => !current)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="border-t border-slate-200 bg-white px-4 py-3 shadow-lg min-[1366px]:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-7xl flex-col">
            <Link href="/services#categories" className="rounded-lg px-3 py-3 font-semibold text-[#0B2540] hover:bg-teal-50">Consultation Categories</Link>
            {navigation.map((item) => <Link key={item.href} href={item.href} className="rounded-lg px-3 py-3 font-medium text-slate-700 hover:bg-teal-50 hover:text-[#0C7974]">{item.label}</Link>)}
            <a href="tel:+18443693312" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-[#0C7974] px-4 py-3 text-center font-semibold text-[#0B2540]"><PhoneCall size={18} aria-hidden="true" /> (844) 369-3312</a>
            <Link href="/contact#consultation-form" className="mt-2 rounded-full bg-[#0C7974] px-4 py-3 text-center font-bold text-white">Get Consultation</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
