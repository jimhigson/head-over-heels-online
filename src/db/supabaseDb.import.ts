import { importOnce } from "../utils/importOnce";

export const importSupabaseDb = importOnce(() => import("./supabaseDb.ts"));
