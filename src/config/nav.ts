import type { LucideIcon } from "lucide-react"
import {
  Baby,
  BookHeart,
  Camera,
  CloudRain,
  Droplets,
  History,
  Home,
  Milk,
  Moon,
  Settings,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  description: string
}

export const mainNavItem: NavItem = {
  title: "Dashboard",
  href: "/dashboard",
  icon: Home,
  description: "Het overzicht van vandaag",
}

export const trackingNavItems: NavItem[] = [
  {
    title: "Voeding",
    href: "/feeding",
    icon: Milk,
    description: "Borst- en flesvoeding bijhouden",
  },
  {
    title: "Slaap",
    href: "/sleep",
    icon: Moon,
    description: "Slaapjes en nachtrust bijhouden",
  },
  {
    title: "Luiers",
    href: "/diapers",
    icon: Droplets,
    description: "Verschonen bijhouden",
  },
  {
    title: "Groei",
    href: "/growth",
    icon: TrendingUp,
    description: "Gewicht, lengte en hoofdomtrek",
  },
]

export const memoryNavItems: NavItem[] = [
  {
    title: "Mijlpalen",
    href: "/milestones",
    icon: Sparkles,
    description: "Alle bijzondere eerste keren",
  },
  {
    title: "Tijdlijn",
    href: "/timeline",
    icon: History,
    description: "Het digitale dagboek van jullie kindje",
  },
  {
    title: "Foto's",
    href: "/photos",
    icon: Camera,
    description: "Het fotodagboek van je baby",
  },
  {
    title: "Jaarboek",
    href: "/yearbook",
    icon: BookHeart,
    description: "Een luxe jaaroverzicht om te bewaren",
  },
  {
    title: "Kraambezoek",
    href: "/visitors",
    icon: Users,
    description: "Wie er langs kwamen in de kraamtijd",
  },
  {
    title: "Pittige momenten",
    href: "/hard-moments",
    icon: CloudRain,
    description: "Ook de mindere momenten mogen er zijn",
  },
]

export const utilityNavItems: NavItem[] = [
  {
    title: "Baby profiel",
    href: "/settings/baby",
    icon: Baby,
    description: "Gegevens van je kindje",
  },
  {
    title: "Instellingen",
    href: "/settings",
    icon: Settings,
    description: "Gezin, account en voorkeuren",
  },
]

export const bottomNavItems: NavItem[] = [
  mainNavItem,
  memoryNavItems[1]!,
  memoryNavItems[2]!,
]

export const allNavItems: NavItem[] = [
  mainNavItem,
  ...trackingNavItems,
  ...memoryNavItems,
  ...utilityNavItems,
]
