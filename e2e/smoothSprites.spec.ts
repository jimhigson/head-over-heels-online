import { expect, type Page } from "@playwright/test";
import { type Container, type Texture } from "pixi.js";

import { enableSmoothSprites } from "./testUtils/enableSmoothSprites";
import {
  paintRenderedFrame,
  setZeroGameSpeed,
  waitForGameReady,
} from "./testUtils/gameStateQueries";
import {
  osSlowness,
  restrictToCameraRotationProjects,
} from "./testUtils/infrastructure";
import { formatProjectName } from "./testUtils/logging";
import {
  navigateToSubmenu,
  openInGameMainMenu,
  startCampaignViaMenu,
} from "./testUtils/menuNavigation";
import { enableOnScreenControls } from "./testUtils/onScreenControls";
import { setupE2ePage } from "./testUtils/pageSetup";
import {
  roomScreenshotOptions,
  smoothedHudTextMaxDiffPixelRatio,
} from "./testUtils/screenshots";
import { test } from "./testUtils/test";

restrictToCameraRotationProjects();

/**
 * the live hud's identity and the textures it draws: pixi's own `uid` for the
 * hud container (so a rebuild is detectable), and every texture that is not
 * the shared empty one as `label: resolution` pairs. Reading this off the
 * scene graph is ground truth for both "is this drawn from an upscaled bake"
 * and "was the hud rebuilt", neither of which pixels can tell apart
 */
const hudRendererState = (page: Page) =>
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
    return { uid: hud.uid, resolutions };
  });

/**
 * enough that a per-frame rebuild could not hide: the reported bug destroyed
 * and rebuilt the hud on every single frame
 */
const framesToProveTheHudSurvives = 30;

test.describe("smooth sprites", () => {
  // the cleanEdge shader is slow to compile where rendering is in software
  test.setTimeout(120_000 * osSlowness);

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

    // ground truth first: every hud texture must report the upscaled bake,
    // not just the ones a screenshot's tolerance happens to catch:
    const { resolutions } = await hudRendererState(page);
    expect(Object.keys(resolutions).length).toBeGreaterThan(0);
    expect(
      Object.entries(resolutions).filter(([, resolution]) => resolution === 1),
    ).toEqual([]);

    await setZeroGameSpeed(page);
    await paintRenderedFrame(page);

    await expect(page).toHaveScreenshot("smooth-sprites-hud-live-toggle.png", {
      ...roomScreenshotOptions(testInfo.project.name),
      maxDiffPixels: undefined,
      maxDiffPixelRatio: smoothedHudTextMaxDiffPixelRatio,
    });
  });

  test("opening a display menu does not rebuild the hud every frame", async ({
    page,
  }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
    await enableOnScreenControls(page);
    await enableSmoothSprites(page);

    // the option a paused tick renders under is derived per tick, so a menu
    // being open is exactly the state that can rebuild the hud endlessly -
    // and at this bake factor every rebuild re-rasterises the hud's text into
    // freshly allocated upscaled textures
    const logHeader = formatProjectName(testInfo.project.name);
    await openInGameMainMenu(page, logHeader);
    await navigateToSubmenu(page, "options", logHeader);
    await page.locator('[data-dialog-id="modernisationOptions"]').waitFor();
    await navigateToSubmenu(page, "display", logHeader);
    await page.locator('[data-dialog-id="displayOptions"]').waitFor();
    await paintRenderedFrame(page);

    const { uid: uidWhileOpen } = await hudRendererState(page);
    // frames are what rebuilds the hud, so drawing a run of them is the test -
    // an e2e build draws none on its own, so waiting would prove nothing
    for (let frame = 0; frame < framesToProveTheHudSurvives; frame++) {
      await paintRenderedFrame(page);
    }

    // pixi hands out a fresh uid per container, so an unchanged one is proof
    // the hud instance survived, rather than being destroyed and rebuilt on
    // every one of the frames rendered in between
    expect((await hudRendererState(page)).uid).toBe(uidWhileOpen);
  });

  test("the game starts when it is already on at boot", async ({
    page,
  }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
    await enableSmoothSprites(page);

    // reloading resumes the game with the setting persisted on, so the very
    // first frame is rendered smooth rather than transitioning into it:
    await page.reload();
    await waitForGameReady(page);

    // asking for a frame that draws waits out the boot-time bake behind it, so
    // the mark it leaves is ground truth - a black canvas (the reported bug)
    // would never reach it:
    await paintRenderedFrame(page);
    expect(
      await page.evaluate(
        () => performance.getEntriesByName("first-gameplay").length,
      ),
    ).toBe(1);

    // a screenshot of exactly this combined view (hold dialog over the canvas)
    // is the direct regression guard for the reported black canvas:
    await setZeroGameSpeed(page);
    await paintRenderedFrame(page);

    await expect(page).toHaveScreenshot(
      "smooth-sprites-boot-after-reload.png",
      {
        ...roomScreenshotOptions(testInfo.project.name),
        maxDiffPixels: undefined,
        maxDiffPixelRatio: smoothedHudTextMaxDiffPixelRatio,
      },
    );
  });
});
