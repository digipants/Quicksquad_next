import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | ResolveUS", url: "/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
