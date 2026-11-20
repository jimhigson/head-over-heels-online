import { expect } from "@playwright/test";

import type { OriginalCampaignRoomId } from "../src/originalCampaign/OriginalCampaignRoomId";
import { elapsed, formatProjectName } from "./testUtils/logging";
import { setupE2ePage } from "./testUtils/pageSetup";
import {
  enabledSpritesheets,
  menuScreenshotOptions,
  spritesheetSuffix,
} from "./testUtils/screenshots";
import { setSpritesheet } from "./testUtils/setSpritesheet";
import { test } from "./testUtils/test";

/**
 * a room in each of the original campaign's map areas - the areas share no
 * map positions, so each is its own picture
 */
const roomInEachArea: OriginalCampaignRoomId[] = [
  "blacktooth1head",
  "bookworld1",
  "egyptus1",
  "penitentiary1",
  "safari1",
];

/**
 * a desktop and a phone, in chromium and webkit
 */
const projectsToRunIn = ["chromium-desktop", "mobile-safari"];

test.beforeEach(async ({ page }) => {
  await setupE2ePage(page);
});

for (const spritesheetName of enabledSpritesheets) {
  for (const roomId of roomInEachArea) {
    test(`the original campaign's map area of ${roomId} ${JSON.stringify(spritesheetName)}`, async ({
      page,
    }, testInfo) => {
      test.skip(
        !projectsToRunIn.includes(testInfo.project.name),
        `only run in ${projectsToRunIn.join(", ")}`,
      );
      const logHeader = formatProjectName(testInfo.project.name);

      console.log(`${logHeader} ${elapsed()}: opening the map of ${roomId}`);
      await page.goto(`/map?track=0&roomId=${roomId}`);
      // the map's rooms are drawn once the campaign has loaded and the page
      // has been measured:
      await page
        .locator(`[data-map-page-area="${roomId}"] g[data-room-id]`)
        .first()
        .waitFor();
      await setSpritesheet(page, logHeader, spritesheetName);

      // the whole area, scrolled or not - the screenshot assertion retries
      // until the page is stable, so waits out the sprites' art loading:
      await expect(page).toHaveScreenshot(
        `map-area-${roomId}${spritesheetSuffix(spritesheetName)}.png`,
        {
          ...menuScreenshotOptions(
            page,
            spritesheetName,
            testInfo.project.name,
          ),
          fullPage: true,
        },
      );
    });
  }
}
