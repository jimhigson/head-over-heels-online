import { expect, type Page, test } from "@playwright/test";
import { type Container, type Texture } from "pixi.js";

import { enableSmoothSprites } from "./testUtils/enableSmoothSprites";
import { waitForGameReady } from "./testUtils/gameStateQueries";
import { osSlowness } from "./testUtils/infrastructure";
import { startCampaignViaMenu } from "./testUtils/menuNavigation";
import { enableOnScreenControls } from "./testUtils/onScreenControls";
import { setupE2ePage } from "./testUtils/pageSetup";

/**
 * every texture drawn by the hud that is not the shared empty texture, as
 * `label: resolution` pairs. Reading the resolutions off the live scene graph
 * is ground truth for "is this drawn from an upscaled bake", which pixels
 * cannot reliably tell apart
 */
const hudTextureResolutions = (page: Page) =>
  page.evaluate(() => {
    const findHud = (node: Container): Container | undefined => {
      if (node.label === "HudRenderer") {
        return node;
      }
      for (const child of node.children) {
        const found = findHud(child as Container);
        if (found !== undefined) {
          return found;
        }
      }
      return undefined;
    };
    const hud = findHud(window.__PIXI_APP__!.stage);
    if (hud === undefined) {
      throw new Error("no hud in the pixi scene graph");
    }

    const resolutions: Record<string, number> = {};
    const walk = (node: Container, path: string) => {
      const here = `${path}/${node.label}`;
      const { texture } = node as { texture?: Texture };
      if (
        texture !== undefined &&
        texture.source !== undefined &&
        // an empty string (eg a zero shield count) draws nothing, so has no
        // rendering to be smoothed
        texture.label !== "EMPTY"
      ) {
        resolutions[here] = texture.source.resolution;
      }
      for (const child of node.children) {
        walk(child as Container, here);
      }
    };
    walk(hud, "");
    return resolutions;
  });

test.describe("smooth sprites", () => {
  // the cleanEdge shader is slow to compile where rendering is in software
  test.setTimeout(600_000 * osSlowness);

  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
  });

  test("turning it on live smooths the hud, not only the room", async ({
    page,
  }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
    // the touch hud is the densest one - a joystick, arcade buttons and their
    // labels on top of the icons the pointer hud also shows
    await enableOnScreenControls(page);

    await enableSmoothSprites(page);

    const resolutions = await hudTextureResolutions(page);
    expect(Object.keys(resolutions).length).toBeGreaterThan(0);
    expect(
      Object.entries(resolutions).filter(([, resolution]) => resolution === 1),
    ).toEqual([]);
  });

  test("the game starts when it is already on at boot", async ({
    page,
  }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
    await enableSmoothSprites(page);

    // reloading resumes the game with the setting persisted on, so the very
    // first frame is rendered smooth rather than transitioning into it
    await page.reload();
    await waitForGameReady(page);

    // the game runs on under the hold dialog the reload resumes into, so the
    // engine having drawn a frame is the assertion - not anything on screen
    await expect
      .poll(
        () =>
          page.evaluate(
            () => performance.getEntriesByName("first-gameplay").length,
          ),
        { timeout: 30_000 * osSlowness },
      )
      .toBe(1);
  });
});
