"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

/**
 * Starts the Google OAuth flow and redirects the browser to Google's
 * consent screen. Supabase redirects back to `/auth/callback`, which
 * exchanges the code for a session.
 */
export async function signInWithGoogle(nextPath?: string) {
  const supabase = await createClient()
  const headerList = await headers()
  const origin = headerList.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL

  const redirectTo = new URL("/auth/callback", origin)
  if (nextPath) {
    redirectTo.searchParams.set("next", nextPath)
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectTo.toString(),
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  })

  if (error || !data.url) {
    redirect("/login?error=oauth_init_failed")
  }

  redirect(data.url)
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}
