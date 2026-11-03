import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | Resolve US", url: "/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
