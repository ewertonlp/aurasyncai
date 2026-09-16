import { createClient } from '@supabase/supabase-js'

/**
 * Creates a Supabase client for use in Client Components.
 *
 * In Client Components, we need to create a new client instance
 * to avoid sharing state between different users/sessions.
 * However, for the anon key (which is public), creating a new client
 * is lightweight and acceptable.
 */
export const createClientComponentClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}