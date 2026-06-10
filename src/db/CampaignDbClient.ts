import { type PostgrestClient } from "@supabase/postgrest-js";

import { type Database } from "../_generated/db";

/**
 * the subset of client the campaign db functions need. Satisfied structurally
 * both by the full supabase client (authed - the editor) and by the lighter
 * anonymous PostgrestClient (the game), since supabase's .rpc is a delegate to
 * an internal PostgrestClient with an identical signature
 */
export type CampaignDbClient = Pick<PostgrestClient<Database>, "rpc">;
