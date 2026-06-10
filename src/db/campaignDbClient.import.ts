import { type CampaignDbClient } from "./CampaignDbClient";
import { importPostgrestDb } from "./postgrestDb.import";
import { importSupabaseDb } from "./supabaseDb.import";

/**
 * The editor uses the full supabase client so that rpc calls carry the
 * logged-in user's auth (needed for saving, and for reading the user's own
 * unpublished campaigns). The game has no login, so it uses the anonymous
 * postgrest-only client.
 *
 * VITE_APP is compile-time constant, so each build bundles only its own
 * client - the game build does not include supabase's auth/storage/realtime
 * at all.
 */
export const importCampaignDbClient = async (): Promise<CampaignDbClient> =>
  import.meta.env.VITE_APP === "editor" ?
    (await importSupabaseDb()).supabaseDb
  : (await importPostgrestDb()).postgrestDb;
