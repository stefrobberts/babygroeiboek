import "server-only"

import { createClient as createSupabaseClient } from "@supabase/supabase-js"

import type { Database } from "@/types/database.types"

/**
 * Service-role Supabase client. Bypasses Row Level Security entirely — only
 * import this in trusted server-side code (Route Handlers, background jobs,
 * AI insight generation). Never expose `SUPABASE_SERVICE_ROLE_KEY` to the
 * client bundle.
 */
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
