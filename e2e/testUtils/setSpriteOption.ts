import { type Page } from "@playwright/test";

import {
  type setSpritesOption,
  type SpriteOption,
} from "../../src/store/slices/userSettings/userSettingsSlice";
import {
  captureE2eCursor,
  dispatchToStore,
  waitForAnimationFrames,
  waitForSpriteOptionRenderEvent,
} from "./gameStateQueries";
import { osSlowness } from "./infrastructure";
import { elapsed } from "./logging";

export const setSpriteOption = async (
  page: Page,
  formattedName: string,
  spriteOption: SpriteOption,
) => {
  console.log(
    `${formattedName} ${elapsed()}: setting sprite option to ${spriteOption.name} (uncolourised: ${spriteOption.uncolourised})`,
  );

  // capture the bus cursor before dispatching, so the frame that first reflects
  // the new option is matched even if it renders before the wait is set up:
  const afterId = await captureE2eCursor(page);

  type SetSpritesOption = ReturnType<typeof setSpritesOption>;
  const dispatched = await dispatchToStore(page, {
    type: "userSettings/setSpritesOption",
    payload: spriteOption,
  } satisfies SetSpritesOption);

  if (!dispatched) {
    throw new Error(
      `Failed to dispatch to store - setting sprite option to ${spriteOption.name}`,
    );
  }

  // spriteOptionRendered is only emitted by the game's main loop, so it only
  // fires when a game is running. In-game, wait until a rendered frame actually
  // reflects the new option (covers the async spritesheet load when switching
  // to/from Toppy). With no running loop (eg at the main menu or a standalone
  // dialog) the event never comes, so instead wait for the next painted frame:
  const gameLoopRunning = await page.evaluate(
    () => window._e2e_gamePageGameAi !== undefined,
  );
  if (gameLoopRunning) {
    await waitForSpriteOptionRenderEvent(
      page,
      spriteOption,
      afterId,
      formattedName,
    );
  } else {
    // No game loop (main menu / standalone dialog): switching sprite option can
    // trigger an async spritesheet load, shown by the striped loading border
    // (driven by assetsLoadingCount via a Suspense fallback, mounted a couple of
    // frames after the dispatch). Let those frames pass so the border appears if
    // a load is needed, then wait for it to leave - so a screenshot is never
    // taken mid-load:
    await waitForAnimationFrames(page, 3);
    await page
      .locator(".loading-border")
      .waitFor({ state: "detached", timeout: 30_000 * osSlowness });
  }
};
