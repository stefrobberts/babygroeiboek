import type { Metadata } from "next"
import { BookHeart } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"

export const metadata: Metadata = {
  title: "Jaarboek",
}

export default function YearbookPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Jaarboek"
        description="Een luxe jaaroverzicht met de mooiste foto's, mijlpalen en verhalen om te bewaren."
      />
      <EmptyState
        icon={BookHeart}
        title="Het eerste jaarboek volgt na het eerste jaar"
        description="Zodra jullie een heel jaar hebben vastgelegd, stellen we hier automatisch een prachtig jaaroverzicht samen."
      />
    </div>
  )
}
