import { type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import {
  harvestPersistedLocalStorage,
  type SaveFixture,
  saveFixturesDir,
} from "./saveFixtures";

/**
 * the representative sample of original-campaign rooms that save fixtures are
 * captured in: an exact minimum set-cover so that between them, the saves
 * embed at least one of every json item type and one of every monster `which`
 * that appears anywhere in the original campaign.
 *
 * (seven json item types are remake/editor-only and appear in no original
 * room, so no original-campaign save can cover them: bubbles, firedDoughnut,
 * floatingText, lamp, mirror, portableTeleporter, timer)
 *
 * finalroom is last: the game is started with a #finalroom hash, so it is the
 * character's starting room and navigating "to" it first would be a no-op.
 */
export const saveCompatRoomIds = [
  "blacktooth0switches", // button, block, door, floor, pickup, switch, wall
  "blacktooth23heels", // player, barrier, teleporter, deadlyBlock, conveyor
  "blacktooth74", // monster, portableBlock, which:monkey
  "blacktooth86", // which:emperorsGuardian
  "blacktooth87crown", // which:emperor, which:dalek
  "safari11", // which:elephant, which:elephantHead
  "penitentiary11", // moveableDeadly
  "moonbase4", // which:computerBot
  "blacktooth16", // which:bubbleRobot, slidingDeadly
  "bookworld21", // which:homingBot, slidingBlock
  "blacktooth76", // which:skiHead, which:turtle
  "moonbase3", // spring, charles, joystick, spikes, movingPlatform
  "blacktooth37", // ball
  "blacktooth63", // which:helicopterBug, hushPuppy
  "blacktooth33", // lift, which:cyberman
  "finalroom", // sceneryCrown, sceneryPlayer, emitter, pushableBlock
] as const;

const arrivalTimeoutMs = 30_000;
const saveWrittenTimeoutMs = 15_000;

/** raw persist:* localStorage values, joined - for change detection */
const persistedRaw = (page: Page): Promise<string> =>
  page.evaluate(() => {
    const parts: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      if (key.startsWith("persist:")) {
        parts.push(`${key}=${localStorage.getItem(key)!}`);
      }
    }
    return parts.join("\n");
  });

/**
 * capture a save fixture for every room in {@link saveCompatRoomIds} by
 * playing the original campaign and hash-navigating between the rooms (the
 * same mechanism as the room-snapshot specs); each room change dispatches a
 * save, which is harvested from localStorage as soon as it lands.
 *
 * Deliberately version-agnostic: uses only selectors and window globals that
 * have been stable since v22, so the same core can be pointed at builds of
 * old release tags to back-fill the fixture library.
 */
export const captureSaveFixtures = async (
  page: Page,
  {
    version,
    log = () => {},
  }: {
    /** full semver of the build being captured from, eg "22.0.0" */
    version: string;
    log?: (message: string) => void;
  },
): Promise<void> => {
  const [major] = version.split(".");
  const outDir = path.join(saveFixturesDir, `v${major}`);
  mkdirSync(outDir, { recursive: true });

  // start in finalroom so every navigation in the room list is a real room
  // change (room changes are what dispatch saves):
  await page.goto("/?cheats=1&track=0#finalroom");
  await page.click("[data-menuitem_id=playGame]", { timeout: 30_000 });
  await page.click("[data-menuitem_id=originalGame]", { timeout: 30_000 });

  // the crowns dialog appears once the campaign has loaded; it can ignore
  // clicks while still settling, so click until it closes:
  const crowns = page.locator('[data-dialog-id="crowns"]');
  await crowns.waitFor({ state: "visible", timeout: 30_000 });
  for (let attempt = 0; attempt < 10; attempt++) {
    if (!(await crowns.isVisible().catch(() => false))) {
      break;
    }
    await crowns.click({ timeout: 5_000 }).catch(() => {});
    await page.waitForTimeout(500);
  }
  await crowns.waitFor({ state: "detached", timeout: 10_000 });

  await page.waitForFunction(
    () => window._e2e_gamePageGameAi?.gameState !== undefined,
    undefined,
    { timeout: 30_000 },
  );
  log(
    `game started (v${version}); capturing ${saveCompatRoomIds.length} rooms`,
  );

  for (const roomId of saveCompatRoomIds) {
    const persistedBefore = await persistedRaw(page);

    // hash-only navigation: no reload, the game changes room in place:
    await page.goto(`/?cheats=1&track=0#${roomId}`);

    await page.waitForFunction(
      (targetRoomId) => {
        const gameState = window._e2e_gamePageGameAi?.gameState;
        if (gameState === undefined) {
          return false;
        }
        const room = gameState.characterRooms[gameState.currentCharacterName];
        return room?.roomJson.id === targetRoomId;
      },
      roomId,
      { timeout: arrivalTimeoutMs },
    );

    // the room change dispatches a save; wait for redux-persist to write it:
    await page.waitForFunction(
      (before) => {
        const parts: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)!;
          if (key.startsWith("persist:")) {
            parts.push(`${key}=${localStorage.getItem(key)!}`);
          }
        }
        return parts.join("\n") !== before;
      },
      persistedBefore,
      { timeout: saveWrittenTimeoutMs },
    );

    const fixture: SaveFixture = {
      capturedFromVersion: version,
      capturedDate: new Date().toISOString().slice(0, 10),
      roomId,
      localStorage: await harvestPersistedLocalStorage(page),
    };

    const filePath = path.join(outDir, `${roomId}.json`);
    writeFileSync(filePath, `${JSON.stringify(fixture, null, 2)}\n`);
    log(`captured ${roomId} -> ${filePath}`);
  }
};
