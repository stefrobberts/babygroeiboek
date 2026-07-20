import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface SectionHeaderProps extends React.ComponentProps<"div"> {
  title: string
  description?: string
  href?: string
  linkLabel?: string
}

export function SectionHeader({
  title,
  description,
  href,
  linkLabel = "Alles bekijken",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn("flex items-end justify-between gap-4", className)}
      {...props}
    >
      <div className="space-y-1">
        <h2 className="font-heading text-foreground text-xl font-medium tracking-tight sm:text-2xl">
          {title}
        </h2>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="text-primary hover:text-primary/80 inline-flex shrink-0 items-center gap-0.5 text-sm font-medium transition-colors"
        >
          {linkLabel}
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  )
}
