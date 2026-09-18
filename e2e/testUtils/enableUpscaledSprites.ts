import { type Page } from "@playwright/test";

import {
  dispatchToStore,
  snapshotE2eCursor,
  waitForEventOnBus,
} from "./gameStateQueries";

/**
 * turn the smooth-sprites (upscaling) display setting on, and wait
 * until a frame has actually been drawn from the upscaled sheet.
 *
 * Switching it on only changes the setting: the bake module is fetched, the
 * sheet re-baked and the renderers rebuilt over the ticks that follow. A frame
 * reporting the upscaled bake back is how that landing is known.
 */
export const enableUpscaledSprites = async (page: Page) => {
  // captured before the dispatch, so a frame drawing the upscaled sheet before
  // this wait is set up is still matched from the log:
  const afterId = await snapshotE2eCursor(page);

  await dispatchToStore(page, {
    type: "userSettings/toggleUserSetting",
    payload: { path: "displaySettings.upscaledSprites", value: true },
  });

  await waitForEventOnBus(page, {
    name: "frameRendered",
    afterId,
    arg: undefined,
    match: (payload) => payload.spritesheetUpscale > 1,
  });
};
