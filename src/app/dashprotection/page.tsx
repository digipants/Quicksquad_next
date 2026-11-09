import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Camera, CarFront, CheckCircle2, CircleHelp, Headphones,
  House, Laptop, Monitor, PhoneCall, Refrigerator, ServerCog, ShieldCheck,
  Smartphone, Wifi, Wrench, Zap,
} from "lucide-react";
import DashProtectionEnquiry from "@/components/DashProtectionEnquiry";
import { dashCategories, dashSpecialties, dashPlans, dashFaqs } from "@/lib/dashprotection";

export const metadata: Metadata = {
  title: "DashProtection | Device Care, Electronics & Support",
  description: "Explore DashProtection by ResolveUS: device-care enquiries for computers, phones, smart-home devices, cameras, appliances and car electronics. Review plans and request assistance.",
  alternates: { canonical: "/dashprotection" },
  openGraph: {
    title: "DashProtection by ResolveUS | Device Care",
    description: "Explore your device-service options and request guidance or a service review from the ResolveUS team.",
    url: "/dashprotection",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "DashProtection by ResolveUS", description: "Explore device care and service options for everyday technology." },
};

const iconByName = { camera: Camera, phone: Smartphone, monitor: Monitor, appliance: Refrigerator, home: House, car: CarFront } as const;

export default function DashProtectionPage() {
  return (
    <main className="overflow-hidden bg-[#F7FAFC] text-[#12243A]">
      <section className="relative isolate overflow-hidden bg-[#091D35] px-5 pb-20 pt-16 text-white sm:px-8 lg:pb-28 lg:pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_25%,rgba(31,188,174,.23),transparent_47%),radial-gradient(ellipse_at_14%_85%,rgba(41,113,217,.17),transparent_40%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-28 -top-36 -z-10 h-[560px] w-[560px] rounded-full border-[85px] border-teal-300/[.045]" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-200/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
              <ShieldCheck size={16} aria-hidden="true" /> DashProtection <span className="text-teal-100/55">/</span> by ResolveUS
            </div>
            <h1 className="mt-8 max-w-[760px] text-[clamp(3rem,6vw,5.6rem)] font-black leading-[1.02] tracking-[-.055em]">
              <span className="mb-5 block text-[clamp(1.25rem,2.4vw,1.85rem)] font-bold leading-tight tracking-normal text-white">ResolveUS <span className="text-[#7CE5D6]">Device Care</span></span>
              Your tech.<br /><span className="bg-gradient-to-r from-[#64E3D1] to-[#9AE9F6] bg-clip-text text-transparent">Taken care of.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-200 sm:text-xl">
              Everyday devices deserve clear service options. Explore support, troubleshooting and repair enquiries for your computers, phones, connected home, cameras, appliances and car electronics.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="#request" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-[#7CE5D6] px-7 font-extrabold text-[#092338] shadow-[0_12px_45px_rgba(37,191,169,.2)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#091D35]">
                Request device assistance <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
              <Link href="#services" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/35 px-7 font-semibold text-white transition hover:bg-white/10">
                Explore services <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-200">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="text-teal-300" size={18} aria-hidden="true" /> One enquiry, clear next steps</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="text-teal-300" size={18} aria-hidden="true" /> Remote and location-based options</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="text-teal-300" size={18} aria-hidden="true" /> No payment on this website</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[550px] rounded-[32px] border border-white/15 bg-white/[.065] p-5 shadow-[0_30px_100px_rgba(0,0,0,.2)] backdrop-blur-sm sm:p-8">
            <div className="flex items-center justify-between border-b border-white/15 pb-5">
              <span className="text-sm font-semibold uppercase tracking-[.16em] text-teal-200">Device care / overview</span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-300"><span className="h-2 w-2 rounded-full bg-teal-300" /> Explore options</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { Icon: Laptop, title: "Computers", sub: "Work and home" },
                { Icon: Smartphone, title: "Mobile", sub: "Connected life" },
                { Icon: House, title: "Smart home", sub: "Everyday comfort" },
                { Icon: Camera, title: "Electronics", sub: "Beyond the basics" },
              ].map(({ Icon, title, sub }) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[.085] p-5 transition hover:border-teal-200/45 hover:bg-white/[.13]">
                  <div className="inline-flex rounded-xl bg-teal-300/15 p-3 text-teal-200"><Icon size={27} strokeWidth={1.7} aria-hidden="true" /></div>
                  <h2 className="mt-5 text-lg font-bold tracking-tight">{title}</h2>
                  <p className="mt-1 text-xs text-slate-300">{sub}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-3 rounded-2xl bg-[#67DBC6] p-4 text-[#0B2D36]">
              <Zap className="mt-0.5 shrink-0" size={20} aria-hidden="true" />
              <div><p className="font-extrabold">A clearer path to assistance</p><p className="mt-1 text-xs leading-5">Tell us the device and concern. The team confirms coverage and available options before any commitment.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-28 px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[.2em] text-teal-700">What we help you explore</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-.035em] text-slate-950 sm:text-5xl">Support across your devices.</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">The original DashProtection device categories, now presented in a simpler, easier-to-navigate experience.</p>
            </div>
            <Link href="#request" className="inline-flex items-center gap-2 self-start rounded-full border border-[#0C7974] px-5 py-3 text-sm font-bold text-[#0C7974] transition hover:bg-teal-50">Ask about a device <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {dashCategories.map((item, index) => {
              const Icon = iconByName[item.icon];
              return (
                <article key={item.slug} id={item.slug} className="group relative flex scroll-mt-28 flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white p-7 shadow-[0_9px_35px_rgba(10,35,56,.045)] transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-[0_20px_45px_rgba(10,35,56,.095)] sm:p-8">
                  <div className="flex items-start justify-between">
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#E5F7F3] text-[#0B7971] transition group-hover:bg-[#0C7974] group-hover:text-white"><Icon size={30} strokeWidth={1.6} aria-hidden="true" /></div>
                    <span className="text-xs font-bold tracking-widest text-slate-400">0{index + 1}</span>
                  </div>
                  <h3 className="mt-8 text-xl font-extrabold tracking-tight text-slate-950">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{item.description}</p>
                  <Link href="#request" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#087870] hover:underline">Request service review <ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> for {item.title}</span></Link>
                </article>
              );
            })}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {dashSpecialties.map((item, index) => {
              const Icon = index === 0 ? Wifi : ServerCog;
              return <article key={item.title} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-[#EDF5F7] p-6"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-[#087870]"><Icon size={24} aria-hidden="true" /></span><div><h3 className="font-extrabold text-slate-900">{item.title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p></div></article>;
            })}
          </div>
          <p className="mt-6 text-sm leading-6 text-slate-600">All service requests are reviewed for scope, location and availability. Listing a device category does not promise an on-site visit or a particular repair outcome.</p>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-28 bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-teal-700">A straightforward process</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">From concern to a clear service plan.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">Whether your device needs advice, troubleshooting or a repair assessment, start with a clear description of what is going on.</p>
            <a href="tel:+18332162311" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0C7974] px-6 py-3 font-bold text-white hover:bg-[#096761]"><PhoneCall size={18} aria-hidden="true" /> (833) 216-2311</a>
          </div>
          <ol className="space-y-4">
            {[
              { Icon: Headphones, title: "Tell us about the device", text: "Send a brief description using the enquiry form or call our staffed phone number." },
              { Icon: Wrench, title: "Review available service options", text: "We assess the device type, location, requested service and whether remote or local assistance is available." },
              { Icon: ShieldCheck, title: "Confirm scope before proceeding", text: "We explain the available plan or service, expected terms and any off-site payment arrangement before you agree." },
            ].map(({ Icon, title, text }, index) => (
              <li key={title} className="flex gap-5 rounded-[22px] border border-slate-200 bg-[#F7FAFC] p-6">
                <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#E2F6F1] text-[#0C7974]"><Icon size={25} aria-hidden="true" /></span>
                <div><p className="text-xs font-extrabold tracking-widest text-teal-700">STEP 0{index + 1}</p><h3 className="mt-1 text-lg font-extrabold text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="plans" className="scroll-mt-28 bg-[#EFF7F8] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[.2em] text-teal-700">DashProtection plans</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">Options for every kind of need.</h2>
            <p className="mt-4 text-lg text-slate-600">The original DashProtection plan rates and service themes, organized for straightforward comparison.</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {dashPlans.map((plan, index) => (
              <article key={plan.name} className={"flex flex-col rounded-[26px] border p-7 shadow-sm sm:p-8 " + (index === 1 ? "border-[#0C7974] bg-[#0C3743] text-white" : "border-slate-200 bg-white text-slate-950")}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-black tracking-tight">{plan.name}</h3>
                  {index === 1 && <span className="rounded-full bg-[#79E2D1] px-3 py-1 text-xs font-extrabold text-[#0C3743]">More coverage options</span>}
                </div>
                <p className={"mt-3 min-h-12 text-sm leading-6 " + (index === 1 ? "text-slate-200" : "text-slate-600")}>{plan.description}</p>
                <p className="mt-4"><span className="text-4xl font-black tracking-tight">{plan.price}</span><span className={"ml-1 text-sm " + (index === 1 ? "text-slate-200" : "text-slate-500")}>{plan.unit}</span></p>
                <div className={"my-6 h-px " + (index === 1 ? "bg-white/20" : "bg-slate-200")} />
                <ul className="mb-8 flex-1 space-y-4">
                  {plan.features.map(feature => <li key={feature} className="flex items-start gap-3 text-sm leading-6"><CheckCircle2 className={"mt-0.5 shrink-0 " + (index === 1 ? "text-[#79E2D1]" : "text-[#0C7974]")} size={19} aria-hidden="true" />{feature}</li>)}
                </ul>
                <Link href="#request" className={"inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-extrabold transition " + (index === 1 ? "bg-[#79E2D1] text-[#0C3743] hover:bg-white" : "bg-[#0C7974] text-white hover:bg-[#096761]")}>Enquire about {plan.name} <ArrowRight size={17} aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-4xl text-center text-sm leading-6 text-slate-600">Displayed prices are monthly plan rates, not automatic subscriptions. Features, remote-access assistance, response windows, physical repairs, coverage and technician availability are confirmed before an agreement. No payment or card details are collected here. Read our <Link href="/terms-of-service" className="font-semibold text-teal-800 underline">Terms</Link> and <Link href="/refund-policy" className="font-semibold text-teal-800 underline">Refund Policy</Link>.</p>
        </div>
      </section>

      <section id="about-dashprotection" className="scroll-mt-28 bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-teal-700">About DashProtection</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">Device care with a human point of contact.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">DashProtection brings together enquiries across consumer electronics, home technology and business devices under the ResolveUS service experience. Our focus is to help you describe the issue, understand what assistance may be available, and agree on the next step.</p>
            <p className="mt-4 text-base leading-7 text-slate-600">We value clear communication, practical service boundaries, respect for customer information and transparent terms. Product and manufacturer names remain the property of their owners; we do not claim affiliation without an express, verified relationship.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {["Trust", "Integrity", "Security", "Commitment"].map(value => <span key={value} className="rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-bold text-teal-900">{value}</span>)}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[28px] bg-[#0E2945] p-8 text-white sm:p-10">
            <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full border-[36px] border-teal-300/10" aria-hidden="true" />
            <div className="inline-flex rounded-2xl bg-teal-200/10 p-4 text-teal-200"><ShieldCheck size={34} aria-hidden="true" /></div>
            <h3 className="mt-7 text-2xl font-black tracking-tight">A service built around clarity.</h3>
            <ul className="mt-6 space-y-5">
              {[
                "Understand the service request before recommending an option.",
                "Explain availability and fees before a commitment.",
                "Keep account credentials and payment details out of enquiry forms.",
                "Use accessible human contact channels when you need them.",
              ].map(value => <li key={value} className="flex gap-3 text-sm leading-6 text-slate-200"><CheckCircle2 className="mt-0.5 shrink-0 text-teal-200" size={18} aria-hidden="true" />{value}</li>)}
            </ul>
            <p className="mt-8 border-t border-white/20 pt-6 text-sm text-slate-200">DashProtection is a service experience within ResolveUS; it is not represented as a manufacturer-authorized repair center.</p>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-28 bg-[#F7FAFC] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center"><div className="mx-auto inline-flex rounded-2xl bg-teal-100 p-3 text-teal-700"><CircleHelp size={26} aria-hidden="true" /></div><h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Answers before you start.</h2><p className="mt-3 text-slate-600">How device-care requests, plans and service arrangements work.</p></div>
          <div className="mt-9 space-y-3">
            {dashFaqs.map(faq => <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white p-5 open:border-teal-200 sm:p-6"><summary className="cursor-pointer list-none pr-6 text-base font-extrabold text-slate-900 marker:hidden">{faq.question} <span className="float-right text-teal-700 transition group-open:rotate-45" aria-hidden="true">+</span></summary><p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(110deg,#E7F8F6,#FFFFFF_56%,#EEF5FE)] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
          <div className="lg:pt-8">
            <p className="text-xs font-black uppercase tracking-[.2em] text-teal-700">Let's get your request started</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">Get help finding the right next step.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">Tell the ResolveUS team what device you have, what is happening and where you need service. We&apos;ll review what we can offer.</p>
            <div className="mt-8 space-y-4 rounded-2xl border border-teal-100 bg-white/80 p-6">
              <a href="tel:+18332162311" className="flex items-center gap-3 font-extrabold text-slate-900 hover:text-teal-700"><PhoneCall className="text-teal-700" size={20} aria-hidden="true" /> (833) 216-2311</a>
              <a href="mailto:support@resolve-us.com" className="flex items-center gap-3 break-all font-bold text-slate-900 hover:text-teal-700"><Headphones className="text-teal-700" size={20} aria-hidden="true" /> support@resolve-us.com</a>
              <p className="text-xs leading-6 text-slate-600">Operator, service terms and consumer protections are described in the ResolveUS legal pages. We do not collect payment-card information through this website.</p>
            </div>
            <Link href="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal-800 hover:underline">Looking for everyday consultations instead? <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <DashProtectionEnquiry />
        </div>
      </section>
    </main>
  );
}
