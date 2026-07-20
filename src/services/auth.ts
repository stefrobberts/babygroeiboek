import "server-only"

import { cache } from "react"

import { createClient } from "@/lib/supabase/server"
import type { Tables } from "@/types/database.types"

/**
 * Loads the signed-in user and their profile. Wrapped in React's `cache()`
 * so calling it from the layout, a page and any nested component within the
 * same request reuses one result instead of hitting Supabase Auth + the
 * profiles table again for every call site.
 */
export const getAuthenticatedProfile = cache(async () => {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return {
    user,
    profile: profile as Tables<"profiles"> | null,
  }
})
