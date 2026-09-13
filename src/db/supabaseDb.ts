import { createClient } from "@supabase/supabase-js";

import { type Database } from "../_generated/db";
import { supabaseAnonKey, supabaseUrl } from "./supabaseEnvironmentVariables";

const supabaseRequestTimeoutMs = 10_000;

/**
 * Add a timeout signal, possibly alongside an existing signal
 */
const withTimeoutSignal = (
  callerSignal: AbortSignal | null | undefined,
): AbortSignal => {
  const timeoutSignal = AbortSignal.timeout(supabaseRequestTimeoutMs);
  return callerSignal ?
      AbortSignal.any([callerSignal, timeoutSignal])
    : timeoutSignal;
};

// Singleton supabase client for interacting with the db
export const supabaseDb = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: (input, init) =>
      fetch(input, { ...init, signal: withTimeoutSignal(init?.signal) }),
  },
});
