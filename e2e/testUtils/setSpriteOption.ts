import { type Page } from "@playwright/test";

import {
  type setSpritesOption,
  type SpriteOption,
} from "../../src/store/slices/userSettings/userSettingsSlice";
import {
  captureE2eCursor,
  dispatchToStore,
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

  // frameRendered is only emitted by the game's main loop, so it only
  // fires when a game is running. In-game, wait until a rendered frame actually
  // reflects the new option (covers the async spritesheet load when switching
  // to/from Toppy). With no running loop (eg at the main menu or a standalone
  // dialog) the event never comes - see the branch below for what is waited on
  // instead:
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
    // No game loop (main menu / standalone dialog): nothing renders frames, so
    // there is no event to wait for. Outside the game the sprites are CSS
    // backgrounds, and the option only swaps a classname - the new spritesheet
    // is then fetched by the browser, which no store state reflects, so there is
    // nothing to gate on; the screenshot assertion's retry-until-stable is what
    // absorbs a sheet that is still decoding.
    //
    // What is worth waiting out is a lazy dialog chunk or the menu sounds still
    // loading, either of which shows the striped loading border - so if one is
    // up, let it leave before anything is captured over it. Waiting some frames
    // first, in case a border is about to appear, would be a guess either way:
    // too few and it is missed, too many and it is dead time. A border that
    // appears later is absorbed by the screenshot's retry-until-stable:
    await page
      .locator(".loading-border")
      .waitFor({ state: "detached", timeout: 30_000 * osSlowness });
  }
};
