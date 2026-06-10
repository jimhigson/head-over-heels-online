import { type Page } from "@playwright/test";

import {
  type setSpritesOption,
  type SpriteOption,
} from "../../src/store/slices/userSettings/userSettingsSlice";
import {
  dispatchToStore,
  waitForSpriteOptionRenderEvent,
} from "./gameStateQueries";
import { osSlowness, retryWithRecovery } from "./infrastructure";
import { elapsed } from "./logging";

export const setSpriteOption = async (
  page: Page,
  formattedName: string,
  spriteOption: SpriteOption,
) => {
  await retryWithRecovery({
    async action() {
      console.log(
        `${formattedName} ${elapsed()}: setting sprite option to ${spriteOption.name} (uncolourised: ${spriteOption.uncolourised})`,
      );

      type SetSpritesOption = ReturnType<typeof setSpritesOption>;
      const success = await dispatchToStore(page, {
        type: "userSettings/setSpritesOption",
        payload: spriteOption,
      } satisfies SetSpritesOption);

      if (!success) {
        throw new Error(
          `Failed to dispatch to store - setting sprite option to ${spriteOption.name}`,
        );
      }

      // spriteOptionRendered is only emitted by the game's main loop, so it
      // only fires when a game is running. In-game, wait until a rendered frame
      // actually reflects the new option (covers the async spritesheet load when
      // switching to/from Toppy). With no running loop (eg at the main menu or a
      // standalone dialog) the event never comes, so just let a frame pass:
      const gameLoopRunning = await page.evaluate(
        () => window._e2e_gamePageGameAi !== undefined,
      );
      if (gameLoopRunning) {
        await waitForSpriteOptionRenderEvent(page, spriteOption, formattedName);
      } else {
        await page.waitForTimeout(100 * osSlowness);
      }
    },
    async recovery() {
      console.log(
        `${formattedName} ${elapsed()}: Retrying to set sprite option`,
      );
    },
    logHeader: formattedName,
    actionDescription: "Change sprite option",
    page,
    screenshotPrefix: `sprite-option-${spriteOption.name}-${spriteOption.uncolourised}`,
  });
};
