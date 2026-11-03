import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog | Resolve US", url: "/blog" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
