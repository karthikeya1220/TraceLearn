import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://tracelearn.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
