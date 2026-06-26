import { type ServerResponse } from "node:http";
import { type Plugin } from "vite";

import { devAuthProviders } from "./devAuthProviders";

type DevFakeAuthOptions = {
  /** the real supabase stack the password-grant + proxy target point at */
  realSupabaseUrl: string;
  /** anon key, needed on the password-grant request */
  anonKey: string;
};

const devUserPassword = "password";
const devUserEmail = (provider: string) => `${provider}@blockstack.ing`;

const isSupportedProvider = (provider: string): boolean =>
  devAuthProviders.some((p) => p === provider);

/**
 * Dev-only fake oauth for the local supabase stack, which has no real oauth
 * providers configured. The editor's real signInWithOAuth flow runs unchanged;
 * this intercepts /auth/v1/authorize and - trusting anybody - password-grants the
 * seeded `<provider>@blockstack.ing` user against the real stack, then redirects
 * back with that real session in the url hash (the implicit-flow shape supabase-js
 * expects by default). Different providers sign in as different db users; unknown
 * providers get a 400. Everything else (token refresh, getUser, rest) falls
 * through to the proxy.
 */
export const devFakeAuthPlugin = ({
  realSupabaseUrl,
  anonKey,
}: DevFakeAuthOptions): Plugin => ({
  name: "dev-fake-auth",
  configureServer(server) {
    const redirectWithSession = async (
      provider: string,
      redirectTo: string,
      res: ServerResponse,
    ) => {
      // trust anybody: hand back a real, gotrue-signed session for the provider's
      // seeded user
      const grant = await fetch(
        `${realSupabaseUrl}/auth/v1/token?grant_type=password`,
        {
          method: "POST",
          headers: { "content-type": "application/json", apikey: anonKey },
          body: JSON.stringify({
            email: devUserEmail(provider),
            password: devUserPassword,
          }),
        },
      );
      const session = (await grant.json()) as {
        access_token?: string;
        refresh_token?: string;
        expires_in?: number;
        expires_at?: number;
        token_type?: string;
      };
      if (session.access_token === undefined) {
        res.statusCode = 500;
        res.end(`dev fake auth: password grant failed for "${provider}"`);
        return;
      }

      // implicit flow: supabase-js reads the session out of the url hash
      const back = new URL(redirectTo);
      back.hash = new URLSearchParams({
        access_token: session.access_token,
        refresh_token: session.refresh_token ?? "",
        expires_in: String(session.expires_in ?? ""),
        expires_at: String(session.expires_at ?? ""),
        token_type: session.token_type ?? "bearer",
      }).toString();
      res.statusCode = 302;
      res.setHeader("location", back.toString());
      res.end();
    };

    // the local supabase stack has no external oauth providers configured, so
    // its real settings endpoint reports none; report the faked ones instead so
    // the editor's getEnabledAuthProviders renders their login buttons
    server.middlewares.use("/auth/v1/settings", (_req, res) => {
      res.setHeader("content-type", "application/json");
      res.end(
        JSON.stringify({
          external: Object.fromEntries(
            devAuthProviders.map((provider) => [provider, true]),
          ),
        }),
      );
    });

    server.middlewares.use("/auth/v1/authorize", (req, res) => {
      const url = new URL(req.url ?? "", "http://localhost");
      const provider = url.searchParams.get("provider") ?? "";
      const redirectTo = url.searchParams.get("redirect_to") ?? "/";

      if (!isSupportedProvider(provider)) {
        res.statusCode = 400;
        res.end(`dev fake auth: unsupported provider "${provider}"`);
        return;
      }

      redirectWithSession(provider, redirectTo, res).catch((e: unknown) => {
        res.statusCode = 500;
        res.end(String(e));
      });
    });
  },
});
