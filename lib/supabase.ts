import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const signUp = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Credits helpers
export const getUserCredits = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_credits')
    .select('credits')
    .eq('user_id', userId)
    .single()

  return { data, error }
}

// Generation history helpers
export const getGenerations = async (userId: string) => {
  const { data, error } = await supabase
    .from('generations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

export const createGeneration = async (generation: {
  user_id: string
  original_url: string
  image_url: string
  video_url: string
}) => {
  const { data, error } = await supabase
    .from('generations')
    .insert([generation])
    .select()

  return { data, error }
}

// Usage helpers
export const useCredits = async (amount: number) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')

  // First get current credits
  const { data: creditsData, error: creditsError } = await supabase
    .from('user_credits')
    .select('credits')
    .eq('user_id', user.id)
    .single()

  if (creditsError) throw creditsError

  const newCredits = Math.max(0, creditsData.credits - amount)

  const { data, error } = await supabase
    .from('user_credits')
    .update({ credits: newCredits })
    .eq('user_id', user.id)
    .select()

  return { data, error }
}