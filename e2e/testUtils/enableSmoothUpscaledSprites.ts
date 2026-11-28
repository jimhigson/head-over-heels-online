import type { Page } from "@playwright/test";

import { maxSmoothingFailures } from "../../src/store/slices/smoothing/smoothingSlice";
import {
  dispatchToStore,
  snapshotE2eCursor,
  waitForEventOnBus,
} from "./gameStateQueries";
import { waitForGpuToFinish } from "./waitForGpuToFinish";

/**
 * turn the smooth-sprites (upscaling) display setting on, and wait
 * until a frame has actually been drawn from the upscaled sheet.
 *
 * Switching it on only changes the setting: the bake module is fetched, the
 * sheet re-baked and the renderers rebuilt over the ticks that follow. A frame
 * reporting the upscaled bake back is how that landing is known.
 */
export const enableSmoothUpscaledSprites = async (page: Page) => {
  // captured before the dispatch, so a frame drawing the upscaled sheet before
  // this wait is set up is still matched from the log:
  const afterId = await snapshotE2eCursor(page);
  const startedAt = performance.now();

  await dispatchToStore(page, {
    type: "userSettings/toggleUserSetting",
    payload: { path: "displaySettings.upscaledSprites", value: true },
  });

  await waitForEventOnBus(page, {
    name: "frameRendered",
    afterId,
    arg: maxSmoothingFailures,
    match: (payload, maxFailures) =>
      payload.spritesheetSmoothUpscale > 1 ||
      // no upscaled frame will come once failing too often turns it off:
      window._e2e_store!.getState().smoothing.failures >= maxFailures,
  });
  const smoothingFailures = await page.evaluate(
    () => window._e2e_store!.getState().smoothing.failures,
  );
  if (smoothingFailures >= maxSmoothingFailures) {
    throw new Error(
      `smoothing the spritesheet failed ${smoothingFailures} times, so it was turned off - see the console for each failure`,
    );
  }
  const firstSmoothedFrameAt = performance.now();
  // the bake is heavy GPU work, often still running after the frame reports
  await waitForGpuToFinish(page);
  const gpuFinishedAt = performance.now();

  console.log(
    `[smoothing-bake] first smoothed frame after ${Math.round(firstSmoothedFrameAt - startedAt)}ms, gpu finished after ${Math.round(gpuFinishedAt - startedAt)}ms`,
  );
};
