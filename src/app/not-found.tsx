import Link from "next/link"
import { Compass } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/shared/logo"

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-dvh flex-col items-center justify-center gap-6 px-4 text-center">
      <Logo showWordmark={false} />
      <span className="bg-accent text-accent-foreground flex size-14 items-center justify-center rounded-full">
        <Compass className="size-6" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div className="space-y-2">
        <h1 className="font-heading text-foreground text-2xl font-medium">
          Deze pagina bestaat niet
        </h1>
        <p className="text-muted-foreground max-w-sm text-sm">
          We kunnen de pagina die je zoekt niet vinden. Misschien is hij
          verplaatst of bestaat de link niet meer.
        </p>
      </div>
      <Button render={<Link href="/dashboard" />} size="lg">
        Terug naar dashboard
      </Button>
    </div>
  )
}
