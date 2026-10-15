import { importGetSupabaseUser } from "../../db/getSupabaseUser.import";
import { importSupabaseDb } from "../../db/supabaseDb.import";
import { showAuthErrorAlert } from "./showAuthErrorAlert";

const signOut = async () => {
  const { supabaseDb } = await importSupabaseDb();
  const { withAuthServerTimeout } = await importGetSupabaseUser();
  const { error } = await withAuthServerTimeout(supabaseDb.auth.signOut());
  if (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut();
  } catch (e) {
    console.error("Logout error:", e);
    await showAuthErrorAlert("Couldn’t log out", e);
  }
};
