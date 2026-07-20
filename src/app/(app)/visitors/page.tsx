import type { Metadata } from "next"
import { Users } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"

export const metadata: Metadata = {
  title: "Kraambezoek",
}

export default function VisitorsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Kraambezoek"
        description="Wie er allemaal langskwamen in de kraamtijd, met cadeautjes en lieve herinneringen."
      />
      <EmptyState
        icon={Users}
        title="Nog geen bezoekers vastgelegd"
        description="Leg vast wie er op bezoek kwam, wat ze meebrachten en welk mooi moment jullie samen hadden."
      />
    </div>
  )
}
