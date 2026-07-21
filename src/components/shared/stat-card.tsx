import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface StatCardProps extends React.ComponentProps<"div"> {
  icon: LucideIcon
  label: string
  value: string
  meta?: string
  tone?: "primary" | "success" | "warning" | "secondary"
}

const toneClasses: Record<NonNullable<StatCardProps["tone"]>, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/25 text-secondary-foreground",
  success: "bg-success/15 text-success",
  warning: "bg-warning/20 text-warning-foreground",
}

export function StatCard({
  icon: Icon,
  label,
  value,
  meta,
  tone = "primary",
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(
        "border-border bg-card flex items-center gap-4 rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-full",
          toneClasses[tone]
        )}
      >
        <Icon className="size-5" aria-hidden="true" strokeWidth={1.5} />
      </span>
      <div className="min-w-0">
        <p className="text-muted-foreground truncate text-sm">{label}</p>
        <p className="font-heading text-foreground truncate text-2xl font-semibold">
          {value}
        </p>
        {meta ? (
          <p className="text-muted-foreground truncate text-xs">{meta}</p>
        ) : null}
      </div>
    </div>
  )
}
