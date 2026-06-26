import { type Provider } from "@supabase/supabase-js";

/**
 * The OAuth providers the local dev stack fakes. The dev fake-auth plugin
 * reports these as enabled from its `/auth/v1/settings` interceptor and signs
 * in their seeded `<provider>@blockstack.ing` users; `pnpm gen:seed` creates one
 * loginable user per provider. `gitlab` is included deliberately without a
 * client-side icon, to exercise the no-icon login button.
 */
export const devAuthProviders = [
  "apple",
  "discord",
  "github",
  "google",
  "twitch",
  "gitlab",
] as const satisfies ReadonlyArray<Provider>;
