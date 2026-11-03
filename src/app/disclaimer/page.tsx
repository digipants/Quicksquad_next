import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Resolve US service limitations, independence and general information disclosures.",
  alternates: { canonical: "/disclaimer" },
};

const sections = [
  ["General information", "Resolve US provides AI-assisted educational information and general consultation for everyday questions and online tasks. Information may be incomplete or out of date and is not a guarantee of results."],
  ["Independent consumer guidance", "Resolve US is independent. We are not the official customer-service department or an authorized representative of any technology company, bank, government agency, or other organization unless we explicitly and accurately disclose such a relationship. Mentioning another organization's name does not imply endorsement or affiliation."],
  ["Regulated professional services", "Resolve US is not a bank, law firm, medical provider, financial adviser, investment adviser, tax adviser, insurance provider or government agency. We do not provide professional legal, medical, investment or tax advice. Consult an appropriately licensed professional or an official agency where needed."],
  ["Accounts and online security", "We offer general information about digital accounts and everyday online tasks. Never share passwords, one-time codes, payment-card details or sensitive credentials through our website or AI chat. We do not guarantee recovery of accounts managed by other providers or outcomes they control."],
  ["Health and finance", "Health information is educational and is not diagnosis or treatment. Financial information is educational and is not an offer, solicitation or investment recommendation. Obtain qualified advice for significant decisions and seek emergency help in urgent situations."],
  ["Government and external services", "Information about public portals, travel, shopping or services run by other providers is for general reference. We are not a government agency and cannot promise approval of applications, refunds, account decisions or outcomes controlled by those providers."],
  ["Responsibility and changes", "You are responsible for deciding whether information suits your situation and independently verifying important details. External websites and providers control their own content, terms and availability. Nothing here limits consumer protections that cannot legally be excluded."],
];

export default function DisclaimerPage() {
  return (
    <main className="bg-slate-50 px-6 py-16 text-slate-800">
      <article className="mx-auto max-w-4xl rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[.16em] text-blue-700">Important information</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-950">Disclaimer</h1>
        <p className="mt-5 text-lg leading-8">Resolve US is a consumer-facing brand owned and operated by A V TRADE CORPORATION.</p>
        <div className="mt-10 space-y-8">{sections.map(([title, description], index) => (
          <section key={title}><h2 className="text-xl font-bold text-slate-900">{index + 1}. {title}</h2><p className="mt-3 leading-7">{description}</p></section>
        ))}</div>
        <p className="mt-10 border-t border-slate-200 pt-6 leading-7">Questions? Email <a className="font-semibold text-blue-700 underline" href="mailto:support@resolve-us.com">support@resolve-us.com</a>. Please read our <Link href="/terms-of-service" className="font-semibold text-blue-700 underline">Terms of Service</Link> and <Link href="/privacy-policy" className="font-semibold text-blue-700 underline">Privacy Policy</Link>.</p>
        <p className="mt-6 text-sm text-slate-500">Last updated: November 3, 2026</p>
      </article>
    </main>
  );
}
