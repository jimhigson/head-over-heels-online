import { createClient } from "@supabase/supabase-js";

import { type Database } from "../_generated/db";
import { supabaseAnonKey, supabaseUrl } from "./supabaseEnvironmentVariables";

// Create a single supabase client for interacting with your database
export const supabaseDb = createClient<Database>(supabaseUrl, supabaseAnonKey);
