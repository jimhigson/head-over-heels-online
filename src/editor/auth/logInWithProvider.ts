import { type Provider } from "@supabase/supabase-js";

import { importSupabaseDb } from "../../db/supabaseDb.import";
import { showAuthErrorAlert } from "./showAuthErrorAlert";

/** start logging in through an oauth provider, coming back to this page */
export const logInWithProvider = async (provider: Provider) => {
  // Remove everything after, and including, #.
  // the # was causing issues since the redirect adds another # with the auth
  // token to the url when coming back to our site, then leaves one which
  // can still be there if we log out and in again
  const redirectToUrl = new URL(window.location.href);
  redirectToUrl.hash = "";
  const redirectTo = redirectToUrl.toString();

  const { supabaseDb } = await importSupabaseDb();
  const { error } = await supabaseDb.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });
  if (error) {
    console.error("Login error:", error);
    await showAuthErrorAlert("Couldn’t log in", error);
  }
};
