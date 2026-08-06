import { test as playwrightTest } from "@playwright/test";

import {
  formatProjectName,
  forwardBrowserConsoleToNodeConsole,
} from "./logging";

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
      forwardBrowserConsoleToNodeConsole(
        page,
        formatProjectName(testInfo.project.name),
      );
      await use();
    },
    { auto: true },
  ],
});
