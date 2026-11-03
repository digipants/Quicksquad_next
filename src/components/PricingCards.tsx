"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { plans, type Plan } from "@/lib/pricing";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  handler: (response: { razorpay_payment_id: string }) => void;
  prefill?: { name: string; email: string; contact: string };
  theme?: { color: string };
}

interface RazorpayInstance { open: () => void }
declare global { interface Window { Razorpay: new (options: RazorpayOptions) => RazorpayInstance } }

export default function PricingCards({ interactive = false }: { interactive?: boolean }) {
  useEffect(() => {
    if (!interactive || document.querySelector('script[data-razorpay-checkout]')) return;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.dataset.razorpayCheckout = "true";
    document.body.appendChild(script);
    return () => { script.remove(); };
  }, [interactive]);

  const handlePayment = (plan: Plan) => {
    if (plan.price === 0) return;
    if (!window.Razorpay) {
      window.alert("Checkout is loading. Please try again in a moment.");
      return;
    }
    const options: RazorpayOptions = {
      key: "rzp_test_RH1qkK5aG1oovC",
      amount: plan.price,
      currency: "USD",
      name: "Resolve US",
      description: `${plan.title} Subscription`,
      image: "/images/resolve-us-logo.svg",
      handler(response) {
        window.alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: { name: "Customer Name", email: "customer@example.com", contact: "1234567890" },
      theme: { color: "#0755D9" },
    };
    new window.Razorpay(options).open();
  };

  return (
    <div id="plans" className="grid scroll-mt-28 gap-6 lg:grid-cols-3">
      {plans.map((plan, index) => (
        <article key={plan.title} className={`relative flex h-full flex-col rounded-[22px] border bg-white p-6 shadow-[0_10px_35px_rgba(11,35,72,0.06)] sm:p-8 ${index === 1 ? "border-[#2585FF] ring-1 ring-[#2585FF] shadow-[0_16px_38px_rgba(7,85,217,0.14)]" : "border-slate-200"}`}>
          {index === 1 && <span className="absolute -top-3 right-6 rounded-full bg-[#0755D9] px-4 py-1.5 text-xs font-bold text-white shadow-sm">Most Popular</span>}
          <h3 className="text-2xl font-bold tracking-tight text-[#0B2348]">{plan.title.replace(" Plan", "")}</h3>
          <p className="mt-2 min-h-[3.5rem] text-sm leading-6 text-slate-600">
            {index === 0 && "Everyday guidance for a specific question or task."}
            {index === 1 && "More in-depth guidance for detailed questions and planning."}
            {index === 2 && "Custom consultation support for complex needs and businesses."}
          </p>
          <p className="mt-3 flex min-h-12 items-baseline gap-2 text-[#0B2348]">
            <span className="text-4xl font-extrabold tracking-tight">{plan.displayPrice.startsWith("$") ? plan.displayPrice.split("/")[0] : "Custom"}</span>
            {plan.displayPrice.includes("/") && <span className="text-base font-medium text-slate-700">/ {plan.displayPrice.split("/")[1]}</span>}
          </p>
          <div className="mb-5 mt-4 h-px bg-slate-200" />
          {interactive && plan.price > 0 ? (
            <button onClick={() => handlePayment(plan)} className={`rounded-xl px-4 py-3 text-center text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755D9] focus-visible:ring-offset-2 ${index === 1 ? "bg-[#0755D9] text-white hover:bg-[#0647B7]" : "border border-[#0755D9] text-[#0B2348] hover:bg-blue-50"}`}>Get {plan.title.replace(" Plan", "")} Plan</button>
          ) : (
            <Link href={plan.price === 0 ? "/contact#consultation-form" : "/pricing#plans"} className={`rounded-xl px-4 py-3 text-center text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755D9] focus-visible:ring-offset-2 ${index === 1 ? "bg-[#0755D9] text-white hover:bg-[#0647B7]" : "border border-[#0755D9] text-[#0B2348] hover:bg-blue-50"}`}>{plan.price === 0 ? "Request a Quote" : `Get ${plan.title.replace(" Plan", "")} Plan`}</Link>
          )}
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
            {plan.features.map((feature) => <li key={feature} className="flex items-start gap-2.5"><Check size={18} className="mt-0.5 shrink-0 text-[#0755D9]" aria-hidden="true" /><span>{feature}</span></li>)}
          </ul>
        </article>
      ))}
    </div>
  );
}
