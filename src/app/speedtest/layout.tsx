import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speed Test",
  alternates: { canonical: "/speedtest" },
  openGraph: { title: "Speed Test | ResolveUS", url: "/speedtest" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
