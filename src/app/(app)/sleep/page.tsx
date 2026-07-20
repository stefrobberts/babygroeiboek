import type { Metadata } from "next"
import { Moon } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"

export const metadata: Metadata = {
  title: "Slaap",
}

export default function SleepPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Slaap"
        description="Start een slaaptimer of vul dutjes en nachtrust handmatig in."
      />
      <EmptyState
        icon={Moon}
        title="Nog geen slaapsessies vastgelegd"
        description="Zodra je de eerste slaapsessie toevoegt, zie je hier statistieken zoals totale slaap, gemiddelde en langste dutje."
      />
    </div>
  )
}
