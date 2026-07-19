import { expect, test } from "@playwright/test";
import { type Container, type Texture } from "pixi.js";

import {
  dispatchToStore,
  setZeroGameSpeed,
  waitForGameReady,
} from "./testUtils/gameStateQueries";
import {
  exitCrownsDialog,
  playGameMenuItemSelector,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";
import { roomScreenshotOptions } from "./testUtils/screenshots";

/**
 * Regression guard for the cleanEdge smooth-sprites bake: boots the original
 * campaign's starting room, turns the option on, and snapshots the room once
 * the upscaled sheets are live. Primarily this pins the shader's output so it
 * can be refactored (eg towards a branchless form) without drift.
 */

const logHeader = "smoothSprites";

test("smooth sprites in the starting room", async ({ page }, testInfo) => {
  // one baseline is enough to pin the shader's output; this also keeps the
  // committed snapshots to the project every CI platform runs:
  test.skip(
    testInfo.project.name !== "chromium-desktop",
    "smooth-sprites baseline is chromium-desktop only",
  );
  // generous timeout: software-rendered environments (SwiftShader in CI or a
  // sandbox) are very slow to compile the cleanEdge shader on first bake
  test.setTimeout(600_000);

  await setupE2ePage(page);
  await page.goto("/?cheats=1&track=0");

  await page.click(playGameMenuItemSelector);
  await page.click("[data-menuitem_id=originalGame]");

  await setZeroGameSpeed(page);
  await waitForGameReady(page);
  await exitCrownsDialog(page, logHeader);

  await dispatchToStore(page, {
    type: "userSettings/toggleUserSetting",
    payload: { path: "displaySettings.smoothSprites", value: true },
  });

  // ground truth that the re-bake landed: a stage sprite is drawing from an
  // upscaled (resolution > 1) sheet:
  await page.waitForFunction(
    () => {
      const usesUpscaledSheet = (node: Container): boolean => {
        const { texture } = node as { texture?: Texture };
        // texture.source can be transiently absent mid-rebuild:
        if (texture?.source !== undefined && texture.source.resolution > 1) {
          return true;
        }
        return node.children.some(usesUpscaledSheet);
      };
      return usesUpscaledSheet(window.__PIXI_APP__!.stage);
    },
    undefined,
    { timeout: 590_000 },
  );
  // allow the recreated renderers a frame or two to settle:
  await page.waitForTimeout(1_000);

  await expect(page).toHaveScreenshot("smooth-sprites-starting-room.png", {
    ...roomScreenshotOptions(testInfo.project.name),
    // the capture-and-compare loop can stall behind the same slow software
    // shader compile as above, so allow it far longer than the default 5s:
    timeout: 180_000,
  });
});
