import type { Page } from "@playwright/test";

import chalk from "chalk";

import { osSlowness } from "./infrastructure";
import { elapsed } from "./logging";

const getCurrentLives = (page: Page): Promise<number | undefined> =>
  page.evaluate(() => {
    const gameState = window._e2e_gamePageGameAi?.gameState;
    if (!gameState) return undefined;
    const character = gameState.currentCharacterName;
    const playerItem = gameState.characterRooms[character]?.items[character];
    return (playerItem as { state: { lives?: number } } | undefined)?.state
      ?.lives;
  });

const log = (message: string) =>
  console.log(`${chalk.cyan("loseAllLives")} ${elapsed()} ${message}`);

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
  let iteration = 0;
  const deadline = Date.now() + 60_000 * osSlowness;
  while (Date.now() < deadline) {
    const died = await page
      .locator(
        '[data-dialog-id="offerReincarnation"], [data-dialog-id="score"]',
      )
      .first()
      .isVisible()
      .catch(() => false);
    if (died) {
      log(`died after ${iteration} dalek summons`);
      return;
    }
    iteration++;
    log(
      `iter=${iteration} lives=${await getCurrentLives(page)} → summon dalek`,
    );
    await clickCheat(page, "cheats-summon-monster-dalek");
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
