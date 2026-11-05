import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://resolve-us.com";

  // These routes have public, indexable pages. Blog detail pages are omitted
  // until the content model distinguishes published posts from local fallback
  // content and drafts, so this sitemap does not advertise unverified slugs.
  const publicRoutes = [
    "/",
    "/about",
    "/contact",
    "/pricing",
    "/services",
    "/dashprotection",
    "/terms-of-service",
    "/privacy-policy",
    "/refund-policy",
    "/disclaimer",
    "/faq-page",
    "/speedtest",
    "/blog",
  ];

  return publicRoutes.map((path) => ({
    url: path === "/" ? baseUrl : `${baseUrl}${path}`,
  }));
}
