import { isAuthRetryableFetchError, type User } from "@supabase/supabase-js";

import { supabaseDb } from "./supabaseDb";

/** the auth client waits indefinitely while it retries a token refresh */
const authServerTimeoutMs = 10_000;

class AuthServerTimeoutError extends Error {}

/** the error was from not being able to reach the auth server at all */
export const isAuthServerUnreachable = (error: unknown): boolean =>
  isAuthRetryableFetchError(error) || error instanceof AuthServerTimeoutError;

/** settles as the auth call does, or rejects if the auth server takes too long */
export const withAuthServerTimeout = <T>(authCall: Promise<T>): Promise<T> =>
  Promise.race([
    authCall,
    new Promise<never>((_resolve, reject) => {
      setTimeout(
        () =>
          reject(
            new AuthServerTimeoutError("timed out waiting for the auth server"),
          ),
        authServerTimeoutMs,
      );
    }),
  ]);

/**
 * the logged-in user, or null if not logged in. Throws if the auth server
 * can't be reached, since then we can't know
 */
export const getSupabaseUser = async (): Promise<null | User> => {
  const {
    data: { user },
    error,
  } = await withAuthServerTimeout(supabaseDb.auth.getUser());

  if (error !== null && isAuthServerUnreachable(error)) {
    throw new Error("could not reach the auth server", { cause: error });
  }
  // any other error (eg no session) means not logged in:
  return user;
};

/** calls back with the user whenever logging in or out changes it */
export const subscribeToSupabaseUser = (
  onUser: (user: null | User) => void,
): (() => void) => {
  const {
    data: { subscription },
  } = supabaseDb.auth.onAuthStateChange((_event, session) => {
    onUser(session?.user ?? null);
  });
  return () => subscription.unsubscribe();
};
