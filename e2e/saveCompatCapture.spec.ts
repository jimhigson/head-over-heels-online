import { readFileSync } from "node:fs";

import { captureSaveFixtures } from "./testUtils/captureSaveFixtures";
import { osSlowness } from "./testUtils/infrastructure";
import { setupE2ePage } from "./testUtils/pageSetup";
import { test } from "./testUtils/test";

/**
 * captures the current version's save-game fixtures into
 * e2e/fixtures/saves/v<major>/ - one json per room in the representative
 * sample. Not a test of anything: it grows the committed library of saves
 * that saveCompatLoad.spec.ts proves the current version can still load.
 *
 * Skipped unless CAPTURE_SAVES=1; run manually when preparing a release:
 *
 *   pnpm build:game
 *   CAPTURE_SAVES=1 pnpm playwright test saveCompatCapture --project=chromium-desktop
 *
 * (old release tags are captured by scripts/captureSavesFromBuild.ts instead,
 * pointed at a preview server of the old build)
 */

const { version } = JSON.parse(readFileSync("package.json", "utf-8")) as {
  version: string;
};

test("capture save fixtures for the current version", async ({
  page,
}, testInfo) => {
  test.skip(
    process.env.CAPTURE_SAVES !== "1",
    "capture only runs when CAPTURE_SAVES=1",
  );
  test.skip(
    testInfo.project.name !== "chromium-desktop",
    "fixtures are captured on a single browser",
  );
  test.setTimeout(300_000 * osSlowness);

  await setupE2ePage(page);
  await captureSaveFixtures(page, {
    version,
    log: (message) => console.log(`saveCompatCapture: ${message}`),
  });
});
