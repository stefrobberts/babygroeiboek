import type { Metadata } from "next"
import { History } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"

export const metadata: Metadata = {
  title: "Tijdlijn",
}

export default function TimelinePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Tijdlijn"
        description="Het digitale dagboek van jullie eerste jaar samen, helemaal chronologisch."
      />
      <EmptyState
        icon={History}
        title="De tijdlijn is nog leeg"
        description="Voedingen, slaapjes, luiers, foto's en mijlpalen komen hier automatisch samen zodra je ze vastlegt."
      />
    </div>
  )
}
