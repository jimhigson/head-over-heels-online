import { PostgrestClient } from "@supabase/postgrest-js";

import { type Database } from "../_generated/db";
import { supabaseAnonKey, supabaseUrl } from "./supabaseConnection";

/**
 * anonymous-access client for the game build: typed the same as the full
 * supabase client's .rpc, but without bundling supabase's auth, storage and
 * realtime modules, none of which the game uses. The headers match what
 * supabase-js sends when no user is logged in.
 */
export const postgrestDb = new PostgrestClient<Database>(
  `${supabaseUrl}/rest/v1`,
  {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
  },
);
