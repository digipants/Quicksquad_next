import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies, headers } from "next/headers";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Script from "next/script";
import ChatWidget from "@/components/ChatWidget";
import HeaderAu from "@/components/Header/HeaderAu";
import HeaderUs from "@/components/Header/HeaderUs";
import FooterAu from "@/components/Footer/FooterAu";
import FooterUs from "@/components/Footer/FooterUs";
import SiteDisclosure from "@/components/SiteDisclosure";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://resolve-us.com"),
  title: {
    default: "Resolve US | AI-Powered Everyday Consultation",
    template: "%s | Resolve US",
  },
  description:
    "Resolve US is an AI-powered consultation platform providing everyday digital guidance across technology, finance, travel, government services, and more.",
  keywords: [
    "consultation services",
    "online consultation",
    "expert guidance",
    "financial assistance",
    "travel assistance",
    "government services guidance",
    "digital services",
    "career guidance",
    "consumer assistance",
    "Resolve US",
  ],
  authors: [{ name: "Resolve US", url: "https://resolve-us.com" }],
  creator: "Resolve US",
  publisher: "Resolve US",
  category: "Consumer consultation services",
  openGraph: {
    title: "Resolve US | AI-Powered Everyday Consultation",
    description:
      "Trusted general guidance for technology, finance, travel, digital accounts, government services, healthcare, shopping, and more.",
    url: "https://resolve-us.com",
    siteName: "Resolve US",
    images: [
      {
        url: "https://resolve-us.com/images/resolve-us-og.png",
        width: 1200,
        height: 630,
        alt: "Resolve US Consultation Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resolve US | AI-Powered Everyday Consultation",
    description:
      "General consumer guidance across everyday online tasks and questions.",
    images: ["https://resolve-us.com/images/resolve-us-og.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://resolve-us.com/#organization",
      name: "A V TRADE CORPORATION",
      brand: { "@type": "Brand", name: "Resolve US" },
      description: "AI-powered consumer consultation platform for everyday online tasks and questions.",
      url: "https://resolve-us.com",
      legalName: "A V TRADE CORPORATION",
    },
    {
      "@type": "WebSite",
      "@id": "https://resolve-us.com/#website",
      name: "Resolve US",
      url: "https://resolve-us.com",
      publisher: { "@id": "https://resolve-us.com/#organization" },
    },
    {
      "@type": "Service",
      name: "Resolve US Everyday Consultation Services",
      provider: { "@id": "https://resolve-us.com/#organization" },
      serviceType: "AI-powered consumer guidance and consultation",
      areaServed: "Worldwide",
      description: "General guidance for technology, finance, travel, digital accounts, shopping, career, healthcare information, government-service tasks, and everyday online help.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What does Resolve US provide?", acceptedAnswer: { "@type": "Answer", text: "Resolve US provides general consumer guidance and consultation for everyday questions and online tasks." } },
        { "@type": "Question", name: "Is Resolve US a bank, law firm, medical provider, investment adviser, or government agency?", acceptedAnswer: { "@type": "Answer", text: "No. Resolve US does not provide regulated professional services. Information is general and educational; consult qualified professionals when required." } },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://resolve-us.com" }],
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const cookieStore = await cookies();
const headerStore = await headers();

const countryHeader = headerStore.get("x-country");
const country = countryHeader || cookieStore.get("country")?.value;


  // Select proper header
  const HeaderComponent =
    country === "AU"
      ? HeaderAu
      : country === "US"
      ? HeaderUs
      : Navbar; // default

  // Select proper footer
  const FooterComponent =
    country === "AU"
      ? FooterAu
      : country === "US"
      ? FooterUs
      : Footer; // default

  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5HV0XZ5FSJ"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5HV0XZ5FSJ');
            gtag('config', 'AW-18376694937');
          `}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <HeaderComponent />
        {children}
        <SiteDisclosure />
        <ChatWidget />
        <FooterComponent />
      </body>
    </html>
  );
}
