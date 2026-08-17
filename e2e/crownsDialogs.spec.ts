import { expect } from "@playwright/test";

import { clickCheat } from "./testUtils/gameInteractions";
import { waitForCurrentPlayable } from "./testUtils/gameStateQueries";
import { osSlowness } from "./testUtils/infrastructure";
import { formatProjectName } from "./testUtils/logging";
import {
  advanceUntilDialog,
  backToMainMenu,
  clickOriginalCampaign,
  clickPlayTheGame,
  exitCrownsDialog,
  navigateToSubmenu,
  startCampaignViaMenu,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";
import { test } from "./testUtils/test";

test.describe("crowns dialog correctness", () => {
  test.setTimeout(60_000 * osSlowness);

  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
  });

  test("crown dialog plays intro music when not muted", async ({
    page,
  }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
    await waitForCurrentPlayable(page);
    await clickCheat(page, "cheats-summon-crown-blacktooth");

    await advanceUntilDialog(page, "crowns");
    await expect(
      page.locator(
        '[data-dialog-id="crowns"] [data-test-playing-sound="intro"]',
      ),
    ).toHaveCount(1);
  });

  test("crown dialog plays no intro music when muted via menus first", async ({
    page,
  }, testInfo) => {
    const formattedName = formatProjectName(testInfo.project.name);

    await page.goto("/?cheats=1&track=0");
    await page.locator('[data-dialog-id="mainMenu"]').waitFor();

    await navigateToSubmenu(page, "options", formattedName);
    await page.locator('[data-dialog-id="modernisationOptions"]').waitFor();
    await navigateToSubmenu(page, "sound", formattedName);
    await page.locator('[data-dialog-id="sound"]').waitFor();
    await navigateToSubmenu(page, "mute", formattedName);

    await backToMainMenu(page, testInfo.project.name);

    await clickPlayTheGame(page, formattedName);
    await clickOriginalCampaign(page, formattedName);
    await page.locator('[data-dialog-id="crowns"]').waitFor();
    // intro crowns dialog: plays no intro music because we're muted
    await expect(
      page.locator(
        '[data-dialog-id="crowns"] [data-test-playing-sound="intro"]',
      ),
    ).toHaveCount(0);
    await exitCrownsDialog(page, formattedName);
    await page
      .locator('[data-dialog-id="crowns"]')
      .waitFor({ state: "detached" });

    await waitForCurrentPlayable(page);
    await clickCheat(page, "cheats-summon-crown-blacktooth");
    await advanceUntilDialog(page, "crowns");
    await expect(
      page.locator(
        '[data-dialog-id="crowns"] [data-test-playing-sound="intro"]',
      ),
    ).toHaveCount(0);
  });

  test("collect all 5 crowns -> proclaimEmperor, dismiss -> crowns all lit", async ({
    page,
  }, testInfo) => {
    const formattedName = formatProjectName(testInfo.project.name);

    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
    await waitForCurrentPlayable(page);

    const planets = [
      "blacktooth",
      "egyptus",
      "penitentiary",
      "safari",
      "bookworld",
    ] as const;
    const lastPlanet = planets.at(-1);
    for (const planet of planets) {
      await clickCheat(page, `cheats-summon-crown-${planet}`);
      if (planet === lastPlanet) {
        // the final crown stacks proclaimEmperor on top of crowns
        await advanceUntilDialog(page, "proclaimEmperor");
      } else {
        await advanceUntilDialog(page, "crowns");
        await exitCrownsDialog(page, formattedName);
        await page
          .locator('[data-dialog-id="crowns"]')
          .waitFor({ state: "detached" });
      }
    }

    await page.click('[data-dialog-id="proclaimEmperor"]');
    await page
      .locator('[data-dialog-id="proclaimEmperor"]')
      .waitFor({ state: "detached" });

    await advanceUntilDialog(page, "crowns");
    for (const planet of planets) {
      await expect(
        page.locator(`[data-test-id="crown-${planet}"]`),
      ).toHaveAttribute("data-collected", "true");
    }
  });
});
