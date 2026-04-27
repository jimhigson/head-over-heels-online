import { expect, test } from "@playwright/test";

import { clickCheat } from "./testUtils/gameInteractions";
import { osSlowness } from "./testUtils/infrastructure";
import { formatProjectName } from "./testUtils/logging";
import {
  backToMainMenu,
  clickOriginalCampaign,
  clickPlayTheGame,
  exitCrownsDialog,
  navigateToSubmenu,
  startCampaignViaMenu,
  waitForDialog,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";

test.describe("crowns dialog correctness", () => {
  test.setTimeout(60_000 * osSlowness);

  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
  });

  test("crown dialog plays music (has <audio>) when not muted", async ({
    page,
  }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
    await page.waitForTimeout(1_000 * osSlowness);
    await clickCheat(page, "cheats-summon-crown-blacktooth");

    await waitForDialog(page, "crowns");
    await expect(page.locator('[data-dialog-id="crowns"] audio')).toHaveCount(
      1,
    );
  });

  test("crown dialog has no <audio> when muted via menus first", async ({
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
    // intro crowns dialog: has no <audio> because we're muted
    await expect(page.locator('[data-dialog-id="crowns"] audio')).toHaveCount(
      0,
    );
    await exitCrownsDialog(page, formattedName);
    await page
      .locator('[data-dialog-id="crowns"]')
      .waitFor({ state: "detached" });

    await page.waitForTimeout(1_000 * osSlowness);
    await clickCheat(page, "cheats-summon-crown-blacktooth");
    await waitForDialog(page, "crowns");
    await expect(page.locator('[data-dialog-id="crowns"] audio')).toHaveCount(
      0,
    );
  });

  test("collect all 5 crowns -> proclaimEmperor, dismiss -> crowns all lit", async ({
    page,
  }, testInfo) => {
    const formattedName = formatProjectName(testInfo.project.name);

    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
    await page.waitForTimeout(1_000 * osSlowness);

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
        await waitForDialog(page, "proclaimEmperor");
      } else {
        await waitForDialog(page, "crowns");
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

    await waitForDialog(page, "crowns");
    for (const planet of planets) {
      await expect(
        page.locator(`[data-test-id="crown-${planet}"]`),
      ).toHaveAttribute("data-collected", "true");
    }
  });
});
