import { createClient } from '@supabase/supabase-js';

// Use VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY in a .env file for real config.
// Fallback values are valid placeholders that let the app boot — Supabase calls
// will fail at request time, but the rest of the app still renders.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
