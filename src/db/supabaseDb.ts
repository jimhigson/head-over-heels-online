import { createClient } from "@supabase/supabase-js";
import type { Database } from "../_generated/db";

// Create a single supabase client for interacting with your database
export const supabaseDb = createClient<Database>(
  "https://pkswdnpftrundnewgnya.supabase.co",
  // public anon key
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrc3dkbnBmdHJ1bmRuZXdnbnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2ODI2MzIsImV4cCI6MjA2ODI1ODYzMn0.r_Y1RLOGJ55C0De5SBTVXqO09SMDqgV38sQuE-oDxXE",
);
