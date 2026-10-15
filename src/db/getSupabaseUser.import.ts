import { importOnce } from "../utils/importOnce";

export const importGetSupabaseUser = importOnce(
  () => import("./getSupabaseUser.ts"),
);
