import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  alternates: { canonical: "/pricing" },
  openGraph: { title: "Pricing | ResolveUS", url: "/pricing" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
