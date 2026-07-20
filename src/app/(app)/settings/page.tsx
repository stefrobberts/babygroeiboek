import type { Metadata } from "next"
import Link from "next/link"
import { Baby, LogOut, Users } from "lucide-react"

import { getFamilyContext } from "@/services/family"
import { signOut } from "@/actions/auth"
import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { BabyAvatar } from "@/components/shared/baby-avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Instellingen",
}

const roleLabel: Record<string, string> = {
  mother: "Moeder",
  father: "Vader",
  parent: "Ouder",
  grandmother: "Oma",
  grandfather: "Opa",
  caregiver: "Oppas",
  other: "Verzorger",
}

export default async function SettingsPage() {
  const context = await getFamilyContext()

  return (
    <div className="space-y-8">
      <PageHeader
        title="Instellingen"
        description="Beheer je account, gezin en de gegevens van je kindje."
      />

      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle className="font-heading text-lg font-medium">
            Account
          </CardTitle>
          <CardDescription>
            {context?.profile.full_name ?? context?.profile.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signOut}>
            <Button type="submit" variant="outline">
              <LogOut className="size-4" />
              Uitloggen
            </Button>
          </form>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="font-heading text-foreground text-xl font-medium">
          Gezin
        </h2>
        {context ? (
          <Card className="rounded-3xl">
            <CardContent className="flex items-center justify-between pt-6">
              <div className="flex items-center gap-3">
                <span className="bg-accent text-accent-foreground flex size-10 items-center justify-center rounded-full">
                  <Users className="size-4.5" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-foreground font-medium">
                    {context.family.name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Jouw rol: {roleLabel[context.role] ?? context.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <EmptyState
            icon={Users}
            title="Nog geen gezin ingesteld"
            description="Maak een gezin aan om samen met je partner of andere verzorgers dezelfde baby bij te houden."
          />
        )}
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-foreground text-xl font-medium">
          Baby&apos;s
        </h2>
        {context && context.babies.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {context.babies.map((baby) => (
              <Link
                key={baby.id}
                href="/settings/baby"
                className="border-border bg-card hover:bg-accent flex items-center gap-3 rounded-2xl border p-4 transition-colors"
              >
                <BabyAvatar
                  photoUrl={baby.photo_url}
                  name={baby.first_name}
                  size="sm"
                />
                <span className="text-foreground font-medium">
                  {baby.nickname ?? baby.first_name}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Baby}
            title="Nog geen baby toegevoegd"
            description="Voeg de gegevens van je kindje toe om alle functionaliteiten van Babygroeiboek te gebruiken."
          />
        )}
      </section>
    </div>
  )
}
