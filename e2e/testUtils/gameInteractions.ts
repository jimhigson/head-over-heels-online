import type { Page } from "@playwright/test";

import { osSlowness } from "./infrastructure";

/** dispatches key presses in a way that our special key handling can pick up (@see keyboardState) */
export const dispatchKeyPress = async (
  page: Page,
  /**
   * The key value (e.g., "m", "Escape")
   */
  key: string,
  /**
   * The code value (e.g., "KeyM", "Escape")
   */
  code: string,
) => {
  await page.evaluate(
    ({ key, code }) => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key, code }));
    },
    { key, code },
  );
  await page.waitForTimeout(100);
  await page.evaluate(
    ({ key, code }) => {
      window.dispatchEvent(new KeyboardEvent("keyup", { key, code }));
    },
    { key, code },
  );
};

/**
 * The cheats panel is a Radix Collapsible — clicking the trigger toggles
 * visibility, so only click the trigger when the menu isn't currently open.
 */
export const clickCheat = async (page: Page, testId: string) => {
  const openButton = page.locator('[data-test-id="cheats-open-button"]');
  const menu = page.locator('[data-test-id="cheats-menu"]');
  if (!(await menu.isVisible())) {
    await openButton.click();
    await menu.waitFor({ state: "visible" });
  }
  await page.click(`[data-test-id="${testId}"]`);
  await openButton.click();
  await menu.waitFor({ state: "hidden" });
};

/** Repeatedly summon daleks until all lives are lost. */
export const loseAllLives = async (page: Page) => {
  await clickCheat(page, "cheats-speed-5");
  for (let i = 0; i < 12; i++) {
    await clickCheat(page, "cheats-summon-monster-dalek");
  }

  const deadline = Date.now() + 60_000 * osSlowness;
  while (Date.now() < deadline) {
    const died = await page
      .locator(
        '[data-dialog-id="offerReincarnation"], [data-dialog-id="score"]',
      )
      .first()
      .isVisible()
      .catch(() => false);
    if (died) return;
    await clickCheat(page, "cheats-summon-monster-dalek");
    await page.waitForTimeout(500);
  }
  throw new Error("never reached an end-of-life dialog");
};

/** After reloading while a game is running, the game restarts paused. Wait for the hold dialog then press P to unpause. */
export const dismissHoldAfterReload = async (page: Page) => {
  await page
    .locator('[data-dialog-id="hold"]')
    .waitFor({ timeout: 5_000 * osSlowness });
  await dispatchKeyPress(page, "p", "KeyP");
  await page
    .locator('[data-dialog-id="hold"]')
    .waitFor({ state: "detached", timeout: 5_000 * osSlowness });
};
