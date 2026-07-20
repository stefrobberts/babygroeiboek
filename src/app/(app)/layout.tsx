import { redirect } from "next/navigation"

import { getAuthenticatedProfile } from "@/services/auth"
import { AppShell } from "@/components/layout/app-shell"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const auth = await getAuthenticatedProfile()

  if (!auth) {
    redirect("/login")
  }

  const { user, profile } = auth
  const name = profile?.full_name ?? user.email?.split("@")[0] ?? "Ouder"
  const email = profile?.email ?? user.email ?? ""

  return (
    <AppShell name={name} email={email} avatarUrl={profile?.avatar_url}>
      {children}
    </AppShell>
  )
}
