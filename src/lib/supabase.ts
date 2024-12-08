import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only throw error in production, use mock in development if missing
if (!supabaseUrl || !supabaseAnonKey) {
  if (import.meta.env.PROD) {
    throw new Error("Missing Supabase environment variables");
  } else {
    console.warn("Missing Supabase environment variables, using mock data");
  }
}

export const supabase = createClient<Database>(
  supabaseUrl || "https://mock.supabase.co",
  supabaseAnonKey || "mock-key",
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  },
);

// Add development-only logging
if (import.meta.env.DEV) {
  console.log(`Running in ${import.meta.env.MODE} mode`);
  console.log(`Base URL: ${import.meta.env.BASE_URL}`);
  console.log(`SSR: ${import.meta.env.SSR}`);
}
