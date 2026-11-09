"use client";

import { useEffect, useRef, useState } from "react";

interface Category {
  title: string;
  description: string[];
}

const allCategories: Category[] = [
  {
    title: "Banking & Financial Guidance",
    description: [
      "How to open a bank account online",
      "Understanding credit scores and reports",
      "General financial concepts and terminology",
      "Preparing questions for a qualified financial professional",
      "Online financial account navigation guidance",
    ],
  },
  {
    title: "Digital Account & Online Services",
    description: [
      "Setting up and securing email accounts",
      "Online payment and digital wallet guidance",
      "Recovering lost passwords and account access",
      "Cloud storage and backup planning",
      "Understanding common online account settings",
    ],
  },
  {
    title: "Technology & Internet Guidance",
    description: [
      "Computer, device, and internet guidance",
      "Online safety and basic digital tasks",
      "Finding reliable online resources",
    ],
  },
  {
    title: "Government Services Guidance",
    description: [
      "Finding official government resources",
      "Understanding public-service portals and forms",
      "Online application and registration task guidance",
      "General information only, not legal advice",
    ],
  },
  {
    title: "Travel & Transportation",
    description: [
      "Booking flights, hotels, and rental cars",
      "Public transportation schedules and routes",
      "Finding official visa and travel information",
    ],
  },
  {
    title: "Consumer & Shopping Assistance",
    description: [
      "Finding the best online deals and discounts",
      "Product comparisons and reviews",
      "Subscription and membership management",
    ],
  },
  {
    title: "Healthcare & Wellness",
    description: [
      "Finding nearby hospitals, clinics, or pharmacies",
      "Understanding general health-information resources",
      "Booking healthcare appointments online",
    ],
  },
  {
    title: "Education & Career Guidance",
    description: [
      "Finding online courses and certifications",
      "Resume building and job search assistance",
      "College and scholarship application guidance",
    ],
  },
];

// Map public help-topic links to the contact form's existing, approved categories.
const helpTopicToCategory: Record<string, string> = {
  Banking: "Banking & Financial Guidance",
  Finance: "Banking & Financial Guidance",
  "Banking & Finance Guidance": "Banking & Financial Guidance",
  Technology: "Technology & Internet Guidance",
  "Technology Assistance": "Technology & Internet Guidance",
  Government: "Government Services Guidance",
  "Government Services": "Government Services Guidance",
  Shopping: "Consumer & Shopping Assistance",
  "Shopping Assistance": "Consumer & Shopping Assistance",
  Travel: "Travel & Transportation",
  "Travel Planning": "Travel & Transportation",
  Healthcare: "Healthcare & Wellness",
  "Healthcare Information": "Healthcare & Wellness",
  Career: "Education & Career Guidance",
  "Career Guidance": "Education & Career Guidance",
  "Digital Accounts": "Digital Account & Online Services",
};

export default function ContactPage() {
  const submitting = useRef(false);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  // Preselect the actual enquiry category when a topic card is the entry point.
  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get("category");
    if (!topic) return;
    const resolved = helpTopicToCategory[topic] || topic;
    if (allCategories.some((item) => item.title === resolved)) setCategory(resolved);
  }, []);
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting.current) return;
    setFormStatus(null);

    if (!form.name || !form.email || !form.phone || !form.message) {
      setFormStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    // const responseToken =
    //   window.grecaptcha?.getResponse(
    //     recaptchaWidgetId.current !== null ? recaptchaWidgetId.current : undefined
    //   ) || "";

    // if (!responseToken.length) {
    //   setCaptchaVerified(false);
    //   alert("Please complete the reCAPTCHA challenge.");
    //   return;
    // }

    submitting.current = true;
    setLoading(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, category, subCategory }),
      });

      const data = await res.json();

      if (res.ok && data.success === true) {
        // Count only accepted enquiries and only with analytics consent; never send PII.
        try {
          const preferences = JSON.parse(window.localStorage.getItem("resolve-us-optional-cookies-v1") || "null");
          if (preferences?.analytics === true) {
            window.gtag?.("event", "generate_lead", { method: "consultation_form" });
          }
        } catch {
          // No analytics when consent preferences cannot be read.
        }
        setFormStatus({ type: "success", message: data.message || "Your consultation request has been sent." });
        setForm({ name: "", email: "", phone: "", message: "" });
        setCategory("");
        setSubCategory("");
      } else {
        setFormStatus({ type: "error", message: data.error || "We could not send your request. Please try again." });
      }
    } catch {
      setFormStatus({ type: "error", message: "Network error. Please check your connection and try again." });
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  return (
<main className="bg-linear-to-br from-teal-50 to-white px-6 py-12 md:py-16">
  <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.8fr_1.2fr]">
    <aside className="h-fit rounded-2xl bg-slate-950 p-8 text-white shadow-lg">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-300">Business transparency</p>
      <h1 className="mt-3 text-3xl font-bold">Contact ResolveUS</h1>
      <p className="mt-4 text-sm leading-6 text-slate-300">ResolveUS is a consumer-facing AI-powered consultation platform for everyday guidance and online tasks.</p>
      <a href="tel:+18332162311" className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-white px-4 py-3 text-center text-base font-bold text-teal-700 transition hover:bg-teal-50">Call Now: +1 (833) 216-2311</a>
      <p className="mt-2 text-center text-xs text-slate-300">International: +18332162311</p>
       <p className="mt-5 text-sm">Legal operator: A V Food Factory.</p>
      <dl className="mt-8 space-y-5 text-sm">
        <div><dt className="font-semibold text-teal-200">Brand Name</dt><dd className="mt-1 text-white">ResolveUS</dd></div>
        <div><dt className="font-semibold text-teal-200">Customer Support</dt><dd className="mt-1"><a className="text-white underline" href="/contact#consultation-form">Contact our team</a></dd></div>
        <div><dt className="font-semibold text-teal-200">Support &amp; refunds</dt><dd className="mt-1"><a className="break-all text-white underline" href="mailto:support@resolve-us.com">support@resolve-us.com</a></dd></div>
        <div><dt className="font-semibold text-teal-200">Phone</dt><dd className="mt-1"><a className="text-white underline" href="tel:+18332162311">+1 (833) 216-2311</a></dd></div>
        <div><dt className="font-semibold text-teal-200">Sales</dt><dd className="mt-1"><a className="text-white underline" href="/contact#consultation-form">Contact our team</a></dd></div>
        <div><dt className="font-semibold text-teal-200">Business Hours</dt><dd className="mt-1 text-slate-300">Customer Support availability is provided when you contact us.</dd></div>
      </dl>
    </aside>
      <div className="text-gray-900 bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Start a Consultation
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Tell us what you need help with. ResolveUS provides general guidance
          and consultation; regulated professional advice is not provided. No payments are accepted through this site. Please do not include payment-card details or account passwords in your message.
        </p>

        {formStatus && (
          <div
            role="status"
            className={`mb-6 rounded-lg border px-4 py-3 text-sm ${formStatus.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}
          >
            {formStatus.message}
          </div>
        )}

        <form id="consultation-form" onSubmit={handleSubmit} className="scroll-mt-28 space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 px-4 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 px-4 py-2"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="Enter your message"
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 px-4 py-2 min-h-30"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              title="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubCategory("");
              }}
              className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 px-4 py-2"
              required
            >
              <option value="">Select a category</option>
              {allCategories.map((cat, i) => (
                <option key={i} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          {/* Sub-category */}
          {category && (
            <div>
              <label htmlFor="sub-category" className="block text-sm font-medium text-gray-700 mb-1">
                Sub-Category
              </label>
              <select
                id="sub-category"
              title="Sub-category"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 px-4 py-2"
                required
              >
                <option value="">Select a sub-category</option>
                {allCategories
                  .find((cat) => cat.title === category)
                  ?.description.map((sub, idx) => (
                    <option key={idx} value={sub}>
                      {sub}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Submit */}
<button
  type="submit"
  disabled={loading}
  className={`w-full py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center gap-3 ${
    !loading
      ? "bg-teal-600 hover:bg-teal-700 text-white"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  {loading ? (
    <>
      <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      Sending…
    </>
  ) : (
    "Submit"
  )}
</button>

        </form>
      </div>
  </div>
</main>
  );
}
