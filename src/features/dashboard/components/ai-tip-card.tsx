import { Sparkles } from "lucide-react"

import type { DashboardAiTip } from "@/features/dashboard/types"

export function AiTipCard({ tip }: { tip: DashboardAiTip }) {
  return (
    <section className="bg-primary text-primary-foreground flex gap-4 rounded-3xl p-6 sm:p-7">
      <span className="bg-primary-foreground/15 flex size-10 shrink-0 items-center justify-center rounded-full">
        <Sparkles className="size-5" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div className="space-y-1.5">
        <p className="text-primary-foreground/70 text-xs font-medium tracking-wide uppercase">
          {tip.title}
        </p>
        <p className="text-primary-foreground/95 text-base leading-relaxed">
          {tip.content}
        </p>
      </div>
    </section>
  )
}
