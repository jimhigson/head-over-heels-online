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

/**
 * Repeatedly summon daleks until all lives are lost.
 *
 * Opens the cheats panel once for the whole sequence rather than
 * toggling it between every summon. Each toggle remounts the panel
 * (Radix Collapsible) and re-renders its hundreds of buttons; doing
 * that in a tight loop is enough work on slower runners (CI) that
 * the open-button is mid-rerender between Playwright's locator
 * resolution and click stability check, leaving the close click
 * stuck retrying until the test times out.
 *
 * Game speed is left at normal — the sped-up cheat puts extra load
 * on the engine for no test-time benefit (waitForTimeout is wall
 * clock either way).
 *
 * One dalek per life: the room resets after each death, wiping out
 * any previously-summoned daleks, so summoning a batch up front is
 * pointless. Wait 1.5s between summons to match the engine's
 * `afterDeathInvulnerabilityTime` so the next dalek can land a hit
 * once the post-death invincibility window has expired.
 */
export const loseAllLives = async (page: Page) => {
  const openButton = page.locator('[data-test-id="cheats-open-button"]');
  const menu = page.locator('[data-test-id="cheats-menu"]');

  if (!(await menu.isVisible())) {
    await openButton.click();
    await menu.waitFor({ state: "visible" });
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
    await page.click('[data-test-id="cheats-summon-monster-dalek"]');
    await page.waitForTimeout(1_500 * osSlowness);
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
