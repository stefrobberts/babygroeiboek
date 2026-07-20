export const siteConfig = {
  name: "Babygroeiboek",
  fullName: "Babygroeiboek.nl",
  tagline: "Het digitale babyboek voor jullie eerste jaren samen",
  description:
    "Leg de eerste jaren van je kindje vast: voedingen, slaap, luiers, groei, mijlpalen en de mooiste foto's. Rustig, warm en overzichtelijk op één plek.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://babygroeiboek.nl",
  ogImage: "/opengraph-image",
  locale: "nl_NL",
  links: {
    twitter: "",
    instagram: "",
  },
  keywords: [
    "babyboek",
    "babydagboek",
    "baby app",
    "baby bijhouden",
    "voeding bijhouden",
    "slaap baby",
    "mijlpalen baby",
    "groeiboek",
  ],
} as const

export type SiteConfig = typeof siteConfig
