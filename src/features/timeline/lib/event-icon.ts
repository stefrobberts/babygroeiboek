import {
  Baby,
  Camera,
  Droplets,
  type LucideIcon,
  Milk,
  Moon,
  Notebook,
  Sparkles,
  TrendingUp,
  Users,
  CloudRain,
} from "lucide-react"

import type { TimelineEventType } from "@/types/database.types"

export const timelineEventIcon: Record<TimelineEventType, LucideIcon> = {
  birth: Baby,
  feed: Milk,
  sleep: Moon,
  diaper: Droplets,
  photo: Camera,
  milestone: Sparkles,
  visitor: Users,
  growth: TrendingUp,
  note: Notebook,
  hard_moment: CloudRain,
}

export const timelineEventTone: Record<
  TimelineEventType,
  "primary" | "secondary" | "success" | "warning"
> = {
  birth: "primary",
  feed: "secondary",
  sleep: "primary",
  diaper: "success",
  photo: "warning",
  milestone: "warning",
  visitor: "secondary",
  growth: "success",
  note: "primary",
  hard_moment: "warning",
}
