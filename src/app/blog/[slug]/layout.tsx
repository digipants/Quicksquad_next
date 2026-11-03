import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const url = `/blog/${encodeURIComponent(slug)}`;
  return { alternates: { canonical: url }, openGraph: { url } };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
