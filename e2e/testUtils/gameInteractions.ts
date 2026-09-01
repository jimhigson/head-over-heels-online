import { type Page } from "@playwright/test";
import chalk from "chalk";

import { type PokeableNumber } from "../../src/model/ItemStateMap";
import { defaultUserSettings } from "../../src/store/slices/userSettings/defaultUserSettings";
import {
  advanceUntil,
  fastForwardGameTime,
  isGameMenuOpen,
  paintFrame,
  settleInput,
} from "./advanceGameTime";
import {
  captureE2eCursor,
  dispatchToStore,
  getCurrentCharacter,
  waitForCharacterToChangeFrom,
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

/**
 * press a key and let a tick read it, then release - all in one evaluate.
 *
 * Nothing ticks on its own in an e2e build, so a press has to carry its own
 * advance: without one the key goes down and up with no tick between, and
 * nothing - menu or world - ever sees it. Atomic because a tick counts a press
 * as a tap only when it was down and wasn't on the tick before
 */
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
      const advanceTime = window.__e2e_advanceTime;
      if (advanceTime === undefined) {
        throw new Error(
          "__e2e_advanceTime is not on the window - is this a visual-regression build?",
        );
      }
      window.dispatchEvent(new KeyboardEvent("keydown", { key, code }));
      // only a frame worth some time acts on the press - a frame of none runs
      // no physics at all, so the key would go down and up unnoticed
      advanceTime(250);
      window.dispatchEvent(new KeyboardEvent("keyup", { key, code }));
    },
    { key, code },
  );
};

export type HeldKey = { key: string; code: string };

const setKeysHeld = (
  page: Page,
  keys: ReadonlyArray<HeldKey>,
  held: boolean,
): Promise<void> =>
  page.evaluate(
    ({ keys, held }) => {
      for (const { key, code } of keys) {
        window.dispatchEvent(
          new KeyboardEvent(held ? "keydown" : "keyup", { key, code }),
        );
      }
    },
    { keys, held },
  );

/**
 * freeze the world, run `heldDown` with it stopped, then restore the speed it
 * was running at.
 *
 * Driving the game in fast-forwarded steps only gives a deterministic result if
 * the game is not *also* running in real time between those steps: otherwise
 * the character keeps walking, and a dialog can open, in the gaps between the
 * test's round-trips - gaps that stretch under load, which is where this goes
 * wrong first. Frozen, nothing happens except the steps this asks for.
 */
const whileFrozen = async (page: Page, heldDown: () => Promise<void>) => {
  const speedBefore =
    (await page.evaluate(
      () => window._e2e_store?.getState().userSettings.userSettings.gameSpeed,
    )) ?? defaultUserSettings.gameSpeed;

  await dispatchToStore(page, {
    type: "userSettings/setGameSpeed",
    payload: 0,
  });
  try {
    await heldDown();
  } finally {
    await dispatchToStore(page, {
      type: "userSettings/setGameSpeed",
      payload: speedBefore,
    });
  }
};

/**
 * hold keys down for a duration of *game* time, then release them.
 *
 * The duration is fast-forwarded rather than waited out in wall-clock: how far
 * a character travels is a function of game time, so holding for real seconds
 * makes the distance depend on how fast the machine happened to run. The jump
 * is sub-stepped exactly as normal play is, with the keys held throughout, so
 * the same press covers the same ground on every run.
 */
export const holdKeysForDuration = async (
  page: Page,
  keys: ReadonlyArray<HeldKey>,
  durationMs: number,
) => {
  await whileFrozen(page, async () => {
    await setKeysHeld(page, keys, true);
    await settleInput(page);
    await fastForwardGameTime(page, durationMs);
    await setKeysHeld(page, keys, false);
  });
};

/**
 * hold keys down until something has happened, advancing *game* time in steps
 * rather than waiting in wall-clock, then release them.
 *
 * Where a walk is "far enough to reach x", holding for a fixed duration is a
 * guess at how long that takes - one that has to be re-tuned whenever the speed
 * or the distance changes, and that says nothing about having arrived. This
 * instead walks until the thing being walked to is true, so the test states its
 * own goal, and `maxMs` is only a budget for giving up.
 */
export const holdKeysUntil = async (
  page: Page,
  keys: ReadonlyArray<HeldKey>,
  arrived: () => Promise<boolean>,
  { stepMs = 250, maxMs = 20_000 }: { stepMs?: number; maxMs?: number } = {},
) => {
  await whileFrozen(page, () =>
    holdKeysUntilFrozen(page, keys, arrived, { stepMs, maxMs }),
  );
};

const holdKeysUntilFrozen = async (
  page: Page,
  keys: ReadonlyArray<HeldKey>,
  arrived: () => Promise<boolean>,
  { stepMs, maxMs }: { stepMs: number; maxMs: number },
) => {
  await setKeysHeld(page, keys, true);
  await settleInput(page);
  try {
    for (let elapsedMs = 0; elapsedMs < maxMs; elapsedMs += stepMs) {
      if (await arrived()) {
        return;
      }
      if (await isGameMenuOpen(page)) {
        // a menu covers the game, so no further walking can happen however long
        // this keeps stepping - and arriving is often *what opened it* (walking
        // onto a scroll). Stop advancing and let the final check below decide,
        // once the dialog it opened has had a frame to render.
        break;
      }
      await fastForwardGameTime(page, stepMs);
      if (await arrived()) {
        return;
      }
    }

    await paintFrame(page);
    if (await arrived()) {
      return;
    }
    throw new Error(
      `held ${keys.map(({ key }) => key).join("+")} for up to ${maxMs}ms of game time without arriving`,
    );
  } finally {
    await setKeysHeld(page, keys, false);
  }
};

/**
 * The cheats panel is a Radix Collapsible — clicking the trigger toggles
 * visibility, so only click the trigger when the menu isn't currently open.
 */
export const clickCheat = async (page: Page, testId: string) => {
  // let the character come to rest first: a summoned pickup lands where they
  // are, so summoning while they are still walking into the room leaves it
  // behind them, to be walked away from rather than collected
  await advanceUntil(page, () =>
    page.evaluate(() => {
      const playable = window.__e2e_currentPlayable?.();
      return playable === undefined || playable.state.standingOnItemId !== null;
    }),
  );

  await openCheatsAndClick(page, testId);
};

const openCheatsAndClick = async (page: Page, testId: string) => {
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

const summonGuardian = (page: Page) =>
  clickCheat(page, "cheats-summon-monster-emperorsGuardian");

/** is there a guardian in the room to home in on the player? */
const roomHasGuardian = (page: Page): Promise<boolean> =>
  page.evaluate(() =>
    Object.values(window._e2e_gamePageGameAi?.currentRoom?.items ?? {}).some(
      (item) =>
        item.type === "monster" &&
        (item.config as { which?: string }).which === "emperorsGuardian",
    ),
  );

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

  // wait for a character to be controllable before summoning anything for it to
  // home in on. That takes game time, which only passes when asked for:
  const controllable = await advanceUntil(page, () =>
    page.evaluate(() => window.__e2e_currentPlayable?.() !== undefined),
  );
  if (!controllable) {
    throw new Error("no character became controllable to summon a guardian at");
  }
  log(`lives=${await getCurrentLives(page)} → summon guardian`);
  await summonGuardian(page);

  // the guardian homes onto the player, which takes game time - and game time
  // only passes when asked for. Re-summon whenever the room has no guardian:
  // the respawn from the previous death completes a tick or two into this wait
  // and reloads the room, taking any guardian summoned before it with it
  await advanceUntil(
    page,
    async () => {
      if (
        (await deathDialog.isVisible().catch(() => false)) ||
        (await gameOverDialog.isVisible().catch(() => false))
      ) {
        return true;
      }
      if (!(await roomHasGuardian(page))) {
        await summonGuardian(page);
      }
      return false;
    },
    { maxMs: 30_000 },
  );

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

/**
 * Repeatedly summon emperor's guardians until all lives are lost, collecting
 * each death message. The guardian homes onto the player, so contact is
 * reliable; one is summoned per life, since the room resets after each death
 * and wipes out any previously-summoned monsters.
 */
export const loseAllLives = async (page: Page): Promise<string[]> => {
  const collectedMessages: string[] = [];
  // bounded by deaths rather than by wall-clock: how long this takes depends on
  // how fast the machine drives the steps, but how many lives there are to lose
  // does not. Comfortably over the 13 a two-character game takes
  const mostDeathsAGameCanHave = 40;
  for (let death = 0; death < mostDeathsAGameCanHave; death++) {
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
  // captured before the press, so the change is matched from the bus even if it
  // lands before the wait is set up:
  const afterId = await captureE2eCursor(page);
  await dispatchKeyPress(page, "Enter", "Enter");
  // wait for the switch to actually land rather than retrying the press - a
  // dropped press is a real input bug, not something to paper over:
  await waitForCharacterToChangeFrom(page, startCharacter, afterId);
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
