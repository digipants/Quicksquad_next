import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies, headers } from "next/headers";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import CookieConsent from "@/components/CookieConsent";
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

export const viewport: Viewport = { themeColor: "#091D35" };

export const metadata: Metadata = {
  metadataBase: new URL("https://resolve-us.com"),
  title: {
    default: "ResolveUS | AI-Powered Everyday Consultation",
    template: "%s | ResolveUS",
  },
  description:
    "ResolveUS is an AI-powered consultation platform providing everyday digital guidance across technology, finance, travel, government services, and more.",
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
    "ResolveUS",
  ],
  authors: [{ name: "ResolveUS", url: "https://resolve-us.com" }],
  creator: "ResolveUS",
  publisher: "ResolveUS",
  category: "Consumer consultation services",
  openGraph: {
    title: "ResolveUS | AI-Powered Everyday Consultation",
    description:
      "Trusted general guidance for technology, finance, travel, digital accounts, government services, healthcare, shopping, and more.",
    url: "https://resolve-us.com",
    siteName: "ResolveUS",
    images: [
      {
        url: "https://resolve-us.com/images/resolve-us-og.png",
        width: 1200,
        height: 630,
        alt: "ResolveUS Consultation Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResolveUS | AI-Powered Everyday Consultation",
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
      name: "A V Food Factory",
      brand: { "@type": "Brand", name: "ResolveUS" },
      description: "AI-powered consumer consultation platform for everyday online tasks and questions.",
      url: "https://resolve-us.com",
      legalName: "A V Food Factory",
      telephone: "+1-833-216-2311",
    },
    {
      "@type": "WebSite",
      "@id": "https://resolve-us.com/#website",
      name: "ResolveUS",
      url: "https://resolve-us.com",
      publisher: { "@id": "https://resolve-us.com/#organization" },
    },
    {
      "@type": "Service",
      name: "ResolveUS Everyday Consultation Services",
      provider: { "@id": "https://resolve-us.com/#organization" },
      serviceType: "AI-powered consumer guidance and consultation",
      description: "General guidance for technology, finance, travel, digital accounts, shopping, career, healthcare information, government-service tasks, and everyday online help.",
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
        <script
          id="resolve-us-consent-defaults"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
              window.gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
              });
            `,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <HeaderComponent />
        {children}
        <SiteDisclosure />
        <CookieConsent />
        <ChatWidget />
        <FooterComponent />
      </body>
    </html>
  );
}
