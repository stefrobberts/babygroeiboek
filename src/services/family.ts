import "server-only"

import { createClient } from "@/lib/supabase/server"
import type { Tables } from "@/types/database.types"

export interface FamilyContext {
  profile: Tables<"profiles">
  family: Tables<"families">
  role: Tables<"family_members">["role"]
  babies: Tables<"babies">[]
}

/**
 * Loads the signed-in user's profile, their (first) family and every baby
 * in it. Returns `null` when the user has no family yet — callers decide
 * whether that means "show onboarding" or "show empty state".
 */
export async function getFamilyContext(): Promise<FamilyContext | null> {
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

  if (!profile) {
    return null
  }

  const { data: membership } = await supabase
    .from("family_members")
    .select("role, families(*)")
    .eq("profile_id", user.id)
    .limit(1)
    .maybeSingle()

  if (!membership?.families) {
    return null
  }

  const family = membership.families as unknown as Tables<"families">

  const { data: babies } = await supabase
    .from("babies")
    .select("*")
    .eq("family_id", family.id)
    .order("birth_date", { ascending: false })

  return {
    profile,
    family,
    role: membership.role,
    babies: babies ?? [],
  }
}
