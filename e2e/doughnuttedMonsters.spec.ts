import { expect, type Page } from "@playwright/test";

import { allItemsTestRoomCampaign } from "./fixtures/allItemsTestRoom";
import { bootPlaytestCampaign } from "./testUtils/bootPlaytestCampaign";
import { setupE2ePage } from "./testUtils/pageSetup";
import { roomScreenshotOptions } from "./testUtils/screenshots";
import { setSpriteOption } from "./testUtils/setSpriteOption";
import { test } from "./testUtils/test";

/**
 * guards the doughnutted spritesheet variant's palette: a monster hit by a
 * fired doughnut renders from a palette-swopped sheet, but this is a transient
 * gameplay state that no room snapshot can show, so no other visual
 * regression covers it. The state is forced directly on every monster in the
 * room (rather than physically firing doughnuts), pinning the doughnutted
 * palette for every monster type and direction at once.
 *
 * palette variants are not browser-specific, so this runs in chromium-desktop
 * only.
 */

const logHeader = "doughnuttedMonsters";

test.beforeEach(async ({ page }, testInfo) => {
  await setupE2ePage(page);
  test.skip(
    testInfo.project.name !== "chromium-desktop",
    "palette-variant snapshots are not browser-specific; run only on chromium-desktop",
  );
});

const doughnutAllMonsters = (page: Page) =>
  page.evaluate(() => {
    const { gameState } = window._e2e_gamePageGameAi!;
    const room = gameState.characterRooms[gameState.currentCharacterName]!;
    for (const item of Object.values(room.items)) {
      // the emperor's guardian is immune to doughnuts, so the doughnutted
      // state (and its recoloured sprites) can never exist for it:
      if (item.type === "monster" && item.config.which !== "emperorsGuardian") {
        item.state.busyLickingDoughnutsOffFace = true;
      }
    }
  });

test("doughnutted monsters render with the doughnutted palette", async ({
  page,
}, testInfo) => {
  test.setTimeout(240_000);
  await bootPlaytestCampaign(page, allItemsTestRoomCampaign, "amigaHiResPal");

  await doughnutAllMonsters(page);
  // let the frozen frame re-render with the mutated state:
  await page.waitForTimeout(600);

  await expect(page).toHaveScreenshot(
    "allItemsTestRoom-doughnutted.png",
    roomScreenshotOptions(testInfo.project.name),
  );

  // Toppy bakes its own doughnutted variant from its own palette - guard that
  // sheet's doughnutted swops too:
  await setSpriteOption(page, logHeader, {
    name: "Toppy",
    uncolourised: false,
  });
  await page.waitForTimeout(600);

  await expect(page).toHaveScreenshot(
    "allItemsTestRoom-doughnutted-toppy.png",
    roomScreenshotOptions(testInfo.project.name),
  );

  // in uncolourised (ZX) mode the doughnutted state deliberately has no
  // visual effect - doughnutted monsters render identically to their normal
  // sprites. This shot pins that non-effect:
  await setSpriteOption(page, logHeader, {
    name: "BlockStack",
    uncolourised: true,
  });
  await page.waitForTimeout(600);

  await expect(page).toHaveScreenshot(
    "allItemsTestRoom-doughnutted-uncolourised.png",
    roomScreenshotOptions(testInfo.project.name),
  );
});
