import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { AppShell } from "@/components/layout/app-shell"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, avatar_url")
    .eq("id", user.id)
    .single()

  const name = profile?.full_name ?? user.email?.split("@")[0] ?? "Ouder"
  const email = profile?.email ?? user.email ?? ""

  return (
    <AppShell name={name} email={email} avatarUrl={profile?.avatar_url}>
      {children}
    </AppShell>
  )
}
