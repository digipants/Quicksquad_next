import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://resolve-us.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"], // block backend & private routes
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
