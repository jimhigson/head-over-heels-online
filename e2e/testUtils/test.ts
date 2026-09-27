import { type Page, test as playwrightTest } from "@playwright/test";

import {
  formatProjectName,
  forwardBrowserConsoleToNodeConsole,
} from "./logging";
import { relaySupabase } from "./relaySupabase";
import { logDetailedTextLayout, logTextLayout } from "./screenshots";
import { trackNetwork } from "./trackNetwork";

/**
 * throws if the page is not a visual-regression build
 */
const assertVisualRegressionBuild = async (page: Page) => {
  const isVisualRegressionBuild = await page.evaluate(
    () => window._e2e_store !== undefined,
  );
  if (!isVisualRegressionBuild) {
    throw new Error(
      `${page.url()} is not a visual-regression build (no window._e2e_store) - rebuild with --mode visual-regression`,
    );
  }
};

/**
 * the `test` every spec should import, in place of the one from
 * `@playwright/test`.
 *
 * It forwards the browser's console into the node-side test output for every
 * test, via an automatic fixture - so anything the game logs (notably the
 * `[game-speed]` lines from visual-regression builds) lands in the playwright
 * report and in CI logs without each spec having to opt in.
 *
 * A spec importing `test` straight from `@playwright/test` silently loses that
 * forwarding, since there is no playwright hook that reaches tests built on a
 * different `test` object.
 */
export const test = playwrightTest.extend<{
  forwardBrowserConsole: void;
  relaySupabaseWhenEnabled: void;
}>({
  // check browser hit a visual-regression build
  async page({ page }, provide) {
    const goto = page.goto.bind(page);
    page.goto = async (...args: Parameters<Page["goto"]>) => {
      const response = await goto(...args);
      await assertVisualRegressionBuild(page);
      return response;
    };
    await provide(page);
  },
  // sandboxes whose egress proxy resets the browser's own TLS to supabase can
  // opt every spec into the node-side relay with E2E_RELAY_SUPABASE=1; unset
  // (eg CI) this fixture does nothing and the browser talks to supabase
  // directly
  relaySupabaseWhenEnabled: [
    async ({ page }, use) => {
      if (process.env.E2E_RELAY_SUPABASE) {
        await relaySupabase(page);
      }
      await use();
    },
    { auto: true },
  ],
  forwardBrowserConsole: [
    async ({ page }, use, testInfo) => {
      const logHeader = formatProjectName(testInfo.project.name);
      forwardBrowserConsoleToNodeConsole(page, logHeader);
      const network = trackNetwork(page, logHeader);
      await use();
      if (testInfo.status !== testInfo.expectedStatus) {
        // a request that never came back is invisible in every other record of
        // the run, and is exactly what a test that timed out waiting for the
        // app to finish loading was stuck on. Reads only node-side bookkeeping,
        // so it works even for a test that took its page down with it
        network.logRequestsStillInFlight();
      }
      // after the test, while the page is still open: headless chromium picks
      // its text hinting when it launches, and the mode it lands in shifts
      // text by a whole pixel - enough to fail a snapshot on its own. Recording
      // it for every spec means a future failure is diagnosable from the job's
      // log, whichever spec happens to catch it. No-op if already logged
      try {
        await logTextLayout(page, logHeader);
        if (testInfo.status !== testInfo.expectedStatus) {
          // only worth the volume when something actually went wrong, and a
          // snapshot diff is exactly when the per-line positions are the
          // evidence we wish we had
          await logDetailedTextLayout(page, logHeader);
        }
      } catch {
        // a test that closed its own page, or crashed, has nothing to measure -
        // never let a diagnostic turn a pass into a failure
      }
    },
    { auto: true },
  ],
});
