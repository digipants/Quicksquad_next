import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  alternates: { canonical: "/faq-page" },
  openGraph: { title: "Frequently Asked Questions | Resolve US", url: "/faq-page" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
