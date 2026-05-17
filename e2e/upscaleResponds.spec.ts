import { expect, type Page, test } from "@playwright/test";

import { osSlowness } from "./testUtils/infrastructure";
import { setupE2ePage } from "./testUtils/pageSetup";

/**
 * Snapshot the upscale slice's computed upscale fields. The values that
 * matter for verifying recompute: `gameEngineUpscale`, `cssUpscale`, and
 * `gameEngineScreenSize`. If any of these change, the slice has been
 * recomputed.
 */
const readUpscale = (page: Page) =>
  page.evaluate(() => {
    const store = window._e2e_store;
    if (!store) throw new Error("E2E store not available");
    const { upscale } = store.getState().upscale;
    return {
      cssUpscale: upscale.cssUpscale,
      gameEngineUpscale: upscale.gameEngineUpscale,
      gameEngineScreenSize: upscale.gameEngineScreenSize,
    };
  });

const dispatchToStore = (
  page: Page,
  action: { type: string; payload?: unknown },
) =>
  page.evaluate(
    ({ action }) => {
      const store = window._e2e_store;
      if (!store) throw new Error("E2E store not available");
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
    await page.waitForTimeout(200 * osSlowness);

    const after = await readUpscale(page);
    expect(after.gameEngineScreenSize).not.toEqual(before.gameEngineScreenSize);
  });

  test("toggling CRT filter recomputes the upscale (at large viewport)", async ({
    page,
  }) => {
    // Viewport must be big enough that the natural upscale would exceed
    // the CRT-imposed cap (6) — otherwise the cap doesn't bite. With
    // zxSpectrum (256×192) we need totalUpscale > 6, so viewport ≥ 1792×1344.
    await page.setViewportSize({ width: 2560, height: 1440 });
    await page.waitForTimeout(200 * osSlowness);

    await dispatchToStore(page, {
      type: "userSettings/setEmulatedResolution",
      payload: "zxSpectrum",
    });
    await page.waitForTimeout(200 * osSlowness);

    const before = await readUpscale(page);

    await dispatchToStore(page, {
      type: "userSettings/toggleUserSetting",
      payload: { path: "displaySettings.crtFilter" },
    });
    await page.waitForTimeout(200 * osSlowness);

    // CRT on caps gameEngineUpscale at 6 (vs 8 without). At 2560×1440 with
    // zxSpectrum, totalUpscale is 7, so toggling CRT on lowers the engine
    // upscale from 7 to 6.
    const after = await readUpscale(page);
    expect(after.gameEngineUpscale).toBeLessThan(before.gameEngineUpscale);
  });

  test("resizing the viewport recomputes the upscale", async ({ page }) => {
    await page.setViewportSize({ width: 512, height: 384 });
    await page.waitForTimeout(200 * osSlowness);
    const before = await readUpscale(page);

    // a tiny resize that doesn't cross an integer-upscale boundary should
    // leave the upscale factor unchanged (calculateUpscale floors to
    // integer steps)
    await page.setViewportSize({ width: 530, height: 400 });
    await page.waitForTimeout(300 * osSlowness);
    const afterTinyChange = await readUpscale(page);
    expect(afterTinyChange.gameEngineUpscale).toBe(before.gameEngineUpscale);

    // a larger resize crosses an upscale boundary, so the factor should grow
    await page.setViewportSize({ width: 1280, height: 960 });
    await page.waitForTimeout(500 * osSlowness);
    const afterBigChange = await readUpscale(page);
    expect(afterBigChange.gameEngineUpscale).toBeGreaterThan(
      before.gameEngineUpscale,
    );
  });
});
