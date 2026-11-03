import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  alternates: { canonical: "/pricing" },
  openGraph: { title: "Pricing | Resolve US", url: "/pricing" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
