import type { Metadata } from "next"
import { CloudRain } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"

export const metadata: Metadata = {
  title: "Pittige momenten",
}

export default function HardMomentsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Pittige momenten"
        description="Ook de mindere momenten mogen er zijn. Leg ze vast en herken samen patronen."
      />
      <EmptyState
        icon={CloudRain}
        title="Nog geen pittige momenten vastgelegd"
        description="Veel huilen, krampjes, een slechte nacht — je hoeft het niet alleen te onthouden."
      />
    </div>
  )
}
