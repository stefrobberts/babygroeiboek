import { SectionHeader } from "@/components/shared/section-header"
import { cn } from "@/lib/utils"
import { formatRelativeTime } from "@/utils/format"
import {
  timelineEventIcon,
  timelineEventTone,
} from "@/features/timeline/lib/event-icon"
import type { DashboardTimelineEvent } from "@/features/dashboard/types"

const toneClasses = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/15 text-secondary-foreground",
  success: "bg-success/15 text-success",
  warning: "bg-warning/20 text-warning-foreground",
}

export function TimelinePreview({
  events,
}: {
  events: DashboardTimelineEvent[]
}) {
  return (
    <section className="space-y-4">
      <SectionHeader
        title="Tijdlijn"
        description="Het digitale dagboek van de afgelopen dagen"
        href="/timeline"
      />
      <ol className="border-border bg-card space-y-1 rounded-3xl border p-2 sm:p-3">
        {events.map((event, index) => {
          const Icon = timelineEventIcon[event.type]
          const tone = timelineEventTone[event.type]

          return (
            <li
              key={event.id}
              className={cn(
                "flex items-start gap-3.5 rounded-2xl px-3 py-3",
                index !== events.length - 1 && "border-border/70 border-b"
              )}
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full",
                  toneClasses[tone]
                )}
              >
                <Icon
                  className="size-4.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-foreground text-sm font-medium">
                  {event.title}
                </p>
                {event.description ? (
                  <p className="text-muted-foreground truncate text-sm">
                    {event.description}
                  </p>
                ) : null}
              </div>
              <p className="text-muted-foreground shrink-0 pt-0.5 text-xs whitespace-nowrap">
                {formatRelativeTime(event.occurredAt)}
              </p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
