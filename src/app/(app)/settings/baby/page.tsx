import type { Metadata } from "next"
import { Baby } from "lucide-react"

import { getFamilyContext } from "@/services/family"
import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { BabyAvatar } from "@/components/shared/baby-avatar"
import { formatBabyAge } from "@/utils/age"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Baby profiel",
}

const profileFields: Array<{
  label: string
  value: (
    baby: NonNullable<
      Awaited<ReturnType<typeof getFamilyContext>>
    >["babies"][number]
  ) => string | null
}> = [
  { label: "Roepnaam", value: (b) => b.nickname },
  {
    label: "Geboortedatum",
    value: (b) => new Date(b.birth_date).toLocaleDateString("nl-NL"),
  },
  { label: "Ziekenhuis", value: (b) => b.hospital },
  { label: "Verloskundige", value: (b) => b.midwife },
  { label: "Bloedgroep", value: (b) => b.blood_type },
  { label: "Allergieën", value: (b) => b.allergies },
  { label: "Medicatie", value: (b) => b.medication },
  { label: "Huisarts", value: (b) => b.general_practitioner },
  { label: "Zorgverzekering", value: (b) => b.health_insurance },
]

export default async function BabyProfilePage() {
  const context = await getFamilyContext()
  const baby = context?.babies[0]

  return (
    <div className="space-y-8">
      <PageHeader
        title="Baby profiel"
        description="De belangrijkste gegevens van je kindje, overzichtelijk op één plek."
      />

      {baby ? (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <BabyAvatar
              photoUrl={baby.photo_url}
              name={baby.first_name}
              size="xl"
            />
            <div>
              <h2 className="font-heading text-foreground text-2xl font-medium">
                {baby.first_name}
              </h2>
              <p className="text-muted-foreground text-sm">
                {formatBabyAge(baby.birth_date)}
              </p>
            </div>
          </div>
          <Card className="rounded-3xl">
            <CardContent className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2">
              {profileFields.map((field) => {
                const value = field.value(baby)
                if (!value) return null
                return (
                  <div key={field.label}>
                    <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                      {field.label}
                    </p>
                    <p className="text-foreground text-sm">{value}</p>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      ) : (
        <EmptyState
          icon={Baby}
          title="Nog geen baby toegevoegd"
          description="Voeg de gegevens van je kindje toe: naam, geboortedatum, gewicht en meer."
        />
      )}
    </div>
  )
}
