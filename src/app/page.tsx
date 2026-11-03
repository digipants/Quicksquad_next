"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Building2, CheckCircle2, HeartPulse, Landmark, Laptop, Plane, ShieldCheck, ShoppingBag, UserRoundCog, WalletCards } from "lucide-react";
import services from "./pages/services.js";
import PricingCards from "@/components/PricingCards";

const iconMap = {
  "fa-solid fa-laptop-code": UserRoundCog,
  "fa-solid fa-hand-holding-dollar": Landmark,
  "fa-solid fa-location-dot": Laptop,
  "fa-solid fa-scale-unbalanced-flip": Building2,
  "fa-solid fa-route": Plane,
  "fa-solid fa-cart-shopping": ShoppingBag,
  "fa-solid fa-staff-snake": HeartPulse,
  "fa-solid fa-user-graduate": BriefcaseBusiness,
} as const;

const categoryChips = [
  { label: "Digital Accounts", Icon: Laptop },
  { label: "Travel Planning", Icon: Plane },
  { label: "Banking & Finance Guidance", Icon: WalletCards },
  { label: "Shopping Assistance", Icon: ShoppingBag },
  { label: "Career Guidance", Icon: BriefcaseBusiness },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-white text-[#0B2348]">
      <section className="relative isolate bg-[linear-gradient(115deg,#fff_5%,#f5f9ff_55%,#e9f5ff_100%)]">
        <div className="pointer-events-none absolute -right-48 top-10 -z-10 h-[520px] w-[520px] rounded-full border-[52px] border-[#2585ff]/10" aria-hidden="true" />
        <div className="mx-auto grid min-h-[540px] max-w-[1440px] items-center gap-8 px-5 py-10 sm:px-8 md:grid-cols-[.94fr_1.06fr] md:gap-4 md:px-10 md:py-12">
          <div className="relative z-10 max-w-[610px] py-3 md:py-8">
            <h1 className="text-[clamp(2.65rem,5.25vw,4.65rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-[#101B33]">
              Everyday Questions.<br /><span className="text-[#0755D9]">Clear Solutions.</span>
            </h1>
            <p className="mt-5 max-w-[570px] text-lg leading-[1.55] text-slate-700 sm:text-xl">
              Get practical guidance and consultation for your everyday needs — from digital accounts and technology to travel, financial information, shopping, careers and more.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact#consultation-form" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#0755D9] px-7 text-base font-bold text-white shadow-[0_8px_20px_rgba(7,85,217,.2)] transition hover:-translate-y-0.5 hover:bg-[#0647B7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755D9] focus-visible:ring-offset-2 sm:text-lg">Get Consultation <ArrowRight size={21} aria-hidden="true" /></Link>
              <Link href="#categories" className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-[#0B2348] px-7 text-base font-bold text-[#0B2348] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755D9] sm:text-lg">Explore Categories</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-slate-800 sm:gap-x-9">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="text-[#2585FF]" size={21} aria-hidden="true" /> Practical Guidance</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck className="text-[#2585FF]" size={21} aria-hidden="true" /> Clear Information</span>
              <span className="inline-flex items-center gap-2"><UserRoundCog className="text-[#2585FF]" size={21} aria-hidden="true" /> Human Support</span>
            </div>
          </div>

          <div className="relative mx-auto h-[330px] w-full max-w-[700px] sm:h-[420px] md:h-[470px] lg:h-[500px]">
            <div className="absolute inset-0 overflow-hidden rounded-[32px] bg-blue-100 shadow-[0_24px_60px_rgba(11,35,72,.14)]">
              <Image src="/images/resolve-consultation-hero.webp" alt="A customer reviewing information on a laptop at home" fill priority sizes="(min-width: 768px) 52vw, 100vw" className="object-cover object-[65%_center]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#f5f9ff]/35 via-transparent to-[#cce6ff]/15" aria-hidden="true" />
            </div>
            <div className="absolute left-3 top-3 flex max-w-[245px] flex-col items-start gap-2 sm:left-4 sm:top-6 sm:gap-3 lg:left-5 lg:top-7">
              {categoryChips.map(({ label, Icon }) => <Link key={label} href="/services#categories" className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/80 bg-white/95 px-3.5 py-2 text-xs font-semibold text-[#0B2348] shadow-[0_7px_22px_rgba(11,35,72,.1)] transition hover:-translate-x-1 hover:text-[#0755D9] sm:px-4 sm:py-2.5 sm:text-sm"><Icon size={17} className="shrink-0 text-[#2585FF]" aria-hidden="true" /><span>{label}</span></Link>)}
              <Link href="/services#categories" className="rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#0755D9] shadow sm:py-2.5 sm:text-sm">+ More Categories</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1240px]">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="inline-flex rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-[#0755D9]">Consultation Categories</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#101B33] sm:text-4xl">Guidance for the things you do every day</h2>
            <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">Choose a category to explore practical help for common questions and online tasks.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Laptop;
              return <article key={service.title} className="group flex min-h-[225px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_26px_rgba(11,35,72,.04)] transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_15px_35px_rgba(11,35,72,.1)] sm:p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-[#0755D9] transition group-hover:bg-[#0755D9] group-hover:text-white"><Icon size={23} aria-hidden="true" /></span>
                <h3 className="mt-4 text-lg font-bold text-[#0B2348]">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
                <Link href="/contact#consultation-form" className="mt-auto pt-4 text-sm font-bold text-[#0755D9] hover:text-[#0B2348] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755D9]">Start a consultation <span aria-hidden="true">→</span></Link>
              </article>;
            })}
          </div>
          <div className="mt-8 text-center"><Link href="/services#categories" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-[#0B2348] transition hover:border-[#0755D9] hover:text-[#0755D9]">View all consultation categories <ArrowRight size={17} aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 bg-[#F5F9FF] px-5 py-16 sm:px-8 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-[#0755D9]">How It Works</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#101B33] sm:text-4xl">A clear place to start</h2>
          </div>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["01", "Choose a category", "Browse the consultation topics and find the one that best fits your question."],
              ["02", "Tell us what you need", "Share a few details through the consultation form so we understand what you are looking for."],
              ["03", "Explore next steps", "Get practical information and guidance to help you decide what to do next."],
            ].map(([number, title, description]) => <li key={number} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><span className="text-sm font-extrabold tracking-widest text-[#2585FF]">{number}</span><h3 className="mt-3 text-xl font-bold text-[#0B2348]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></li>)}
          </ol>
          <p className="mt-6 text-center text-sm text-slate-500">Resolve US provides general information and consultation, not regulated professional advice.</p>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 bg-[linear-gradient(120deg,#f5f9ff,#fff_55%,#eff7ff)] px-5 py-16 sm:px-8 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <span className="inline-flex rounded-full bg-blue-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-[#0755D9]">Pricing</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#101B33] sm:text-4xl">Choose a plan that fits your needs</h2>
            <p className="mt-3 text-base text-slate-600 sm:text-lg">Get consultation, practical guidance and support for everyday questions.</p>
          </div>
          <PricingCards />
          <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-5 text-slate-500">Basic and Premium are monthly plan rates, not automatic billing. No payments or payment details are accepted through this website; please enquire for service and payment arrangements.</p>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 md:px-10">
        <div className="mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-5 rounded-3xl bg-[#0B2348] px-6 py-8 text-white sm:px-10 md:flex-row md:items-center">
          <div><h2 className="text-2xl font-bold sm:text-3xl">Have a question to work through?</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">Tell us what you are looking for and choose a consultation category.</p></div>
          <Link href="/contact#consultation-form" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#0755D9] transition hover:bg-blue-50">Get Consultation <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
