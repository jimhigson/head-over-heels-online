import { expect, type Page } from "@playwright/test";

import { osSlowness } from "./testUtils/infrastructure";
import { setupE2ePage } from "./testUtils/pageSetup";
import { test } from "./testUtils/test";

/**
 * Snapshot the upscale slice's computed upscale fields. The values that
 * matter for verifying recompute: `gameEngineUpscale`, `cssUpscale`, and
 * `gameEngineScreenSize`. If any of these change, the slice has been
 * recomputed.
 */
const readUpscale = (page: Page) =>
  page.evaluate(() => {
    const store = window._e2e_store;
    if (!store) {
      throw new Error("E2E store not available");
    }
    const { upscale } = store.getState().upscale;
    return {
      cssUpscale: upscale.cssUpscale,
      gameEngineUpscale: upscale.gameEngineUpscale,
      gameEngineScreenSize: upscale.gameEngineScreenSize,
    };
  });

/**
 * wait until the upscale slice has recomputed from a render area of this size.
 * `canvasSize` is the recompute's own reading of the area it was given, so it
 * changes on every resize - including ones that leave the integer engine
 * upscale alone, which is exactly where a test needs to know the recompute ran
 */
const waitForCanvasSize = (page: Page, size: { x: number; y: number }) =>
  page.waitForFunction((want) => {
    const { canvasSize } = window._e2e_store?.getState().upscale.upscale ?? {};
    return canvasSize?.x === want.x && canvasSize.y === want.y;
  }, size);

const dispatchToStore = (
  page: Page,
  action: { type: string; payload?: unknown },
) =>
  page.evaluate(
    ({ action }) => {
      const store = window._e2e_store;
      if (!store) {
        throw new Error("E2E store not available");
      }
      store.dispatch(action);
    },
    { action },
  );

test.describe("upscale recomputes on display + window changes", () => {
  test.setTimeout(30_000 * osSlowness);

  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
    await page.goto("/?cheats=1&track=0");
    await page.locator('[data-dialog-id="mainMenu"]').waitFor();
  });

  test("changing emulated resolution recomputes the upscale", async ({
    page,
  }) => {
    const before = await readUpscale(page);

    // Switch to a different emulated resolution. The displaySettings
    // listener should pick this up and recompute.
    await dispatchToStore(page, {
      type: "userSettings/setEmulatedResolution",
      payload: "amigaHiResPal",
    });
    // wait for the recompute to land rather than guessing a delay:
    await page.waitForFunction(
      (prev) =>
        JSON.stringify(
          window._e2e_store?.getState().upscale.upscale.gameEngineScreenSize,
        ) !== prev,
      JSON.stringify(before.gameEngineScreenSize),
    );

    const after = await readUpscale(page);
    expect(after.gameEngineScreenSize).not.toEqual(before.gameEngineScreenSize);
  });

  test("toggling CRT filter recomputes the upscale (at large viewport)", async ({
    page,
  }) => {
    // Viewport must be big enough that the natural upscale would exceed
    // the CRT-imposed cap (6) — otherwise the cap doesn't bite. With
    // zxSpectrum (256×192) we need totalUpscale > 6, so viewport ≥ 1792×1344.
    await page.setViewportSize({ width: 2_560, height: 1_440 });

    await dispatchToStore(page, {
      type: "userSettings/setEmulatedResolution",
      payload: "zxSpectrum",
    });
    // wait until the resolution change and the viewport resize have both been
    // taken: canvasSize is the recompute's own reading of the render area, so
    // it matching the new viewport says the latest one is the one in the store
    await page.waitForFunction(() => {
      const { canvasSize } =
        window._e2e_store?.getState().upscale.upscale ?? {};
      return canvasSize?.x === 2_560 && canvasSize.y === 1_440;
    });

    const before = await readUpscale(page);

    await dispatchToStore(page, {
      type: "userSettings/toggleUserSetting",
      payload: { path: "displaySettings.crtFilter" },
    });
    // wait for the CRT toggle to recompute the engine upscale:
    await page.waitForFunction(
      (prev) =>
        window._e2e_store?.getState().upscale.upscale.gameEngineUpscale !==
        prev,
      before.gameEngineUpscale,
    );

    // CRT on caps gameEngineUpscale at 6 (vs 8 without). At 2560×1440 with
    // zxSpectrum, totalUpscale is 7, so toggling CRT on lowers the engine
    // upscale from 7 to 6.
    const after = await readUpscale(page);
    expect(after.gameEngineUpscale).toBeLessThan(before.gameEngineUpscale);
  });

  test("resizing the viewport recomputes the upscale", async ({ page }) => {
    await page.setViewportSize({ width: 512, height: 384 });
    // the recompute runs off the window's own resize event, so wait for its
    // reading of the render area to be the new size rather than for the window
    // to report it - the store catches up a beat later:
    await waitForCanvasSize(page, { x: 512, y: 384 });
    const before = await readUpscale(page);

    // a tiny resize that doesn't cross an integer-upscale boundary should
    // leave the upscale factor unchanged (calculateUpscale floors to
    // integer steps)
    await page.setViewportSize({ width: 530, height: 400 });
    // canvasSize follows every resize, so it proves the recompute ran even
    // where the integer engine upscale is meant to come out unchanged:
    await waitForCanvasSize(page, { x: 530, y: 400 });
    const afterTinyChange = await readUpscale(page);
    expect(afterTinyChange.gameEngineUpscale).toBe(before.gameEngineUpscale);

    // a larger resize crosses an upscale boundary, so the factor should grow
    await page.setViewportSize({ width: 1_280, height: 960 });
    // wait for the engine upscale to grow past the crossed boundary:
    await page.waitForFunction(
      (prev) =>
        (window._e2e_store?.getState().upscale.upscale.gameEngineUpscale ?? 0) >
        prev,
      before.gameEngineUpscale,
    );
    const afterBigChange = await readUpscale(page);
    expect(afterBigChange.gameEngineUpscale).toBeGreaterThan(
      before.gameEngineUpscale,
    );
  });
});
