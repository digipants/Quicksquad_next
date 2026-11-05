import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing ResolveUS consumer consultations, plan enquiries, off-site payment arrangements and support.",
  alternates: { canonical: "/terms-of-service" },
};

const sections = [
  ["Using ResolveUS", "By using this site or requesting a consultation, you agree to these terms and acknowledge our Privacy Policy, Refund Policy and Disclaimer. ResolveUS is a consumer-facing brand operated by A V Food Factory."],
  ["Consultation scope", "We provide general educational information, AI-assisted guidance, and consultation about everyday questions and online tasks. The services and their scope are agreed directly with you. Availability, response times, and outcomes are not guaranteed unless separately confirmed in writing."],
  ["Professional and affiliation boundaries", "ResolveUS is independent. We are not a bank, government agency, law firm, medical provider, investment adviser or an official customer-service department for another company. We do not promise to recover accounts, obtain government decisions or deliver regulated professional advice. Refer important decisions to suitably qualified professionals or official sources."],
  ["Plans, pricing and payment arrangements", "Basic is advertised at $20/month, Premium at $75/month, and Enterprise by individual quotation. These are plan rates, not automatic charges initiated by the website. The website does not accept payments, collect payment-card credentials, store transaction records or initiate renewals. Our team will confirm your agreed service period, scope, total price and any payment method separately before you proceed. Do not send payment information through the contact form or chat."],
  ["Cancellation and refunds", "Contact support@resolve-us.com with questions about an ongoing service, cancellation or refunds. Refunds are reviewed under the Refund Policy. Eligible approved refunds will be issued within 14 calendar days after approval, subject to payment-provider posting times. Your applicable statutory rights are unaffected."],
  ["Your responsibilities and security", "Supply accurate information, obtain authorization for any accounts you discuss, and do not share passwords, one-time codes, card numbers or other sensitive credentials. Do not use our service for unlawful or unauthorized access or misleading requests."],
  ["AI and information accuracy", "AI-generated and general information can be incomplete or outdated. You are responsible for verifying important facts and decisions, particularly in finance, healthcare, law, government and other regulated fields."],
  ["Website availability and changes", "We may update site content, services or these Terms to maintain accuracy, security or compliance. Changes will be posted on this page. We will not retroactively override agreed service commitments or mandatory consumer protections."],
  ["Liability", "To the extent permitted by applicable law, our general informational content is provided without a guarantee of any particular outcome. This provision does not exclude liability or legal rights that cannot lawfully be limited."],
];

export default function TermsOfService() {
  return (
    <main className="bg-slate-50 px-6 py-16 text-slate-800">
      <article className="mx-auto max-w-4xl rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[.16em] text-blue-700">ResolveUS legal</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-950">Terms of Service</h1>
        <div className="mt-10 space-y-8">{sections.map(([title, description], index) => (
          <section key={title}><h2 className="text-xl font-bold text-slate-900">{index + 1}. {title}</h2><p className="mt-3 leading-7">{description}</p></section>
        ))}</div>
        <p className="mt-10 border-t border-slate-200 pt-6 leading-7">Questions? Email <a className="font-semibold text-blue-700 underline" href="mailto:support@resolve-us.com">support@resolve-us.com</a>. Please also read the <Link href="/privacy-policy" className="font-semibold text-blue-700 underline">Privacy Policy</Link>, <Link href="/refund-policy" className="font-semibold text-blue-700 underline">Refund Policy</Link> and <Link href="/disclaimer" className="font-semibold text-blue-700 underline">Disclaimer</Link>.</p>
        <p className="mt-6 text-sm text-slate-500">Last updated: November 3, 2026</p>
      </article>
    </main>
  );
}
