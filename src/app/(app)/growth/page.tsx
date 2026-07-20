import type { Metadata } from "next"
import { TrendingUp } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"

export const metadata: Metadata = {
  title: "Groei",
}

export default function GrowthPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Groei"
        description="Volg gewicht, lengte en hoofdomtrek langs de WHO-groeicurves."
      />
      <EmptyState
        icon={TrendingUp}
        title="Nog geen metingen vastgelegd"
        description="Zodra je de eerste meting toevoegt, verschijnen hier grafieken en een duidelijke uitleg van de groei."
      />
    </div>
  )
}
