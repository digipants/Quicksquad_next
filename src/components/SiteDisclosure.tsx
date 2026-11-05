import Link from "next/link";

export default function SiteDisclosure() {
  return (
    <aside className="border-y border-teal-100 bg-teal-50 px-6 py-4 text-center text-sm leading-6 text-slate-700" aria-label="Business and service disclosure">
      <strong>Important information:</strong> ResolveUS provides general guidance and consultation, not banking, legal, medical, investment, or government services. <Link href="/disclaimer" className="font-semibold text-teal-700 underline underline-offset-2">Read our disclaimer</Link>. DashProtection device-care services are subject to individual assessment and availability.
    </aside>
  );
}
