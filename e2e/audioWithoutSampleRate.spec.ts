import { waitForDialog } from "./testUtils/menuNavigation";
import { osSlowness } from "./testUtils/osSlowness";
import { setupE2ePage } from "./testUtils/pageSetup";
import { test } from "./testUtils/test";

test.setTimeout(60_000 * osSlowness);

test.beforeEach(async ({ page }) => {
  await setupE2ePage(page);
});

test("the game boots when the platform gives its audio no sample rate", async ({
  page,
}) => {
  // webkit sometimes hands a page an audio context with a sample rate of 0,
  // when the process that owns the audio device doesn't answer in time:
  await page.addInitScript(() => {
    Object.defineProperty(BaseAudioContext.prototype, "sampleRate", {
      get: () => 0,
    });
  });

  await page.goto("/?track=0");
  // menus only open once their sounds have loaded, and an error loading them
  // shows the error dialog instead, which fails the test:
  await waitForDialog(page, "mainMenu");
});
