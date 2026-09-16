'use client';

import { createContext, useContext, useMemo, ReactNode } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

interface SupabaseContextProps {
  supabase: SupabaseClient | null;
}

const SupabaseContext = createContext<SupabaseContextProps | undefined>(undefined);

export const SupabaseProvider = ({ children }: { children: ReactNode }) => {
  const supabase = useMemo(() => {
    // Check if we have valid strings
    if (
      !supabaseUrl ||
      !supabaseAnonKey ||
      supabaseUrl.trim() === '' ||
      supabaseAnonKey.trim() === '' ||
      !supabaseUrl.startsWith('http')
    ) {
      return null;
    }
    return createClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  if (context.supabase === null) {
    throw new Error(
      'Missing or invalid NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
        'Make sure to create a .env.local file with these variables.'
    );
  }
  return context.supabase;
};