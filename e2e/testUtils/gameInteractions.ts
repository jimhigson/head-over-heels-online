import { type Page } from "@playwright/test";
import chalk from "chalk";

import { type PokeableNumber } from "../../src/model/ItemStateMap";
import {
  getCurrentCharacter,
  waitForCurrentPlayable,
} from "./gameStateQueries";
import { osSlowness } from "./infrastructure";
import { elapsed, formatProjectName } from "./logging";

/**
 * the current playable's lives. head-over-heels holds one count per character
 * rather than a single one, so it has no lives of its own
 */
const getCurrentLives = (page: Page): Promise<PokeableNumber | undefined> =>
  page.evaluate(() => {
    const state = window.__e2e_currentPlayable?.()?.state;
    return state !== undefined && "lives" in state ? state.lives : undefined;
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
  const gameOverDialog = page
    .locator('[data-dialog-id="offerReincarnation"], [data-dialog-id="score"]')
    .first();
  const deathDialog = page.locator('[data-dialog-id="death"]');

  // already at game over?
  if (await gameOverDialog.isVisible().catch(() => false)) {
    return undefined;
  }

  // wait until a character is controllable (the engine may still be switching
  // chars after a previous death), then summon a homing guardian:
  await waitForCurrentPlayable(page);
  log(`lives=${await getCurrentLives(page)} → summon guardian`);
  await clickCheat(page, "cheats-summon-monster-emperorsGuardian");

  // the guardian homes onto the player, so wait for the death or a game-over
  // dialog to appear rather than polling on a timer. Whichever comes first wins;
  // the timeout allows for the post-death invulnerability window to expire so a
  // later guardian hit lands:
  await Promise.race([
    deathDialog.waitFor({ state: "visible", timeout: 30_000 * osSlowness }),
    gameOverDialog.waitFor({ state: "visible", timeout: 30_000 * osSlowness }),
  ]).catch(() => {});

  if (await gameOverDialog.isVisible().catch(() => false)) {
    return undefined;
  }
  if (await deathDialog.isVisible().catch(() => false)) {
    const dialogText = (await deathDialog.allTextContents())
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    log(`death dialog text: "${dialogText}"`);
    log("dismissing death dialog");
    await dispatchKeyPress(page, " ", "Space");
    await deathDialog.waitFor({
      state: "detached",
      timeout: 5_000 * osSlowness,
    });
    return dialogText;
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
  console.log(
    `${formatProjectName(projectName)} ${elapsed()}: switching character via Enter (from ${startCharacter})`,
  );
  await dispatchKeyPress(page, "Enter", "Enter");
  // wait for the switch to actually land rather than retrying the press - a
  // dropped press is a real input bug, not something to paper over:
  await page.waitForFunction(
    (start) =>
      window._e2e_gamePageGameAi?.gameState.currentCharacterName !== start,
    startCharacter,
    { timeout: 15_000 * osSlowness },
  );
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
