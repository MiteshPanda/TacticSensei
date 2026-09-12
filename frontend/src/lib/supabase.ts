/**
 * Supabase client singleton for browser-side use.
 * Only the anon key is used here — safe to expose publicly.
 * The service role key lives in the FastAPI backend only.
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://cvynboivxplkckfieewc.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2eW5ib2l2eHBsa2NrZmllZXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3MDQ2MzUsImV4cCI6MjA5OTI4MDYzNX0.QWwq02BrBRXOzv6CKMr4weBXMsEEPVtGYwZyVRMdUWQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type { User, Session } from "@supabase/supabase-js";
