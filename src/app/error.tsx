"use client"

import { useEffect } from "react"
import { RefreshCcw } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="bg-background flex min-h-dvh flex-col items-center justify-center gap-6 px-4 text-center">
      <span className="bg-destructive/10 text-destructive flex size-14 items-center justify-center rounded-full">
        <RefreshCcw className="size-6" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div className="space-y-2">
        <h1 className="font-heading text-foreground text-2xl font-medium">
          Er ging iets mis
        </h1>
        <p className="text-muted-foreground max-w-sm text-sm">
          Neem ons niet kwalijk, er ging iets fout. Probeer de pagina opnieuw te
          laden.
        </p>
      </div>
      <Button size="lg" onClick={reset}>
        Probeer opnieuw
      </Button>
    </div>
  )
}
