import type { Metadata } from "next"
import { Camera } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"

export const metadata: Metadata = {
  title: "Foto's",
}

export default function PhotosPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Foto's"
        description="Het fotodagboek van je baby, met herinneringen op vaste momenten."
      />
      <EmptyState
        icon={Camera}
        title="Nog geen foto's toegevoegd"
        description="Je krijgt automatisch een seintje op bijzondere momenten, van de eerste dag tot 2 jaar oud."
      />
    </div>
  )
}
