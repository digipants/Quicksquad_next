import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import PricingCards from "@/components/PricingCards";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Compare Resolve US consultation plans and view clear pricing and payment terms.",
  openGraph: { url: "/pricing", title: "Pricing | Resolve US" },
  alternates: { canonical: "/pricing" },
};

const faqs = [
  { question: "How do I start a plan?", answer: "Choose a plan and send a consultation enquiry. Our team will explain the service scope and any payment arrangements directly before you agree to proceed." },
  { question: "Can I pay on this website?", answer: "No. Resolve US does not accept or record payments or payment-card details through this website. Please do not include payment details in consultation messages." },
  { question: "Do plans renew automatically?", answer: "No automatic billing is initiated by this website. Basic and Premium show monthly plan rates. Any service period or future payment arrangement will be explained directly before you agree." },
  { question: "Can I request an invoice or billing documentation?", answer: "Email support@resolve-us.com for questions about any agreed off-site payment or related documentation." },
  { question: "How do refunds work?", answer: "Email support@resolve-us.com to request a review. If eligible, refunds are issued within 14 calendar days of approval, subject to payment-provider posting times." },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f5f9ff,#fff_55%,#eff7ff)] px-5 py-14 text-[#0B2348] sm:px-8 md:px-10 md:py-20">
      <section className="mx-auto max-w-[1180px]">
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-[#0755D9]">Pricing</span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#101B33] sm:text-5xl">Choose a plan that fits your needs</h1>
          <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">Get consultation, step-by-step guidance and follow-up support.</p>
        </div>
        <PricingCards />
        <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-5 text-slate-500">Basic and Premium are monthly plan rates, not automatic payment subscriptions. Resolve US does not take or record payments through this website. Contact us to confirm plan scope and any off-site payment arrangements.</p>
      </section>
      <section className="mx-auto mt-16 max-w-3xl">
        <h2 className="text-center text-2xl font-bold text-[#101B33]">Pricing questions</h2>
        <div className="mt-6 space-y-3">
          {faqs.map(({ question, answer }) => <details key={question} className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#0B2348] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755D9]">{question}<ChevronDown size={18} className="shrink-0 text-[#0755D9] transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
            <p className="mt-3 pr-8 text-sm leading-6 text-slate-600">{question.includes("refund") ? <>Please read our <Link href="/refund-policy" className="font-semibold text-[#0755D9] underline">Refund Policy</Link> or <a href="mailto:support@resolve-us.com" className="font-semibold text-[#0755D9] underline">support@resolve-us.com</a>.</> : answer}</p>
          </details>)}
        </div>
      </section>
    </main>
  );
}
