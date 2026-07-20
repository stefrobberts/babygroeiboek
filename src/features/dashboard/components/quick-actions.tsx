import Link from "next/link"
import {
  Camera,
  Droplets,
  Milk,
  Moon,
  Sparkles,
  TrendingUp,
} from "lucide-react"

import { SectionHeader } from "@/components/shared/section-header"

const actions = [
  { title: "Voeding", href: "/feeding", icon: Milk },
  { title: "Slaap", href: "/sleep", icon: Moon },
  { title: "Luier", href: "/diapers", icon: Droplets },
  { title: "Groei", href: "/growth", icon: TrendingUp },
  { title: "Foto", href: "/photos", icon: Camera },
  { title: "Mijlpaal", href: "/milestones", icon: Sparkles },
]

export function QuickActions() {
  return (
    <section className="space-y-4">
      <SectionHeader title="Snel toevoegen" />
      <div className="-mx-4 flex scrollbar-none gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-6 sm:overflow-visible sm:px-0">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="border-border bg-card hover:bg-accent flex w-24 shrink-0 flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-center transition-colors sm:w-auto"
          >
            <span className="bg-accent text-accent-foreground flex size-11 items-center justify-center rounded-full">
              <action.icon
                className="size-5"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </span>
            <span className="text-foreground text-sm font-medium">
              {action.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
