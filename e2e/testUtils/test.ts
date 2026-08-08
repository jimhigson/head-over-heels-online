import { test as playwrightTest } from "@playwright/test";

import {
  formatProjectName,
  forwardBrowserConsoleToNodeConsole,
} from "./logging";
import { logDetailedTextLayout, logTextLayout } from "./screenshots";

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
export const test = playwrightTest.extend<{ forwardBrowserConsole: void }>({
  forwardBrowserConsole: [
    async ({ page }, use, testInfo) => {
      const logHeader = formatProjectName(testInfo.project.name);
      forwardBrowserConsoleToNodeConsole(page, logHeader);
      await use();
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
