import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { signInWithGoogle } from "@/actions/auth"
import { Logo } from "@/components/shared/logo"
import { GoogleIcon } from "@/components/shared/google-icon"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/shared/fade-in"

export const metadata: Metadata = {
  title: "Inloggen",
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>
}) {
  const { next, error } = await searchParams

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect(next ?? "/dashboard")
  }

  return (
    <main className="bg-background relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-12">
      <div
        aria-hidden="true"
        className="bg-secondary/25 pointer-events-none absolute -top-32 -left-24 size-80 rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-success/15 pointer-events-none absolute -right-24 -bottom-32 size-96 rounded-full blur-3xl"
      />

      <FadeIn className="border-border bg-card relative w-full max-w-sm space-y-8 rounded-3xl border p-8 shadow-sm sm:p-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <Logo showWordmark={false} className="scale-125" />
          <div className="space-y-2">
            <h1 className="font-heading text-foreground text-2xl font-medium tracking-tight">
              Welkom bij Babygroeiboek
            </h1>
            <p className="text-muted-foreground text-sm">
              Log in om de eerste jaren van jullie kindje samen vast te leggen.
            </p>
          </div>
        </div>

        <form
          action={async () => {
            "use server"
            await signInWithGoogle(next)
          }}
        >
          <Button type="submit" variant="outline" size="xl" className="w-full">
            <GoogleIcon className="size-5" />
            Inloggen met Google
          </Button>
        </form>

        {error ? (
          <p className="text-destructive text-center text-sm">
            Er ging iets mis bij het inloggen. Probeer het nogmaals.
          </p>
        ) : null}

        <p className="text-muted-foreground text-center text-xs text-balance">
          Jullie gegevens zijn privé en worden nooit gedeeld. Alleen jij en de
          mensen die je uitnodigt kunnen dit babyboek zien.
        </p>
      </FadeIn>
    </main>
  )
}
