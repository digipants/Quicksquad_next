"use client";
import { useState } from "react";
import TestimonialsSection from "../pages/Testimonialsection";
import Image from "next/image";

const faqs = [
  { question: "How do I request a consultation?", answer: "Select a category and use the consultation form. Our team will follow up about the scope and next steps." },
  { question: "Can I make a payment on the website?", answer: "No. ResolveUS does not accept or record payments or payment details on this website. Any agreed payment arrangements are handled separately." },
  { question: "Do you offer monthly plans?", answer: "Basic is $20/month, Premium is $75/month, and Enterprise is quoted individually. These rates do not initiate automatic billing through this website." },
  { question: "How can I request a refund?", answer: "Email support@resolve-us.com with your purchase information and reason for the request. Eligible refunds are issued within 14 calendar days after approval." },
  { question: "Can I obtain billing documentation?", answer: "Contact support@resolve-us.com for assistance with documentation relating to any agreed payment outside the website." },
  { question: "Can I cancel my plan?", answer: "Email support@resolve-us.com to discuss cancellation of any ongoing arrangement. This website does not initiate automatic recurring charges." },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Frequently Asked Questions
          </h1>
          <div className="border-t-2 border-teal-600 w-24 mx-auto mt-2"></div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 cursor-pointer transition-all duration-300 ease-in-out"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">{faq.question}</h3>
                <Image
                width={5}          // ← required
  height={5}
                  src="https://cdn.prod.website-files.com/5746a22e485f3a03442bea0f/59a0272ee70cd600015ee73f_next.png"
                  alt="toggle"
                  className={`w-4 h-4 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-90" : ""
                  }`}
                />
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 mt-2" : "max-h-0"
                }`}
              >
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TestimonialsSection/>
    </section>
  );
}
