import { type Page } from "@playwright/test";
import chalk from "chalk";

import { getCurrentCharacter } from "./gameStateQueries";
import { osSlowness, retryWithRecovery } from "./infrastructure";
import { elapsed, formatProjectName } from "./logging";

const getCurrentLives = (page: Page): Promise<number | undefined> =>
  page.evaluate(() => {
    const gameState = window._e2e_gamePageGameAi?.gameState;
    if (!gameState) {
      return undefined;
    }
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

export const holdKeysForDuration = async (
  page: Page,
  keys: string[],
  durationMs: number,
) => {
  await page.evaluate((keys) => {
    for (const key of keys) {
      window.dispatchEvent(new KeyboardEvent("keydown", { key, code: key }));
    }
  }, keys);
  await page.waitForTimeout(durationMs);
  await page.evaluate((keys) => {
    for (const key of keys) {
      window.dispatchEvent(new KeyboardEvent("keyup", { key, code: key }));
    }
  }, keys);
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
 * Repeatedly summon emperor's guardians until all lives are lost. The
 * guardian homes onto the player so contact is reliable.
 *
 * Game speed is left at normal — the sped-up cheat puts extra load
 * on the engine for no test-time benefit (waitForTimeout is wall
 * clock either way).
 *
 * One guardian per life: the room resets after each death, wiping out
 * any previously-summoned monsters, so summoning a batch up front is
 * pointless. Wait 1.5s between summons to match the engine's
 * `afterDeathInvulnerabilityTime` so the next guardian can land a hit
 * once the post-death invincibility window has expired.
 */
/**
 * Summon a guardian and wait for either a death dialog or an end-of-game
 * dialog. If a death dialog appears, dismiss it and return the sr-only text.
 * If an end-of-game dialog appears, return undefined (game over).
 */
export const loseOneLife = async (page: Page): Promise<string | undefined> => {
  const deadline = Date.now() + 30_000 * osSlowness;
  let summoned = false;
  while (Date.now() < deadline) {
    const gameOverShown = await page
      .locator(
        '[data-dialog-id="offerReincarnation"], [data-dialog-id="score"]',
      )
      .first()
      .isVisible()
      .catch(() => false);
    if (gameOverShown) {
      return undefined;
    }
    const deathDialog = page.locator('[data-dialog-id="death"]');
    if (await deathDialog.isVisible().catch(() => false)) {
      const dialogTextContents = await deathDialog.allTextContents();
      const dialogText = dialogTextContents
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
      log(`death dialog text: "${dialogText}"`);
      log("dismissing death dialog");
      await dispatchKeyPress(page, " ", "Space");
      await page.waitForTimeout(500 * osSlowness);
      return dialogText;
    }
    if (!summoned) {
      summoned = true;
      // short wait in case engine needs to switch chars:
      await page.waitForTimeout(1_000 * osSlowness);
      log(`lives=${await getCurrentLives(page)} → summon guardian`);
      await clickCheat(page, "cheats-summon-monster-emperorsGuardian");
    }
    await page.waitForTimeout(500 * osSlowness);
  }
  throw new Error("timed out waiting for death or game over");
};

export const loseAllLives = async (page: Page): Promise<string[]> => {
  const collectedMessages: string[] = [];
  const deadline = Date.now() + 60_000 * osSlowness;
  while (Date.now() < deadline) {
    const message = await loseOneLife(page);
    if (message === undefined) {
      return collectedMessages;
    }
    collectedMessages.push(message);
  }
  throw new Error("never reached an end-of-life dialog");
};

export const switchCharacter = async (
  page: Page,
  projectName: string,
): Promise<void> => {
  const startCharacter = await getCurrentCharacter(page);
  await retryWithRecovery({
    async action() {
      await dispatchKeyPress(page, "Enter", "Enter");
      await page.waitForFunction(
        (start) =>
          window._e2e_gamePageGameAi?.gameState.currentCharacterName !== start,
        startCharacter,
        { timeout: 2_000 * osSlowness },
      );
    },
    maxAttempts: 5,
    logHeader: formatProjectName(projectName),
    actionDescription: "switch character via Enter",
    page,
    screenshotPrefix: `switch-char-${projectName}`,
  });
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

/**
 * change to any room of the loaded campaign other than the one the current
 * character is in, and return its id. Unlike the cheats panel's room
 * shortcuts, which name rooms of the original campaign, this works whatever
 * campaign is loaded
 */
export const changeToAnotherRoom = async (page: Page): Promise<string> =>
  page.evaluate(() => {
    const gameApi = window._e2e_gamePageGameAi;
    if (gameApi === undefined) {
      throw new Error("no game api - the game has not finished loading");
    }
    const currentRoomId = gameApi.currentRoom?.id;
    const otherRoomId = Object.keys(gameApi.campaign.rooms).find(
      (roomId) => roomId !== currentRoomId,
    );
    if (otherRoomId === undefined) {
      throw new Error("campaign has no room other than the current one");
    }
    gameApi.changeRoom(otherRoomId);
    return otherRoomId;
  });

/**
 * wait until the control options are actually listening for the key to assign.
 *
 * Entering assigning mode is two steps: the store records it synchronously,
 * then a render later an effect subscribes to the ticker. Only a key pressed
 * after that subscription counts - one already down when it happens reads as
 * held rather than as a fresh press, and is never assigned. Preact flushes
 * effects on a task after a frame, so waiting one frame is not enough to be
 * sure the second step has happened.
 */
export const waitForAssigningInput = async (page: Page): Promise<void> => {
  await page.waitForFunction(
    () =>
      window._e2e_store?.getState().userSettings.assigningInput !== undefined,
  );
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => setTimeout(() => resolve(), 0));
      }),
  );
};
