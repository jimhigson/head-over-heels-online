import { type Page } from "@playwright/test";

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "*",
  "access-control-allow-methods": "*",
};

/**
 * relay the browser's supabase calls through the node test process, which can
 * reach supabase (the egress proxy + its trusted CA) where the browser cannot -
 * eg the sandbox, whose MITM egress proxy resets the browser's own TLS to
 * supabase. Opt-in via E2E_RELAY_SUPABASE; the node side needs
 * NODE_USE_ENV_PROXY=1 so its fetch uses the proxy (see the run-e2e skill).
 */
export const relaySupabase = async (page: Page): Promise<void> => {
  await page.route(/supabase\.co\//, async (route) => {
    const request = route.request();
    if (request.method() === "OPTIONS") {
      return route.fulfill({ status: 204, headers: corsHeaders });
    }
    const upstream = await fetch(request.url(), {
      method: request.method(),
      headers: request.headers(),
      body: request.postData() ?? undefined,
    });
    return route.fulfill({
      status: upstream.status,
      headers: {
        ...corsHeaders,
        "content-type":
          upstream.headers.get("content-type") ?? "application/json",
      },
      body: Buffer.from(await upstream.arrayBuffer()),
    });
  });
};
