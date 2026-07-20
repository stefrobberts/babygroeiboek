import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface EmptyStateProps extends React.ComponentProps<"div"> {
  icon: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "border-border bg-card/60 flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed px-6 py-16 text-center",
        className
      )}
      {...props}
    >
      <span className="bg-accent text-accent-foreground flex size-14 items-center justify-center rounded-full">
        <Icon className="size-6" aria-hidden="true" strokeWidth={1.5} />
      </span>
      <div className="space-y-1.5">
        <h3 className="font-heading text-foreground text-xl font-medium">
          {title}
        </h3>
        {description ? (
          <p className="text-muted-foreground mx-auto max-w-sm text-sm">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  )
}
