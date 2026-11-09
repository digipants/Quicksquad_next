import Image from "next/image";
import Link from "next/link";
import { PhoneCall } from "lucide-react";

const exploreLinks = [
  { href: "/services#banking", label: "Banking" },
  { href: "/services#technology", label: "Technology" },
  { href: "/services#finance", label: "Finance" },
  { href: "/services#government", label: "Government" },
  { href: "/services#shopping", label: "Shopping" },
  { href: "/services#travel", label: "Travel" },
  { href: "/services#healthcare", label: "Healthcare" },
  { href: "/services#career", label: "Career" },
  { href: "/services#digital-accounts", label: "Digital Accounts" },
  { href: "/dashprotection", label: "Device Care" },
] as const;
const supportLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/contact", label: "Contact Us" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-[#F1FAF8] text-[#0B2540]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="ResolveUS home"><Image src="/images/resolve-us-logo.svg" alt="ResolveUS" width={230} height={46} className="mb-5 h-auto w-48" /></Link>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0C7974]">AI-powered Consultation Platform</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
            Practical everyday guidance, consultation and DashProtection device-care enquiries from ResolveUS.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[#0B2540]">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-600">
            {exploreLinks.map((item) => <li key={item.href}><Link href={item.href} className="rounded-sm transition hover:text-[#0C7974] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974]">{item.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[#0B2540]">Support</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {supportLinks.map((link) => <li key={link.href}><Link className="text-slate-600 transition hover:text-[#0B2540] hover:underline" href={link.href}>{link.label}</Link></li>)}
          </ul>
          <a className="mt-5 flex items-center gap-2 text-lg font-bold text-[#0B2540] hover:text-[#0C7974]" href="tel:+18332162311"><PhoneCall size={18} aria-hidden="true" /> (833) 216-2311</a>
          <a className="mt-5 inline-block text-sm font-medium text-[#0C7974] hover:underline" href="mailto:support@resolve-us.com">support@resolve-us.com</a>
          <p className="mt-2 text-xs text-slate-600">Refund requests and account questions: email support.</p>
          <a className="mt-3 block text-sm font-medium text-[#0C7974] hover:underline" href="/contact#consultation-form">Start a consultation</a>
        </div>
      </div>
      <div className="border-t border-slate-200 px-6 py-5 text-center text-xs text-slate-600">
        © 2026 ResolveUS. All Rights Reserved. <span className="mx-2">·</span> Legal operator: A V Food Factory
      </div>
    </footer>
  );
}
