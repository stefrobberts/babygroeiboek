import { Droplets, Milk, Moon } from "lucide-react"

import { StatCard } from "@/components/shared/stat-card"
import {
  formatDurationMinutes,
  formatRelativeTime,
  formatTime,
} from "@/utils/format"
import type {
  DashboardLastDiaper,
  DashboardLastFeed,
  DashboardLastSleep,
} from "@/features/dashboard/types"

const feedTypeLabel: Record<DashboardLastFeed["type"], string> = {
  breast: "Borstvoeding",
  bottle: "Flesvoeding",
  solid: "Vaste voeding",
}

const feedSideLabel: Record<NonNullable<DashboardLastFeed["side"]>, string> = {
  left: "links",
  right: "rechts",
  both: "beide kanten",
}

const diaperTypeLabel: Record<DashboardLastDiaper["type"], string> = {
  wee: "Plas",
  poop: "Poep",
  both: "Plas en poep",
}

interface QuickStatsProps {
  lastFeed: DashboardLastFeed | null
  lastSleep: DashboardLastSleep | null
  lastDiaper: DashboardLastDiaper | null
}

export function QuickStats({
  lastFeed,
  lastSleep,
  lastDiaper,
}: QuickStatsProps) {
  const sleepDurationMinutes =
    lastSleep?.endedAt && lastSleep.startedAt
      ? Math.round(
          (new Date(lastSleep.endedAt).getTime() -
            new Date(lastSleep.startedAt).getTime()) /
            60000
        )
      : null

  return (
    <section
      aria-label="Laatste activiteiten"
      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
    >
      <StatCard
        icon={Milk}
        tone="secondary"
        label="Laatste voeding"
        value={lastFeed ? formatTime(lastFeed.startedAt) : "Nog niet"}
        meta={
          lastFeed
            ? `${feedTypeLabel[lastFeed.type]}${lastFeed.side ? ` · ${feedSideLabel[lastFeed.side]}` : ""} · ${formatRelativeTime(lastFeed.startedAt)}`
            : "Voeg de eerste voeding toe"
        }
      />
      <StatCard
        icon={Moon}
        tone="primary"
        label="Laatste slaap"
        value={
          sleepDurationMinutes !== null
            ? formatDurationMinutes(sleepDurationMinutes)
            : lastSleep
              ? "Nu aan het slapen"
              : "Nog niet"
        }
        meta={
          lastSleep
            ? `Gestart ${formatRelativeTime(lastSleep.startedAt)}`
            : "Start een slaapsessie"
        }
      />
      <StatCard
        icon={Droplets}
        tone="success"
        label="Laatste luier"
        value={lastDiaper ? diaperTypeLabel[lastDiaper.type] : "Nog niet"}
        meta={
          lastDiaper
            ? formatRelativeTime(lastDiaper.occurredAt)
            : "Voeg de eerste luier toe"
        }
      />
    </section>
  )
}
