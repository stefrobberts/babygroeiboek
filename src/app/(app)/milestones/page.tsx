import type { Metadata } from "next"
import { Sparkles } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"

export const metadata: Metadata = {
  title: "Mijlpalen",
}

export default function MilestonesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Mijlpalen"
        description="Alle bijzondere eerste keren, automatisch ingedeeld per leeftijd."
      />
      <EmptyState
        icon={Sparkles}
        title="Nog geen mijlpalen bereikt"
        description="Van de eerste glimlach tot de eerste stapjes — leg iedere bijzondere eerste keer hier vast."
      />
    </div>
  )
}
