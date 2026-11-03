import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "How to request an eligible Resolve US refund by email and when it will be issued.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <main className="bg-slate-50 px-6 py-16 text-slate-800">
      <article className="mx-auto max-w-4xl rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[.16em] text-blue-700">Resolve US legal</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-950">Refund Policy</h1>
        <p className="mt-5 text-lg leading-8">Resolve US is a consumer-facing brand owned and operated by A V TRADE CORPORATION. This policy explains how we review refund requests for consultation services and plans.</p>
        <div className="mt-10 space-y-8 leading-7">
          <section>
            <h2 className="text-xl font-bold text-slate-900">1. How to request a refund</h2>
            <p className="mt-3">Email <a className="font-semibold text-blue-700 underline" href="mailto:support@resolve-us.com">support@resolve-us.com</a> with your name, the email used for the service, service or plan name, payment date, any relevant invoice or transaction reference, and why you are requesting a refund. Please do not email card numbers, passwords, or other sensitive financial credentials.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900">2. When a refund may be eligible</h2>
            <p className="mt-3">We review requests based on the agreed scope, the services actually delivered, payment circumstances, and applicable law. Examples that may qualify include a duplicate or erroneous payment, a service that was not provided as agreed, or other circumstances where a refund is required by law. A completed service is not automatically refundable solely because the customer changes their mind, except where required by law or agreed terms. We will explain the outcome of your review by email.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900">3. Refund issuance within 14 days</h2>
            <p className="mt-3"><strong>If your refund is eligible and approved, we will issue it within 14 calendar days after approval.</strong> It will be returned through the original payment method when available; otherwise we will agree a reasonable alternative. Your bank or payment provider may take additional time to show the credit.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900">4. No on-site payment collection</h2>
            <p className="mt-3">Resolve US does not accept payments, collect card details, or record payment transactions through this website. If you paid through a separately agreed payment method, contact the support email above so our team can review the relevant external payment documentation.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900">5. Cancellation and consumer rights</h2>
            <p className="mt-3">To cancel an agreed ongoing service arrangement, contact <a href="mailto:support@resolve-us.com" className="font-semibold text-blue-700 underline">support@resolve-us.com</a>. Cancellation and refund eligibility depend on the confirmed arrangement and the service already delivered. Nothing in this policy limits rights that cannot be excluded under applicable consumer law.</p>
          </section>
        </div>
        <p className="mt-10 border-t border-slate-200 pt-6 text-sm">Read our <Link className="font-semibold text-blue-700 underline" href="/terms-of-service">Terms of Service</Link> and <Link className="font-semibold text-blue-700 underline" href="/privacy-policy">Privacy Policy</Link>.</p>
        <p className="mt-6 text-sm text-slate-500">Last updated: November 3, 2026</p>
      </article>
    </main>
  );
}
