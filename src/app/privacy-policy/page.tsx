import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Resolve US handles consultation enquiries, AI chat data, analytics, cookies and privacy requests.",
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  ["Who operates this service", "Resolve US is a consumer-facing brand owned and operated by A V TRADE CORPORATION, a registered partnership firm. For privacy requests, contact support@resolve-us.com."],
  ["Information you provide", "We collect information you choose to submit, such as your name, email address, phone number, consultation category, message and support correspondence. If you use the AI chat, your submitted messages are processed to generate responses. Do not submit passwords, payment-card information, identification numbers or other sensitive account credentials."],
  ["Website and analytics information", "Our site uses Google Analytics and Google Ads tags. These may collect browser, device, page and interaction information and may use cookies or similar technologies for measurement and marketing. You may manage cookies using browser controls and Google's available privacy choices. Cookie-consent controls and regional compliance should be reviewed separately; this policy alone does not enable or replace those controls."],
  ["How we use information", "We use enquiry and correspondence data to respond to requests, provide consultations, communicate service details, prevent abuse, improve our services and meet applicable legal obligations. We use usage data to understand site traffic and marketing performance. We do not submit enquiry-message contents to our analytics tags as conversion parameters."],
  ["Payment information", "The Resolve US website does not take payments, collect payment-card information, or create or maintain a website payment-transaction ledger. If you separately arrange payment for a service, external payment providers and our business operations may process payment confirmations, invoices and refund documentation outside this website as needed for the transaction and legal requirements."],
  ["Service providers and AI", "We use service providers to host the website, deliver email, operate AI chat and measure website usage. Information you submit to our AI assistant may be sent to an AI service provider to produce a response. Providers may process information in countries other than your own, subject to their applicable terms and safeguards."],
  ["Information sharing and retention", "We do not sell personal information. We may share information with contracted providers supporting operations, or when legally required. We retain enquiry and support records only as needed for service, security, recordkeeping and applicable legal obligations; periods depend on the reason for retention."],
  ["Your rights and choices", "Depending on where you live, you may have rights to request access, correction, deletion, or limits on certain uses of personal information. To submit a request, email support@resolve-us.com. We may need to verify your identity before responding and may retain certain records as required by law."],
  ["Security and updates", "We use reasonable safeguards, but no online service can guarantee absolute security. We may update this policy and will publish the revised version here."],
];

export default function PrivacyPolicy() {
  return (
    <main className="bg-slate-50 px-6 py-16 text-slate-800">
      <article className="mx-auto max-w-4xl rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[.16em] text-blue-700">Resolve US legal</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-950">Privacy Policy</h1>
        <div className="mt-10 space-y-8">{sections.map(([title, description], index) => (
          <section key={title}><h2 className="text-xl font-bold text-slate-900">{index + 1}. {title}</h2><p className="mt-3 leading-7">{description}</p></section>
        ))}</div>
        <p className="mt-10 border-t border-slate-200 pt-6 leading-7">Contact our team about privacy at <a href="mailto:support@resolve-us.com" className="font-semibold text-blue-700 underline">support@resolve-us.com</a>. See also the <Link href="/terms-of-service" className="font-semibold text-blue-700 underline">Terms of Service</Link> and <Link href="/disclaimer" className="font-semibold text-blue-700 underline">Disclaimer</Link>.</p>
        <p className="mt-6 text-sm text-slate-500">Last updated: November 3, 2026</p>
      </article>
    </main>
  );
}
