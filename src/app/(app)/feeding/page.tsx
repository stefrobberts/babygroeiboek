import type { Metadata } from "next"
import { Milk } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"

export const metadata: Metadata = {
  title: "Voeding",
}

export default function FeedingPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Voeding"
        description="Houd borst- en flesvoeding bij en ontdek patronen in het eetritme van je kindje."
      />
      <EmptyState
        icon={Milk}
        title="Nog geen voedingen vastgelegd"
        description="Zodra je de eerste voeding toevoegt, verschijnt hier een overzicht met tijden, hoeveelheden en inzichten."
      />
    </div>
  )
}
