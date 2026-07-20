import type { Metadata } from "next"
import { Droplets } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"

export const metadata: Metadata = {
  title: "Luiers",
}

export default function DiapersPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Luiers"
        description="Houd verschoningen bij en volg het ritme van je kindje."
      />
      <EmptyState
        icon={Droplets}
        title="Nog geen luiers vastgelegd"
        description="Zodra je de eerste verschoning toevoegt, verschijnt hier een overzicht met tijden en statistieken."
      />
    </div>
  )
}
