"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, Mail, PhoneCall } from "lucide-react";
import { dashCategories, dashPlans } from "@/lib/dashprotection";

const initial = { name: "", email: "", phone: "", service: "", plan: "", message: "" };
type Enquiry = typeof initial;
type Status = { type: "success" | "error"; message: string } | null;

export default function DashProtectionEnquiry() {
  const [values, setValues] = useState<Enquiry>(initial);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const submitting = useRef(false);

  const update = (field: keyof Enquiry, value: string) => setValues(current => ({ ...current, [field]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current) return;
    setStatus(null);
    submitting.current = true;
    setLoading(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          category: "DashProtection Device Care",
          subCategory: values.service || "General device care",
          message: "Interested plan: " + (values.plan || "To be discussed") + "\n\n" + values.message,
        }),
      });
      const result: { success?: boolean; error?: string; message?: string } = await response.json();
      if (!response.ok || result.success !== true) {
        setStatus({ type: "error", message: result.error || "Your request could not be sent. Please call us instead." });
        return;
      }

      try {
        const consent: unknown = JSON.parse(window.localStorage.getItem("resolve-us-optional-cookies-v1") || "null");
        if (consent && typeof consent === "object" && "analytics" in consent && consent.analytics === true) {
          window.gtag?.("event", "generate_lead", { method: "dashprotection_enquiry" });
        }
      } catch {
        // No analytics events without accessible explicit consent.
      }
      setValues(initial);
      setStatus({ type: "success", message: result.message || "Your device-care enquiry has been received." });
    } catch {
      setStatus({ type: "error", message: "Connection problem. Please try again or call (833) 216-2311." });
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  const fieldClass = "mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15";
  const labelClass = "block text-sm font-semibold text-slate-800";

  return (
    <div id="request" className="scroll-mt-28 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_70px_rgba(7,26,56,.12)] sm:p-8">
      <div className="mb-7">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-700"><Mail size={16} aria-hidden="true" /> Request a service review</span>
        <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Tell us what needs attention.</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">We&apos;ll review the device and available service options. No payment is collected here.</p>
      </div>
      <form onSubmit={submit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>Full name <span aria-hidden="true">*</span>
            <input required maxLength={120} autoComplete="name" className={fieldClass} value={values.name} onChange={e => update("name", e.target.value)} placeholder="Your name" />
          </label>
          <label className={labelClass}>Email address <span aria-hidden="true">*</span>
            <input required type="email" maxLength={254} autoComplete="email" className={fieldClass} value={values.email} onChange={e => update("email", e.target.value)} placeholder="you@example.com" />
          </label>
        </div>
        <label className={labelClass}>Phone number <span aria-hidden="true">*</span>
          <input required type="tel" maxLength={60} autoComplete="tel" className={fieldClass} value={values.phone} onChange={e => update("phone", e.target.value)} placeholder="Your best contact number" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>Device or service
            <select className={fieldClass} value={values.service} onChange={e => update("service", e.target.value)}>
              <option value="">Select a category</option>
              {dashCategories.map(item => <option key={item.slug} value={item.title}>{item.title}</option>)}
              <option value="Network Connections">Network Connections</option>
              <option value="Server Issues">Server Issues</option>
              <option value="Other device care">Other device care</option>
            </select>
          </label>
          <label className={labelClass}>Plan of interest
            <select className={fieldClass} value={values.plan} onChange={e => update("plan", e.target.value)}>
              <option value="">Not sure yet</option>
              {dashPlans.map(plan => <option key={plan.name} value={plan.name}>{plan.name}</option>)}
              <option value="One-time service enquiry">One-time service enquiry</option>
            </select>
          </label>
        </div>
        <label className={labelClass}>What is happening? <span aria-hidden="true">*</span>
          <textarea required maxLength={4700} rows={4} className={fieldClass} value={values.message} onChange={e => update("message", e.target.value)}
            placeholder="Device type, symptoms and your location (city/state). Please do not include passwords, payment details or one-time codes." />
        </label>
        <p className="text-xs leading-5 text-slate-600">By submitting, you agree to be contacted about your request. See our <a className="font-semibold text-teal-800 underline" href="/privacy-policy">Privacy Policy</a>. No appointment, pricing commitment or repair is confirmed until our team reviews your request.</p>
        <button type="submit" disabled={loading} className="inline-flex w-full min-h-13 items-center justify-center gap-2 rounded-xl bg-[#0C7974] px-6 py-3.5 font-bold text-white transition hover:bg-[#096761] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-65">
          {loading ? <><LoaderCircle className="animate-spin" size={19} aria-hidden="true" /> Sending enquiry...</> : <>Request assistance <ArrowRight size={19} aria-hidden="true" /></>}
        </button>
        {status && <p role="status" aria-live="polite" className={"rounded-xl border px-4 py-3 text-sm leading-6 " + (status.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-950" : "border-red-200 bg-red-50 text-red-800")}>
          {status.type === "success" && <CheckCircle2 className="mr-2 inline align-middle" size={18} aria-hidden="true" />}{status.message}
        </p>}
      </form>
      <p className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-5 text-sm text-slate-600"><PhoneCall size={17} aria-hidden="true" /> Prefer to talk? <a className="font-bold text-teal-800 hover:underline" href="tel:+18332162311">(833) 216-2311</a></p>
    </div>
  );
}
