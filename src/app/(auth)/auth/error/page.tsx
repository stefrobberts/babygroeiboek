import type { Metadata } from "next"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Inloggen mislukt",
}

export default function AuthErrorPage() {
  return (
    <main className="bg-background flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-12 text-center">
      <span className="bg-destructive/10 text-destructive flex size-14 items-center justify-center rounded-full">
        <AlertCircle className="size-6" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div className="space-y-2">
        <h1 className="font-heading text-foreground text-2xl font-medium">
          Inloggen is niet gelukt
        </h1>
        <p className="text-muted-foreground max-w-sm text-sm">
          Er ging iets mis tijdens het inloggen met Google. Probeer het opnieuw,
          of neem contact op als dit blijft gebeuren.
        </p>
      </div>
      <Button render={<Link href="/login" />} size="lg">
        Terug naar inloggen
      </Button>
    </main>
  )
}
