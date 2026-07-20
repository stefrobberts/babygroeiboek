import { Sparkles } from "lucide-react"

import { BabyAvatar } from "@/components/shared/baby-avatar"
import { formatBabyAge } from "@/utils/age"
import type {
  DashboardBaby,
  DashboardNextMilestone,
} from "@/features/dashboard/types"

interface WelcomeHeaderProps {
  parentName: string
  baby: DashboardBaby
  nextMilestone: DashboardNextMilestone | null
}

function getGreeting(hour: number) {
  if (hour < 6) return "Goedenacht"
  if (hour < 12) return "Goedemorgen"
  if (hour < 18) return "Goedemiddag"
  return "Goedenavond"
}

export function WelcomeHeader({
  parentName,
  baby,
  nextMilestone,
}: WelcomeHeaderProps) {
  const greeting = getGreeting(new Date().getHours())
  const displayName = baby.nickname ?? baby.firstName

  return (
    <section className="border-border bg-card flex flex-col gap-6 rounded-3xl border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div className="flex items-center gap-4">
        <BabyAvatar photoUrl={baby.photoUrl} name={displayName} size="lg" />
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm">
            {greeting}, {parentName.split(" ")[0]}
          </p>
          <h1 className="font-heading text-foreground text-2xl font-medium tracking-tight sm:text-3xl">
            {displayName}
          </h1>
          <p className="text-muted-foreground text-sm">
            {formatBabyAge(baby.birthDate)}
          </p>
        </div>
      </div>

      {nextMilestone ? (
        <div className="bg-warning/15 flex items-center gap-3 rounded-2xl px-4 py-3 sm:max-w-xs">
          <span className="bg-warning/25 text-warning-foreground flex size-9 shrink-0 items-center justify-center rounded-full">
            <Sparkles
              className="size-4.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </span>
          <div className="min-w-0">
            <p className="text-warning-foreground/80 text-xs font-medium tracking-wide uppercase">
              Volgende mijlpaal
            </p>
            <p className="text-foreground truncate text-sm font-medium">
              {nextMilestone.title}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  )
}
