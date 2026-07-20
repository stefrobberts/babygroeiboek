import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/feeding",
        "/sleep",
        "/diapers",
        "/growth",
        "/timeline",
        "/milestones",
        "/photos",
        "/yearbook",
        "/hard-moments",
        "/visitors",
        "/settings",
        "/auth",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
