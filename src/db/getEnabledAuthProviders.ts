import { type Provider } from "@supabase/supabase-js";

import { objectEntriesIter } from "../utils/entries";
import { supabaseAnonKey, supabaseUrl } from "./supabaseEnvironmentVariables";

/**
 * Auth methods reported by GoTrue's settings endpoint. As well as the OAuth
 * {@link Provider}s, the `external` map also carries the non-OAuth `email` and
 * `phone` credential methods.
 */
type AuthMethod = "email" | "phone" | Provider;

type AuthSettings = {
  external: Partial<Record<AuthMethod, boolean>>;
};

const isOAuthProvider = (method: AuthMethod): method is Provider =>
  method !== "email" && method !== "phone";

/**
 * Ask the supabase auth server which OAuth providers are enabled, so the login
 * ui only offers methods the backend actually accepts. Hits GoTrue's public
 * `GET /auth/v1/settings` endpoint, which needs only the anon apikey.
 */
export const getEnabledAuthProviders = async (): Promise<Array<Provider>> => {
  const response = await fetch(new URL("auth/v1/settings", supabaseUrl), {
    headers: { apikey: supabaseAnonKey },
  });
  if (!response.ok) {
    throw new Error(
      `auth settings request failed with status ${response.status}`,
    );
  }

  const { external } = (await response.json()) as AuthSettings;

  return objectEntriesIter(external)
    .filter(([, enabled]) => enabled)
    .map(([method]) => method)
    .toArray()
    .filter(isOAuthProvider);
};
