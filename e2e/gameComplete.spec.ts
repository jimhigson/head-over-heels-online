import type { Page } from "@playwright/test";

import { expect, test } from "@playwright/test";

import { clickCheat, loseAllLives } from "./testUtils/gameInteractions";
import {
  getCurrentCharacter,
  getCurrentRoomId,
} from "./testUtils/gameStateQueries";
import { osSlowness } from "./testUtils/infrastructure";
import {
  startCampaignViaMenu,
  waitForDialog,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";

/**
 * Hold a key down and poll a condition until it returns true (or timeout).
 * Releases the key on exit either way. Used in flows where we don't know
 * exactly how long movement takes — e.g. walking a character through a
 * portal — and want the test to release as soon as the observable effect
 * has happened rather than wait a fixed duration.
 */
const holdKeyUntil = async (
  page: Page,
  key: string,
  code: string,
  condition: () => Promise<boolean>,
  timeoutMs: number,
) => {
  await page.evaluate(
    ({ key, code }) => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key, code }));
    },
    { key, code },
  );
  try {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      if (await condition()) return;
      await page.waitForTimeout(200);
    }
    throw new Error(`holdKeyUntil(${key}) timed out after ${timeoutMs}ms`);
  } finally {
    await page.evaluate(
      ({ key, code }) => {
        window.dispatchEvent(new KeyboardEvent("keyup", { key, code }));
      },
      { key, code },
    );
  }
};

test.describe("game completion - both characters reach freedom", () => {
  test.setTimeout(60_000 * osSlowness);

  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
  });

  test("walking head then heels through the final-room portal triggers gameOver with both freed", async ({
    page,
  }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");

    await test.step("Teleport head to the final room", async () => {
      await clickCheat(page, "cheats-goto-room-finalroom");
      await page.waitForTimeout(1_000 * osSlowness);
      expect(await getCurrentRoomId(page)).toBe("finalroom");
    });

    await test.step("Hold ArrowUp until head exits and heels becomes the active character", async () => {
      // head walks north into the portal → handlePlayerTouchingPortal fires
      // characterReachesFreedom("head") and swops the active character to
      // heels (still in their starting room).
      await holdKeyUntil(
        page,
        "ArrowUp",
        "ArrowUp",
        async () => (await getCurrentCharacter(page)) === "heels",
        15_000 * osSlowness,
      );
    });

    await test.step("Teleport heels to the final room", async () => {
      await clickCheat(page, "cheats-goto-room-finalroom");
      await page.waitForTimeout(1_000 * osSlowness);
      expect(await getCurrentRoomId(page)).toBe("finalroom");
    });

    await test.step("Hold ArrowUp until heels exits and the score dialog appears", async () => {
      // heels walks into the portal → characterReachesFreedom("heels") →
      // no other character playing → gameOver listener opens [score, mainMenu].
      await holdKeyUntil(
        page,
        "ArrowUp",
        "ArrowUp",
        async () =>
          (await page.locator('[data-dialog-id="score"]').count()) > 0,
        15_000 * osSlowness,
      );
      await waitForDialog(page, "score");
    });

    await test.step("Score dialog shows both characters as free", async () => {
      await expect(page.locator('[data-test-id="free-head"]')).toBeVisible();
      await expect(page.locator('[data-test-id="free-heels"]')).toBeVisible();
    });
  });

  test("head escapes via portal but heels dies — score dialog shows only head as free", async ({
    page,
  }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");

    await test.step("Teleport head to the final room", async () => {
      await clickCheat(page, "cheats-goto-room-finalroom");
      await page.waitForTimeout(1_000 * osSlowness);
      expect(await getCurrentRoomId(page)).toBe("finalroom");
    });

    await test.step("Hold ArrowUp until head exits and heels becomes the active character", async () => {
      await holdKeyUntil(
        page,
        "ArrowUp",
        "ArrowUp",
        async () => (await getCurrentCharacter(page)) === "heels",
        15_000 * osSlowness,
      );
    });

    await test.step("Heels loses all lives via summoned daleks", async () => {
      // freeCharacters.head was set when head exited; freeCharacters.heels
      // never gets set because heels dies rather than reaching the portal.
      // gameOver fires from lostAllLives → score dialog (no reincarnation
      // point was set).
      await loseAllLives(page);
      await waitForDialog(page, "score");
    });

    await test.step("Score dialog lists head as free but not heels", async () => {
      await expect(page.locator('[data-test-id="free-head"]')).toBeVisible();
      await expect(page.locator('[data-test-id="free-heels"]')).toHaveCount(0);
    });
  });
});
