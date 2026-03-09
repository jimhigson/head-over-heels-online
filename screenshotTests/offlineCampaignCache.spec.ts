import { test } from "@playwright/test";

import { forwardBrowserConsoleToNodeConsole } from "./forwardBrowserConsoleToNodeConsole";
import { startGame, waitForAnyRoomRenderEvent } from "./gameTestUtils";

const remakeSelector = "[data-menuitem_id=remake]";
const errorDialogSelector = "[data-dialog-id=errorCaught]";

test("sequel campaign loads from cache after going offline", async ({
  page,
  context,
}, testInfo) => {
  // setOffline + reload crashes WebKit and has issues in Firefox:
  // https://github.com/microsoft/playwright/issues/34402
  // https://github.com/microsoft/playwright/issues/2311
  test.skip(
    testInfo.project.name !== "chromium-desktop",
    "setOffline is only reliable in Chromium",
  );
  test.setTimeout(60_000);

  forwardBrowserConsoleToNodeConsole(page, "offline-cache");

  // load the sequel campaign while online
  await startGame(page, "offline-cache", remakeSelector);
  const roomId = await waitForAnyRoomRenderEvent(page);
  console.log(`offline-cache: first room rendered: ${roomId}`);

  // go offline and reload — assets served by service worker,
  // campaign data served from localStorage cache
  await context.setOffline(true);
  await page.reload();

  // the game should auto-resume into the same campaign via persisted redux state.
  // Race the room render against the error dialog so we fail fast if caching didn't work
  await Promise.race([
    waitForAnyRoomRenderEvent(page).then((roomIdAfterReload) =>
      console.log(
        `offline-cache: room rendered after offline reload: ${roomIdAfterReload}`,
      ),
    ),
    page
      .locator(errorDialogSelector)
      .waitFor({ state: "visible" })
      .then(() => {
        // note that this could still throw after the room renders and the test completes
        throw new Error("Error dialog appeared after offline reload");
      }),
  ]);
});
